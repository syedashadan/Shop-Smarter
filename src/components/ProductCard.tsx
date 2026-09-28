import React, { useState } from 'react';
import { Star, Trash2, Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string, name: string) => void;
  index: number;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onDelete, 
  index,
  isWishlisted = false,
  onToggleWishlist,
  onViewDetails,
  onAddToCart
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-xl hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
    >
      <div>
        {/* Product Image Stage */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60';
            }}
          />

          {/* Index & Product ID tags */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-semibold">
              #{index}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-slate-800 dark:text-slate-200 text-[10px] font-mono font-semibold border border-black/5 dark:border-white/5">
              {product.id}
            </span>
          </div>

          {/* Top Right Action Buttons: Wishlist & Delete */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {onToggleWishlist && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className="w-8 h-8 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs flex items-center justify-center text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-95 transition-all shadow-xs"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-slate-600 dark:text-slate-300'}`} />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id, product.name);
              }}
              title="Delete product"
              className="w-8 h-8 rounded-xl bg-white/95 dark:bg-slate-900/95 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600 border border-black/5 dark:border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-slate-900 dark:text-white font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-400 font-mono">(120+)</span>
            </div>
          </div>

          <h3 
            className="font-bold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" 
            title={product.name}
          >
            {product.name}
          </h3>

          {product.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block font-mono">
            Price
          </span>
          <span className="text-lg font-extrabold font-display text-indigo-600 dark:text-indigo-400">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span 
            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
              product.stock > 10 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' 
                : product.stock > 0 
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>

          {onAddToCart && (
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`p-1.5 rounded-xl border transition-all ${
                justAdded
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : product.stock === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                    : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white'
              }`}
              title={product.stock === 0 ? 'Out of stock' : justAdded ? 'Added to Cart!' : 'Add to Cart'}
            >
              {justAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </button>
          )}

          {onViewDetails && (
            <button
              onClick={() => onViewDetails(product)}
              className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
              title="View product details & algorithm analysis"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
