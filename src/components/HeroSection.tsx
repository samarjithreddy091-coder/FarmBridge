import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, Sparkles, Sprout, Play } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface HeroSectionProps {
  language: Language;
  onExploreClick: () => void;
  onFarmerClick: () => void;
  onDoctorClick: () => void;
  onDemoVideoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreClick,
  onFarmerClick,
  onDoctorClick,
  onDemoVideoClick,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-stone-50 to-emerald-50/30 pt-8 pb-12 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed natural kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{t('hero.badge')}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-600 normal-case font-normal">{t('hero.zeroBrokerage')}</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.12] font-serif" style={{ textWrap: 'balance' }}>
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onDemoVideoClick}
                className="px-5 py-3 text-sm font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-400 border border-emerald-500/80 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-emerald-950 text-emerald-950" />
                <span>{t('hero.watchVideo')}</span>
              </button>

              <button
                onClick={onExploreClick}
                className="px-5 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
              >
                <span>{t('hero.ctaBrowse')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDoctorClick}
                className="px-5 py-3 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg shadow-2xs transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t('hero.ctaDoctor')}</span>
              </button>

              <button
                onClick={onFarmerClick}
                className="px-4 py-3 text-sm font-medium text-stone-600 hover:text-emerald-800 transition-colors focus:outline-none cursor-pointer"
              >
                <span>{t('hero.ctaFarmer')} →</span>
              </button>
            </div>

            {/* Quick Proof Note */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === 'te' ? 'APEDA / NPOP ధృవీకరించిన సేంద్రీయ ప్రమాణాలు' : language === 'hi' ? 'APEDA / NPOP प्रमाणित जैविक मानक' : 'APEDA / NPOP Verified Organic & IPM'}</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>{language === 'te' ? 'APMC మండి ధరల పోలిక' : language === 'hi' ? 'APMC मंडी भाव से बेंचमार्क' : 'APMC Mandi Benchmarked'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real Farm Harvest Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-100 aspect-16/10 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_agricultural_harvest_1793340680828.jpg"
                alt="Direct farm harvest produce crates in Indian organic farmland at golden hour"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Floating Live Price Transparency Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200/80 shadow-lg">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs">
                  <span className="font-semibold text-stone-900">
                    {language === 'te' ? 'నాసిక్ క్లస్టర్ ప్రత్యక్ష లాట్' : language === 'hi' ? 'नासिक क्लस्टर लाइव लॉट' : 'Nashik Cluster Real-Time Lot'}
                  </span>
                  <span className="text-emerald-700 font-bold tabular-nums">
                    {language === 'te' ? 'రైతుకు అందే విలువ 88%' : language === 'hi' ? 'किसान को मिलता है 88% मूल्य' : 'Farmer Receives 88% Value'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-emerald-50/70 p-2 rounded-lg">
                    <div className="text-[10px] text-emerald-800 font-medium">{t('mandi.colFarmBridge')}</div>
                    <div className="text-sm font-extrabold text-emerald-950 tabular-nums">₹28/kg</div>
                  </div>
                  <div className="bg-stone-100/70 p-2 rounded-lg">
                    <div className="text-[10px] text-stone-500 font-medium">{t('mandi.colMandi')}</div>
                    <div className="text-sm font-bold text-stone-600 tabular-nums line-through">₹19/kg</div>
                  </div>
                  <div className="bg-stone-100/70 p-2 rounded-lg">
                    <div className="text-[10px] text-stone-500 font-medium">{t('mandi.colRetail')}</div>
                    <div className="text-sm font-bold text-stone-600 tabular-nums line-through">₹48/kg</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width 4-Column Proof & Metrics Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 text-stone-900">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-serif tabular-nums">+42.5%</div>
            <div className="text-xs font-semibold text-stone-800">{t('metrics.farmerSurplus')}</div>
            <div className="text-[11px] text-stone-500">{t('metrics.farmerSurplusSub')}</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-serif tabular-nums">35.8%</div>
            <div className="text-xs font-semibold text-stone-800">{t('metrics.consumerSavings')}</div>
            <div className="text-[11px] text-stone-500">{t('metrics.consumerSavingsSub')}</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-serif tabular-nums">1,420+</div>
            <div className="text-xs font-semibold text-stone-800">{t('metrics.verifiedGrowers')}</div>
            <div className="text-[11px] text-stone-500">{t('metrics.verifiedGrowersSub')}</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-serif tabular-nums">₹48.5L+</div>
            <div className="text-xs font-semibold text-stone-800">{t('metrics.directPayout')}</div>
            <div className="text-[11px] text-stone-500">{t('metrics.directPayoutSub')}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
