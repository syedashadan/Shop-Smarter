import React from 'react';
import { 
  Home, 
  Package, 
  Cpu, 
  LineChart, 
  GraduationCap, 
  Terminal, 
  ArrowLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface PageQuickNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  totalProducts?: number;
  subtitle?: string;
}

export const PageQuickNav: React.FC<PageQuickNavProps> = ({
  activeTab,
  onNavigate,
  totalProducts = 32,
  subtitle
}) => {
  const pages = [
    { id: 'home', label: 'Home', icon: Home, badge: 'Overview' },
    { id: 'products', label: 'Products Catalog', icon: Package, badge: `${totalProducts} Items` },
    { id: 'analyzer', label: 'Algorithm Lab', icon: Cpu, badge: 'Visualizer' },
    { id: 'performance', label: 'Performance', icon: LineChart, badge: 'Benchmark' },
    { id: 'algorithms', label: 'Viva Study Guide', icon: GraduationCap, badge: 'DAA Theory' },
    { id: 'pythonExport', label: 'Python & VS Code', icon: Terminal, badge: 'Backend' },
  ];

  const currentPage = pages.find((p) => p.id === activeTab) || pages[0];

  return (
    <div className="mb-8 space-y-3">
      {/* Top Breadcrumb & Home Return Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-4 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200/90 dark:border-slate-800 shadow-2xs">
        
        {/* Left: Back to Home + Breadcrumb */}
        <div className="flex items-center gap-2 text-xs">
          {activeTab !== 'home' ? (
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800/80 transition-all active:scale-95 group shadow-2xs"
              title="Return to Home Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              <Home className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>SmartShop Home</span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600 dark:text-slate-400 font-medium">Pages</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{currentPage.label}</span>
          </div>
        </div>

        {/* Right: Quick Page Tag */}
        <div className="flex items-center gap-2">
          {subtitle && (
            <span className="hidden md:inline-block text-[11px] text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-2.5 h-2.5 text-cyan-500" />
            Active: {currentPage.badge}
          </span>
        </div>
      </div>

      {/* Quick Navigation Button Pills Row */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 px-1 hidden sm:inline">
            Quick Jump:
          </span>
          {pages.map((page) => {
            const isActive = activeTab === page.id;
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => onNavigate(page.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 text-white border-transparent shadow-md shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-white dark:bg-[#131C31] text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                <span>{page.label}</span>
                <span
                  className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {page.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
