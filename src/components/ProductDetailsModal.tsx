import React, { useState } from 'react';
import { X, Star, Heart, CheckCircle2, Cpu, BarChart2, Split, Search, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  allProducts: Product[];
  onAddToCart?: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  allProducts,
  onAddToCart
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  // Calculate algorithmic context for this product
  // 1. Where does it rank in ascending price?
  const sortedAsc = [...allProducts].sort((a, b) => a.price - b.price);
  const rankAsc = sortedAsc.findIndex(p => p.id === product.id) + 1;

  // 2. Binary search comparisons to find this product's price
  let low = 0;
  let high = sortedAsc.length - 1;
  let binarySearchSteps = 0;
  while (low <= high) {
    binarySearchSteps++;
    const mid = Math.floor((low + high) / 2);
    if (sortedAsc[mid].price === product.price) {
      break;
    } else if (sortedAsc[mid].price < product.price) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/80 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative h-64 md:h-auto bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold font-mono">
                {product.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold">
                {product.category}
              </span>
            </div>
          </div>

          {/* Right: Details & Algorithm Stats */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{product.rating}</span>
                  <span className="text-xs text-slate-400 font-mono">• 128 Verified Ratings</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Stock */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                    Price
                  </span>
                  <span className="text-2xl font-extrabold font-display text-indigo-600 dark:text-indigo-400">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                    Availability
                  </span>
                  <span className={`text-xs font-bold ${product.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                    {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* DAA Algorithm Data Section */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                  <Cpu className="w-4 h-4" />
                  <span>DAA ALGORITHM METRICS</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-xl bg-white/10">
                    <span className="text-[10px] text-white/70 block">Ascending Rank</span>
                    <span className="font-bold text-white">#{rankAsc} of {allProducts.length}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10">
                    <span className="text-[10px] text-white/70 block">Binary Search Cost</span>
                    <span className="font-bold text-cyan-300">{binarySearchSteps} comps</span>
                  </div>
                </div>
                <p className="text-[10px] text-indigo-200">
                  In a pre-sorted dataset of {allProducts.length} items, Binary Search locates ₹{product.price.toLocaleString('en-IN')} within {binarySearchSteps} logarithmic partition check(s).
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {onAddToCart && (
                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs shadow-md transition-all ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                      : product.stock === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/25 active:scale-98'
                  }`}
                >
                  {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  <span>{product.stock === 0 ? 'Out of Stock' : addedAnimation ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>
              )}

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-full sm:w-auto px-4 py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-800'
                    : 'bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
