// ═══════════════════════════════════════════════════════════════════════
// useVibeAIChat — React hook for the multi-agent chat system
// ═══════════════════════════════════════════════════════════════════════

import { useState, useCallback, useRef, useEffect } from 'react';
import { vibeAIChat } from '@/services/ai-agents';
import { isAIAvailable } from '@/services/ai-agents/ai-provider';
import { generateAdaptiveSuggestions } from '@/services/ai-agents/session-profile';
import { 
  ChatMessage, 
  PlatformContext, 
  AgentRole,
  LearnerSessionProfile,
} from '@/services/ai-agents/types';

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isOpen: boolean;
  contextIndicator: string;
  suggestions: string[];
  currentAgent: AgentRole | null;
  sessionProfile: LearnerSessionProfile | null;
  error: string | null;
  isAvailable: boolean;
}

export function useVibeAIChat(platformContext: PlatformContext) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [contextIndicator, setContextIndicator] = useState('VibeAI Assistant');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentAgent, setCurrentAgent] = useState<AgentRole | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const sessionInitialized = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // ── Initialize Session ──────────────────────────────────────────
  useEffect(() => {
    if (!sessionInitialized.current) {
      vibeAIChat.initSession();
      sessionInitialized.current = true;

      // Set initial welcome message
      const welcomeMessage: ChatMessage = {
        id: `msg_welcome_${Date.now()}`,
        role: 'assistant',
        content: getContextualWelcome(platformContext),
        timestamp: Date.now(),
        agentRole: 'tutor',
        metadata: {
          contextIndicator: getContextLabel(platformContext),
          suggestions: getInitialSuggestions(platformContext),
        },
      };

      setMessages([welcomeMessage]);
      setSuggestions(welcomeMessage.metadata?.suggestions || []);
      setContextIndicator(welcomeMessage.metadata?.contextIndicator || 'VibeAI Assistant');
    }
  }, []);

  // ── Update context indicator when page changes ──────────────────
  useEffect(() => {
    const label = getContextLabel(platformContext);
    setContextIndicator(label);
  }, [platformContext.currentPage, platformContext.courseTitle, platformContext.lessonTitle]);

  // ── Send Message ─────────────────────────────────────────────────
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setContextIndicator('Thinking...');

    try {
      const allMessages = [...messages, userMessage];
      
      const response = await vibeAIChat.chat(
        content.trim(),
        allMessages,
        platformContext
      );

      const assistantMessage: ChatMessage = {
        id: `msg_asst_${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: Date.now(),
        agentRole: response.agentRole,
        metadata: {
          contextIndicator: response.contextIndicator,
          suggestions: response.suggestions,
          exerciseData: response.exerciseData,
          quizData: response.quizData,
          toolRecommendations: response.toolRecommendations,
          newsDigest: response.newsDigest,
        },
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentAgent(response.agentRole);
      setContextIndicator(response.contextIndicator || getContextLabel(platformContext));
      setSuggestions(response.suggestions || []);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMsg);
      
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: `msg_error_${Date.now()}`,
        role: 'assistant',
        content: `I'm having trouble connecting right now. ${errorMsg}\n\nPlease check that your API key is set in the environment variables and try again.`,
        timestamp: Date.now(),
        agentRole: 'tutor',
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, platformContext]);

  // ── Send Suggestion ─────────────────────────────────────────────
  const sendSuggestion = useCallback((suggestion: string) => {
    sendMessage(suggestion);
  }, [sendMessage]);

  // ── Toggle Chat ──────────────────────────────────────────────────
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  // ── Clear Chat ──────────────────────────────────────────────────
  const clearChat = useCallback(() => {
    vibeAIChat.initSession();
    const welcomeMessage: ChatMessage = {
      id: `msg_welcome_${Date.now()}`,
      role: 'assistant',
      content: getContextualWelcome(platformContext),
      timestamp: Date.now(),
      agentRole: 'tutor',
      metadata: {
        contextIndicator: getContextLabel(platformContext),
        suggestions: getInitialSuggestions(platformContext),
      },
    };
    setMessages([welcomeMessage]);
    setSuggestions(welcomeMessage.metadata?.suggestions || []);
    setError(null);
  }, [platformContext]);

  return {
    messages,
    isLoading,
    isOpen,
    contextIndicator,
    suggestions,
    currentAgent,
    error,
    isAvailable: isAIAvailable(),
    sessionProfile: vibeAIChat.getSession(),
    sendMessage,
    sendSuggestion,
    toggleChat,
    openChat,
    closeChat,
    clearChat,
    messagesEndRef,
  };
}

