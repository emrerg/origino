'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import Pressed1 from "@components/icons/pressed1.svg"

// Initialize Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const locations = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Miras Olive Mill",
        "description": "",
        "stop": "pressed"
      },
      "geometry": {
        "coordinates": [29.324942, 40.49092],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Biziz Foods",
        "description": "",
        "stop": "packed"
      },
      "geometry": {
        "coordinates": [28.866167, 40.333245],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Masatlik Grove",
        "description": "",
        "stop": "picked"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [29.352229, 40.538776],
          [29.352471, 40.538798],
          // ... rest of the polygon coordinates
          [29.352229, 40.538776]
        ]]
      }
    }
  ]
};

// Add SVG imports
const locationIcons = {
  pressed: {
    icon1: '/icons/pressed1.svg',
    icon2: '/icons/pressed2.svg'
  },
  packed: {
    icon1: '/icons/packed1.svg',
    icon2: '/icons/packed2.svg'
  }
};

export default function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [29.324942, 40.49092], // Center on Miras Olive Mill
      zoom: 10,
      pitch: 0,
      bearing: 0
    });

    map.current.on('load', () => {
      // Add green overlay
      map.current.addLayer({
        id: 'theme-overlay',
        type: 'background',
        paint: {
          'background-color': '#006837',
          'background-opacity': 0.3
        }
      });

      // Add polygon for olive grove
      map.current.addSource('grove', {
        type: 'geojson',
        data: locations.features.find(f => f.properties.stop === 'picked')
      });

      map.current.addLayer({
        id: 'grove-fill',
        type: 'fill',
        source: 'grove',
        paint: {
          'fill-color': '#006837',
          'fill-opacity': 0.4
        }
      });

      map.current.addLayer({
        id: 'grove-outline',
        type: 'line',
        source: 'grove',
        paint: {
          'line-color': '#00FF00',
          'line-width': 0
        }
      });

      // Updated marker creation
      locations.features
        .filter(feature => feature.geometry.type === 'Point')
        .forEach(feature => {
          const el = document.createElement('div');
          el.className = `custom-marker ${feature.properties.stop}`;
          
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: 'custom-popup'
          })
            .setHTML(`
              <div class="popup-content">
                <p>${feature.properties.stop}</p>
                <div class="popup-icons">
                  <img 
                    src="${locationIcons[feature.properties.stop]?.icon1 || '/icons/location.svg'}" 
                    alt="${feature.properties.stop} icon 1" 
                    class="icon"
                  />
                  <img 
                    src="${locationIcons[feature.properties.stop]?.icon2 || '/icons/info.svg'}" 
                    alt="${feature.properties.stop} icon 2" 
                    class="icon"
                  />
                </div>
              </div>
            `);

          const marker = new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(popup)
            .addTo(map.current);

          markers.current.push(marker);
        });
    });
  }, []);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
      <style jsx global>{`
        .map-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }
        
        .map {
          width: 100%;
          height: 100%;
        }

        /* Updated popup styling */
        .mapboxgl-popup {
          filter: none;
        }

        .mapboxgl-popup-content {
          background: #s0000004D;
          padding: 0;
          border: none;
          box-shadow: none;
        }

        .popup-content {
          background: rgba(0, 0, 0, 0.85);
          border-radius: 2px;
          padding: 6px 10px;
          min-width: 100px;
          backdrop-filter: blur(4px);
        }

        .popup-content p {
          color: #00FF00;
          font-size: 12px;
          font-weight: 500;
          margin: 0 0 6px 0;
          text-transform: uppercase;
          text-align: left;
          letter-spacing: 0.5px;
        }

        .popup-icons {
          display: flex;
          gap: 4px;
          margin-top: 2px;
        }

        .icon {
          width: 16px;
          height: 16px;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 0, 0.1);
          border: 1px solid rgba(0, 255, 0, 0.3);
          border-radius: 2px;
          filter: brightness(1.2);
        }

        .icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Custom marker colors based on type */
        .custom-marker.pressed {
          background-color: rgba(89, 230, 49, 0.6);
          box-shadow: 0 0 10px rgba(89, 230, 49, 0.4);
        }

        .custom-marker.packed {
          background-color: rgba(89, 230, 49, 0.6);
          box-shadow: 0 0 10px rgba(89, 230, 49, 0.4);
        }

        /* Remove popup tip */
        .mapboxgl-popup-tip {
          display: none;
        }

        /* Custom marker styling */
        .custom-marker {
          width: 8px;
          height: 8px;
          border: 1px solid rgba(0, 255, 0, 0.8);
          border-radius: 50%;
          cursor: pointer;
          background-color: rgba(0, 255, 0, 0.4);
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
        }

        .custom-marker.pressed,
        .custom-marker.packed {
          background-color: rgba(0, 255, 0, 0.6);
        }

        /* Remove Mapbox controls and branding */
        .mapboxgl-ctrl-top-right,
        .mapboxgl-ctrl-bottom-left,
        .mapboxgl-ctrl-bottom-right {
          display: none !important;
        }

        /* Night vision scan effect */
        .map::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 255, 0, 0.02) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          animation: scan 10s linear infinite;
          opacity: 0.3;
        }

        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
}