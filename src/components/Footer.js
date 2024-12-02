import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Description */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center">
              <img
                src="https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0cfbad0589ef0837ebc_discover-erin-2024-new-clover-p-500.png"
                alt="Discover Erin"
                className="h-[42px] w-[81px] object-contain"
              />
            </Link>
            <p className="text-gray-600 text-base">
              Discover the charm and warmth of Erin, Ontario. A vibrant community rich in history, culture, and natural beauty.
            </p>
          </div>

          {/* Links Section */}
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <div className="grid grid-cols-2 gap-8 xl:justify-items-end">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Explore</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/places-to-stay" className="text-base text-gray-600 hover:text-gray-900">
                      Places to Stay
                    </Link>
                  </li>
                  <li>
                    <Link to="/things-to-do" className="text-base text-gray-600 hover:text-gray-900">
                      Things to Do
                    </Link>
                  </li>
                  <li>
                    <Link to="/eat-and-drink" className="text-base text-gray-600 hover:text-gray-900">
                      Eat & Drink
                    </Link>
                  </li>
                  <li>
                    <Link to="/our-town" className="text-base text-gray-600 hover:text-gray-900">
                      Our Town
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Business</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/business-directory" className="text-base text-gray-600 hover:text-gray-900">
                      Business Directory
                    </Link>
                  </li>
                  <li>
                    <Link to="/submit-business" className="text-base text-gray-600 hover:text-gray-900">
                      Submit Your Business
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-gray-600 hover:text-gray-900">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-base text-gray-500">
              &copy; {new Date().getFullYear()} Discover Erin. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-base text-gray-500">Website by</span>
              <a 
                href="https://pixelmixel.ca" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-900"
              >
                <img 
                  src="https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/logos/bw-pixelmixel.webp"
                  alt="Pixel Mixel Inc."
                  className="h-6 w-6 object-contain"
                />
                <span>Pixel Mixel Inc.</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
