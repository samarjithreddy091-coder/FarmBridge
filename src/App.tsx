/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProduceMarketplace } from './components/ProduceMarketplace';
import { CropComparator } from './components/CropComparator';
import { MandiIntelligence } from './components/MandiIntelligence';
import { AICropDoctor } from './components/AICropDoctor';
import { FarmerPortal } from './components/FarmerPortal';
import { HowItWorks } from './components/HowItWorks';
import { CartDrawer } from './components/CartDrawer';
import { ProduceDetailModal } from './components/ProduceDetailModal';
import { HackathonDemoVideo } from './components/HackathonDemoVideo';
import { Footer } from './components/Footer';

import { ProduceItem, CartItem, FarmerOrder, Language } from './types';
import { INITIAL_PRODUCE, INITIAL_ORDERS } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('explore');
  const [language, setLanguage] = useState<Language>('en');
  const [isDemoVideoOpen, setIsDemoVideoOpen] = useState<boolean>(false);

  // Application Data States
  const [produceList, setProduceList] = useState<ProduceItem[]>(INITIAL_PRODUCE);
  const [orders, setOrders] = useState<FarmerOrder[]>(INITIAL_ORDERS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Comparison State
  const [comparedItems, setComparedItems] = useState<ProduceItem[]>([]);
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);

  // Detail Modal State
  const [selectedProduceDetail, setSelectedProduceDetail] = useState<ProduceItem | null>(null);

  // Cart operations
  const handleAddToCart = (item: ProduceItem, quantity: number, fulfilmentMethod: 'pickup' | 'delivery' = 'delivery') => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.produce.id === item.id);
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { produce: item, quantity, fulfilmentMethod }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.produce.id === id) {
            const newQ = ci.quantity + delta;
            return newQ > 0 ? { ...ci, quantity: newQ } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.produce.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (newOrder: FarmerOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Compare operations
  const handleToggleCompare = (item: ProduceItem) => {
    setComparedItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      }
      if (prev.length >= 3) {
        // limit to 3 items
        return [...prev.slice(1), item];
      }
      return [...prev, item];
    });
  };

  const handleRemoveCompareItem = (item: ProduceItem) => {
    setComparedItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  const handleClearCompare = () => {
    setComparedItems([]);
    setIsComparatorOpen(false);
  };

  // Farmer operations
  const handleUpdateOrderStatus = (orderId: string, newStatus: FarmerOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAddNewProduce = (newProduce: ProduceItem) => {
    setProduceList((prev) => [newProduce, ...prev]);
    setCurrentTab('explore');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 selection:bg-emerald-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onLanguageChange={setLanguage}
        cartCount={cartItems.reduce((sum, it) => sum + it.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDemoVideo={() => setIsDemoVideoOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'explore' && (
          <>
            <HeroSection
              language={language}
              onExploreClick={() => {
                const el = document.getElementById('marketplace');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onFarmerClick={() => setCurrentTab('farmer')}
              onDoctorClick={() => setCurrentTab('doctor')}
              onDemoVideoClick={() => setIsDemoVideoOpen(true)}
            />

            <ProduceMarketplace
              produceList={produceList}
              language={language}
              onAddToCart={handleAddToCart}
              comparedItems={comparedItems}
              onToggleCompare={handleToggleCompare}
              onViewDetails={(item) => setSelectedProduceDetail(item)}
            />

            <HowItWorks
              language={language}
              onExploreClick={() => {
                const el = document.getElementById('marketplace');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onFarmerClick={() => setCurrentTab('farmer')}
            />
          </>
        )}

        {currentTab === 'mandi' && (
          <MandiIntelligence
            language={language}
            onSelectCropForMarketplace={() => setCurrentTab('explore')}
          />
        )}

        {currentTab === 'doctor' && (
          <AICropDoctor language={language} />
        )}

        {currentTab === 'farmer' && (
          <FarmerPortal
            produceList={produceList}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddNewProduce={handleAddNewProduce}
            language={language}
          />
        )}

        {currentTab === 'howItWorks' && (
          <HowItWorks
            language={language}
            onExploreClick={() => setCurrentTab('explore')}
            onFarmerClick={() => setCurrentTab('farmer')}
          />
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
        language={language}
      />

      {/* Crop Comparator Drawer / Floating Bar */}
      <CropComparator
        comparedItems={comparedItems}
        onRemoveItem={handleRemoveCompareItem}
        onClearAll={handleClearCompare}
        language={language}
        onAddToCart={handleAddToCart}
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        onOpen={() => setIsComparatorOpen(true)}
      />

      {/* Produce Detail Modal */}
      <ProduceDetailModal
        item={selectedProduceDetail}
        onClose={() => setSelectedProduceDetail(null)}
        language={language}
        onAddToCart={handleAddToCart}
      />

      {/* Hackathon Presentation Demo Video with Smooth Male Voiceover */}
      <HackathonDemoVideo
        isOpen={isDemoVideoOpen}
        onClose={() => setIsDemoVideoOpen(false)}
        language={language}
      />

      {/* Professional Agricultural Footer */}
      <Footer
        language={language}
        onSelectTab={setCurrentTab}
      />

    </div>
  );
}
