// ═══════════════════════════════════════════════════════════════════════
// VibeAI Intelligence Store
// In-memory state + localStorage persistence
// Designed for future migration to Supabase without refactoring
// ═══════════════════════════════════════════════════════════════════════

import {
  LearnerProfile,
  LessonEvent,
  SessionEvent,
  ContentMetadata,
  AdaptivePath,
  PerformanceAnalysis,
  PredictiveSignal,
  DifficultyLevel,
  TopicProficiency,
} from './types';

// ─── Storage Keys ────────────────────────────────────────────────────

const STORAGE_KEYS = {
  PROFILE: 'vibeai_learner_profile',
  EVENTS: 'vibeai_lesson_events',
  SESSIONS: 'vibeai_session_events',
  ADAPTIVE_PATH: 'vibeai_adaptive_path',
  PERFORMANCE: 'vibeai_performance',
  PREDICTIONS: 'vibeai_predictions',
  CONTENT_META: 'vibeai_content_metadata',
} as const;

// ─── Default Profile Factory ─────────────────────────────────────────

function createDefaultProfile(userId: string): LearnerProfile {
  return {
    userId,
    knowledgeLevel: 'beginner',
    learningSpeed: 'moderate',
    overallScore: 0,
    engagementRisk: 'low',
    recommendedDifficulty: 'beginner',
    topicProficiencies: {},
    strengths: [],
    weaknesses: [],
    totalLessonsCompleted: 0,
    totalQuizzesTaken: 0,
    averageQuizScore: 0,
    totalTimeSpentSeconds: 0,
    currentStreak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    sessionCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// ─── Persistence Helpers ─────────────────────────────────────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('[VibeAI Store] Failed to persist data:', e);
  }
}

// ─── Intelligence Store (Singleton) ──────────────────────────────────

class IntelligenceStore {
  private profile: LearnerProfile | null = null;
  private events: LessonEvent[] = [];
  private sessions: SessionEvent[] = [];
  private adaptivePath: AdaptivePath | null = null;
  private performance: PerformanceAnalysis | null = null;
  private predictions: PredictiveSignal[] = [];
  private contentMetadata: Map<string, ContentMetadata> = new Map();
  private listeners: Set<() => void> = new Set();
  private initialized = false;

  // ── Initialization ───────────────────────────────────────────────

  initialize(userId: string): void {
    if (this.initialized && this.profile?.userId === userId) return;

    this.profile = loadFromStorage<LearnerProfile>(
      `${STORAGE_KEYS.PROFILE}_${userId}`,
      createDefaultProfile(userId)
    );
    this.events = loadFromStorage<LessonEvent[]>(
      `${STORAGE_KEYS.EVENTS}_${userId}`,
      []
    );
    this.sessions = loadFromStorage<SessionEvent[]>(
      `${STORAGE_KEYS.SESSIONS}_${userId}`,
      []
    );
    this.adaptivePath = loadFromStorage<AdaptivePath | null>(
      `${STORAGE_KEYS.ADAPTIVE_PATH}_${userId}`,
      null
    );
    this.performance = loadFromStorage<PerformanceAnalysis | null>(
      `${STORAGE_KEYS.PERFORMANCE}_${userId}`,
      null
    );
    this.predictions = loadFromStorage<PredictiveSignal[]>(
      `${STORAGE_KEYS.PREDICTIONS}_${userId}`,
      []
    );

    // Update streak on initialization
    this.updateStreak();
    this.initialized = true;
    this.notifyListeners();
  }

