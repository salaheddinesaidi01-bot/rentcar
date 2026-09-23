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
  title: 'Salah Tour Tlemcen | Location de Voitures & Véhicules Récente Flotte',
  description:
    'La liberté de la route à Tlemcen. Citadines et berlines récentes, remise des clés directe à l\'aéroport Messali Hadj, à la gare ou à domicile sans démarche superflue. À partir de 7 000 DA / jour.',
  keywords: [
    'location voiture tlemcen',
    'louer voiture tlemcen',
    'rent car tlemcen',
    'location aeroport messali hadj',
    'salah tour tlemcen',
    'location clio 5 tlemcen',
  ],
  authors: [{ name: 'Salah Tour Tlemcen' }],
  openGraph: {
    title: 'Salah Tour Tlemcen — Location de Voitures',
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
      <body className="min-h-screen bg-midnight-900 text-slate-100 font-sans antialiased selection:bg-brand-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
