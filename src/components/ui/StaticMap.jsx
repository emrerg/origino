import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Initialize the map when the component mounts
  useEffect(() => {
    if (map.current) return;

    // Create the map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [29.0587, 40.1885],
      zoom: 12,
    });

    // Wait for the map to load before adding the marker and path
    map.current.on('load', () => {
      // Add a marker
      const marker = new mapboxgl.Marker({
        color: '#FF0000',
        scale: 0.8,
      })
        .setLngLat([29.0587, 40.1885])
        .addTo(map.current);

      // Create a popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>Miras Olive Oil Mill</h3>
         <p>Bursa, Türkiye</p>
         <p>Pressed</p>`
      );

      // Bind the popup to the marker
      marker.setPopup(popup);

      // Add a path (line) to the map
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [29.0587, 40.1885],
                [29.0687, 40.1985],
              ],
            },
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
        },
      });
    });

    // Cleanup on unmount
    return () => map.current.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100vh', position: 'absolute' }}
    />
  );
}