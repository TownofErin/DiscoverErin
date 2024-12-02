import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = forwardRef(({ businesses = [] }, ref) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef(new Map()); // Using Map to store markers with business IDs
  const popup = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create popup content
  const createPopupContent = (business) => `
    <div class="w-[280px] bg-white shadow-lg">
      ${business.picture ? `
        <div class="w-full h-[180px] overflow-hidden">
          <img 
            src="${business.picture}" 
            alt="${business.name}"
            class="w-full h-full object-cover"
          />
        </div>
      ` : ''}
      <div class="p-4">
        <h3 class="text-xl font-bold text-gray-900 mb-2">${business.name}</h3>
        <p class="text-gray-600 mb-3">${business.address1}${business.address2 ? `, ${business.address2}` : ''}</p>
        ${business.google_maps ? `
          <a 
            href="${business.google_maps}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center text-green-600 hover:text-green-700 font-medium focus:outline-none"
          >
            Directions
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        ` : ''}
      </div>
    </div>
  `;

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    showPopup: (businessId) => {
      const marker = markers.current.get(businessId);
      const business = businesses.find(b => b.id === businessId);
      if (marker && business && map.current && popup.current) {
        // Close any existing popup
        popup.current.remove();

        // First fly to the marker
        map.current.flyTo({
          center: marker.getLngLat(),
          zoom: 15,
          duration: 1000
        });

        // After the movement ends, show the popup
        const onMoveEnd = () => {
          map.current.off('moveend', onMoveEnd);
          popup.current
            .setLngLat(marker.getLngLat())
            .setHTML(createPopupContent(business))
            .addTo(map.current);
        };
        map.current.on('moveend', onMoveEnd);
      }
    }
  }));

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

  // Update markers when businesses change
  useEffect(() => {
    if (map.current && !loading) {
      // Remove existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current.clear();

      // Add new markers
      businesses.forEach(business => {
        if (business.lat && business.lon) {
          // Create marker element
          const el = document.createElement('div');
          el.className = 'bg-green-600 ring-2 ring-white rounded-full cursor-pointer shadow-md transform hover:scale-110 transition-transform';
          el.style.width = '20px';
          el.style.height = '20px';

          // Create marker without default pin
          const marker = new maplibregl.Marker({
            element: el,
            anchor: 'center'
          })
            .setLngLat([business.lon, business.lat])
            .addTo(map.current);

          // Store marker with business ID
          markers.current.set(business.id, marker);

          // Add click handler to show popup
          marker.getElement().addEventListener('click', () => {
            if (popup.current) {
              popup.current
                .setLngLat(marker.getLngLat())
                .setHTML(createPopupContent(business))
                .addTo(map.current);
            }
          });
        }
      });

      // Fit map to markers if there are any
      if (markers.current.size > 0) {
        const bounds = new maplibregl.LngLatBounds();
        markers.current.forEach(marker => {
          bounds.extend(marker.getLngLat());
        });
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      }
    }
  }, [businesses, loading]);

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

        // Create single popup instance
        popup.current = new maplibregl.Popup({
          offset: 25,
          maxWidth: 'none',
          className: 'custom-popup',
          closeOnClick: false,
          anchor: 'bottom'
        });

        // Add custom popup styles
        const style = document.createElement('style');
        style.textContent = `
          .maplibregl-popup-content {
            padding: 0 !important;
            border-radius: 0.5rem !important;
            overflow: hidden;
            width: 280px !important;
          }
          .maplibregl-popup-close-button {
            padding: 0.5rem !important;
            color: white !important;
            font-size: 1.25rem !important;
            z-index: 1;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            right: 4px !important;
            top: 4px !important;
          }
          .maplibregl-popup-close-button:hover {
            background: none !important;
            color: #e5e5e5 !important;
          }
          .maplibregl-popup-tip {
            border-top-color: white !important;
          }
          /* Fix focus styles */
          *:focus {
            outline: none !important;
          }
          *:focus-visible {
            outline: none !important;
            box-shadow: none !important;
          }
          .focus\\:ring-1:focus {
            --tw-ring-offset-width: 1px !important;
            box-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;
          }
        `;
        document.head.appendChild(style);

        // Custom navigation controls
        const container = document.createElement('div');
        container.className = 'absolute right-2 top-2 flex flex-col gap-2';
        
        // Zoom in button
        const zoomInBtn = document.createElement('button');
        zoomInBtn.className = 'bg-white rounded-lg w-8 h-8 shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600 focus:ring-offset-1';
        zoomInBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>';
        zoomInBtn.onclick = () => map.current.zoomIn();
        
        // Zoom out button
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.className = 'bg-white rounded-lg w-8 h-8 shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600 focus:ring-offset-1';
        zoomOutBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>';
        zoomOutBtn.onclick = () => map.current.zoomOut();

        container.appendChild(zoomInBtn);
        container.appendChild(zoomOutBtn);

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
});

export default MapComponent;
