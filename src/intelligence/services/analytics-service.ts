// ═══════════════════════════════════════════════════════════════════════
// VibeAI Analytics Service
// Engagement trends, performance analysis, and predictive signals
// ═══════════════════════════════════════════════════════════════════════

import { intelligenceStore } from '../store';
import {
  LearnerProfile,
  PerformanceAnalysis,
  PredictiveSignal,
} from '../types';
import { getTopicName, COURSE_TOPIC_NAMES } from '../content-metadata';

// ─── Engagement Trend ────────────────────────────────────────────────

export function getEngagementTrend(userId: string): 'improving' | 'stable' | 'declining' {
  const now = Date.now();
  const thisWeek = intelligenceStore.getEvents({ since: now - 7 * 86400000 });
  const lastWeek = intelligenceStore.getEvents({ since: now - 14 * 86400000 })
    .filter(e => e.timestamp < now - 7 * 86400000);

  if (thisWeek.length === 0 && lastWeek.length === 0) return 'stable';
  if (lastWeek.length === 0 && thisWeek.length > 0) return 'improving';
  if (thisWeek.length === 0 && lastWeek.length > 0) return 'declining';

  const ratio = thisWeek.length / Math.max(1, lastWeek.length);
  if (ratio >= 1.2) return 'improving';
  if (ratio <= 0.6) return 'declining';
  return 'stable';
}

// ─── Predictive Signals ──────────────────────────────────────────────

export function generatePredictiveSignals(profile: LearnerProfile): PredictiveSignal[] {
  const signals: PredictiveSignal[] = [];
  const now = Date.now();

  // ── 1. Dropout Risk ──────────────────────────────────────────────

  const daysSinceActive = Math.floor(
    (now - new Date(profile.lastActiveDate).getTime()) / 86400000
  );

  if (daysSinceActive >= 7) {
    const severity = daysSinceActive >= 14 ? 'critical' : 'warning';
    const confidence = Math.min(0.95, 0.5 + daysSinceActive * 0.03);

    signals.push({
      type: 'dropout_risk',
      severity,
      confidence,
      message: daysSinceActive >= 14
        ? `You haven't been active for ${daysSinceActive} days. Your learning momentum is at risk.`
        : `It's been ${daysSinceActive} days since your last session. A quick review can keep you on track.`,
      recommendation: daysSinceActive >= 14
        ? 'Start with a 5-minute review of your strongest topic to ease back in.'
        : 'Try completing one short lesson today to maintain your streak.',
      relatedTopics: profile.strengths.slice(0, 2),
      timestamp: now,
    });
  }

  // Also check session frequency decline
  const recentSessions = intelligenceStore.getSessions(now - 14 * 86400000);
  const thisWeekSessions = recentSessions.filter(s => s.timestamp >= now - 7 * 86400000);
  const lastWeekSessions = recentSessions.filter(s => s.timestamp < now - 7 * 86400000);

  if (lastWeekSessions.length >= 3 && thisWeekSessions.length <= 1) {
    signals.push({
      type: 'dropout_risk',
      severity: 'warning',
      confidence: 0.7,
      message: 'Your session frequency has dropped significantly this week.',
      recommendation: 'Even short sessions help. Try setting a daily 10-minute learning goal.',
      relatedTopics: [],
      timestamp: now,
    });
  }

  // ── 2. Low Comprehension Risk ────────────────────────────────────

  const weakTopics = profile.weaknesses;
  for (const topicId of weakTopics) {
    const topicProf = profile.topicProficiencies[topicId];
    if (!topicProf) continue;

    if (topicProf.quizScores.length >= 2) {
      const avgScore = topicProf.quizScores.reduce((a, b) => a + b, 0) / topicProf.quizScores.length;
      if (avgScore < 50) {
        signals.push({
          type: 'low_comprehension',
          severity: avgScore < 30 ? 'critical' : 'warning',
          confidence: Math.min(0.9, 0.6 + (50 - avgScore) * 0.01),
          message: `Your comprehension in ${topicProf.topicName} appears to be low (avg quiz: ${Math.round(avgScore)}%).`,
          recommendation: `Revisit the foundational lessons in ${topicProf.topicName} before attempting more quizzes.`,
          relatedTopics: [topicId],
          timestamp: now,
        });
      }
    }
  }

  // ── 3. Optimal Review Timing (Spaced Repetition Signal) ──────────

  for (const [topicId, topicProf] of Object.entries(profile.topicProficiencies)) {
    const daysSinceAccess = Math.floor((now - topicProf.lastAccessed) / 86400000);
    
    // Suggest review after 7-14 days for moderate scores, 3-7 for low scores
    const threshold = topicProf.score >= 70 ? 14 : topicProf.score >= 50 ? 7 : 3;
    
    if (daysSinceAccess >= threshold && topicProf.score < 90) {
      signals.push({
        type: 'optimal_review',
        severity: 'info',
        confidence: 0.75,
        message: `It's been ${daysSinceAccess} days since you studied ${topicProf.topicName}. A quick review will reinforce your knowledge.`,
        recommendation: `Spend 10 minutes reviewing key concepts in ${topicProf.topicName}.`,
        relatedTopics: [topicId],
        timestamp: now,
      });
    }
  }

  // ── 4. Ready for Advanced Material ───────────────────────────────

  for (const topicId of profile.strengths) {
    const topicProf = profile.topicProficiencies[topicId];
    if (!topicProf) continue;

    if (topicProf.score >= 80 && topicProf.quizScores.length >= 2) {
      const recentScores = topicProf.quizScores.slice(-2);
      if (recentScores.every(s => s >= 80)) {
        signals.push({
          type: 'ready_for_advanced',
          severity: 'info',
          confidence: 0.85,
          message: `Excellent mastery in ${topicProf.topicName}! You're ready for advanced topics.`,
          recommendation: `Explore advanced content that builds on your ${topicProf.topicName} expertise.`,
          relatedTopics: [topicId],
          timestamp: now,
        });
      }
    }
  }

  // Sort by severity and confidence
  const severityOrder = { critical: 0, warning: 1, info: 2 };
  signals.sort((a, b) => {
    const sevDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (sevDiff !== 0) return sevDiff;
    return b.confidence - a.confidence;
  });

  return signals;
}

