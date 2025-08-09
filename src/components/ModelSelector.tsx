'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';
import { ModelSelectorProps, ModelOption } from '@/lib/types';

const modelOptions: ModelOption[] = [
  {
    value: 'gpt-4o',
    label: 'GPT-4o',
    description: 'Most capable model, best for complex tasks',
  },
  {
    value: 'gpt-5',
    label: 'GPT-5',
    description: 'Latest model with enhanced reasoning',
  },
];

export default function ModelSelector({ selectedModel, onModelChange, disabled = false }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = modelOptions.find(option => option.value === selectedModel);

  const handleModelChange = (model: string) => {
    onModelChange(model as any);
    setIsOpen(false);
  };

  const getModelIcon = (model: string) => {
    return model === 'gpt-4o' ? <Sparkles className="w-4 h-4" /> : <Zap className="w-4 h-4" />;
  };

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 
          bg-white/80 hover:bg-white border border-white/30 rounded-xl shadow-soft hover:shadow-medium
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 backdrop-blur-sm
        `}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-1.5 rounded-lg ${selectedModel === 'gpt-4o' ? 'bg-gradient-primary' : 'bg-gradient-success'}`}>
            {getModelIcon(selectedModel)}
          </div>
          <span className="font-semibold">{selectedOption?.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-md border border-white/30 rounded-xl shadow-strong">
          {modelOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleModelChange(option.value)}
              className={`
                w-full px-4 py-3 text-left hover:bg-gray-50/80 focus:bg-gray-50/80 focus:outline-none
                ${selectedModel === option.value ? 'bg-indigo-50/80 text-indigo-700' : 'text-gray-700'}
                transition-all duration-150 first:rounded-t-xl last:rounded-b-xl
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded-lg ${option.value === 'gpt-4o' ? 'bg-gradient-primary' : 'bg-gradient-success'}`}>
                  {getModelIcon(option.value)}
                </div>
                <div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
