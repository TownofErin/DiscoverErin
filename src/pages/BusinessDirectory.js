import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navigation from '../components/Navigation';
import MapComponent from '../components/MapComponent';
import { supabase } from '../lib/supabaseClient';

const BusinessCard = ({ place, onClick }) => {
  const hasLocation = Boolean(place.lat && place.lon);

  return (
    <div 
      className={`w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 ${
        hasLocation ? 'cursor-pointer hover:shadow-md' : ''
      } transition-shadow relative`}
      onClick={hasLocation ? onClick : undefined}
    >
      {/* Category Icon */}
      <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10">
        {place.categorySymbol ? (
          <img 
            src={place.categorySymbol} 
            alt={place.categoryName} 
            className="w-6 h-6"
          />
        ) : (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2M6 7l-3-1m3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9M18 7l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        )}
      </div>

      {/* Image Container */}
      {place.picture && (
        <div className="bg-gray-50 h-48">
          <img
            src={place.picture}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Location and Category */}
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-900">{place.locationName}</div>
          <div className="text-sm text-gray-600">
            {place.categoryName}
            {place.subCategoryName && (
              <>
                <span className="mx-1">&gt;</span>
                {place.subCategoryName}
              </>
            )}
          </div>
        </div>

        {/* Business Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>

        {/* Address */}
        <div className="text-sm text-gray-600 mb-4">
          {place.address1}
          {place.address2 && <>, {place.address2}</>}
          {place.postal_code && <>, {place.postal_code}</>}
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4">
          {place.phone && (
            <a 
              href={`tel:${place.phone}`} 
              className="text-gray-600 hover:text-gray-900"
              onClick={e => e.stopPropagation()}
            >
              <span className="sr-only">Phone</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          )}
          {place.email && (
            <a 
              href={`mailto:${place.email}`} 
              className="text-gray-600 hover:text-gray-900"
              onClick={e => e.stopPropagation()}
            >
              <span className="sr-only">Email</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
          {place.website && (
            <a 
              href={place.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-gray-900"
              onClick={e => e.stopPropagation()}
            >
              <span className="sr-only">Website</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <div className="flex-grow"></div>
          {place.google_maps && (
            <a 
              href={place.google_maps} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              onClick={e => e.stopPropagation()}
            >
              Directions
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const SelectWithChevron = ({ value, onChange, className = '', disabled = false, children }) => (
  <div className="relative w-full">
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${className} w-full pr-10 border-gray-300 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} focus:border-gray-300`}
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className={`w-5 h-5 ${disabled ? 'text-gray-400' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
);

const BusinessDirectory = () => {
  const mapRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showMap, setShowMap] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [availableCategories, setAvailableCategories] = useState(new Set());
  const [availableSubCategories, setAvailableSubCategories] = useState(new Set());
  const [availableCommunities, setAvailableCommunities] = useState(new Set());

  const handleCardClick = useCallback((place) => {
    if (place.lat && place.lon && mapRef.current) {
      mapRef.current.showPopup(place.id);
    }
  }, []);

  const handleCategoryChange = (categoryId) => {
    // Only reset subcategory if it doesn't belong to the new category
    if (categoryId === 'all') {
      setSelectedSubCategory('all');
    } else {
      const currentSubCategory = subCategories.find(sub => sub.id === Number(selectedSubCategory));
      if (currentSubCategory && currentSubCategory.category !== Number(categoryId)) {
        setSelectedSubCategory('all');
      }
    }
    setSelectedCategory(categoryId);
  };

  const fetchPlaces = useCallback(async () => {
    try {
      // First, get all available categories, subcategories, and communities from all places
      const { data: allPlaces } = await supabase
        .from('places')
        .select(`
          category,
          sub_category,
          locations,
          categories:category (id, name),
          sub_categories:sub_category (id, name),
          communities:locations (id, name)
        `);

      // Set available categories
      const availableCats = new Set(allPlaces
        .filter(item => item.category)
        .map(item => item.category)
      );
      setAvailableCategories(availableCats);

      // Set available subcategories for current category
      if (selectedCategory !== 'all') {
        const availableSubCats = new Set(allPlaces
          .filter(item => item.category === Number(selectedCategory) && item.sub_category)
          .map(item => item.sub_category)
        );
        setAvailableSubCategories(availableSubCats);
      }

      // Set available communities
      const availableComms = new Set(allPlaces
        .filter(item => item.locations)
        .map(item => item.locations)
      );
      setAvailableCommunities(availableComms);

      // Then get the filtered places
      let query = supabase
        .from('places')
        .select(`
          *,
          categories:category (id, name, symbol),
          sub_categories:sub_category (id, name),
          communities:locations (id, name)
        `);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      if (selectedSubCategory !== 'all') {
        query = query.eq('sub_category', selectedSubCategory);
      }
      if (selectedCommunity !== 'all') {
        query = query.eq('locations', selectedCommunity);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform data
      const transformedPlaces = data.map(place => ({
        ...place,
        categoryName: place.categories?.name,
        categorySymbol: place.categories?.symbol,
        subCategoryName: place.sub_categories?.name,
        locationName: place.communities?.name
      }));

      // Apply search filter
      let filteredPlaces = transformedPlaces;
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        filteredPlaces = filteredPlaces.filter(place => 
          place.name.toLowerCase().includes(search) ||
          place.summary?.toLowerCase().includes(search) ||
          place.address1?.toLowerCase().includes(search)
        );
      }

      // Apply sorting
      filteredPlaces.sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'category') {
          // First sort by category name
          const categoryCompare = (a.categoryName || '').localeCompare(b.categoryName || '');
          if (categoryCompare !== 0) return categoryCompare;
          
          // If categories are the same, sort by subcategory
          const subCategoryCompare = (a.subCategoryName || '').localeCompare(b.subCategoryName || '');
          if (subCategoryCompare !== 0) return subCategoryCompare;
          
          // If subcategories are the same, sort by business name
          return a.name.localeCompare(b.name);
        }
        return 0;
      });

      setPlaces(filteredPlaces);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }, [selectedCategory, selectedSubCategory, selectedCommunity, searchTerm, sortBy]);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        // Fetch sub-categories
        const { data: subCategoriesData } = await supabase
          .from('sub_categories')
          .select('*')
          .order('name');

        // Fetch communities
        const { data: communitiesData } = await supabase
          .from('communities')
          .select('*')
          .order('name');

        setCategories(categoriesData || []);
        setSubCategories(subCategoriesData || []);
        setCommunities(communitiesData || []);

        // Fetch initial places
        await fetchPlaces();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchPlaces]);

  // Fetch places when filters change
  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedCommunity('all');
    setSearchTerm('');
  };

  // Get filtered subcategories for the current category
  const getFilteredSubCategories = useCallback(() => {
    if (selectedCategory === 'all') return [];
    return subCategories.filter(sub => 
      sub.category === Number(selectedCategory) &&
      availableSubCategories.has(sub.id)
    );
  }, [selectedCategory, subCategories, availableSubCategories]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navigation */}
      <Navigation searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Filters */}
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 bg-white shadow-sm">
        {/* Mobile Filters */}
        <div className="lg:hidden">
          {/* Search Bar Row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1.5 pl-8 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] focus:border-gray-300"
              />
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 text-sm text-green-600 hover:text-green-700 font-medium bg-green-50 hover:bg-green-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span>Filters</span>
              <svg
                className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Collapsible Filters */}
          {showFilters && (
            <div className="space-y-2">
              {/* Category and Subcategory Row */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <SelectWithChevron
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {categories
                      .filter(category => availableCategories.has(category.id))
                      .map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                  </SelectWithChevron>
                </div>
                <div className="w-1/2">
                  <SelectWithChevron
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    disabled={selectedCategory === 'all'}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] appearance-none cursor-pointer"
                  >
                    <option value="all">{selectedCategory === 'all' ? 'Choose a Category first' : 'All Sub-Categories'}</option>
                    {getFilteredSubCategories().map(subCategory => (
                      <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                    ))}
                  </SelectWithChevron>
                </div>
              </div>

              {/* Community Row */}
              <div className="w-full">
                <SelectWithChevron
                  value={selectedCommunity}
                  onChange={(e) => setSelectedCommunity(e.target.value)}
                  className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] appearance-none cursor-pointer"
                >
                  <option value="all">All Communities</option>
                  {communities
                    .filter(community => availableCommunities.has(community.id))
                    .map(community => (
                      <option key={community.id} value={community.id}>{community.name}</option>
                    ))}
                </SelectWithChevron>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Filters - Horizontal Layout */}
        <div className="hidden lg:grid lg:grid-cols-[repeat(4,minmax(200px,1fr))_auto] lg:gap-4 lg:items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Business, Category, Community"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] focus:border-gray-300"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <SelectWithChevron
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories
              .filter(category => availableCategories.has(category.id))
              .map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
          </SelectWithChevron>

          <SelectWithChevron
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            disabled={selectedCategory === 'all'}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] appearance-none cursor-pointer"
          >
            <option value="all">{selectedCategory === 'all' ? 'Choose a Category first' : 'All Sub-Categories'}</option>
            {getFilteredSubCategories().map(subCategory => (
              <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
            ))}
          </SelectWithChevron>

          <SelectWithChevron
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] appearance-none cursor-pointer"
          >
            <option value="all">All Communities</option>
            {communities
              .filter(community => availableCommunities.has(community.id))
              .map(community => (
                <option key={community.id} value={community.id}>{community.name}</option>
              ))}
          </SelectWithChevron>

          <button
            onClick={resetFilters}
            className="text-green-600 hover:text-green-700 font-medium whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Business Listings */}
        <div className={`w-full lg:w-2/5 ${showMap ? 'hidden lg:block' : ''} overflow-y-auto pb-16 lg:pb-0 bg-gray-50`}>
          <div className="p-4">
            {/* Results Count and Sort */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">
                Showing {places.length} {places.length === 1 ? 'business' : 'businesses'}
              </span>
              <div className="w-44">
                <SelectWithChevron
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22742F] appearance-none cursor-pointer text-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                </SelectWithChevron>
              </div>
            </div>

            {/* Cards Grid - Responsive layout */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {places.map(place => (
                <BusinessCard 
                  key={place.id} 
                  place={place} 
                  onClick={() => handleCardClick(place)}
                />
              ))}
            </div>
            {places.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No businesses found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className={`w-full lg:w-3/5 ${!showMap ? 'hidden lg:block' : ''} relative`}>
          <MapComponent ref={mapRef} businesses={places} />
        </div>
      </div>

      {/* Mobile View Toggle - Fixed to viewport bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex space-x-2 z-50 shadow-lg">
        <button
          onClick={() => setShowMap(false)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            !showMap 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cards
        </button>
        <button
          onClick={() => setShowMap(true)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            showMap 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Map
        </button>
      </div>
    </div>
  );
};

export default BusinessDirectory;
