'use client';

import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { MessageProps } from '@/lib/types';
import { formatTimestamp } from '@/lib/utils';
import CopyToClipboard from './CopyToClipboard';

// Extend the MessageProps interface to handle Vercel AI SDK messages
interface ExtendedMessageProps {
  message: any; // Use any to handle Vercel AI SDK message type
  onCopy?: (text: string) => void;
}

export default function Message({ message, onCopy }: ExtendedMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 p-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`
          rounded-2xl px-6 py-4 shadow-soft
          ${isUser 
            ? 'bg-gradient-primary text-white shadow-medium' 
            : 'bg-white/90 backdrop-blur-sm text-gray-900 border border-white/30 shadow-soft'
          }
        `}>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                // Code block styling
                code: ({ node, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  return !isInline ? (
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-xl overflow-x-auto my-3 shadow-medium">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded-lg text-sm font-mono" {...props}>
                      {children}
                    </code>
                  );
                },
                // Link styling
                a: ({ children, href }: any) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {children}
                  </a>
                ),
                // List styling
                ul: ({ children }: any) => (
                  <ul className="list-disc list-inside space-y-1 my-3">
                    {children}
                  </ul>
                ),
                ol: ({ children }: any) => (
                  <ol className="list-decimal list-inside space-y-1 my-3">
                    {children}
                  </ol>
                ),
                // Blockquote styling
                blockquote: ({ children }: any) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-3 text-gray-600 bg-gray-50/50 rounded-r-lg py-2">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span className="bg-white/60 backdrop-blur-sm px-2 py-1 rounded-full">
            {message.timestamp ? formatTimestamp(new Date(message.timestamp)) : 'Just now'}
          </span>
          {!isUser && (
            <CopyToClipboard 
              text={message.content}
              onCopy={() => onCopy?.(message.content)}
            />
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-medium">
          <User className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
}
