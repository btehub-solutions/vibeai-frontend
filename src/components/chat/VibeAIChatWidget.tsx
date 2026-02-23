// ═══════════════════════════════════════════════════════════════════════
// VibeAI Persistent Chat Widget — Premium Floating Assistant
// Glassmorphism, smooth animations, context-aware, adaptive suggestions
// ═══════════════════════════════════════════════════════════════════════

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  Sparkles,
  Trash2,
  ChevronDown,
  Lightbulb,
  Brain,
  Zap,
  BookOpen,
  Target,
  Minimize2,
} from 'lucide-react';
import { useVibeAIChat } from '@/hooks/useVibeAIChat';
import { usePageContext } from '@/hooks/usePageContext';
import type { ChatMessage, AgentRole } from '@/services/ai-agents/types';

// ─── Agent Role Badge ────────────────────────────────────────────────

const agentIcons: Record<AgentRole, { icon: typeof Bot; color: string; label: string }> = {
  orchestrator: { icon: Brain, color: 'text-purple-400', label: 'Orchestrator' },
  tutor: { icon: BookOpen, color: 'text-emerald-400', label: 'Tutor' },
  evaluator: { icon: Target, color: 'text-amber-400', label: 'Evaluator' },
  strategist: { icon: Zap, color: 'text-blue-400', label: 'Strategist' },
  research: { icon: Lightbulb, color: 'text-pink-400', label: 'Research' },
};

// ─── Message Bubble ──────────────────────────────────────────────────

