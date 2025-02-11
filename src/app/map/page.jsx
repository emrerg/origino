'use client';

import StaticMap from '@/components/ui/StaticMap';

export default function MapPage() {
  const sampleMarkers = [
    {
      coordinates: [-74.5, 40],
      title: 'Sample Location',
      description: 'This is a sample marker location',
    },
    {
      coordinates: [-74.6, 40.1],
      title: 'Another Location',
      description: 'This is another sample marker',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Map</h1>
      <div className="rounded-lg shadow-lg">
        <StaticMap
          initialCoordinates={[-74.5, 40]}
          zoom={9}
          markers={sampleMarkers}
          height="600px"
        />
      </div>
    </div>
  );
}
