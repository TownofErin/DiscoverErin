import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = ({ businesses = [] }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle map resize on container size changes
  useEffect(() => {
    const currentContainer = mapContainer.current;
    const resizeObserver = new ResizeObserver(() => {
      if (map.current) {
        map.current.resize();
      }
    });

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) {
      try {
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
          center: [-80.067, 43.783], // Erin, Ontario
          zoom: 13,
          dragRotate: false, // Disable rotation for better mobile UX
          touchZoomRotate: true, // Enable touch zoom
          maxZoom: 18,
          minZoom: 8,
        });

        // Custom navigation controls
        const container = document.createElement('div');
        container.className = 'absolute right-2 top-2 flex flex-col gap-2';
        
        // Zoom in button
        const zoomInBtn = document.createElement('button');
        zoomInBtn.className = 'bg-white rounded-lg w-8 h-8 shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none';
        zoomInBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>';
        zoomInBtn.onclick = () => map.current.zoomIn();
        
        // Zoom out button
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.className = 'bg-white rounded-lg w-8 h-8 shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none';
        zoomOutBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>';
        zoomOutBtn.onclick = () => map.current.zoomOut();
        
        // Reset north button
        const resetNorthBtn = document.createElement('button');
        resetNorthBtn.className = 'bg-white rounded-lg w-8 h-8 shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none';
        resetNorthBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5M5 12l7-7 7 7"></path></svg>';
        resetNorthBtn.onclick = () => {
          map.current.easeTo({
            bearing: 0,
            pitch: 0
          });
        };

        container.appendChild(zoomInBtn);
        container.appendChild(zoomOutBtn);
        container.appendChild(resetNorthBtn);

        map.current.getContainer().appendChild(container);

        map.current.on('load', () => {
          setLoading(false);
        });

        map.current.on('error', (e) => {
          setError(e.error.message);
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for businesses with larger touch targets
    businesses.forEach(business => {
      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: true,
        maxWidth: '300px',
        className: 'rounded-lg shadow-lg'
      }).setHTML(
        `<div class="p-4">
          <h3 class="font-semibold text-lg mb-2">${business.name}</h3>
          <p class="text-gray-600 mb-2">${business.description}</p>
          <p class="text-gray-500 text-sm">${business.address}</p>
          ${business.category ? `<span class="inline-block px-3 py-1 mt-2 text-sm text-green-600 bg-green-50 rounded-full">${business.category}</span>` : ''}
        </div>`
      );

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM4LjEzIDIgNSA1LjEzIDUgOWMwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03eiIgZmlsbD0iIzIyQzU1RSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iOSIgcj0iMi41IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==)';
      el.style.backgroundSize = '100%';

      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'bottom'
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
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
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
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="text-gray-600">Loading map...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-75 z-10">
          <div className="text-red-600">Error loading map: {error}</div>
        </div>
      )}
      <div
        ref={mapContainer}
        className="w-full h-full rounded-lg"
        style={{ minHeight: '300px', height: '100%' }}
      />
    </div>
  );
};

export default MapComponent;
