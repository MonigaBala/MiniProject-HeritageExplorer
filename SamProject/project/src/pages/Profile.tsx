import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Settings, BookMarked, Clock, Bell, Globe, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import HeritageSiteCard from '../components/heritage/HeritageSiteCard';
import { getSiteById, HeritageSite } from '../data/heritageSites';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  
  const [activeTab, setActiveTab] = useState('saved');
  const [savedSites, setSavedSites] = useState<HeritageSite[]>([]);
  const [recentSites, setRecentSites] = useState<HeritageSite[]>([]);
  
  // Get saved sites from localStorage
  useEffect(() => {
    const getSavedSitesFromStorage = () => {
      const savedSiteIds = JSON.parse(localStorage.getItem('savedSites') || '[]');
      const sites = savedSiteIds.map((id: string) => getSiteById(id)).filter(Boolean);
      setSavedSites(sites);
    };
    
    getSavedSitesFromStorage();
    
    // Mock recent visits for demo purposes
    const mockRecentSites = [
      getSiteById('1'),
      getSiteById('3'),
      getSiteById('6')
    ].filter(Boolean);
    
    setRecentSites(mockRecentSites);
  }, []);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container-wide py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary-700 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {user?.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-neutral-500">{user?.email}</p>
            </div>
            
            <nav>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`w-full flex items-center px-4 py-2 rounded-md ${
                      activeTab === 'saved' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <BookMarked size={20} className="mr-3" />
                    {t('profile.savedSites')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('recent')}
                    className={`w-full flex items-center px-4 py-2 rounded-md ${
                      activeTab === 'recent' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Clock size={20} className="mr-3" />
                    {t('profile.recentVisits')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`w-full flex items-center px-4 py-2 rounded-md ${
                      activeTab === 'preferences' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Settings size={20} className="mr-3" />
                    {t('profile.preferences')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 rounded-md text-red-600 hover:bg-red-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    {t('auth.logout')}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Saved Sites */}
          {activeTab === 'saved' && (
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">{t('profile.savedSites')}</h2>
              
              {savedSites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {savedSites.map((site) => (
                    <motion.div
                      key={site.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <HeritageSiteCard site={site} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <BookMarked size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-lg font-bold mb-2">No saved sites yet</h3>
                  <p className="text-neutral-600 mb-6">
                    Bookmark your favorite heritage sites to access them quickly later.
                  </p>
                  <Link to="/explore" className="btn btn-primary">
                    Explore Heritage Sites
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Recent Visits */}
          {activeTab === 'recent' && (
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">{t('profile.recentVisits')}</h2>
              
              {recentSites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {recentSites.map((site) => (
                    <motion.div
                      key={site.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <HeritageSiteCard site={site} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Clock size={48} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-lg font-bold mb-2">No recent visits</h3>
                  <p className="text-neutral-600 mb-6">
                    Start exploring heritage sites to see your recent visits here.
                  </p>
                  <Link to="/explore" className="btn btn-primary">
                    Explore Now
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-2xl font-serif font-bold mb-6">{t('profile.preferences')}</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">
                  <User size={20} className="inline mr-2" />
                  {t('profile.accountSettings')}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <div>
                      <h4 className="font-medium">Email Address</h4>
                      <p className="text-neutral-500 text-sm">{user?.email}</p>
                    </div>
                    <button className="text-primary-700 hover:text-primary-800">
                      Edit
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-neutral-100">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-neutral-500 text-sm">Last updated 3 months ago</p>
                    </div>
                    <button className="text-primary-700 hover:text-primary-800">
                      Change
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <h4 className="font-medium">Profile Picture</h4>
                      <p className="text-neutral-500 text-sm">Personalize your account</p>
                    </div>
                    <button className="text-primary-700 hover:text-primary-800">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">
                  <Globe size={20} className="inline mr-2" />
                  {t('profile.languagePreference')}
                </h3>
                
                <div className="space-y-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={`block w-full text-left px-4 py-3 rounded-md ${
                        currentLanguage === language.code
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="block font-medium">{language.name}</span>
                          <span className="text-sm text-neutral-500">{language.nativeName}</span>
                        </div>
                        {currentLanguage === language.code && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">
                  <Bell size={20} className="inline mr-2" />
                  {t('profile.notificationSettings')}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-neutral-500 text-sm">Receive updates and newsletters</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-700"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-neutral-500 text-sm">Nearby heritage sites alerts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-700"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Communications</h4>
                      <p className="text-neutral-500 text-sm">Special offers and promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-700"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;