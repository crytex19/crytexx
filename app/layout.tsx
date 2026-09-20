import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/config';
import MotionSystem from '@/components/MotionSystem';

export const metadata: Metadata = {
  title: siteConfig.business.title,
  description: siteConfig.business.description,
  metadataBase: new URL(siteConfig.business.url),
  alternates: { canonical: '/' },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%234C7DBE'/%3E%3Ctext x='50' y='68' font-size='60' text-anchor='middle' fill='%23FAF7F3' font-family='Georgia,serif'%3EB%3C/text%3E%3C/svg%3E"
  },
  openGraph: {
    type: 'website',
    title: siteConfig.business.title,
    description: siteConfig.business.description,
    url: siteConfig.business.url,
    images: [siteConfig.hero.image]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.business.title,
    description: siteConfig.business.description,
    images: [siteConfig.hero.image]
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.business.name,
  image: siteConfig.hero.image,
  telephone: siteConfig.business.phone,
  email: siteConfig.business.email || undefined,
  address: { '@type': 'PostalAddress', addressRegion: 'NY', addressCountry: 'US' },
  areaServed: siteConfig.business.areaServed,
  sameAs: [siteConfig.business.instagramUrl]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href={siteConfig.hero.image} fetchPriority="high" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <MotionSystem />
      </body>
    </html>
  );
}
