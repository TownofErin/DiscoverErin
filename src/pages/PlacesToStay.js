import React, { useEffect, useState } from 'react';
import CategoryPage from '../components/CategoryPage';
import { supabase } from '../lib/supabaseClient';

const PlacesToStay = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // Get places with category ID 1 (accommodations)
        const { data, error } = await supabase
          .from('places')
          .select(`
            *,
            categories:category (name, symbol),
            sub_categories:sub_category (name),
            communities:locations (name)
          `)
          .eq('category', 1);

        if (error) throw error;

        // Transform data to match our component's expected structure
        const transformedPlaces = data.map(place => ({
          ...place,
          categoryName: place.categories?.name,
          categorySymbol: place.categories?.symbol,
          subCategoryName: place.sub_categories?.name,
          locations: place.communities?.name
        }));

        setPlaces(transformedPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError(error.message);
      }
    };

    fetchPlaces();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <CategoryPage
      title="Experience the warmth of Erin hospitality"
      description="Nestled in the picturesque landscapes of Erin and Hillsburgh, our cozy retreats offer a tranquil escape from the hustle and bustle of city life. Let our friendly hosts welcome you with open arms as you immerse yourself in the beauty of our surroundings. Begin planning your dream getaway today and discover the true meaning of relaxation and comfort."
      places={places}
      headerImage="https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/headers/places-stay.jpg"
    />
  );
};

export default PlacesToStay;
