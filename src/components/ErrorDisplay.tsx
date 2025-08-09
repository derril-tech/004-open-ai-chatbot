'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorDisplay({ error, onRetry, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-6 mb-4 shadow-soft">
      <div className="flex items-start">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 shadow-soft">
          <AlertCircle className="w-4 h-4 text-white" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-sm font-semibold text-red-800 mb-2">
            Error occurred
          </h3>
          <p className="text-sm text-red-700 leading-relaxed">
            {error}
          </p>
          <div className="mt-4 flex gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-xl text-red-700 bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-soft hover:shadow-medium"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-red-700 hover:text-red-800 hover:bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
