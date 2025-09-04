import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Maximize2, Minimize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: t('chatbot.welcomeMessage'),
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      // Mock responses - in a real app, this would be an API call to an LLM
      let botResponse = '';
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        botResponse = t('chatbot.responses.greeting');
      } else if (lowerMessage.includes('temple')) {
        botResponse = t('chatbot.responses.temples');
      } else if (lowerMessage.includes('fort') || lowerMessage.includes('forts')) {
        botResponse = t('chatbot.responses.forts');
      } else if (lowerMessage.includes('museum')) {
        botResponse = t('chatbot.responses.museums');
      } else if (lowerMessage.includes('best') || lowerMessage.includes('top') || lowerMessage.includes('recommend')) {
        botResponse = t('chatbot.responses.recommendations');
      } else if (lowerMessage.includes('time') || lowerMessage.includes('when') || lowerMessage.includes('hours')) {
        botResponse = t('chatbot.responses.visitingHours');
      } else if (lowerMessage.includes('thank')) {
        botResponse = t('chatbot.responses.thanks');
      } else {
        botResponse = t('chatbot.responses.default');
      }
      
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-20 transition-colors ${
          isOpen ? 'bg-secondary-700 text-white' : 'bg-primary-700 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '70vh',
              width: isMinimized ? '300px' : '350px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 bg-white rounded-lg shadow-2xl overflow-hidden z-20 flex flex-col"
            style={{ maxHeight: isMinimized ? '60px' : '70vh', maxWidth: '90vw' }}
          >
            {/* Chatbot Header */}
            <div className="bg-primary-700 text-white p-3 flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare size={20} className="mr-2" />
                <h3 className="font-medium">{t('chatbot.title')}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={toggleMinimize} className="text-white/80 hover:text-white">
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={toggleChatbot} className="text-white/80 hover:text-white">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Chatbot Body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="flex-grow overflow-y-auto p-4 bg-neutral-50"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          msg.isUser
                            ? 'bg-primary-700 text-white'
                            : 'bg-white text-neutral-800 shadow border border-neutral-200'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.isUser ? 'text-primary-200' : 'text-neutral-500'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Chatbot Input */}
            {!isMinimized && (
              <div className="p-3 border-t border-neutral-200 bg-white">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('chatbot.inputPlaceholder')}
                    className="flex-grow input border-neutral-300 py-2"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`ml-2 p-2 rounded-full ${
                      message.trim()
                        ? 'bg-primary-700 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;