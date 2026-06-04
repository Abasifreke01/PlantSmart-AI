export const seedHistory = [
  {
    id: 'seed-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    location: 'Nairobi',
    inputs: { n: 85, p: 45, k: 35, temperature: 22, humidity: 75, ph: 6.2, rainfall: 180 },
    topCrop: { crop: 'Coffee', icon: '☕', score: 94 }
  },
  {
    id: 'seed-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6.5).toISOString(),
    location: 'Amsterdam',
    inputs: { n: 55, p: 35, k: 30, temperature: 14, humidity: 65, ph: 6.8, rainfall: 85 },
    topCrop: { crop: 'Wheat', icon: '🌾', score: 92 }
  },
  {
    id: 'seed-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5.2).toISOString(),
    location: 'Fresno',
    inputs: { n: 90, p: 45, k: 55, temperature: 28, humidity: 62, ph: 7.2, rainfall: 90 },
    topCrop: { crop: 'Cotton', icon: '☁️', score: 96 }
  },
  {
    id: 'seed-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4.8).toISOString(),
    location: 'Kyoto',
    inputs: { n: 70, p: 40, k: 35, temperature: 21, humidity: 88, ph: 6.5, rainfall: 220 },
    topCrop: { crop: 'Rice', icon: '🌾', score: 98 }
  },
  {
    id: 'seed-5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4.1).toISOString(),
    location: 'São Paulo',
    inputs: { n: 95, p: 55, k: 120, temperature: 26, humidity: 82, ph: 6.3, rainfall: 160 },
    topCrop: { crop: 'Banana', icon: '🍌', score: 95 }
  },
  {
    id: 'seed-6',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.5).toISOString(),
    location: 'Cairo',
    inputs: { n: 40, p: 25, k: 20, temperature: 31, humidity: 42, ph: 7.4, rainfall: 45 },
    topCrop: { crop: 'Millet', icon: '🌾', score: 90 }
  },
  {
    id: 'seed-7',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    location: 'Sydney',
    inputs: { n: 30, p: 45, k: 35, temperature: 18, humidity: 55, ph: 6.7, rainfall: 75 },
    topCrop: { crop: 'Soybean', icon: '🌱', score: 91 }
  },
  {
    id: 'seed-8',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.2).toISOString(),
    location: 'Bordeaux',
    inputs: { n: 50, p: 30, k: 60, temperature: 22, humidity: 60, ph: 6.5, rainfall: 80 },
    topCrop: { crop: 'Grapes', icon: '🍇', score: 97 }
  },
  {
    id: 'seed-9',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(),
    location: 'Munich',
    inputs: { n: 85, p: 50, k: 90, temperature: 17, humidity: 70, ph: 5.8, rainfall: 75 },
    topCrop: { crop: 'Potato', icon: '🥔', score: 93 }
  },
  {
    id: 'seed-10',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0.8).toISOString(),
    location: 'Mumbai',
    inputs: { n: 110, p: 50, k: 60, temperature: 29, humidity: 85, ph: 7.0, rainfall: 210 },
    topCrop: { crop: 'Sugarcane', icon: '🎋', score: 96 }
  },
  {
    id: 'seed-11',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    location: 'Nairobi',
    inputs: { n: 88, p: 25, k: 30, temperature: 20, humidity: 62, ph: 5.9, rainfall: 170 },
    topCrop: { crop: 'Coffee', icon: '☕', score: 92 }
  },
  {
    id: 'seed-12',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    location: 'Fresno',
    inputs: { n: 105, p: 48, k: 50, temperature: 27, humidity: 68, ph: 7.0, rainfall: 100 },
    topCrop: { crop: 'Cotton', icon: '☁️', score: 98 }
  }
];
