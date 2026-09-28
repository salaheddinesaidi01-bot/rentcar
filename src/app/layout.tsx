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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
