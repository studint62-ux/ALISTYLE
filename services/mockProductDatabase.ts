import { Product } from '../types';

export const MOCK_DATABASE: Product[] = [
  // --- CASUAL / SUMMER ---
  {
    id: 'c1',
    title: 'Men Breathable Linen Shirt Casual Beach Top',
    price: 15.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500',
    rating: 4.7,
    reviews: 120,
    productUrl: '#',
    category: 'Top',
    tags: {
      fabrics: ['linen', 'cotton'],
      occasions: ['casual', 'beach', 'vacation'],
      bodyTypes: ['rectangle', 'oval', 'inverted-triangle'],
      weather: ['hot', 'mild']
    }
  },
  {
    id: 'c2',
    title: 'Boho Floral Maxi Dress V-Neck Summer',
    price: 22.50,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500',
    rating: 4.8,
    reviews: 340,
    productUrl: '#',
    category: 'Dress',
    tags: {
      fabrics: ['viscose', 'polyester'],
      occasions: ['casual', 'wedding-guest', 'beach'],
      bodyTypes: ['hourglass', 'triangle', 'rectangle'],
      weather: ['hot']
    }
  },
  // --- FORMAL / WEDDING ---
  {
    id: 'f1',
    title: 'Slim Fit Navy Blue Suit Blazer',
    price: 45.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500',
    rating: 4.6,
    reviews: 89,
    productUrl: '#',
    category: 'Outerwear',
    tags: {
      fabrics: ['wool', 'polyester'],
      occasions: ['wedding', 'formal', 'office'],
      bodyTypes: ['rectangle', 'inverted-triangle'],
      weather: ['mild', 'cold']
    }
  },
  {
    id: 'f2',
    title: 'Elegant Satin Evening Gown Emerald Green',
    price: 38.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=500',
    rating: 4.9,
    reviews: 210,
    productUrl: '#',
    category: 'Dress',
    tags: {
      fabrics: ['satin', 'silk'],
      occasions: ['wedding', 'formal'],
      bodyTypes: ['hourglass', 'triangle'],
      weather: ['mild', 'cold']
    }
  },
  // --- GYM / ACTIVE ---
  {
    id: 's1',
    title: 'Quick Dry Compression Running Shirt',
    price: 12.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=500',
    rating: 4.5,
    reviews: 500,
    productUrl: '#',
    category: 'Top',
    tags: {
      fabrics: ['spandex', 'polyester'],
      occasions: ['gym', 'running'],
      bodyTypes: ['rectangle', 'inverted-triangle', 'hourglass'],
      weather: ['hot', 'mild', 'cold']
    }
  },
  {
    id: 's2',
    title: 'High Waist Seamless Yoga Leggings',
    price: 18.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=500',
    rating: 4.8,
    reviews: 1200,
    productUrl: '#',
    category: 'Bottom',
    tags: {
      fabrics: ['nylon', 'spandex'],
      occasions: ['gym', 'yoga'],
      bodyTypes: ['hourglass', 'rectangle', 'triangle'],
      weather: ['hot', 'mild', 'cold']
    }
  },
  // --- COLD WEATHER ---
  {
    id: 'w1',
    title: 'Thick Puffer Jacket Oversized',
    price: 42.50,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=500',
    rating: 4.7,
    reviews: 150,
    productUrl: '#',
    category: 'Outerwear',
    tags: {
      fabrics: ['polyester', 'down'],
      occasions: ['casual', 'travel'],
      bodyTypes: ['rectangle', 'inverted-triangle'],
      weather: ['cold']
    }
  },
  {
    id: 'w2',
    title: 'Merino Wool Turtleneck Sweater',
    price: 35.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500',
    rating: 4.6,
    reviews: 80,
    productUrl: '#',
    category: 'Top',
    tags: {
      fabrics: ['wool', 'cashmere'],
      occasions: ['casual', 'office'],
      bodyTypes: ['rectangle', 'triangle'],
      weather: ['cold']
    }
  },
  // --- ACCESSORIES ---
  {
    id: 'a1',
    title: 'Classic Leather Belt',
    price: 8.50,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500',
    rating: 4.4,
    reviews: 60,
    productUrl: '#',
    category: 'Accessory',
    tags: {
      fabrics: ['leather'],
      occasions: ['formal', 'casual', 'office'],
      bodyTypes: ['hourglass', 'rectangle', 'triangle', 'inverted-triangle', 'oval'],
      weather: ['hot', 'mild', 'cold']
    }
  }
];

export const searchMockDatabase = (filters: {
  query?: string;
  weather?: string;
  occasion?: string;
  bodyType?: string;
}): Product[] => {
  return MOCK_DATABASE.filter(item => {
    let match = true;

    // Text Search
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.category.toLowerCase().includes(q)) {
        match = false;
      }
    }

    // Expert Logic Filtering
    if (filters.weather && !item.tags.weather.includes(filters.weather.toLowerCase())) match = false;
    if (filters.occasion && !item.tags.occasions.includes(filters.occasion.toLowerCase())) match = false;
    if (filters.bodyType && !item.tags.bodyTypes.includes(filters.bodyType.toLowerCase())) match = false;

    return match;
  });
};
