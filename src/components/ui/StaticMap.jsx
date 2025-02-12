import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL JS

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapComponent() {
  const mapContainer = useRef(null); // Ref for the map container
  const map = useRef(null); // Ref for the map instance

  // Initialize the map when the component mounts
  useEffect(() => {
    if (map.current) return; // Initialize the map only once

    // Create the map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [29.0587, 40.1885], // Center on Bursa, Türkiye
      zoom: 12, // Initial zoom level
    });

    // Wait for the map to load before adding the marker and path
    map.current.on('load', () => {
      // Add a marker
      const marker = new mapboxgl.Marker({
        color: '#FF0000', // Red marker
        scale: 0.8, // Adjust size
      })
        .setLngLat([29.0587, 40.1885]) // Marker position (Bursa, Türkiye)
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
                [29.0587, 40.1885], // Start point (Bursa, Türkiye)
                [29.0687, 40.1985], // End point (nearby location)
              ],
            },
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be', // Blue line
          'line-width': 5, // Line width
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