  // ── Subscription ─────────────────────────────────────────────────

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(fn => fn());
  }

  // ── Profile Operations ───────────────────────────────────────────

  getProfile(): LearnerProfile | null {
    return this.profile;
  }

  updateProfile(updates: Partial<LearnerProfile>): void {
    if (!this.profile) return;
    this.profile = { ...this.profile, ...updates, updatedAt: Date.now() };
    this.persistProfile();
    this.notifyListeners();
  }

  updateTopicProficiency(topicId: string, updates: Partial<TopicProficiency>): void {
    if (!this.profile) return;
    const existing = this.profile.topicProficiencies[topicId] || {
      topicId,
      topicName: topicId,
      score: 0,
      lessonsCompleted: 0,
      quizScores: [],
      averageReadingTime: 0,
      lastAccessed: Date.now(),
    };

    this.profile.topicProficiencies[topicId] = { ...existing, ...updates, lastAccessed: Date.now() };
    this.recalculateStrengthsWeaknesses();
    this.persistProfile();
    this.notifyListeners();
  }

  private recalculateStrengthsWeaknesses(): void {
    if (!this.profile) return;
    const proficiencies = Object.values(this.profile.topicProficiencies);
    if (proficiencies.length === 0) return;

    const sorted = [...proficiencies].sort((a, b) => b.score - a.score);
    this.profile.strengths = sorted
      .filter(t => t.score >= 70)
      .slice(0, 5)
      .map(t => t.topicId);
    this.profile.weaknesses = sorted
      .filter(t => t.score < 50 && t.lessonsCompleted > 0)
      .slice(-5)
      .map(t => t.topicId);
  }

  // ── Event Recording ──────────────────────────────────────────────

  recordEvent(event: LessonEvent): void {
    this.events.push(event);
    // Keep last 500 events to prevent storage bloat
    if (this.events.length > 500) {
      this.events = this.events.slice(-500);
    }
    this.persistEvents();
    this.notifyListeners();
  }

  recordSession(event: SessionEvent): void {
    this.sessions.push(event);
    if (this.sessions.length > 100) {
      this.sessions = this.sessions.slice(-100);
    }
    this.persistSessions();
    this.notifyListeners();
  }

  getEvents(filters?: { courseId?: string; lessonId?: string; type?: string; since?: number }): LessonEvent[] {
    let filtered = [...this.events];
    if (filters?.courseId) filtered = filtered.filter(e => e.courseId === filters.courseId);
    if (filters?.lessonId) filtered = filtered.filter(e => e.lessonId === filters.lessonId);
    if (filters?.type) filtered = filtered.filter(e => e.type === filters.type);
    if (filters?.since) filtered = filtered.filter(e => e.timestamp >= filters.since);
    return filtered;
  }

  getSessions(since?: number): SessionEvent[] {
    if (since) return this.sessions.filter(s => s.timestamp >= since);
    return [...this.sessions];
  }

  // ── Adaptive Path ────────────────────────────────────────────────

  getAdaptivePath(): AdaptivePath | null {
    return this.adaptivePath;
  }

  setAdaptivePath(path: AdaptivePath): void {
    this.adaptivePath = path;
    if (this.profile) {
      saveToStorage(`${STORAGE_KEYS.ADAPTIVE_PATH}_${this.profile.userId}`, path);
    }
    this.notifyListeners();
  }

  // ── Performance ──────────────────────────────────────────────────

  getPerformance(): PerformanceAnalysis | null {
    return this.performance;
  }

  setPerformance(analysis: PerformanceAnalysis): void {
    this.performance = analysis;
    if (this.profile) {
      saveToStorage(`${STORAGE_KEYS.PERFORMANCE}_${this.profile.userId}`, analysis);
    }
    this.notifyListeners();
  }

  // ── Predictions ──────────────────────────────────────────────────

  getPredictions(): PredictiveSignal[] {
    return [...this.predictions];
  }

  setPredictions(predictions: PredictiveSignal[]): void {
    this.predictions = predictions;
    if (this.profile) {
      saveToStorage(`${STORAGE_KEYS.PREDICTIONS}_${this.profile.userId}`, predictions);
    }
    this.notifyListeners();
  }

  // ── Content Metadata ─────────────────────────────────────────────

  setContentMetadata(lessonId: string, metadata: ContentMetadata): void {
    this.contentMetadata.set(lessonId, metadata);
  }

  getContentMetadata(lessonId: string): ContentMetadata | undefined {
    return this.contentMetadata.get(lessonId);
  }

  getAllContentMetadata(): ContentMetadata[] {
    return Array.from(this.contentMetadata.values());
  }

  // ── Streak Logic ─────────────────────────────────────────────────

  private updateStreak(): void {
    if (!this.profile) return;
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.profile.lastActiveDate;

    if (lastActive === today) return; // Already active today

    const lastDate = new Date(lastActive);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (86400000));

    if (diffDays === 1) {
      // Consecutive day — increment streak
      this.profile.currentStreak += 1;
    } else if (diffDays > 1) {
      // Streak broken
      this.profile.currentStreak = 0;
    }

    this.profile.lastActiveDate = today;
    this.persistProfile();
  }

  markActive(): void {
    if (!this.profile) return;
    const today = new Date().toISOString().split('T')[0];
    if (this.profile.lastActiveDate !== today) {
      this.updateStreak();
      this.profile.lastActiveDate = today;
      // If streak was 0 (broken or first day), start at 1
      if (this.profile.currentStreak === 0) {
        this.profile.currentStreak = 1;
      }
      this.persistProfile();
      this.notifyListeners();
    }
  }

  // ── Persistence ──────────────────────────────────────────────────

  private persistProfile(): void {
    if (!this.profile) return;
    saveToStorage(`${STORAGE_KEYS.PROFILE}_${this.profile.userId}`, this.profile);
  }

  private persistEvents(): void {
    if (!this.profile) return;
    saveToStorage(`${STORAGE_KEYS.EVENTS}_${this.profile.userId}`, this.events);
  }

  private persistSessions(): void {
    if (!this.profile) return;
    saveToStorage(`${STORAGE_KEYS.SESSIONS}_${this.profile.userId}`, this.sessions);
  }

  // ── Reset (for testing) ──────────────────────────────────────────

  reset(): void {
    if (this.profile) {
      const userId = this.profile.userId;
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(`${key}_${userId}`);
      });
    }
    this.profile = null;
    this.events = [];
    this.sessions = [];
    this.adaptivePath = null;
    this.performance = null;
    this.predictions = [];
    this.contentMetadata.clear();
    this.initialized = false;
    this.notifyListeners();
  }
}

// Export singleton
export const intelligenceStore = new IntelligenceStore();
export default intelligenceStore;
