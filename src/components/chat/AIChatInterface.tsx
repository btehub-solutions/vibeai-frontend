// ═══════════════════════════════════════════════════════════════════════
// AIChatInterface — Full-Page Chat Experience (Chat Page)
// Uses the multi-agent orchestration system
// ═══════════════════════════════════════════════════════════════════════

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Send, Bot, Loader2, Sparkles, Trash2,
  BookOpen, Target, Zap, Lightbulb, Brain,
} from 'lucide-react';
import { useVibeAIChat } from '@/hooks/useVibeAIChat';
import { usePageContext } from '@/hooks/usePageContext';
import type { ChatMessage, AgentRole } from '@/services/ai-agents/types';

// ─── Agent Config ─────────────────────────────────────────────────────

const agentConfig: Record<AgentRole, { icon: typeof Bot; color: string; label: string; gradient: string }> = {
  orchestrator: { icon: Brain, color: 'text-purple-400', label: 'Orchestrator', gradient: 'from-purple-500/20 to-purple-500/5' },
  tutor: { icon: BookOpen, color: 'text-emerald-400', label: 'AI Tutor', gradient: 'from-emerald-500/20 to-emerald-500/5' },
  evaluator: { icon: Target, color: 'text-amber-400', label: 'Evaluator', gradient: 'from-amber-500/20 to-amber-500/5' },
  strategist: { icon: Zap, color: 'text-blue-400', label: 'Strategist', gradient: 'from-blue-500/20 to-blue-500/5' },
  research: { icon: Lightbulb, color: 'text-pink-400', label: 'Researcher', gradient: 'from-pink-500/20 to-pink-500/5' },
};

// ─── Message Bubble ──────────────────────────────────────────────────

const FullMessage = memo(({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  const agent = message.agentRole ? agentConfig[message.agentRole] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent?.gradient || 'from-accent/20 to-accent/5'} border border-white/10 flex items-center justify-center shadow-lg`}>
            {agent ? (
              <agent.icon size={18} className={agent.color} />
            ) : (
              <Bot size={18} className="text-accent" />
            )}
          </div>
        </div>
      )}
      
      <div className={`max-w-[80%]`}>
        {!isUser && agent && (
          <span className={`text-xs font-medium ${agent.color} mb-1.5 block ml-1 opacity-80`}>
            {agent.label}
          </span>
        )}
        
        <div className={`px-5 py-4 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-accent text-white rounded-tr-sm shadow-lg shadow-accent/15'
            : 'bg-white/[0.05] border border-white/[0.08] text-foreground rounded-tl-sm backdrop-blur-sm'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none
              prose-p:my-2 prose-p:leading-relaxed
              prose-headings:text-foreground prose-headings:font-semibold
              prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
              prose-strong:text-accent/90
              prose-code:text-accent/80 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-black/30 prose-pre:rounded-xl prose-pre:border prose-pre:border-white/5
              prose-li:text-foreground/80
              prose-a:text-accent
              prose-blockquote:border-accent/30 prose-blockquote:text-foreground/70"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

FullMessage.displayName = 'FullMessage';

// ═══════════════════════════════════════════════════════════════════════
// Main Interface
// ═══════════════════════════════════════════════════════════════════════

const AIChatInterface = () => {
  const pageContext = usePageContext();
  const {
    messages,
    isLoading,
    contextIndicator,
    suggestions,
    currentAgent,
    isAvailable,
    sendMessage,
    sendSuggestion,
    clearChat,
  } = useVibeAIChat(pageContext);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-[650px] w-full max-w-2xl mx-auto rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30 bg-[hsl(240_5%_8%/0.95)] backdrop-blur-2xl">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.06] bg-gradient-to-r from-accent/[0.06] to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/25 to-accent/10 flex items-center justify-center border border-accent/15 shadow-lg shadow-accent/10">
              <Sparkles size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">VibeAI Mentor</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <p className="text-xs text-muted-foreground">{contextIndicator}</p>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.06] border border-white/5 transition-all flex items-center gap-1.5"
          >
            <Trash2 size={12} />
            Clear
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg) => (
          <FullMessage key={msg.id} message={msg} />
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 justify-start"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-white/10 flex items-center justify-center">
                <Brain size={18} className="text-accent animate-pulse" />
              </div>
            </div>
            <div className="bg-white/[0.05] border border-white/[0.08] px-5 py-4 rounded-2xl rounded-tl-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-muted-foreground">{contextIndicator}</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.04] px-6 py-3"
          >
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => sendSuggestion(s)}
                  disabled={isLoading}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-accent/10 hover:bg-accent/20 text-accent/90 hover:text-accent border border-accent/15 hover:border-accent/30 transition-all disabled:opacity-40"
                >
                  <Sparkles size={10} className="inline mr-1 -mt-0.5" />
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="px-5 py-4 border-t border-white/[0.06] bg-black/20">
        {!isAvailable && (
          <div className="text-xs text-amber-400/80 mb-2 flex items-center gap-1.5 bg-amber-400/5 px-3 py-1.5 rounded-lg border border-amber-400/10">
            <Zap size={12} />
            Add VITE_GEMINI_API_KEY to your .env file to enable AI responses
          </div>
        )}
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask anything about AI..."
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-3 text-sm text-foreground focus:outline-none focus:border-accent/30 focus:bg-white/[0.06] transition-all placeholder:text-muted-foreground/40 disabled:opacity-50"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
