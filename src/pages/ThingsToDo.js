import React from 'react';
import CategoryPage from '../components/CategoryPage';

const thingsToDoData = {
  title: "Discover exciting activities and attractions",
  description: "From scenic trails and outdoor adventures to unique local attractions, Erin offers a diverse range of activities for visitors of all ages. Explore our natural beauty, engage with local culture, and create unforgettable memories in our vibrant community.",
  subCategories: [
    { id: 'outdoor-recreation', name: 'Outdoor Recreation' },
    { id: 'arts-culture', name: 'Arts & Culture' },
    { id: 'attractions', name: 'Local Attractions' },
    { id: 'sports-fitness', name: 'Sports & Fitness' }
  ],
  businesses: [
    {
      id: 1,
      name: "Erin Trail Adventures",
      description: "Guided hiking tours and outdoor experiences in the beautiful Erin countryside.",
      address: "789 Nature Trail, Erin, ON",
      category: "things-to-do",
      subCategory: "outdoor-recreation",
      community: "erin",
      coordinates: [-80.059, 43.779],
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      socials: {
        website: "https://example.com",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        phone: "519-234-5678",
        email: "info@erintrails.com"
      }
    },
    {
      id: 2,
      name: "Hillsburgh Arts Centre",
      description: "Community arts center featuring local artists, workshops, and performances.",
      address: "321 Creative Lane, Hillsburgh, ON",
      category: "things-to-do",
      subCategory: "arts-culture",
      community: "hillsburgh",
      coordinates: [-80.132, 43.785],
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      socials: {
        website: "https://example.com",
        facebook: "https://facebook.com",
        phone: "519-876-5432",
        email: "arts@hillsburgh.com"
      }
    }
  ]
};

const ThingsToDo = () => {
  return (
    <CategoryPage
      title={thingsToDoData.title}
      description={thingsToDoData.description}
      category="things-to-do"
      businesses={thingsToDoData.businesses}
      subCategories={thingsToDoData.subCategories}
    />
  );
};

export default ThingsToDo;
