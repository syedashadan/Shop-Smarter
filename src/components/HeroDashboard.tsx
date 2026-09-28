import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Search, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Eye, 
  Heart, 
  Star, 
  Split, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Code2,
  TrendingUp,
  Boxes,
  Database,
  ArrowDown,
  Package,
  LineChart,
  GraduationCap,
  Terminal,
  Home,
  Compass,
  User,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';

interface HeroDashboardProps {
  products: Product[];
  onNavigate: (tab: string, category?: string, algoTab?: 'merge' | 'quick' | 'binary') => void;
  onViewProduct: (product: Product) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
}

export const HeroDashboard: React.FC<HeroDashboardProps> = ({
  products,
  onNavigate,
  onViewProduct,
  wishlistIds = [],
  onToggleWishlist,
}) => {
  // Interactive Rating Card State with localStorage persistence
  const [userRating, setUserRating] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('smartshop_user_rating');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });
  const [hasRated, setHasRated] = useState<boolean>(false);

  const handleRating = (r: number) => {
    setUserRating(r);
    setHasRated(true);
    try {
      localStorage.setItem('smartshop_user_rating', r.toString());
    } catch {
      // ignore
    }
  };

  // Real Database Statistics
  const prices = products.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 1499;
  const maxPrice = prices.length ? Math.max(...prices) : 114990;
  const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 28450;
  
  // Categories extraction
  const categoryMap = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const curatedCategories = [
    { name: 'Laptops', count: categoryMap['Laptops'] || 4, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60' },
    { name: 'Smartphones', count: categoryMap['Smartphones'] || 4, img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60' },
    { name: 'Headphones', count: categoryMap['Headphones'] || 3, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
    { name: 'Smartwatches', count: categoryMap['Smartwatches'] || 3, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
    { name: 'Cameras', count: categoryMap['Cameras'] || 3, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60' },
    { name: 'Tablets', count: categoryMap['Tablets'] || 3, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60' },
    { name: 'Monitors', count: categoryMap['Monitors'] || 3, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60' },
    { name: 'Gaming', count: categoryMap['Gaming'] || 3, img: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60' },
    { name: 'Accessories', count: categoryMap['Accessories'] || 3, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60' },
    { name: 'Audio', count: categoryMap['Audio'] || 3, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60' },
  ];

  // 8 Featured Products
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-20 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH RICH FLOATING COMPOSITION & GLOWS */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        {/* Soft Futuristic Gradient Glows in Background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-400/20 blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-600/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-cyan-400"></span>
              </span>
              <span className="text-xs font-bold font-mono tracking-wide text-indigo-700 dark:text-indigo-300">
                DAA ASSIGNMENT 4 • REAL PYTHON & TS ALGORITHMS
              </span>
            </div>

            {/* Main Headline with Gradient Treatment */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Shop Smarter.{' '}
              <span className="block mt-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Understand the Algorithm.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              Explore products, search instantly and discover how sorting and searching algorithms power modern e-commerce.
            </p>

            {/* 1st Visible Screen Primary Navigation Buttons Hub */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-cyan-400 font-bold">
                  ★ Instant 1st Screen Quick Access:
                </span>
              </div>

              {/* High-Visibility 1st Screen Button Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {/* 1. Products */}
                <button
                  onClick={() => onNavigate('products')}
                  id="hero-1st-screen-products"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Products
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-semibold">
                          {products.length}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                        Catalog & manual sort
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>

                {/* 2. Algorithm Lab */}
                <button
                  onClick={() => onNavigate('analyzer')}
                  id="hero-1st-screen-analyzer"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-400 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-display text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          Algorithm Lab
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300 font-semibold">
                          Red ➔ Green
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                        Live visual simulation
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                </button>

                {/* 3. Performance */}
                <button
                  onClick={() => onNavigate('performance')}
                  id="hero-1st-screen-performance"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-400 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-display text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          Performance
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-semibold">
                          N=10–1k
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                        Empirical benchmarks
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </button>

                {/* 4. About / Viva Guide */}
                <button
                  onClick={() => onNavigate('algorithms')}
                  id="hero-1st-screen-viva"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          About / Viva
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-300 font-semibold">
                          Theory
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                        Complexities & traces
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </button>

                {/* 5. User Info & Cart */}
                <button
                  onClick={() => onNavigate('user')}
                  id="hero-1st-screen-user"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-400 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-950/70 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-display text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                          User Info & Cart
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-300 font-semibold">
                          Profile
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                        Cart & purchased items
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                </button>

                {/* 6. Python / VS Code */}
                <button
                  onClick={() => onNavigate('pythonExport')}
                  id="hero-1st-screen-python"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-display text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Python / VS Code
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-semibold">
                          Flask
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                        Backend script & seeds
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            {/* Quick Algorithm Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                Merge Sort O(n log n)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                Quick Sort O(n log n)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                Binary Search O(log n)
              </span>
            </div>
          </div>

          {/* Right Hero Visual: Futuristic Floating Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Outer Abstract Circuit Rings */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Radial gradient glow behind device montage */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-cyan-400/25 blur-2xl -z-10" />

              {/* Main Center Floating Card (Modern Tech Showcase) */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-92 rounded-3xl overflow-hidden shadow-2xl border border-white/40 dark:border-indigo-900/50 bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
                  alt="MacBook Pro"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-300 font-semibold">LAP-001 • In Catalog</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-600/80">O(1) Access</span>
                  </div>
                  <h4 className="text-sm font-bold font-display truncate mt-0.5">MacBook Pro M3 Max</h4>
                  <span className="text-base font-extrabold text-white">₹1,14,990</span>
                </div>
              </div>

              {/* Top-Right Floating Product Thumbnail: Smartphone */}
              <div className="absolute -top-4 -right-2 sm:-right-4 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 animate-bounce [animation-duration:6s]">
                <img
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&auto=format&fit=crop&q=80"
                  alt="iPhone 15 Pro"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-[9px] font-mono text-white text-center rounded py-0.5">
                  ₹89,999
                </div>
              </div>

              {/* Bottom-Left Floating Product Thumbnail: Headphones */}
              <div className="absolute -bottom-6 -left-4 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 animate-bounce [animation-duration:7s] [animation-delay:1s]">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80"
                  alt="Sony Headphones"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-[9px] font-mono text-white text-center rounded py-0.5">
                  ₹24,999
                </div>
              </div>

              {/* FLOATING CARD 1: LIVE ALGORITHM ANALYSIS (Clearly labeled SAMPLE DATA preview) */}
              <div className="absolute -bottom-10 right-0 sm:-right-8 p-3.5 rounded-2xl bg-white/95 dark:bg-[#131C31]/95 backdrop-blur-xl border border-indigo-100 dark:border-indigo-900/60 shadow-xl max-w-[210px] space-y-2 z-20">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider font-mono text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ALGORITHM MONITOR
                  </span>
                  <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                    SAMPLE PREVIEW
                  </span>
                </div>
                
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>Merge Sort:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">0.024 ms</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>Quick Sort:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">0.018 ms</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span>Binary Search:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">0.003 ms</span>
                  </div>
                </div>
                <div className="text-[9px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-1">
                  Click Lab to run live backend measurements.
                </div>
              </div>

              {/* FLOATING CARD 2: INTERACTIVE RATING CARD */}
              <div className="absolute -top-10 -left-6 sm:-left-12 p-3.5 rounded-2xl bg-white/95 dark:bg-[#131C31]/95 backdrop-blur-xl border border-indigo-100 dark:border-indigo-900/60 shadow-xl z-20 space-y-1.5">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 cursor-pointer transition-colors ${
                        s <= userRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`}
                      onClick={() => handleRating(s)}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-white block">
                  Understand the algorithm?
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleRating(num)}
                      className={`w-5 h-5 rounded-md text-[10px] font-bold transition-all ${
                        userRating === num
                          ? 'bg-indigo-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {hasRated && (
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 block pt-0.5">
                    ✓ Feedback logged!
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1.5 DEDICATED PAGES DIRECTORY & NAVIGATION HUB */}
      {/* ========================================================================= */}
      <section className="space-y-6" id="pages-directory-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-cyan-500" />
              <span>Full Navigation Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              All Application Pages & Laboratories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Direct access to all 5 dedicated modules, algorithm visualizers, benchmarking tools, and study resources.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start md:self-auto border border-slate-200 dark:border-slate-700">
            5 Core Pages Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Products Catalog */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-800 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                  {products.length} Products
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Products Catalog
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Interactive hardware store featuring real-time manual Merge Sort and Quick Sort by price, 10 categories, binary price search, and DAA metric overlays.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Manual Sort</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Binary Search</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">10 Categories</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 text-indigo-700 dark:text-indigo-300 hover:text-white font-bold text-xs transition-all shadow-2xs group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white"
            >
              <span>Open Products Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Algorithm Lab (Visualizer) */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-100 dark:border-cyan-800 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200/60 dark:border-cyan-800">
                  Interactive Lab
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Algorithm Visualizer Lab
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Step-by-step visual animation for Merge Sort, Quick Sort, and Binary Search with play/pause, step controls, array partition colors, and Python pseudocode.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Merge Sort</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Quick Sort</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Step Scrubber</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('analyzer')}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-indigo-600 text-cyan-700 dark:text-cyan-300 hover:text-white font-bold text-xs transition-all shadow-2xs group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-indigo-600 group-hover:text-white"
            >
              <span>Launch Algorithm Lab</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Performance Benchmarking */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-100 dark:border-purple-800 group-hover:scale-110 transition-transform">
                  <LineChart className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800">
                  N=10 to 1,000
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Performance & Benchmarking
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Head-to-head empirical testing comparing Merge Sort vs Quick Sort on identical data arrays. Evaluates execution times, comparisons, and price distributions.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Execution Time (ms)</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Comparison Counts</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Graphs</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('performance')}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-purple-700 dark:text-purple-300 hover:text-white font-bold text-xs transition-all shadow-2xs group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white"
            >
              <span>Run Performance Benchmarks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 4: DAA Viva & Theory Guide */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-800 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
                  Viva Preparation
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  DAA Viva Study Guide
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Complete academic study guide with step-by-step mathematical traces on sample prices (₹45k, ₹12k, ₹65k, ₹25k, ₹18k), Big-O asymptotic tables, and viva defense FAQs.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Sample Price Traces</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Master Theorem</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">Viva FAQs</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('algorithms')}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-indigo-600 text-emerald-700 dark:text-emerald-300 hover:text-white font-bold text-xs transition-all shadow-2xs group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-indigo-600 group-hover:text-white"
            >
              <span>Study Viva Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 5: Python & VS Code Codebase */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg hover:border-slate-400 dark:hover:border-slate-600 transition-all flex flex-col justify-between group md:col-span-2 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center border border-slate-700 group-hover:scale-110 transition-transform">
                  <Terminal className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-900 text-emerald-400 border border-slate-700">
                  Python 3.11 + VS Code
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  Python Flask Codebase & VS Code Setup
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Full standalone backend package generated for local execution. Includes pure <code className="text-indigo-600 dark:text-indigo-400">algorithms.py</code>, Flask web server <code className="text-indigo-600 dark:text-indigo-400">app.py</code>, SQLite database seeder <code className="text-indigo-600 dark:text-indigo-400">init_db.py</code>, and 1-click copy terminal commands.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">algorithms.py</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">app.py</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">init_db.py</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">VS Code Commands</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('pythonExport')}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md shadow-slate-900/20"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Python Code & VS Code Terminal Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURE STRIP (4 ATTRACTIVE FEATURES) */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-cyan-300 dark:hover:border-cyan-700 transition-all group flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">FAST SEARCH</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Find products instantly with logarithmic complexity.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">SMART SORTING</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Merge Sort & Quick Sort manual implementations.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-all group flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">LIVE ANALYSIS</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Measure real high-resolution performance in ms.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">VISUAL LEARNING</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Watch algorithms work step-by-step in real time.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC STATISTICS WITH REAL DATABASE VALUES */}
      {/* ========================================================================= */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background circuit styling */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
              REAL-TIME DATABASE METRICS
            </span>
            <h3 className="text-2xl font-bold font-display">Active Catalog Analytics</h3>
          </div>
          <button
            onClick={() => onNavigate('performance')}
            className="self-start md:self-auto text-xs font-mono font-bold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Open Comprehensive Benchmark Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total Products</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              {products.length}
            </div>
            <span className="text-[11px] text-cyan-400 font-mono">SQLite Catalog Record</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Categories</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              {Object.keys(categoryMap).length}
            </div>
            <span className="text-[11px] text-indigo-300 font-mono">Segmented Tech Groups</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Lowest Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-emerald-400">
              ₹{minPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-300 font-mono">Catalog Minimum</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Highest Price</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-pink-400">
              ₹{maxPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-pink-300 font-mono">Catalog Maximum</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SHOP BY CATEGORY (10 CURATED GROUPS) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              BROWSE CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All {products.length} Products</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {curatedCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onNavigate('products', cat.name)}
              className="group relative rounded-3xl overflow-hidden aspect-4/5 bg-slate-900 text-left border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-75 group-hover:opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display leading-tight">{cat.name}</h4>
                  <span className="text-[11px] text-slate-300 font-mono">{cat.count} items</span>
                </div>
                <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURED PRODUCTS GRID */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              CURATED SELECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-xl hover:border-indigo-400/50 dark:hover:border-indigo-600/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Product Image Box */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top tags */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-semibold">
                        {product.id}
                      </span>
                    </div>

                    {/* Wishlist button */}
                    {onToggleWishlist && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-95 transition-all shadow-xs"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Body Details */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Price</span>
                    <span className="text-lg font-extrabold font-display text-indigo-600 dark:text-indigo-400">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewProduct(product)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SMARTSHOP STORY SECTION: BEHIND EVERY SMART SEARCH */}
      {/* ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            DAA ARCHITECTURAL PIPELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Behind Every Smart Search
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            In modern commercial e-commerce, raw product catalogs must be organized before fast logarithmic search is possible. SmartShop demonstrates how manual divide-and-conquer algorithms transform raw data into instant results.
          </p>
        </div>

        {/* Visual Pipeline with Animated Connections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">PRODUCT DATA</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unsorted catalog items stored in SQLite database with variable prices and attributes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">SORT PIPELINE</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Merge Sort & Quick Sort order items by price in O(n log n) comparisons.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">BINARY SEARCH</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Logarithmic halving eliminates 50% of candidate items at every step in O(log n).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold font-mono">
              04
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">INSTANT RESULT</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sub-millisecond product retrieval delivered directly to the consumer interface.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ALGORITHM SHOWCASE (3 LARGE INTERACTIVE CARDS) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            CORE DAA FOUNDATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Algorithms Behind SmartShop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Click any algorithm to launch its real-time step visualizer in the Algorithm Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Merge Sort Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Split className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  O(n log n)
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">MERGE SORT</h3>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mt-0.5">
                  Divide → Sort → Merge
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Divides the catalog recursively into halves, sorts sub-arrays, and combines them in linear time. Inherently stable.
                </p>
              </div>

              {/* Mini visual mockup */}
              <div className="h-16 bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-2 flex items-end justify-between gap-1 border border-slate-100 dark:border-slate-800">
                {[30, 60, 45, 80, 20, 95, 50, 70].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-indigo-500 rounded-t-sm"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('analyzer', undefined, 'merge')}
              className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 hover:text-white text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Merge Sort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Sort Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-400 dark:hover:border-purple-600 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                  O(n log n) Avg
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">QUICK SORT</h3>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mt-0.5">
                  Pivot → Partition → Repeat
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Selects an element as pivot and partitions the catalog around it in-place. Excellent cache locality and speed.
                </p>
              </div>

              {/* Mini visual mockup */}
              <div className="h-16 bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-2 flex items-end justify-between gap-1 border border-slate-100 dark:border-slate-800">
                {[40, 25, 80, 50, 90, 30, 65, 75].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-t-sm ${i === 3 ? 'bg-pink-500' : 'bg-purple-500'}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('analyzer', undefined, 'quick')}
              className="w-full py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-600 hover:text-white text-purple-700 dark:text-purple-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Quick Sort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Binary Search Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-400 dark:hover:border-cyan-600 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                  O(log n)
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">BINARY SEARCH</h3>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block mt-0.5">
                  Low → Mid → High
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Halves the search scope at each iteration on pre-sorted catalog arrays. Locates exact prices in at most ⌈log₂ N⌉ steps.
                </p>
              </div>

              {/* Mini visual mockup */}
              <div className="h-16 bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-2 flex items-center justify-between gap-1 border border-slate-100 dark:border-slate-800">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
                  <div
                    key={val}
                    className={`flex-1 h-8 rounded-md flex items-center justify-center text-[9px] font-mono font-bold ${
                      val === 4 ? 'bg-cyan-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('analyzer', undefined, 'binary')}
              className="w-full py-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-600 hover:text-white text-cyan-700 dark:text-cyan-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Binary Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. WHY SMARTSHOP (4 ELEGANT FEATURE BLOCKS) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            THE SMARTSHOP DIFFERENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Why SmartShop?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Real Algorithm Execution</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No simulated numbers. Pure algorithmic logic executing comparisons and swaps on real arrays.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Interactive Visualization</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Play, pause, step forward, and adjust playback speed while inspecting active array boundaries.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Real Product Data</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Full CRUD support: Add, delete, and search realistic products across 10 commercial categories.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Built for DAA Learning</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete with asymptotic master theorem proofs, recurrence relations, and viva examination cards.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL CALL TO ACTION (ELECTRIC INDIGO GRADIENT BANNER) */}
      {/* ========================================================================= */}
      <section className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-xl text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
            START EXPERIMENTING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
            Ready to see algorithms in action?
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-lg mx-auto">
            Test sorting speeds, inspect binary search boundaries, and master DAA concepts through live interactive feedback.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onNavigate('products')}
              className="px-7 py-3 rounded-2xl bg-white text-indigo-700 font-bold text-sm shadow-md hover:bg-indigo-50 active:scale-98 transition-all"
            >
              Explore Products
            </button>
            <button
              onClick={() => onNavigate('analyzer')}
              className="px-7 py-3 rounded-2xl bg-indigo-950/60 hover:bg-indigo-950 text-white font-bold text-sm border border-white/20 active:scale-98 transition-all"
            >
              Open Algorithm Lab
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
