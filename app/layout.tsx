import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://starfishos-org.github.io/starfishos-docs/'),
  title: 'StarfishOS — A State-Partitioned Microkernel for CXL Pods',
  description: 'StarfishOS makes a CXL pod look like one machine while keeping hot, private operating-system state local.',
  openGraph: {
    title: 'StarfishOS — A State-Partitioned Microkernel for CXL Pods',
    description: 'One system image across a CXL pod, with hot operating-system state kept local.',
    images: ['https://starfishos-org.github.io/starfishos-docs/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StarfishOS — A State-Partitioned Microkernel for CXL Pods',
    description: 'One system image across a CXL pod, with hot operating-system state kept local.',
    images: ['https://starfishos-org.github.io/starfishos-docs/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
