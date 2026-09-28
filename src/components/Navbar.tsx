import React, { useState } from 'react';
import { 
  Network, 
  Package, 
  Search, 
  Cpu, 
  LineChart, 
  GraduationCap, 
  Plus, 
  Heart,
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  ShoppingBag,
  Home,
  Terminal,
  User
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAddModal: () => void;
  onResetDatabase: () => void;
  totalProducts: number;
  wishlistCount?: number;
  cartCount?: number;
  userName?: string;
  userAvatar?: string;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  totalProducts,
  wishlistCount = 0,
  cartCount = 0,
  userName = 'Kanwal',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  isDark = false,
  onToggleTheme
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: `Products (${totalProducts})`, icon: Package },
    { id: 'user', label: cartCount > 0 ? `User Info (${cartCount})` : 'User Info', icon: User },
    { id: 'analyzer', label: 'Algorithm Lab', icon: Cpu },
    { id: 'performance', label: 'Performance', icon: LineChart },
    { id: 'algorithms', label: 'Viva Guide', icon: GraduationCap },
    { id: 'pythonExport', label: 'Python & VS Code', icon: Terminal },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#0B0F19]/85 backdrop-blur-xl border-b border-indigo-100/70 dark:border-slate-800/80 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-transform active:scale-98"
            id="smartshop-brand-logo"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-all">
              <Network className="w-6 h-6 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold font-display tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 dark:from-white dark:via-indigo-100 dark:to-indigo-300 bg-clip-text text-transparent">
                  SMARTSHOP
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800/60 flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-500" />
                  DAA LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Shop Smarter • Understand Algorithms
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links with subtle animated indicators */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Search, Wishlist, Theme Toggle, Activity Cart, Add Product */}
          <div className="flex items-center gap-2">
            {/* Search Quick-Jump */}
            <button
              onClick={() => handleNavClick('analyzer')}
              className={`p-2.5 rounded-2xl border transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-indigo-600 text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
              title="Search and Algorithm Lab"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Icon with Dynamic Badge */}
            <button
              onClick={() => handleNavClick('products')}
              className="relative p-2.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-200 dark:hover:border-pink-900/60 transition-all"
              title={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-amber-400 hover:border-indigo-200 dark:hover:border-slate-700 transition-all"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Button: Direct access to Added to Cart in User Info */}
            <button
              onClick={() => handleNavClick('user')}
              className={`relative p-2.5 rounded-2xl border transition-all ${
                activeTab === 'user'
                  ? 'bg-indigo-600 text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
              }`}
              title={`Shopping Cart (${cartCount} items)`}
              id="navbar-cart-button"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            <button
              onClick={() => handleNavClick('user')}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all ${
                activeTab === 'user'
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-200'
              }`}
              title="User Profile & Order History"
              id="navbar-user-profile-button"
            >
              <img
                src={userAvatar}
                alt={userName}
                className="w-6 h-6 rounded-full object-cover border border-indigo-400"
              />
              <span className="text-xs font-bold font-display max-w-[80px] truncate">
                {userName}
              </span>
            </button>

            {/* Add Product Button */}
            <button
              onClick={onOpenAddModal}
              className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200/80 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                        : 'bg-slate-100/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  onOpenAddModal();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 col-span-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product to Catalog</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
