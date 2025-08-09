'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface CopyToClipboardProps {
  text: string;
  className?: string;
  onCopy?: () => void;
}

export default function CopyToClipboard({ text, className = '', onCopy }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 
        hover:bg-white/60 rounded-xl transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2
        shadow-soft hover:shadow-medium
        ${className}
      `}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}
