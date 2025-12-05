import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  labels?: {
    buyNow: string;
    price: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, labels }) => {
  // Use a fallback image if the dynamic one fails or is generic
  const imageSrc = product.imageUrl.includes('source.unsplash.com') 
    ? product.imageUrl 
    : `https://via.placeholder.com/500?text=${encodeURIComponent(product.category)}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={imageSrc} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500?text=Product+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 dark:text-gray-200">
          ★ {product.rating}
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">{product.category}</div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-3 h-10">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xs text-gray-400 dark:text-gray-500 block">{labels?.price || 'Price'}</span>
            <span className="text-xl font-bold text-ali-red">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <a 
            href={product.productUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
          >
            {labels?.buyNow || 'Buy Now'}
          </a>
        </div>
      </div>
    </div>
  );
};