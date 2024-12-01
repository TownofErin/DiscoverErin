import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ date, month, title, subtitle, image }) => (
  <div className="relative rounded-lg overflow-hidden w-[180px] md:w-234 h-[240px] md:h-300 flex-shrink-0 event-card">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img 
        src={image} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Black gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[70px] bg-gradient-to-t from-black to-transparent"></div>
    </div>

    {/* Content Layer */}
    <div className="relative h-full">
      {/* Date Circle */}
      <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white rounded-full w-16 md:w-20 h-16 md:h-20 flex flex-col items-center justify-center z-10">
        <span className="text-2xl md:text-3xl font-bold leading-none">{date}</span>
        <span className="text-gray-500 uppercase tracking-wider text-[10px] md:text-xs mt-0.5">{month}</span>
      </div>

      {/* Subtitle */}
      <div className="absolute top-4 md:top-6 left-3 md:left-4 right-20 md:right-28 text-white text-sm md:text-lg font-light leading-snug">
        {subtitle}
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <Link 
          to={`/events/${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-base md:text-xl font-bold text-white hover:text-gray-200 transition-colors hover:underline"
        >
          {title}
        </Link>
      </div>
    </div>
  </div>
);

const EventCarousel = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = window.innerWidth < 768 ? 180 : 234;
      const gap = window.innerWidth < 768 ? 12 : 16;
      const scrollAmount = cardWidth + gap;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const events = [
    {
      date: '29',
      month: 'Sept',
      title: 'Barn Dance at Bela Farm',
      subtitle: 'Celebrate and protect the Green Belt',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/66e2effb0aed755b12105eb0_image008-p-500.jpg'
    },
    {
      date: '28',
      month: 'Sept',
      title: 'Fall Rural Romp',
      subtitle: 'Experience local farms and fresh produce',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0b66e05eec5b7ef7eb9_farm-romp.webp'
    },
    {
      date: '11',
      month: 'Oct',
      title: 'Erin Fall Fair',
      subtitle: 'Country routes and rubber boots',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/66e2f040d61f609acca73bb9_image003-p-500.jpg'
    },
    {
      date: '15',
      month: 'Oct',
      title: 'Harvest Festival',
      subtitle: 'Celebrate the autumn harvest',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/66e2f2f8529e6630b1556fc6_image005.png'
    },
    {
      date: '05',
      month: 'Nov',
      title: 'Barn Dance at Bela Farm',
      subtitle: 'Celebrate and protect the Green Belt',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/66e2effb0aed755b12105eb0_image008-p-500.jpg'
    },
    {
      date: '12',
      month: 'Nov',
      title: 'Fall Rural Romp',
      subtitle: 'Experience local farms and fresh produce',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/6667a0b66e05eec5b7ef7eb9_farm-romp.webp'
    },
    {
      date: '19',
      month: 'Nov',
      title: 'Erin Fall Fair',
      subtitle: 'Country routes and rubber boots',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/66e2f040d61f609acca73bb9_image003-p-500.jpg'
    },
    {
      date: '26',
      month: 'Nov',
      title: 'Harvest Festival',
      subtitle: 'Celebrate the autumn harvest',
      image: 'https://cdn.prod.website-files.com/648fa3e80460401ca2b9f257/66e2f2f8529e6630b1556fc6_image005.png'
    }
  ];

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Event Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-3 md:gap-4 pb-4 md:pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        onScroll={checkScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        {events.map((event, index) => (
          <div key={index} className="snap-start">
            <EventCard {...event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
