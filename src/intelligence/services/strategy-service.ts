// ═══════════════════════════════════════════════════════════════════════
// VibeAI Strategy Service
// Decides next lesson, review cycles, and practice tasks
// ═══════════════════════════════════════════════════════════════════════

import { intelligenceStore } from '../store';
import {
  LearnerProfile,
  LessonRecommendation,
  DifficultyLevel,
  AdaptivePath,
} from '../types';
import { expandedCourses } from '@/data/courses-expanded';
import {
  buildContentMetadataRegistry,
  getTopicId,
  getTopicName,
  getCourseDifficulty,
  getCourseDependencies,
} from '../content-metadata';
import { assessReadiness, detectMisunderstandings } from './evaluation-service';

// ─── Lesson Completion Tracking ──────────────────────────────────────

function getCompletedLessonIds(): Set<string> {
  const events = intelligenceStore.getEvents({ type: 'lesson_complete' });
  return new Set(events.map(e => e.lessonId));
}

// ─── Find Next Uncompleted Lesson ────────────────────────────────────

function findNextLesson(profile: LearnerProfile): LessonRecommendation | null {
  const completedIds = getCompletedLessonIds();
  const registry = buildContentMetadataRegistry();

  // Prioritize by adaptive logic:
  // 1. Continue current course (most recently active)
  // 2. Start recommended course based on dependencies
  // 3. Review weak areas

  const recentEvents = intelligenceStore.getEvents({ type: 'lesson_complete' });
  const lastEvent = recentEvents[recentEvents.length - 1];
  const lastCourseId = lastEvent ? parseInt(lastEvent.courseId) : null;

  // Try continuing the last course
  if (lastCourseId) {
    const course = expandedCourses.find(c => c.id === lastCourseId);
    if (course) {
      const modules = course.modules || course.chapters || [];
      for (const module of modules) {
        for (const lesson of module.lessons) {
          if (lesson.id && !completedIds.has(lesson.id)) {
            const meta = registry.get(lesson.id);
            return {
              lessonId: lesson.id,
              courseId: course.id,
              title: lesson.title,
              reason: `Continue "${course.title}" — you're making great progress!`,
              priority: 'high',
              type: 'next',
              estimatedTime: lesson.duration,
              difficulty: meta?.difficultyLevel || 'beginner',
            };
          }
        }
      }
    }
  }

  // Find the next recommended course based on difficulty and dependencies
  const sortedCourses = [...expandedCourses].sort((a, b) => {
    const diffOrder: Record<DifficultyLevel, number> = { beginner: 0, intermediate: 1, advanced: 2 };
    const aDiff = getCourseDifficulty(a.id);
    const bDiff = getCourseDifficulty(b.id);
    return diffOrder[aDiff] - diffOrder[bDiff];
  });

  for (const course of sortedCourses) {
    // Check if prerequisites are met
    const deps = getCourseDependencies(course.id);
    const depsCompleted = deps.every(depId => {
      const depCourse = expandedCourses.find(c => c.id === depId);
      if (!depCourse) return true;
      const depModules = depCourse.modules || depCourse.chapters || [];
      const depLessons = depModules.flatMap(m => m.lessons);
      return depLessons.every(l => !l.id || completedIds.has(l.id));
    });

    if (!depsCompleted) continue;

    // Check difficulty readiness
    const courseDifficulty = getCourseDifficulty(course.id);
    const { ready } = assessReadiness(profile, courseDifficulty);
    if (!ready && courseDifficulty !== 'beginner') continue;

    const modules = course.modules || course.chapters || [];
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (lesson.id && !completedIds.has(lesson.id)) {
          const meta = registry.get(lesson.id);
          return {
            lessonId: lesson.id,
            courseId: course.id,
            title: lesson.title,
            reason: `Start "${course.title}" — matches your current skill level.`,
            priority: 'high',
            type: 'next',
            estimatedTime: lesson.duration,
            difficulty: meta?.difficultyLevel || 'beginner',
          };
        }
      }
    }
  }

  return null;
}

// ─── Find Reinforcement Lessons ──────────────────────────────────────

