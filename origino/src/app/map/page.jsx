'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { journeyStops } from './journeyStops';
import Cross from "@/components/Images/cross.svg";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function MapContent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchParams = useSearchParams();
  const locationText = searchParams.get('location');
  const router = useRouter();

  useEffect(() => {
    if (map.current) return;

    const stop = journeyStops.features.find(
      feature => feature.properties.stop === locationText
    );

    let coordinates;
    if (stop) {
      coordinates = stop.geometry.type === 'Point' 
        ? stop.geometry.coordinates
        : stop.geometry.coordinates[0][0];
    } else {
      coordinates = [29.0600, 40.1828];
    }

    // Initialize map with custom style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 15
    });

    map.current.on('load', () => {
      // Adjust night vision effect for darker green
      map.current.setPaintProperty('satellite', 'raster-saturation', 2);
      map.current.setPaintProperty('satellite', 'raster-contrast', 0.5);
      map.current.setPaintProperty('satellite', 'raster-brightness-max', 0.5);
      map.current.setPaintProperty('satellite', 'raster-brightness-min', 0.2);
      
      // Intensify green tint
      map.current.setPaintProperty('satellite', 'raster-hue-rotate', 140);
      map.current.setPaintProperty('satellite', 'raster-color-mix', [
        'interpolate',
        ['linear'],
        ['zoom'],
        0,
        ['rgba', 0, 255, 0, 1],
        22,
        ['rgba', 0, 255, 0, 1]
      ]);

      // Change overlay to dark green instead of black
      map.current.addLayer({
        'id': 'night-overlay',
        'type': 'background',
        'paint': {
          'background-color': '#003300',
          'background-opacity': 0.3
        }
      });

      // Add marker for point locations
      if (stop && stop.geometry.type === 'Point') {
        console.log('Creating marker at coordinates:', coordinates);
        
        const el = document.createElement('div');
        el.className = 'marker';
        
        // Make marker more visible for debugging
        new mapboxgl.Marker({
          color: '#FF0000', // Bright red for testing
          scale: 2 // Larger size for visibility
        })
        .setLngLat(coordinates)
        .addTo(map.current);
      

        // Draw a line from the marker to the label
        const line = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [coordinates[0], coordinates[1]], // Marker position
              [coordinates[0], coordinates[1] + 0.01] // Slightly above for label
            ]
          }
        };

        map.current.addSource('line', {
          type: 'geojson',
          data: line
        });

        map.current.addLayer({
          id: 'line',
          type: 'line',
          source: 'line',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-color': '#00FF00',
            'line-width': 4
          }
        });
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
            'fill-opacity': 0.5
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
          
          const bounds = new mapboxgl.LngLatBounds();
          stop.geometry.coordinates[0].forEach(coord => {
            bounds.extend(coord);
          });
          
          popup.setLngLat(bounds.getCenter())
            .addTo(map.current);
        });

        map.current.on('mouseleave', 'grove-fill', () => {
          map.current.getCanvas().style.cursor = '';
          popup.remove();
        });

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

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());
  }, [locationText]);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="page-container">
      <div className="close-button-container">
        <button onClick={handleClose} className="close-button mt-4">
          <Cross width={24} height={24} />
        </button>
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
          cursor: pointer;
          padding-right: 15px;
          color: #666;
          transition: color 0.2s ease;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-button:hover {
          color: #000000;
        }
        .header {
          padding: 0px 20px 20px 30px;
          background-color: white;
          margin-top: 0;
          width: 80%
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          text-align: left;
          font-weight: 600;
          font-family: var(--font-neue-haas);
        }
        .map-container {
          flex: 1;
          width: calc(100% - 20px);
          height: calc(80vh - 20px);
          padding: 0 10px 30px 30px;
          border-radius: 0 0 8px 8px;
          overflow: hidden;
        }
        .map {
          width: 100%;
          height: 100%;
          border-radius: 0 0 8px 8px;
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
        :global(.mapboxgl-canvas-container) {
          border-radius: 0 0 8px 8px;
        }
          :global(.marker) {
  background-color: #00FF00;
  background-size: cover;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #00FF00;
  box-shadow: 0 0 10px #00FF00;
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