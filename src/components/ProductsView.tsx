import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  RotateCcw, 
  Cpu, 
  Filter, 
  Search, 
  Plus, 
  PackageOpen, 
  CheckCircle2, 
  Star,
  Sparkles,
  SlidersHorizontal,
  Layers,
  Clock
} from 'lucide-react';
import { Product, SortMetrics, SortOrderType, SortAlgorithmType } from '../types';
import { ProductCard } from './ProductCard';
import { manualMergeSortWithMetrics, manualQuickSortWithMetrics } from '../algorithms/manualAlgorithms';

interface ProductsViewProps {
  products: Product[];
  onDeleteProduct: (id: string, name: string) => void;
  onOpenAddModal: () => void;
  initialCategory?: string;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onDeleteProduct,
  onOpenAddModal,
  initialCategory = 'all',
  wishlistIds = [],
  onToggleWishlist,
  onViewDetails,
  onAddToCart
}) => {
  const [sortedProducts, setSortedProducts] = useState<Product[] | null>(null);
  const [metrics, setMetrics] = useState<SortMetrics | null>(null);
  const [activeSortKey, setActiveSortKey] = useState<string>('reset');
  const [isSortingActive, setIsSortingActive] = useState<boolean>(false);
  const [sortStatusMessage, setSortStatusMessage] = useState<string>('');

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stockOnly, setStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<'all' | 'under15k' | '15k-50k' | 'above50k'>('all');

  useEffect(() => {
    if (initialCategory) {
      setCategoryFilter(initialCategory);
    }
  }, [initialCategory]);

  // Handle manual sorting with simulated realistic micro-transition
  const handleSort = (algorithm: SortAlgorithmType, order: SortOrderType, key: string) => {
    setActiveSortKey(key);
    setIsSortingActive(true);
    const algoName = algorithm === 'merge' ? 'Merge Sort' : 'Quick Sort';
    setSortStatusMessage(`Running ${algoName}...`);

    setTimeout(() => {
      let result;
      if (algorithm === 'merge') {
        result = manualMergeSortWithMetrics(products, order);
      } else {
        result = manualQuickSortWithMetrics(products, order);
      }
      setSortedProducts(result.sortedProducts);
      setMetrics(result.metrics);
      setIsSortingActive(false);
      setSortStatusMessage('✓ Analysis Complete');
    }, 150);
  };

  const handleReset = () => {
    setActiveSortKey('reset');
    setSortedProducts(null);
    setMetrics(null);
    setSortStatusMessage('');
  };

  // Base list to render
  const baseList = sortedProducts ?? products;

  // Filter products by category, search query, stock, rating, and price
  const filteredProducts = baseList.filter((p) => {
    const matchesCategory =
      categoryFilter.toLowerCase() === 'all' || 
      p.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.price.toString().includes(searchQuery);

    const matchesStock = !stockOnly || p.stock > 0;
    const matchesRating = p.rating >= minRating;

    let matchesPrice = true;
    if (priceRange === 'under15k') matchesPrice = p.price < 15000;
    else if (priceRange === '15k-50k') matchesPrice = p.price >= 15000 && p.price <= 50000;
    else if (priceRange === 'above50k') matchesPrice = p.price > 50000;

    return matchesCategory && matchesSearch && matchesStock && matchesRating && matchesPrice;
  });

  const allCategories = ['all', 'Laptops', 'Smartphones', 'Headphones', 'Smartwatches', 'Cameras', 'Tablets', 'Monitors', 'Gaming', 'Accessories', 'Audio'];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>COMMERCIAL CATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Explore Products
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover products and experiment with intelligent sorting and search.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Manual Algorithm Sorting Controls Bar */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              INTELLIGENT DAA SORTING:
            </span>
            {sortStatusMessage && (
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                isSortingActive 
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 animate-pulse'
                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
              }`}>
                {sortStatusMessage}
              </span>
            )}
          </div>

          {/* Sorting Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Merge Sort: Low -> High */}
            <button
              id="btn-sort-merge-asc"
              onClick={() => handleSort('merge', 'asc', 'merge_asc')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeSortKey === 'merge_asc'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>Merge Sort: Low → High</span>
            </button>

            {/* Merge Sort: High -> Low */}
            <button
              id="btn-sort-merge-desc"
              onClick={() => handleSort('merge', 'desc', 'merge_desc')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeSortKey === 'merge_desc'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ArrowDownRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>Merge Sort: High → Low</span>
            </button>

            {/* Quick Sort: Low -> High */}
            <button
              id="btn-sort-quick-asc"
              onClick={() => handleSort('quick', 'asc', 'quick_asc')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeSortKey === 'quick_asc'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Quick Sort: Low → High</span>
            </button>

            {/* Quick Sort: High -> Low */}
            <button
              id="btn-sort-quick-desc"
              onClick={() => handleSort('quick', 'desc', 'quick_desc')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeSortKey === 'quick_desc'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Quick Sort: High → Low</span>
            </button>

            {/* Reset */}
            <button
              id="btn-sort-reset"
              onClick={handleReset}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                activeSortKey === 'reset'
                  ? 'bg-slate-800 dark:bg-slate-700 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }`}
              title="Reset to original unsorted catalog order"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Toolbar: Search, Price Brackets, Rating, In Stock */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, categories or IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Price Range Filter */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 px-2 font-bold uppercase">Price:</span>
              {[
                { id: 'all', label: 'All' },
                { id: 'under15k', label: '< ₹15k' },
                { id: '15k-50k', label: '₹15k–₹50k' },
                { id: 'above50k', label: '> ₹50k' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriceRange(p.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    priceRange === p.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 px-2 font-bold uppercase">Rating:</span>
              {[
                { r: 0, label: 'All' },
                { r: 4.5, label: '4.5+' },
                { r: 4.8, label: '4.8+' }
              ].map((rt) => (
                <button
                  key={rt.r}
                  onClick={() => setMinRating(rt.r)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-0.5 ${
                    minRating === rt.r 
                      ? 'bg-amber-500 text-white' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {rt.r > 0 && <Star className="w-2.5 h-2.5 fill-current" />}
                  <span>{rt.label}</span>
                </button>
              ))}
            </div>

            {/* In Stock toggle */}
            <button
              onClick={() => setStockOnly(!stockOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                stockOnly 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${stockOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>In Stock Only</span>
            </button>
          </div>
        </div>

        {/* Categories Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100 dark:border-slate-800">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize shrink-0 transition-all ${
                categoryFilter.toLowerCase() === cat.toLowerCase()
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Live Execution Metrics Banner */}
      {metrics && (
        <div 
          id="execution-metrics-banner"
          className="rounded-3xl p-6 border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/30 dark:from-[#131C31] dark:via-[#131C31] dark:to-indigo-950/20 shadow-sm space-y-4 animate-in fade-in duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-indigo-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold tracking-wide shadow-xs">
                {metrics.algorithm}
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-slate-700">
                {metrics.order === 'asc' ? 'Price: Low → High' : 'Price: High → Low'}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline font-mono">
                • Executed at {metrics.timestamp}
              </span>
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Actual High-Resolution Execution Metrics
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Execution Time
              </span>
              <span className="text-lg font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                {metrics.executionTimeMs} ms
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Comparisons
              </span>
              <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                {metrics.comparisons}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Input Size (N)
              </span>
              <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                {products.length} products
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                Asymptotic Bound
              </span>
              <span className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                O(n log n)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Result Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</strong> of {products.length} products
        </span>
        {activeSortKey !== 'reset' && (
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
            Sorted using {activeSortKey.includes('merge') ? 'Merge Sort' : 'Quick Sort'}
          </span>
        )}
      </div>

      {/* Products Grid: 4 cols desktop, 2 cols tablet, 1 col mobile */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={p}
              index={idx}
              onDelete={onDeleteProduct}
              isWishlisted={wishlistIds.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-[#131C31] rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
            No Products Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No products match your current search query or applied filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setPriceRange('all');
              setMinRating(0);
              setStockOnly(false);
            }}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
