import { Inter } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
import './globals.css';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';
import { A11yTester } from '@/components/A11yTester'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Origino',
  description: 'A modern landing page built with Next.js and Tailwind CSS',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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
      <body className={inter.className}>
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
