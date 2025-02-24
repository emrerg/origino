import { Inter } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
import './globals.css';
import './fonts.css';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';
import { A11yTester } from '@/components/A11yTester'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Origino',
  description: 'A modern landing page built with Next.js and Tailwind CSS',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/android-chrome-512x512.png'
      }
    ]
  },
  manifest: '/site.webmanifest'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/android-chrome-512x512.png" sizes="any" />
        <link
          rel="icon"
          href="/android-chrome-512x512.png"
          type="image/png"
          sizes="512x512"
        />
        <link
          rel="apple-touch-icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className="font-custom">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>
        {process.env.NODE_ENV === 'development' && <A11yTester />}
        <main id="main-content">
          <MainLayout>{children}</MainLayout>
        </main>
      </body>
    </html>
  );
}

// Move this to a separate file: src/utils/axe-config.js
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  import('react-dom').then((ReactDOM) => {
    import('@axe-core/react').then((axe) => {
      axe.default(React, ReactDOM, 1000);
    });
  });
}
