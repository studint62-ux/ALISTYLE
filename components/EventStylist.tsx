import React, { useState } from 'react';
import { searchMockDatabase } from '../services/mockProductDatabase';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface EventStylistProps {
  isRTL: boolean;
  lang: 'en' | 'ar';
}

export const EventStylist: React.FC<EventStylistProps> = ({ isRTL, lang }) => {
  const [occasion, setOccasion] = useState('Casual');
  const [weather, setWeather] = useState('Mild');
  const [city, setCity] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    // Logic: Cross reference Occasion + Weather
    const matches = searchMockDatabase({
      occasion: occasion,
      weather: weather
    });
    setResults(matches);
    setHasSearched(true);
  };

  const getFabricTip = () => {
    if (weather === 'Hot') return lang === 'ar' ? 'الطقس حار: نبحث عن الكتان والقطن.' : 'Weather is Hot: Prioritizing Linen & Cotton.';
    if (weather === 'Cold') return lang === 'ar' ? 'الطقس بارد: نبحث عن الصوف والملابس الثقيلة.' : 'Weather is Cold: Prioritizing Wool & Layering.';
    return lang === 'ar' ? 'طقس معتدل: خيارات متنوعة.' : 'Weather is Mild: Versatile fabrics selected.';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-2">{lang === 'ar' ? 'منسق المناسبات' : 'Event Stylist'}</h2>
        <p className="opacity-90">{lang === 'ar' ? 'دع الذكاء الاصطناعي يختار ملابسك بناءً على الطقس والمناسبة.' : 'Let AI curate your look based on real-world constraints.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Occasion Input */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">{lang === 'ar' ? 'المناسبة' : 'Event Type'}</label>
          <select 
            value={occasion} 
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-ali-red"
          >
            <option value="Casual">Casual / Daily</option>
            <option value="Wedding">Wedding / Formal</option>
            <option value="Gym">Gym / Active</option>
            <option value="Office">Office / Work</option>
          </select>
        </div>

        {/* Weather Input */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">{lang === 'ar' ? 'الطقس' : 'Weather'}</label>
          <select 
            value={weather} 
            onChange={(e) => setWeather(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-ali-red"
          >
            <option value="Hot">Hot (25°C+)</option>
            <option value="Mild">Mild (15-24°C)</option>
            <option value="Cold">Cold (&lt;15°C)</option>
          </select>
        </div>

         {/* City Input (Cosmetic for now) */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">{lang === 'ar' ? 'المدينة' : 'City'}</label>
          <input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={lang === 'ar' ? 'دبي، لندن...' : 'Dubai, London...'}
            className="w-full bg-gray-50 dark:bg-gray-700 border-none rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-ali-red"
          />
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-transform"
      >
        {lang === 'ar' ? 'بحث عن تنسيقات' : 'Curate My Look'}
      </button>

      {hasSearched && (
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <span className="text-2xl">💡</span>
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              {getFabricTip()}
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{lang === 'ar' ? 'النتائج المقترحة' : 'Suggested Items'}</h3>
          
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              {lang === 'ar' ? 'لا توجد نتائج مطابقة تماماً. جرب معايير أخرى.' : 'No exact matches found for this specific combo. Try different settings.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};