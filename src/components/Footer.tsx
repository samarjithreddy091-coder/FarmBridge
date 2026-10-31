import React from 'react';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface FooterProps {
  language: Language;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectTab }) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  return (
    <footer className="bg-stone-900 text-stone-300 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-200">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-serif tracking-tight">
                {t('brand.name')}
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              {t('footer.mission')}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {language === 'te'
                  ? 'NPOP మరియు APEDA ప్రమాణాలకు అనుగుణమైన వేదిక'
                  : language === 'hi'
                  ? 'NPOP और APEDA मानकों के अनुरूप कृषि मंच'
                  : 'NPOP & APEDA Aligned Agricultural Platform'}
              </span>
            </div>
          </div>

          {/* Direct Marketplace Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {t('nav.explore')}
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('market.vegetables')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('market.grains')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('market.spices')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('market.fruits')}
                </button>
              </li>
            </ul>
          </div>

          {/* Farmer & Intelligence Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {t('footer.linksQuick')}
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('mandi')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.mandiRadar')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('doctor')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.cropDoctor')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('farmer')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.farmerPortal')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('howItWorks')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t('nav.howItWorks')}
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs & Contact */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {t('footer.linksSupport')}
            </h4>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              {language === 'te'
                ? 'నాసిక్ క్లస్టర్ (మహారాష్ట్ర) · కోలార్ (కర్ణాటక) · గుంటూరు (ఆంధ్రప్రదేశ్) · డెహ్రాడూన్ (ఉత్తరాఖండ్) · సిమ్లా (హిమాచల్ ప్రదేశ్)'
                : language === 'hi'
                ? 'नासिक क्लस्टर (महाराष्ट्र) · कोलार (कर्नाटक) · गुंटूर (आंध्र प्रदेश) · देहरादून (उत्तराखंड) · शिमला (हिमाचल प्रदेश)'
                : 'Nashik Cluster (Maharashtra) · Kolar (Karnataka) · Guntur (Andhra Pradesh) · Dehradun (Uttarakhand) · Shimla (Himachal Pradesh)'}
            </p>
            <div className="text-[11px] text-stone-500 pt-1">
              {t('footer.contact')}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            {t('footer.copyright')}
          </div>

          <div className="flex items-center gap-4">
            {/* Direct ZIP Download Button for GitHub */}
            <a
              href="/farmbridge-ai.zip"
              download="farmbridge-ai.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-medium transition-colors"
              title="Download full project ZIP archive to push to GitHub"
            >
              <span>📦 Download Source Code (.ZIP for GitHub)</span>
            </a>

            <div className="flex items-center gap-1">
              <span>
                {language === 'te'
                  ? 'భారతీయ రైతుల సంక్షేమం కోసం అంకితం'
                  : language === 'hi'
                  ? 'भारतीय किसानों के कल्याण हेतु समर्पित'
                  : 'Cultivated with care for Indian farmers'}
              </span>
              <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
