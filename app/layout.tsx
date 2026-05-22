import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const siteUrl = 'https://hrtoolkitai.com';
const siteTitle = 'HR Toolkit AI | ₹99 HR Fresher Toolkit with Resume Templates';
const siteDescription =
  'Build your HR career faster with a ₹99 toolkit: ATS resume templates, interview prep, fresher roadmap, and career consultation resources.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | HR Toolkit AI'
  },
  description: siteDescription,
  keywords: [
    'HR fresher jobs',
    'HR resume templates',
    '₹99 HR toolkit',
    'HR interview preparation',
    'HR career roadmap'
  ],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'HR Toolkit AI',
    title: siteTitle,
    description: siteDescription
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="min-h-[calc(100vh-128px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
