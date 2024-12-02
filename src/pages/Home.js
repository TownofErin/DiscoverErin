import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import InstagramFeed from '../components/InstagramFeed';
import EventCarousel from '../components/EventCarousel';
import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    {
      title: "Agri-Tourism",
      image: "https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/home/agri-tourism.jpg",
      link: "/things-to-do?category=agri-tourism"
    },
    {
      title: "Equestrian",
      image: "https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/home/equestrian.jpg",
      link: "/things-to-do?category=agri-tourism"
    },
    {
      title: "Arts & Culture",
      image: "https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/home/arts-culture.jpg",
      link: "/things-to-do?category=arts-culture"
    },
    {
      title: "Community",
      image: "https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/home/community.jpg",
      link: "/things-to-do?category=community"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Navigation */}
      <div className="relative">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src="https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/home/farmBG.webp"
            alt="Erin countryside"
            className="w-full h-[400px] md:h-711 object-cover object-top"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Header Content */}
        <div className="relative">
          <Navigation />
          
          {/* Hero Content */}
          <div className="h-[400px] md:h-711 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight">
                Welcome to Erin
              </h1>
              <p className="text-lg md:text-2xl text-white font-light max-w-2xl mx-auto leading-relaxed">
                A vibrant, friendly rural town in Ontario with charming warmth, agri-tourism adventures, an active equestrian community, and enriching experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            Upcoming Events
          </h2>
          <div className="px-2 md:px-4">
            <EventCarousel />
          </div>
        </div>
      </section>

      {/* Browse Things to Do Section - 2x2 grid on mobile */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            Browse Things to Do
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-lg aspect-[4/3]"
              >
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                  <Link 
                    to={category.link}
                    className="text-base md:text-xl font-bold text-white hover:text-gray-200 transition-colors hover:underline"
                  >
                    {category.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
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
