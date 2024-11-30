import React, { useEffect, useState } from 'react';
import CategoryPage from '../components/CategoryPage';
import { supabase } from '../lib/supabaseClient';

const EatAndDrink = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // Get places with category ID 19 (restaurants)
        const { data, error } = await supabase
          .from('places')
          .select(`
            *,
            categories:category (name),
            sub_categories:sub_category (name),
            communities:locations (name)
          `)
          .eq('category', 19);

        if (error) throw error;

        // Transform data to match our component's expected structure
        const transformedPlaces = data.map(place => ({
          ...place,
          categoryName: place.categories?.name,
          subCategoryName: place.sub_categories?.name,
          locations: place.communities?.name
        }));

        setPlaces(transformedPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CategoryPage
      title="Savor the flavors of Erin"
      description="Experience the diverse culinary delights that Erin has to offer. From cozy cafes and family restaurants to local breweries and specialty food shops, discover the unique tastes and warm hospitality that make our food scene special."
      places={places}
      headerImage={places[0]?.picture || 'https://via.placeholder.com/600x400'}
    />
  );
};

export default EatAndDrink;
