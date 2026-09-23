import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, MessageSquare, Car, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-midnight-950 border-t border-white/5 pt-16 pb-12 overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center shadow-glow-orange">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black text-white">
                SALAH <span className="text-brand-orange">TOUR</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Votre agence de référence pour la location de véhicules récents à Tlemcen. Prise en charge express à l'aéroport Messali Hadj, en gare ou directement à domicile.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-amber">
              <MapPin className="w-3.5 h-3.5" />
              <span>TLEMCEN 13000 • 34°52&apos;N 1°19&apos;W</span>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navigation Rapide
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#reservation" className="hover:text-brand-orange transition-colors">
                  Vérification de disponibilité
                </a>
              </li>
              <li>
                <a href="#etapes" className="hover:text-brand-orange transition-colors">
                  Processus en 3 étapes
                </a>
              </li>
              <li>
                <a href="#flotte" className="hover:text-brand-orange transition-colors">
                  Catalogue des citadines & berlines
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-orange transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-amber" />
                  <span>Portail d&apos;administration</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Points de Livraison */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Points de Livraison
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                <span>Aéroport International Messali Hadj (Zenata)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                <span>Tlemcen Centre-Ville (Place El Mechouar)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                <span>Gare Ferroviaire et Gare Routière</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 flex-shrink-0" />
                <span>Livraison sur mesure à votre domicile / hôtel</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Horaires */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Assistance & Réservations
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href="https://wa.me/213550505050"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white group"
              >
                <div className="w-9 h-9 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 fill-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">WhatsApp 7j/7</div>
                  <div className="font-bold text-emerald-400">0550 50 50 50</div>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>Service client actif : 07h00 - 23h00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Salah Tour Tlemcen. Tous droits réservés.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-slate-400">FLOTTE RÉCENTE 2023 - 2024</span>
            <span>•</span>
            <span className="text-brand-orange font-bold">À PARTIR DE 7 000 DA / JOUR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
