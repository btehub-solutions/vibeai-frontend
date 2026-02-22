// ═══════════════════════════════════════════════════════════════════════
// VibeAI Learner Modeling Engine
// Continuously updates learner profile based on behavioral signals
// ═══════════════════════════════════════════════════════════════════════

import { intelligenceStore } from '../store';
import {
  LearnerProfile,
  LessonEvent,
  DifficultyLevel,
  EngagementRisk,
  LearningSpeed,
} from '../types';
import { getTopicId, getTopicName } from '../content-metadata';

// ─── Knowledge Level Calculation ─────────────────────────────────────

export function calculateKnowledgeLevel(profile: LearnerProfile): DifficultyLevel {
  const { overallScore, totalLessonsCompleted, averageQuizScore } = profile;

  // Composite assessment
  const composite = (overallScore * 0.4) + (averageQuizScore * 0.4) + (Math.min(totalLessonsCompleted, 50) * 0.4);

  if (composite >= 70) return 'advanced';
  if (composite >= 35) return 'intermediate';
  return 'beginner';
}

// ─── Learning Speed Detection ────────────────────────────────────────

export function detectLearningSpeed(profile: LearnerProfile): LearningSpeed {
  const events = intelligenceStore.getEvents({ type: 'lesson_complete' });
  if (events.length < 3) return 'moderate';

  // Calculate average time per lesson
  const completionTimes = events
    .filter(e => e.metadata.timeSpentSeconds && e.metadata.timeSpentSeconds > 0)
    .map(e => e.metadata.timeSpentSeconds!);

  if (completionTimes.length < 2) return 'moderate';

  const avgTime = completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length;

  // Compare against expected time (15 minutes = 900 seconds average)
  const expectedTimeSeconds = 900;

  if (avgTime < expectedTimeSeconds * 0.6) return 'fast';
  if (avgTime > expectedTimeSeconds * 1.5) return 'slow';
  return 'moderate';
}

// ─── Engagement Risk Assessment ──────────────────────────────────────

export function assessEngagementRisk(profile: LearnerProfile): EngagementRisk {
  const now = Date.now();
  const lastActive = new Date(profile.lastActiveDate).getTime();
  const daysSinceActive = Math.floor((now - lastActive) / 86400000);

  // Factor 1: Days since last activity
  let riskScore = 0;
  if (daysSinceActive >= 14) riskScore += 40;
  else if (daysSinceActive >= 7) riskScore += 25;
  else if (daysSinceActive >= 3) riskScore += 10;

  // Factor 2: Declining engagement (fewer lessons in recent period)
  const recentEvents = intelligenceStore.getEvents({ since: now - 7 * 86400000 });
  const olderEvents = intelligenceStore.getEvents({
    since: now - 14 * 86400000,
  }).filter(e => e.timestamp < now - 7 * 86400000);

  if (olderEvents.length > 0 && recentEvents.length < olderEvents.length * 0.5) {
    riskScore += 20;
  }

  // Factor 3: Low quiz performance trend
  if (profile.averageQuizScore > 0 && profile.averageQuizScore < 50) {
    riskScore += 15;
  }

  // Factor 4: Broken streak
  if (profile.currentStreak === 0 && profile.sessionCount > 3) {
    riskScore += 10;
  }

  // Factor 5: Quiz retakes indicate frustration
  const retakeEvents = intelligenceStore.getEvents({ type: 'quiz_retake' });
  const recentRetakes = retakeEvents.filter(e => e.timestamp > now - 7 * 86400000);
  if (recentRetakes.length >= 3) {
    riskScore += 15;
  }

  if (riskScore >= 50) return 'critical';
  if (riskScore >= 30) return 'high';
  if (riskScore >= 15) return 'medium';
  return 'low';
}

// ─── Recommended Difficulty Calibration ──────────────────────────────

export function calibrateDifficulty(profile: LearnerProfile): DifficultyLevel {
  const { averageQuizScore, knowledgeLevel } = profile;

  // If consistently scoring > 85%, suggest advancing
  if (averageQuizScore >= 85 && knowledgeLevel !== 'advanced') {
    if (knowledgeLevel === 'beginner') return 'intermediate';
    return 'advanced';
  }

  // If struggling (< 50%), suggest simplifying
  if (averageQuizScore > 0 && averageQuizScore < 50 && knowledgeLevel !== 'beginner') {
    if (knowledgeLevel === 'advanced') return 'intermediate';
    return 'beginner';
  }

  return knowledgeLevel;
}

