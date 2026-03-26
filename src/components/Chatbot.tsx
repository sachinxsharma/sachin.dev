"use client";
import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  const suggestedQuestions = [
    "What is Sachin's tech stack?",
    "Tell me about his Kubernetes project.",
    "What is his educational background?",
    "How can I contact Sachin?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] md:w-[400px] h-[500px] mb-4 glass rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/40">
                  <Bot size={18} className="text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Sachin AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-gray-400">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="flex flex-col gap-4 py-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <p className="text-gray-300 text-sm">
                      👋 Hi! I&apos;m Sachin&apos;s AI assistant. Ask me anything about his work, skills, or projects!
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          const event = { target: { value: q } } as unknown as React.ChangeEvent<HTMLInputElement>;
                          handleInputChange(event);
                        }}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20 hover:bg-neon-blue/20 transition-all text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m: { id: string; role: string; content: string }) => (
                <div 
                  key={m.id} 
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                      m.role === "user" ? "bg-neon-purple/20 text-neon-purple" : "bg-neon-blue/20 text-neon-blue"
                    }`}>
                      {m.role === "user" ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      m.role === "user" 
                        ? "bg-neon-purple/10 border border-neon-purple/20 text-white" 
                        : "bg-white/5 border border-white/10 text-gray-200"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] flex gap-2">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-neon-blue/20 text-neon-blue flex items-center justify-center">
                      <Bot size={12} />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-sm flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-neon-blue" />
                      <span className="text-gray-400">Processing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-black/40 border-t border-white/10">
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue transition-all"
                />
                <button
                  type="submit"
                  disabled={!input || isLoading}
                  className="absolute right-2 top-2 p-2 bg-neon-blue text-black rounded-xl hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] disabled:opacity-50 disabled:hover:shadow-none transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 border border-white/20 group relative overflow-hidden ${
          isOpen ? 'bg-white/10 text-white' : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.5)]'
        }`}
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        {isOpen ? <X size={24} /> : (
          <div className="relative flex items-center justify-center animate-pulse">
            <MessageSquare size={24} />
            <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
          </div>
        )}
      </button>
    </div>
  );
}
