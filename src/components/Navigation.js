import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0a15d7fb05ba4c6678a_discover-erin-2024-new-clover-white-text-p-500.png"
                alt="Discover Erin"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center space-x-6">
            <Link 
              to="/places-to-stay" 
              className="px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            >
              Places to Stay
            </Link>
            <Link 
              to="/things-to-do" 
              className="px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            >
              Things to Do
            </Link>
            <Link 
              to="/eat-and-drink" 
              className="px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            >
              Eat & Drink
            </Link>
            <Link 
              to="/our-town" 
              className="px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            >
              Our Town
            </Link>
            <Link 
              to="/business-directory" 
              className="px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            >
              Explore our Businesses
            </Link>
            <Link 
              to="/plan-your-trip" 
              className="px-6 py-2.5 text-white bg-transparent border-2 border-erin-border rounded-full font-medium hover:bg-erin-hover hover:border-erin-hover transition-all duration-300 ml-2"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 transition-colors"
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
      </div>

      {/* Mobile menu */}
      <div 
        className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black bg-opacity-75">
          <Link
            to="/places-to-stay"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Places to Stay
          </Link>
          <Link
            to="/things-to-do"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Things to Do
          </Link>
          <Link
            to="/eat-and-drink"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Eat & Drink
          </Link>
          <Link
            to="/our-town"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Town
          </Link>
          <Link
            to="/business-directory"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Explore our Businesses
          </Link>
          <Link
            to="/plan-your-trip"
            className="block px-6 py-2.5 mt-4 text-center text-white bg-transparent border-2 border-erin-border rounded-full hover:bg-erin-hover hover:border-erin-hover transition-all duration-300"
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
