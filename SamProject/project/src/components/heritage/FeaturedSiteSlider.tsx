import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { HeritageSite } from '../../data/heritageSites';

interface FeaturedSiteSliderProps {
  sites: HeritageSite[];
}

const FeaturedSiteSlider: React.FC<FeaturedSiteSliderProps> = ({ sites }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === sites.length - 1 ? 0 : prev + 1));
    setIsAuto(false);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sites.length - 1 : prev - 1));
    setIsAuto(false);
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAuto(false);
  };
  
  useEffect(() => {
    if (isAuto) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === sites.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAuto, sites.length]);
  
  if (!sites.length) return null;
  
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div className="relative h-[500px]">
          {sites.map((site, index) => (
            <motion.div
              key={site.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 10 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-full w-full">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">{site.name}</h3>
                    <div className="flex items-center justify-center text-neutral-200 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span>{site.location}</span>
                    </div>
                    <p className="mb-6 text-neutral-100 max-w-2xl mx-auto">
                      {site.shortDescription}
                    </p>
                    <Link
                      to={`/heritage/${site.id}`}
                      className="btn btn-accent inline-block"
                    >
                      {t('heritage.visitBtn')}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-neutral-800 z-20"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-neutral-800 z-20"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {sites.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSiteSlider;