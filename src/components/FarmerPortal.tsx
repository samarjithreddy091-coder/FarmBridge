import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, Truck, Package, DollarSign, Sprout, Sparkles, X } from 'lucide-react';
import { ProduceItem, FarmerOrder, Language, ProduceCategory } from '../types';
import { TRANSLATIONS, getLocalizedProduce } from '../utils/translations';

interface FarmerPortalProps {
  produceList: ProduceItem[];
  orders: FarmerOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: FarmerOrder['status']) => void;
  onAddNewProduce: (newProduce: ProduceItem) => void;
  language: Language;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({
  produceList,
  orders,
  onUpdateOrderStatus,
  onAddNewProduce,
  language,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Produce Form State
  const [newCropName, setNewCropName] = useState('');
  const [newCategory, setNewCategory] = useState<ProduceCategory>('vegetables');
  const [newVariety, setNewVariety] = useState('');
  const [newPrice, setNewPrice] = useState<number>(30);
  const [newQuantity, setNewQuantity] = useState<number>(300);
  const [newHarvestDate, setNewHarvestDate] = useState('2026-10-29');
  const [isOrganic, setIsOrganic] = useState(true);

  // Metrics calculation
  const totalRevenue = orders
    .filter((o) => o.status === 'completed' || o.status === 'accepted' || o.status === 'ready')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'requested').length;
  const readyOrdersCount = orders.filter((o) => o.status === 'ready' || o.status === 'accepted').length;

  const localizedProduceList = produceList.map((item) => getLocalizedProduce(item, language));

  const handleCreateProduce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    const newItem: ProduceItem = {
      id: `prod_custom_${Date.now()}`,
      name: newCropName,
      category: newCategory,
      variety: newVariety || (language === 'te' ? 'ప్రామాణిక రకం' : language === 'hi' ? 'मानक किस्म' : 'Standard Variety'),
      farmerId: 'farmer_ramesh',
      farmerName: language === 'te' ? 'రమేష్ పాటిల్' : language === 'hi' ? 'रमेश पाटिल' : 'Ramesh Patil',
      farmName: language === 'te' ? 'సహ్యాద్రి ఆగ్రో కలెక్టివ్' : language === 'hi' ? 'सह्याद्री एग्रो कलेक्टिव' : 'Sahyadri Agro Collective',
      farmerLocation: language === 'te' ? 'నిఫాడ్, నాసిక్, మహారాష్ట్ర' : language === 'hi' ? 'निफाड़, नासिक, महाराष्ट्र' : 'Niphad, Nashik, Maharashtra',
      farmerPhone: '+91 98231 45678',
      farmerRating: 4.9,
      farmerReviewCount: 1,
      isFarmerVerified: true,
      imageUrl: '/src/assets/images/produce_organic_tomatoes_1793340681144.jpg',
      pricePerUnit: newPrice,
      unit: language === 'te' ? 'కిలో' : language === 'hi' ? 'किग्रा' : 'kg',
      totalQuantity: newQuantity,
      reservedQuantity: 0,
      availableQuantity: newQuantity,
      minOrderQuantity: 5,
      harvestDate: newHarvestDate,
      availableFrom: newHarvestDate,
      shelfLifeDays: 20,
      isOrganicCertified: isOrganic,
      certificationAgency: isOrganic ? 'NPOP India Certified Organic' : 'Direct Farm GAP',
      mandiBenchmark: {
        apmcPrice: Math.round(newPrice * 0.65),
        retailMarketPrice: Math.round(newPrice * 1.6),
        farmerSurplusPercent: 35,
        buyerSavingsPercent: 37,
      },
      pickupEnabled: true,
      deliveryEnabled: true,
      deliveryFeePerUnit: 2,
      bulkDiscountEnabled: true,
      bulkMinQuantity: 50,
      bulkPricePerUnit: Math.round(newPrice * 0.88),
      description: `Freshly harvested ${newCropName} direct from our farm. Guaranteed chemical-free harvest with standard field sorting.`,
      growingPractice: isOrganic ? 'Natural farming with farmyard manure & bio-inputs' : 'Integrated Pest Management (IPM)',
    };

    onAddNewProduce(newItem);
    setShowAddModal(false);
    // Reset form
    setNewCropName('');
    setNewVariety('');
    setNewPrice(30);
    setNewQuantity(300);
  };

  const getLocalizedBuyerType = (type: string) => {
    if (language === 'te') {
      const map: Record<string, string> = {
        Household: 'ఇంటి వినియోగదారు',
        Restaurant: 'రెస్టారెంట్',
        Retailer: 'చిరువ్యాపారి',
        Wholesaler: 'హోల్‌సేలర్',
      };
      return map[type] || type;
    }
    if (language === 'hi') {
      const map: Record<string, string> = {
        Household: 'घरेलू उपभोक्ता',
        Restaurant: 'रेस्टोरेंट',
        Retailer: 'खुदरा व्यापारी',
        Wholesaler: 'थोक व्यापारी',
      };
      return map[type] || type;
    }
    return type;
  };

  return (
    <section id="farmer" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('farmer.kicker')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif">
            {t('farmer.portalTitle')}
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl">
            {t('farmer.portalSubtitle')}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-2xs shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t('farmer.btnAddProduce')}</span>
        </button>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{t('farmer.metricRevenue')}</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-serif tabular-nums">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            {language === 'te' ? '100% నేరుగా బ్యాంక్ / UPI చెల్లింపు' : language === 'hi' ? '100% सीधा बैंक व UPI भुगतान' : '100% direct bank / UPI settlement'}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{t('farmer.metricActive')}</span>
            <Package className="w-4 h-4 text-stone-500" />
          </div>
          <div className="text-2xl font-bold text-stone-900 font-serif tabular-nums">
            {produceList.length}
          </div>
          <div className="text-[11px] text-stone-500">
            {language === 'te' ? 'ప్రత్యక్ష మార్కెట్‌లో జాబితా చేయబడింది' : language === 'hi' ? 'सीधे मार्केट में उपलब्ध लॉट' : 'Listed in direct marketplace'}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{t('farmer.metricPending')}</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700 font-serif tabular-nums">
            {pendingOrdersCount}
          </div>
          <div className="text-[11px] text-stone-500">
            {language === 'te' ? 'మీ ఆమోదం కోసం వేచి ఉన్నాయి' : language === 'hi' ? 'आपकी स्वीकृति की प्रतीक्षा में' : 'Awaiting your confirmation'}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{t('farmer.metricReady')}</span>
            <Truck className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-emerald-800 font-serif tabular-nums">
            {readyOrdersCount}
          </div>
          <div className="text-[11px] text-stone-500">
            {language === 'te' ? 'పొలం పికప్ & శీతల రవాణా' : language === 'hi' ? 'खेत से पिकअप व कोल्ड ट्रांसपोर्ट' : 'Farm-gate & cold transport'}
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-stone-200 pb-px">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          {t('farmer.tabOrders')} ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'inventory'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          {t('farmer.tabInventory')} ({produceList.length})
        </button>
      </div>

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Order Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-stone-900">{ord.id}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-xs font-medium text-stone-600">{getLocalizedBuyerType(ord.buyerType)}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-xs text-stone-500">{ord.orderDate}</span>
                </div>

                <div className="font-bold text-stone-900 text-sm">
                  {ord.buyerName}{' '}
                  <span className="text-xs font-normal text-stone-500">({ord.buyerPhone})</span>
                </div>

                <div className="text-xs text-stone-600">
                  {ord.items.map((it, idx) => (
                    <span key={idx} className="mr-3">
                      <strong>{it.quantity} {it.unit}</strong> {it.produceName} (@ ₹{it.unitPrice}/{it.unit})
                    </span>
                  ))}
                </div>

                <div className="text-xs text-stone-500 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    {language === 'te' ? 'రవాణా విధానం' : language === 'hi' ? 'डिलीवरी प्रकार' : 'Fulfilment'}:{' '}
                    {ord.fulfilmentMethod === 'pickup' ? t('cart.pickup') : t('cart.delivery')}
                  </span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="truncate max-w-xs">{ord.buyerAddress}</span>
                </div>
              </div>

              {/* Right: Amount & Status Actions */}
              <div className="flex flex-col md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                <div className="text-left md:text-right">
                  <div className="text-xs text-stone-500">{t('farmer.orderAmount')}</div>
                  <div className="text-lg font-bold text-emerald-950 font-serif tabular-nums">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Status-Driven Action Buttons */}
                <div className="flex items-center gap-2">
                  {ord.status === 'requested' && (
                    <>
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'accepted')}
                        className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        {t('farmer.btnAccept')}
                      </button>
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'cancelled')}
                        className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-600 text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        {language === 'te' ? 'రద్దు' : language === 'hi' ? 'रद्द करें' : 'Decline'}
                      </button>
                    </>
                  )}

                  {ord.status === 'accepted' && (
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'ready')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>{t('farmer.btnReady')}</span>
                    </button>
                  )}

                  {ord.status === 'ready' && (
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'completed')}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{t('farmer.btnDispatch')}</span>
                    </button>
                  )}

                  {ord.status === 'completed' && (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> {t('farmer.statusCompleted')}
                    </span>
                  )}

                  {ord.status === 'cancelled' && (
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                      {language === 'te' ? 'రద్దయింది' : language === 'hi' ? 'रद्द किया गया' : 'Cancelled'}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Inventory Tab View */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">{language === 'te' ? 'పంట పేరు' : language === 'hi' ? 'फसल का नाम' : 'Produce Name'}</th>
                  <th className="py-3 px-4">{language === 'te' ? 'వర్గం' : language === 'hi' ? 'श्रेणी' : 'Category'}</th>
                  <th className="py-3 px-4 text-right">{language === 'te' ? 'ప్రత్యక్ష ధర' : language === 'hi' ? 'सीधा मूल्य' : 'Direct Price'}</th>
                  <th className="py-3 px-4 text-right">{language === 'te' ? 'లభ్యత స్టాక్' : language === 'hi' ? 'उपलब्ध स्टॉक' : 'Available Stock'}</th>
                  <th className="py-3 px-4 text-right">{language === 'te' ? 'రిజర్వ్ చేసిన స్టాక్' : language === 'hi' ? 'आरक्षित स्टॉक' : 'Reserved Stock'}</th>
                  <th className="py-3 px-4">{language === 'te' ? 'కోత తేదీ' : language === 'hi' ? 'कटाई की तारीख' : 'Harvest Date'}</th>
                  <th className="py-3 px-4 text-center">{language === 'te' ? 'స్థితి' : language === 'hi' ? 'स्थिति' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70">
                {localizedProduceList.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{item.name}</div>
                      <div className="text-[11px] text-stone-500">{item.variety}</div>
                    </td>
                    <td className="py-3 px-4 capitalize text-stone-600">
                      {t(`market.${item.category}`) || item.category}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-800 tabular-nums">
                      ₹{item.pricePerUnit}/{item.unit}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-stone-800">
                      {item.availableQuantity} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-amber-700">
                      {item.reservedQuantity} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-stone-600">{item.harvestDate}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {language === 'te' ? 'సక్రియ లాట్' : language === 'hi' ? 'सक्रिय लॉट' : 'Active Listing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add New Harvest Produce */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif">{t('farmer.modalTitle')}</h3>
                <p className="text-xs text-stone-500">{t('farmer.modalSubtitle')}</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduce} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">{t('farmer.formCropName')} *</label>
                  <input
                    type="text"
                    required
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    placeholder={language === 'te' ? 'ఉదా: తాజా క్యారెట్లు' : language === 'hi' ? 'उदा: ताज़ा गाजर' : 'e.g. Fresh Red Carrots'}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">{t('farmer.formCategory')}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="vegetables">{t('market.vegetables')}</option>
                    <option value="fruits">{t('market.fruits')}</option>
                    <option value="grains">{t('market.grains')}</option>
                    <option value="pulses">{t('market.pulses')}</option>
                    <option value="spices">{t('market.spices')}</option>
                    <option value="dairy">{t('market.dairy')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">{t('farmer.formVariety')}</label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    placeholder={language === 'te' ? 'ఉదా: పూసా కేసర్' : language === 'hi' ? 'उदा: पूसा केसर' : 'e.g. Pusa Kesar'}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">{t('farmer.formDate')}</label>
                  <input
                    type="date"
                    value={newHarvestDate}
                    onChange={(e) => setNewHarvestDate(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-stone-700">{t('farmer.formPrice')} *</label>
                    <span className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {language === 'te' ? 'మండి సూచీ: ₹26-32' : language === 'hi' ? 'मंडी सूचकांक: ₹26-32' : 'AI Mandi Index: ₹26-32'}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">{t('farmer.formQuantity')} *</label>
                  <input
                    type="number"
                    min="10"
                    max="10000"
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="organicModalCheck"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="organicModalCheck" className="text-stone-700 font-medium cursor-pointer">
                  {t('farmer.formOrganic')}
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-100 rounded-lg text-stone-700 font-medium cursor-pointer"
                >
                  {t('farmer.btnCancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold shadow-2xs cursor-pointer"
                >
                  {t('farmer.btnSave')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
