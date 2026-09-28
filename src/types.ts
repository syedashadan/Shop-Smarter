export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in INR (₹)
  rating: number;
  stock: number;
  imageUrl: string;
  description?: string;
}

export type SortAlgorithmType = 'merge' | 'quick';
export type SortOrderType = 'asc' | 'desc';

export interface SortMetrics {
  algorithm: string;
  order: SortOrderType;
  productCount: number;
  executionTimeMs: number;
  executionTimeMicroseconds: number;
  comparisons: number;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  timestamp: string;
}

export interface BinarySearchStep {
  stepNumber: number;
  lowIndex: number;
  highIndex: number;
  midIndex: number;
  midPrice: number;
  targetPrice: number;
  action: string;
  explanation: string;
}

export interface BinarySearchResult {
  searchedPrice: number;
  found: boolean;
  matchedProducts: Product[];
  steps: BinarySearchStep[];
  comparisons: number;
  executionTimeMs: number;
  executionTimeMicroseconds: number;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface AlgorithmComparisonRun {
  mergeSort: {
    executionTimeMs: number;
    comparisons: number;
    bestCase: string;
    averageCase: string;
    worstCase: string;
    spaceComplexity: string;
  };
  quickSort: {
    executionTimeMs: number;
    comparisons: number;
    bestCase: string;
    averageCase: string;
    worstCase: string;
    spaceComplexity: string;
  };
  fasterAlgorithm: 'Merge Sort' | 'Quick Sort' | 'Tie';
  timeDifferenceMs: number;
  datasetSize: number;
  runAt: string;
}

export interface VisualizationStep {
  array: number[]; // prices
  activeIndices: number[]; // currently being compared or swapped
  pivotIndex?: number;
  leftBound?: number;
  rightBound?: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface PurchasedItem {
  id: string;
  orderId: string;
  product: Product;
  quantity: number;
  pricePaid: number;
  purchaseDate: string;
  deliveryStatus: 'Delivered' | 'In Transit' | 'Confirmed';
  trackingNumber: string;
  deliveryEstimate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  membershipTier: string;
  joinedDate: string;
  studentId: string;
  university: string;
  deliveryAddress: string;
  avatarUrl: string;
  totalSavedDiscount: number;
}
