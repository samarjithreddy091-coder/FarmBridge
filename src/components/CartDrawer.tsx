import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, MapPin, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';
import { CartItem, Language, FarmerOrder } from '../types';
import { TRANSLATIONS, getLocalizedProduce } from '../utils/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: FarmerOrder) => void;
  language: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
  language,
}) => {
  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;

  const [fulfilmentMode, setFulfilmentMode] = useState<'delivery' | 'pickup'>('delivery');
  const [buyerName, setBuyerName] = useState('Priya Sharma');
  const [buyerPhone, setBuyerPhone] = useState('+91 98450 67123');
  const [buyerAddress, setBuyerAddress] = useState('Flat 402, Green Glen Layout, Bengaluru');
  const [buyerType, setBuyerType] = useState<FarmerOrder['buyerType']>('Household');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'cod'>('upi');
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');

  if (!isOpen) return null;

  // Localized items
  const localizedItems: CartItem[] = items.map((ci) => ({
    ...ci,
    produce: getLocalizedProduce(ci.produce, language),
  }));

  // Group items by farmer
  const groupedByFarmer = localizedItems.reduce<Record<string, { farmName: string; location: string; items: CartItem[] }>>(
    (acc, curr) => {
      const fId = curr.produce.farmerId;
      if (!acc[fId]) {
        acc[fId] = {
          farmName: curr.produce.farmName,
          location: curr.produce.farmerLocation,
          items: [],
        };
      }
      acc[fId].items.push(curr);
      return acc;
    },
    {}
  );

  const produceSubtotal = localizedItems.reduce((sum, it) => sum + it.produce.pricePerUnit * it.quantity, 0);
  const deliveryFee = fulfilmentMode === 'delivery' ? (localizedItems.length > 0 ? 60 : 0) : 0;
  const grandTotal = produceSubtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (localizedItems.length === 0) return;

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: FarmerOrder = {
      id: newOrderId,
      buyerName,
      buyerPhone,
      buyerAddress: fulfilmentMode === 'pickup' ? (language === 'te' ? 'పొలం వద్ద పికప్' : language === 'hi' ? 'खेत से स्वयं पिकअप' : 'Farm-Gate Self-Pickup') : buyerAddress,
      buyerType,
      items: localizedItems.map((it) => ({
        produceId: it.produce.id,
        produceName: it.produce.name,
        quantity: it.quantity,
        unit: it.produce.unit,
        unitPrice: it.produce.pricePerUnit,
      })),
      totalAmount: grandTotal,
      fulfilmentMethod: fulfilmentMode,
      status: 'requested',
      orderDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    onOrderPlaced(newOrder);
    setPlacedOrderId(newOrderId);
    setIsSuccessModal(true);
    onClearCart();
  };

  const getBuyerTypeLabel = (type: string) => {
    if (language === 'te') {
      const map: Record<string, string> = {
        Household: 'ఇంటి అవసరం',
        Restaurant: 'రెస్టారెంట్',
        Wholesaler: 'హోల్‌సేల్',
      };
      return map[type] || type;
    }
    if (language === 'hi') {
      const map: Record<string, string> = {
        Household: 'घरेलू',
        Restaurant: 'रेस्टोरेंट',
        Wholesaler: 'थोक',
      };
      return map[type] || type;
    }
    return type;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      
      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-stone-200">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h3 className="text-base font-bold text-stone-900 font-serif">{t('cart.title')}</h3>
            <span className="text-xs text-stone-500 tabular-nums">({localizedItems.length})</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Modal Overlay */}
        {isSuccessModal ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 animate-in zoom-in-75">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-stone-900 font-serif">{t('cart.orderSuccess')}</h3>
            <div className="font-mono text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
              {placedOrderId}
            </div>

            <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
              {t('cart.orderSubtext')}
            </p>

            <div className="p-3 bg-stone-50 rounded-xl text-left text-xs border border-stone-200 w-full space-y-1">
              <div className="font-semibold text-stone-800">
                {language === 'te' ? 'ఆర్డర్ సారాంశం' : language === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}:
              </div>
              <div className="text-stone-600">
                {language === 'te' ? 'కొనుగోలుదారు' : language === 'hi' ? 'खरीदार' : 'Buyer'}: {buyerName} ({buyerPhone})
              </div>
              <div className="text-stone-600">
                {t('cart.fulfilment')}: {fulfilmentMode === 'pickup' ? t('cart.pickup') : t('cart.delivery')}
              </div>
              <div className="text-stone-600 font-bold text-emerald-950">
                {t('cart.grandTotal')}: ₹{grandTotal}
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccessModal(false);
                onClose();
              }}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              {language === 'te' ? 'పంటలను చూడటం కొనసాగించండి' : language === 'hi' ? 'ताज़ा फसलें देखना जारी रखें' : 'Continue Exploring Produce'}
            </button>
          </div>
        ) : localizedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 text-stone-500">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-semibold text-stone-800 font-serif">
              {language === 'te' ? 'మీ బుట్ట ఖాళీగా ఉంది' : language === 'hi' ? 'आपकी टोकरी खाली है' : 'Your Basket is Empty'}
            </h4>
            <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
              {t('cart.empty')}
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              {t('cart.exploreBtn')}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Fulfilment Switcher */}
            <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <div className="text-[11px] font-semibold text-stone-600 mb-1.5 px-1 uppercase tracking-wider">
                {t('cart.fulfilment')}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFulfilmentMode('delivery')}
                  className={`p-2.5 rounded-lg text-left transition-colors border cursor-pointer ${
                    fulfilmentMode === 'delivery'
                      ? 'bg-white border-emerald-700 text-emerald-950 font-semibold shadow-2xs'
                      : 'border-transparent text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    <Truck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'te' ? 'ఇంటి వద్దకే డెలివరీ' : language === 'hi' ? 'घर तक सीधी डिलीवरी' : 'Cold Delivery'}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">₹60</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfilmentMode('pickup')}
                  className={`p-2.5 rounded-lg text-left transition-colors border cursor-pointer ${
                    fulfilmentMode === 'pickup'
                      ? 'bg-white border-emerald-700 text-emerald-950 font-semibold shadow-2xs'
                      : 'border-transparent text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'te' ? 'పొలం వద్ద పికప్' : language === 'hi' ? 'खेत से पिकअप' : 'Farm Pickup'}</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">₹0 ({language === 'te' ? 'ఉచితం' : language === 'hi' ? 'मुफ़्त' : 'Free'})</div>
                </button>
              </div>
            </div>

            {/* Produce Items Grouped by Farm */}
            <div className="space-y-4">
              {Object.entries(groupedByFarmer).map(([farmerId, group]) => (
                <div key={farmerId} className="border border-stone-200 rounded-xl overflow-hidden">
                  
                  {/* Farm Group Kicker */}
                  <div className="px-3 py-2 bg-stone-100/70 border-b border-stone-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900 font-serif">{group.farmName}</span>
                      <span className="text-stone-500 text-[11px] ml-1.5">{group.location}</span>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {language === 'te' ? 'రైతు పొలం వద్ద నుండే' : language === 'hi' ? 'सीधे किसान के खेत से' : 'Direct Farm Gate'}
                    </span>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-stone-100 p-2 space-y-1">
                    {group.items.map(({ produce, quantity }) => (
                      <div key={produce.id} className="p-2 flex items-center justify-between gap-3 text-xs">
                        
                        <div className="flex-1">
                          <h5 className="font-bold text-stone-900 leading-snug font-serif">{produce.name}</h5>
                          <div className="text-stone-500 text-[11px]">
                            ₹{produce.pricePerUnit}/{produce.unit}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 border border-stone-200 rounded-md bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(produce.id, -1)}
                            className="px-2 py-0.5 hover:bg-stone-200 text-stone-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-1.5 font-bold tabular-nums text-stone-900">
                            {quantity} {produce.unit}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(produce.id, 1)}
                            className="px-2 py-0.5 hover:bg-stone-200 text-stone-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <div className="font-bold text-emerald-950 font-serif tabular-nums">
                            ₹{produce.pricePerUnit * quantity}
                          </div>
                          <button
                            onClick={() => onRemoveItem(produce.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Buyer Contact Form */}
            <form onSubmit={handleCheckout} className="space-y-3 pt-2 border-t border-stone-200 text-xs">
              
              <div className="font-bold text-stone-900 text-sm font-serif">
                {t('cart.buyerDetails')}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-600 block mb-1">{t('cart.nameLabel')}</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-stone-600 block mb-1">{t('cart.phoneLabel')}</label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-600 block mb-1">
                  {language === 'te' ? 'కొనుగోలుదారు వర్గం' : language === 'hi' ? 'खरीदार की श्रेणी' : 'Buyer Category'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Household', 'Restaurant', 'Wholesaler'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBuyerType(type)}
                      className={`py-1.5 px-2 rounded-lg text-center transition-colors cursor-pointer ${
                        buyerType === type
                          ? 'bg-emerald-800 text-white font-semibold'
                          : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {getBuyerTypeLabel(type)}
                    </button>
                  ))}
                </div>
              </div>

              {fulfilmentMode === 'delivery' && (
                <div>
                  <label className="text-stone-600 block mb-1">{t('cart.addressLabel')}</label>
                  <input
                    type="text"
                    required
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              )}

              {/* Payment selector */}
              <div>
                <label className="text-stone-600 block mb-1">
                  {language === 'te' ? 'చెల్లింపు పద్ధతి' : language === 'hi' ? 'भुगतान विधि' : 'Payment Method'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('upi')}
                    className={`p-2 rounded-lg text-left border cursor-pointer ${
                      paymentMode === 'upi'
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-950 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'te' ? 'తక్షణ UPI ఎస్క్రో' : language === 'hi' ? 'त्वरित UPI एस्क्रो' : 'Instant UPI (Escrow)'}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('cod')}
                    className={`p-2 rounded-lg text-left border cursor-pointer ${
                      paymentMode === 'cod'
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-950 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-stone-600" />
                      <span>{language === 'te' ? 'డెలివరీ అప్పుడు చెల్లింపు' : language === 'hi' ? 'डिलीवरी पर भुगतान' : 'Pay on Handover'}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Breakdown Receipt */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{t('cart.produceTotal')}</span>
                  <span className="font-mono tabular-nums font-semibold text-stone-800">
                    ₹{produceSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>{t('cart.deliveryTotal')}</span>
                  <span className="font-mono tabular-nums text-stone-800">
                    {deliveryFee === 0 ? `₹0 (${language === 'te' ? 'ఉచితం' : language === 'hi' ? 'मुफ़्त' : 'FREE'})` : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-stone-900 text-sm pt-1.5 border-t border-stone-200">
                  <span>{t('cart.grandTotal')}</span>
                  <span className="font-serif text-emerald-950 text-base tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>{t('cart.checkout')}</span>
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};
