import React from 'react';
import CategoryPage from '../components/CategoryPage';

const placesToStayData = {
  title: "Experience the warmth of Erin hospitality",
  description: "Nestled in the picturesque landscapes of Erin and Hillsburgh, our cozy retreats offer a tranquil escape from the hustle and bustle of city life. Let our friendly hosts welcome you with open arms as you immerse yourself in the beauty of our surroundings. Begin planning your dream getaway today and discover the true meaning of relaxation and comfort.",
  subCategories: [
    { id: 'bed-and-breakfast', name: 'Bed & Breakfast' },
    { id: 'hotel', name: 'Hotels & Motels' },
    { id: 'cottage', name: 'Cottages & Rentals' }
  ],
  businesses: [
    {
      id: 1,
      name: "Devonshire Guest House",
      description: "Charming B&B in historic Erin Village offering comfortable rooms and homemade breakfast.",
      address: "123 Main Street, Erin, ON",
      category: "places-to-stay",
      subCategory: "bed-and-breakfast",
      community: "erin",
      coordinates: [-80.067, 43.783],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      socials: {
        website: "https://example.com",
        phone: "519-123-4567",
        email: "info@devonshirehouse.com"
      }
    },
    {
      id: 2,
      name: "Hillsburgh Haven",
      description: "Modern cottage rental with scenic views of the countryside. Perfect for weekend getaways.",
      address: "456 Rural Road, Hillsburgh, ON",
      category: "places-to-stay",
      subCategory: "cottage",
      community: "hillsburgh",
      coordinates: [-80.135, 43.787],
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      socials: {
        website: "https://example.com",
        instagram: "https://instagram.com",
        phone: "519-987-6543",
        email: "stay@hillsburghhaven.com"
      }
    }
  ]
};

const PlacesToStay = () => {
  return (
    <CategoryPage
      title={placesToStayData.title}
      description={placesToStayData.description}
      category="places-to-stay"
      businesses={placesToStayData.businesses}
      subCategories={placesToStayData.subCategories}
    />
  );
};

export default PlacesToStay;
