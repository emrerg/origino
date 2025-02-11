'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize the mapboxgl access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const StaticMap = ({
  initialCoordinates = [-74.5, 40],
  zoom = 9,
  markers = [],
  style = 'mapbox://styles/mapbox/light-v11',
  height = '400px',
  width = '100%',
  interactive = true,
  showControls = true,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(initialCoordinates[0]);
  const [lat, setLat] = useState(initialCoordinates[1]);
  const [mapZoom, setZoom] = useState(zoom);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [lng, lat],
      zoom: mapZoom,
      interactive: interactive,
    });

    // Add navigation controls if enabled
    if (showControls) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }), 'top-right');
    }

    // Add markers
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = marker.color || '#FF0000';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${marker.title}</h3><p>${marker.description}</p>`);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

    // Cleanup function
    return () => map.current?.remove();
  }, []); // Empty dependency array ensures this runs once on mount

  // Update map when center coordinates change
  useEffect(() => {
    if (!map.current) return;
    map.current.setCenter([lng, lat]);
  }, [lng, lat]);

  // Update map when zoom changes
  useEffect(() => {
    if (!map.current) return;
    map.current.setZoom(mapZoom);
  }, [mapZoom]);

  return (
    <div className="map-wrapper relative rounded-lg overflow-hidden shadow-lg">
      <div
        ref={mapContainer}
        style={{
          height,
          width,
        }}
        className="map-container"
      />
      <style jsx>{`
        .marker {
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .mapboxgl-popup-content {
          padding: 15px;
          border-radius: 8px;
        }
        .mapboxgl-popup-content h3 {
          margin: 0 0 10px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default StaticMap;
