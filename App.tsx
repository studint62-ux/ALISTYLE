import React, { useState } from 'react';
import { deconstructStyleRequest } from './services/geminiService';
import { fetchAliExpressData } from './services/aliExpressService';
import { Outfit } from './types';
import { OutfitBoard } from './components/OutfitBoard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Sidebar } from './components/Sidebar';
import { EventStylist } from './components/EventStylist';
import { FitFinder } from './components/FitFinder';

const TRANSLATIONS = {
  en: {
    title: "AliStyle AI Hub",
    subtitle: "Describe your occasion, get a complete outfit.",
    placeholder: "e.g., Casual outfit for a summer beach party for men...",
    generateBtn: "Generate Outfit",
    totalPrice: "Estimated Total",
    buyNow: "Buy Now",
    price: "Price",
    loadingAI: "Deconstructing style request...",
    loadingAli: "Finding best deals on AliExpress...",
    error: "Something went wrong. Please try again."
  },
  ar: {
    title: "علي ستايل Hub",
    subtitle: "اوصف المناسبة، واحصل على طقم كامل.",
    placeholder: "مثال: طقم كاجوال لحفلة شاطئ صيفية للرجال...",
    generateBtn: "صمم مظهري",
    totalPrice: "إجمالي السعر المتوقع",
    buyNow: "اشتر الآن",
    price: "السعر",
    loadingAI: "جاري تحليل طلبك...",
    loadingAli: "جاري البحث عن أفضل العروض...",
    error: "حدث خطأ ما. يرجى المحاولة مرة أخرى."
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('event-stylist');
  const [userPrompt, setUserPrompt] = useState('');
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isDark, setIsDark] = useState<boolean>(true);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;

    setLoadingStep(t.loadingAI);
    setOutfit(null);

    try {
      const itemsQuery = await deconstructStyleRequest(userPrompt, lang);
      setLoadingStep(t.loadingAli);
      const productPromises = itemsQuery.map(item => 
        fetchAliExpressData(item.searchQuery, lang)
      );
      const products = await Promise.all(productPromises);
      const total = products.reduce((sum, p) => sum + p.price, 0);

      setOutfit({
        items: products,
        totalPrice: total
      });
    } catch (error) {
      console.error(error);
      alert(t.error);
    } finally {
      setLoadingStep(null);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isRTL={isRTL} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40">
           <h1 className="font-bold text-lg hidden md:block opacity-50">{t.title}</h1>
           
           <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>
              <button 
                onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
                className="text-sm font-bold text-gray-500 hover:text-ali-red dark:hover:text-white transition-colors"
              >
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
           </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* TAB 1: AI TEXT SEARCH (Original Logic) */}
          {activeTab === 'ai-search' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black">{t.subtitle}</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm outline-none border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-ali-red"
                  placeholder={t.placeholder}
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <button
                  onClick={handleGenerate}
                  disabled={!!loadingStep}
                  className="bg-ali-red hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg"
                >
                  {loadingStep ? '...' : t.generateBtn}
                </button>
              </div>

              {loadingStep && <LoadingSpinner text={loadingStep} />}
              
              {outfit && (
                <OutfitBoard 
                  outfit={outfit} 
                  labels={{ total: t.totalPrice, buyNow: t.buyNow, price: t.price }} 
                />
              )}
            </div>
          )}

          {/* TAB 2: EVENT STYLIST */}
          {activeTab === 'event-stylist' && (
            <div className="max-w-5xl mx-auto">
              <EventStylist isRTL={isRTL} lang={lang} />
            </div>
          )}

          {/* TAB 3: FIT FINDER */}
          {activeTab === 'fit-finder' && (
            <div className="max-w-5xl mx-auto">
              <FitFinder isRTL={isRTL} lang={lang} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
