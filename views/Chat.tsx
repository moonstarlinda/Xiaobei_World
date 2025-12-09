import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Message } from '../types';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'system',
      content: 'Hello! I am Xiaobei. Do you have any treats?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Mock auto-reply
    setTimeout(() => {
      const newSystemMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: 'Awooo! (Auto-reply)',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newSystemMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] flex flex-col bg-white dark:bg-xiaobei-darkbg rounded-3xl shadow-xl overflow-hidden border-4 border-xiaobei-dark dark:border-xiaobei-darkaccent animate-fade-in">
      
      {/* Header */}
      <div className="bg-xiaobei-dark dark:bg-xiaobei-darkaccent p-4 flex items-center gap-3 shadow-md z-10">
        <div className="w-10 h-10 rounded-full bg-xiaobei-light flex items-center justify-center overflow-hidden border-2 border-white/50">
           <img src="https://placehold.co/100x100/F4E0C6/4A3B32?text=X" alt="Avatar" />
        </div>
        <div>
          <h2 className="text-xiaobei-light font-bold text-lg">Chat with Xiaobei</h2>
          <div className="flex items-center gap-1.5">
            <span className={`block w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
            <span className="text-xiaobei-light/80 text-xs">{isTyping ? 'Typing...' : 'Online'}</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-xiaobei-dark space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar Bubble */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-xiaobei-accent dark:bg-xiaobei-darktext' : 'bg-xiaobei-dark dark:bg-xiaobei-darkaccent'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-xiaobei-dark dark:text-xiaobei-dark" /> : <Bot className="w-5 h-5 text-xiaobei-light dark:text-xiaobei-dark" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-xiaobei-dark text-xiaobei-light rounded-tr-none' : 'bg-white dark:bg-xiaobei-darkbg text-gray-800 dark:text-xiaobei-darktext border border-gray-200 dark:border-xiaobei-darkaccent/30 rounded-tl-none'}`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] gap-2">
               <div className="w-8 h-8 rounded-full bg-xiaobei-dark dark:bg-xiaobei-darkaccent flex items-center justify-center flex-shrink-0 mt-1">
                 <Bot className="w-5 h-5 text-xiaobei-light dark:text-xiaobei-dark" />
               </div>
               <div className="bg-white dark:bg-xiaobei-darkbg p-3 rounded-2xl rounded-tl-none border border-gray-200 dark:border-xiaobei-darkaccent/30 shadow-sm flex items-center">
                 <Loader2 className="w-4 h-4 animate-spin text-xiaobei-dark dark:text-xiaobei-darkaccent" />
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-xiaobei-darkbg border-t border-gray-100 dark:border-xiaobei-darkaccent/30">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something to Xiaobei..."
            className="flex-grow p-3 rounded-xl bg-gray-100 dark:bg-xiaobei-dark border-2 border-transparent focus:border-xiaobei-dark dark:focus:border-xiaobei-darkaccent focus:bg-white dark:focus:bg-xiaobei-darkbg outline-none transition-all placeholder-gray-400 dark:placeholder-xiaobei-darktext/50 text-gray-700 dark:text-xiaobei-darktext"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 bg-xiaobei-dark dark:bg-xiaobei-darkaccent text-xiaobei-light dark:text-xiaobei-dark rounded-xl hover:bg-xiaobei-dark/90 dark:hover:bg-xiaobei-darkaccent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};