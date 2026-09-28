import React from 'react';
import { 
  Home, 
  Package, 
  Cpu, 
  LineChart, 
  GraduationCap, 
  Terminal,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Zap,
  Activity,
  User
} from 'lucide-react';

export interface SmartShopPageNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  totalProducts?: number;
  cartCount?: number;
  className?: string;
}

export interface NavSection {
  id: string;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  description: string;
  accent: string;
}

export const SmartShopPageNav: React.FC<SmartShopPageNavProps> = ({
  activeTab,
  onNavigate,
  totalProducts = 32,
  cartCount = 0,
  className = ''
}) => {
  const sections: NavSection[] = [
    {
      id: 'home',
      name: 'Home',
      shortName: 'Home',
      icon: Home,
      badge: 'Live',
      description: 'Real-time store & algorithm hub',
      accent: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'products',
      name: 'Products',
      shortName: 'Products',
      icon: Package,
      badge: `${totalProducts}`,
      description: 'E-commerce catalog with manual sorting',
      accent: 'from-indigo-600 to-violet-600'
    },
    {
      id: 'user',
      name: 'User Info',
      shortName: 'User Info',
      icon: User,
      badge: cartCount > 0 ? `${cartCount} in Cart` : 'Orders',
      description: 'User details, added to cart & purchased products',
      accent: 'from-pink-600 to-rose-600'
    },
    {
      id: 'analyzer',
      name: 'Algorithm Lab',
      shortName: 'Lab',
      icon: Cpu,
      badge: 'Red ➔ Green',
      description: 'Visual sort with color transition',
      accent: 'from-cyan-600 to-blue-600'
    },
    {
      id: 'performance',
      name: 'Performance',
      shortName: 'Benchmarks',
      icon: LineChart,
      badge: 'N=10–1000',
      description: 'Empirical benchmark telemetry',
      accent: 'from-purple-600 to-pink-600'
    },
    {
      id: 'algorithms',
      name: 'About',
      shortName: 'About',
      icon: GraduationCap,
      badge: 'Viva Guide',
      description: 'Theoretical complexities & exam FAQ',
      accent: 'from-amber-600 to-orange-600'
    },
    {
      id: 'pythonExport',
      name: 'Python & VS Code',
      shortName: 'Python',
      icon: Terminal,
      badge: 'Flask API',
      description: 'Backend script & VS Code terminal',
      accent: 'from-emerald-600 to-teal-600'
    }
  ];

  const currentSection = sections.find((s) => s.id === activeTab) || sections[0];

  return (
    <nav 
      role="navigation" 
      aria-label="SmartShop Primary Navigation Bar"
      className={`w-full mb-6 space-y-2 sticky top-[48px] z-30 ${className}`}
      id="smartshop-page-nav"
    >
      {/* Premium Glassmorphic Navigation Bar on 1st visible screen */}
      <div className="bg-white/95 dark:bg-[#111A2E]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-indigo-200/60 dark:border-slate-800 p-2 sm:p-2.5 shadow-lg shadow-indigo-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          
          {/* Left Context: Return Home / Current Page Breadcrumb & Real-Time Indicator */}
          <div className="flex items-center justify-between px-2 pt-1 lg:pt-0 lg:px-2 border-b lg:border-b-0 border-slate-100 dark:border-slate-800/80 pb-2 lg:pb-0">
            <div className="flex items-center gap-2">
              {activeTab !== 'home' ? (
                <button
                  type="button"
                  id="smartshop-nav-back-home"
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200/80 dark:border-indigo-800 transition-all active:scale-95 group shadow-2xs"
                  title="Return to Home screen"
                  aria-label="Back to Home"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Home</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-500/20">
                  <Home className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Home Page</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {currentSection.name}
                </span>
              </div>
            </div>

            {/* Real-time active chip */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">REAL-TIME ACTIVE</span>
                <span className="sm:hidden">LIVE</span>
              </span>
            </div>
          </div>

          {/* Primary Section Buttons on 1st Screen */}
          <div className="overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max px-1">
              {sections.map((section) => {
                const isActive = activeTab === section.id;
                const Icon = section.icon;

                return (
                  <button
                    key={section.id}
                    id={`smartshop-nav-btn-${section.id}`}
                    type="button"
                    onClick={() => onNavigate(section.id)}
                    aria-current={isActive ? 'page' : undefined}
                    title={section.description}
                    className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 text-white shadow-md shadow-indigo-500/30 ring-2 ring-indigo-400/50 dark:ring-indigo-500/50 scale-[1.02]'
                        : 'bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                        isActive
                          ? 'text-white scale-110'
                          : 'text-indigo-600 dark:text-indigo-400 group-hover:scale-110'
                      }`}
                    />
                    <span className="whitespace-nowrap tracking-tight font-display">
                      {section.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {section.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};
