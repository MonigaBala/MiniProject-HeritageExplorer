import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeritageSite } from '../../data/heritageSites';

interface HeritageSiteCardProps {
  site: HeritageSite;
}

const HeritageSiteCard: React.FC<HeritageSiteCardProps> = ({ site }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      className="card overflow-hidden h-full flex flex-col transition-transform hover:-translate-y-1"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={site.imageUrl} 
          alt={site.name} 
          className="w-full h-full object-cover"
        />
        {site.unesco && (
          <div className="absolute top-3 right-3 bg-accent-400 text-neutral-900 text-xs font-bold px-2 py-1 rounded">
            UNESCO
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold mb-1">{site.name}</h3>
          <div className="flex items-center text-accent-500">
            <Star size={16} className="fill-accent-500" />
            <span className="ml-1 text-sm font-medium">{site.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-neutral-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{site.location}</span>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 flex-grow">
          {site.shortDescription}
        </p>
        
        <div className="mt-auto pt-2 border-t border-neutral-100">
          <Link 
            to={`/heritage/${site.id}`}
            className="text-primary-700 hover:text-primary-800 text-sm font-medium"
          >
            {t('heritage.readMore')} →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HeritageSiteCard;