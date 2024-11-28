import React from 'react';
import CategoryPage from '../components/CategoryPage';

const eatAndDrinkData = {
  title: "Savor the flavors of Erin",
  description: "Experience the diverse culinary delights that Erin has to offer. From cozy cafes and family restaurants to local breweries and specialty food shops, discover the unique tastes and warm hospitality that make our food scene special.",
  subCategories: [
    { id: 'restaurants', name: 'Restaurants' },
    { id: 'cafes', name: 'Cafes & Bakeries' },
    { id: 'pubs', name: 'Pubs & Bars' },
    { id: 'specialty', name: 'Specialty Food & Drink' }
  ],
  businesses: [
    {
      id: 1,
      name: "The Busholme Inn",
      description: "Historic inn offering farm-to-table dining and craft beverages in a charming atmosphere.",
      address: "101 Main Street, Erin, ON",
      category: "food-drink",
      subCategory: "restaurants",
      community: "erin",
      coordinates: [-80.065, 43.781],
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      socials: {
        website: "https://example.com",
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        phone: "519-345-6789",
        email: "dine@busholmeinn.com"
      }
    },
    {
      id: 2,
      name: "Hillsburgh Coffee Co.",
      description: "Artisanal coffee roaster and cafe serving fresh pastries and light lunches.",
      address: "234 Mill Street, Hillsburgh, ON",
      category: "food-drink",
      subCategory: "cafes",
      community: "hillsburgh",
      coordinates: [-80.134, 43.786],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      socials: {
        website: "https://example.com",
        instagram: "https://instagram.com",
        phone: "519-765-4321",
        email: "hello@hillsburghcoffee.com"
      }
    }
  ]
};

const EatAndDrink = () => {
  return (
    <CategoryPage
      title={eatAndDrinkData.title}
      description={eatAndDrinkData.description}
      category="food-drink"
      businesses={eatAndDrinkData.businesses}
      subCategories={eatAndDrinkData.subCategories}
    />
  );
};

export default EatAndDrink;
