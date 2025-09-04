import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface VoiceAssistantContextType {
  isVoiceActive: boolean;
  isListening: boolean;
  transcript: string;
  toggleVoiceAssistant: () => void;
  activateVoiceAssistant: () => void;
  deactivateVoiceAssistant: () => void;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
}

const VoiceAssistantContext = createContext<VoiceAssistantContextType | undefined>(undefined);

export const useVoiceAssistant = () => {
  const context = useContext(VoiceAssistantContext);
  if (!context) {
    throw new Error('useVoiceAssistant must be used within a VoiceAssistantProvider');
  }
  return context;
};

// Mock SpeechRecognition for browsers that don't support it
const mockSpeechRecognition = () => {
  const recognition = {
    start: () => console.log('Mock recognition started'),
    stop: () => console.log('Mock recognition stopped'),
    abort: () => console.log('Mock recognition aborted'),
    addEventListener: () => {},
    removeEventListener: () => {},
    continuous: true,
    interimResults: true,
    lang: 'en-US',
  };
  
  return recognition;
};

export const VoiceAssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const { t, i18n } = useTranslation();
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if the browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onresult = (event: any) => {
          const current = event.resultIndex;
          const newTranscript = event.results[current][0].transcript;
          setTranscript(newTranscript);
          
          // Auto-process when the result is final
          if (event.results[current].isFinal) {
            processVoiceCommand(newTranscript);
          }
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
      } else {
        // Provide a mock for browsers that don't support SpeechRecognition
        recognitionRef.current = mockSpeechRecognition();
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Recognition already stopped');
        }
      }
    };
  }, []);
  
  // Update recognition language when i18n language changes
  useEffect(() => {
    if (recognitionRef.current) {
      // Map i18n language to speech recognition language code
      const langMap: Record<string, string> = {
        en: 'en-US',
        ta: 'ta-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ml: 'ml-IN',
        kn: 'kn-IN',
      };
      
      recognitionRef.current.lang = langMap[i18n.language] || 'en-US';
    }
  }, [i18n.language]);
  
  const toggleVoiceAssistant = () => {
    if (isVoiceActive) {
      deactivateVoiceAssistant();
    } else {
      activateVoiceAssistant();
    }
  };
  
  const activateVoiceAssistant = () => {
    setIsVoiceActive(true);
    speak(t('voice.welcomeMessage', 'Welcome to Tamil Nadu Heritage Explorer. How can I help you today?'));
    startListening();
  };
  
  const deactivateVoiceAssistant = () => {
    setIsVoiceActive(false);
    stopListening();
  };
  
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.log('Recognition already started');
      }
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.log('Recognition already stopped');
      }
    }
  };
  
  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on current i18n language
      utterance.lang = i18n.language;
      
      // Get available voices
      let voices = window.speechSynthesis.getVoices();
      
      // If voices are not loaded yet, wait for them
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          setVoiceForLanguage(utterance, voices);
          window.speechSynthesis.speak(utterance);
        };
      } else {
        setVoiceForLanguage(utterance, voices);
        window.speechSynthesis.speak(utterance);
      }
    }
  };
  
  const setVoiceForLanguage = (utterance: SpeechSynthesisUtterance, voices: SpeechSynthesisVoice[]) => {
    // Try to find a voice for the current language
    const langCode = i18n.language.slice(0, 2);
    let voice = voices.find(v => v.lang.startsWith(langCode));
    
    // Fall back to English if no voice is found for the current language
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en'));
    }
    
    if (voice) {
      utterance.voice = voice;
    }
  };
  
  const processVoiceCommand = (command: string) => {
    // Simple command processing logic
    const lowercaseCommand = command.toLowerCase();
    
    // Handle common commands
    if (lowercaseCommand.includes('hello') || lowercaseCommand.includes('hi')) {
      speak(t('chatbot.responses.greeting'));
    } else if (lowercaseCommand.includes('temple') || lowercaseCommand.includes('temples')) {
      speak(t('chatbot.responses.temples'));
    } else if (lowercaseCommand.includes('fort') || lowercaseCommand.includes('forts')) {
      speak(t('chatbot.responses.forts'));
    } else if (lowercaseCommand.includes('museum')) {
      speak(t('chatbot.responses.museums'));
    } else if (lowercaseCommand.includes('recommend') || lowercaseCommand.includes('suggestion')) {
      speak(t('chatbot.responses.recommendations'));
    } else if (lowercaseCommand.includes('thank')) {
      speak(t('chatbot.responses.thanks'));
    } else if (lowercaseCommand.includes('stop') || lowercaseCommand.includes('exit') || lowercaseCommand.includes('quit')) {
      speak(t('voice.goodbye', 'Thanks for using the voice assistant. Goodbye!'));
      deactivateVoiceAssistant();
    } else {
      speak(t('chatbot.responses.default'));
    }
  };
  
  return (
    <VoiceAssistantContext.Provider
      value={{
        isVoiceActive,
        isListening,
        transcript,
        toggleVoiceAssistant,
        activateVoiceAssistant,
        deactivateVoiceAssistant,
        startListening,
        stopListening,
        speak
      }}
    >
      {children}
    </VoiceAssistantContext.Provider>
  );
};