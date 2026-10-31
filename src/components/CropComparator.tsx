import React from 'react';
import { X, ArrowRight, MapPin, Layers } from 'lucide-react';
import { ProduceItem, Language } from '../types';
import { TRANSLATIONS, getLocalizedProduce } from '../utils/translations';

interface CropComparatorProps {
  comparedItems: ProduceItem[];
  onRemoveItem: (item: ProduceItem) => void;
  onClearAll: () => void;
  language: Language;
  onAddToCart: (item: ProduceItem, quantity: number, method: 'pickup' | 'delivery') => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const CropComparator: React.FC<CropComparatorProps> = ({
  comparedItems,
  onRemoveItem,
  onClearAll,
  language,
  onAddToCart,
  isOpen,
  onClose,
  onOpen,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  if (comparedItems.length === 0) return null;

  const localizedCompared = comparedItems.map((item) => getLocalizedProduce(item, language));

  return (
    <>
      {/* Floating Bottom Notification Bar when items are selected */}
      {!isOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-stone-900/95 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-4 border border-stone-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2 text-xs">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'te'
                ? `పోలుస్తున్న పంటలు: ${comparedItems.length}`
                : language === 'hi'
                ? `तुलना में शामिल फसलें: ${comparedItems.length}`
                : `Comparing ${comparedItems.length} produce lots`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpen}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'te' ? 'పక్కపక్కనే చూడండి' : language === 'hi' ? 'साथ-साथ देखें' : 'View Side-by-Side'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClearAll}
              className="p-1 hover:text-stone-300 text-stone-400 transition-colors text-xs cursor-pointer"
              title={t('market.clearCompare')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Full Comparison Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  {t('compare.drawerTitle')}
                </h3>
                <p className="text-xs text-stone-500">
                  {t('compare.drawerSubtitle')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClearAll}
                  className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  {t('market.clearCompare')}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Matrix */}
            <div className="p-6 overflow-x-auto overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[650px]">
                {localizedCompared.map((item) => (
                  <div
                    key={item.id}
                    className="border border-stone-200 rounded-xl p-4 bg-white flex flex-col justify-between space-y-4"
                  >
                    {/* Header item preview */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                          {item.variety}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item)}
                          className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="h-32 rounded-lg overflow-hidden bg-stone-100">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <h4 className="font-bold text-stone-900 text-base leading-snug font-serif">
                        {item.name}
                      </h4>

                      <div className="text-xs text-stone-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{item.farmerLocation}</span>
                      </div>
                    </div>

                    {/* Metric Breakdown Table */}
                    <div className="space-y-2 text-xs divide-y divide-stone-100 border-t border-b border-stone-100 py-2">
                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">{t('compare.metricPrice')}:</span>
                        <span className="font-bold text-emerald-800 tabular-nums">
                          ₹{item.pricePerUnit} / {item.unit}
                        </span>
                      </div>

                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">{t('mandi.colMandi')}:</span>
                        <span className="font-medium text-stone-600 tabular-nums">
                          ₹{item.mandiBenchmark.apmcPrice} / {item.unit}
                        </span>
                      </div>

                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">{t('market.supermarket')}:</span>
                        <span className="line-through text-stone-400 tabular-nums">
                          ₹{item.mandiBenchmark.retailMarketPrice} / {item.unit}
                        </span>
                      </div>

                      <div className="flex justify-between py-1 text-emerald-700 font-semibold">
                        <span>{t('market.buyerSaves')}:</span>
                        <span className="tabular-nums">~{item.mandiBenchmark.buyerSavingsPercent}%</span>
                      </div>

                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">{t('market.harvested')}:</span>
                        <span className="font-medium text-stone-700">{item.harvestDate}</span>
                      </div>

                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">{t('detail.shelfLife')}:</span>
                        <span className="font-medium text-stone-700">{item.shelfLifeDays} {t('detail.days')}</span>
                      </div>

                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">{t('compare.metricCertification')}:</span>
                        <span className="font-medium text-stone-800 text-right max-w-[150px] truncate">
                          {item.isOrganicCertified ? item.certificationAgency : t('market.ipmPractice')}
                        </span>
                      </div>

                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">{t('market.minOrder')}:</span>
                        <span className="font-medium text-stone-700">{item.minOrderQuantity} {item.unit}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        onAddToCart(item, item.minOrderQuantity, 'delivery');
                      }}
                      className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {t('market.addToCart')} ({item.minOrderQuantity} {item.unit})
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {language === 'te' ? 'మూసివేయి' : language === 'hi' ? 'बंद करें' : 'Close Comparator'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
