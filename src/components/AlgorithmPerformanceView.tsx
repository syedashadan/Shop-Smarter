import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { manualMergeSortWithMetrics, manualQuickSortWithMetrics } from '../algorithms/manualAlgorithms';
import { 
  LineChart, 
  BarChart3, 
  Trophy, 
  Cpu, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Play,
  RotateCcw,
  TrendingUp,
  Info,
  SlidersHorizontal,
  Split
} from 'lucide-react';

interface BenchmarkRunResult {
  size: number;
  mergeTime: number;
  quickTime: number;
  mergeComps: number;
  quickComps: number;
  timestamp: string;
}

interface AlgorithmPerformanceViewProps {
  products?: Product[];
}

export const AlgorithmPerformanceView: React.FC<AlgorithmPerformanceViewProps> = ({ 
  products = [] 
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(50);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [comparisonResults, setComparisonResults] = useState<Record<number, BenchmarkRunResult>>({});
  const [recentRuns, setRecentRuns] = useState<BenchmarkRunResult[]>([]);

  // Generate deterministic randomized datasets of variable size
  const generateBenchmarkData = (size: number): Product[] => {
    const categories = ['Laptops', 'Smartphones', 'Headphones', 'Smartwatches', 'Cameras', 'Tablets', 'Monitors', 'Gaming', 'Accessories', 'Audio'];
    const samplePrices = [
      1499, 1999, 2499, 3499, 4490, 5990, 8500, 8995, 9499, 9999,
      12000, 13499, 14500, 14999, 15999, 18000, 24999, 25000, 28999, 29999,
      32000, 33900, 34999, 36999, 37990, 39999, 45000, 53990, 65000, 89999, 114990
    ];

    const res: Product[] = [];
    for (let i = 0; i < size; i++) {
      const pseudoRand = ((i * 9301 + 49297) % 233280) / 233280;
      const price = samplePrices[Math.floor(pseudoRand * samplePrices.length)] + ((i % 10) * 100);
      res.push({
        id: `BENCH-${i + 1}`,
        name: `Benchmark Product #${i + 1}`,
        category: categories[i % categories.length],
        price,
        rating: 4.5,
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
        description: 'Benchmark item'
      });
    }
    return res;
  };

  // Run benchmark for a specific size using high-resolution timing
  const runComparisonForSize = (size: number) => {
    setIsRunning(true);
    setTimeout(() => {
      const dataset = generateBenchmarkData(size);

      // 1. Run Merge Sort
      const mRes = manualMergeSortWithMetrics(dataset, 'asc');
      // 2. Run Quick Sort on exact identical input array
      const qRes = manualQuickSortWithMetrics(dataset, 'asc');

      const result: BenchmarkRunResult = {
        size,
        mergeTime: Math.round(mRes.metrics.executionTimeMs * 1000) / 1000,
        quickTime: Math.round(qRes.metrics.executionTimeMs * 1000) / 1000,
        mergeComps: mRes.metrics.comparisons,
        quickComps: qRes.metrics.comparisons,
        timestamp: new Date().toLocaleTimeString()
      };

      setComparisonResults(prev => ({
        ...prev,
        [size]: result
      }));

      setRecentRuns(prev => [result, ...prev.slice(0, 5)]);
      setIsRunning(false);
    }, 150);
  };

  // Run initial benchmarks for default sizes
  useEffect(() => {
    [10, 50, 100, 500, 1000].forEach(sz => {
      const dataset = generateBenchmarkData(sz);
      const mRes = manualMergeSortWithMetrics(dataset, 'asc');
      const qRes = manualQuickSortWithMetrics(dataset, 'asc');
      setComparisonResults(prev => ({
        ...prev,
        [sz]: {
          size: sz,
          mergeTime: Math.round(mRes.metrics.executionTimeMs * 1000) / 1000,
          quickTime: Math.round(qRes.metrics.executionTimeMs * 1000) / 1000,
          mergeComps: mRes.metrics.comparisons,
          quickComps: qRes.metrics.comparisons,
          timestamp: 'Initial Test'
        }
      }));
    });
  }, []);

  const activeResult = comparisonResults[selectedSize] || {
    size: selectedSize,
    mergeTime: 0.05,
    quickTime: 0.04,
    mergeComps: 180,
    quickComps: 210,
    timestamp: 'Cached'
  };

  // Real Database Analytics
  const activeProducts = products.length > 0 ? products : generateBenchmarkData(32);
  const prices = activeProducts.map(p => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 1499;
  const maxPrice = prices.length ? Math.max(...prices) : 114990;
  const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 32500;
  
  const categoryCounts = activeProducts.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Price Distribution brackets
  const priceBrackets = [
    { label: '< ₹15k', count: prices.filter(p => p < 15000).length },
    { label: '₹15k–₹35k', count: prices.filter(p => p >= 15000 && p <= 35000).length },
    { label: '₹35k–₹60k', count: prices.filter(p => p > 35000 && p <= 60000).length },
    { label: '> ₹60k', count: prices.filter(p => p > 60000).length },
  ];
  const maxBracketCount = Math.max(...priceBrackets.map(b => b.count), 1);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 mb-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-500" />
            <span>EMPIRICAL BENCHMARK SUITE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
            Algorithm Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Compare sorting algorithms using the same dataset.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Hardware Profiling Active
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. BENCHMARK CONTROLLER (SIZE SELECTOR & RUN COMPARISON BUTTON) */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
              EXPERIMENT CONFIGURATION
            </span>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
              Select Dataset Size to Benchmark
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Both algorithms sort the exact same randomized input array for scientific validity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Size Selector Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              {[10, 50, 100, 500, 1000].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedSize === sz
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Run Comparison Button */}
            <button
              onClick={() => runComparisonForSize(selectedSize)}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 active:scale-98 transition-all disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? 'RUNNING...' : 'RUN COMPARISON'}</span>
            </button>
          </div>
        </div>

        {/* Head-to-Head Active Size Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Merge Sort Result Card */}
          <div className="p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Split className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">MERGE SORT</h4>
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    Divide & Conquer (Auxiliary Arrays)
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                O(n log n)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Execution Time
                </span>
                <span className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                  {activeResult.mergeTime} ms
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Comparisons
                </span>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {activeResult.mergeComps.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Consistently deterministic across all inputs. Guaranteed Θ(n log n) even in worst cases.
            </p>
          </div>

          {/* Quick Sort Result Card */}
          <div className="p-6 rounded-3xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">QUICK SORT</h4>
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">
                    In-Place Partitioning (Cache Local)
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                O(n log n) Avg
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Execution Time
                </span>
                <span className="text-2xl font-extrabold font-mono text-purple-600 dark:text-purple-400">
                  {activeResult.quickTime} ms
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Comparisons
                </span>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {activeResult.quickComps.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Highly cache-friendly with zero auxiliary array allocation, though prone to O(n²) if unbalanced.
            </p>
          </div>

        </div>

        {/* Execution Time & Comparisons Chart Bars */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
            Comparative Visual Scale ({selectedSize} Items):
          </h4>

          {/* Time Bar Comparison */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">Merge Sort Time: {activeResult.mergeTime} ms</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">Quick Sort Time: {activeResult.quickTime} ms</span>
            </div>
            <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden flex gap-1 p-0.5 border border-slate-200 dark:border-slate-800">
              <div 
                style={{ width: `${Math.max(10, Math.min(90, (activeResult.mergeTime / (activeResult.mergeTime + activeResult.quickTime || 1)) * 100))}%` }}
                className="h-full rounded-full bg-indigo-600"
              />
              <div 
                style={{ width: `${Math.max(10, Math.min(90, (activeResult.quickTime / (activeResult.mergeTime + activeResult.quickTime || 1)) * 100))}%` }}
                className="h-full rounded-full bg-purple-600"
              />
            </div>
          </div>

          {/* Comparisons Bar Comparison */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-700 dark:text-slate-300 font-bold">Merge Comparisons: {activeResult.mergeComps}</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">Quick Comparisons: {activeResult.quickComps}</span>
            </div>
            <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden flex gap-1 p-0.5 border border-slate-200 dark:border-slate-800">
              <div 
                style={{ width: `${Math.max(10, Math.min(90, (activeResult.mergeComps / (activeResult.mergeComps + activeResult.quickComps || 1)) * 100))}%` }}
                className="h-full rounded-full bg-indigo-400"
              />
              <div 
                style={{ width: `${Math.max(10, Math.min(90, (activeResult.quickComps / (activeResult.mergeComps + activeResult.quickComps || 1)) * 100))}%` }}
                className="h-full rounded-full bg-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Scientific Neutrality Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block font-mono">
              Academic Scientific Notice on Execution Measurements:
            </span>
            <p leading-relaxed>
              Neither algorithm is universally "faster" under all conditions. Measured execution times inherently vary depending on the dataset ordering, pivot selection strategy, CPU cache locality, browser JS engine optimizations, and hardware load during testing. Both maintain asymptotic upper bound of O(n log n) under average conditions.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. REAL DATABASE ANALYTICS DASHBOARD */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
            PERSISTENT METRICS
          </span>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Catalog & Price Analytics Dashboard
          </h2>
        </div>

        {/* High-Level Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase font-mono text-slate-400">Total Products</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              {activeProducts.length}
            </div>
            <span className="text-[11px] text-cyan-500 font-mono">Active Items</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase font-mono text-slate-400">Categories</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              {Object.keys(categoryCounts).length}
            </div>
            <span className="text-[11px] text-indigo-500 font-mono">Tech Segments</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase font-mono text-slate-400">Average Price</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-indigo-600 dark:text-indigo-400">
              ₹{avgPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Catalog Mean</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] font-bold uppercase font-mono text-slate-400">Lowest Price</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-500">
              ₹{minPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">Min Bound</span>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase font-mono text-slate-400">Highest Price</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-pink-500">
              ₹{maxPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-pink-600 dark:text-pink-400 font-mono">Max Bound</span>
          </div>
        </div>

        {/* Charts: Price Distribution & Recent Algorithm Runs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Price Distribution Chart */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold font-display text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Product Price Distribution
              </h3>
              <span className="text-xs font-mono text-slate-400">4 Value Brackets</span>
            </div>

            <div className="space-y-3 pt-2">
              {priceBrackets.map((bracket) => {
                const pct = Math.round((bracket.count / maxBracketCount) * 100);
                return (
                  <div key={bracket.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{bracket.label}</span>
                      <span className="text-slate-500 dark:text-slate-400">{bracket.count} products ({Math.round((bracket.count / activeProducts.length) * 100)}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${Math.max(8, pct)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Algorithm Runs Log */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold font-display text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Recent Benchmark Runs
              </h3>
              <span className="text-xs font-mono text-slate-400">Live History</span>
            </div>

            <div className="space-y-2.5 pt-2">
              {recentRuns.length > 0 ? (
                recentRuns.map((run, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">N = {run.size} Items</span>
                      <span className="text-[10px] text-slate-400 block">{run.timestamp}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">Merge: {run.mergeTime} ms</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold block">Quick: {run.quickTime} ms</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 font-mono">
                  Click "RUN COMPARISON" above to log execution timings.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
