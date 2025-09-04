import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Chatbot from '../components/chatbot/Chatbot';
import { useVoiceAssistant } from '../context/VoiceAssistantContext';
import VoiceAssistantWidget from '../components/voice/VoiceAssistantWidget';

const MainLayout: React.FC = () => {
  const { isVoiceActive } = useVoiceAssistant();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Chatbot />
      {isVoiceActive && <VoiceAssistantWidget />}
      <Footer />
    </div>
  );
};

export default MainLayout;