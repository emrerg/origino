'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  // Miras Olive Oil Mill coordinates
  const longitude = 29.0600;
  const latitude = 40.1828;

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9', // Satellite style for green appearance
      center: [longitude, latitude],
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on('load', () => {
      // Add custom marker
      const el = document.createElement('div');
      el.className = 'custom-marker';
      
      marker.current = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<div class="popup-content"><h3>Miras Olive Oil Mill</h3><p>Pressed</p></div>')
        )
        .addTo(map.current);

      // Add routes or additional layers if needed
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [29.0590, 40.1828],
              [29.0600, 40.1828],
              [29.0610, 40.1828]
            ]
          }
        }
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#00FF00',
          'line-width': 3
        }
      });
    });
  }, []);

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