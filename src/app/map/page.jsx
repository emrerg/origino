'use client';

import { useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { journeyStops } from './journeyStops';

// Initialize Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapContent />
    </Suspense>
  );
}

function MapContent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  useEffect(() => {
    if (map.current) return;

    // Find the coordinates for the selected section
    const stop = journeyStops.features.find(
      feature => feature.properties.stop === section
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
  }, [section]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
      <style jsx>{`
        .map-container {
          width: 100%;
          height: 100vh;
          position: relative;
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