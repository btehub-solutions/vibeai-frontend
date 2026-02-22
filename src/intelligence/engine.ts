// ═══════════════════════════════════════════════════════════════════════
// VibeAI Intelligence Engine — Unified Facade
// Single entry point for all intelligence operations
// ═══════════════════════════════════════════════════════════════════════

import { intelligenceStore } from './store';
import {
  LearnerProfile,
  LessonEvent,
  SessionEvent,
  AdaptivePath,
  PerformanceAnalysis,
  PredictiveSignal,
  ContentMetadata,
  LessonRecommendation,
  DifficultyLevel,
} from './types';
import { buildContentMetadataRegistry, getTopicId, getTopicName } from './content-metadata';
import { processLessonEvent, refreshProfile } from './services/learner-modeling';
import {
  scoreQuiz,
  detectMisunderstandings,
  assessReadiness,
  estimateComprehension,
  QuizResult,
} from './services/evaluation-service';
import {
  generateAdaptivePath,
  shouldTriggerReview,
  getOptimalSessionLength,
} from './services/strategy-service';
import {
  generatePerformanceAnalysis,
  generatePredictiveSignals,
  getEngagementTrend,
  getExplanationComplexity,
  getSuggestedExamples,
} from './services/analytics-service';

// ═══════════════════════════════════════════════════════════════════════
// Intelligence Engine Class
// ═══════════════════════════════════════════════════════════════════════

class IntelligenceEngine {
  private metadataInitialized = false;

  // ── Initialization ───────────────────────────────────────────────

  initialize(userId: string): void {
    intelligenceStore.initialize(userId);
    this.initializeContentMetadata();
    intelligenceStore.markActive();
    
    // Refresh profile calculations on initialization
    refreshProfile();
  }

  private initializeContentMetadata(): void {
    if (this.metadataInitialized) return;
    const registry = buildContentMetadataRegistry();
    registry.forEach((meta, lessonId) => {
      intelligenceStore.setContentMetadata(lessonId, meta);
    });
    this.metadataInitialized = true;
  }

  // ── Learner Profile ──────────────────────────────────────────────

  getProfile(): LearnerProfile | null {
    return intelligenceStore.getProfile();
  }

  getProfileSummary(): {
    level: string;
    score: number;
    speed: string;
    risk: string;
    streak: number;
    lessonsCompleted: number;
    quizAverage: number;
    strengths: string[];
    weaknesses: string[];
  } | null {
    const profile = this.getProfile();
    if (!profile) return null;

    return {
      level: profile.knowledgeLevel,
      score: profile.overallScore,
      speed: profile.learningSpeed,
      risk: profile.engagementRisk,
      streak: profile.currentStreak,
      lessonsCompleted: profile.totalLessonsCompleted,
      quizAverage: profile.averageQuizScore,
      strengths: profile.strengths.map(id => getTopicName(id)),
      weaknesses: profile.weaknesses.map(id => getTopicName(id)),
    };
  }

  // ── Event Recording ──────────────────────────────────────────────

  recordLessonStart(courseId: string, lessonId: string): void {
    const topicId = getTopicId(parseInt(courseId) || 1);
    const meta = intelligenceStore.getContentMetadata(lessonId);

    processLessonEvent({
      type: 'lesson_start',
      userId: intelligenceStore.getProfile()?.userId || '',
      courseId,
      lessonId,
      moduleIndex: meta?.moduleIndex || 0,
      timestamp: Date.now(),
      metadata: {
        topicId,
        difficulty: meta?.difficultyLevel,
      },
    });
  }

  recordLessonComplete(courseId: string, lessonId: string, timeSpentSeconds: number): void {
    const topicId = getTopicId(parseInt(courseId) || 1);
    const meta = intelligenceStore.getContentMetadata(lessonId);

    processLessonEvent({
      type: 'lesson_complete',
      userId: intelligenceStore.getProfile()?.userId || '',
      courseId,
      lessonId,
      moduleIndex: meta?.moduleIndex || 0,
      timestamp: Date.now(),
      metadata: {
        timeSpentSeconds,
        topicId,
        difficulty: meta?.difficultyLevel,
      },
    });
  }

  recordQuizSubmit(
    courseId: string,
    lessonId: string,
    score: number,
    attempt: number = 1
  ): void {
    const topicId = getTopicId(parseInt(courseId) || 1);
    const meta = intelligenceStore.getContentMetadata(lessonId);

    processLessonEvent({
      type: 'quiz_submit',
      userId: intelligenceStore.getProfile()?.userId || '',
      courseId,
      lessonId,
      moduleIndex: meta?.moduleIndex || 0,
      timestamp: Date.now(),
      metadata: {
        quizScore: score,
        quizAttempt: attempt,
        topicId,
        difficulty: meta?.difficultyLevel,
      },
    });
  }

  recordQuizRetake(courseId: string, lessonId: string): void {
    const topicId = getTopicId(parseInt(courseId) || 1);

    processLessonEvent({
      type: 'quiz_retake',
      userId: intelligenceStore.getProfile()?.userId || '',
      courseId,
      lessonId,
      moduleIndex: 0,
      timestamp: Date.now(),
      metadata: { topicId },
    });
  }

