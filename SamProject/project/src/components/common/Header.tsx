import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, ChevronDown, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import LanguageSelector from '../language/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useVoiceAssistant } from '../../context/VoiceAssistantContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const { isVoiceActive, toggleVoiceAssistant } = useVoiceAssistant();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-wide py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-primary-700">
            {t('header.siteName')}
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-neutral-800 hover:text-primary-700 transition"
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/explore" 
            className="text-neutral-800 hover:text-primary-700 transition"
          >
            {t('nav.explore')}
          </Link>
          <Link 
            to="/about" 
            className="text-neutral-800 hover:text-primary-700 transition"
          >
            {t('nav.about')}
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center text-neutral-800 hover:text-primary-700 transition"
            >
              <Globe size={18} className="mr-1" />
              {t('nav.language')}
              <ChevronDown size={16} className="ml-1" />
            </button>
            
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <LanguageSelector onClose={() => setIsLangDropdownOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={toggleVoiceAssistant}
            className={`flex items-center hover:text-primary-700 transition ${
              isVoiceActive ? 'text-secondary-700' : 'text-neutral-800'
            }`}
          >
            {isVoiceActive ? (
              <MicOff size={18} className="mr-1" />
            ) : (
              <Mic size={18} className="mr-1" />
            )}
            {isVoiceActive ? t('voice.disable') : t('voice.enable')}
          </button>
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center text-neutral-800 hover:text-primary-700 transition"
              >
                <User size={18} className="mr-1" />
                {t('nav.profile')}
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-neutral-800 hover:bg-primary-50 hover:text-primary-700"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      {t('profile.viewProfile')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-neutral-800 hover:bg-primary-50 hover:text-primary-700"
                    >
                      {t('auth.logout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              {t('auth.login')}
            </Link>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-neutral-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container py-4 flex flex-col space-y-4">
              <Link to="/" className="text-neutral-800 py-2 border-b border-neutral-100">
                {t('nav.home')}
              </Link>
              <Link to="/explore" className="text-neutral-800 py-2 border-b border-neutral-100">
                {t('nav.explore')}
              </Link>
              <Link to="/about" className="text-neutral-800 py-2 border-b border-neutral-100">
                {t('nav.about')}
              </Link>
              
              <div className="py-2 border-b border-neutral-100">
                <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center text-neutral-800 w-full"
                >
                  <Globe size={18} className="mr-1" />
                  {t('nav.language')}
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isLangDropdownOpen && (
                  <div className="mt-2 bg-neutral-50 rounded-md py-1">
                    <LanguageSelector onClose={() => setIsLangDropdownOpen(false)} />
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleVoiceAssistant}
                className={`flex items-center py-2 border-b border-neutral-100 ${
                  isVoiceActive ? 'text-secondary-700' : 'text-neutral-800'
                }`}
              >
                {isVoiceActive ? (
                  <MicOff size={18} className="mr-1" />
                ) : (
                  <Mic size={18} className="mr-1" />
                )}
                {isVoiceActive ? t('voice.disable') : t('voice.enable')}
              </button>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-neutral-800 py-2 border-b border-neutral-100">
                    {t('profile.viewProfile')}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-neutral-800 py-2 text-left"
                  >
                    {t('auth.logout')}
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary self-start">
                  {t('auth.login')}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;