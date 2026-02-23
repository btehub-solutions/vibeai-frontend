// ═══════════════════════════════════════════════════════════════════════
// Learner Session Intelligence — In-Memory Session Profiling
// Tracks learner state, detects confusion, adapts dynamically
// ═══════════════════════════════════════════════════════════════════════

import {
  LearnerSessionProfile,
  DifficultyLevel,
  ConfusionLevel,
  LearnerMood,
  ChatMessage,
} from './types';

// ─── Session Store (In-Memory) ───────────────────────────────────────

const sessionProfiles = new Map<string, LearnerSessionProfile>();

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ─── Create Default Profile ──────────────────────────────────────────

export function createSessionProfile(userId?: string): LearnerSessionProfile {
  const sessionId = generateSessionId();
  
  const profile: LearnerSessionProfile = {
    sessionId,
    userId,
    currentTopic: '',
    topicHistory: [],
    difficultyLevel: 'beginner',
    confusionLevel: 'none',
    mood: 'neutral',
    questionsAsked: 0,
    conceptsExplained: [],
    exercisesCompleted: 0,
    quizScoresThisSession: [],
    averageMessageLength: 0,
    messageCount: 0,
    shortMessageStreak: 0,
    repeatTopicCount: 0,
    inferredGoals: [],
    preferredExplanationStyle: 'step-by-step',
    dashboardActivity: {
      coursesInProgress: [],
      overallProgress: 0,
      streak: 0,
      toolsExplored: [],
    },
    sessionStartedAt: Date.now(),
    lastInteractionAt: Date.now(),
  };
  
  sessionProfiles.set(sessionId, profile);
  return profile;
}

// ─── Get / Update Profile ────────────────────────────────────────────

export function getSessionProfile(sessionId: string): LearnerSessionProfile | null {
  return sessionProfiles.get(sessionId) || null;
}

export function updateSessionProfile(
  sessionId: string, 
  updates: Partial<LearnerSessionProfile>
): LearnerSessionProfile | null {
  const profile = sessionProfiles.get(sessionId);
  if (!profile) return null;
  
  const updated = { ...profile, ...updates, lastInteractionAt: Date.now() };
  sessionProfiles.set(sessionId, updated);
  return updated;
}

// ─── Interaction Analysis ────────────────────────────────────────────

export function analyzeInteraction(
  sessionId: string,
  userMessage: string,
  conversationHistory: ChatMessage[]
): {
  confusionLevel: ConfusionLevel;
  mood: LearnerMood;
  suggestedDifficulty: DifficultyLevel;
  detectedTopic: string;
  isRepeatTopic: boolean;
} {
  const profile = sessionProfiles.get(sessionId);
  if (!profile) {
    return {
      confusionLevel: 'none',
      mood: 'neutral',
      suggestedDifficulty: 'beginner',
      detectedTopic: '',
      isRepeatTopic: false,
    };
  }

  const msgLower = userMessage.toLowerCase();
  const msgLength = userMessage.length;

  // ─── Confusion Detection ───────────────────────────────────────
  const confusionSignals = [
    'i don\'t understand',
    'confused',
    'what do you mean',
    'explain again',
    'still lost',
    'huh',
    'what?',
    'doesn\'t make sense',
    'too complex',
    'simplify',
    'i\'m lost',
    'can you break it down',
    'what is that',
    'i don\'t get it',
    'wetin be',        // Nigerian Pidgin
    'abeg explain',    // Nigerian Pidgin
    'no understand',   // Nigerian Pidgin
  ];
  
  const hasConfusionSignal = confusionSignals.some(s => msgLower.includes(s));
  const isVeryShort = msgLength < 15;
  const shortStreak = isVeryShort ? profile.shortMessageStreak + 1 : 0;
  
  let confusionLevel: ConfusionLevel = 'none';
  if (hasConfusionSignal && shortStreak > 2) confusionLevel = 'severe';
  else if (hasConfusionSignal) confusionLevel = 'moderate';
  else if (shortStreak > 3) confusionLevel = 'mild';

  // ─── Mood Detection ────────────────────────────────────────────
  const curiositySignals = ['how', 'why', 'what if', 'can i', 'tell me more', 'interesting'];
  const frustrationSignals = ['this is hard', 'frustrated', 'annoying', 'too difficult', 'give up'];
  const engagementSignals = ['cool', 'awesome', 'got it', 'makes sense', 'let\'s go', 'next'];
  
  let mood: LearnerMood = 'neutral';
  if (frustrationSignals.some(s => msgLower.includes(s))) mood = 'frustrated';
  else if (hasConfusionSignal) mood = 'confused';
  else if (engagementSignals.some(s => msgLower.includes(s))) mood = 'engaged';
  else if (curiositySignals.some(s => msgLower.includes(s))) mood = 'curious';

  // ─── Topic Detection ───────────────────────────────────────────
  const topicKeywords: Record<string, string[]> = {
    'AI Foundations': ['ai', 'artificial intelligence', 'what is ai'],
    'Machine Learning': ['machine learning', 'ml', 'training data', 'model training', 'supervised', 'unsupervised'],
    'Deep Learning': ['deep learning', 'neural network', 'cnn', 'rnn', 'layers'],
    'Natural Language Processing': ['nlp', 'natural language', 'text processing', 'tokenization', 'sentiment'],
    'Large Language Models': ['llm', 'gpt', 'language model', 'transformer', 'attention mechanism'],
    'Prompt Engineering': ['prompt', 'prompting', 'prompt engineering', 'chain of thought', 'few shot'],
    'Generative AI': ['generative', 'gen ai', 'image generation', 'text to image', 'midjourney', 'dalle'],
    'AI Chatbots': ['chatbot', 'conversational ai', 'dialog', 'chat system'],
    'AI Automation': ['automation', 'agent', 'workflow', 'n8n', 'make', 'zapier'],
    'Vibe Coding': ['vibe coding', 'coding with ai', 'copilot', 'cursor', 'code generation'],
    'AI Career': ['career', 'job', 'freelance', 'portfolio', 'interview'],
    'AI Tools': ['tool', 'runway', 'elevenlabs', 'notion ai', 'perplexity'],
  };
  
  let detectedTopic = profile.currentTopic;
  let topicScore = 0;
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    const matches = keywords.filter(k => msgLower.includes(k)).length;
    if (matches > topicScore) {
      topicScore = matches;
      detectedTopic = topic;
    }
  }
  
  const isRepeatTopic = detectedTopic === profile.currentTopic && profile.repeatTopicCount > 1;

  // ─── Difficulty Adjustment ─────────────────────────────────────
  let suggestedDifficulty = profile.difficultyLevel;
  
  if (confusionLevel === 'severe' || confusionLevel === 'moderate') {
    // Step down difficulty
    if (suggestedDifficulty === 'advanced') suggestedDifficulty = 'intermediate';
    else if (suggestedDifficulty === 'intermediate') suggestedDifficulty = 'beginner';
  } else if (mood === 'engaged' && profile.questionsAsked > 5) {
    // Learner is doing well, consider stepping up
    const avgQuizScore = profile.quizScoresThisSession.length > 0 
      ? profile.quizScoresThisSession.reduce((a, b) => a + b, 0) / profile.quizScoresThisSession.length 
      : 0;
    
    if (avgQuizScore > 80) {
      if (suggestedDifficulty === 'beginner') suggestedDifficulty = 'intermediate';
      else if (suggestedDifficulty === 'intermediate') suggestedDifficulty = 'advanced';
    }
  }

  // ─── Update Profile ────────────────────────────────────────────
  const newMessageCount = profile.messageCount + 1;
  const newAvgLength = ((profile.averageMessageLength * profile.messageCount) + msgLength) / newMessageCount;
  
  updateSessionProfile(sessionId, {
    confusionLevel,
    mood,
    difficultyLevel: suggestedDifficulty,
    currentTopic: detectedTopic || profile.currentTopic,
    topicHistory: detectedTopic && detectedTopic !== profile.currentTopic
      ? [...profile.topicHistory, detectedTopic].slice(-20)
      : profile.topicHistory,
    questionsAsked: profile.questionsAsked + (msgLower.includes('?') ? 1 : 0),
    messageCount: newMessageCount,
    averageMessageLength: newAvgLength,
    shortMessageStreak: shortStreak,
    repeatTopicCount: detectedTopic === profile.currentTopic 
      ? profile.repeatTopicCount + 1 
      : 0,
  });

  return {
    confusionLevel,
    mood,
    suggestedDifficulty,
    detectedTopic: detectedTopic || '',
    isRepeatTopic,
  };
}

