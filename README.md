# AI Chat - OpenAI Chatbot

A modern, feature-rich AI chatbot built with Next.js 14, TypeScript, and the Vercel AI SDK, powered by OpenAI's GPT models.

## 🚀 Features

- **Real-time Chat Interface**: Responsive design with streaming AI responses
- **Multiple AI Models**: Support for GPT-4o and GPT-5
- **Markdown Rendering**: Rich text formatting, code blocks, and links
- **Copy to Clipboard**: Easy copying of AI responses
- **Error Handling**: Comprehensive error messages with retry functionality
- **Chat History**: Persistent conversations using local storage
- **Model Persistence**: Selected model persists across sessions
- **Stop Generation**: Ability to stop ongoing AI responses
- **Modern UI**: Clean, responsive design with Tailwind CSS

## 🛠️ Setup

### 1. OpenAI API Key Setup

**Important**: You need to add your OpenAI API key to Replit's Secrets:

1. Go to your Replit project
2. Click on the "Secrets" tab in the left sidebar
3. Add a new secret with:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (get it from [OpenAI Platform](https://platform.openai.com/api-keys))

### 2. Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 How to Use

1. **Select Model**: Choose between GPT-4o (most capable) or GPT-5 (latest with enhanced reasoning)
2. **Start Chatting**: Type your message and press Enter or click Send
3. **View Responses**: AI responses stream in real-time with markdown formatting
4. **Copy Messages**: Click the copy icon on any AI message to copy it
5. **Manage Chats**: Use "New Chat" to start fresh or "Clear" to reset the current chat

## 🏗️ Architecture

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **AI Integration**: Vercel AI SDK for streaming responses
- **State Management**: React hooks with local storage persistence
- **Styling**: Tailwind CSS with custom components
- **Markdown**: React Markdown for rich text rendering

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/openai/chat/   # OpenAI API route
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ChatInterface.tsx  # Main chat interface
│   ├── ChatInput.tsx      # Message input component
│   ├── MessageList.tsx    # Messages display
│   ├── Message.tsx        # Individual message
│   ├── ModelSelector.tsx  # Model selection dropdown
│   ├── CopyToClipboard.tsx # Copy functionality
│   └── ErrorDisplay.tsx   # Error messages
└── lib/                   # Utilities and types
    ├── types.ts           # TypeScript interfaces
    └── utils.ts           # Helper functions
```

## 🔧 Configuration

The application is pre-configured with:
- OpenAI API integration
- Vercel AI SDK for streaming
- Tailwind CSS for styling
- TypeScript for type safety
- Responsive design
- Error handling and retry mechanisms

## 🚨 Troubleshooting

**"OpenAI API key not found" error:**
- Make sure you've added `OPENAI_API_KEY` to your Replit Secrets
- Check that the key is valid and has sufficient credits

**Chat not working:**
- Verify your OpenAI API key is correct
- Check the browser console for any errors
- Ensure you have an active internet connection

## 📝 License

This project is open source and available under the MIT License.