import { Message, ChatSession, OpenAIModel } from './types';

// Local storage keys
const CHAT_HISTORY_KEY = 'openai-chat-history';
const SELECTED_MODEL_KEY = 'openai-selected-model';

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Local storage utilities
export const saveChatHistory = (sessions: ChatSession[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(sessions));
  }
};

export const loadChatHistory = (): ChatSession[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CHAT_HISTORY_KEY);
    if (stored) {
      try {
        const sessions = JSON.parse(stored);
        // Convert string dates back to Date objects
        return sessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
      } catch (error) {
        console.error('Error parsing chat history:', error);
        return [];
      }
    }
  }
  return [];
};

export const saveSelectedModel = (model: OpenAIModel): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SELECTED_MODEL_KEY, model);
  }
};

export const loadSelectedModel = (): OpenAIModel => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(SELECTED_MODEL_KEY);
    if (stored && (stored === 'gpt-4o' || stored === 'gpt-5')) {
      return stored as OpenAIModel;
    }
  }
  return 'gpt-4o'; // Default model
};

// Chat session utilities
export const createNewSession = (model: OpenAIModel): ChatSession => {
  return {
    id: generateId(),
    title: 'New Chat',
    messages: [],
    model,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const updateSessionTitle = (messages: Message[]): string => {
  if (messages.length === 0) return 'New Chat';
  
  const firstUserMessage = messages.find(msg => msg.role === 'user');
  if (!firstUserMessage) return 'New Chat';
  
  const content = firstUserMessage.content.trim();
  if (content.length <= 50) return content;
  
  return content.substring(0, 50) + '...';
};

// Copy to clipboard utility
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

// Format timestamp
export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

// Format date for session list
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } else if (diffInHours < 168) { // 7 days
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } else {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }
};