  recordNoteTaken(courseId: string, lessonId: string): void {
    const topicId = getTopicId(parseInt(courseId) || 1);

    processLessonEvent({
      type: 'note_taken',
      userId: intelligenceStore.getProfile()?.userId || '',
      courseId,
      lessonId,
      moduleIndex: 0,
      timestamp: Date.now(),
      metadata: { topicId },
    });
  }

  recordLessonRevisit(courseId: string, lessonId: string): void {
    const topicId = getTopicId(parseInt(courseId) || 1);

    processLessonEvent({
      type: 'lesson_revisit',
      userId: intelligenceStore.getProfile()?.userId || '',
      courseId,
      lessonId,
      moduleIndex: 0,
      timestamp: Date.now(),
      metadata: { topicId },
    });
  }

  recordSessionStart(): void {
    const profile = intelligenceStore.getProfile();
    if (!profile) return;

    intelligenceStore.recordSession({
      type: 'session_start',
      userId: profile.userId,
      timestamp: Date.now(),
      metadata: {},
    });

    intelligenceStore.updateProfile({
      sessionCount: profile.sessionCount + 1,
    });
  }

  recordSessionEnd(durationSeconds: number): void {
    const profile = intelligenceStore.getProfile();
    if (!profile) return;

    intelligenceStore.recordSession({
      type: 'session_end',
      userId: profile.userId,
      timestamp: Date.now(),
      metadata: { durationSeconds },
    });
  }

  // ── Evaluation ───────────────────────────────────────────────────

  evaluateQuiz(
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
    const result = scoreQuiz(courseId, lessonId, answers, questions);
    // Also record the quiz submission
    this.recordQuizSubmit(courseId, lessonId, result.score);
    return result;
  }

  getMisunderstandings(): string[] {
    const profile = this.getProfile();
    if (!profile) return [];
    return detectMisunderstandings(profile);
  }

  checkReadiness(targetDifficulty: DifficultyLevel): { ready: boolean; reasons: string[] } {
    const profile = this.getProfile();
    if (!profile) return { ready: true, reasons: [] };
    return assessReadiness(profile, targetDifficulty);
  }

  getComprehensionEstimate(courseId: string): number {
    const profile = this.getProfile();
    if (!profile) return 50;
    return estimateComprehension(courseId, profile);
  }

  // ── Adaptive Path ────────────────────────────────────────────────

  getRecommendations(): AdaptivePath {
    const profile = this.getProfile();
    const userId = profile?.userId || '';
    return generateAdaptivePath(userId);
  }

  getNextLesson(): LessonRecommendation | null {
    return this.getRecommendations().nextLesson;
  }

  shouldReview(topicId: string): boolean {
    const profile = this.getProfile();
    if (!profile) return false;
    return shouldTriggerReview(profile, topicId);
  }

  getSessionLength(): number {
    const profile = this.getProfile();
    if (!profile) return 30;
    return getOptimalSessionLength(profile);
  }

  // ── Analytics ────────────────────────────────────────────────────

  getPerformanceAnalysis(): PerformanceAnalysis {
    const profile = this.getProfile();
    const userId = profile?.userId || '';
    return generatePerformanceAnalysis(userId);
  }

  getPredictions(): PredictiveSignal[] {
    const profile = this.getProfile();
    if (!profile) return [];
    return generatePredictiveSignals(profile);
  }

  getEngagementTrend(): 'improving' | 'stable' | 'declining' {
    const profile = this.getProfile();
    if (!profile) return 'stable';
    return getEngagementTrend(profile.userId);
  }

  // ── Teaching ─────────────────────────────────────────────────────

  getContentComplexity(): 'simplified' | 'standard' | 'detailed' {
    const profile = this.getProfile();
    if (!profile) return 'standard';
    return getExplanationComplexity(profile);
  }

  getExamplesForTopic(topicId: string): string[] {
    const profile = this.getProfile();
    if (!profile) return [];
    return getSuggestedExamples(topicId, profile);
  }

  // ── Content Metadata ─────────────────────────────────────────────

  getLessonMetadata(lessonId: string): ContentMetadata | undefined {
    return intelligenceStore.getContentMetadata(lessonId);
  }

  // ── Subscription ─────────────────────────────────────────────────

  subscribe(listener: () => void): () => void {
    return intelligenceStore.subscribe(listener);
  }

  // ── Reset ────────────────────────────────────────────────────────

  reset(): void {
    intelligenceStore.reset();
    this.metadataInitialized = false;
  }
}

// Export singleton
export const vibeAI = new IntelligenceEngine();
export default vibeAI;

// Re-export types for convenience
export type {
  LearnerProfile,
  LessonEvent,
  SessionEvent,
  AdaptivePath,
  PerformanceAnalysis,
  PredictiveSignal,
  ContentMetadata,
  LessonRecommendation,
  DifficultyLevel,
  QuizResult,
};
