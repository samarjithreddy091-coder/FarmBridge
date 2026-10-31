import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Info, Calculator, ShieldAlert } from 'lucide-react';
import { MandiRecord, Language } from '../types';
import { MANDI_BENCHMARK_RATES } from '../data/mockData';
import { TRANSLATIONS, getLocalizedMandiRecord } from '../utils/translations';

interface MandiIntelligenceProps {
  language: Language;
  onSelectCropForMarketplace?: (cropName: string) => void;
}

export const MandiIntelligence: React.FC<MandiIntelligenceProps> = ({
  language,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  // Localized benchmarks
  const localizedBenchmarks = useMemo(() => {
    return MANDI_BENCHMARK_RATES.map((item) => getLocalizedMandiRecord(item, language));
  }, [language]);

  const [selectedCropId, setSelectedCropId] = useState<string>(MANDI_BENCHMARK_RATES[0].id);
  const [calcQuantity, setCalcQuantity] = useState<number>(200); // 200 kg default simulation

  const selectedCrop = useMemo(() => {
    return localizedBenchmarks.find((c) => c.id === selectedCropId) || localizedBenchmarks[0];
  }, [localizedBenchmarks, selectedCropId]);

  // Calculations
  const mandiPayout = selectedCrop.modalPricePerKg * calcQuantity;
  const farmBridgePayout = selectedCrop.farmBridgePricePerKg * calcQuantity;
  const retailCost = selectedCrop.retailPricePerKg * calcQuantity;

  const farmerExtraEarnings = farmBridgePayout - mandiPayout;
  const buyerSavings = retailCost - farmBridgePayout;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          {t('mandi.kicker')}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif">
          {t('mandi.title')}
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl">
          {t('mandi.subtitle')}
        </p>
      </div>

      {/* Main Grid: Live Radar Table on Left + Interactive Calculator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Live Benchmark Table */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
          
          <div className="px-5 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900">
              {t('mandi.tableTitle')}
            </h3>
            <span className="text-xs text-stone-500">
              {t('mandi.tableSubtitle')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/70 text-stone-600 uppercase font-semibold tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">{t('mandi.colCommodity')}</th>
                  <th className="py-3 px-4 text-right">{t('mandi.colMandi')}</th>
                  <th className="py-3 px-4 text-right">{t('mandi.colFarmBridge')}</th>
                  <th className="py-3 px-4 text-right">{t('mandi.colRetail')}</th>
                  <th className="py-3 px-4 text-center">{t('mandi.colTrend')}</th>
                  <th className="py-3 px-4 text-right">{t('mandi.colAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70">
                {localizedBenchmarks.map((item) => {
                  const isSelected = selectedCrop.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedCropId(item.id)}
                      className={`hover:bg-emerald-50/40 cursor-pointer transition-colors ${
                        isSelected ? 'bg-emerald-50/80 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">{item.cropName}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.marketName}, {item.state}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right font-mono tabular-nums text-stone-600">
                        ₹{item.modalPricePerKg}/kg
                      </td>

                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-emerald-800">
                        ₹{item.farmBridgePricePerKg}/kg
                      </td>

                      <td className="py-3 px-4 text-right font-mono tabular-nums line-through text-stone-400">
                        ₹{item.retailPricePerKg}/kg
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                          {item.trend === 'up' && (
                            <span className="text-emerald-700 font-semibold flex items-center">
                              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +{item.changePercent}%
                            </span>
                          )}
                          {item.trend === 'down' && (
                            <span className="text-rose-600 font-semibold flex items-center">
                              <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> {item.changePercent}%
                            </span>
                          )}
                          {item.trend === 'stable' && (
                            <span className="text-stone-500 font-semibold flex items-center">
                              <Minus className="w-3.5 h-3.5 mr-0.5" /> 0%
                            </span>
                          )}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCropId(item.id);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-100/70 hover:bg-emerald-100 rounded transition-colors cursor-pointer"
                        >
                          {language === 'te' ? 'లెక్కించండి' : language === 'hi' ? 'गणना करें' : 'Simulate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Crop Market Advisory Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs flex items-start gap-3">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-800">
                {language === 'te' ? 'AI మార్కెట్ సలహా' : language === 'hi' ? 'AI मंडी सलाह' : 'AI Market Advisory'} ({selectedCrop.cropName}):
              </span>{' '}
              <span className="text-stone-600">{selectedCrop.aiRecommendation}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Margin & Savings Calculator */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-5">
          
          <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
            <Calculator className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              {t('mandi.calcTitle')}
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {t('mandi.calcSelected')}
              </label>
              <div className="p-2.5 bg-stone-50 rounded-lg text-xs font-medium text-stone-800 border border-stone-200">
                {selectedCrop.cropName} ({selectedCrop.marketName})
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="font-semibold text-stone-700">{t('mandi.calcVolume')}</label>
                <span className="font-mono font-bold text-emerald-800 tabular-nums">
                  {calcQuantity} kg
                </span>
              </div>
              
              <input
                type="range"
                min="20"
                max="2000"
                step="20"
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />

              {/* Quick weight selector chips */}
              <div className="flex items-center gap-1.5 mt-2">
                {[50, 100, 200, 500, 1000].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setCalcQuantity(qty)}
                    className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                      calcQuantity === qty
                        ? 'bg-emerald-800 text-white font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {qty}kg
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="space-y-3 pt-2">
            
            {/* Farmer Extra Income Card */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                {t('mandi.calcFarmerBenefit')}
              </div>
              <div className="text-2xl font-black text-emerald-950 font-serif tabular-nums">
                +₹{farmerExtraEarnings.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-800/80">
                {language === 'te'
                  ? `రైతుకు ఫామ్‌బ్రిడ్జ్ ద్వారా ₹${farmBridgePayout.toLocaleString('en-IN')} లభిస్తుంది (మండిలో ₹${mandiPayout.toLocaleString('en-IN')}).`
                  : language === 'hi'
                  ? `किसान को फार्मब्रिज पर ₹${farmBridgePayout.toLocaleString('en-IN')} मिलते हैं (मंडी में मात्र ₹${mandiPayout.toLocaleString('en-IN')})।`
                  : `Farmer gets ₹${farmBridgePayout.toLocaleString('en-IN')} on FarmBridge instead of ₹${mandiPayout.toLocaleString('en-IN')} at Mandi auction.`}
              </div>
            </div>

            {/* Buyer Savings Card */}
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                {t('mandi.calcBuyerBenefit')}
              </div>
              <div className="text-2xl font-black text-amber-950 font-serif tabular-nums">
                ₹{buyerSavings.toLocaleString('en-IN')} {language === 'te' ? 'ఆదా' : language === 'hi' ? 'बचत' : 'Saved'}
              </div>
              <div className="text-xs text-amber-900/80">
                {language === 'te'
                  ? `సూపర్‌మార్కెట్ ధర ₹${retailCost.toLocaleString('en-IN')} బదులుగా చెల్లించినది ₹${farmBridgePayout.toLocaleString('en-IN')}.`
                  : language === 'hi'
                  ? `सुपरमार्केट के ₹${retailCost.toLocaleString('en-IN')} के मुकाबले केवल ₹${farmBridgePayout.toLocaleString('en-IN')} का भुगतान।`
                  : `Paid ₹${farmBridgePayout.toLocaleString('en-IN')} instead of retail supermarket price of ₹${retailCost.toLocaleString('en-IN')}.`}
              </div>
            </div>

          </div>

          <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>
              {language === 'te'
                ? 'దళారులను తొలగించడం వల్ల గ్రామీణ రైతు కుటుంబాలకు నేరుగా ఆర్థిక బలం చేకూరుతుంది.'
                : language === 'hi'
                ? 'बिचौलियों की समाप्ति से ग्रामीण किसान परिवारों को सीधा आर्थिक लाभ मिलता है।'
                : 'Eliminating multi-tiered broker cut directly strengthens rural farming families.'}
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};
