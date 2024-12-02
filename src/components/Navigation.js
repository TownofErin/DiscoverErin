import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ searchTerm, onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Navigation styles based on page
  const navClasses = isHomePage 
    ? "absolute top-0 left-0 right-0 z-40 w-full"  // Changed z-index to be below announcement
    : "bg-white shadow-sm relative z-50 w-full";

  const linkClasses = isHomePage
    ? "text-white hover:text-gray-200"
    : "text-gray-800 hover:text-gray-600";

  const mobileMenuClasses = isHomePage
    ? "bg-black bg-opacity-75"
    : "bg-white";

  const containerClasses = location.pathname === '/business-directory'
    ? "px-3 sm:px-4"  // Full width for business directory
    : "max-w-[1280px] mx-auto px-3 sm:px-4";  // Contained width for other pages

  return (
    <nav className={navClasses}>
      <div className={containerClasses}>
        <div className="flex justify-between h-16 lg:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={isHomePage 
                  ? "https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0a15d7fb05ba4c6678a_discover-erin-2024-new-clover-white-text-p-500.png"
                  : "https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0cfbad0589ef0837ebc_discover-erin-2024-new-clover-p-500.png"
                }
                alt="Discover Erin"
                className="h-[32px] w-[62px] lg:h-[42px] lg:w-[81px] object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link 
              to="/places-to-stay" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors whitespace-nowrap`}
            >
              Places to Stay
            </Link>
            <Link 
              to="/things-to-do" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors whitespace-nowrap`}
            >
              Things to Do
            </Link>
            <Link 
              to="/eat-and-drink" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors whitespace-nowrap`}
            >
              Eat & Drink
            </Link>
            <Link 
              to="/our-town" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors whitespace-nowrap`}
            >
              Our Town
            </Link>
            <Link 
              to="/business-directory" 
              className={`px-3 py-2 text-base font-medium ${linkClasses} transition-colors whitespace-nowrap`}
            >
              Explore our Businesses
            </Link>
            <Link 
              to="/plan-your-trip" 
              className={`px-6 py-2.5 ${
                isHomePage 
                  ? "text-white bg-transparent border-2 border-erin-border hover:bg-erin-hover hover:border-erin-hover" 
                  : "text-white bg-green-600 hover:bg-green-700 border-2 border-green-600 hover:border-green-700"
              } rounded-full font-medium transition-all duration-300 whitespace-nowrap`}
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-1.5 rounded-md ${linkClasses} transition-colors`}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-5 w-5"
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
                  className="block h-5 w-5"
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
        className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} shadow-lg`} 
        id="mobile-menu"
      >
        <div className={`px-3 pt-1.5 pb-3 space-y-1.5 ${mobileMenuClasses}`}>
          <Link
            to="/places-to-stay"
            className={`block px-3 py-1.5 text-sm font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Places to Stay
          </Link>
          <Link
            to="/things-to-do"
            className={`block px-3 py-1.5 text-sm font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Things to Do
          </Link>
          <Link
            to="/eat-and-drink"
            className={`block px-3 py-1.5 text-sm font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Eat & Drink
          </Link>
          <Link
            to="/our-town"
            className={`block px-3 py-1.5 text-sm font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Our Town
          </Link>
          <Link
            to="/business-directory"
            className={`block px-3 py-1.5 text-sm font-medium ${linkClasses} transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Explore our Businesses
          </Link>
          <Link
            to="/plan-your-trip"
            className={`block px-5 py-2 mt-3 text-center text-sm ${
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
