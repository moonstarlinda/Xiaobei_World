import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2 } from 'lucide-react';
import type { Message, ChatMessage } from '../types';

type ChatApiError = {
  code?: string;
  error?: string;
  message?: string;
};

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;
  }, [input]);

  const handleSend = async (e: React.FormEvent) => {
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

    try {
      const chatMessages: ChatMessage[] = messages
        .filter((m: Message) => m.role === 'user' || m.role === 'assistant')
        .map((m: Message): ChatMessage => ({
          role: m.role,
          content: m.content
        }));

      const currentMsg: ChatMessage = { role: 'user', content: input };
      const allMessages: ChatMessage[] = [...chatMessages, currentMsg].slice(-20);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (process.env.NODE_ENV === 'development') {
        headers['x-dev-user'] = 'lin';
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!response.ok) {
        let errorData: ChatApiError = {};
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: response.statusText };
        }

        console.error('Chat API error:', {
          status: response.status,
          ...errorData,
        });

        if (response.status === 429) {
          const limitMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'system',
            content: errorData.message || 'Sorry, you have reached the daily chat limit. Come back tomorrow!',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, limitMsg]);
          return;
        }

        throw new Error(errorData.code || errorData.error || `API request failed with ${response.status}`);
      }

      const data = await response.json();

      const newAssistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I could not understand that.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAssistantMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: error instanceof TypeError && error.message.includes('network')
          ? 'Xiaobei lost the signal for a moment. Please check the connection and try again.'
          : 'Xiaobei is curled up and cannot reach the chat service right now. Please try again in a little bit.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-13rem)] flex items-center justify-center py-8 animate-fade-in">
      <div className="chat-container w-full max-w-[45rem] h-[640px] flex flex-col bg-[#fffdf7] dark:bg-xiaobei-darkbg rounded-2xl shadow-xl overflow-hidden border border-xiaobei-dark/15 dark:border-xiaobei-darkaccent/40">
        <div className="bg-xiaobei-dark dark:bg-xiaobei-darkaccent p-4 flex items-center justify-between gap-3 shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-xiaobei-light flex items-center justify-center overflow-hidden border-2 border-white/50">
              <img src="/images/avatar.png" alt="Xiaobei avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xiaobei-light dark:text-xiaobei-dark font-bold text-lg">Xiaobei</h3>
              <p className="text-xiaobei-light/75 dark:text-xiaobei-dark/75 text-xs">Soft paws on keyboard</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-xiaobei-light dark:text-xiaobei-dark">
            <span className={`block w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
            {isTyping ? 'Typing...' : 'Online'}
          </div>
        </div>

        {/* Messages Area */}
        <div className="chat-messages flex-grow p-4 sm:p-6 overflow-y-auto bg-[#fbf3e4] dark:bg-xiaobei-dark space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[88%] sm:max-w-[78%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              {/* Avatar Bubble */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-xiaobei-accent dark:bg-xiaobei-darktext' : 'bg-xiaobei-dark dark:bg-xiaobei-darkaccent'}`}>
                {msg.role === 'user' ? (
                  <User className="w-5 h-5 text-xiaobei-dark dark:text-xiaobei-dark" />
                ) : (
                  <span className="text-lg leading-none" aria-label="Xiaobei">🐯</span>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`min-w-0 p-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm whitespace-pre-wrap break-words ${msg.role === 'user' ? 'bg-xiaobei-dark text-xiaobei-light rounded-tr-none' : 'bg-[#fffefd] dark:bg-xiaobei-darkbg text-gray-800 dark:text-xiaobei-darktext border border-xiaobei-dark/10 dark:border-xiaobei-darkaccent/30 rounded-tl-none'}`}
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
                 <span className="text-lg leading-none" aria-label="Xiaobei">🐯</span>
               </div>
               <div className="bg-[#fffefd] dark:bg-xiaobei-darkbg p-3 rounded-2xl rounded-tl-none border border-xiaobei-dark/10 dark:border-xiaobei-darkaccent/30 shadow-sm flex items-center">
                 <Loader2 className="w-4 h-4 animate-spin text-xiaobei-dark dark:text-xiaobei-darkaccent" />
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input p-4 bg-[#fffdf7] dark:bg-xiaobei-darkbg border-t border-xiaobei-dark/10 dark:border-xiaobei-darkaccent/30">
          <form onSubmit={handleSend}>
            <div className="flex items-end gap-2 rounded-2xl bg-[#fff8ec] dark:bg-xiaobei-dark border-2 border-transparent focus-within:border-xiaobei-dark dark:focus-within:border-xiaobei-darkaccent focus-within:bg-[#fffefd] dark:focus-within:bg-xiaobei-darkbg px-3 py-2 transition-[background-color,border-color] shadow-sm">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={1}
                placeholder="Tell Xiaobei about your day..."
                className="min-h-[36px] max-h-48 flex-grow resize-none overflow-y-auto bg-transparent py-2 outline-none placeholder-gray-400 dark:placeholder-xiaobei-darktext/50 text-gray-700 dark:text-xiaobei-darktext disabled:opacity-50 disabled:cursor-not-allowed whitespace-pre-wrap break-words"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                  input.trim()
                    ? 'bg-xiaobei-dark text-xiaobei-light hover:bg-xiaobei-dark/90 active:scale-95 dark:bg-xiaobei-darkaccent dark:text-xiaobei-dark dark:hover:bg-xiaobei-darkaccent/90'
                    : 'pointer-events-none scale-90 bg-transparent text-transparent opacity-0'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
          <p className="mt-2 text-xs text-xiaobei-dark/50 dark:text-xiaobei-darktext/50">Enter to send, Shift + Enter for a new line.</p>
        </div>
      </div>
    </div>
  );
};
