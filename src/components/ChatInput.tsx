'use client';

import { useRef, useEffect } from 'react';
import { Send, StopCircle } from 'lucide-react';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ChatInput({ 
  input, 
  handleInputChange, 
  handleSubmit, 
  isLoading, 
  disabled = false 
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        form.requestSubmit();
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const isSendDisabled = !input.trim() || disabled || isLoading;

  return (
    <div className="glass shadow-soft border-t border-white/20 p-6">
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            className={`
              w-full resize-none rounded-2xl border border-white/30 px-6 py-4 pr-16
              focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              min-h-[56px] max-h-[120px]
              text-gray-900 placeholder-gray-500
              bg-white/80 backdrop-blur-sm shadow-soft
              focus:bg-white focus:shadow-medium
            `}
            rows={1}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSendDisabled}
          className={`
            flex-shrink-0 p-4 rounded-2xl font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isSendDisabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-soft'
              : 'bg-gradient-primary text-white hover:shadow-strong focus:ring-indigo-500 shadow-medium hover:scale-105'
            }
          `}
          title={isLoading ? 'Stop generating' : 'Send message'}
        >
          {isLoading ? (
            <StopCircle className="w-6 h-6" />
          ) : (
            <Send className="w-6 h-6" />
          )}
        </button>
      </form>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
