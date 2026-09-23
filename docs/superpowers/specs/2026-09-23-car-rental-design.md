# Spécification de Conception : Plateforme de Location de Voitures (Salah Tour Tlemcen)

## 1. Vue d'ensemble & Objectifs

Ce projet a pour but de concevoir et développer une application web moderne, haut de gamme et performante pour une agence de location de voitures (inspirée de Salah Tour Tlemcen). L'accent est mis sur une identité visuelle sombre élégante ("Midnight & Neon Amber"), un simulateur de réservation interactif avec calcul de tarif dynamique, une présentation soignée de la flotte de véhicules avec animations fluides, et un panneau d'administration pour la gestion des véhicules et des demandes de réservation.

### Objectifs
- Reproduire fidèlement le design fourni en capture d'écran : Typographie percutante ("LOUEZ. ROULEZ."), badge technique de localisation/flotte ("FLOTTE DISPONIBLE • TLEMCEN 13000 COORD: 34°52'N 1°19'W À PARTIR DE 7 000 DA / JOUR"), widget de vérification express avec dates et calcul en temps réel, cartes "3 ÉTAPES CHRONO" avec filigranes numérotés et bordures technologiques.
- Offrir une expérience utilisateur fluide avec animations au scroll, transitions Framer Motion, et effets de lueur (glows / glassmorphism).
- Gérer la réservation en ligne avec estimation immédiate en Dinars Algériens (DA), confirmation WhatsApp en 1 clic et enregistrement en base PostgreSQL.
- Fournir un espace d'administration (`/admin`) pour gérer les véhicules (prix, disponibilité, caractéristiques) et traiter les réservations.
- Supporter un mode de données hybride (Prisma PostgreSQL + fallback de démonstration immédiat si la base de données PostgreSQL n'est pas encore provisionnée).

---

## 2. Architecture Technique

- **Framework Frontend & Backend** : Next.js 14/15 avec App Router et TypeScript.
- **Styling** : Tailwind CSS v3 (v3.4) configuré avec la palette dark luxury (`#080C15`, `#0D1527`, `#FF6B00`, `#F97316`).
- **Animations** : Framer Motion pour les micro-interactions, apparitions au scroll, transitions de cartes et widget de réservation.
- **Composants d'icônes** : Lucide React.
- **Base de données & ORM** : PostgreSQL avec Prisma ORM (`@prisma/client` et `prisma`).
- **Mode Résilience / Demo Fallback** : Un repository de données unifié (`src/lib/db.ts`) permettant à l'application de fonctionner directement avec des données initiales complètes tout en se synchronisant avec PostgreSQL dès que `DATABASE_URL` est renseignée.

---

## 3. Charte Graphique & Design System

### Palette de Couleurs
- **Background Principal** : `#070A12` (Noir nuit profond avec reflets bleutés).
- **Surface / Cartes Glassmorphism** : `rgba(13, 21, 39, 0.75)` avec `backdrop-blur-md` et bordure subtile `rgba(255, 255, 255, 0.08)`.
- **Accent Primaire** : `#FF6B00` / `#F97316` (Orange vif vibrant) avec effets de halo lumineux (`shadow-[0_0_25px_rgba(255,107,0,0.35)]`).
- **Texte Titre** : `#FFFFFF` (Gras percutant, police sans-serif moderne Outfit / Plus Jakarta Sans).
- **Texte Secondaire / Métadonnées** : `#94A3B8` (Gris ardoise clair) et `#F97316` pour les tags techniques.

### Composants Visuels Clés (selon la maquette)
1. **Top Bar / Badge Statut** :
   - Point lumineux vert/orange clignotant.
   - Tag: `• FLOTTE DISPONIBLE • TLEMCEN 13000 • COORD: 34°52'N 1°19'W • À PARTIR DE 7 000 DA / JOUR`.
2. **Hero Header** :
   - Titre XXL : `LOUEZ.` (blanc) `ROULEZ.` (dégradé orange/ambre).
   - Sous-titre : Présentation du service de remise des clés rapide (aéroport Messali Hadj, gare, domicile).
3. **Widget "Vérification Express de Disponibilité"** :
   - En-tête : Icône horloge + `VÉRIFICATION EXPRESS DE DISPONIBILITÉ` + badge `RÉPONSE EN 2 MIN`.
   - Champs :
     - Lieu de récupération (Sélecteur : Tlemcen Centre-Ville, Aéroport Messali Hadj, Gare Routière, Livraison Domicile).
     - Date & heure de départ.
     - Date & heure de retour.
     - Bouton d'action CTA `CONTINUER ->` avec animation de pulsation lumineuse.
   - Footer du widget :
     - Calcul dynamique en direct : `Durée calculée : X jours • Lieu • Estimation : XX XXX DA (à partir de 7 000 DA/j)`.
     - Contact d'assistance immédiate WhatsApp & Téléphone : `0550 50 50 50`.
4. **Section "Réservez en 3 étapes chrono"** :
   - Badge : `( 01 ) PROCESSUS SIMPLE & SANS DÉPLACEMENT`.
   - Titre : `RÉSERVEZ EN 3 ÉTAPES CHRONO.`
   - 3 Cartes techniques avec numéros grand format en filigrane (`01`, `02`, `03`), bordures en équerre (coins stylisés type HUD) :
     - Étape 01 : DATES & LIEU
     - Étape 02 : CONFIRMATION RAPIDE (WhatsApp / Téléphone)
     - Étape 03 : REMISE DES CLÉS (Contrôle rapide, paiement sur place)
5. **Catalogue Flotte Dynamique** :
   - Grille de véhicules (ex: Renault Clio 5, Dacia Stepway, Hyundai Accent, Volkswagen Golf 8, Seat Ibiza, Peugeot 208).
   - Badges de caractéristiques (Essence/Diesel, Boîte Automatique/Manuelle, Climatisation, 5 Places).
   - Bouton "Réserver maintenant" ouvrant le récapitulatif avec transfert automatique des dates et du lieu choisis.

---

## 4. Modèle de Données (PostgreSQL & Prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Vehicle {
  id           String        @id @default(cuid())
  name         String
  brand        String
  category     String        // "Citadine", "Berline", "SUV", "Luxe"
  transmission String        // "Automatique", "Manuelle"
  fuel         String        // "Essence", "Diesel", "Hybride"
  seats        Int           @default(5)
  pricePerDay  Float
  imageUrl     String
  features     String[]      // ["Climatisation", "Bluetooth", "Régulateur", "GPS"]
  available    Boolean       @default(true)
  plateNumber  String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  reservations Reservation[]
}

