import React from 'react';
import { MapPin, Clock, MessageSquare, Car, Phone } from 'lucide-react';
import { AGENCY_INFO } from '@/lib/seed-data';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-brand-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center shadow-md">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black text-white">
                AGENCE <span className="text-brand-orange">TOUR</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Votre agence de location de véhicules récents à Tlemcen. Retrait rapide des clés directement dans nos locaux avec un contrat clair et sans surprise.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-amber">
              <MapPin className="w-3.5 h-3.5" />
              <span>{AGENCY_INFO.address}</span>
            </div>
          </div>

          {/* Col 2: Fast Navigation Links (No Admin link) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navigation Rapide
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#reservation" className="hover:text-brand-orange transition-colors">
                  Vérification de disponibilité par date
                </a>
              </li>
              <li>
                <a href="#flotte" className="hover:text-brand-orange transition-colors">
                  Catalogue de nos véhicules
                </a>
              </li>
              <li>
                <a href="#agence" className="hover:text-brand-orange transition-colors">
                  Localisation & itinéraire vers l&apos;agence
                </a>
              </li>
              <li>
                <a href="#a-propos" className="hover:text-brand-orange transition-colors">
                  À Propos de Nous (Agence Tour)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance & Contact direct */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact & Accueil Agence
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href={`https://wa.me/${AGENCY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white group"
              >
                <div className="w-9 h-9 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4 fill-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">WhatsApp & Réservations</div>
                  <div className="font-bold text-emerald-400">{AGENCY_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`tel:${AGENCY_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white"
              >
                <div className="w-9 h-9 rounded-md bg-brand-orange/20 text-brand-orange flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Standard Téléphonique</div>
                  <div className="font-bold text-white">{AGENCY_INFO.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>{AGENCY_INFO.openingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Agence Tour Tlemcen. Tous droits réservés.</p>
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
