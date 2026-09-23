# Plan d'Implémentation : Plateforme de Location de Voitures Salah Tour Tlemcen

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire une application web moderne et haut de gamme de location de voitures (Next.js 14, Node.js API, PostgreSQL/Prisma, Tailwind CSS v3, Framer Motion) reproduisant fidèlement le design fourni ("LOUEZ. ROULEZ.", widget de calcul de disponibilité express, cartes 3 étapes chrono, catalogue dynamique et administration).

**Architecture:** Application Next.js App Router fullstack avec routes API Node.js, couche ORM Prisma pour PostgreSQL avec fallback résilient en mémoire, interfaces réactives avec Framer Motion et Tailwind CSS v3, et intégration directe WhatsApp.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS v3.4, Framer Motion, Lucide React, Prisma ORM, PostgreSQL.

**Spec:** `docs/superpowers/specs/2026-09-23-car-rental-design.md`

## Global Constraints

- Thème sombre strict avec palette Midnight & Neon Amber : Fond principal `#070A12` / `#0D1527`, accent `#FF6B00` / `#F97316`.
- Monnaie locale : Dinar Algérien (DA), tarif de base affiché : `À PARTIR DE 7 000 DA / JOUR`.
- Localisation : Tlemcen 13000, Coordonnées : `34°52'N 1°19'W`.
- Intégration contact : WhatsApp et Téléphone `0550 50 50 50`.
- Résilience : L'application doit compiler sans erreur avec `npm run build` et fonctionner immédiatement même si la base PostgreSQL distante n'est pas encore connectée (via fallback de données locales).

---

### Task 1: Initialisation du projet Next.js & Dépendances

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `.env.example`
- Create: `.env`

**Interfaces:**
- Produit : Base du projet Next.js avec TypeScript et scripts de démarrage.

- [ ] **Step 1: Initialiser le package.json et installer les dépendances**

