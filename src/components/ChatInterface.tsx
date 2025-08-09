'use client';

import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Message, OpenAIModel } from '@/lib/types';
import { generateId, saveSelectedModel, loadSelectedModel } from '@/lib/utils';
import ModelSelector from './ModelSelector';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ErrorDisplay from './ErrorDisplay';

export default function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState<OpenAIModel>('gpt-4o');
  const [error, setError] = useState<string | null>(null);

  // Load selected model from localStorage on mount
  useEffect(() => {
    const savedModel = loadSelectedModel();
    setSelectedModel(savedModel);
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error: chatError,
    stop,
    reload,
  } = useChat({
    api: '/api/openai/chat',
    initialMessages: [],
    body: {
      model: selectedModel,
    },
    onError: (error) => {
      setError(error.message || 'An error occurred while chatting');
    },
    onFinish: () => {
      setError(null);
    },
  });

  const handleModelChange = (model: OpenAIModel) => {
    setSelectedModel(model);
    saveSelectedModel(model);
  };

  const handleRetry = () => {
    setError(null);
    reload();
  };

  const handleDismissError = () => {
    setError(null);
  };

  const handleNewChat = () => {
    // Reset the chat by reloading the page or clearing messages
    window.location.reload();
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="glass shadow-soft border-b border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-medium">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Chat
              </h1>
            </div>
            <div className="w-48">
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleNewChat}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 bg-white/80 hover:bg-white text-gray-700 font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </button>
            
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-200/50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Error Display */}
        {error && (
          <div className="px-6 pt-4">
            <ErrorDisplay
              error={error}
              onRetry={handleRetry}
              onDismiss={handleDismissError}
            />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <MessageList
            messages={messages}
            isLoading={isLoading}
            onCopy={(text) => {
              // Copy to clipboard functionality is handled in the Message component
              console.log('Message copied:', text);
            }}
          />
        </div>

        {/* Input */}
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          disabled={false}
        />
      </div>
    </div>
  );
}
