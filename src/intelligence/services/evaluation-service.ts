// ═══════════════════════════════════════════════════════════════════════
// VibeAI Evaluation Service
// Scores quizzes and detects misunderstanding patterns
// ═══════════════════════════════════════════════════════════════════════

import { intelligenceStore } from '../store';
import {
  LearnerProfile,
  DifficultyLevel,
} from '../types';
import { getTopicId } from '../content-metadata';

// ─── Quiz Scoring ────────────────────────────────────────────────────

export interface QuizResult {
  score: number;             // 0-100 percentage
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  patterns: string[];        // detected patterns
  misunderstandings: string[];
  improvement: string[];     // actionable improvement suggestions
}

export function scoreQuiz(
  courseId: string,
  lessonId: string,
  answers: Record<string, string>,
  questions: Array<{
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }>
): QuizResult {
  let correct = 0;
  const incorrectTopics: string[] = [];
  const patterns: string[] = [];
  const misunderstandings: string[] = [];
  const improvement: string[] = [];

  questions.forEach((q, idx) => {
    if (answers[q.id] === q.correctAnswer) {
      correct++;
    } else {
      incorrectTopics.push(`Question ${idx + 1}: ${q.text}`);
      if (q.explanation) {
        misunderstandings.push(q.explanation);
      }
    }
  });

  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= 70;

  // Pattern Detection
  if (score === 100) {
    patterns.push('perfect_score');
  } else if (score >= 90) {
    patterns.push('near_perfect');
  } else if (score >= 70) {
    patterns.push('passing');
  } else if (score >= 50) {
    patterns.push('struggling');
    improvement.push('Review the lesson material carefully before retaking the quiz.');
  } else {
    patterns.push('significant_gap');
    improvement.push('Consider revisiting prerequisite topics before continuing.');
    improvement.push('Take notes while reading and focus on key concepts.');
  }

  // Check for guessing pattern (all same answer)
  const answerValues = Object.values(answers);
  if (answerValues.length > 2) {
    const uniqueAnswers = new Set(answerValues);
    if (uniqueAnswers.size === 1) {
      patterns.push('possible_guessing');
      improvement.push('It appears you may have guessed. Try reading the material more carefully.');
    }
  }

  // Check consecutive wrong answers
  const answerKeys = Object.keys(answers).sort();
  let consecutiveWrong = 0;
  let maxConsecutiveWrong = 0;
  answerKeys.forEach(key => {
    const q = questions.find(q => q.id === key);
    if (q && answers[key] !== q.correctAnswer) {
      consecutiveWrong++;
      maxConsecutiveWrong = Math.max(maxConsecutiveWrong, consecutiveWrong);
    } else {
      consecutiveWrong = 0;
    }
  });

  if (maxConsecutiveWrong >= 3) {
    patterns.push('consecutive_errors');
    improvement.push('You had several consecutive errors. Focus on strengthening foundational concepts.');
  }

  return {
    score,
    correctCount: correct,
    totalQuestions: questions.length,
    passed,
    patterns,
    misunderstandings,
    improvement,
  };
}

// ─── Misunderstanding Detection ──────────────────────────────────────

export function detectMisunderstandings(profile: LearnerProfile): string[] {
  const misunderstandings: string[] = [];
  const topics = Object.values(profile.topicProficiencies);

  for (const topic of topics) {
    // Low quiz scores despite completing lessons → misunderstanding
    if (topic.lessonsCompleted >= 2 && topic.quizScores.length > 0) {
      const avgQuiz = topic.quizScores.reduce((a, b) => a + b, 0) / topic.quizScores.length;
      if (avgQuiz < 60) {
        misunderstandings.push(
          `You may have gaps in ${topic.topicName}. Your average quiz score is ${Math.round(avgQuiz)}% despite completing ${topic.lessonsCompleted} lessons.`
        );
      }
    }

    // Declining quiz scores → deepening misunderstanding
    if (topic.quizScores.length >= 2) {
      const recent = topic.quizScores.slice(-2);
      if (recent[1] < recent[0] - 15) {
        misunderstandings.push(
          `Your quiz scores in ${topic.topicName} are declining. Consider reviewing earlier material.`
        );
      }
    }
  }

  return misunderstandings;
}

// ─── Readiness Assessment ────────────────────────────────────────────

export function assessReadiness(
  profile: LearnerProfile,
  targetDifficulty: DifficultyLevel
): { ready: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (targetDifficulty === 'beginner') {
    return { ready: true, reasons: ['Beginner content is accessible to all learners.'] };
  }

  if (targetDifficulty === 'intermediate') {
    if (profile.overallScore < 30) {
      reasons.push('Your overall score suggests you may benefit from reviewing foundational material first.');
    }
    if (profile.totalLessonsCompleted < 5) {
      reasons.push('Complete a few more beginner lessons to build a stronger foundation.');
    }
    if (profile.averageQuizScore > 0 && profile.averageQuizScore < 50) {
      reasons.push('Your quiz performance indicates some concepts may need reinforcement.');
    }
  }

  if (targetDifficulty === 'advanced') {
    if (profile.overallScore < 55) {
      reasons.push('Advanced content requires a stronger knowledge base.');
    }
    if (profile.totalLessonsCompleted < 15) {
      reasons.push('More experience with intermediate content is recommended.');
    }
    if (profile.averageQuizScore > 0 && profile.averageQuizScore < 65) {
      reasons.push('Aim for higher quiz scores before attempting advanced material.');
    }
  }

  return {
    ready: reasons.length === 0,
    reasons: reasons.length > 0 ? reasons : ['You are ready for this content level!'],
  };
}

// ─── Comprehension Score ─────────────────────────────────────────────

export function estimateComprehension(
  courseId: string,
  profile: LearnerProfile
): number {
  const topicId = getTopicId(parseInt(courseId) || 1);
  const topicProf = profile.topicProficiencies[topicId];

  if (!topicProf) return 50; // neutral default

  // Weighted formula
  const quizComponent = topicProf.quizScores.length > 0
    ? (topicProf.quizScores.reduce((a, b) => a + b, 0) / topicProf.quizScores.length)
    : 50;
  
  const completionComponent = Math.min(100, topicProf.lessonsCompleted * 12);
  
  // Time factor: very fast completion may indicate skimming
  const timeEvents = intelligenceStore.getEvents({ courseId, type: 'lesson_complete' });
  let timeFactor = 1;
  if (timeEvents.length > 0) {
    const avgTime = timeEvents
      .filter(e => e.metadata.timeSpentSeconds && e.metadata.timeSpentSeconds > 0)
      .reduce((sum, e) => sum + (e.metadata.timeSpentSeconds || 0), 0) / timeEvents.length;
    
    if (avgTime < 120) timeFactor = 0.7; // Very fast, likely skimming
    else if (avgTime < 300) timeFactor = 0.9; // Quick
    else timeFactor = 1; // Normal pace
  }

  return Math.round((quizComponent * 0.5 + completionComponent * 0.5) * timeFactor);
}
