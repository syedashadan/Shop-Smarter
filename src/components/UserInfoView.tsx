import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  PackageCheck, 
  Heart, 
  CheckCircle2, 
  Truck, 
  Clock, 
  CreditCard, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  FileText, 
  RefreshCw, 
  X,
  ExternalLink,
  Receipt
} from 'lucide-react';
import { CartItem, PurchasedItem, UserProfile, Product } from '../types';
import { DEFAULT_USER_PROFILE } from '../data/userData';

interface UserInfoViewProps {
  userProfile?: UserProfile;
  user?: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile> | UserProfile) => void;
  cartItems?: CartItem[];
  onUpdateCartQuantity?: (productId: string, quantity: number) => void;
  onRemoveFromCart?: (productId: string) => void;
  onClearCart?: () => void;
  purchasedItems?: PurchasedItem[];
  onPlaceOrder?: () => void;
  onCheckout?: () => void;
  onAddToCart?: (product: Product) => void;
  wishlistCount?: number;
  onNavigate?: (tab: string) => void;
}

export const UserInfoView: React.FC<UserInfoViewProps> = ({
  userProfile: propUserProfile,
  user: propUser,
  onUpdateProfile,
  cartItems = [],
  onUpdateCartQuantity = (_productId: string, _quantity: number) => {},
  onRemoveFromCart = (_productId: string) => {},
  onClearCart = () => {},
  purchasedItems = [],
  onPlaceOrder,
  onCheckout,
  onAddToCart = (_product: Product) => {},
  wishlistCount = 0,
  onNavigate = (_tab: string) => {}
}) => {
  const userProfile = propUserProfile || propUser || DEFAULT_USER_PROFILE;

  // Active sub-tab within User section: 'all' | 'cart' | 'purchases' | 'profile'
  const [activeSubTab, setActiveSubTab] = useState<'cart' | 'purchases' | 'profile'>('cart');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PurchasedItem | null>(null);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState<string | null>(null);

  // Edit form state
  const [editName, setEditName] = useState(userProfile?.name ?? DEFAULT_USER_PROFILE.name);
  const [editPhone, setEditPhone] = useState(userProfile?.phone ?? DEFAULT_USER_PROFILE.phone);
  const [editAddress, setEditAddress] = useState(userProfile?.deliveryAddress ?? DEFAULT_USER_PROFILE.deliveryAddress);

  // Keep state updated if userProfile changes
  React.useEffect(() => {
    if (userProfile) {
      setEditName(userProfile.name ?? DEFAULT_USER_PROFILE.name);
      setEditPhone(userProfile.phone ?? DEFAULT_USER_PROFILE.phone);
      setEditAddress(userProfile.deliveryAddress ?? DEFAULT_USER_PROFILE.deliveryAddress);
    }
  }, [userProfile]);

  // Cart calculations
  const cartSubtotal = (cartItems || []).reduce((acc, item) => acc + (item?.product?.price ?? 0) * (item?.quantity ?? 1), 0);
  const studentDiscount = Math.round(cartSubtotal * 0.10); // 10% student algorithm discount
  const shippingFee = cartSubtotal > 0 ? 0 : 0; // Free Prime shipping
  const cartTotal = Math.max(0, cartSubtotal - studentDiscount + shippingFee);

  // Total spent calculation from purchased products
  const totalSpent = (purchasedItems || []).reduce((acc, item) => acc + (item?.pricePaid ?? 0) * (item?.quantity ?? 1), 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        name: editName,
        phone: editPhone,
        deliveryAddress: editAddress
      });
    }
    setIsEditingProfile(false);
  };

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) return;
    if (onPlaceOrder) {
      onPlaceOrder();
    } else if (onCheckout) {
      onCheckout();
    }
    setOrderSuccessMessage('Order placed successfully! Items moved to your Purchased Products.');
    setActiveSubTab('purchases');
    setTimeout(() => {
      setOrderSuccessMessage(null);
    }, 6000);
  };

  return (
    <div className="space-y-8 pb-16" id="user-info-section">
      
      {/* Top Welcome / Profile Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#131C31] text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-xl relative overflow-hidden">
        {/* Ambient subtle glow background */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* User Avatar and Primary Details */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-indigo-400/60 shadow-lg"
              />
              <span 
                className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold border-2 border-slate-900 shadow-xs flex items-center gap-1"
                title="Account Status: Verified Student"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ACTIVE
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-300 text-xs font-bold font-mono">
                  {userProfile.membershipTier}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 text-cyan-300 font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  {userProfile.email}
                </span>
                <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                  <Phone className="w-3.5 h-3.5" />
                  {userProfile.phone}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-0.5 text-xs text-indigo-200">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>{userProfile.role} • {userProfile.university}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Edit Profile Button */}
          <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              id="edit-profile-btn"
              onClick={() => setIsEditingProfile(true)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all active:scale-95 shadow-xs"
            >
              Edit Details
            </button>
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-md shadow-indigo-500/30 transition-all active:scale-95"
            >
              Shop Catalog
            </button>
          </div>

        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-indigo-300 block font-mono">
              In Shopping Cart
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xl font-extrabold font-mono text-white">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
              <ShoppingBag className="w-4 h-4 text-indigo-400" />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-cyan-300 block font-mono">
              Purchased Orders
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xl font-extrabold font-mono text-white">
                {purchasedItems.length} orders
              </span>
              <PackageCheck className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block font-mono">
              Total Spent
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xl font-extrabold font-mono text-emerald-300">
                ₹{totalSpent.toLocaleString('en-IN')}
              </span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-pink-300 block font-mono">
              Wishlist Saved
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xl font-extrabold font-mono text-white">
                {wishlistCount} items
              </span>
              <Heart className="w-4 h-4 text-pink-400 fill-pink-500/40" />
            </div>
          </div>
        </div>

      </div>

      {/* Success Banner when order placed */}
      {orderSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Order Confirmed!</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">{orderSuccessMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setOrderSuccessMessage(null)}
            className="p-1 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs: Added to Cart vs Purchased Products vs Profile Details */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          
          {/* Sub-tab 1: Added to Cart */}
          <button
            type="button"
            id="tab-added-to-cart"
            onClick={() => setActiveSubTab('cart')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              activeSubTab === 'cart'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white dark:bg-[#131C31] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Added to Cart</span>
            <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-bold ${
              activeSubTab === 'cart' ? 'bg-white/20 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
            }`}>
              {cartItems.length}
            </span>
          </button>

          {/* Sub-tab 2: Purchased Products */}
          <button
            type="button"
            id="tab-purchased-products"
            onClick={() => setActiveSubTab('purchases')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              activeSubTab === 'purchases'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white dark:bg-[#131C31] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <PackageCheck className="w-4 h-4" />
            <span>Purchased Products</span>
            <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-bold ${
              activeSubTab === 'purchases' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              {purchasedItems.length}
            </span>
          </button>

          {/* Sub-tab 3: User Details & Delivery */}
          <button
            type="button"
            id="tab-user-details"
            onClick={() => setActiveSubTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              activeSubTab === 'profile'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white dark:bg-[#131C31] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>User Details & Shipping</span>
          </button>

        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          User ID: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{userProfile.studentId}</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. ADDED TO CART SECTION */}
      {/* ========================================================= */}
      {activeSubTab === 'cart' && (
        <div className="space-y-6">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Cart Item List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                    Items in Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                  </h3>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white dark:bg-[#131C31] rounded-2xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
                    >
                      {/* Product details */}
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop&q=60';
                          }}
                        />
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono">
                            {item.product.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs font-mono">
                            <span className="text-slate-400">Unit: ₹{item.product.price.toLocaleString('en-IN')}</span>
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                        {/* Quantity modifier */}
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors shadow-2xs"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-mono font-bold text-xs text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors shadow-2xs"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right min-w-[90px]">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Line Total</span>
                          <span className="text-base font-extrabold font-display text-indigo-600 dark:text-indigo-400">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Right 1 Col: Checkout Summary Box */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5 sticky top-28">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                      Order Summary
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                      10% DAA DISCOUNT
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₹{cartSubtotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        Student Scholar Discount
                      </span>
                      <span className="font-bold">-₹{studentDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span>Express Shipping (Prime)</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-base">
                      <span className="font-bold text-slate-900 dark:text-white font-display">Total Amount</span>
                      <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                        ₹{cartTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Delivery Address:</span>
                    </div>
                    <p className="truncate text-slate-500 dark:text-slate-400">{userProfile.deliveryAddress}</p>
                  </div>

                  <button
                    type="button"
                    id="place-order-checkout-btn"
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>CONFIRM & PLACE ORDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center font-mono">
                    🔒 256-Bit SSL Encrypted • Instant DAA Simulation Order
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* Empty Cart View */
            <div className="bg-white dark:bg-[#131C31] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Your Shopping Cart is Empty
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore our catalog of {32} technology products, apply Merge Sort or Quick Sort, and add items to your cart!
              </p>
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 shadow-md shadow-indigo-500/20"
              >
                <span>Browse Products Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. PURCHASED PRODUCTS SECTION */}
      {/* ========================================================= */}
      {activeSubTab === 'purchases' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Order History & Purchased Products ({purchasedItems.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All confirmed orders, tracking numbers, and digital invoice receipts.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
              Total Spent: ₹{totalSpent.toLocaleString('en-IN')}
            </span>
          </div>

          {purchasedItems.length > 0 ? (
            <div className="space-y-4">
              {purchasedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#131C31] rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
                >
                  {/* Order Top Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Order #{item.orderId}
                      </span>
                      <span className="text-slate-400">
                        Placed on {new Date(item.purchaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Delivery Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          item.deliveryStatus === 'Delivered'
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                            : item.deliveryStatus === 'In Transit'
                              ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700 animate-pulse'
                              : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                        }`}
                      >
                        {item.deliveryStatus === 'Delivered' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : item.deliveryStatus === 'In Transit' ? (
                          <Truck className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{item.deliveryStatus}</span>
                      </span>
                    </div>
                  </div>

                  {/* Product card inside order */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop&q=60';
                        }}
                      />
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono">
                          {item.product.category}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {item.product.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <span>Qty: {item.quantity}</span>
                          <span>•</span>
                          <span>Paid: <strong className="text-slate-900 dark:text-white">₹{item.pricePaid.toLocaleString('en-IN')}</strong></span>
                          <span>•</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{item.deliveryEstimate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons: Buy Again & View Digital Receipt */}
                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(item.product);
                          setActiveSubTab('cart');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800 transition-colors shadow-2xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Buy Again</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>View Receipt</span>
                      </button>
                    </div>

                  </div>

                  {/* Tracking footer */}
                  <div className="bg-slate-50 dark:bg-slate-900/80 rounded-xl px-3.5 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-indigo-500" />
                      Tracking: <strong className="text-slate-700 dark:text-slate-300">{item.trackingNumber}</strong>
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Verified Courier Partner
                    </span>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#131C31] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
                <PackageCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                No Purchased Orders Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You haven't placed any orders yet. Add items to your cart and checkout to simulate purchases!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. USER DETAILS & SHIPPING SECTION */}
      {/* ========================================================= */}
      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal & Academic Details */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Student & Personal Information
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold">
                VERIFIED
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Full Name</span>
                <span className="font-bold text-slate-900 dark:text-white">{userProfile.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Email Address</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{userProfile.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Phone Number</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{userProfile.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Student ID</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{userProfile.studentId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Academic Department</span>
                <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[200px] truncate">{userProfile.university}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Member Since</span>
                <span className="font-mono text-slate-900 dark:text-white">{userProfile.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Shipping Address */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Primary Delivery Address
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold">
                DEFAULT
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{userProfile.name} (Campus Delivery)</span>
                <span className="text-[10px] font-mono text-slate-400">PIN: 140413</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {userProfile.deliveryAddress}
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Prime Express 24-Hour Campus Dispatch Available</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              Update Delivery Address
            </button>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* EDIT PROFILE MODAL */}
      {/* ========================================================= */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Edit User Details
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Delivery Address</label>
                <textarea
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 outline-hidden resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIGITAL INVOICE / RECEIPT MODAL */}
      {/* ========================================================= */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-bold font-display text-base text-slate-900 dark:text-white">
                  Tax Invoice / Receipt
                </span>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 bg-slate-50 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">#{selectedReceipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-slate-900 dark:text-white">{userProfile?.name ?? 'User'} ({userProfile?.email ?? ''})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tracking Number:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedReceipt.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span>{new Date(selectedReceipt.purchaseDate).toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>{selectedReceipt.product?.name ?? 'Product'} (x{selectedReceipt.quantity})</span>
                  <span>₹{selectedReceipt.pricePaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Student DAA Discount (Applied)</span>
                  <span>-10%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax & GST (Included)</span>
                  <span>18% (₹{Math.round(selectedReceipt.pricePaid * 0.18).toLocaleString('en-IN')})</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>Total Paid:</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  ₹{selectedReceipt.pricePaid.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
              Verified by SmartShop DAA Automated Order Validation Engine
            </div>

            <button
              type="button"
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
