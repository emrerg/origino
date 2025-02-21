'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { journeyStops } from './journeyStops';

// Initialize Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function MapContent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchParams = useSearchParams();
  const locationText = searchParams.get('location');
  const router = useRouter();

  useEffect(() => {
    if (map.current) return;

    // Find the coordinates for the selected section
    const stop = journeyStops.features.find(
      feature => feature.properties.stop === locationText
    );

    let coordinates;
    if (stop) {
      coordinates = stop.geometry.type === 'Point' 
        ? stop.geometry.coordinates
        : stop.geometry.coordinates[0][0]; // For polygon, take first point
    } else {
      // Default coordinates if section not found
      coordinates = [29.0600, 40.1828];
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on('load', () => {
      // Add marker for point locations
      if (stop && stop.geometry.type === 'Point') {
        const el = document.createElement('div');
        el.className = 'custom-marker';
        
        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="popup-content">
                  <h3>${stop.properties.title}</h3>
                  <p>${stop.properties.description}</p>
                </div>
              `)
          )
          .addTo(map.current);
      }

      // Add polygon for grove area
      if (stop && stop.geometry.type === 'Polygon') {
        map.current.addSource('grove', {
          type: 'geojson',
          data: stop
        });

        map.current.addLayer({
          id: 'grove-fill',
          type: 'fill',
          source: 'grove',
          paint: {
            'fill-color': '#00FF00',
            'fill-opacity': 0.3
          }
        });

        map.current.addLayer({
          id: 'grove-outline',
          type: 'line',
          source: 'grove',
          paint: {
            'line-color': '#00FF00',
            'line-width': 2
          }
        });

        // Add popup for polygon
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        })
          .setHTML(`
            <div class="popup-content">
              <h3>${stop.properties.title}</h3>
              <p>${stop.properties.description}</p>
            </div>
          `);

        // Show popup on polygon hover
        map.current.on('mouseenter', 'grove-fill', (e) => {
          map.current.getCanvas().style.cursor = 'pointer';
          
          // Get the center of the polygon for popup placement
          const bounds = new mapboxgl.LngLatBounds();
          stop.geometry.coordinates[0].forEach(coord => {
            bounds.extend(coord);
          });
          
          popup.setLngLat(bounds.getCenter())
            .addTo(map.current);
        });

        // Remove popup on mouse leave
        map.current.on('mouseleave', 'grove-fill', () => {
          map.current.getCanvas().style.cursor = '';
          popup.remove();
        });

        // Add click handler for polygon
        map.current.on('click', 'grove-fill', () => {
          const bounds = new mapboxgl.LngLatBounds();
          stop.geometry.coordinates[0].forEach(coord => {
            bounds.extend(coord);
          });
          
          map.current.fitBounds(bounds, {
            padding: 50,
            duration: 1000
          });
        });
      }
    });
  }, [locationText]);

  const handleClose = () => {
    router.back(); // This will navigate to the previous page
  };

  return (
    <div className="page-container">
      <div className="close-button-container">
        <button onClick={handleClose} className="close-button">×</button>
      </div>
      <div className="header">
        <h1>{locationText || 'Location Map'}</h1>
      </div>
      <div className="map-container">
        <div ref={mapContainer} className="map" />
      </div>
      <style jsx>{`
        .page-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .close-button-container {
          padding: 10px;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0;
          margin-top: 10px;
        }
        .close-button {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          padding: 0;
          color: #666;
          transition: color 0.2s ease;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-button:hover {
          color: #00000;
        }
        .header {
          padding: 0px 20px 20px 30px;
          background-color: white;
          margin-top: 0;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          text-align: left;
          font-weight: 700;
        }
        .map-container {
          flex: 1;
          width: calc(100% - 20px);
          height: calc(80vh - 20px);
          padding: 0 10px 30px 30px;
          marginBottom: 50px
        }
        .map {
          width: 100%;
          height: 100%;
        }
        :global(.custom-marker) {
          background-image: url('/marker-icon.png');
          background-size: cover;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          background-color: #ffffff;
          border: 2px solid #00FF00;
        }
        :global(.popup-content) {
          padding: 10px;
          text-align: center;
        }
        :global(.popup-content h3) {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
        }
        :global(.popup-content p) {
          margin: 5px 0 0;
          font-size: 14px;
        }
        :global(.mapboxgl-popup-content) {
          padding: 15px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapContent />
    </Suspense>
  );
}
