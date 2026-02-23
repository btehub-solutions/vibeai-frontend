// ═══════════════════════════════════════════════════════════════════════
// AIChatInterface — Full-Page Chat (Chat Page)
// ═══════════════════════════════════════════════════════════════════════

import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { useVibeAIChat } from '@/hooks/useVibeAIChat';
import { usePageContext } from '@/hooks/usePageContext';
import type { ChatMessage } from '@/services/ai-agents/types';
import logo from '@/assets/logo.png';

const FullMessage = memo(({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/15 flex items-center justify-center overflow-hidden shadow-md shadow-accent/10">
            <img src="/favicon.png" alt="VibeAI" className="w-5 h-5 object-contain" />
          </div>
        </div>
      )}
      
      <div className="max-w-[80%]">
        <div className={`px-5 py-3.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-accent text-white rounded-2xl rounded-br-md shadow-lg shadow-accent/15'
            : 'bg-white/[0.05] border border-white/[0.08] text-foreground/90 rounded-2xl rounded-bl-md'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none
              [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
              prose-p:my-1.5 prose-p:leading-relaxed
              prose-headings:text-foreground prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1.5
              prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
              prose-strong:text-accent/90 prose-strong:font-semibold
              prose-code:text-accent/80 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-black/30 prose-pre:rounded-xl prose-pre:border prose-pre:border-white/5 prose-pre:my-2
              prose-li:text-foreground/80 prose-li:my-0.5
              prose-ul:my-1.5 prose-ol:my-1.5
              prose-a:text-accent
              prose-blockquote:border-accent/30 prose-blockquote:text-foreground/70">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold">
            U
          </div>
        </div>
      )}
    </motion.div>
  );
});

FullMessage.displayName = 'FullMessage';

const AIChatInterface = () => {
  const pageContext = usePageContext();
  const {
    messages, isLoading, contextIndicator, suggestions,
    isAvailable, sendMessage, sendSuggestion, clearChat,
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
    <div className="flex flex-col h-[650px] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30 bg-[#0c0d10]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] bg-gradient-to-r from-accent/[0.04] to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/10 overflow-hidden">
            <img src="/favicon.png" alt="VibeAI" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base">VibeAI Mentor</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <p className="text-xs text-muted-foreground">{contextIndicator}</p>
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-white/[0.06] border border-white/5 transition-all flex items-center gap-1.5">
          <Trash2 size={12} /> New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => <FullMessage key={msg.id} message={msg} />)}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/15 flex items-center justify-center overflow-hidden">
                <img src="/favicon.png" alt="VibeAI" className="w-5 h-5 object-contain animate-pulse" />
              </div>
            </div>
            <div className="bg-white/[0.05] border border-white/[0.08] px-5 py-3.5 rounded-2xl rounded-bl-md">
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t border-white/[0.04] px-5 py-2.5">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendSuggestion(s)} disabled={isLoading}
                  className="text-xs px-3 py-1.5 rounded-full bg-accent/8 hover:bg-accent/15 text-accent/80 hover:text-accent border border-accent/10 hover:border-accent/25 transition-all disabled:opacity-30">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/[0.06] bg-black/30">
        <div className="flex gap-2.5">
          <input ref={inputRef} type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask anything about AI..."
            className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/25 focus:bg-white/[0.06] transition-all placeholder:text-muted-foreground/30 disabled:opacity-40"
            disabled={isLoading} />
          <button onClick={handleSend} disabled={isLoading || !input.trim()}
            className="w-11 h-11 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md shadow-accent/15">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
