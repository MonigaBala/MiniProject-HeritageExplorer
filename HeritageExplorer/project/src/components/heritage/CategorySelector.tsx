import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LandmarkIcon, Castle, Mouse as Museum, Building2, Compass, Ship, Building as Buildings, PalmtreeIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const CategorySelector: React.FC = () => {
  const { t } = useTranslation();
  
  const categories: Category[] = [
    {
      id: 'temples',
      name: t('categories.temples'),
      icon: <LandmarkIcon size={36} />,
      color: 'bg-primary-700/10 text-primary-700 border-primary-700/20',
    },
    {
      id: 'forts',
      name: t('categories.forts'),
      icon: <Castle size={36} />,
      color: 'bg-secondary-700/10 text-secondary-700 border-secondary-700/20',
    },
    {
      id: 'monuments',
      name: t('categories.monuments'),
      icon: <Building2 size={36} />,
      color: 'bg-accent-400/10 text-accent-500 border-accent-400/20',
    },
    {
      id: 'museums',
      name: t('categories.museums'),
      icon: <Museum size={36} />,
      color: 'bg-primary-900/10 text-primary-900 border-primary-900/20',
    },
    {
      id: 'religious',
      name: t('categories.religious'),
      icon: <Compass size={36} />,
      color: 'bg-secondary-500/10 text-secondary-600 border-secondary-500/20',
    },
    {
      id: 'beaches',
      name: t('categories.beaches'),
      icon: <PalmtreeIcon size={36} />,
      color: 'bg-primary-400/10 text-primary-500 border-primary-400/20',
    },
    {
      id: 'cities',
      name: t('categories.cities'),
      icon: <Buildings size={36} />,
      color: 'bg-accent-600/10 text-accent-600 border-accent-600/20',
    },
    {
      id: 'architecture',
      name: t('categories.architecture'),
      icon: <Ship size={36} />,
      color: 'bg-primary-800/10 text-primary-800 border-primary-800/20',
    },
  ];
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link to={`/explore?category=${category.id}`} key={category.id}>
          <motion.div
            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            className={`rounded-lg border p-6 text-center ${category.color} transition-all`}
          >
            <div className="flex justify-center mb-4">
              {category.icon}
            </div>
            <h3 className="font-medium">{category.name}</h3>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default CategorySelector;