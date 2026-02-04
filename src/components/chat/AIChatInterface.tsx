import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am VibeAI. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: userMessage }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error calling AI:', error);
      let errorMessage = 'Sorry, I encountered an error. Please check your connection and try again.';
      
      if (error instanceof Error && error.message.includes('FunctionsFetchError')) {
         errorMessage = 'Function connection error. Please ensuring the function is deployed or running locally.';
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
          <Bot size={22} className="text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-lg">VibeAI Assistant</h3>
          <p className="text-xs text-muted-foreground">Powered by Supabase Edge Functions</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-black/20 to-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={16} className="text-accent" />
              </div>
            )}
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-accent text-white rounded-tr-sm shadow-lg shadow-accent/10' 
                : 'bg-white/5 border border-white/10 text-foreground rounded-tl-sm backdrop-blur-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={16} className="text-accent" />
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm backdrop-blur-sm flex items-center">
              <Loader2 size={16} className="animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-muted-foreground/50"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
