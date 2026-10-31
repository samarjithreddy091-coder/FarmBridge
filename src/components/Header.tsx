import React from 'react';
import { ShoppingBag, Globe2, Sparkles, Sprout, Play } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenDemoVideo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenDemoVideo,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Wordmark Brand Zone */}
        <button
          onClick={() => onSelectTab('explore')}
          className="flex items-center gap-2.5 text-left text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-sm whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-100 shadow-sm">
            <Sprout className="w-5 h-5 text-emerald-300" />
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-950 font-serif">
            {t('brand.name')}
          </span>
        </button>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('explore')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'explore'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-stone-950 hover:border-b-2 hover:border-stone-300'
            }`}
          >
            {t('nav.explore')}
          </button>

          <button
            onClick={() => onSelectTab('mandi')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'mandi'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-stone-950 hover:border-b-2 hover:border-stone-300'
            }`}
          >
            {t('nav.mandiRadar')}
          </button>

          <button
            onClick={() => onSelectTab('doctor')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'doctor'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-stone-950 hover:border-b-2 hover:border-stone-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('nav.cropDoctor')}</span>
          </button>

          <button
            onClick={() => onSelectTab('farmer')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'farmer'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-stone-950 hover:border-b-2 hover:border-stone-300'
            }`}
          >
            {t('nav.farmerPortal')}
          </button>

          <button
            onClick={() => onSelectTab('howItWorks')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'howItWorks'
                ? 'text-emerald-800 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-stone-950 hover:border-b-2 hover:border-stone-300'
            }`}
          >
            {t('nav.howItWorks')}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area (Demo Video, Language Selector & Cart) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Functionalities Demo Video Button */}
          <button
            onClick={onOpenDemoVideo}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer"
            title={t('nav.videoTitle')}
          >
            <Play className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
            <span className="hidden sm:inline">{t('nav.video')}</span>
          </button>

          {/* Subtle Language Selector */}
          <div className="relative flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
            <Globe2 className="w-3.5 h-3.5 text-stone-500 ml-2 mr-1" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              aria-label="Language"
              className="bg-transparent text-xs font-semibold text-stone-700 py-1 pr-2 rounded focus:outline-none cursor-pointer"
            >
              <option value="en">EN</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Open Cart"
            className="relative flex items-center gap-2 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">{t('nav.basket')}</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-emerald-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-100 bg-stone-50 px-2 py-2 overflow-x-auto text-xs">
        <button
          onClick={() => onSelectTab('explore')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentTab === 'explore' ? 'bg-emerald-800 text-white' : 'text-stone-600'}`}
        >
          {t('nav.explore')}
        </button>
        <button
          onClick={() => onSelectTab('mandi')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentTab === 'mandi' ? 'bg-emerald-800 text-white' : 'text-stone-600'}`}
        >
          {t('nav.mandiRadar')}
        </button>
        <button
          onClick={() => onSelectTab('doctor')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentTab === 'doctor' ? 'bg-emerald-800 text-white' : 'text-stone-600'}`}
        >
          {t('nav.cropDoctor')}
        </button>
        <button
          onClick={() => onSelectTab('farmer')}
          className={`px-3 py-1 rounded-md whitespace-nowrap ${currentTab === 'farmer' ? 'bg-emerald-800 text-white' : 'text-stone-600'}`}
        >
          {t('nav.farmerPortal')}
        </button>
      </div>
    </header>
  );
};
