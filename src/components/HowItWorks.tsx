import React from 'react';
import { Sprout, TrendingUp, Truck, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface HowItWorksProps {
  language: Language;
  onExploreClick: () => void;
  onFarmerClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  language,
  onExploreClick,
  onFarmerClick,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  const steps = [
    {
      step: '01',
      title: t('how.step1Title'),
      desc: t('how.step1Desc'),
      icon: Sprout,
    },
    {
      step: '02',
      title: t('how.step2Title'),
      desc: t('how.step2Desc'),
      icon: TrendingUp,
    },
    {
      step: '03',
      title: t('how.step3Title'),
      desc: t('how.step3Desc'),
      icon: Truck,
    },
    {
      step: '04',
      title: t('how.step4Title'),
      desc: t('how.step4Desc'),
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-14 bg-stone-100/60 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            {t('how.kicker')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif">
            {t('how.title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t('how.subtitle')}
          </p>
        </div>

        {/* 4-Step Grid with Natural Editorial Numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {language === 'te' ? 'దశ' : language === 'hi' ? 'चरण' : 'Step'} {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
                      <IconComponent className="w-4 h-4 text-emerald-700" />
                    </div>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm leading-snug font-serif">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white font-serif">
              {t('how.ctaTitle')}
            </h3>
            <p className="text-xs text-emerald-200/90 max-w-xl">
              {t('how.ctaSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onFarmerClick}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              {t('how.ctaBtn')}
            </button>
            <button
              onClick={onExploreClick}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              {t('hero.ctaBrowse')}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
