import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X } from 'lucide-react';
import { useVoiceAssistant } from '../../context/VoiceAssistantContext';

const VoiceAssistantWidget: React.FC = () => {
  const { t } = useTranslation();
  const { 
    isVoiceActive, 
    isListening, 
    transcript, 
    deactivateVoiceAssistant,
    startListening,
    stopListening 
  } = useVoiceAssistant();
  
  const [showTranscript, setShowTranscript] = useState(false);
  
  // Show transcript when user is speaking
  useEffect(() => {
    if (transcript && isListening) {
      setShowTranscript(true);
      
      // Hide transcript after a delay if user stops speaking
      const timer = setTimeout(() => {
        if (!isListening) {
          setShowTranscript(false);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [transcript, isListening]);
  
  if (!isVoiceActive) return null;
  
  return (
    <div className="fixed bottom-24 right-6 z-30">
      <div className="flex flex-col items-end space-y-2">
        {/* Transcript Bubble */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white p-3 rounded-lg shadow-lg max-w-xs"
            >
              <p className="text-neutral-800">{transcript || t('voice.speak')}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Voice Assistant Button */}
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={deactivateVoiceAssistant}
            className="bg-neutral-200 p-2 rounded-full shadow-md text-neutral-700 hover:bg-neutral-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>
          
          <motion.button
            onClick={isListening ? stopListening : startListening}
            className={`p-4 rounded-full shadow-md flex items-center justify-center ${
              isListening 
                ? 'bg-secondary-700 text-white animate-pulse' 
                : 'bg-primary-700 text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <MicOff size={24} />
            ) : (
              <Mic size={24} />
            )}
          </motion.button>
        </div>
        
        {/* Listening Status */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-secondary-700"
            >
              {t('voice.listening')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoiceAssistantWidget;