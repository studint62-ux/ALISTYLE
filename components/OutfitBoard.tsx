import React from 'react';
import { Outfit } from '../types';
import { ProductCard } from './ProductCard';

interface OutfitBoardProps {
  outfit: Outfit;
  labels: {
    total: string;
    buyNow: string;
    price: string;
  };
}

export const OutfitBoard: React.FC<OutfitBoardProps> = ({ outfit, labels }) => {
  return (
    <div className="animate-slide-up w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Your Curated Look</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Based on AI analysis of your request</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{labels.total}</p>
          <p className="text-4xl font-black text-ali-red">${outfit.totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {outfit.items.map((item) => (
          <ProductCard 
            key={item.id} 
            product={item} 
            labels={{ buyNow: labels.buyNow, price: labels.price }}
          />
        ))}
      </div>
    </div>
  );
};