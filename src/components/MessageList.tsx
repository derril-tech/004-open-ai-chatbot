'use client';

import { useEffect, useRef } from 'react';
import { Message as MessageType } from '@/lib/types';
import Message from './Message';

interface MessageListProps {
  messages: any[]; // Use any to handle Vercel AI SDK message type
  isLoading?: boolean;
  onCopy?: (text: string) => void;
}

export default function MessageList({ messages, isLoading = false, onCopy }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong">
            <div className="text-4xl">🤖</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Welcome to AI Chat</h3>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Start a conversation by typing a message below. I'm here to help with any questions or tasks you might have!
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-soft">
              💡 Ask questions
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-soft">
              📝 Get help with writing
            </div>
            <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-soft">
              🔧 Solve problems
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="space-y-2">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onCopy={onCopy}
          />
        ))}
        
        {isLoading && (
          <div className="flex gap-4 p-6 justify-start">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
              <div className="w-6 h-6 text-white">🤖</div>
            </div>
            <div className="flex flex-col max-w-[80%]">
              <div className="bg-white/90 backdrop-blur-sm text-gray-900 border border-white/30 rounded-2xl px-6 py-4 shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
