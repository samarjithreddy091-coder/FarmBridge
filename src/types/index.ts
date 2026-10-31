export type Language = 'en' | 'te' | 'hi';

export type ProduceCategory =
  | 'all'
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'pulses'
  | 'spices'
  | 'dairy';

export interface ProduceItem {
  id: string;
  name: string;
  category: ProduceCategory;
  variety: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  farmerLocation: string;
  farmerPhone: string;
  farmerRating: number;
  farmerReviewCount: number;
  isFarmerVerified: boolean;
  farmerAvatarUrl?: string;
  imageUrl: string;
  pricePerUnit: number;
  unit: string; // e.g. 'kg', 'quintal', 'crate'
  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  minOrderQuantity: number;
  harvestDate: string;
  availableFrom: string;
  shelfLifeDays: number;
  isOrganicCertified: boolean;
  certificationAgency: string;
  mandiBenchmark: {
    apmcPrice: number;
    retailMarketPrice: number;
    farmerSurplusPercent: number; // extra profit farmer earns vs mandi
    buyerSavingsPercent: number; // discount buyer gets vs supermarket
  };
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  deliveryFeePerUnit: number;
  bulkDiscountEnabled: boolean;
  bulkMinQuantity: number;
  bulkPricePerUnit: number;
  description: string;
  growingPractice: string;
}

export interface CartItem {
  produce: ProduceItem;
  quantity: number;
  fulfilmentMethod: 'pickup' | 'delivery';
}

export interface MandiRecord {
  id: string;
  cropName: string;
  category: string;
  marketName: string;
  state: string;
  modalPricePerKg: number;
  farmBridgePricePerKg: number;
  retailPricePerKg: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  lastUpdated: string;
  aiRecommendation: string;
}

export interface FarmerOrder {
  id: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  buyerType: 'Household' | 'Restaurant' | 'Retailer' | 'Wholesaler';
  items: {
    produceId: string;
    produceName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }[];
  totalAmount: number;
  fulfilmentMethod: 'pickup' | 'delivery';
  status: 'requested' | 'accepted' | 'ready' | 'completed' | 'cancelled';
  orderDate: string;
}
