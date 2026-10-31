import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Check, MapPin, Calendar, Scale, Eye, Plus, ShoppingBag, ShieldCheck } from 'lucide-react';
import { ProduceItem, ProduceCategory, Language } from '../types';
import { TRANSLATIONS, getLocalizedProduce } from '../utils/translations';

interface ProduceMarketplaceProps {
  produceList: ProduceItem[];
  language: Language;
  onAddToCart: (item: ProduceItem, quantity: number, fulfilmentMethod: 'pickup' | 'delivery') => void;
  comparedItems: ProduceItem[];
  onToggleCompare: (item: ProduceItem) => void;
  onViewDetails: (item: ProduceItem) => void;
}

export const ProduceMarketplace: React.FC<ProduceMarketplaceProps> = ({
  produceList,
  language,
  onAddToCart,
  comparedItems,
  onToggleCompare,
  onViewDetails,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  const [selectedCategory, setSelectedCategory] = useState<ProduceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'harvest' | 'priceAsc' | 'priceDesc' | 'rating'>('harvest');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Categories list
  const categories: { id: ProduceCategory; labelKey: string }[] = [
    { id: 'all', labelKey: 'market.all' },
    { id: 'vegetables', labelKey: 'market.vegetables' },
    { id: 'fruits', labelKey: 'market.fruits' },
    { id: 'grains', labelKey: 'market.grains' },
    { id: 'pulses', labelKey: 'market.pulses' },
    { id: 'spices', labelKey: 'market.spices' },
    { id: 'dairy', labelKey: 'market.dairy' },
  ];

  // Localized Produce List
  const localizedProduceList = useMemo(() => {
    return produceList.map((item) => getLocalizedProduce(item, language));
  }, [produceList, language]);

  // Filtered & sorted produce
  const filteredProduce = useMemo(() => {
    return localizedProduceList
      .filter((item) => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
        if (organicOnly && !item.isOrganicCertified) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchFarmer = item.farmerName.toLowerCase().includes(q);
          const matchLoc = item.farmerLocation.toLowerCase().includes(q);
          const matchVariety = item.variety.toLowerCase().includes(q);
          if (!matchName && !matchFarmer && !matchLoc && !matchVariety) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.pricePerUnit - b.pricePerUnit;
        if (sortBy === 'priceDesc') return b.pricePerUnit - a.pricePerUnit;
        if (sortBy === 'rating') return b.farmerRating - a.farmerRating;
        // Default freshest harvest
        return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime();
      });
  }, [localizedProduceList, selectedCategory, organicOnly, searchQuery, sortBy]);

  const getQuantity = (id: string, minOrder: number) => {
    return quantities[id] || minOrder;
  };

  const updateQuantity = (id: string, delta: number, minOrder: number, maxAvailable: number) => {
    const current = getQuantity(id, minOrder);
    const updated = Math.min(Math.max(current + delta, minOrder), maxAvailable);
    setQuantities((prev) => ({ ...prev, [id]: updated }));
  };

  return (
    <section id="marketplace" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
            {t('market.kicker')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif">
            {t('market.title')}
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            {t('market.subtitle')}
          </p>
        </div>

        {/* Count Indicator */}
        <div className="text-xs text-stone-500 flex items-center gap-2">
          <span>{t('market.showingLots')}: <strong className="text-stone-800 font-semibold">{filteredProduce.length}</strong></span>
          <span aria-hidden="true">·</span>
          <span>{t('market.harvestWindow')}</span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="mt-6 space-y-4">
        
        {/* Search bar + Sort + Organic Check */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('market.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 placeholder:text-stone-400 transition-colors"
            />
          </div>

          {/* Organic Filter Checkbox */}
          <label className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-700 cursor-pointer hover:bg-stone-50 select-none shrink-0">
            <input
              type="checkbox"
              checked={organicOnly}
              onChange={(e) => setOrganicOnly(e.target.checked)}
              className="rounded text-emerald-700 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
            />
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('market.organicOnly')}</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-3 py-1.5 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-stone-500" />
            <span className="text-xs text-stone-500">{t('market.sortBy')}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium text-stone-800 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="harvest">{t('market.sortHarvest')}</option>
              <option value="priceAsc">{t('market.sortPriceAsc')}</option>
              <option value="priceDesc">{t('market.sortPriceDesc')}</option>
              <option value="rating">{t('market.sortRating')}</option>
            </select>
          </div>

        </div>

        {/* Functional Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            );
          })}
        </div>

      </div>

      {/* Produce Grid */}
      {filteredProduce.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-stone-300 rounded-xl mt-6">
          <p className="text-sm font-medium text-stone-700">{t('market.noResults')}</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOrganicOnly(false);
            }}
            className="mt-3 text-xs text-emerald-800 underline font-semibold cursor-pointer"
          >
            {t('market.resetFilters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProduce.map((item) => {
            const isCompared = comparedItems.some((c) => c.id === item.id);
            const qty = getQuantity(item.id, item.minOrderQuantity);

            return (
              <div
                key={item.id}
                className="bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden group">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        parent.classList.add('bg-emerald-950', 'flex', 'items-center', 'justify-center');
                        (e.target as HTMLElement).style.display = 'none';
                      }
                    }}
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Unboxed Metadata on image bottom */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-emerald-200 drop-shadow-xs">{item.variety}</span>
                    <span className="drop-shadow-xs text-stone-200 text-[11px]">
                      {item.isOrganicCertified ? t('market.certifiedOrganic') : t('market.ipmPractice')}
                    </span>
                  </div>

                  {/* Compare Button */}
                  <button
                    onClick={() => onToggleCompare(item)}
                    className={`absolute top-2.5 right-2.5 px-2.5 py-1 text-xs font-medium rounded-md backdrop-blur-md transition-colors flex items-center gap-1 cursor-pointer ${
                      isCompared
                        ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                        : 'bg-stone-900/70 hover:bg-stone-900/90 text-white'
                    }`}
                  >
                    {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isCompared ? t('market.comparing') : t('market.compare')}</span>
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  
                  {/* Lead Title & Farmer Origin */}
                  <div>
                    <h3 className="text-base font-bold text-stone-900 hover:text-emerald-800 transition-colors leading-snug font-serif">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <span className="font-medium text-stone-700">{item.farmerName}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span className="truncate max-w-[150px]">{item.farmerLocation}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description preview */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Mandi vs FarmBridge Price Comparison Block */}
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/70 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-emerald-900 tabular-nums">
                          ₹{item.pricePerUnit}
                        </span>
                        <span className="text-xs text-stone-500 ml-1">/{item.unit}</span>
                      </div>
                      
                      <div className="text-right text-[11px] text-stone-500">
                        <span>{t('market.supermarket')}: </span>
                        <span className="line-through tabular-nums text-stone-400">
                          ₹{item.mandiBenchmark.retailMarketPrice}/{item.unit}
                        </span>
                      </div>
                    </div>

                    {/* Transparent Savings Note */}
                    <div className="flex items-center justify-between text-[11px] text-emerald-800 font-medium pt-1 border-t border-stone-200/60">
                      <span>{t('market.buyerSaves')} ~{item.mandiBenchmark.buyerSavingsPercent}%</span>
                      <span className="text-stone-500">{t('market.farmerMore')} +{item.mandiBenchmark.farmerSurplusPercent}% {t('market.vsMandi')}</span>
                    </div>
                  </div>

                  {/* Harvest & Stock Information */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{t('market.harvested')}: {item.harvestDate}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-stone-400" />
                      <span className="tabular-nums font-medium text-stone-700">
                        {item.availableQuantity} {item.unit} {t('market.stockLeft')}
                      </span>
                    </div>
                  </div>

                  {/* Order Quantity and Action Area */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    
                    {/* Quantity Picker */}
                    <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1, item.minOrderQuantity, item.availableQuantity)}
                        className="px-2 py-1 hover:bg-stone-200 transition-colors text-stone-700 cursor-pointer"
                        title="Decrease"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 font-semibold tabular-nums text-stone-900">
                        {qty} {item.unit}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1, item.minOrderQuantity, item.availableQuantity)}
                        className="px-2 py-1 hover:bg-stone-200 transition-colors text-stone-700 cursor-pointer"
                        title="Increase"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onViewDetails(item)}
                        className="p-2 border border-stone-300 hover:bg-stone-50 rounded-lg text-stone-700 transition-colors cursor-pointer"
                        title={t('market.viewDetails')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(item, qty, 'delivery')}
                        className="px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t('market.add')}</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
