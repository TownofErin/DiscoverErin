import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';

const BusinessDirectory = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Businesses' },
    { id: 'restaurants', name: 'Restaurants & Cafes' },
    { id: 'retail', name: 'Retail Shops' },
    { id: 'services', name: 'Services' },
    { id: 'agriculture', name: 'Agriculture' },
  ];

  const businesses = [
    {
      id: 1,
      name: 'The Village Pantry',
      description: 'Local grocery & specialty foods',
      address: '123 Main St, Erin',
      category: 'retail',
      coordinates: [-80.067, 43.783]
    },
    {
      id: 2,
      name: 'Brighten Up',
      description: 'Home decor & gifts',
      address: '456 Mill St, Erin',
      category: 'retail',
      coordinates: [-80.065, 43.785]
    },
    {
      id: 3,
      name: 'The Busholme',
      description: 'Restaurant & inn',
      address: '789 Church St, Erin',
      category: 'restaurants',
      coordinates: [-80.069, 43.781]
    },
    {
      id: 4,
      name: 'Erin Farm Fresh',
      description: 'Local produce & farm products',
      address: '234 Rural Route, Erin',
      category: 'agriculture',
      coordinates: [-80.072, 43.779]
    },
    {
      id: 5,
      name: 'The Wellness Center',
      description: 'Health & wellness services',
      address: '567 Health Way, Erin',
      category: 'services',
      coordinates: [-80.064, 43.782]
    }
  ];

  const filteredBusinesses = businesses.filter(business => 
    selectedCategory === 'all' || business.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Business Directory</h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover local businesses and services in Erin.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map and Directory Layout */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Business Listings */}
          <div className="lg:col-span-1 space-y-6">
            {filteredBusinesses.map(business => (
              <div 
                key={business.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold mb-2">{business.name}</h3>
                <p className="text-gray-600 mb-2">{business.description}</p>
                <p className="text-gray-500 text-sm">{business.address}</p>
                <div className="mt-4 text-sm text-blue-600 capitalize">
                  {categories.find(cat => cat.id === business.category)?.name || business.category}
                </div>
              </div>
            ))}
            {filteredBusinesses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No businesses found in this category.
              </div>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 h-[600px]">
              <MapComponent businesses={filteredBusinesses} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default BusinessDirectory;
