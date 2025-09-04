import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HeritageDetail from './pages/HeritageDetail';
import AboutPage from './pages/About';
import ExploreAll from './pages/ExploreAll';
import Profile from './pages/Profile';

// Context
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { VoiceAssistantProvider } from './context/VoiceAssistantContext';

function App() {
  const { t } = useTranslation();
  document.title = t('app.title');

  return (
    <AuthProvider>
      <LanguageProvider>
        <VoiceAssistantProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="heritage/:id" element={<HeritageDetail />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="explore" element={<ExploreAll />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </VoiceAssistantProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;