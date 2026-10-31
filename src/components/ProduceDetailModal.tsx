import React from 'react';
import { X, MapPin, Calendar, ShieldCheck, Scale, Phone, UserCheck, ShoppingBag } from 'lucide-react';
import { ProduceItem, Language } from '../types';
import { TRANSLATIONS, getLocalizedProduce } from '../utils/translations';

interface ProduceDetailModalProps {
  item: ProduceItem | null;
  onClose: () => void;
  language: Language;
  onAddToCart: (item: ProduceItem, quantity: number, method: 'pickup' | 'delivery') => void;
}

export const ProduceDetailModal: React.FC<ProduceDetailModalProps> = ({
  item: rawItem,
  onClose,
  language,
  onAddToCart,
}) => {
  if (!rawItem) return null;
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;
  const item = getLocalizedProduce(rawItem, language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
              {t('detail.verifiedPedigree')}
            </span>
            <h3 className="text-lg font-bold text-stone-900 leading-snug font-serif">{item.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Visual & Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-5 h-52 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-emerald-950 font-serif tabular-nums">
                  ₹{item.pricePerUnit}
                </span>
                <span className="text-xs text-stone-500">/{item.unit}</span>
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {t('market.buyerSaves')} {item.mandiBenchmark.buyerSavingsPercent}% {t('market.vsMandi')}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>

              {/* Farmer Profile Card */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold">
                      {item.farmerName[0]}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 flex items-center gap-1 font-serif">
                        <span>{item.farmerName}</span>
                        {item.isFarmerVerified && (
                          <span title="Verified Producer" className="inline-flex items-center">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500">{item.farmName}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-amber-700">★ {item.farmerRating}</div>
                    <div className="text-[10px] text-stone-400">({item.farmerReviewCount} {t('detail.reviews')})</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-stone-600 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.farmerLocation}</span>
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.farmerPhone}</span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Grid of Farm Specifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-[11px] text-stone-500 block">
                {language === 'te' ? 'పంట రకం' : language === 'hi' ? 'फसल की किस्म' : 'Cultivar Variety'}
              </span>
              <span className="font-bold text-stone-800">{item.variety}</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-[11px] text-stone-500 block">{t('market.harvested')}</span>
              <span className="font-bold text-stone-800">{item.harvestDate}</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-[11px] text-stone-500 block">{t('market.available')}</span>
              <span className="font-bold text-stone-800 tabular-nums">{item.availableQuantity} {item.unit}</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-[11px] text-stone-500 block">{t('detail.shelfLife')}</span>
              <span className="font-bold text-emerald-800 tabular-nums">{item.shelfLifeDays} {t('detail.days')}</span>
            </div>
          </div>

          {/* Growing Practice and Soil Health */}
          <div className="space-y-1.5 text-xs">
            <div className="font-bold text-stone-900">{t('detail.irrigation')}:</div>
            <p className="text-stone-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/80 leading-relaxed">
              {item.growingPractice}
            </p>
          </div>

          {/* Certification Badge */}
          <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <div className="font-bold text-stone-900">
                {item.isOrganicCertified ? item.certificationAgency : t('market.ipmPractice')}
              </div>
              <div className="text-stone-500 text-[11px]">
                {language === 'te'
                  ? 'జాతీయ సేంద్రీయ ఉత్పత్తి ప్రమాణాల ప్రకారం పరిశీలించబడినది, రసాయన అవశేషాలు లేని నాణ్యత.'
                  : language === 'hi'
                  ? 'राष्ट्रीय जैविक उत्पादन मानकों के अनुसार ऑडिट किया गया, शून्य कीटनाशक अवशेष की गारंटी।'
                  : 'Audited against National Programme for Organic Production (NPOP) India standards with zero pesticide residue guarantee.'}
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            {t('market.minOrder')}: <strong className="text-stone-800">{item.minOrderQuantity} {item.unit}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {language === 'te' ? 'మూసివేయి' : language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
            <button
              onClick={() => {
                onAddToCart(item, item.minOrderQuantity, 'delivery');
                onClose();
              }}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('market.addToCart')} ({item.minOrderQuantity} {item.unit})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
