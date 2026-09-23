const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const vehicles = [
  {
    name: 'Renault Clio 5 Life',
    brand: 'Renault',
    category: 'Citadine',
    transmission: 'Manuelle',
    fuel: 'Essence',
    seats: 5,
    pricePerDay: 7000,
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    features: ['Climatisation', 'Bluetooth / USB', 'Régulateur de vitesse', 'Direction assistée', 'Fixations Isofix'],
    available: true,
    year: 2023,
    plateNumber: '13-12456-123',
  },
  {
    name: 'Dacia Sandero Stepway Techroad',
    brand: 'Dacia',
    category: 'Citadine',
    transmission: 'Automatique',
    fuel: 'Essence',
    seats: 5,
    pricePerDay: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    features: ['Écran Tactile GPS', 'Caméra de recul', 'Climatisation auto', 'Barres de toit', 'Mode Eco'],
    available: true,
    year: 2024,
    plateNumber: '13-25890-124',
  },
  {
    name: 'Hyundai Accent RB',
    brand: 'Hyundai',
    category: 'Berline',
    transmission: 'Automatique',
    fuel: 'Essence',
    seats: 5,
    pricePerDay: 9000,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    features: ['Boîte Automatique', 'Grand Coffre 465L', 'Climatisation', 'Commandes au volant', 'Antibrouillards'],
    available: true,
    year: 2023,
    plateNumber: '13-33412-123',
  },
  {
    name: 'Volkswagen Golf 8 R-Line',
    brand: 'Volkswagen',
    category: 'Berline',
    transmission: 'Automatique',
    fuel: 'Diesel',
    seats: 5,
    pricePerDay: 14000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    features: ['Cockpit Digital', 'Pack R-Line', 'Phares LED Matrix', 'Apple CarPlay sans fil', 'Aide au stationnement'],
    available: true,
    year: 2023,
    plateNumber: '13-44109-123',
  },
  {
    name: 'Peugeot 208 Allure',
    brand: 'Peugeot',
    category: 'Citadine',
    transmission: 'Automatique',
    fuel: 'Essence',
    seats: 5,
    pricePerDay: 9500,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    features: ['i-Cockpit 3D', 'Jantes alu 16"', 'Climatisation auto', 'Radar arrière', 'Démarrage sans clé'],
    available: true,
    year: 2023,
    plateNumber: '13-55912-123',
  },
  {
    name: 'Hyundai Tucson N-Line',
    brand: 'Hyundai',
    category: 'SUV',
    transmission: 'Automatique',
    fuel: 'Diesel',
    seats: 5,
    pricePerDay: 18000,
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    features: ['Toit Ouvrant Panoramique', 'Transmission 4x4 HTRAC', 'Sièges Chauffants', 'Caméra 360°', 'Audio Premium'],
    available: true,
    year: 2024,
    plateNumber: '13-67891-124',
  },
];

const locations = [
  { name: 'Tlemcen Centre-Ville', city: 'Tlemcen', fee: 0, active: true },
  { name: 'Aéroport Messali Hadj Tlemcen (Zenata)', city: 'Tlemcen', fee: 0, active: true },
  { name: 'Gare Routière Tlemcen', city: 'Tlemcen', fee: 0, active: true },
  { name: 'Livraison à Domicile (Grand Tlemcen)', city: 'Tlemcen', fee: 1500, active: true },
];

async function main() {
  console.log('Seeding database with vehicles and locations...');
  for (const loc of locations) {
    await prisma.location.create({ data: loc }).catch(() => {});
  }
  for (const veh of vehicles) {
    await prisma.vehicle.create({ data: veh }).catch(() => {});
  }
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