// ─── Performance Analysis ────────────────────────────────────────────

export function generatePerformanceAnalysis(userId: string): PerformanceAnalysis {
  const profile = intelligenceStore.getProfile();
  const now = Date.now();

  if (!profile) {
    return {
      userId,
      generatedAt: now,
      overallTrend: 'stable',
      weeklyStats: {
        lessonsCompleted: 0,
        averageQuizScore: 0,
        totalTimeMinutes: 0,
        engagementScore: 0,
      },
      topicBreakdown: [],
      predictions: [],
      milestones: generateMilestones(null),
    };
  }

  // Weekly stats
  const weekEvents = intelligenceStore.getEvents({ since: now - 7 * 86400000 });
  const weekLessons = weekEvents.filter(e => e.type === 'lesson_complete');
  const weekQuizzes = weekEvents.filter(e => e.type === 'quiz_submit');
  const weekTimeSeconds = weekLessons.reduce((sum, e) => sum + (e.metadata.timeSpentSeconds || 0), 0);
  
  const avgWeekQuiz = weekQuizzes.length > 0
    ? weekQuizzes.reduce((sum, e) => sum + (e.metadata.quizScore || 0), 0) / weekQuizzes.length
    : 0;

  // Engagement score: 0-100 based on activity frequency, diversity, and consistency
  const engagementScore = calculateEngagementScore(profile, weekEvents);

  // Overall trend
  const overallTrend = getEngagementTrend(userId);

  // Topic breakdown
  const topicBreakdown = Object.entries(profile.topicProficiencies).map(([topicId, prof]) => {
    const recentQuizEvents = intelligenceStore.getEvents({
      type: 'quiz_submit',
      since: now - 14 * 86400000,
    }).filter(e => e.metadata.topicId === topicId);

    let trend: 'improving' | 'stable' | 'declining' = 'stable';
    if (prof.quizScores.length >= 2) {
      const lastTwo = prof.quizScores.slice(-2);
      if (lastTwo[1] > lastTwo[0] + 5) trend = 'improving';
      else if (lastTwo[1] < lastTwo[0] - 5) trend = 'declining';
    }

    let recommendation = '';
    if (prof.score >= 80) recommendation = 'Strong performance! Consider exploring advanced topics.';
    else if (prof.score >= 50) recommendation = 'Good progress. Focus on practice quizzes to solidify understanding.';
    else if (prof.lessonsCompleted > 0) recommendation = 'Review foundational material and retake quizzes.';
    else recommendation = 'Start this topic to begin building proficiency.';

    return {
      topicId,
      topicName: prof.topicName || getTopicName(topicId),
      proficiency: prof.score,
      trend,
      recommendation,
    };
  });

  // Predictions
  const predictions = generatePredictiveSignals(profile);
  intelligenceStore.setPredictions(predictions);

  // Milestones
  const milestones = generateMilestones(profile);

  const analysis: PerformanceAnalysis = {
    userId,
    generatedAt: now,
    overallTrend,
    weeklyStats: {
      lessonsCompleted: weekLessons.length,
      averageQuizScore: Math.round(avgWeekQuiz),
      totalTimeMinutes: Math.round(weekTimeSeconds / 60),
      engagementScore,
    },
    topicBreakdown,
    predictions,
    milestones,
  };

  intelligenceStore.setPerformance(analysis);
  return analysis;
}

// ─── Engagement Score ────────────────────────────────────────────────