// ─── Context Helpers ─────────────────────────────────────────────────

function getContextLabel(ctx: PlatformContext): string {
  switch (ctx.currentPage) {
    case 'dashboard':
      return 'Dashboard Assistant';
    case 'course-module':
      return ctx.courseTitle ? `Studying: ${ctx.courseTitle}` : 'Course Assistant';
    case 'lesson-player':
      return ctx.lessonTitle ? `Helping with: ${ctx.lessonTitle}` : 'Lesson Assistant';
    case 'ai-tools':
      return ctx.toolName ? `Exploring: ${ctx.toolName}` : 'AI Tools Guide';
    case 'ai-updates':
      return 'Daily AI Updates';
    case 'chat-page':
      return 'VibeAI Playground';
    case 'hero':
      return 'Welcome to VibeAI';
    default:
      return 'VibeAI Assistant';
  }
}

function getContextualWelcome(ctx: PlatformContext): string {
  switch (ctx.currentPage) {
    case 'dashboard':
      return `Welcome back! 👋 I'm your VibeAI learning mentor. I can see your dashboard — how about we continue where you left off, or would you like me to suggest what to learn next?`;
    case 'course-module':
      return ctx.courseTitle 
        ? `I see you're exploring **${ctx.courseTitle}**! 📚 I can help you understand the course modules, explain concepts, or quiz you on what you've learned. What would you like to do?`
        : `Ready to learn! 📚 I can explain concepts from any course, generate quizzes, or recommend what to study next. What interests you?`;
    case 'lesson-player':
      return ctx.lessonTitle
        ? `Let's dive into **${ctx.lessonTitle}**! 🎯 I'm here to explain anything you find tricky, give examples, or test your understanding. Just ask away!`
        : `I'm here to help with your lesson! 🎯 Ask me to explain concepts, give examples, or quiz you.`;
    case 'ai-tools':
      return ctx.toolName
        ? `Let's explore **${ctx.toolName}**! 🔧 I can explain how to use it, compare it with alternatives, or show you practical use cases. What would you like to know?`
        : `Welcome to the AI Tools section! 🔧 I can help you discover the best AI tools, compare options, and find what fits your needs and budget.`;
    case 'ai-updates':
      return `Here's what's happening in AI! 📰 I can summarize the latest developments, explain how trends affect your learning, or help you understand any AI news. What catches your eye?`;
    case 'hero':
      return `Welcome to **VibeAI** — Nigeria's premier AI education platform! 🚀\n\nI'm your intelligent learning mentor. Whether you're a complete beginner or experienced professional, I'll guide you through your AI journey.\n\nWhat would you like to learn about AI today?`;
    default:
      return `Hello! 👋 I'm VibeAI, your intelligent AI learning mentor. I can teach concepts, generate quizzes, recommend courses, and explore AI tools with you. How can I help?`;
  }
}

function getInitialSuggestions(ctx: PlatformContext): string[] {
  switch (ctx.currentPage) {
    case 'dashboard':
      return ['What should I learn next?', 'Show my progress', 'Suggest a quick lesson', 'Quiz me on AI basics'];
    case 'course-module':
      return [`Explain this course`, 'What are the key concepts?', 'Test my knowledge', 'Recommend related tools'];
    case 'lesson-player':
      return ['Explain this simply', 'Give me an example', 'Quiz me on this topic', 'How is this used in Nigeria?'];
    case 'ai-tools':
      return ['Compare top AI tools', 'Best free AI tools', 'Which tool for beginners?', 'How to use this tool'];
    case 'ai-updates':
      return ['Summarize today\'s AI news', 'What\'s trending in AI?', 'How does this affect me?', 'Explain this development'];
    case 'hero':
      return ['What is AI?', 'How do I start learning?', 'What courses do you have?', 'Show me AI tools'];
    default:
      return ['Explain AI for beginners', 'What AI tools are trending?', 'Quiz me on AI', 'Plan my learning path'];
  }
}
