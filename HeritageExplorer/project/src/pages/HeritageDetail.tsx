import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Ticket, 
  Calendar, 
  Bookmark, 
  Mic, 
  History, 
  Building, 
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getSiteById } from '../data/heritageSites';
import { useVoiceAssistant } from '../context/VoiceAssistantContext';

const HeritageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { speak, isVoiceActive, activateVoiceAssistant } = useVoiceAssistant();
  
  const [site, setSite] = useState(id ? getSiteById(id) : null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [showFullArchitecture, setShowFullArchitecture] = useState(false);
  
  useEffect(() => {
    // Update site if ID changes
    if (id) {
      const siteData = getSiteById(id);
      setSite(siteData);
      
      // Set page title
      if (siteData) {
        document.title = `${siteData.name} - ${t('app.title')}`;
      }
      
      // Check if site is bookmarked
      const savedSites = JSON.parse(localStorage.getItem('savedSites') || '[]');
      setIsBookmarked(savedSites.includes(id));
    }
    
    // Scroll to top when component mounts or ID changes
    window.scrollTo(0, 0);
  }, [id, t]);
  
  const toggleBookmark = () => {
    const savedSites = JSON.parse(localStorage.getItem('savedSites') || '[]');
    let newSavedSites;
    
    if (isBookmarked) {
      newSavedSites = savedSites.filter((siteId: string) => siteId !== id);
    } else {
      newSavedSites = [...savedSites, id];
    }
    
    localStorage.setItem('savedSites', JSON.stringify(newSavedSites));
    setIsBookmarked(!isBookmarked);
  };
  
  const handleSpeakDescription = () => {
    if (!site) return;
    
    if (!isVoiceActive) {
      activateVoiceAssistant();
    }
    
    // Speak description based on active tab
    switch (activeTab) {
      case 'overview':
        speak(site.description);
        break;
      case 'history':
        speak(site.history);
        break;
      case 'architecture':
        speak(site.architecture);
        break;
      default:
        speak(site.description);
    }
  };
  
  if (!site) {
    return (
      <div className="container-wide py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Site not found</h2>
        <p className="mb-6">The heritage site you're looking for doesn't exist.</p>
        <Link to="/explore" className="btn btn-primary">
          Explore All Sites
        </Link>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <img 
          src={site.imageUrl} 
          alt={site.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
          <div className="container-wide">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {site.unesco && (
                <span className="inline-block bg-accent-400 text-neutral-900 text-xs font-bold px-2 py-1 rounded mb-4">
                  UNESCO World Heritage Site
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{site.name}</h1>
              <div className="flex items-center text-white/90 mb-6">
                <MapPin size={18} className="mr-1" />
                <span>{site.location}, Tamil Nadu</span>
                <div className="mx-4 h-1.5 w-1.5 rounded-full bg-white/70"></div>
                <div className="flex items-center">
                  <Star size={18} className="mr-1 fill-accent-400 text-accent-400" />
                  <span>{site.rating} rating</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link to="#" className="btn btn-accent">
                  {t('heritage.visitBtn')}
                </Link>
                <button 
                  onClick={handleSpeakDescription}
                  className="btn btn-outline text-white border-white hover:bg-white/10"
                >
                  <Mic size={18} className="mr-2" />
                  {t('heritage.voiceGuideBtn')}
                </button>
                <button 
                  onClick={toggleBookmark}
                  className={`btn ${
                    isBookmarked 
                      ? 'bg-white/20 text-white hover:bg-white/30' 
                      : 'btn-outline text-white border-white hover:bg-white/10'
                  }`}
                >
                  <Bookmark size={18} className={`mr-2 ${isBookmarked ? 'fill-white' : ''}`} />
                  {isBookmarked ? t('heritage.bookmarkedBtn') : t('heritage.bookmarkBtn')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-neutral-200 mb-8">
              <div className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`inline-block p-4 border-b-2 font-medium ${
                    activeTab === 'overview'
                      ? 'border-primary-700 text-primary-700'
                      : 'border-transparent hover:border-neutral-300 text-neutral-600'
                  }`}
                >
                  {t('heritage.overview')}
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`inline-block p-4 border-b-2 font-medium ${
                    activeTab === 'history'
                      ? 'border-primary-700 text-primary-700'
                      : 'border-transparent hover:border-neutral-300 text-neutral-600'
                  }`}
                >
                  {t('heritage.history')}
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`inline-block p-4 border-b-2 font-medium ${
                    activeTab === 'architecture'
                      ? 'border-primary-700 text-primary-700'
                      : 'border-transparent hover:border-neutral-300 text-neutral-600'
                  }`}
                >
                  {t('heritage.architecture')}
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="prose max-w-none">
              {activeTab === 'overview' && (
                <div>
                  <p className="text-lg leading-relaxed mb-6">{site.description}</p>
                  
                  <h3 className="text-xl font-serif font-bold mt-8 mb-4">{t('heritage.visitingTips')}</h3>
                  <ul className="space-y-2">
                    <li>Dress modestly when visiting religious sites - cover shoulders and knees.</li>
                    <li>Photography may be restricted in certain areas, especially inside temple sanctums.</li>
                    <li>Remove shoes before entering temples and sacred spaces.</li>
                    <li>Carry sufficient water and stay hydrated, especially during summer months.</li>
                    <li>Consider hiring a local guide for a more enriching experience.</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div>
                  <p className="text-lg leading-relaxed mb-6">
                    {showFullHistory ? site.history : `${site.history.substring(0, 300)}...`}
                  </p>
                  {site.history.length > 300 && (
                    <button
                      onClick={() => setShowFullHistory(!showFullHistory)}
                      className="flex items-center text-primary-700 hover:text-primary-800 font-medium"
                    >
                      {showFullHistory ? (
                        <>
                          {t('heritage.showLess')} <ChevronUp size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          {t('heritage.readMore')} <ChevronDown size={16} className="ml-1" />
                        </>
                      )}
                    </button>
                  )}
                  
                  <h3 className="text-xl font-serif font-bold mt-8 mb-4">Timeline</h3>
                  <div className="border-l-2 border-primary-700/30 pl-4 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary-700"></div>
                      <h4 className="font-bold">{site.yearBuilt}</h4>
                      <p>Original construction completed</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary-700/70"></div>
                      <h4 className="font-bold">16th - 18th Century</h4>
                      <p>Major renovations and additions during various dynasties</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary-700/50"></div>
                      <h4 className="font-bold">20th Century</h4>
                      <p>Archaeological Survey of India conservation efforts</p>
                    </div>
                    {site.unesco && (
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-accent-400"></div>
                        <h4 className="font-bold">UNESCO Recognition</h4>
                        <p>Designated as a World Heritage Site</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'architecture' && (
                <div>
                  <p className="text-lg leading-relaxed mb-6">
                    {showFullArchitecture ? site.architecture : `${site.architecture.substring(0, 300)}...`}
                  </p>
                  {site.architecture.length > 300 && (
                    <button
                      onClick={() => setShowFullArchitecture(!showFullArchitecture)}
                      className="flex items-center text-primary-700 hover:text-primary-800 font-medium"
                    >
                      {showFullArchitecture ? (
                        <>
                          {t('heritage.showLess')} <ChevronUp size={16} className="ml-1" />
                        </>
                      ) : (
                        <>
                          {t('heritage.readMore')} <ChevronDown size={16} className="ml-1" />
                        </>
                      )}
                    </button>
                  )}
                  
                  <h3 className="text-xl font-serif font-bold mt-8 mb-4">Architectural Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Structural Elements</h4>
                      <p>The building demonstrates classic Dravidian architectural principles with emphasis on symmetry and proportion.</p>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Stone Carvings</h4>
                      <p>Intricate stone carvings depicting mythological scenes and divine figures adorn the walls and pillars.</p>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Gopuram Design</h4>
                      <p>The temple tower features a stepped pyramid design with ornate sculptures of deities and celestial beings.</p>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Interior Spaces</h4>
                      <p>The mandapams (pillared halls) demonstrate advanced engineering with perfect acoustics and natural ventilation.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Nearby Attractions */}
            <div className="mt-12">
              <h3 className="text-2xl font-serif font-bold mb-6">{t('heritage.nearbyAttractions')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {site.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="card p-4">
                    <h4 className="font-bold mb-2">{attraction}</h4>
                    <Link to="#" className="text-primary-700 hover:text-primary-800 text-sm flex items-center">
                      Learn more <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Visiting Information</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-3 text-primary-700">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('heritage.openingHours')}</h4>
                    <p className="text-neutral-600">{site.visitingHours}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 text-primary-700">
                    <Ticket size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('heritage.entryFee')}</h4>
                    <p className="text-neutral-600">{site.entryFee}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 text-primary-700">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('heritage.bestTime')}</h4>
                    <p className="text-neutral-600">{site.bestTimeToVisit}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 text-primary-700">
                    <History size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Year Built</h4>
                    <p className="text-neutral-600">{site.yearBuilt}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 text-primary-700">
                    <Building size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Category</h4>
                    <p className="text-neutral-600 capitalize">{site.category}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Location Map</h3>
              <div className="bg-neutral-100 h-48 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Interactive map would be displayed here</p>
              </div>
              <div className="mt-4">
                <h4 className="font-medium">Address</h4>
                <p className="text-neutral-600">{site.name}, {site.location}, Tamil Nadu, India</p>
                <div className="mt-3">
                  <Link to="#" className="text-primary-700 hover:text-primary-800 flex items-center">
                    Get directions <ExternalLink size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4">Weather Forecast</h3>
              <div className="bg-neutral-100 h-40 rounded-lg flex items-center justify-center">
                <p className="text-neutral-500">Weather information would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeritageDetail;