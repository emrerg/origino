"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Cross from "@/components/Images/cross.svg";
import Packed1 from "@/components/Images/packed1.png";
import Packed2 from "@/components/Images/packed2.png";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Updated journeyStops with the correct coordinates
const journeyStops = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "Miras Olive Mill",
        "description": "Family-run, small scale mill in the outskirts of Orhangazi",
        "stop": "pressed"
      },
      "geometry": {
        "coordinates": [
          29.324942,
          40.49092
        ],
        "type": "Point"
      },
      "id": "402a2a7dece35b5d59726dfc5d39b19f"
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Biziz Foods",
        "description": "Fully established olive oil facility, with capability to filter & pack various sizes",
        "stop": "packed"
      },
      "geometry": {
        "coordinates": [
          28.866167,
          40.333245
        ],
        "type": "Point"
      },
      "id": "4c208dedd4370aa814e7c15f7b26af67"
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Masatlik Grove",
        "description": "A 2.3 acre olive grove, at about ~600m altitude, facing the Samanli mountain range",
        "stop": "picked"
      },
      "geometry": {
        "coordinates": [
          [
            [
              29.352229,
              40.538776
            ],
            [
              29.352471,
              40.538798
            ],
            [
              29.352641,
              40.53889
            ],
            [
              29.352824,
              40.539059
            ],
            [
              29.352636,
              40.539184
            ],
            [
              29.352423,
              40.53932
            ],
            [
              29.352244,
              40.539493
            ],
            [
              29.352075,
              40.539658
            ],
            [
              29.351954,
              40.539757
            ],
            [
              29.351824,
              40.539885
            ],
            [
              29.351591,
              40.539804
            ],
            [
              29.351408,
              40.539688
            ],
            [
              29.351346,
              40.539586
            ],
            [
              29.351538,
              40.539522
            ],
            [
              29.351734,
              40.539389
            ],
            [
              29.351891,
              40.539271
            ],
            [
              29.352011,
              40.539098
            ],
            [
              29.352136,
              40.538914
            ],
            [
              29.352229,
              40.538776
            ]
          ]
        ],
        "type": "Polygon"
      },
      "id": "ed1c893e3e2896ea7752f3463298ea4d"
    }
  ]
};

function MapContent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const searchParams = useSearchParams();
  const locationText = searchParams.get("location");
  const section = searchParams.get("section");
  const router = useRouter();

  useEffect(() => {
    if (map.current) return;

    // Find the appropriate stop based on section or locationText
    const currentSection = section || locationText;
    const stop = journeyStops.features.find(
      (feature) => feature.properties.stop === currentSection
    );

    let coordinates;
    if (stop) {
      // Use the correct coordinates based on the geometry type
      if (stop.geometry.type === "Point") {
        coordinates = stop.geometry.coordinates;
      } else if (stop.geometry.type === "Polygon") {
        // Use the first coordinate of the polygon as a center point for initial view
        coordinates = stop.geometry.coordinates[0][0];
      }
    } else {
      // Default coordinates if no stop is found - use Biziz Foods as default
      coordinates = [28.866167, 40.333245];
    }

    // Initialize map with custom style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: coordinates,
      zoom: 15,
    });

    map.current.on("load", () => {
      // Adjust night vision effect for darker green
      map.current.setPaintProperty("satellite", "raster-saturation", 2);
      map.current.setPaintProperty("satellite", "raster-contrast", 0.5);
      map.current.setPaintProperty("satellite", "raster-brightness-max", 0.5);
      map.current.setPaintProperty("satellite", "raster-brightness-min", 0.2);

      // Intensify green tint
      map.current.setPaintProperty("satellite", "raster-hue-rotate", 140);
      map.current.setPaintProperty("satellite", "raster-color-mix", [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        ["rgba", 0, 255, 0, 1],
        22,
        ["rgba", 0, 255, 0, 1],
      ]);

      // Change overlay to dark green instead of black
      map.current.addLayer({
        id: "night-overlay",
        type: "background",
        paint: {
          "background-color": "#003300",
          "background-opacity": 0.3,
        },
      });

      // Always create a marker for the current section/location
      if (currentSection && stop) {
        let markerCoordinates;
        
        // Determine coordinates based on geometry type
        if (stop.geometry.type === "Point") {
          markerCoordinates = stop.geometry.coordinates;
        } else if (stop.geometry.type === "Polygon") {
          // Calculate centroid for polygon
          const bounds = new mapboxgl.LngLatBounds();
          stop.geometry.coordinates[0].forEach((coord) => {
            bounds.extend(coord);
          });
          const center = bounds.getCenter();
          markerCoordinates = [center.lng, center.lat];
        }
        
        // Create marker element
        const el = document.createElement("div");
        el.className = "custom-marker";

        // Create container
        const markerContent = document.createElement("div");
        markerContent.className = "marker-content";

        // Add text based on section
        const markerText = document.createElement("div");
        markerText.className = "marker-text";
        markerText.innerText = currentSection.charAt(0).toUpperCase() + currentSection.slice(1); // Capitalize first letter
        markerContent.appendChild(markerText);

        // Create icon container
        const iconContainer = document.createElement("div");
        iconContainer.className = "icon-container";

        // Create first image element
        const img1 = document.createElement("img");
        img1.src = Packed1.src;
        img1.className = "marker-icon square-border";
        iconContainer.appendChild(img1);

        // Create second image element
        const img2 = document.createElement("img");
        img2.src = Packed2.src;
        img2.className = "marker-icon square-border";
        iconContainer.appendChild(img2);

        markerContent.appendChild(iconContainer);
        el.appendChild(markerContent);

        // Create popup with stop information
        const popupHTML = `
          <div class="popup-content">
            <h3>${stop.properties.title}</h3>
            <p>${stop.properties.description}</p>
          </div>
        `;

        // Add marker to map at the calculated coordinates
        let markerLngLat;
        if (currentSection === "picked") {
          // Use the first coordinate of the polygon for the line
          markerLngLat = [markerCoordinates[0], markerCoordinates[1] - 0.0005]; // Adjusted to place marker below the line
        } else {
          markerLngLat = [markerCoordinates[0], markerCoordinates[1]];
        }

        new mapboxgl.Marker(el)
          .setLngLat(markerLngLat) // Use adjusted coordinates
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
          .addTo(map.current);

        // Add line from marker (if desired)
        const targetLngLat = currentSection === "picked" 
          ? [markerCoordinates[0], markerCoordinates[1]] // Pointing at the coordinate
          : [markerCoordinates[0], markerCoordinates[1] + 0.0005]; // Default behavior

        const lineCoordinates = [markerCoordinates, targetLngLat];

        map.current.addSource("route-line", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: lineCoordinates,
            },
          },
        });

        map.current.addLayer({
          id: "route-line-layer",
          type: "line",
          source: "route-line",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#00FF00", // Green color
            "line-width": 2,
            "line-offset": 0,
          },
        });
      }

      // Add polygon for grove area (if applicable)
      if (stop && stop.geometry.type === "Polygon") {
        map.current.addSource("grove", {
          type: "geojson",
          data: stop,
        });

        map.current.addLayer({
          id: "grove-fill",
          type: "fill",
          source: "grove",
          paint: {
            "fill-color": "#00FF00",
            "fill-opacity": 0.5,
          },
        });

        map.current.addLayer({
          id: "grove-outline",
          type: "line",
          source: "grove",
          paint: {
            "line-color": "#00FF00",
            "line-width": 2,
          },
        });

        // Add popup for polygon
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        }).setHTML(`
          <div class="popup-content">
            <h3>${stop.properties.title}</h3>
            <p>${stop.properties.description}</p>
          </div>
        `);

        // Show popup on polygon hover
        map.current.on("mouseenter", "grove-fill", (e) => {
          map.current.getCanvas().style.cursor = "pointer";

          const bounds = new mapboxgl.LngLatBounds();
          stop.geometry.coordinates[0].forEach((coord) => {
            bounds.extend(coord);
          });

          popup.setLngLat(bounds.getCenter()).addTo(map.current);
        });

        map.current.on("mouseleave", "grove-fill", () => {
          map.current.getCanvas().style.cursor = "";
          popup.remove();
        });

        map.current.on("click", "grove-fill", () => {
          const bounds = new mapboxgl.LngLatBounds();
          stop.geometry.coordinates[0].forEach((coord) => {
            bounds.extend(coord);
          });

          map.current.fitBounds(bounds, {
            padding: 50,
            duration: 1000,
          });
        });
        
        // Fit map to polygon bounds
        const bounds = new mapboxgl.LngLatBounds();
        stop.geometry.coordinates[0].forEach((coord) => {
          bounds.extend(coord);
        });
        
        map.current.fitBounds(bounds, {
          padding: 50,
          duration: 1000,
        });
      }
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());
  }, [locationText, section]);

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
        <h1>{locationText || section || "Location Map"}</h1>
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
          width: 80%;
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
          background-color: rgba(0, 50, 0, 0.9);
          padding: 12px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
          z-index: 1;
        }

        :global(.marker-content) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        :global(.marker-text) {
          font-size: 18px;
          font-weight: bold;
          color: #00ff00;
          margin-bottom: 5px;
        }

        :global(.icon-container) {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.marker-icon) {
          width: 24px;
          height: 24px;
          margin: 0 5px;
          color: "#59E631";
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