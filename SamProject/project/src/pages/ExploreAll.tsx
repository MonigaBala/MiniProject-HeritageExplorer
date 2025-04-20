import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, X, SlidersHorizontal } from 'lucide-react';

import HeritageSiteCard from '../components/heritage/HeritageSiteCard';
import { getAllSites, searchSites, HeritageSite } from '../data/heritageSites';

const ExploreAll: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sites, setSites] = useState<HeritageSite[]>([]);
  const [filteredSites, setFilteredSites] = useState<HeritageSite[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [unescoOnly, setUnescoOnly] = useState(false);
  
  // Get all unique categories and locations
  const categories = Array.from(new Set(getAllSites().map(site => site.category)));
  const locations = Array.from(new Set(getAllSites().map(site => site.location)));
  
  // Parse URL params on component mount
  useEffect(() => {
    // Get all sites
    const allSites = getAllSites();
    setSites(allSites);
    
    // Get URL parameters
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    const locationParam = params.get('location');
    const unescoParam = params.get('unesco');
    
    // Set state based on URL parameters
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
    if (locationParam) setSelectedLocation(locationParam);
    if (unescoParam === 'true') setUnescoOnly(true);
    
    // Apply initial filters
    let filtered = allSites;
    
    if (searchParam) {
      filtered = searchSites(searchParam);
    }
    
    if (categoryParam) {
      filtered = filtered.filter(site => site.category === categoryParam);
    }
    
    if (locationParam) {
      filtered = filtered.filter(site => site.location === locationParam);
    }
    
    if (unescoParam === 'true') {
      filtered = filtered.filter(site => site.unesco);
    }
    
    setFilteredSites(filtered);
  }, [location.search]);
  
  // Update URL with filter parameters
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLocation) params.set('location', selectedLocation);
    if (unescoOnly) params.set('unesco', 'true');
    
    navigate(`/explore?${params.toString()}`);
  };
  
  // Apply filters
  const applyFilters = () => {
    updateUrlParams();
    
    let filtered = sites;
    
    if (searchQuery) {
      filtered = searchSites(searchQuery);
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(site => site.category === selectedCategory);
    }
    
    if (selectedLocation) {
      filtered = filtered.filter(site => site.location === selectedLocation);
    }
    
    if (unescoOnly) {
      filtered = filtered.filter(site => site.unesco);
    }
    
    setFilteredSites(filtered);
    setIsFilterOpen(false);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedLocation(null);
    setUnescoOnly(false);
    navigate('/explore');
    setFilteredSites(sites);
  };
  
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  return (
    <div className="container-wide py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
        {t('explore.title', 'Explore Tamil Nadu Heritage')}
      </h1>
      <p className="text-neutral-600 mb-8 max-w-3xl">
        {t('explore.subtitle', 'Discover the rich cultural heritage, ancient temples, historic monuments, and architectural marvels of Tamil Nadu')}
      </p>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearchSubmit} className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder={t('explore.searchPlaceholder', 'Search for heritage sites')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pr-10"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-neutral-500" />
            </button>
          </div>
        </form>
        
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="btn flex items-center justify-center md:w-auto"
        >
          <Filter size={20} className="mr-2" />
          {t('explore.filter', 'Filter')}
        </button>
      </div>
      
      {/* Applied Filters */}
      {(selectedCategory || selectedLocation || unescoOnly) && (
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="text-sm font-medium text-neutral-500 py-1">
            {t('explore.appliedFilters', 'Applied Filters:')}
          </div>
          
          {selectedCategory && (
            <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              {t('categories.' + selectedCategory, selectedCategory)}
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  applyFilters();
                }}
                className="ml-1 text-primary-700 hover:text-primary-900"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {selectedLocation && (
            <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <MapPin size={14} className="mr-1" />
              {selectedLocation}
              <button 
                onClick={() => {
                  setSelectedLocation(null);
                  applyFilters();
                }}
                className="ml-1 text-primary-700 hover:text-primary-900"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {unescoOnly && (
            <div className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              UNESCO Sites Only
              <button 
                onClick={() => {
                  setUnescoOnly(false);
                  applyFilters();
                }}
                className="ml-1 text-accent-700 hover:text-accent-900"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          <button
            onClick={clearFilters}
            className="text-neutral-500 hover:text-neutral-700 text-sm px-3 py-1"
          >
            {t('explore.clearAll', 'Clear All')}
          </button>
        </div>
      )}
      
      {/* Filter Panel */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-neutral-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              <SlidersHorizontal size={20} className="inline mr-2" />
              {t('explore.filterOptions', 'Filter Options')}
            </h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <h4 className="font-medium mb-2">{t('explore.category', 'Category')}</h4>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="input w-full"
              >
                <option value="">{t('explore.allCategories', 'All Categories')}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {t(`categories.${category}`, category)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Location Filter */}
            <div>
              <h4 className="font-medium mb-2">{t('explore.location', 'Location')}</h4>
              <select
                value={selectedLocation || ''}
                onChange={(e) => setSelectedLocation(e.target.value || null)}
                className="input w-full"
              >
                <option value="">{t('explore.allLocations', 'All Locations')}</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            {/* UNESCO Filter */}
            <div>
              <h4 className="font-medium mb-2">{t('explore.recognition', 'Recognition')}</h4>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="unesco"
                  checked={unescoOnly}
                  onChange={() => setUnescoOnly(!unescoOnly)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="unesco" className="ml-2 text-neutral-700">
                  {t('explore.unescoOnly', 'UNESCO World Heritage Sites Only')}
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={clearFilters}
              className="btn btn-outline"
            >
              {t('explore.clearFilters', 'Clear Filters')}
            </button>
            <button
              onClick={applyFilters}
              className="btn btn-primary"
            >
              {t('explore.applyFilters', 'Apply Filters')}
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Results */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">
          {filteredSites.length} {filteredSites.length === 1 ? 'Result' : 'Results'}
        </h2>
      </div>
      
      {filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSites.map((site) => (
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
        <div className="text-center py-12">
          <div className="mb-4">
            <Search size={48} className="mx-auto text-neutral-300" />
          </div>
          <h3 className="text-lg font-bold mb-2">No results found</h3>
          <p className="text-neutral-500 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={clearFilters}
            className="btn btn-primary"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreAll;