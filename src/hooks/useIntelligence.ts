// ═══════════════════════════════════════════════════════════════════════
// useIntelligence — React hook for the VibeAI Intelligence Engine
// Provides reactive access to all intelligence services
// ═══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { vibeAI } from '@/intelligence';
import type {
  LearnerProfile,
  AdaptivePath,
  PerformanceAnalysis,
  PredictiveSignal,
  LessonRecommendation,
  DifficultyLevel,
  QuizResult,
} from '@/intelligence';

export interface UseIntelligenceResult {
  // State
  profile: LearnerProfile | null;
  adaptivePath: AdaptivePath | null;
  performance: PerformanceAnalysis | null;
  predictions: PredictiveSignal[];
  isInitialized: boolean;

  // Profile Summary
  profileSummary: {
    level: string;
    score: number;
    speed: string;
    risk: string;
    streak: number;
    lessonsCompleted: number;
    quizAverage: number;
    strengths: string[];
    weaknesses: string[];
  } | null;

  // Actions
  initialize: (userId: string) => void;
  recordLessonStart: (courseId: string, lessonId: string) => void;
  recordLessonComplete: (courseId: string, lessonId: string, timeSpentSeconds: number) => void;
  recordQuizSubmit: (courseId: string, lessonId: string, score: number) => void;
  recordQuizRetake: (courseId: string, lessonId: string) => void;
  recordNoteTaken: (courseId: string, lessonId: string) => void;
  recordSessionStart: () => void;
  recordSessionEnd: (durationSeconds: number) => void;
  evaluateQuiz: (
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
  ) => QuizResult;

  // Queries
  getRecommendations: () => AdaptivePath;
  getNextLesson: () => LessonRecommendation | null;
  getPerformanceAnalysis: () => PerformanceAnalysis;
  checkReadiness: (difficulty: DifficultyLevel) => { ready: boolean; reasons: string[] };
  getComprehensionEstimate: (courseId: string) => number;
  getMisunderstandings: () => string[];
  getContentComplexity: () => 'simplified' | 'standard' | 'detailed';
  getSessionLength: () => number;
}

export function useIntelligence(): UseIntelligenceResult {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [adaptivePath, setAdaptivePath] = useState<AdaptivePath | null>(null);
  const [performance, setPerformance] = useState<PerformanceAnalysis | null>(null);
  const [predictions, setPredictions] = useState<PredictiveSignal[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const refreshCounter = useRef(0);

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = vibeAI.subscribe(() => {
      refreshCounter.current += 1;
      setProfile(vibeAI.getProfile());
    });
    return unsubscribe;
  }, []);

  // Initialize
  const initialize = useCallback((userId: string) => {
    vibeAI.initialize(userId);
    setProfile(vibeAI.getProfile());
    setIsInitialized(true);

    // Generate initial recommendations and analysis
    const path = vibeAI.getRecommendations();
    setAdaptivePath(path);

    const perf = vibeAI.getPerformanceAnalysis();
    setPerformance(perf);

    const preds = vibeAI.getPredictions();
    setPredictions(preds);
  }, []);

  // Profile summary
  const profileSummary = useMemo(() => {
    return vibeAI.getProfileSummary();
  }, [profile]);

  // Record actions
  const recordLessonStart = useCallback((courseId: string, lessonId: string) => {
    vibeAI.recordLessonStart(courseId, lessonId);
    vibeAI.recordSessionStart();
  }, []);

  const recordLessonComplete = useCallback((courseId: string, lessonId: string, timeSpentSeconds: number) => {
    vibeAI.recordLessonComplete(courseId, lessonId, timeSpentSeconds);
    // Refresh recommendations after completion
    const path = vibeAI.getRecommendations();
    setAdaptivePath(path);
    const perf = vibeAI.getPerformanceAnalysis();
    setPerformance(perf);
  }, []);

  const recordQuizSubmit = useCallback((courseId: string, lessonId: string, score: number) => {
    vibeAI.recordQuizSubmit(courseId, lessonId, score);
    // Refresh after quiz
    const path = vibeAI.getRecommendations();
    setAdaptivePath(path);
    const perf = vibeAI.getPerformanceAnalysis();
    setPerformance(perf);
    const preds = vibeAI.getPredictions();
    setPredictions(preds);
  }, []);

  const recordQuizRetake = useCallback((courseId: string, lessonId: string) => {
    vibeAI.recordQuizRetake(courseId, lessonId);
  }, []);

  const recordNoteTaken = useCallback((courseId: string, lessonId: string) => {
    vibeAI.recordNoteTaken(courseId, lessonId);
  }, []);

  const recordSessionStart = useCallback(() => {
    vibeAI.recordSessionStart();
  }, []);

  const recordSessionEnd = useCallback((durationSeconds: number) => {
    vibeAI.recordSessionEnd(durationSeconds);
  }, []);

  const evaluateQuiz = useCallback((
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
  ): QuizResult => {
    return vibeAI.evaluateQuiz(courseId, lessonId, answers, questions);
  }, []);

  // Queries
  const getRecommendations = useCallback(() => vibeAI.getRecommendations(), []);
  const getNextLesson = useCallback(() => vibeAI.getNextLesson(), []);
  const getPerformanceAnalysis = useCallback(() => vibeAI.getPerformanceAnalysis(), []);
  const checkReadiness = useCallback((difficulty: DifficultyLevel) => vibeAI.checkReadiness(difficulty), []);
  const getComprehensionEstimate = useCallback((courseId: string) => vibeAI.getComprehensionEstimate(courseId), []);
  const getMisunderstandings = useCallback(() => vibeAI.getMisunderstandings(), []);
  const getContentComplexity = useCallback(() => vibeAI.getContentComplexity(), []);
  const getSessionLength = useCallback(() => vibeAI.getSessionLength(), []);

  return {
    profile,
    adaptivePath,
    performance,
    predictions,
    isInitialized,
    profileSummary,
    initialize,
    recordLessonStart,
    recordLessonComplete,
    recordQuizSubmit,
    recordQuizRetake,
    recordNoteTaken,
    recordSessionStart,
    recordSessionEnd,
    evaluateQuiz,
    getRecommendations,
    getNextLesson,
    getPerformanceAnalysis,
    checkReadiness,
    getComprehensionEstimate,
    getMisunderstandings,
    getContentComplexity,
    getSessionLength,
  };
}
