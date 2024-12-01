import React, { useEffect, useState } from 'react';
import CategoryPage from '../components/CategoryPage';
import { supabase } from '../lib/supabaseClient';

const ThingsToDo = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // Get places with category IDs 23 (tourism) and 2 (agri-tourism)
        const { data, error } = await supabase
          .from('places')
          .select(`
            *,
            categories:category (name, symbol),
            sub_categories:sub_category (name),
            communities:locations (name)
          `)
          .in('category', [23, 2]); // Tourism and Agri-tourism categories

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
      title="Discover exciting activities and attractions"
      description="From scenic trails and outdoor adventures to unique local attractions, Erin offers a diverse range of activities for visitors of all ages. Explore our natural beauty, engage with local culture, and create unforgettable memories in our vibrant community."
      places={places}
      headerImage="https://vtzfrysrrermupdjfsnh.supabase.co/storage/v1/object/public/img/headers/things-to-do.webp"
    />
  );
};

export default ThingsToDo;
