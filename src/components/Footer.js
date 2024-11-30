import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white py-12 w-full">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {/* Logo and Description Column */}
          <div className="lg:max-w-xl mb-8 lg:mb-0">
            <Link to="/" className="inline-block mb-6">
              <img
                src="https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0cfbad0589ef0837ebc_discover-erin-2024-new-clover-p-500.png"
                alt="Discover Erin"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              A vibrant, friendly rural town in Ontario with charming warmth, agri-tourism adventures, an active equestrian community, and enriching experiences.
            </p>
            <p className="text-gray-600">
              Made with <span className="text-red-500">❤️</span> from Erin, Ontario
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-24">
            {/* About Us Column */}
            <div>
              <h3 className="text-gray-900 font-semibold text-lg mb-4">ABOUT US</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/business-directory" className="text-gray-600 hover:text-gray-900">
                    Explore Businesses
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" className="text-gray-600 hover:text-gray-900">
                    Sign Up Your Business
                  </Link>
                </li>
                <li>
                  <Link to="/our-town" className="text-gray-600 hover:text-gray-900">
                    Our Town
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h3 className="text-gray-900 font-semibold text-lg mb-4">COMMUNITY</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/places-to-stay" className="text-gray-600 hover:text-gray-900">
                    Places to Stay
                  </Link>
                </li>
                <li>
                  <Link to="/things-to-do" className="text-gray-600 hover:text-gray-900">
                    Things to Do
                  </Link>
                </li>
                <li>
                  <Link to="/eat-and-drink" className="text-gray-600 hover:text-gray-900">
                    Food & Drink
                  </Link>
                </li>
                <li>
                  <Link to="/visit-erin" className="text-gray-600 hover:text-gray-900">
                    Visit Erin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
