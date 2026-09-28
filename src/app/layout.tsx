import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Agence Tour Tlemcen | Location de Voitures & Véhicules Récente Flotte',
  description:
    'La liberté de voyager à Tlemcen. Flotte récente, soignée et climatisée avec remise rapide des clés à l\'agence ou à l\'aéroport Messali Hadj sans démarche superflue. Réservez simplement sans avance par carte.',
  keywords: [
    'location voiture tlemcen',
    'louer voiture tlemcen',
    'rent car tlemcen',
    'location aeroport messali hadj',
    'agence tour tlemcen',
    'location clio 5 tlemcen',
  ],
  authors: [{ name: 'Agence Tour Tlemcen' }],
  openGraph: {
    title: 'Agence Tour Tlemcen — Location de Voitures',
    description: 'Louez. Roulez. Service express de remise de clés à Tlemcen.',
    type: 'website',
  },
};

import { ThemeProvider } from '@/context/ThemeContext';
import ThemeToggleCorner from '@/components/ThemeToggleCorner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${outfit.variable} ${jakarta.variable} scroll-smooth dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('rentcar_theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-brand-orange selection:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
          <ThemeToggleCorner />
        </ThemeProvider>
      </body>
    </html>
  );
}
