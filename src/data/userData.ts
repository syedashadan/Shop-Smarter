import { CartItem, PurchasedItem, UserProfile } from '../types';
import { INITIAL_PRODUCTS } from './sampleProducts';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Kanwal',
  email: 'kanwal14122006@gmail.com',
  phone: '+91 98765 43210',
  role: 'CS Student & DAA Algorithms Scholar',
  membershipTier: 'SmartShop Prime Platinum',
  joinedDate: 'August 2024',
  studentId: 'CS-2024-DAA-089',
  university: 'Department of Computer Science & Engineering',
  deliveryAddress: 'Hostel Block 4, Campus Academic Zone, Tech City, Punjab 140413',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  totalSavedDiscount: 4850
};

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    product: INITIAL_PRODUCTS[2], // Sony WH-1000XM5
    quantity: 1,
    addedAt: '2026-09-15T14:32:00Z'
  },
  {
    product: INITIAL_PRODUCTS[5], // Keychron K2
    quantity: 2,
    addedAt: '2026-09-16T08:15:00Z'
  }
];

export const INITIAL_PURCHASED_ITEMS: PurchasedItem[] = [
  {
    id: 'PUR-8901',
    orderId: 'ORD-2026-98124',
    product: INITIAL_PRODUCTS[0], // Apple MacBook Air M2
    quantity: 1,
    pricePaid: 89999,
    purchaseDate: '2026-09-02T11:20:00Z',
    deliveryStatus: 'Delivered',
    trackingNumber: 'BLUEDART-8829104',
    deliveryEstimate: 'Delivered on Sep 5, 2026'
  },
  {
    id: 'PUR-8902',
    orderId: 'ORD-2026-94211',
    product: INITIAL_PRODUCTS[6], // Logitech MX Master 3S
    quantity: 1,
    pricePaid: 8495,
    purchaseDate: '2026-09-08T16:45:00Z',
    deliveryStatus: 'Delivered',
    trackingNumber: 'DELHIVERY-771923',
    deliveryEstimate: 'Delivered on Sep 11, 2026'
  },
  {
    id: 'PUR-8903',
    orderId: 'ORD-2026-99302',
    product: INITIAL_PRODUCTS[3], // OnePlus 12R 5G
    quantity: 1,
    pricePaid: 39999,
    purchaseDate: '2026-09-14T09:10:00Z',
    deliveryStatus: 'In Transit',
    trackingNumber: 'EKART-9920182',
    deliveryEstimate: 'Arriving Tomorrow, Sep 17'
  }
];