model Location {
  id        String   @id @default(cuid())
  name      String
  city      String   @default("Tlemcen")
  fee       Float    @default(0) // Frais de livraison éventuels
  active    Boolean  @default(true)
}

model Reservation {
  id             String    @id @default(cuid())
  vehicleId      String
  vehicle        Vehicle   @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  customerName   String
  customerPhone  String
  customerEmail  String?
  pickupLocation String
  returnLocation String
  startDate      DateTime
  endDate        DateTime
  totalDays      Int
  totalPrice     Float
  status         String    @default("PENDING") // PENDING, CONFIRMED, COMPLETED, CANCELLED
  notes          String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

---

## 5. Arborescence du Projet

```
rentcar/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts              # Données de test : véhicules réalistes & lieux
├── public/
│   ├── images/
│   │   └── cars/            # Images haute qualité des véhicules
│   └── hero-car-bg.jpg      # Image de fond du hero avec overlay
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Layout racine avec polices et métadonnées
│   │   ├── page.tsx         # Page d'accueil complète (Hero, Formulaire, 3 Étapes, Flotte, Contact)
│   │   ├── flotte/
│   │   │   └── page.tsx     # Page dédiée au catalogue complet avec filtres
│   │   ├── admin/
│   │   │   ├── page.tsx     # Tableau de bord : stats & réservations
│   │   │   └── flotte/
│   │   │       └── page.tsx # Gestion des véhicules (ajout, édition, statut)
│   │   └── api/
│   │       ├── vehicles/
│   │       │   └── route.ts # GET / POST véhicules
│   │       └── reservations/
│   │           └── route.ts # GET / POST réservations
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation élégante avec logo et contact
│   │   ├── HeroSection.tsx  # Hero avec "LOUEZ. ROULEZ.", badge coordonnées
│   │   ├── BookingWidget.tsx# Widget interactif avec calcul de prix en direct
│   │   ├── StepsSection.tsx # Les 3 étapes chrono (design HUD / filigranes 01, 02, 03)
│   │   ├── FleetPreview.tsx # Cartes de véhicules avec filtres et modal
│   │   ├── BookingModal.tsx # Modal de validation de réservation
│   │   └── Footer.tsx       # Pied de page avec coordonnées Tlemcen & WhatsApp
│   ├── lib/
│   │   ├── db.ts            # Client Prisma avec fallback en mémoire
│   │   └── utils.ts         # Fonctions utilitaires (formatPrixDA, calculJours, lienWhatsApp)
│   └── types/
│       └── index.ts         # Types TypeScript partagés
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 6. Plan de Test & Vérification

1. **Vérification du Design & Rendu** :
   - Tester le rendu visuel sur Desktop et Mobile.
   - Vérifier la typographie "LOUEZ. ROULEZ.", les couleurs orange ambre et les bordures technologiques des 3 cartes.
2. **Vérification Interactive du Widget** :
   - Sélectionner différentes dates et lieux, constater la mise à jour dynamique de la durée (ex: 3 jours) et du prix (ex: 21 000 DA).
   - Cliquer sur "CONTINUER ->" ou réserver un véhicule, soumettre le formulaire et vérifier la redirection WhatsApp et l'enregistrement de la réservation.
3. **Vérification de l'Espace Admin** :
   - Accéder à `/admin`, voir la réservation enregistrée, modifier son statut (Confirmer/Terminer).
   - Consulter et basculer la disponibilité d'une voiture.
4. **Vérification de la compilation** :
   - Exécuter `npm run build` pour garantir qu'aucune erreur TypeScript ou Next.js n'existe.
