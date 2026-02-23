// ═══════════════════════════════════════════════════════════════════════
// VibeAI Orchestrator — Multi-Agent Intelligence Router
// Routes requests to specialized agents, manages response pipeline
// ═══════════════════════════════════════════════════════════════════════

import {
  AgentRole,
  AgentRequest,
  AgentResponse,
  ChatMessage,
  LearnerSessionProfile,
  PlatformContext,
  OrchestrationDecision,
} from './types';
import {
  getTutorPrompt,
  getEvaluatorPrompt,
  getStrategistPrompt,
  getResearchPrompt,
  getOrchestratorPrompt,
} from './prompt-templates';
import { generateAIResponse, generateStructuredResponse } from './ai-provider';
import {
  createSessionProfile,
  getSessionProfile,
  analyzeInteraction,
  generateAdaptiveSuggestions,
  inferExplanationStyle,
  updateSessionProfile,
} from './session-profile';

// ─── Orchestrator Class ──────────────────────────────────────────────

class VibeAIOrchestrator {
  private currentSessionId: string | null = null;

  // ── Session Management ────────────────────────────────────────────

  initSession(userId?: string): string {
    const profile = createSessionProfile(userId);
    this.currentSessionId = profile.sessionId;
    return profile.sessionId;
  }

  getSession(): LearnerSessionProfile | null {
    if (!this.currentSessionId) return null;
    return getSessionProfile(this.currentSessionId);
  }

  getSessionId(): string | null {
    return this.currentSessionId;
  }

  setSessionId(id: string): void {
    this.currentSessionId = id;
  }

  // ── Main Chat Pipeline ────────────────────────────────────────────

  async chat(
    message: string,
    conversationHistory: ChatMessage[],
    platformContext: PlatformContext
  ): Promise<AgentResponse> {
    // Ensure session exists
    if (!this.currentSessionId) {
      this.initSession();
    }

    const profile = this.getSession();
    if (!profile) {
      throw new Error('Session profile not found');
    }

    try {
      // Step 1: Analyze the interaction
      const analysis = analyzeInteraction(
        this.currentSessionId!,
        message,
        conversationHistory
      );

      // Step 2: Route to the appropriate agent
      const decision = await this.routeRequest(
        message,
        profile,
        platformContext,
        analysis
      );

      // Step 3: Generate response from the selected agent
      const response = await this.executeAgent(
        decision.primaryAgent,
        message,
        conversationHistory,
        profile,
        platformContext
      );

      // Step 4: Generate adaptive suggestions
      const updatedProfile = this.getSession()!;
      const suggestions = generateAdaptiveSuggestions(updatedProfile);

      // Step 5: Track concepts explained
      if (analysis.detectedTopic && !updatedProfile.conceptsExplained.includes(analysis.detectedTopic)) {
        updateSessionProfile(this.currentSessionId!, {
          conceptsExplained: [...updatedProfile.conceptsExplained, analysis.detectedTopic],
        });
      }

      return {
        content: response,
        agentRole: decision.primaryAgent,
        contextIndicator: decision.contextIndicator,
        suggestions,
        profileUpdates: {
          confusionLevel: analysis.confusionLevel,
          mood: analysis.mood,
          difficultyLevel: analysis.suggestedDifficulty,
          currentTopic: analysis.detectedTopic || profile.currentTopic,
        },
      };
    } catch (error) {
      console.error('[VibeAI Orchestrator] Error:', error);
      
      // Graceful fallback response  
      return {
        content: this.getFallbackResponse(message, profile),
        agentRole: 'tutor',
        contextIndicator: 'VibeAI Assistant',
        suggestions: generateAdaptiveSuggestions(profile),
      };
    }
  }

  // ── Agent Routing ──────────────────────────────────────────────────

  private async routeRequest(
    message: string,
    profile: LearnerSessionProfile,
    context: PlatformContext,
    analysis: ReturnType<typeof analyzeInteraction>
  ): Promise<OrchestrationDecision> {
    // Fast-path routing based on keywords (saves an API call)
    const fastRoute = this.fastRoute(message, context, analysis);
    if (fastRoute) return fastRoute;

    // AI-powered routing for ambiguous requests
    try {
      const orchestratorPrompt = getOrchestratorPrompt(profile, context);
      const decision = await generateStructuredResponse<{
        primaryAgent: AgentRole;
        contextIndicator: string;
        reasoning: string;
      }>(orchestratorPrompt, message, {
        primaryAgent: 'tutor',
        contextIndicator: 'Learning with VibeAI',
        reasoning: 'Default routing to tutor',
      });

      return {
        primaryAgent: decision.primaryAgent,
        secondaryAgents: [],
        contextIndicator: decision.contextIndicator,
        reasoning: decision.reasoning,
      };
    } catch {
      // Fallback to tutor
      return {
        primaryAgent: 'tutor',
        secondaryAgents: [],
        contextIndicator: profile.currentTopic 
          ? `Helping with ${profile.currentTopic}` 
          : 'Learning with VibeAI',
        reasoning: 'Fallback routing',
      };
    }
  }

  private fastRoute(
    message: string,
    context: PlatformContext,
    analysis: ReturnType<typeof analyzeInteraction>
  ): OrchestrationDecision | null {
    const msg = message.toLowerCase();

    // Confusion always goes to tutor
    if (analysis.confusionLevel === 'severe' || analysis.confusionLevel === 'moderate') {
      return {
        primaryAgent: 'tutor',
        secondaryAgents: [],
        contextIndicator: 'Simplifying explanation...',
        reasoning: 'Confusion detected — routing to tutor for simplified explanation',
      };
    }

    // Quiz/exercise requests
    if (/\b(quiz|test me|exercise|practice|challenge)\b/i.test(msg)) {
      return {
        primaryAgent: 'evaluator',
        secondaryAgents: [],
        contextIndicator: 'Creating a learning exercise...',
        reasoning: 'Quiz/exercise request detected',
      };
    }

    // Recommendation/path requests
    if (/\b(recommend|what next|learning path|what should i|suggest|next course|next step)\b/i.test(msg)) {
      return {
        primaryAgent: 'strategist',
        secondaryAgents: [],
        contextIndicator: 'Planning your learning path...',
        reasoning: 'Recommendation request detected',
      };
    }

    // Tool/news/trend requests
    if (/\b(tool|trending|news|what's new|latest|ai tool|compare)\b/i.test(msg)) {
      return {
        primaryAgent: 'research',
        secondaryAgents: [],
        contextIndicator: 'Researching AI trends...',
        reasoning: 'Research/tool request detected',
      };
    }

    // Page-context routing
    if (context.currentPage === 'ai-tools') {
      return {
        primaryAgent: 'research',
        secondaryAgents: [],
        contextIndicator: context.toolName 
          ? `Exploring ${context.toolName}` 
          : 'Exploring AI Tools',
        reasoning: 'On tools page — routing to research agent',
      };
    }

    if (context.currentPage === 'lesson-player' || context.currentPage === 'course-module') {
      return {
        primaryAgent: 'tutor',
        secondaryAgents: [],
        contextIndicator: context.lessonTitle 
          ? `Helping with: ${context.lessonTitle}` 
          : context.courseTitle 
            ? `Studying: ${context.courseTitle}` 
            : 'Course assistance',
        reasoning: 'On course/lesson page — routing to tutor',
      };
    }

    // No fast route — let AI decide
    return null;
  }

  // ── Agent Execution ────────────────────────────────────────────────

  private async executeAgent(
    role: AgentRole,
    message: string,
    history: ChatMessage[],
    profile: LearnerSessionProfile,
    context: PlatformContext
  ): Promise<string> {
    const promptMap: Record<AgentRole, (p: LearnerSessionProfile, c: PlatformContext) => string> = {
      orchestrator: getOrchestratorPrompt,
      tutor: getTutorPrompt,
      evaluator: getEvaluatorPrompt,
      strategist: getStrategistPrompt,
      research: getResearchPrompt,
    };

    const getPrompt = promptMap[role] || promptMap.tutor;
    const systemPrompt = getPrompt(profile, context);

    return generateAIResponse(systemPrompt, message, history, {
      temperature: role === 'evaluator' ? 0.5 : 0.7,
      maxTokens: role === 'evaluator' ? 3000 : 2048,
    });
  }

  // ── Fallback Response ──────────────────────────────────────────────

  private getFallbackResponse(message: string, profile: LearnerSessionProfile): string {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon'];
    const msg = message.toLowerCase();

    if (greetings.some(g => msg.includes(g))) {
      return `Hello! 👋 Welcome to VibeAI! I'm your personal AI learning mentor. I can help you:\n\n` +
        `- **Learn AI concepts** step by step\n` +
        `- **Practice** with exercises and quizzes\n` +
        `- **Discover trending AI tools**\n` +
        `- **Plan your learning path**\n\n` +
        `What would you like to explore today?`;
    }

    if (profile.currentTopic) {
      return `I'm here to help you with **${profile.currentTopic}**! ` +
        `Unfortunately, I had trouble processing that request. ` +
        `Could you rephrase your question? I want to make sure I give you the best answer possible! 🎯`;
    }

    return `I'm VibeAI, your AI learning mentor! 🚀 I had a brief hiccup processing your request. ` +
      `Here's what I can help you with:\n\n` +
      `- 📚 **Explain AI concepts** at your level\n` +
      `- 🧪 **Generate quizzes** to test your knowledge\n` +
      `- 🗺️ **Recommend courses** and learning paths\n` +
      `- 🔧 **Explore AI tools** from our toolkit\n\n` +
      `Try asking me something specific, like "What is machine learning?" or "Quiz me on prompt engineering!"`;
  }

  // ── Update Dashboard Data ──────────────────────────────────────────

  updateDashboardContext(
    coursesInProgress: string[],
    overallProgress: number,
    streak: number,
    toolsExplored: string[] = []
  ): void {
    if (!this.currentSessionId) return;
    updateSessionProfile(this.currentSessionId, {
      dashboardActivity: {
        coursesInProgress,
        overallProgress,
        streak,
        toolsExplored,
      },
    });
  }
}

// ─── Export Singleton ────────────────────────────────────────────────

export const vibeAIChat = new VibeAIOrchestrator();
export default vibeAIChat;