function findReinforcementLessons(profile: LearnerProfile): LessonRecommendation[] {
  const recommendations: LessonRecommendation[] = [];
  const weaknesses = profile.weaknesses;

  if (weaknesses.length === 0) return recommendations;

  for (const weakTopicId of weaknesses.slice(0, 3)) {
    const topicName = getTopicName(weakTopicId);
    const topicProf = profile.topicProficiencies[weakTopicId];

    // Find lessons in the weak topic's course
    const courseId = Object.entries(
      Object.fromEntries(expandedCourses.map(c => [getTopicId(c.id), c.id]))
    ).find(([tid]) => tid === weakTopicId)?.[1];

    if (!courseId) continue;
    const course = expandedCourses.find(c => c.id === courseId);
    if (!course) continue;

    const modules = course.modules || course.chapters || [];
    // Suggest reviewing first lesson(s) of weak topic
    for (const module of modules) {
      for (const lesson of module.lessons.slice(0, 2)) {
        if (lesson.id) {
          recommendations.push({
            lessonId: lesson.id,
            courseId: course.id,
            title: lesson.title,
            reason: `Reinforce "${topicName}" — your proficiency is ${topicProf?.score || 0}%. Re-reading will help strengthen understanding.`,
            priority: 'high',
            type: 'reinforcement',
            estimatedTime: lesson.duration,
            difficulty: 'beginner',
          });
        }
      }
      if (recommendations.length >= 3) break;
    }
  }

  return recommendations.slice(0, 3);
}

// ─── Find Practice Activities ────────────────────────────────────────

function findPracticeActivities(profile: LearnerProfile): LessonRecommendation[] {
  const recommendations: LessonRecommendation[] = [];
  const completedIds = getCompletedLessonIds();

  // Find quiz lessons that weren't scored well
  const quizEvents = intelligenceStore.getEvents({ type: 'quiz_submit' });
  const lowScoreQuizzes = quizEvents
    .filter(e => (e.metadata.quizScore || 0) < 80)
    .slice(-5);

  for (const event of lowScoreQuizzes) {
    const course = expandedCourses.find(c => c.id === parseInt(event.courseId));
    if (!course) continue;
    
    const modules = course.modules || course.chapters || [];
    for (const module of modules) {
      const quiz = module.lessons.find(l => l.id === event.lessonId && l.type === 'quiz');
      if (quiz) {
        recommendations.push({
          lessonId: quiz.id!,
          courseId: course.id,
          title: `Retake: ${quiz.title}`,
          reason: `You scored ${event.metadata.quizScore}% - practice will improve your understanding.`,
          priority: 'medium',
          type: 'practice',
          estimatedTime: quiz.duration,
          difficulty: profile.recommendedDifficulty,
        });
        break;
      }
    }
  }

  // Also suggest uncompleted quiz-type lessons
  for (const course of expandedCourses) {
    const modules = course.modules || course.chapters || [];
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (lesson.id && lesson.type === 'quiz' && !completedIds.has(lesson.id)) {
          const topicId = getTopicId(course.id);
          const topicProf = profile.topicProficiencies[topicId];
          if (topicProf && topicProf.lessonsCompleted >= 2) {
            recommendations.push({
              lessonId: lesson.id,
              courseId: course.id,
              title: lesson.title,
              reason: `Test your knowledge in "${course.title}"`,
              priority: 'medium',
              type: 'practice',
              estimatedTime: lesson.duration,
              difficulty: getCourseDifficulty(course.id),
            });
          }
        }
      }
    }
    if (recommendations.length >= 3) break;
  }

  return recommendations.slice(0, 3);
}

// ─── Find Advanced Suggestions ───────────────────────────────────────

function findAdvancedSuggestions(profile: LearnerProfile): LessonRecommendation[] {
  const recommendations: LessonRecommendation[] = [];
  const completedIds = getCompletedLessonIds();

  if (profile.knowledgeLevel === 'beginner') return recommendations;

  const strengths = profile.strengths;
  
  for (const strongTopicId of strengths.slice(0, 2)) {
    // Find advanced courses in strong areas
    for (const course of expandedCourses) {
      const topicId = getTopicId(course.id);
      const courseDifficulty = getCourseDifficulty(course.id);

      if (courseDifficulty !== 'advanced') continue;

      const deps = getCourseDependencies(course.id);
      const hasDep = deps.some(depId => getTopicId(depId) === strongTopicId);
      
      if (!hasDep) continue;

      const modules = course.modules || course.chapters || [];
      for (const module of modules) {
        for (const lesson of module.lessons) {
          if (lesson.id && !completedIds.has(lesson.id)) {
            recommendations.push({
              lessonId: lesson.id,
              courseId: course.id,
              title: lesson.title,
              reason: `Your strong performance in ${getTopicName(strongTopicId)} suggests you're ready for advanced material.`,
              priority: 'low',
              type: 'advanced',
              estimatedTime: lesson.duration,
              difficulty: 'advanced',
            });
            break;
          }
        }
        if (recommendations.length >= 2) break;
      }
    }
  }

  return recommendations.slice(0, 2);
}

