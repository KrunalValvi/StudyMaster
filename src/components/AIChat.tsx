import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, BookOpen, Brain, Target } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI study assistant. I can help you with creating flashcards, explaining concepts, generating quiz questions, and optimizing your study schedule. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Create flashcards from my notes",
        "Explain quantum physics concepts",
        "Generate a quiz on biology",
        "Optimize my study schedule"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aiResponses = [
    "I'd be happy to help you with that concept. Let me break it down into simpler terms.",
    "That's a great question! Based on your recent study sessions, I notice you might benefit from reviewing this topic again.",
    "Excellent work! You're showing great progress in this subject area. Let me create some practice questions for you.",
    "I recommend focusing on the key concepts we discussed earlier. Would you like me to generate some flashcards?",
    "Based on your learning patterns, I suggest using spaced repetition for this material. Let me set up a study schedule.",
    "I can see you're struggling with this topic. Let me provide a different explanation approach that might help.",
    "Your study streak is impressive! To maintain momentum, let's focus on reinforcing what you've learned.",
    "I've analyzed your quiz results and identified areas for improvement. Would you like me to create targeted practice materials?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
        suggestions: Math.random() > 0.5 ? [
          "Create practice quiz",
          "Generate summary",
          "Schedule review session",
          "Explain in detail"
        ] : undefined
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-orange-500 rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: 100 }}
            className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-[calc(100vw-2rem)] max-w-sm lg:w-96 h-[70vh] lg:h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base">AI Study Assistant</h3>
                  <p className="text-xs text-blue-100">Always here to help</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors touch-manipulation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}>
                      {message.sender === 'user' ? <User className="w-3 h-3 lg:w-4 lg:h-4" /> : <Bot className="w-3 h-3 lg:w-4 lg:h-4" />}
                    </div>
                    <div className={`rounded-2xl px-3 py-2 lg:px-4 lg:py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                    }`}>
                      <p className="text-xs lg:text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && (
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-2 py-1 lg:px-3 lg:py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors touch-manipulation"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 lg:w-4 lg:h-4" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-3 py-2 lg:px-4 lg:py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-1 lg:gap-2 mb-3">
                <button
                  onClick={() => handleSuggestionClick("Create flashcards from my notes")}
                  className="flex-1 flex items-center gap-1 lg:gap-2 px-2 py-2 lg:px-3 lg:py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors touch-manipulation"
                >
                  <Brain className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="text-xs">Cards</span>
                </button>
                <button
                  onClick={() => handleSuggestionClick("Generate a practice quiz")}
                  className="flex-1 flex items-center gap-1 lg:gap-2 px-2 py-2 lg:px-3 lg:py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors touch-manipulation"
                >
                  <BookOpen className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="text-xs">Quiz</span>
                </button>
                <button
                  onClick={() => handleSuggestionClick("Optimize my study schedule")}
                  className="flex-1 flex items-center gap-1 lg:gap-2 px-2 py-2 lg:px-3 lg:py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors touch-manipulation"
                >
                  <Target className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="text-xs">Plan</span>
                </button>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;