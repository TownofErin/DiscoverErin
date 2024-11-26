import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Events Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Events in Erin</h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover upcoming events and activities in our vibrant community.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/images/fall-romp.jpg"
              alt="Fall Rural Romp"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Fall Rural Romp</h3>
              <p className="text-gray-600 mb-4">
                Experience the beauty of fall in Erin with our annual Rural Romp event.
                Visit local farms, enjoy fresh produce, and participate in family-friendly activities.
              </p>
              <div className="flex items-center justify-between text-gray-500">
                <span>Sept 28, 2024</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Event Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/images/barn-dance.jpg"
              alt="Barn Dance"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Barn Dance at Bela Farm</h3>
              <p className="text-gray-600 mb-4">
                Join us for a traditional barn dance featuring live music, local refreshments,
                and a celebration of our agricultural heritage.
              </p>
              <div className="flex items-center justify-between text-gray-500">
                <span>Sept 29, 2024</span>
                <span>7:00 PM - 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Event Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/images/fall-fair.jpg"
              alt="Erin Fall Fair"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Erin Fall Fair</h3>
              <p className="text-gray-600 mb-4">
                Country routes and rubber boots - celebrate fall at the annual Erin Fair.
                Featuring agricultural exhibits, live entertainment, and family fun.
              </p>
              <div className="flex items-center justify-between text-gray-500">
                <span>Oct 11-14, 2024</span>
                <span>All Day Event</span>
              </div>
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

export default Events;