// ─── Determine Difficulty Calibration Reason ─────────────────────────

function getDifficultyCalibrationReason(profile: LearnerProfile): string {
  const { knowledgeLevel, recommendedDifficulty, averageQuizScore } = profile;

  if (recommendedDifficulty === knowledgeLevel) {
    return 'Your current difficulty level matches your demonstrated knowledge. Keep going!';
  }

  if (recommendedDifficulty === 'beginner' && knowledgeLevel !== 'beginner') {
    return `Your recent quiz average (${averageQuizScore}%) suggests reviewing foundational concepts could be beneficial.`;
  }

  if (recommendedDifficulty === 'advanced') {
    return `Excellent performance (${averageQuizScore}% quiz average)! You're ready for more challenging content.`;
  }

  return 'Difficulty is calibrated based on your quiz performance and learning patterns.';
}

// ─── Should Trigger Review ───────────────────────────────────────────

export function shouldTriggerReview(profile: LearnerProfile, topicId: string): boolean {
  const topicProf = profile.topicProficiencies[topicId];
  if (!topicProf) return false;

  // Trigger review if:
  // 1. Quiz scores are declining
  // 2. Haven't revisited in 7+ days
  // 3. Score is below threshold

  const now = Date.now();
  const daysSinceAccess = Math.floor((now - topicProf.lastAccessed) / 86400000);

  if (daysSinceAccess >= 7 && topicProf.score < 70) return true;

  if (topicProf.quizScores.length >= 2) {
    const recent = topicProf.quizScores.slice(-2);
    if (recent[1] < recent[0] - 10) return true;
  }

  return false;
}

// ─── Optimal Session Length ──────────────────────────────────────────

export function getOptimalSessionLength(profile: LearnerProfile): number {
  const { learningSpeed, engagementRisk } = profile;

  let base = 30; // minutes

  if (learningSpeed === 'fast') base = 45;
  if (learningSpeed === 'slow') base = 20;

  // Reduce if high engagement risk (shorter, more frequent sessions)
  if (engagementRisk === 'high' || engagementRisk === 'critical') {
    base = Math.min(base, 20);
  }

  return base;
}

// ─── Generate Full Adaptive Path ─────────────────────────────────────

export function generateAdaptivePath(userId: string): AdaptivePath {
  const profile = intelligenceStore.getProfile();

  if (!profile) {
    return {
      userId,
      generatedAt: Date.now(),
      nextLesson: null,
      reinforcementTopics: [],
      practiceActivities: [],
      advancedSuggestions: [],
      difficultyCalibration: {
        currentLevel: 'beginner',
        recommendedLevel: 'beginner',
        reason: 'Start your learning journey!',
      },
      progressInsight: 'Begin your AI learning journey by exploring the first course.',
    };
  }

  const nextLesson = findNextLesson(profile);
  const reinforcementTopics = findReinforcementLessons(profile);
  const practiceActivities = findPracticeActivities(profile);
  const advancedSuggestions = findAdvancedSuggestions(profile);

  // Generate progress insight
  const misunderstandings = detectMisunderstandings(profile);
  let progressInsight: string;

  if (profile.totalLessonsCompleted === 0) {
    progressInsight = 'Welcome! Start your first lesson to begin building your AI knowledge map.';
  } else if (profile.engagementRisk === 'critical') {
    progressInsight = 'We notice you haven\'t been active recently. A short 10-minute session can keep your momentum going!';
  } else if (misunderstandings.length > 0) {
    progressInsight = `Focus area detected: ${misunderstandings[0]} Consider targeted review.`;
  } else if (profile.overallScore >= 75) {
    progressInsight = `Outstanding progress! Your overall score is ${profile.overallScore}%. You're demonstrating strong AI literacy.`;
  } else if (profile.overallScore >= 50) {
    progressInsight = `Good progress! Your knowledge score is ${profile.overallScore}%. Keep building momentum with consistent practice.`;
  } else {
    progressInsight = `You're building your foundation with a score of ${profile.overallScore}%. Each lesson strengthens your understanding.`;
  }

  const path: AdaptivePath = {
    userId,
    generatedAt: Date.now(),
    nextLesson,
    reinforcementTopics,
    practiceActivities,
    advancedSuggestions,
    difficultyCalibration: {
      currentLevel: profile.knowledgeLevel,
      recommendedLevel: profile.recommendedDifficulty,
      reason: getDifficultyCalibrationReason(profile),
    },
    progressInsight,
  };

  intelligenceStore.setAdaptivePath(path);
  return path;
}
