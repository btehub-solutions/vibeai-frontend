// ═══════════════════════════════════════════════════════════════════════
// VibeAI Intelligence Layer — Type Definitions
// ═══════════════════════════════════════════════════════════════════════

// ─── Learner Profile ─────────────────────────────────────────────────

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type EngagementRisk = 'low' | 'medium' | 'high' | 'critical';
export type LearningSpeed = 'slow' | 'moderate' | 'fast';

export interface TopicProficiency {
  topicId: string;        // e.g. "ai-foundations", "machine-learning"
  topicName: string;
  score: number;          // 0-100 proficiency score
  lessonsCompleted: number;
  quizScores: number[];   // history of quiz scores for this topic
  averageReadingTime: number; // seconds per lesson
  lastAccessed: number;   // timestamp
}

export interface LearnerProfile {
  userId: string;
  knowledgeLevel: DifficultyLevel;
  learningSpeed: LearningSpeed;
  overallScore: number;           // 0-100 composite knowledge score
  engagementRisk: EngagementRisk;
  recommendedDifficulty: DifficultyLevel;
  topicProficiencies: Record<string, TopicProficiency>;
  strengths: string[];            // topic IDs with high proficiency
  weaknesses: string[];           // topic IDs with low proficiency
  totalLessonsCompleted: number;
  totalQuizzesTaken: number;
  averageQuizScore: number;
  totalTimeSpentSeconds: number;
  currentStreak: number;          // consecutive days active
  lastActiveDate: string;         // ISO date string
  sessionCount: number;
  createdAt: number;
  updatedAt: number;
}

// ─── Behavioral Signals ──────────────────────────────────────────────

export interface LessonEvent {
  type: 'lesson_start' | 'lesson_complete' | 'quiz_submit' | 'quiz_retake' | 'note_taken' | 'lesson_revisit';
  userId: string;
  courseId: string;
  lessonId: string;
  moduleIndex: number;
  timestamp: number;
  metadata: {
    timeSpentSeconds?: number;
    quizScore?: number;
    quizAttempt?: number;
    difficulty?: DifficultyLevel;
    topicId?: string;
    contentLength?: number;
  };
}

export interface SessionEvent {
  type: 'session_start' | 'session_end';
  userId: string;
  timestamp: number;
  metadata: {
    durationSeconds?: number;
    lessonsViewed?: number;
    quizzesAttempted?: number;
  };
}

// ─── Content Metadata (Intelligence-enriched) ────────────────────────

export interface ContentMetadata {
  courseId: number;
  lessonId: string;
  moduleIndex: number;
  lessonIndex: number;
  difficultyLevel: DifficultyLevel;
  conceptDependencies: string[];  // lesson IDs that should be completed first
  skillOutcome: string[];         // skills gained after completing this lesson
  estimatedTimeMinutes: number;
  practiceRequired: boolean;
  topicId: string;                // which topic cluster this lesson belongs to
  conceptTags: string[];          // fine-grained concept tags
}

// ─── Adaptive Path & Recommendations ─────────────────────────────────

export interface LessonRecommendation {
  lessonId: string;
  courseId: number;
  title: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  type: 'next' | 'reinforcement' | 'practice' | 'advanced' | 'review';
  estimatedTime: string;
  difficulty: DifficultyLevel;
}

export interface AdaptivePath {
  userId: string;
  generatedAt: number;
  nextLesson: LessonRecommendation | null;
  reinforcementTopics: LessonRecommendation[];
  practiceActivities: LessonRecommendation[];
  advancedSuggestions: LessonRecommendation[];
  difficultyCalibration: {
    currentLevel: DifficultyLevel;
    recommendedLevel: DifficultyLevel;
    reason: string;
  };
  progressInsight: string;
}

// ─── Predictive Signals ──────────────────────────────────────────────

export interface PredictiveSignal {
  type: 'dropout_risk' | 'low_comprehension' | 'optimal_review' | 'ready_for_advanced';
  severity: 'info' | 'warning' | 'critical';
  confidence: number;     // 0-1 confidence in prediction
  message: string;
  recommendation: string;
  relatedTopics: string[];
  timestamp: number;
}

// ─── Performance Analysis ────────────────────────────────────────────

export interface PerformanceAnalysis {
  userId: string;
  generatedAt: number;
  overallTrend: 'improving' | 'stable' | 'declining';
  weeklyStats: {
    lessonsCompleted: number;
    averageQuizScore: number;
    totalTimeMinutes: number;
    engagementScore: number; // 0-100
  };
  topicBreakdown: Array<{
    topicId: string;
    topicName: string;
    proficiency: number;
    trend: 'improving' | 'stable' | 'declining';
    recommendation: string;
  }>;
  predictions: PredictiveSignal[];
  milestones: Array<{
    title: string;
    achieved: boolean;
    progress: number;
  }>;
}

// ─── Service Interfaces ──────────────────────────────────────────────

export interface ITeachingService {
  getContentForLevel(lessonId: string, level: DifficultyLevel): ContentMetadata | null;
  getExplanationComplexity(profile: LearnerProfile): 'simplified' | 'standard' | 'detailed';
  getSuggestedExamples(topicId: string, profile: LearnerProfile): string[];
}

export interface IEvaluationService {
  scoreQuiz(lessonId: string, answers: Record<string, string>): { score: number; patterns: string[] };
  detectMisunderstandings(profile: LearnerProfile): string[];
  assessReadiness(profile: LearnerProfile, targetDifficulty: DifficultyLevel): boolean;
}

export interface IStrategyService {
  decideNextAction(profile: LearnerProfile): LessonRecommendation;
  shouldTriggerReview(profile: LearnerProfile, topicId: string): boolean;
  getOptimalSessionLength(profile: LearnerProfile): number; // minutes
}

export interface IAnalyticsService {
  getPerformanceAnalysis(userId: string): PerformanceAnalysis;
  getEngagementTrend(userId: string): 'improving' | 'stable' | 'declining';
  getPredictiveSignals(userId: string): PredictiveSignal[];
}
