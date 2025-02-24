'use client';

import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Stories', href: '/stories' },
  { name: 'Map', href: '/map' },
  { name: 'Report', href: '/report' },
  { name: 'Storage', href: '/storage' },
];

export default function MainLayout({ children }) {
  return (
    <div>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
         
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
