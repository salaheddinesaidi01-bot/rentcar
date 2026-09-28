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
    imageUrl: '/images/cars/renault-clio-5.jpg',
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
    imageUrl: '/images/cars/dacia-sandero-stepway.jpg',
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
    imageUrl: '/images/cars/hyundai-accent-rb.jpg',
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
    imageUrl: '/images/cars/volkswagen-golf-8.jpg',
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
    imageUrl: '/images/cars/peugeot-208.jpg',
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
    imageUrl: '/images/cars/hyundai-tucson.jpg',
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