Installer : `next`, `react`, `react-dom`, `framer-motion`, `lucide-react`, `@prisma/client`, `clsx`, `tailwind-merge`.
Dépendances de dev : `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `tailwindcss@^3.4.1`, `postcss`, `autoprefixer`, `prisma`.

- [ ] **Step 2: Créer next.config.mjs et tsconfig.json**

Configurer les alias `@/*` pointant vers `./src/*` et autoriser les domaines d'images distants (Unsplash pour les véhicules haute qualité).

- [ ] **Step 3: Créer .env.example et .env**

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rentcar?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_PHONE="213550505050"
```

- [ ] **Step 4: Vérifier la configuration**

Run: `npx next --version`
Expected: Next.js CLI version affichée sans erreur.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs .env.example
git commit -m "chore: scaffold Next.js project with dependencies"
```

---

### Task 2: Configuration Design System, Tailwind CSS & Layout

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

**Interfaces:**
- Consumes: Tailwind v3, polices Google Fonts.
- Produit: Classes utilitaires de style (`bg-midnight`, `text-amber-glow`, `glass-card`, `hud-corner`).

- [ ] **Step 1: Créer tailwind.config.ts avec la palette dark luxury**

Définir les couleurs :
- `midnight`: `{ 950: '#05070D', 900: '#070A12', 800: '#0D1527', 700: '#141E36' }`
- `brand`: `{ orange: '#FF6B00', amber: '#F97316', dark: '#C2410C' }`
- Box-shadows lumineuses et animations custom.

- [ ] **Step 2: Créer src/app/globals.css**

Ajouter les styles de base, scrollbar stylisée sombre, et les effets HUD :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-card {
    background: rgba(13, 21, 39, 0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .hud-bracket {
    position: relative;
  }
}
```

- [ ] **Step 3: Créer src/app/layout.tsx**

Intégrer les polices Google Fonts (Outfit & Plus Jakarta Sans), les balises SEO complètes, le favicône et le layout global en thème sombre (`bg-midnight-950 text-slate-100`).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts postcss.config.js src/app/globals.css src/app/layout.tsx
git commit -m "feat: setup design system, tailwind palette and root layout"
```

---

### Task 3: Modèles de Données, Prisma Schema & Données Initiales (Seed)

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/types/index.ts`
- Create: `src/lib/db.ts`
- Create: `src/lib/seed-data.ts`
- Create: `prisma/seed.ts`

**Interfaces:**
- Produit: Types `Vehicle`, `Reservation`, `LocationSummary`, client `db` avec fallback automatique en mémoire pour un fonctionnement instantané.

- [ ] **Step 1: Écrire le schéma Prisma et les types TypeScript**

Créer les modèles `Vehicle`, `Location`, et `Reservation` dans `prisma/schema.prisma` et exporter les interfaces équivalentes dans `src/types/index.ts`.

- [ ] **Step 2: Créer le jeu de données initiales réalistes (Tlemcen & Véhicules)**

Véhicules de départ :
1. Renault Clio 5 (2023, Citadine, Manuelle, Essence, 7 000 DA/j)
2. Dacia Sandero Stepway (2024, Citadine, Automatique, Essence, 8 500 DA/j)
3. Hyundai Accent (2023, Berline, Automatique, Essence, 9 000 DA/j)
4. Volkswagen Golf 8 (2023, Berline Sport, Automatique, Diesel, 14 000 DA/j)
5. Peugeot 208 GT (2023, Citadine, Automatique, Essence, 9 500 DA/j)
6. Hyundai Tucson (2024, SUV, Automatique, Diesel, 18 000 DA/j)

Lieux de départ :
- Tlemcen Centre-Ville (Gratuit)
- Aéroport Messali Hadj Tlemcen (Gratuit)
- Gare Routière Tlemcen (Gratuit)
- Livraison à Domicile (Tlemcen et environs)

- [ ] **Step 3: Créer src/lib/db.ts avec support résilient**

Implémenter un wrapper Prisma qui utilise Prisma Client si `DATABASE_URL` est accessible, ou bascule de façon transparente sur `seed-data.ts` avec opérations en mémoire pour garantir zéro crash.

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma src/types/index.ts src/lib/db.ts src/lib/seed-data.ts prisma/seed.ts
git commit -m "feat: setup prisma models, resilient db client and seed data"
```

---

### Task 4: Utilitaires de Calcul de Tarif & Intégration WhatsApp

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/utils.test.ts` (ou test script de validation)

**Interfaces:**
- Produit: `formatDA(amount)`, `calculateDays(start, end)`, `calculateEstimatePrice(days, pricePerDay)`, `buildWhatsAppUrl(reservationDetails)`.

- [ ] **Step 1: Écrire les fonctions utilitaires**

- `formatDA(number)`: Formate les montants avec espaces (ex: `21 000 DA`).
- `calculateRentalDays(startDate, endDate)`: Calcule le nombre de jours calendaires (minimum 1 jour).
- `generateWhatsAppLink(phone, message)`: Construit l'URL `https://wa.me/213550505050?text=...`.

- [ ] **Step 2: Tester les calculs avec un script de vérification**

Vérifier que du 24/09/2026 au 27/09/2026 à 7 000 DA/j = 3 jours = 21 000 DA (exactement comme sur la maquette).

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: add pricing calculator and whatsapp link builder"
```

---

### Task 5: Navbar & Composants Communs

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: Lucide Icons, Next.js Link.
- Produit: Barre de navigation responsive avec logo "SALAH TOUR", numéro WhatsApp direct, et navigation fluide.

- [ ] **Step 1: Développer la Navbar**

- Logo typographique premium avec accent orange `SALAH TOUR • TLEMCEN`.
- Liens d'ancrage : "Accueil", "Véhicules", "Comment ça marche", "Contact", "Administration".
- Bouton CTA WhatsApp vert/orange `0550 50 50 50` avec icône téléphone/message.

- [ ] **Step 2: Développer le Footer**

- Coordonnées : Tlemcen 13000, 34°52'N 1°19'W.
- Horaires d'assistance 7j/7, mentions légales et raccourci WhatsApp direct.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat: add luxury dark navbar and footer components"
```

---

### Task 6: Hero Section & Widget de Vérification Express (Conforme Maquette)

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/BookingWidget.tsx`

**Interfaces:**
- Consumes: `formatDA`, `calculateRentalDays`, Framer Motion.
- Produit: Rendu pixel-perfect de la capture d'écran fournie par l'utilisateur.

- [ ] **Step 1: Implémenter HeroSection.tsx**

- Badge technique avec point clignotant : `• FLOTTE DISPONIBLE • TLEMCEN 13000 • COORD: 34°52'N 1°19'W • À PARTIR DE 7 000 DA / JOUR`.
- Titre géant : `LOUEZ.` (blanc éclatant) et `ROULEZ.` (dégradé orange vif).
- Sous-titre textuel identique : "La liberté de la route à Tlemcen. Citadines entretenues, remise des clés directe à l'aéroport, à la gare ou à votre adresse sans démarche superflue."
- Arrière-plan avec voiture de luxe en transparence et dégradé radial sombre.

- [ ] **Step 2: Implémenter BookingWidget.tsx**

- Boîtier glassmorphism avec bordures lumineuses.
- Titre avec horloge : `VÉRIFICATION EXPRESS DE DISPONIBILITÉ` + badge `RÉPONSE EN 2 MIN`.
- 3 champs interactifs :
  1. `LIEU DE RÉCUPÉRATION` (Sélecteur avec Tlemcen Centre-Ville, Aéroport Messali Hadj, Gare, etc.)
  2. `DATE & HEURE DE DÉPART` (Date & heure avec valeur par défaut 24/09/2026 10:00)
  3. `DATE & HEURE DE RETOUR` (Date & heure avec valeur par défaut 27/09/2026 10:00)
  4. Bouton CTA : `CONTINUER ->` avec hover orange intense.
- Footer interactif en temps réel :
  - `Durée calculée : X jours • Lieu • Estimation : XX XXX DA (à partir de 7 000 DA/j)`.
  - `Besoin d'aide immédiate ? • WhatsApp • 0550 50 50 50`.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx src/components/BookingWidget.tsx
git commit -m "feat: implement hero section and express booking widget conforming to mockup"
```

---

### Task 7: Section "3 Étapes Chrono" (Design HUD & Filigranes 01, 02, 03)

**Files:**
- Create: `src/components/StepsSection.tsx`

**Interfaces:**
- Produit: Section "RÉSERVEZ EN 3 ÉTAPES CHRONO" avec les 3 cartes stylisées.

- [ ] **Step 1: Implémenter StepsSection.tsx**

- Header de section avec tag : `( 01 ) PROCESSUS SIMPLE & SANS DÉPLACEMENT`
- Titre principal : `RÉSERVEZ EN 3 ÉTAPES CHRONO.` (avec "3 ÉTAPES" en orange fluo).
- Grille de 3 cartes avec les coins techniques ("hud brackets") et grands numéros filigranés en arrière-plan (`01`, `02`, `03`) :
  - **Carte 1** : `ÉTAPE 01 • SAISIE` / `DATES & LIEU` (Texte : "Définissez vos dates de prise en charge et choisissez votre point de remise : aéroport Messali Hadj, gare routière, centre-ville ou directement à domicile.")
  - **Carte 2** : `ÉTAPE 02 • VALIDATION` / `CONFIRMATION RAPIDE` (Texte : "Salah Tour confirme immédiatement la disponibilité du véhicule par téléphone ou WhatsApp. Vos documents et votre contrat sont préparés à l'avance.")
  - **Carte 3** : `ÉTAPE 03 • DÉPART` / `REMISE DES CLÉS` (Texte : "Contrôle rapide du permis de conduire et de la pièce d'identité, paiement sur place au moment de la récupération, et vous prenez la route en toute sérénité.")

- [ ] **Step 2: Commit**

```bash
git add src/components/StepsSection.tsx
git commit -m "feat: add 3 chrono steps section with HUD corner styling and watermarks"
```

---

### Task 8: Catalogue de Flotte de Véhicules & Modal de Réservation

**Files:**
- Create: `src/components/FleetSection.tsx`
- Create: `src/components/VehicleCard.tsx`
- Create: `src/components/BookingModal.tsx`

**Interfaces:**
- Consumes: `Vehicle`, `db`, `formatDA`, Framer Motion.
- Produit: Vitrine des véhicules disponibles avec filtre par catégorie (Toutes, Citadines, Berlines, SUV), badges de spécifications, et modal de confirmation immédiate avec pré-remplissage des dates.

- [ ] **Step 1: Créer le composant VehicleCard**

Affichage de la photo, du nom, du badge de catégorie, de la boîte de vitesses (Manuelle / Auto), carburant, nombre de places, prix en DA/jour, et bouton "Sélectionner ce véhicule".

- [ ] **Step 2: Créer le composant BookingModal**

- Récapitulatif : Véhicule sélectionné, lieu de prise en charge, dates choisies, durée, prix total calculé.
- Formulaire client : Nom & Prénom, Numéro de téléphone / WhatsApp, Permis de conduire, remarques optionnelles.
- Double action :
  1. Envoi et enregistrement en base PostgreSQL (`/api/reservations`).
  2. Redirection directe sur WhatsApp avec message pré-formaté clé en main.

- [ ] **Step 3: Créer le composant FleetSection**

Intégration sur la page d'accueil avec onglets de filtrage et animations de transition Framer Motion.

- [ ] **Step 4: Commit**

```bash
git add src/components/VehicleCard.tsx src/components/BookingModal.tsx src/components/FleetSection.tsx
git commit -m "feat: add interactive fleet catalog and booking modal"
```

---

### Task 9: Routes API Backend (Véhicules & Réservations)

**Files:**
- Create: `src/app/api/vehicles/route.ts`
- Create: `src/app/api/reservations/route.ts`
- Create: `src/app/api/reservations/[id]/route.ts`

**Interfaces:**
- Produit: API REST Node.js pour Next.js App Router :
  - `GET /api/vehicles` : Liste des véhicules
  - `POST /api/vehicles` : Création de véhicule
  - `GET /api/reservations` : Liste des réservations
  - `POST /api/reservations` : Enregistrement d'une nouvelle réservation
  - `PATCH /api/reservations/[id]` : Mise à jour du statut (CONFIRMED, COMPLETED, CANCELLED)

- [ ] **Step 1: Implémenter src/app/api/vehicles/route.ts**

Gestion des requêtes GET et POST avec validation des données.

- [ ] **Step 2: Implémenter src/app/api/reservations/route.ts & [id]/route.ts**

Gestion de la création de réservation avec calcul automatique du prix total sécurisé et mise à jour de statut.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/vehicles/route.ts src/app/api/reservations/route.ts src/app/api/reservations/[id]/route.ts
git commit -m "feat: implement backend REST API routes for vehicles and reservations"
```

---

### Task 10: Tableau de Bord Administration (`/admin`)

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/flotte/page.tsx`
- Create: `src/components/admin/AdminHeader.tsx`
- Create: `src/components/admin/ReservationsTable.tsx`

**Interfaces:**
- Consumes: `/api/reservations`, `/api/vehicles`.
- Produit: Tableau de bord pour Salah Tour :
  - Indicateurs clés : Total réservations, Réservations en attente, Revenus estimés en DA, Véhicules actifs.
  - Tableau des réservations en temps réel avec filtres par statut et boutons d'action rapide (Confirmer, Terminer, Annuler, Ouvrir WhatsApp client).
  - Gestion du statut de la flotte (bascule Disponible / En maintenance).

- [ ] **Step 1: Créer la page d'administration principale `/admin`**

Afficher les cartes de statistiques (KPIs) et le composant `ReservationsTable`.

- [ ] **Step 2: Créer la page `/admin/flotte`**

Interface de gestion des véhicules avec possibilité d'activer/désactiver la disponibilité d'une voiture et de modifier son prix journalier.

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/page.tsx src/app/admin/flotte/page.tsx src/components/admin/AdminHeader.tsx src/components/admin/ReservationsTable.tsx
git commit -m "feat: implement admin dashboard for fleet and reservations management"
```

---

### Task 11: Assemblage de la Page Principale, Tests & Vérification Finale

**Files:**
- Modify: `src/app/page.tsx`
- Create: `public/images/cars/...`

**Interfaces:**
- Produit: Page d'accueil complète, fonctionnelle, animée et testée.

- [ ] **Step 1: Assembler src/app/page.tsx**

Intégrer dans l'ordre :
1. `Navbar`
2. `HeroSection` (avec `BookingWidget`)
3. `StepsSection` ("3 ÉTAPES CHRONO")
4. `FleetSection` (Catalogue complet avec modal)
5. Section Avantages & Témoignages
6. `Footer`

- [ ] **Step 2: Vérifier le build et la compilation TypeScript**

Run: `npm run build`
Expected: Build Next.js réussi avec 0 erreur.

- [ ] **Step 3: Lancer le serveur et tester le parcours utilisateur**

Vérifier :
- Affichage du Hero identique à la capture.
- Interaction du widget (changement de dates -> calcul direct des jours et du prix).
- Clic sur "CONTINUER ->" -> défilement vers la flotte ou ouverture de réservation.
- Envoi d'une réservation -> apparition dans `/admin`.
- Boutons WhatsApp fonctionnels.

- [ ] **Step 4: Commit final**

```bash
git add .
git commit -m "feat: finalize fullstack car rental platform with dark luxury ui"
```
