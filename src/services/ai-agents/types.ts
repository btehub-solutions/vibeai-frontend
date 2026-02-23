// ═══════════════════════════════════════════════════════════════════════
// VibeAI Multi-Agent Intelligence System — Type Definitions
// ═══════════════════════════════════════════════════════════════════════

// ─── Agent Roles ─────────────────────────────────────────────────────

export type AgentRole = 
  | 'orchestrator'   // Routes requests, manages pipeline
  | 'tutor'          // Explains concepts, teaches, simplifies
  | 'evaluator'      // Checks understanding, generates quizzes
  | 'strategist'     // Recommends paths, next actions
  | 'research';      // Fetches contextual AI knowledge/tools

// ─── Page Context ────────────────────────────────────────────────────

export type PageContext = 
  | 'dashboard'
  | 'course-module'
  | 'lesson-player'
  | 'ai-tools'
  | 'ai-updates'
  | 'hero'
  | 'chat-page'
  | 'consultation'
  | 'settings'
  | 'unknown';

export interface PlatformContext {
  currentPage: PageContext;
  courseId?: string;
  courseTitle?: string;
  lessonId?: string;
  lessonTitle?: string;
  moduleIndex?: number;
  toolId?: string;
  toolName?: string;
  searchQuery?: string;
  additionalContext?: Record<string, unknown>;
}

// ─── Difficulty & Learning ───────────────────────────────────────────

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ConfusionLevel = 'none' | 'mild' | 'moderate' | 'severe';
export type LearnerMood = 'curious' | 'confused' | 'engaged' | 'frustrated' | 'neutral';

// ─── Learner Session Profile ─────────────────────────────────────────

export interface LearnerSessionProfile {
  sessionId: string;
  userId?: string;
  
  // Learning state
  currentTopic: string;
  topicHistory: string[];
  difficultyLevel: DifficultyLevel;
  confusionLevel: ConfusionLevel;
  mood: LearnerMood;
  
  // Progress signals
  questionsAsked: number;
  conceptsExplained: string[];
  exercisesCompleted: number;
  quizScoresThisSession: number[];
  
  // Interaction patterns
  averageMessageLength: number;
  messageCount: number;
  shortMessageStreak: number;   // consecutive short msgs = potential confusion
  repeatTopicCount: number;     // asking about same topic = struggling
  
  // Inferred goals
  inferredGoals: string[];
  preferredExplanationStyle: 'visual' | 'analogy' | 'technical' | 'step-by-step';
  
  // Dashboard context
  dashboardActivity: {
    coursesInProgress: string[];
    lastLessonCompleted?: string;
    overallProgress: number;
    streak: number;
    toolsExplored: string[];
  };
  
  // Timestamps
  sessionStartedAt: number;
  lastInteractionAt: number;
}

// ─── Messages ────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  agentRole?: AgentRole;
  metadata?: {
    contextIndicator?: string;
    suggestions?: string[];
    exerciseData?: ExerciseData;
    quizData?: QuizData;
    toolRecommendations?: ToolRecommendation[];
    newsDigest?: NewsDigestItem[];
    isStreaming?: boolean;
  };
}

export interface ExerciseData {
  type: 'practice' | 'project' | 'reflection';
  title: string;
  instructions: string;
  hints?: string[];
  difficulty: DifficultyLevel;
}

export interface QuizData {
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }>;
  topic: string;
  difficulty: DifficultyLevel;
}

export interface ToolRecommendation {
  name: string;
  category: string;
  reason: string;
  link: string;
  rating: number;
}

export interface NewsDigestItem {
  title: string;
  summary: string;
  relevance: string;
  source?: string;
}

// ─── Agent Request/Response ──────────────────────────────────────────

export interface AgentRequest {
  message: string;
  conversationHistory: ChatMessage[];
  learnerProfile: LearnerSessionProfile;
  platformContext: PlatformContext;
  agentRole?: AgentRole;
}

export interface AgentResponse {
  content: string;
  agentRole: AgentRole;
  contextIndicator?: string;
  suggestions?: string[];
  exerciseData?: ExerciseData;
  quizData?: QuizData;
  toolRecommendations?: ToolRecommendation[];
  newsDigest?: NewsDigestItem[];
  profileUpdates?: Partial<LearnerSessionProfile>;
}

// ─── Orchestrator Decision ───────────────────────────────────────────

export interface OrchestrationDecision {
  primaryAgent: AgentRole;
  secondaryAgents: AgentRole[];
  contextIndicator: string;
  reasoning: string;
}

// ─── AI Provider Config ──────────────────────────────────────────────

export interface AIProviderConfig {
  provider: 'gemini' | 'openai' | 'anthropic';
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}
