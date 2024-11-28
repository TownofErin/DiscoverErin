import React, { useState, useEffect, useMemo } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';

const BusinessCard = ({ business }) => (
  <div className="w-[350px] h-[350px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
    <div className="relative h-[200px]">
      <img
        src={business.image || 'https://via.placeholder.com/350x200'}
        alt={business.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
        {business.category === 'restaurants' ? (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2M6 7l-3-1m3 1l3 9a5.002 5.002 0 006.001 0M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        )}
      </div>
    </div>
    <div className="p-4 flex-grow">
      <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{business.name}</h3>
      <p className="text-gray-600 mt-1 text-sm line-clamp-2">{business.description}</p>
      <p className="text-gray-500 text-sm mt-2">{business.address}</p>
    </div>
    <div className="px-4 pb-4 flex items-center space-x-4">
      {business.socials.facebook && (
        <a href={business.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Facebook</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>
      )}
      {business.socials.instagram && (
        <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Instagram</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        </a>
      )}
      {business.socials.website && (
        <a href={business.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Website</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </a>
      )}
      {business.socials.phone && (
        <a href={`tel:${business.socials.phone}`} className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Phone</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      )}
      {business.socials.email && (
        <a href={`mailto:${business.socials.email}`} className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Email</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      )}
    </div>
  </div>
);

const BusinessDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showMap, setShowMap] = useState(true);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  const categories = useMemo(() => [
    { id: 'all', name: 'All Categories', subCategories: [] },
    { 
      id: 'restaurants', 
      name: 'Restaurants & Cafes',
      subCategories: [
        { id: 'cafe', name: 'Cafes' },
        { id: 'restaurant', name: 'Restaurants' },
        { id: 'bakery', name: 'Bakeries' }
      ]
    },
    { 
      id: 'retail', 
      name: 'Retail Shops',
      subCategories: [
        { id: 'clothing', name: 'Clothing' },
        { id: 'grocery', name: 'Grocery' },
        { id: 'gifts', name: 'Gifts & Specialty' }
      ]
    },
  ], []);

  const communities = useMemo(() => [
    { id: 'all', name: 'All Communities' },
    { id: 'erin', name: 'Erin Village' },
    { id: 'hillsburgh', name: 'Hillsburgh' },
  ], []);

  const businesses = useMemo(() => [
    {
      id: 1,
      name: 'The Village Pantry',
      description: 'Local grocery & specialty foods',
      address: '123 Main St, Erin',
      category: 'retail',
      subCategory: 'grocery',
      community: 'erin',
      coordinates: [-80.067, 43.783],
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        website: 'https://example.com',
        phone: '519-123-4567',
        email: 'info@example.com'
      }
    },
    {
      id: 2,
      name: 'Brighten Up',
      description: 'Home decor & gifts',
      address: '456 Mill St, Erin',
      category: 'retail',
      subCategory: 'gifts',
      community: 'erin',
      coordinates: [-80.065, 43.785],
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        website: 'https://example.com',
        phone: '519-123-4567',
        email: 'info@example.com'
      }
    },
    {
      id: 3,
      name: 'The Busholme',
      description: 'Restaurant & inn',
      address: '789 Church St, Erin',
      category: 'restaurants',
      subCategory: 'restaurant',
      community: 'erin',
      coordinates: [-80.069, 43.781],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      socials: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        website: 'https://example.com',
        phone: '519-123-4567',
        email: 'info@example.com'
      }
    },
  ], []);

  const availableSubCategories = useMemo(() => 
    selectedCategory === 'all'
      ? []
      : categories.find(cat => cat.id === selectedCategory)?.subCategories || [],
    [selectedCategory, categories]
  );

  useEffect(() => {
    let filtered = businesses;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(search) ||
        business.description.toLowerCase().includes(search) ||
        business.address.toLowerCase().includes(search)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    if (selectedSubCategory !== 'all') {
      filtered = filtered.filter(business => business.subCategory === selectedSubCategory);
    }

    if (selectedCommunity !== 'all') {
      filtered = filtered.filter(business => business.community === selectedCommunity);
    }

    // Sort businesses
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredBusinesses(filtered);
  }, [searchTerm, selectedCategory, selectedSubCategory, selectedCommunity, businesses, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedCommunity('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Filters */}
      <div className="max-w-[2000px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory('all');
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!availableSubCategories.length}
          >
            <option value="all">All Sub-Categories</option>
            {availableSubCategories.map(subCategory => (
              <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
            ))}
          </select>

          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
          >
            {communities.map(community => (
              <option key={community.id} value={community.id}>{community.name}</option>
            ))}
          </select>

          <button
            onClick={resetFilters}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Reset
          </button>

          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Showing {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Map Toggle */}
      <div className="lg:hidden max-w-[2000px] mx-auto px-4 sm:px-6 py-2">
        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
        >
          {showMap ? 'Show List' : 'Show Map'}
        </button>
      </div>

      {/* Map and Directory Layout */}
      <div className="flex-grow max-w-[2000px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-8">
          {/* Business Listings */}
          <div className={`xl:col-span-2 ${showMap ? 'hidden lg:block' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
              {filteredBusinesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
            {filteredBusinesses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No businesses found matching your criteria.
              </div>
            )}
          </div>

          {/* Map */}
          <div className={`xl:col-span-3 ${!showMap ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[600px] xl:h-[800px]">
              <MapComponent businesses={filteredBusinesses} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessDirectory;
