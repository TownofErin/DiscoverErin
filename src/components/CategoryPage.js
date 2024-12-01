import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

const BusinessCard = ({ place }) => (
  <div className="relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
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

    {/* Image */}
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
        <div className="text-sm font-medium text-gray-900">{place.locations}</div>
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
          <a href={`tel:${place.phone}`} className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Phone</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        )}
        {place.email && (
          <a href={`mailto:${place.email}`} className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Email</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        )}
        {place.website && (
          <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Website</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        <div className="flex-grow"></div>
        <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
          Directions
        </Link>
      </div>
    </div>
  </div>
);

const CategoryPage = ({ 
  title, 
  description, 
  places,
  headerImage = 'https://via.placeholder.com/600x400'
}) => {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <div className="bg-[#E5EDE5] w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm mb-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">&bull;</span>
            <span className="text-gray-900">{title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
              <p className="text-lg text-gray-700">{description}</p>
            </div>
            <div className="hidden lg:block">
              <img 
                src={headerImage} 
                alt={title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Place Cards */}
      <div className="max-w-[1280px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(places) && places.map((place) => (
            <BusinessCard key={place.id} place={place} />
          ))}
        </div>
        {(!places || places.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            No places found.
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
