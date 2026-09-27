'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, Phone, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { AGENCY_INFO } from '@/lib/seed-data';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-docs',
    category: 'DOCUMENTS',
    question: 'Quels sont les documents obligatoires pour louer un véhicule à Tlemcen ?',
    answer:
      'Pour récupérer votre véhicule rapidement à notre agence, présentez simplement votre permis de conduire original valide (plus de 2 ans d\'ancienneté) ainsi qu\'une pièce d\'identité biométrique (CNI) pour les résidents, ou votre passeport pour les membres de la diaspora et touristes étrangers.',
    highlight: 'Contrat préparé à l\'avance : remise des clés en 2 minutes chrono.',
  },
  {
    id: 'faq-payment',
    category: 'PAIEMENT & CAUTION',
    question: 'Comment s\'effectuent le paiement et la caution ? Faut-il une carte bancaire ?',
    answer:
      'Aucun paiement n\'est exigé en ligne ! Vous réservez en 1 minute sur le site sans carte bancaire. Le règlement intégral s\'effectue directement à l\'agence au moment de la prise en charge des clés, en espèces (DZD Dinars ou EUR Euros) ou par virement/carte. La caution de garantie vous est restituée immédiatement à la fin de votre location lors de la restitution du véhicule.',
    highlight: 'Zéro prélèvement bancaire à l\'avance, 100% sécurisé et transparent.',
  },
  {
    id: 'faq-cancel',
    category: 'ANNULATION',
    question: 'Puis-je annuler ou décaler ma réservation gratuitement ?',
    answer:
      'Oui, absolument. Nous comprenons les imprévus de vol ou de planning. Vous pouvez modifier vos dates ou annuler sans aucun frais ni pénalité, sur simple message WhatsApp ou appel à notre service client.',
    highlight: 'Annulation & modification 100% gratuites à tout moment.',
  },
  {
    id: 'faq-insurance',
    category: 'ASSURANCE & SÉCURITÉ',
    question: 'L\'assurance et l\'assistance 7j/7 sont-elles incluses dans le tarif ?',
    answer:
      'Tous les tarifs affichés incluent l\'assurance automobile obligatoire ainsi que l\'assistance dépannage 7j/7 sur l\'ensemble du territoire algérien. Nos véhicules sont récents (modèles 2023-2024), révisés scrupuleusement, dotés de la climatisation et de pneus en parfait état.',
    highlight: 'Flotte 100% contrôlée et assistance permanente garantie.',
  },
  {
    id: 'faq-mileage',
    category: 'KILOMÉTRAGE',
    question: 'Le kilométrage est-il illimité ?',
    answer:
      'Oui ! Vous bénéficiez du kilométrage illimité sur nos véhicules. Que ce soit pour circuler en ville à Tlemcen, visiter les cascades d\'El Ourit, le plateau de Lalla Setti, ou descendre vers les plages de Honaine et Ghazaouet, vous roulez sans compter les kilomètres.',
    highlight: 'Roulez librement dans toute la région sans supplément au km.',
  },
  {
    id: 'faq-airport',
    category: 'LIVRAISON AÉROPORT',
    question: 'Est-il possible de récupérer le véhicule à l\'aéroport de Tlemcen (Zenata - Messali Hadj) ?',
    answer:
      'Notre agence principale se situe en plein centre-ville de Tlemcen pour un retrait express. Si vous arrivez par avion à l\'aéroport Messali Hadj (Zenata) ou en gare ferroviaire, nous pouvons assurer la remise directe des clés sur place à votre heure d\'atterrissage sur simple précision lors de votre réservation.',
    highlight: 'Service accueil aéroport disponible 7j/7 sur rendez-vous.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-docs');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-28 overflow-hidden bg-transparent z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-brand-orange font-mono text-xs font-bold tracking-wider">
              ( 05 )
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 font-semibold">
              FOIRE AUX QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
            VOS <span className="text-brand-orange">QUESTIONS</span>.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tout ce que vous devez savoir pour louer une voiture en toute sérénité à Tlemcen. Clarté, simplicité et zéro démarche superflue.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? 'bg-white border-brand-orange/50 shadow-xl'
                    : 'bg-white/90 backdrop-blur-md border-slate-200/80 hover:border-slate-300 shadow-md'
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-brand-orange text-white'
                          : 'bg-orange-50 text-brand-orange border border-orange-200/60'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange block">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-orange-100 text-brand-orange' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-3">
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {item.answer}
                        </p>
                        {item.highlight && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200/80">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                            <span>{item.highlight}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Need Help Direct Contact Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-black text-slate-900">
              Une autre question ou demande particulière ?
            </h4>
            <p className="text-xs text-slate-500">
              Notre équipe à Tlemcen vous répond 7j/7 de 08h à 20h par téléphone ou directement sur WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`https://wa.me/${AGENCY_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href={`tel:${AGENCY_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              <span>{AGENCY_INFO.phone}</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