// ─── Overall Score Calculation ───────────────────────────────────────

export function calculateOverallScore(profile: LearnerProfile): number {
  const proficiencies = Object.values(profile.topicProficiencies);
  if (proficiencies.length === 0) return 0;

  const avgProficiency = proficiencies.reduce((sum, t) => sum + t.score, 0) / proficiencies.length;
  const quizWeight = profile.averageQuizScore * 0.4;
  const profWeight = avgProficiency * 0.4;
  const completionBonus = Math.min(profile.totalLessonsCompleted * 0.5, 20); // cap at 20

  return Math.round(Math.min(100, quizWeight + profWeight + completionBonus));
}

// ─── Process Lesson Event ────────────────────────────────────────────

export function processLessonEvent(event: LessonEvent): void {
  intelligenceStore.recordEvent(event);
  const profile = intelligenceStore.getProfile();
  if (!profile) return;

  const topicId = event.metadata.topicId || getTopicId(parseInt(event.courseId) || 1);
  const topicName = getTopicName(topicId);

  switch (event.type) {
    case 'lesson_complete': {
      // Update completion count
      intelligenceStore.updateProfile({
        totalLessonsCompleted: profile.totalLessonsCompleted + 1,
        totalTimeSpentSeconds: profile.totalTimeSpentSeconds + (event.metadata.timeSpentSeconds || 0),
      });

      // Update topic proficiency
      const existing = profile.topicProficiencies[topicId];
      const newLessonsCompleted = (existing?.lessonsCompleted || 0) + 1;
      const baseScore = existing?.score || 0;
      // Increment proficiency slightly per lesson completed
      const newScore = Math.min(100, baseScore + 5);

      intelligenceStore.updateTopicProficiency(topicId, {
        topicName,
        lessonsCompleted: newLessonsCompleted,
        score: newScore,
        averageReadingTime: event.metadata.timeSpentSeconds || existing?.averageReadingTime || 0,
      });
      break;
    }

    case 'quiz_submit': {
      const quizScore = event.metadata.quizScore || 0;

      // Update overall quiz stats
      const newTotalQuizzes = profile.totalQuizzesTaken + 1;
      const newAvgQuiz = (
        (profile.averageQuizScore * profile.totalQuizzesTaken + quizScore) / newTotalQuizzes
      );

      intelligenceStore.updateProfile({
        totalQuizzesTaken: newTotalQuizzes,
        averageQuizScore: Math.round(newAvgQuiz),
      });

      // Update topic proficiency with quiz score
      const topicProf = profile.topicProficiencies[topicId];
      const quizScores = [...(topicProf?.quizScores || []), quizScore];
      const avgTopicQuiz = quizScores.reduce((a, b) => a + b, 0) / quizScores.length;

      // Topic score is weighted: 60% quiz, 40% completion progress
      const completionScore = Math.min(100, (topicProf?.lessonsCompleted || 0) * 10);
      const topicScore = Math.round(avgTopicQuiz * 0.6 + completionScore * 0.4);

      intelligenceStore.updateTopicProficiency(topicId, {
        topicName,
        quizScores,
        score: topicScore,
      });
      break;
    }

    case 'quiz_retake': {
      // Record but don't heavily penalize — shows persistence
      break;
    }

    case 'lesson_revisit': {
      // Positive signal — shows engagement
      const existing = profile.topicProficiencies[topicId];
      if (existing) {
        intelligenceStore.updateTopicProficiency(topicId, {
          lastAccessed: Date.now(),
        });
      }
      break;
    }

    case 'lesson_start': {
      // Mark active
      intelligenceStore.markActive();
      break;
    }
  }

  // Recalculate derived metrics
  refreshProfile();
}

// ─── Full Profile Refresh ────────────────────────────────────────────

export function refreshProfile(): void {
  const profile = intelligenceStore.getProfile();
  if (!profile) return;

  const knowledgeLevel = calculateKnowledgeLevel(profile);
  const learningSpeed = detectLearningSpeed(profile);
  const engagementRisk = assessEngagementRisk(profile);
  const recommendedDifficulty = calibrateDifficulty(profile);
  const overallScore = calculateOverallScore(profile);

  intelligenceStore.updateProfile({
    knowledgeLevel,
    learningSpeed,
    engagementRisk,
    recommendedDifficulty,
    overallScore,
  });
}
