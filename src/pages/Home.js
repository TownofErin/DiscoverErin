import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import InstagramFeed from '../components/InstagramFeed';
import EventCarousel from '../components/EventCarousel';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-711 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0a15d7fb05ba4c667b2_farmBG.webp"
            alt="Erin countryside"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Welcome to Erin
          </h1>
          <p className="text-xl md:text-2xl text-white font-light max-w-2xl mx-auto leading-relaxed">
            A vibrant, friendly rural town in Ontario with charming warmth, agri-tourism adventures, an active equestrian community, and enriching experiences.
          </p>
        </div>
      </div>

      {/* Featured Events Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Upcoming Events
          </h2>
          <div className="px-4">
            <EventCarousel />
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Share what you Discover
          </h2>
          <InstagramFeed />
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