function calculateEngagementScore(profile: LearnerProfile, weekEvents: any[]): number {
  let score = 0;

  // Activity frequency (up to 30 points)
  score += Math.min(30, weekEvents.length * 5);

  // Streak bonus (up to 20 points)
  score += Math.min(20, profile.currentStreak * 4);

  // Diversity of activity types (up to 20 points)
  const types = new Set(weekEvents.map(e => e.type));
  score += Math.min(20, types.size * 7);

  // Quiz engagement (up to 15 points)
  const quizCount = weekEvents.filter(e => e.type === 'quiz_submit').length;
  score += Math.min(15, quizCount * 5);

  // Notes and revisits (up to 15 points)
  const revisits = weekEvents.filter(e => e.type === 'lesson_revisit' || e.type === 'note_taken').length;
  score += Math.min(15, revisits * 5);

  return Math.min(100, score);
}

// ─── Milestones ──────────────────────────────────────────────────────

function generateMilestones(profile: LearnerProfile | null): Array<{
  title: string;
  achieved: boolean;
  progress: number;
}> {
  if (!profile) {
    return [
      { title: 'Complete your first lesson', achieved: false, progress: 0 },
      { title: 'Take your first quiz', achieved: false, progress: 0 },
      { title: 'Complete 10 lessons', achieved: false, progress: 0 },
      { title: 'Achieve 80%+ quiz average', achieved: false, progress: 0 },
      { title: 'Build a 7-day streak', achieved: false, progress: 0 },
    ];
  }

  return [
    {
      title: 'Complete your first lesson',
      achieved: profile.totalLessonsCompleted >= 1,
      progress: Math.min(100, profile.totalLessonsCompleted * 100),
    },
    {
      title: 'Take your first quiz',
      achieved: profile.totalQuizzesTaken >= 1,
      progress: Math.min(100, profile.totalQuizzesTaken * 100),
    },
    {
      title: 'Complete 10 lessons',
      achieved: profile.totalLessonsCompleted >= 10,
      progress: Math.min(100, (profile.totalLessonsCompleted / 10) * 100),
    },
    {
      title: 'Complete 25 lessons',
      achieved: profile.totalLessonsCompleted >= 25,
      progress: Math.min(100, (profile.totalLessonsCompleted / 25) * 100),
    },
    {
      title: 'Achieve 80%+ quiz average',
      achieved: profile.averageQuizScore >= 80 && profile.totalQuizzesTaken >= 3,
      progress: profile.totalQuizzesTaken >= 3
        ? Math.min(100, (profile.averageQuizScore / 80) * 100)
        : (profile.totalQuizzesTaken / 3) * 50,
    },
    {
      title: 'Build a 7-day streak',
      achieved: profile.currentStreak >= 7,
      progress: Math.min(100, (profile.currentStreak / 7) * 100),
    },
    {
      title: 'Master a topic (90%+ proficiency)',
      achieved: Object.values(profile.topicProficiencies).some(t => t.score >= 90),
      progress: Math.min(100,
        Math.max(0, ...Object.values(profile.topicProficiencies).map(t => (t.score / 90) * 100))
      ),
    },
    {
      title: 'Reach Advanced level',
      achieved: profile.knowledgeLevel === 'advanced',
      progress: profile.knowledgeLevel === 'advanced' ? 100 :
        profile.knowledgeLevel === 'intermediate' ? 50 : 20,
    },
  ];
}

// ─── Teaching Service ────────────────────────────────────────────────

export function getExplanationComplexity(profile: LearnerProfile): 'simplified' | 'standard' | 'detailed' {
  if (profile.knowledgeLevel === 'beginner') return 'simplified';
  if (profile.knowledgeLevel === 'advanced') return 'detailed';
  return 'standard';
}

export function getSuggestedExamples(topicId: string, profile: LearnerProfile): string[] {
  const suggestions: string[] = [];
  const level = profile.knowledgeLevel;

  const examples: Record<string, Record<string, string[]>> = {
    'ai-foundations': {
      beginner: ['Spam email filtering', 'Smartphone face unlock', 'Music recommendations'],
      intermediate: ['Medical image diagnosis', 'Fraud detection systems', 'Supply chain optimization'],
      advanced: ['Autonomous vehicle decision systems', 'Drug discovery pipelines', 'Algorithmic trading'],
    },
    'machine-learning': {
      beginner: ['Movie recommendation engines', 'Price prediction tools', 'Customer segmentation'],
      intermediate: ['Predictive maintenance', 'Natural language classification', 'Anomaly detection'],
      advanced: ['Reinforcement learning for robotics', 'Transfer learning architectures', 'Ensemble methods'],
    },
    'prompt-engineering': {
      beginner: ['Writing better ChatGPT prompts', 'Generating email templates', 'Simple Q&A'],
      intermediate: ['Chain-of-thought reasoning', 'Role-based prompting', 'Output formatting'],
      advanced: ['Multi-shot prompting strategies', 'Prompt injection defense', 'System prompt design'],
    },
  };

  return examples[topicId]?.[level] || ['Explore real-world applications of this topic'];
}
