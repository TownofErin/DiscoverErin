import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = ({ businesses = [] }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
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
          style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`,
          center: [-80.067, 43.783], // Erin, Ontario
          zoom: 10,
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

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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
