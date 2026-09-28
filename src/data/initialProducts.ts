import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'PROD-101',
    name: 'Dell XPS Pro Ultra Laptop',
    category: 'Laptop',
    price: 65000,
    rating: 4.8,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60',
    description: '14-inch FHD display, Intel i7 13th Gen, 16GB RAM, 512GB NVMe SSD.'
  },
  {
    id: 'PROD-102',
    name: 'Samsung Galaxy A74 5G',
    category: 'Smartphone',
    price: 25000,
    rating: 4.5,
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
    description: 'AMOLED 120Hz display, 64MP OIS camera, 5000mAh battery with fast charging.'
  },
  {
    id: 'PROD-103',
    name: 'Apple Watch SE Series',
    category: 'Smartwatch',
    price: 18000,
    rating: 4.7,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    description: 'Retina OLED screen, Heart Rate Sensor, GPS tracking & water resistant up to 50m.'
  },
  {
    id: 'PROD-104',
    name: 'Sony WH-1000XM4 ANC Headphones',
    category: 'Headphones',
    price: 25000,
    rating: 4.9,
    stock: 19,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    description: 'Industry-leading Active Noise Cancellation, 30 hours battery life, Hi-Res Audio.'
  },
  {
    id: 'PROD-105',
    name: 'Canon EOS 1500D DSLR Camera',
    category: 'Camera',
    price: 45000,
    rating: 4.6,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60',
    description: '24.1 MP APS-C CMOS sensor, 9-point AF system with 18-55mm IS II lens.'
  },
  {
    id: 'PROD-106',
    name: 'Mechanical RGB Gaming Keyboard',
    category: 'Keyboard',
    price: 4500,
    rating: 4.4,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
    description: 'Cherry MX Blue switches, per-key RGB backlighting and durable aircraft-grade aluminum frame.'
  },
  {
    id: 'PROD-107',
    name: 'Logitech MX Master 3S Wireless Mouse',
    category: 'Mouse',
    price: 8500,
    rating: 4.9,
    stock: 42,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    description: '8000 DPI track-on-glass sensor, quiet click switches, ergonomic thumb rest.'
  },
  {
    id: 'PROD-108',
    name: 'LG UltraGear 27-inch 4K Monitor',
    category: 'Monitor',
    price: 32000,
    rating: 4.7,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60',
    description: 'IPS panel, 144Hz refresh rate, 1ms response time with HDR 400 certification.'
  },
  {
    id: 'PROD-109',
    name: 'Apple iPad 10th Gen 64GB',
    category: 'Tablet',
    price: 36000,
    rating: 4.8,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60',
    description: '10.9-inch Liquid Retina display, A14 Bionic chip, Landscape 12MP Ultra Wide front camera.'
  },
  {
    id: 'PROD-110',
    name: 'JBL Charge 5 Bluetooth Speaker',
    category: 'Speaker',
    price: 12000,
    rating: 4.6,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60',
    description: 'IP67 waterproof and dustproof, 20 hours of playtime with built-in powerbank.'
  },
  {
    id: 'PROD-111',
    name: 'HP Pavilion 15 Gaming Laptop',
    category: 'Laptop',
    price: 54000,
    rating: 4.5,
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60',
    description: 'AMD Ryzen 5 5600H, 16GB DDR4, NVIDIA GTX 1650 4GB GPU, 512GB SSD.'
  },
  {
    id: 'PROD-112',
    name: 'OnePlus Nord Buds 2 Wireless Earbuds',
    category: 'Headphones',
    price: 2999,
    rating: 4.3,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
    description: 'Active Noise Cancellation, 12.4mm dynamic titanized drivers, 36 hours total playback.'
  },
  {
    id: 'PROD-113',
    name: 'Fitbit Charge 6 Fitness Tracker',
    category: 'Smartwatch',
    price: 14500,
    rating: 4.4,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60',
    description: 'Google Maps and Wallet integration, ECG sensor, 40+ exercise modes.'
  },
  {
    id: 'PROD-114',
    name: 'Zebronics Wireless Soundbar 120W',
    category: 'Speaker',
    price: 6500,
    rating: 4.2,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60',
    description: '2.1 channel soundbar with subwoofer, Bluetooth 5.0, HDMI ARC and optical inputs.'
  },
  {
    id: 'PROD-115',
    name: 'SanDisk 1TB Extreme Portable SSD',
    category: 'Computing',
    price: 9500,
    rating: 4.8,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=500&auto=format&fit=crop&q=60',
    description: 'Read speeds up to 1050MB/s, IP55 water and dust resistance, 2-meter drop protection.'
  },
  {
    id: 'PROD-116',
    name: 'Sony Alpha 7 IV Full-frame Mirrorless',
    category: 'Camera',
    price: 185000,
    rating: 4.9,
    stock: 4,
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop&q=60',
    description: '33MP Exmor R CMOS sensor, 4K 60p video, 759-point phase detection AF.'
  }
];
