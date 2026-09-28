import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'PROD-101',
    name: 'Apple MacBook Air M2',
    category: 'Laptops',
    price: 89999,
    rating: 4.8,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    description: '13.6-inch Liquid Retina Display, 8GB Unified Memory, 256GB SSD storage, Backlit Keyboard.'
  },
  {
    id: 'PROD-102',
    name: 'ASUS Vivobook 15 Thin & Light',
    category: 'Laptops',
    price: 45000,
    rating: 4.3,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    description: 'Intel Core i5 12th Gen, 16GB RAM, 512GB SSD, Anti-Glare FHD Display.'
  },
  {
    id: 'PROD-103',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Headphones',
    price: 25000,
    rating: 4.7,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Industry Leading Noise Canceling with 2 Processors, 8 Mics, 30-hour battery life.'
  },
  {
    id: 'PROD-104',
    name: 'OnePlus 12R 5G Smartphone',
    category: 'Smartphones',
    price: 39999,
    rating: 4.6,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    description: '16GB RAM, 256GB Storage, Snapdragon 8 Gen 2, 5500 mAh battery with 100W SUPERVOOC.'
  },
  {
    id: 'PROD-105',
    name: 'Apple Watch SE (2nd Gen)',
    category: 'Smartwatches',
    price: 25000,
    rating: 4.5,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: '44mm GPS Aluminum Case, Retina Display, Workout Tracking, Heart Rate Notifications.'
  },
  {
    id: 'PROD-106',
    name: 'Canon EOS 3000D DSLR Camera',
    category: 'Cameras',
    price: 34999,
    rating: 4.4,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    description: '18.0 MP APS-C CMOS Sensor, DIGIC 4+ Image Processor, 9-point AF with 1 centre cross-type AF point.'
  },
  {
    id: 'PROD-107',
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    category: 'Audio',
    price: 12000,
    rating: 4.6,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    description: '2-Way Speaker System, IP67 Waterproof and Dustproof, 12 Hours of Playtime.'
  },
  {
    id: 'PROD-108',
    name: 'HP Pavilion 15 Gaming Laptop',
    category: 'Laptops',
    price: 65000,
    rating: 4.5,
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    description: 'AMD Ryzen 5 5600H, 8GB DDR4, NVIDIA GeForce GTX 1650 4GB, 144Hz FHD.'
  },
  {
    id: 'PROD-109',
    name: 'Samsung Galaxy Watch 6 Bluetooth',
    category: 'Smartwatches',
    price: 18000,
    rating: 4.4,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
    description: 'Bluetooth 40mm, Sapphire Crystal Glass, Advanced Sleep Coaching, Body Composition Analysis.'
  },
  {
    id: 'PROD-110',
    name: 'Samsung Galaxy S23 FE 5G',
    category: 'Smartphones',
    price: 45000,
    rating: 4.5,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
    description: 'Dynamic AMOLED 2X Display, 50MP Camera with Nightography, Exynos 2200 Octa-Core.'
  },
  {
    id: 'PROD-111',
    name: 'Dell 27-inch 4K UHD IPS Monitor',
    category: 'Monitors',
    price: 28999,
    rating: 4.6,
    stock: 11,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-thin bezel design, 99% sRGB color gamut, AMD FreeSync, USB-C 65W power delivery.'
  },
  {
    id: 'PROD-112',
    name: 'Logitech MX Master 3S Wireless Mouse',
    category: 'Accessories',
    price: 8995,
    rating: 4.9,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    description: 'Quiet clicks, 8K DPI any-surface tracking, MagSpeed electromagnetic scrolling.'
  },
  {
    id: 'PROD-113',
    name: 'Keychron K2 Pro Mechanical Keyboard',
    category: 'Accessories',
    price: 9499,
    rating: 4.7,
    stock: 16,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    description: 'Wireless Bluetooth & Type-C wired, QMK/VIA programmable, Hot-swappable RGB.'
  },
  {
    id: 'PROD-114',
    name: 'GoPro HERO12 Black Action Camera',
    category: 'Cameras',
    price: 37990,
    rating: 4.7,
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
    description: '5.3K60 Ultra HD video, HyperSmooth 6.0 video stabilization, HDR Photo + Video.'
  },
  {
    id: 'PROD-115',
    name: 'Apple iPad 10th Gen 64GB Wi-Fi',
    category: 'Tablets',
    price: 33900,
    rating: 4.6,
    stock: 19,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    description: '10.9-inch Liquid Retina display, A14 Bionic chip, Landscape 12MP Ultra Wide front camera.'
  },
  {
    id: 'PROD-116',
    name: 'Sony SRS-XB100 Compact Wireless Speaker',
    category: 'Audio',
    price: 4490,
    rating: 4.3,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80',
    description: 'Compact body with powerful sound, Extra Bass, IP67 water and dust resistant, 16h battery.'
  },
  {
    id: 'PROD-117',
    name: 'boAt Rockerz 450 On-Ear Headphones',
    category: 'Headphones',
    price: 1499,
    rating: 4.2,
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    description: '40mm Dynamic Drivers, 15 Hours Playback, Adaptive Headband, Soft Padded Earcups.'
  },
  {
    id: 'PROD-118',
    name: 'Noise ColorFit Pulse 3 Smartwatch',
    category: 'Smartwatches',
    price: 1999,
    rating: 4.1,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    description: '1.96-inch TFT Display, Bluetooth Calling, 100+ Sports Modes, Auto Health Tracking.'
  },
  {
    id: 'PROD-119',
    name: 'Samsung Galaxy Tab S9 FE (Wi-Fi 128GB)',
    category: 'Tablets',
    price: 36999,
    rating: 4.7,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80',
    description: '10.9-inch 90Hz Display, S Pen included in box, IP68 Water & Dust Resistant, Exynos 1380.'
  },
  {
    id: 'PROD-120',
    name: 'Sony DualSense Wireless Controller',
    category: 'Gaming',
    price: 5990,
    rating: 4.8,
    stock: 26,
    imageUrl: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80',
    description: 'Haptic feedback, dynamic adaptive triggers, built-in microphone for PS5 & PC gaming.'
  },
  {
    id: 'PROD-121',
    name: 'ASUS ROG Strix G16 Gaming Laptop',
    category: 'Gaming',
    price: 114990,
    rating: 4.9,
    stock: 7,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    description: 'Intel Core i7 13th Gen, 16GB DDR5, 1TB NVMe SSD, NVIDIA GeForce RTX 4060 8GB GDDR6, 165Hz FHD+.'
  },
  {
    id: 'PROD-122',
    name: 'Redmi Note 13 Pro 5G (8GB/256GB)',
    category: 'Smartphones',
    price: 24999,
    rating: 4.5,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    description: '200MP OIS Ultra-Clear Camera, 1.5K AMOLED 120Hz curved display, Snapdragon 7s Gen 2, 67W Turbo Charge.'
  },
  {
    id: 'PROD-123',
    name: 'Sennheiser Accentum Plus Wireless ANC',
    category: 'Headphones',
    price: 14990,
    rating: 4.6,
    stock: 17,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80',
    description: '50-hour battery life, Hybrid Adaptive ANC, Touch gesture controls, Sound personalization app.'
  },
  {
    id: 'PROD-124',
    name: 'Realme 12 Pro+ 5G Periscope Telephoto',
    category: 'Smartphones',
    price: 29999,
    rating: 4.4,
    stock: 21,
    imageUrl: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&auto=format&fit=crop&q=80',
    description: '64MP Periscope Portrait Camera with 3x Optical Zoom, Luxury Watch design, Snapdragon 7s Gen 2.'
  },
  {
    id: 'PROD-125',
    name: 'OnePlus Bullets Wireless Z2 Neckband',
    category: 'Headphones',
    price: 1999,
    rating: 4.3,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    description: '12.4mm Bass Driver, 30 Hours Battery Life, 10 Mins Fast Charge for 20 Hours Music, IP55.'
  },
  {
    id: 'PROD-126',
    name: 'LG 24-inch UltraGear IPS 144Hz',
    category: 'Monitors',
    price: 13499,
    rating: 4.6,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1547119957-637f8679db17?w=600&auto=format&fit=crop&q=80',
    description: 'Full HD IPS panel, 1ms MBR, 144Hz refresh rate, AMD FreeSync Premium, sRGB 99%.'
  },
  {
    id: 'PROD-127',
    name: 'Razer DeathAdder Essential Mouse',
    category: 'Gaming',
    price: 1499,
    rating: 4.5,
    stock: 38,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
    description: '6400 DPI optical sensor, 5 hyperesponse buttons, ergonomic right-handed form factor.'
  },
  {
    id: 'PROD-128',
    name: 'Cosmic Byte Firefly Mechanical Keyboard',
    category: 'Accessories',
    price: 2199,
    rating: 4.3,
    stock: 32,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&auto=format&fit=crop&q=80',
    description: 'Outemu Blue Clicky Switches, Tenkeyless 87 keys design, Full RGB LED backlighting.'
  },
  {
    id: 'PROD-129',
    name: 'Marshall Emberton II Bluetooth Speaker',
    category: 'Audio',
    price: 15999,
    rating: 4.8,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    description: '30+ hours portable playtime, True Stereophonic 360 sound, IP67 rugged dust and waterproof.'
  },
  {
    id: 'PROD-130',
    name: 'DJI Osmo Pocket 3 Creator Combo',
    category: 'Cameras',
    price: 53990,
    rating: 4.9,
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop&q=80',
    description: '1-inch CMOS Sensor, 4K/120fps recording, 3-axis mechanical stabilization, 2-inch rotatable screen.'
  },
  {
    id: 'PROD-131',
    name: 'Anker 737 Power Bank 24000mAh',
    category: 'Accessories',
    price: 9999,
    rating: 4.8,
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&auto=format&fit=crop&q=80',
    description: '140W Two-Way Fast Charging, Smart Digital Display, Power Delivery 3.1, charges 3 devices.'
  },
  {
    id: 'PROD-132',
    name: 'Fire-Boltt Phoenix Pro Bluetooth Watch',
    category: 'Smartwatches',
    price: 1499,
    rating: 4.0,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&auto=format&fit=crop&q=80',
    description: '1.39-inch Round Display, Bluetooth calling, AI Voice assistant, 120+ sports modes, metal body.'
  }
];