const MessageBubble = memo(({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  const agentInfo = message.agentRole ? agentIcons[message.agentRole] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Agent avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center shadow-lg shadow-accent/5">
            {agentInfo ? (
              <agentInfo.icon size={14} className={agentInfo.color} />
            ) : (
              <Bot size={14} className="text-accent" />
            )}
          </div>
        </div>
      )}

      <div className={`max-w-[85%] ${isUser ? 'order-first' : ''}`}>
        {/* Agent role label */}
        {!isUser && agentInfo && (
          <span className={`text-[10px] font-medium ${agentInfo.color} mb-1 block ml-1 opacity-70`}>
            {agentInfo.label}
          </span>
        )}

        {/* Message content */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-accent text-white rounded-tr-md shadow-lg shadow-accent/20'
              : 'bg-white/[0.06] border border-white/[0.08] text-foreground/90 rounded-tl-md backdrop-blur-sm'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none 
              prose-p:my-1.5 prose-p:leading-relaxed
              prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-2
              prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
              prose-strong:text-accent/90 
              prose-code:text-accent/80 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
              prose-pre:bg-black/30 prose-pre:rounded-xl prose-pre:border prose-pre:border-white/5
              prose-li:my-0.5 prose-li:text-foreground/80
              prose-ul:my-2 prose-ol:my-2
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
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

MessageBubble.displayName = 'MessageBubble';

// ─── Suggestion Chips ────────────────────────────────────────────────

const SuggestionChips = memo(({ 
  suggestions, 
  onSelect,
  disabled,
}: { 
  suggestions: string[];
  onSelect: (s: string) => void;
  disabled: boolean;
}) => {
  if (suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 px-4 py-3"
    >
      {suggestions.map((suggestion, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => !disabled && onSelect(suggestion)}
          disabled={disabled}
          className="text-xs px-3 py-1.5 rounded-full 
            bg-accent/10 hover:bg-accent/20 
            text-accent/90 hover:text-accent 
            border border-accent/15 hover:border-accent/30
            transition-all duration-200 
            disabled:opacity-40 disabled:cursor-not-allowed
            whitespace-nowrap"
        >
          <Sparkles size={10} className="inline mr-1 -mt-0.5" />
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
});

SuggestionChips.displayName = 'SuggestionChips';

// ─── Loading Indicator ───────────────────────────────────────────────

const ThinkingIndicator = memo(({ contextIndicator }: { contextIndicator: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3 justify-start"
  >
    <div className="flex-shrink-0 mt-1">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center">
        <Brain size={14} className="text-accent animate-pulse" />
      </div>
    </div>
    <div className="bg-white/[0.06] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-tl-md backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-xs text-muted-foreground">{contextIndicator}</span>
      </div>
    </div>
  </motion.div>
));

ThinkingIndicator.displayName = 'ThinkingIndicator';

// ═══════════════════════════════════════════════════════════════════════
// Main Chat Widget Component
// ═══════════════════════════════════════════════════════════════════════

export default function VibeAIChatWidget() {
  const pageContext = usePageContext();
  const {
    messages,
    isLoading,
    isOpen,
    contextIndicator,
    suggestions,
    currentAgent,
    error,
    isAvailable,
    sendMessage,
    sendSuggestion,
    toggleChat,
    closeChat,
    clearChat,
  } = useVibeAIChat(pageContext);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Scroll detection
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Floating Action Button ─────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            id="vibeai-chat-fab"
            className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full 
              bg-gradient-to-br from-accent to-accent/80 
              text-white shadow-2xl shadow-accent/30 
              flex items-center justify-center 
              hover:shadow-accent/50 transition-shadow duration-300
              ring-2 ring-accent/20 ring-offset-2 ring-offset-background"
            aria-label="Open VibeAI Chat"
          >
            <MessageCircle size={24} />
            
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-accent/20 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[9999]
              w-[400px] h-[600px] max-h-[80vh] max-w-[calc(100vw-48px)]
              flex flex-col
              rounded-3xl overflow-hidden
              bg-[hsl(240_5%_8%/0.97)] backdrop-blur-2xl
              border border-white/[0.08]
              shadow-2xl shadow-black/50"
            id="vibeai-chat-panel"
          >
            {/* ── Header ────────────────────────────────────────────── */}
            <div className="px-5 py-4 border-b border-white/[0.06] bg-gradient-to-r from-accent/[0.06] to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/25 to-accent/10 flex items-center justify-center border border-accent/15 shadow-lg shadow-accent/10">
                    <Sparkles size={16} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">VibeAI Mentor</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                      <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                        {contextIndicator}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    title="Clear chat"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button
                    onClick={closeChat}
                    className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    title="Close chat"
                  >
                    <Minimize2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Messages Area ──────────────────────────────────────── */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth
                scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              
              {isLoading && <ThinkingIndicator contextIndicator={contextIndicator} />}
              
              <div ref={messagesEndRef} />
            </div>

            {/* ── Scroll to bottom button ────────────────────────────── */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[140px] left-1/2 -translate-x-1/2 
                    w-8 h-8 rounded-full bg-accent/80 text-white 
                    flex items-center justify-center shadow-lg shadow-accent/20
                    hover:bg-accent transition-colors"
                >
                  <ChevronDown size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Suggestions ────────────────────────────────────────── */}
            {suggestions.length > 0 && !isLoading && (
              <div className="border-t border-white/[0.04]">
                <SuggestionChips
                  suggestions={suggestions}
                  onSelect={sendSuggestion}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* ── Input Area ─────────────────────────────────────────── */}
            <div className="px-4 py-3 border-t border-white/[0.06] bg-black/20">
              {!isAvailable && (
                <div className="text-[10px] text-amber-400/80 mb-2 flex items-center gap-1">
                  <Zap size={10} />
                  Set VITE_GEMINI_API_KEY in .env to enable AI
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask VibeAI anything..."
                  disabled={isLoading}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl 
                    px-4 py-2.5 text-sm text-foreground 
                    placeholder:text-muted-foreground/40
                    focus:outline-none focus:border-accent/30 focus:bg-white/[0.06]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-xl 
                    bg-accent text-white 
                    flex items-center justify-center 
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-accent/90 transition-all
                    shadow-lg shadow-accent/20"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
