// ═══════════════════════════════════════════════════════════════════════
// VibeAI Persistent Chat Widget — Premium Floating Assistant
// ═══════════════════════════════════════════════════════════════════════

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  X,
  Send,
  Loader2,
  Sparkles,
  Trash2,
  ChevronDown,
  Minimize2,
} from 'lucide-react';
import { useVibeAIChat } from '@/hooks/useVibeAIChat';
import { usePageContext } from '@/hooks/usePageContext';
import type { ChatMessage } from '@/services/ai-agents/types';
import logo from '@/assets/logo.png';

// ─── Message Bubble ──────────────────────────────────────────────────

const MessageBubble = memo(({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center overflow-hidden shadow-md shadow-accent/10">
            <img src="/favicon.png" alt="VibeAI" className="w-4 h-4 object-contain" />
          </div>
        </div>
      )}

      <div className={`max-w-[82%]`}>
        <div
          className={`px-3.5 py-2.5 text-[13px] leading-relaxed ${
            isUser
              ? 'bg-accent text-white rounded-2xl rounded-br-md shadow-md shadow-accent/15'
              : 'bg-white/[0.06] border border-white/[0.08] text-foreground/90 rounded-2xl rounded-bl-md'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none 
              [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
              prose-p:my-1 prose-p:leading-relaxed prose-p:text-[13px]
              prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-2.5 prose-headings:mb-1.5
              prose-h1:text-sm prose-h2:text-[13px] prose-h3:text-[13px]
              prose-strong:text-accent/90 prose-strong:font-semibold
              prose-code:text-accent/80 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-black/30 prose-pre:rounded-lg prose-pre:border prose-pre:border-white/5 prose-pre:my-2
              prose-li:my-0.5 prose-li:text-foreground/80 prose-li:text-[13px]
              prose-ul:my-1.5 prose-ol:my-1.5 prose-ul:pl-4 prose-ol:pl-4
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-accent/30 prose-blockquote:text-foreground/70 prose-blockquote:my-2"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-xs font-bold">
            U
          </div>
        </div>
      )}
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
    <div className="flex flex-wrap gap-1.5 px-4 py-2.5">
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          onClick={() => !disabled && onSelect(suggestion)}
          disabled={disabled}
          className="text-[11px] px-2.5 py-1 rounded-full 
            bg-accent/8 hover:bg-accent/15 
            text-accent/80 hover:text-accent 
            border border-accent/10 hover:border-accent/25
            transition-all duration-200 
            disabled:opacity-30 disabled:cursor-not-allowed
            whitespace-nowrap"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
});

SuggestionChips.displayName = 'SuggestionChips';

// ─── Thinking Indicator ──────────────────────────────────────────────

const ThinkingIndicator = memo(({ contextIndicator }: { contextIndicator: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-2.5 justify-start"
  >
    <div className="flex-shrink-0 mt-0.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center overflow-hidden">
        <img src="/favicon.png" alt="VibeAI" className="w-4 h-4 object-contain animate-pulse" />
      </div>
    </div>
    <div className="bg-white/[0.06] border border-white/[0.08] px-3.5 py-2.5 rounded-2xl rounded-bl-md">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-[11px] text-muted-foreground">{contextIndicator}</span>
      </div>
    </div>
  </motion.div>
));

ThinkingIndicator.displayName = 'ThinkingIndicator';

// ═══════════════════════════════════════════════════════════════════════
// Main Chat Widget
// ═══════════════════════════════════════════════════════════════════════

export default function VibeAIChatWidget() {
  const pageContext = usePageContext();
  const {
    messages,
    isLoading,
    isOpen,
    contextIndicator,
    suggestions,
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

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

  return (
    <>
      {/* ── FAB ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleChat}
            id="vibeai-chat-fab"
            className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full 
              bg-gradient-to-br from-accent via-accent to-emerald-600
              text-white shadow-xl shadow-accent/25 
              flex items-center justify-center 
              hover:shadow-accent/40 transition-shadow duration-300
              ring-2 ring-accent/10 ring-offset-2 ring-offset-background"
            aria-label="Open VibeAI Chat"
          >
            <img src="/favicon.png" alt="VibeAI" className="w-7 h-7 object-contain drop-shadow-lg" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-background shadow-sm" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed bottom-5 right-5 z-[9999]
              w-[380px] h-[560px] max-h-[80vh] max-w-[calc(100vw-40px)]
              flex flex-col
              rounded-2xl overflow-hidden
              bg-[#0c0d10] backdrop-blur-2xl
              border border-white/[0.06]
              shadow-2xl shadow-black/60"
            id="vibeai-chat-panel"
          >
            {/* ── Header ──────────────────────────────────────────── */}
            <div className="px-4 py-3 border-b border-white/[0.06] bg-gradient-to-r from-accent/[0.04] to-transparent flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/10 overflow-hidden">
                  <img src="/favicon.png" alt="VibeAI" className="w-5 h-5 object-contain" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm leading-tight">VibeAI Mentor</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <p className="text-[10px] text-muted-foreground truncate max-w-[160px] leading-tight">
                      {contextIndicator}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  onClick={clearChat}
                  className="w-7 h-7 rounded-md hover:bg-white/[0.06] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  title="New chat"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  onClick={closeChat}
                  className="w-7 h-7 rounded-md hover:bg-white/[0.06] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Messages ────────────────────────────────────────── */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && <ThinkingIndicator contextIndicator={contextIndicator} />}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Scroll Button ────────────────────────────────────── */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="absolute bottom-[120px] left-1/2 -translate-x-1/2 
                    w-7 h-7 rounded-full bg-white/10 border border-white/10
                    text-foreground/60 flex items-center justify-center 
                    hover:bg-white/15 transition-colors"
                >
                  <ChevronDown size={14} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Suggestions ──────────────────────────────────────── */}
            {suggestions.length > 0 && !isLoading && (
              <div className="border-t border-white/[0.04]">
                <SuggestionChips suggestions={suggestions} onSelect={sendSuggestion} disabled={isLoading} />
              </div>
            )}

            {/* ── Input ────────────────────────────────────────────── */}
            <div className="px-3 py-2.5 border-t border-white/[0.06] bg-black/30">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                  placeholder="Ask VibeAI anything..."
                  disabled={isLoading}
                  className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl 
                    px-3.5 py-2 text-[13px] text-foreground 
                    placeholder:text-muted-foreground/30
                    focus:outline-none focus:border-accent/25 focus:bg-white/[0.06]
                    disabled:opacity-40 transition-all duration-200"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 rounded-xl 
                    bg-accent text-white flex items-center justify-center 
                    disabled:opacity-30 disabled:cursor-not-allowed
                    hover:bg-accent/90 active:scale-95 transition-all
                    shadow-md shadow-accent/15"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
