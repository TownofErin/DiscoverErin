import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ searchTerm, onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBusinessDirectory = location.pathname === '/business-directory';

  // Navigation styles based on page
  const navClasses = isHomePage 
    ? "bg-transparent absolute top-0 left-0 right-0 z-50"
    : "bg-white shadow-sm relative z-50";

  const linkClasses = isHomePage
    ? "text-white hover:text-gray-200"
    : "text-gray-800 hover:text-gray-600";

  const mobileMenuClasses = isHomePage
    ? "bg-black bg-opacity-75"
    : "bg-white";

  return (
    <nav className={navClasses}>
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={isHomePage 
                  ? "https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0a15d7fb05ba4c6678a_discover-erin-2024-new-clover-white-text-p-500.png"
                  : "https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0cfbad0589ef0837ebc_discover-erin-2024-new-clover-p-500.png"
                }
                alt="Discover Erin"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center space-x-6">
            <Link 
              to="/places-to-stay" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            >
              Places to Stay
            </Link>
            <Link 
              to="/things-to-do" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            >
              Things to Do
            </Link>
            <Link 
              to="/eat-and-drink" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            >
              Eat & Drink
            </Link>
            <Link 
              to="/our-town" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            >
              Our Town
            </Link>
            <Link 
              to="/business-directory" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            >
              Explore our Businesses
            </Link>
            <Link 
              to="/plan-your-trip" 
              className={`px-6 py-2.5 ${
                isHomePage 
                  ? "text-white bg-transparent border-2 border-erin-border hover:bg-erin-hover hover:border-erin-hover" 
                  : "text-white bg-green-600 hover:bg-green-700 border-2 border-green-600 hover:border-green-700"
              } rounded-full font-medium transition-all duration-300 ml-2`}
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${linkClasses} transition-colors`}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar for Business Directory */}
        {isBusinessDirectory && (
          <div className="py-4 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Business, Category, Community"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div 
        className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`} 
        id="mobile-menu"
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 ${mobileMenuClasses}`}>
          <Link
            to="/places-to-stay"
            className={`block px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Places to Stay
          </Link>
          <Link
            to="/things-to-do"
            className={`block px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Things to Do
          </Link>
          <Link
            to="/eat-and-drink"
            className={`block px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Eat & Drink
          </Link>
          <Link
            to="/our-town"
            className={`block px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Our Town
          </Link>
          <Link
            to="/business-directory"
            className={`block px-3 py-2 text-base font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Explore our Businesses
          </Link>
          <Link
            to="/plan-your-trip"
            className={`block px-6 py-2.5 mt-4 text-center ${
              isHomePage 
                ? "text-white bg-transparent border-2 border-erin-border hover:bg-erin-hover hover:border-erin-hover" 
                : "text-white bg-green-600 hover:bg-green-700 border-2 border-green-600 hover:border-green-700"
            } rounded-full transition-all duration-300`}
            onClick={() => setIsMenuOpen(false)}
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