// ─── Infer Explanation Style ─────────────────────────────────────────

export function inferExplanationStyle(
  profile: LearnerSessionProfile
): 'visual' | 'analogy' | 'technical' | 'step-by-step' {
  if (profile.difficultyLevel === 'beginner' || profile.confusionLevel !== 'none') {
    return 'analogy';
  }
  if (profile.difficultyLevel === 'advanced' && profile.mood === 'engaged') {
    return 'technical';
  }
  if (profile.confusionLevel === 'mild') {
    return 'step-by-step';
  }
  return profile.preferredExplanationStyle;
}

// ─── Generate Adaptive Suggestions ──────────────────────────────────

export function generateAdaptiveSuggestions(
  profile: LearnerSessionProfile
): string[] {
  const suggestions: string[] = [];
  
  // Based on confusion
  if (profile.confusionLevel === 'moderate' || profile.confusionLevel === 'severe') {
    suggestions.push('Explain this in simpler terms');
    suggestions.push('Give me a real-life example');
    suggestions.push('Break this down step by step');
  }
  
  // Based on topic
  if (profile.currentTopic) {
    suggestions.push(`Tell me more about ${profile.currentTopic}`);
    suggestions.push(`Quiz me on ${profile.currentTopic}`);
    suggestions.push(`How is ${profile.currentTopic} used in Nigeria?`);
  }
  
  // Based on engagement
  if (profile.mood === 'engaged') {
    suggestions.push('What should I learn next?');
    suggestions.push('Give me a practice exercise');
    suggestions.push('Show me advanced concepts');
  }
  
  // Based on inactivity (session duration)
  const sessionDurationMin = (Date.now() - profile.sessionStartedAt) / 60000;
  if (sessionDurationMin > 15 && profile.messageCount < 3) {
    suggestions.push('Suggest a quick lesson for me');
    suggestions.push('What AI topic should I explore?');
  }
  
  // Default suggestions if none generated
  if (suggestions.length === 0) {
    suggestions.push('Explain AI in simple terms');
    suggestions.push('What AI tools are trending?');
    suggestions.push('Help me with my current course');
    suggestions.push('Give me a practice exercise');
  }
  
  return suggestions.slice(0, 4);
}

// ─── Update Dashboard Context ────────────────────────────────────────

export function updateDashboardContext(
  sessionId: string,
  dashboardData: LearnerSessionProfile['dashboardActivity']
): void {
  updateSessionProfile(sessionId, { dashboardActivity: dashboardData });
}

// ─── Cleanup Old Sessions ───────────────────────────────────────────

export function cleanupOldSessions(maxAgeMs: number = 3600000): void {
  const now = Date.now();
  for (const [id, profile] of sessionProfiles.entries()) {
    if (now - profile.lastInteractionAt > maxAgeMs) {
      sessionProfiles.delete(id);
    }
  }
}
