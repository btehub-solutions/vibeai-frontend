// ═══════════════════════════════════════════════════════════════════════
// VibeAI Multi-Agent Intelligence System — Public API
// ═══════════════════════════════════════════════════════════════════════

export { vibeAIChat, default } from './orchestrator';
export { isAIAvailable } from './ai-provider';
export { 
  createSessionProfile,
  getSessionProfile,
  updateSessionProfile,
  generateAdaptiveSuggestions,
  updateDashboardContext,
  cleanupOldSessions,
} from './session-profile';

export type {
  AgentRole,
  AgentRequest,
  AgentResponse,
  ChatMessage,
  LearnerSessionProfile,
  PlatformContext,
  PageContext,
  DifficultyLevel,
  ConfusionLevel,
  LearnerMood,
  ExerciseData,
  QuizData,
  ToolRecommendation,
  NewsDigestItem,
  OrchestrationDecision,
  AIProviderConfig,
} from './types';
