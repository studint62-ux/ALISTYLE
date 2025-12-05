import { Product } from '../types';
import { searchMockDatabase } from './mockProductDatabase';

/**
 * Service to fetch products.
 * Currently uses the Mock Database for the "Expert Hub" features.
 */

export const fetchAliExpressData = async (keyword: string, lang: 'en' | 'ar' = 'en'): Promise<Product> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  // Try to find a match in our new "Smart" database first
  const smartResults = searchMockDatabase({ query: keyword });
  
  if (smartResults.length > 0) {
    const item = smartResults[Math.floor(Math.random() * smartResults.length)];
    // Localize title if needed
    if (lang === 'ar') {
      return { ...item, title: `(AR) ${item.title}` };
    }
    return item;
  }

  // Fallback to random generation if no smart match found
  const randomPrice = (Math.random() * 40) + 5;
  const mockTitles: Record<string, string> = {
    en: `${keyword} - High Quality Fashion Trending 2024`,
    ar: `${keyword} - موضة عالية الجودة ترند 2024`
  };

  return {
    id: Math.random().toString(36).substr(2, 9),
    title: mockTitles[lang],
    price: parseFloat(randomPrice.toFixed(2)),
    currency: 'USD',
    imageUrl: `https://source.unsplash.com/500x500/?fashion,${encodeURIComponent(keyword.split(' ').slice(-1)[0])}`, 
    rating: 4.5,
    reviews: Math.floor(Math.random() * 500) + 50,
    productUrl: 'https://aliexpress.com',
    category: keyword,
    tags: { fabrics: [], occasions: [], bodyTypes: [], weather: [] }
  };
};
