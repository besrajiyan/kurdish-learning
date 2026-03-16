import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/store/auth';
import { AudienceProvider } from '@/store/audience';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'kurdi.ch — Kurdi Fer Bibe',
  description: 'Lerne Kurmanci spielerisch mit Lektionen, Quizzen und Sprachausgabe. Learn Kurmanji through play!',
  metadataBase: new URL('https://kurdi.ch'),
  openGraph: {
    title: 'kurdi.ch — Kurdi Fer Bibe',
    description: 'Lerne Kurmanci spielerisch! Kurmanji lernen fur Kinder & Erwachsene.',
    siteName: 'kurdi.ch',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kurdi.ch — Kurdi Fer Bibe',
    description: 'Lerne Kurmanci spielerisch! Learn Kurmanji through play!',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B7DDD" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="kurdi.ch" />
      </head>
      <body>
        <AuthProvider>
          <AudienceProvider>
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
          </AudienceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
