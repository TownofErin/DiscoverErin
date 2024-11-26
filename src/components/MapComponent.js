import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = ({ businesses = [] }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [-80.067, 43.783], // Erin, Ontario
        zoom: 13,
      });

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    }

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for businesses
    businesses.forEach(business => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<div>
          <h3 class="font-semibold">${business.name}</h3>
          <p class="text-sm text-gray-600">${business.description}</p>
          <p class="text-sm text-gray-500">${business.address}</p>
        </div>`
      );

      const marker = new maplibregl.Marker({
        color: '#3B82F6', // blue-500
      })
        .setLngLat(business.coordinates)
        .setPopup(popup)
        .addTo(map.current);

      markers.current.push(marker);
    });

    // Fit map to markers if there are any
    if (businesses.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      businesses.forEach(business => {
        bounds.extend(business.coordinates);
      });
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 1000
      });
    }

    return () => {
      if (map.current) {
        markers.current.forEach(marker => marker.remove());
        markers.current = [];
      }
    };
  }, [businesses]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '500px' }}
    />
  );
};

export default MapComponent;
