import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { useVoiceAssistant } from '../context/VoiceAssistantContext';

// Components
import HeritageSiteCard from '../components/heritage/HeritageSiteCard';
import FeaturedSiteSlider from '../components/heritage/FeaturedSiteSlider';
import CategorySelector from '../components/heritage/CategorySelector';
import TestimonialSlider from '../components/common/TestimonialSlider';

// Data
import { getFeaturedSites, getPopularSites } from '../data/heritageSites';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredSites, setFeaturedSites] = useState(getFeaturedSites());
  const [popularSites, setPopularSites] = useState(getPopularSites());
  const { activateVoiceAssistant } = useVoiceAssistant();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary-900 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://thumbs.dreamstime.com/z/golden-lotus-tank-gopurams-meenakshi-amman-temple-historic-hindu-located-madurai-city-tamil-nadu-aug-india-163369842.jpg" 
            alt="Meenakshi Amman Temple"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container-wide relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
          >
            <Link to="/explore" className="btn btn-accent text-lg px-8 py-3">
              {t('home.hero.exploreBtn')}
            </Link>
            <button 
              onClick={activateVoiceAssistant}
              className="btn btn-outline text-white border-white hover:bg-white/10 text-lg px-8 py-3"
            >
              {t('home.hero.voiceBtn')}
            </button>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t('home.hero.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-full text-neutral-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-700">
                <Search size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Sites Slider */}
      <section className="py-16 bg-neutral-50">
        <div className="container-wide">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-10"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold text-center mb-2">
              {t('home.featuredSites.title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 text-center max-w-2xl mx-auto">
              {t('home.featuredSites.subtitle')}
            </motion.p>
          </motion.div>
          
          <FeaturedSiteSlider sites={featuredSites} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-10"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold text-center mb-2">
              {t('home.categories.title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 text-center max-w-2xl mx-auto">
              {t('home.categories.subtitle')}
            </motion.p>
          </motion.div>
          
          <CategorySelector />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-neutral-50">
        <div className="container-wide">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-10"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold text-center mb-2">
              {t('home.popularSites.title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 text-center max-w-2xl mx-auto">
              {t('home.popularSites.subtitle')}
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularSites.map((site) => (
              <motion.div 
                key={site.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={itemVariants}
              >
                <HeritageSiteCard site={site} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/explore" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium">
              {t('home.popularSites.viewAllBtn')} <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-wide">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-10"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold text-center mb-2">
              {t('home.testimonials.title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-200 text-center max-w-2xl mx-auto">
              {t('home.testimonials.subtitle')}
            </motion.p>
          </motion.div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container-narrow text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold mb-4">
              {t('home.cta.title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              {t('home.cta.description')}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link to="/signup" className="btn btn-primary text-lg px-8 py-3">
                {t('home.cta.button')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;