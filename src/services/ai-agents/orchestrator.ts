// ═══════════════════════════════════════════════════════════════════════
// VibeAI Orchestrator — Multi-Agent Intelligence Router
// ═══════════════════════════════════════════════════════════════════════

import {
  AgentRole,
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
  updateSessionProfile,
} from './session-profile';

class VibeAIOrchestrator {
  private currentSessionId: string | null = null;

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

  async chat(
    message: string,
    conversationHistory: ChatMessage[],
    platformContext: PlatformContext
  ): Promise<AgentResponse> {
    if (!this.currentSessionId) this.initSession();

    const profile = this.getSession();
    if (!profile) throw new Error('Session profile not found');

    try {
      const analysis = analyzeInteraction(this.currentSessionId!, message, conversationHistory);

      const decision = await this.routeRequest(message, profile, platformContext, analysis);

      const response = await this.executeAgent(
        decision.primaryAgent,
        message,
        conversationHistory,
        profile,
        platformContext
      );

      const updatedProfile = this.getSession()!;
      const suggestions = generateAdaptiveSuggestions(updatedProfile);

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
      return {
        content: this.getFallbackResponse(message, profile),
        agentRole: 'tutor',
        contextIndicator: 'VibeAI Assistant',
        suggestions: generateAdaptiveSuggestions(profile),
      };
    }
  }

  private async routeRequest(
    message: string,
    profile: LearnerSessionProfile,
    context: PlatformContext,
    analysis: ReturnType<typeof analyzeInteraction>
  ): Promise<OrchestrationDecision> {
    const fastRoute = this.fastRoute(message, context, analysis);
    if (fastRoute) return fastRoute;

    try {
      const orchestratorPrompt = getOrchestratorPrompt(profile, context);
      const decision = await generateStructuredResponse<{
        primaryAgent: AgentRole;
        contextIndicator: string;
      }>(orchestratorPrompt, message, {
        primaryAgent: 'tutor' as AgentRole,
        contextIndicator: 'Learning with VibeAI',
      });

      return {
        primaryAgent: decision.primaryAgent,
        secondaryAgents: [],
        contextIndicator: decision.contextIndicator,
        reasoning: 'AI-routed',
      };
    } catch {
      return {
        primaryAgent: 'tutor',
        secondaryAgents: [],
        contextIndicator: profile.currentTopic ? `Helping with ${profile.currentTopic}` : 'Learning with VibeAI',
        reasoning: 'Fallback',
      };
    }
  }

  private fastRoute(
    message: string,
    context: PlatformContext,
    analysis: ReturnType<typeof analyzeInteraction>
  ): OrchestrationDecision | null {
    const msg = message.toLowerCase();

    if (analysis.confusionLevel === 'severe' || analysis.confusionLevel === 'moderate') {
      return { primaryAgent: 'tutor', secondaryAgents: [], contextIndicator: 'Simplifying...', reasoning: 'confusion' };
    }
    if (/\b(quiz|test me|exercise|practice|challenge me)\b/i.test(msg)) {
      return { primaryAgent: 'evaluator', secondaryAgents: [], contextIndicator: 'Creating exercise...', reasoning: 'quiz request' };
    }
    if (/\b(recommend|what next|learning path|what should i|suggest|next course|next step|plan)\b/i.test(msg)) {
      return { primaryAgent: 'strategist', secondaryAgents: [], contextIndicator: 'Planning your path...', reasoning: 'strategy request' };
    }
    if (/\b(tool|trending|news|what's new|latest|compare|chatgpt|claude|midjourney|cursor|copilot|runway|perplexity|elevenlabs)\b/i.test(msg)) {
      return { primaryAgent: 'research', secondaryAgents: [], contextIndicator: 'Researching...', reasoning: 'tool/research request' };
    }
    if (context.currentPage === 'ai-tools') {
      return { primaryAgent: 'research', secondaryAgents: [], contextIndicator: context.toolName ? `Exploring ${context.toolName}` : 'AI Tools Guide', reasoning: 'tools page' };
    }
    if (context.currentPage === 'lesson-player' || context.currentPage === 'course-module') {
      return { primaryAgent: 'tutor', secondaryAgents: [], contextIndicator: context.lessonTitle ? `Lesson: ${context.lessonTitle}` : context.courseTitle ? `Course: ${context.courseTitle}` : 'Course help', reasoning: 'course page' };
    }
    return null;
  }

  private async executeAgent(
    role: AgentRole,
    message: string,
    history: ChatMessage[],
    profile: LearnerSessionProfile,
    context: PlatformContext
  ): Promise<string> {
    const promptBuilders: Record<AgentRole, (p: LearnerSessionProfile, c: PlatformContext, h: ChatMessage[]) => string> = {
      orchestrator: (p, c) => getOrchestratorPrompt(p, c),
      tutor: getTutorPrompt,
      evaluator: getEvaluatorPrompt,
      strategist: getStrategistPrompt,
      research: getResearchPrompt,
    };

    const buildPrompt = promptBuilders[role] || promptBuilders.tutor;
    const systemPrompt = buildPrompt(profile, context, history);

    return generateAIResponse(systemPrompt, message, history, {
      temperature: role === 'evaluator' ? 0.5 : 0.7,
      maxTokens: 4096,
    });
  }

  private getFallbackResponse(message: string, profile: LearnerSessionProfile): string {
    const msg = message.toLowerCase();
    if (['hello', 'hi', 'hey'].some(g => msg.startsWith(g))) {
      return `Hello! 👋 I'm VibeAI, your AI learning mentor. I can:\n\n- **Teach AI concepts** at your level\n- **Quiz you** with exercises\n- **Recommend courses** and learning paths\n- **Explore AI tools** with you\n\nWhat would you like to learn?`;
    }
    return `I had a brief connectivity issue. Please try your question again — I'm ready to help! 🎯`;
  }

  updateDashboardContext(coursesInProgress: string[], overallProgress: number, streak: number, toolsExplored: string[] = []): void {
    if (!this.currentSessionId) return;
    updateSessionProfile(this.currentSessionId, {
      dashboardActivity: { coursesInProgress, overallProgress, streak, toolsExplored },
    });
  }
}

export const vibeAIChat = new VibeAIOrchestrator();
export default vibeAIChat;
