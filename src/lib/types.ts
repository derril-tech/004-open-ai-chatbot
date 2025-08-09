export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OpenAIModel = 'gpt-4o' | 'gpt-5';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  model: OpenAIModel;
  isStreaming: boolean;
}

export interface ModelOption {
  value: OpenAIModel;
  label: string;
  description: string;
}

export interface CopyToClipboardProps {
  text: string;
  onCopy?: () => void;
}

export interface MessageProps {
  message: Message;
  onCopy?: (text: string) => void;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface ModelSelectorProps {
  selectedModel: OpenAIModel;
  onModelChange: (model: OpenAIModel) => void;
  disabled?: boolean;
}
