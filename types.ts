export interface VisionResult {
  styleName: string;
  detectedItems: GeneratedItemQuery[];
}

export interface GeneratedItemQuery {
  category: string;
  searchQuery: string;
  reasoning: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  productUrl: string;
  category: string;
  // New detailed tags for the Expert System
  tags: {
    fabrics: string[];    // e.g., ['linen', 'cotton', 'polyester', 'wool']
    occasions: string[];  // e.g., ['wedding', 'gym', 'casual', 'office']
    bodyTypes: string[];  // e.g., ['triangle', 'rectangle', 'hourglass', 'inverted-triangle', 'oval']
    weather: string[];    // e.g., ['hot', 'cold', 'mild']
  };
}

export interface Outfit {
  items: Product[];
  totalPrice: number;
}
