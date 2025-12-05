import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isRTL: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isRTL }) => {
  const menuItems = [
    { id: 'ai-search', label: { en: 'AI Search', ar: 'بحث ذكي' }, icon: '✨' },
    { id: 'event-stylist', label: { en: 'Event Stylist', ar: 'منسق المناسبات' }, icon: '📅' },
    { id: 'fit-finder', label: { en: 'Fit Finder', ar: 'محلل القوام' }, icon: '📏' },
  ];

  return (
    <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
           <span className="text-2xl font-black text-ali-red tracking-tighter">AliStyle</span>
           <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded font-bold text-gray-600 dark:text-gray-300">HUB</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-ali-red text-white shadow-lg shadow-ali-red/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{isRTL ? item.label.ar : item.label.en}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
          <p className="text-xs text-blue-600 dark:text-blue-300 font-bold mb-1">
            {isRTL ? 'نصيحة اليوم' : 'Pro Tip'}
          </p>
          <p className="text-xs text-blue-800 dark:text-blue-200">
            {isRTL ? 'الأقمشة الكتانية أفضل للطقس الحار.' : 'Linen fabrics breathe better in hot weather.'}
          </p>
        </div>
      </div>
    </div>
  );
};
