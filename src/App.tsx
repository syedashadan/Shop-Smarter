import React, { useState, useEffect } from 'react';
import { Product, CartItem, PurchasedItem, UserProfile } from './types';
import { INITIAL_PRODUCTS } from './data/sampleProducts';
import { DEFAULT_USER_PROFILE, INITIAL_CART_ITEMS, INITIAL_PURCHASED_ITEMS } from './data/userData';
import { Navbar } from './components/Navbar';
import { HeroDashboard } from './components/HeroDashboard';
import { ProductsView } from './components/ProductsView';
import { AlgorithmAnalyzerView } from './components/AlgorithmAnalyzerView';
import { AlgorithmPerformanceView } from './components/AlgorithmPerformanceView';
import { AboutAlgorithmsView } from './components/AboutAlgorithmsView';
import { AddProductModal } from './components/AddProductModal';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { PythonExportModal } from './components/PythonExportModal';
import { SmartShopPageNav } from './components/SmartShopPageNav';
import { RealTimeStatusBar } from './components/RealTimeStatusBar';
import { UserInfoView } from './components/UserInfoView';
import { CheckCircle2, AlertTriangle, Network, ArrowUpRight, Github, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'smartshop_products_catalog';
const WISHLIST_KEY = 'smartshop_wishlist_ids';
const THEME_KEY = 'smartshop-theme';
const USER_PROFILE_KEY = 'smartshop_user_profile';
const CART_STORAGE_KEY = 'smartshop_cart_items';
const PURCHASED_STORAGE_KEY = 'smartshop_purchased_items';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    showToast(`Switched to ${!isDark ? 'Dark' : 'Light'} mode.`);
  };

  // User Profile state
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(USER_PROFILE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...DEFAULT_USER_PROFILE,
            ...parsed,
            name: parsed.name || DEFAULT_USER_PROFILE.name,
            avatarUrl: parsed.avatarUrl || parsed.avatar || DEFAULT_USER_PROFILE.avatarUrl
          };
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_USER_PROFILE;
  });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_CART_ITEMS;
  });

  // Purchased items / orders state
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>(() => {
    try {
      const saved = localStorage.getItem(PURCHASED_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PURCHASED_ITEMS;
  });

  // Sync user state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(PURCHASED_STORAGE_KEY, JSON.stringify(purchasedItems));
    } catch {}
  }, [purchasedItems]);

  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return ['LAP-001', 'PHO-001', 'GAM-001'];
  });

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    const exists = wishlistIds.includes(productId);
    showToast(exists ? 'Removed from Wishlist.' : 'Saved to Wishlist!');
  };

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [initialAlgorithmTab, setInitialAlgorithmTab] = useState<'merge' | 'quick' | 'binary'>('merge');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<{ id: string; name: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add Product Handler
  const handleAddProduct = (newProduct: Product): boolean => {
    if (!newProduct) return false;
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name || 'Product'}" to the catalog!`);
    return true;
  };

  // Delete Product Handler
  const confirmDelete = () => {
    if (!deleteCandidate) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteCandidate.id));
    showToast(`Deleted "${deleteCandidate?.name ?? 'Product'}" from catalog.`);
    setDeleteCandidate(null);
  };

  // Reset to default products
  const handleResetDatabase = () => {
    if (window.confirm('Reset catalog to the default DAA Assignment 4 dataset?')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Catalog restored to default 32 products.');
    }
  };

  // User Profile handlers
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profile details updated successfully.');
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    if (!product) return;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item?.product?.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: (next[existingIndex]?.quantity ?? 0) + quantity,
        };
        return next;
      } else {
        const newItem: CartItem = {
          product,
          quantity,
          addedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        };
        return [newItem, ...prev];
      }
    });
    showToast(`Added "${product.name || 'Product'}" to cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed item from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Cart cleared.');
  };

  // Checkout Handler: converts cart items into purchased items
  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) return;
    const now = new Date();
    const orderTimestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const orderId = `ORD-2025-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPurchases: PurchasedItem[] = cartItems.map((cartItem, idx) => ({
      id: `${orderId}-${idx + 1}`,
      orderId,
      product: cartItem.product,
      quantity: cartItem.quantity,
      purchaseDate: orderTimestamp,
      pricePaid: (cartItem.product?.price ?? 0) * cartItem.quantity,
      deliveryStatus: 'In Transit',
      trackingNumber: `TRACK-${Math.floor(100000 + Math.random() * 900000)}`,
      deliveryEstimate: 'Arriving in 2-3 business days',
    }));

    setPurchasedItems((prev) => [...newPurchases, ...prev]);
    setCartItems([]);
    showToast(`Order #${orderId} placed successfully!`);
  };

  // Navigation helper for Hero Dashboard
  const handleHeroNavigate = (tab: string, category?: string, algoTab?: 'merge' | 'quick' | 'binary') => {
    if (category) {
      setSelectedCategory(category);
    }
    if (algoTab) {
      setInitialAlgorithmTab(algoTab);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onResetDatabase={handleResetDatabase}
        totalProducts={products.length}
        wishlistCount={wishlistIds.length}
        cartCount={cartItems.reduce((acc, item) => acc + (item?.quantity ?? 1), 0)}
        userName={userProfile?.name ?? DEFAULT_USER_PROFILE.name}
        userAvatar={userProfile?.avatarUrl ?? DEFAULT_USER_PROFILE.avatarUrl}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Real-time live status and telemetry ticker */}
      <RealTimeStatusBar
        totalProducts={products.length}
        activeTab={activeTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Consistent Primary Section Navigation Bar */}
        <SmartShopPageNav
          activeTab={activeTab}
          onNavigate={(tab) => handleHeroNavigate(tab)}
          totalProducts={products.length}
          cartCount={cartItems.reduce((acc, item) => acc + (item?.quantity ?? 1), 0)}
        />

        {activeTab === 'home' && (
          <HeroDashboard 
            products={products} 
            onNavigate={(tab, cat, algo) => handleHeroNavigate(tab, cat, algo)}
            onViewProduct={(p) => setViewingProduct(p)}
          />
        )}

        {activeTab === 'products' && (
          <ProductsView
            products={products}
            initialCategory={selectedCategory}
            onDeleteProduct={(id, name) => setDeleteCandidate({ id, name })}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
            onViewDetails={(p) => setViewingProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'user' && (
          <UserInfoView
            userProfile={userProfile}
            user={userProfile}
            cartItems={cartItems}
            purchasedItems={purchasedItems}
            onUpdateProfile={handleUpdateProfile}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onPlaceOrder={handleCheckout}
            onCheckout={handleCheckout}
            onAddToCart={handleAddToCart}
            wishlistCount={wishlistIds.length}
            onNavigate={(tab) => handleHeroNavigate(tab)}
          />
        )}

        {activeTab === 'analyzer' && (
          <AlgorithmAnalyzerView 
            products={products} 
            initialTab={initialAlgorithmTab}
          />
        )}

        {activeTab === 'performance' && (
          <AlgorithmPerformanceView 
            products={products}
          />
        )}

        {activeTab === 'algorithms' && (
          <AboutAlgorithmsView />
        )}

        {activeTab === 'pythonExport' && (
          <PythonExportModal />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold font-display text-slate-900 dark:text-white block tracking-tight">
                  SMARTSHOP
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Design & Analysis of Algorithms (DAA) • Assignment 4
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-slate-600 dark:text-slate-400">
              <button 
                onClick={() => handleHeroNavigate('home')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleHeroNavigate('products')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Catalog
              </button>
              <button 
                onClick={() => handleHeroNavigate('analyzer', undefined, 'merge')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Merge Sort Lab
              </button>
              <button 
                onClick={() => handleHeroNavigate('analyzer', undefined, 'quick')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Quick Sort Lab
              </button>
              <button 
                onClick={() => handleHeroNavigate('analyzer', undefined, 'binary')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Binary Search Lab
              </button>
              <button 
                onClick={() => handleHeroNavigate('performance')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Benchmark Engine
              </button>
              <button 
                onClick={() => handleHeroNavigate('algorithms')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Viva Guide
              </button>
              <button 
                onClick={() => handleHeroNavigate('pythonExport')} 
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Python & VS Code
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>
              © 2025 SmartShop • Engineered with genuine manual DAA Algorithms (Merge Sort, Quick Sort, Binary Search).
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetDatabase}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Reset Default Catalog
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Details Modal with DAA Metrics */}
      <ProductDetailsModal
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        isWishlisted={viewingProduct ? wishlistIds.includes(viewingProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        allProducts={products}
        onAddToCart={handleAddToCart}
      />

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold font-display text-base text-slate-900 dark:text-white">
                Delete Product?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Are you sure you want to remove <strong className="text-slate-900 dark:text-white">"{deleteCandidate?.name ?? 'Product'}"</strong> ({deleteCandidate?.id ?? ''}) from the catalog?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/25 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
        existingIds={products.map((p) => p.id)}
      />
    </div>
  );
}
