import React, { useState } from 'react';
import { searchMockDatabase } from '../services/mockProductDatabase';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FitFinderProps {
  isRTL: boolean;
  lang: 'en' | 'ar';
}

const BODY_TYPES = [
  { id: 'Triangle', label: 'Triangle (Pear)', icon: '🍐', tip: 'Focus on upper body volume, darker bottoms.' },
  { id: 'Inverted-Triangle', label: 'Inverted Triangle', icon: '🔻', tip: 'V-necks and wide leg pants balance broad shoulders.' },
  { id: 'Hourglass', label: 'Hourglass', icon: '⏳', tip: 'Accentuate the waist with fitted styles.' },
  { id: 'Rectangle', label: 'Rectangle', icon: '📏', tip: 'Create curves with belts and ruffled tops.' },
  { id: 'Oval', label: 'Oval (Apple)', icon: '🍎', tip: 'Empire waists and structured fabrics work best.' },
];

export const FitFinder: React.FC<FitFinderProps> = ({ isRTL, lang }) => {
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);

  const handleSelect = (typeId: string) => {
    setSelectedBody(typeId);
    const matches = searchMockDatabase({ bodyType: typeId });
    setResults(matches);
  };

  const selectedTypeInfo = BODY_TYPES.find(t => t.id === selectedBody);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-2">{lang === 'ar' ? 'محلل القوام' : 'Fit Finder'}</h2>
        <p className="opacity-90">{lang === 'ar' ? 'اختر شكل جسمك للحصول على نصائح وتنسيقات تناسبك.' : 'Select your body shape for personalized styling rules.'}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {BODY_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
              selectedBody === type.id 
                ? 'border-ali-red bg-ali-red/5' 
                : 'border-gray-200 dark:border-gray-700 hover:border-ali-red/50'
            }`}
          >
            <span className="text-4xl">{type.icon}</span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 text-center">{type.label}</span>
          </button>
        ))}
      </div>

      {selectedBody && selectedTypeInfo && (
        <div className="animate-slide-up">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-6 rounded-2xl mb-8">
            <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-1">Stylist Note:</h3>
            <p className="text-yellow-900 dark:text-yellow-100">{selectedTypeInfo.tip}</p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            {lang === 'ar' ? `تنسيقات تناسب شكل ${selectedBody}` : `Curated for ${selectedBody} Shape`}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
