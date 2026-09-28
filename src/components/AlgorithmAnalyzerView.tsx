import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause,
  RotateCcw, 
  Trophy, 
  Info, 
  Zap, 
  Split, 
  StepForward, 
  CheckCircle2,
  XCircle,
  Sparkles,
  Search,
  Code2,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { Product, VisualizationStep, BinarySearchResult } from '../types';
import { 
  manualMergeSortWithMetrics, 
  manualQuickSortWithMetrics, 
  generateMergeSortVisualSteps, 
  generateQuickSortVisualSteps,
  manualBinarySearch 
} from '../algorithms/manualAlgorithms';

interface AlgorithmAnalyzerViewProps {
  products: Product[];
  initialTab?: 'merge' | 'quick' | 'binary';
}

export const AlgorithmAnalyzerView: React.FC<AlgorithmAnalyzerViewProps> = ({ 
  products, 
  initialTab = 'merge' 
}) => {
  // Main Lab Tab: MERGE SORT | QUICK SORT | BINARY SEARCH
  const [activeTab, setActiveTab] = useState<'merge' | 'quick' | 'binary'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Extract raw prices from current products dataset
  const productPrices = useMemo(() => products.map((p) => p.price), [products]);
  const maxPrice = useMemo(() => Math.max(...productPrices, 100000), [productPrices]);

  // Pre-sorted products for Binary Search
  const sortedProductsAsc = useMemo(() => {
    return manualMergeSortWithMetrics(products, 'asc').sortedProducts;
  }, [products]);

  // -------------------------------------------------------------
  // Sorting Visualizer State (Merge & Quick)
  // -------------------------------------------------------------
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(180); // ms per step
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Execution Metrics for current tab
  const [sortMetrics, setSortMetrics] = useState<{ time: number; comps: number } | null>(null);

  // Initialize visualizer for active sorting tab
  const initSortVisualizer = (algo: 'merge' | 'quick') => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    let generatedSteps: VisualizationStep[] = [];
    if (algo === 'merge') {
      generatedSteps = generateMergeSortVisualSteps(productPrices);
      const res = manualMergeSortWithMetrics(products, 'asc');
      setSortMetrics({
        time: res.metrics.executionTimeMs,
        comps: res.metrics.comparisons
      });
    } else {
      generatedSteps = generateQuickSortVisualSteps(productPrices);
      const res = manualQuickSortWithMetrics(products, 'asc');
      setSortMetrics({
        time: res.metrics.executionTimeMs,
        comps: res.metrics.comparisons
      });
    }
    setSteps(generatedSteps);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    if (activeTab === 'merge' || activeTab === 'quick') {
      initSortVisualizer(activeTab);
    }
  }, [activeTab, products]);

  // Animation Playback Loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const currentStep = steps[currentStepIdx] || {
    array: productPrices,
    activeIndices: [],
    description: 'Initial dataset ready for sorting.',
  };

  // Check if current step represents a completely sorted array
  const isCompletelySorted = useMemo(() => {
    if (!currentStep?.array || currentStep.array.length === 0) return false;
    if (steps.length > 0 && currentStepIdx === steps.length - 1) return true;
    return currentStep.array.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
  }, [currentStep, currentStepIdx, steps.length]);

  // -------------------------------------------------------------
  // Binary Search State
  // -------------------------------------------------------------
  const [targetInput, setTargetInput] = useState<string>('24999');
  const [binaryResult, setBinaryResult] = useState<BinarySearchResult | null>(() => {
    return manualBinarySearch(sortedProductsAsc, 24999);
  });

  const handleRunBinarySearch = (priceToSearch?: number) => {
    const price = priceToSearch ?? parseFloat(targetInput);
    if (isNaN(price) || price <= 0) {
      return;
    }
    const result = manualBinarySearch(sortedProductsAsc, price);
    setBinaryResult(result);
  };

  const quickPresets = [
    { label: '₹24,999 (Headphones)', value: 24999 },
    { label: '₹14,999 (Watch)', value: 14999 },
    { label: '₹54,999 (iPad)', value: 54999 },
    { label: '₹89,999 (iPhone)', value: 89999 },
    { label: '₹12,499 (Monitor)', value: 12499 },
    { label: '₹99,999 (Not In Catalog)', value: 99999 },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-2xs">
          <Cpu className="w-3.5 h-3.5 text-cyan-500" />
          <span>Interactive Computer Science Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white">
          ALGORITHM LAB
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Don't just read algorithms. Watch them work.
        </p>
      </div>

      {/* Main 3 Tabs: MERGE SORT | QUICK SORT | BINARY SEARCH */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#131C31] border border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            id="tab-btn-merge-sort"
            onClick={() => setActiveTab('merge')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'merge'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Split className="w-4 h-4" />
            <span>MERGE SORT</span>
          </button>

          <button
            id="tab-btn-quick-sort"
            onClick={() => setActiveTab('quick')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quick'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>QUICK SORT</span>
          </button>

          <button
            id="tab-btn-binary-search"
            onClick={() => setActiveTab('binary')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'binary'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>BINARY SEARCH</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB CONTENT: MERGE SORT & QUICK SORT */}
      {/* ========================================================================= */}
      {(activeTab === 'merge' || activeTab === 'quick') && (
        <div className="space-y-6">
          {/* Algorithm Info Banner */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {activeTab === 'merge' ? 'Divide → Sort → Merge' : 'Pivot → Partition → Repeat'}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {activeTab === 'merge' ? 'Stable Divide & Conquer' : 'In-Place Partitioning'}
                </span>
              </div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                {activeTab === 'merge' ? 'Merge Sort Price Visualizer' : 'Quick Sort Price Visualizer'}
              </h2>
            </div>

            {/* Microsecond live execution metrics */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Time
                </span>
                <span className="text-sm font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                  {sortMetrics?.time ?? 0} ms
                </span>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Comparisons
                </span>
                <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-white">
                  {sortMetrics?.comps ?? 0}
                </span>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                  Input Size (N)
                </span>
                <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-white">
                  {productPrices.length}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Array Bars Stage */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
            
            {/* Step Description & Scrubber */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    Step {currentStepIdx + 1} of {steps.length}
                  </span>
                  {isCompletelySorted ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold animate-pulse shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>COMPLETELY SORTED (RED ➔ GREEN TRANSITION)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-mono text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                      <span>SORTING: RED (UNSORTED)</span>
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                  {currentStep.description}
                </p>
              </div>

              {/* Dynamic Legend */}
              <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold font-mono">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                  <span className="w-2.5 h-2.5 rounded-xs bg-red-500 inline-block shadow-xs" /> Unsorted (Red)
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 inline-block" /> Active (Amber)
                </span>
                {activeTab === 'quick' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
                    <span className="w-2.5 h-2.5 rounded-xs bg-purple-500 inline-block" /> Pivot
                  </span>
                )}
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border transition-all ${
                  isCompletelySorted 
                    ? 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-200 border-emerald-400 ring-2 ring-emerald-400/50 font-bold scale-105' 
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                }`}>
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block shadow-xs" /> Sorted (Green)
                </span>
              </div>
            </div>

            {/* Vertical Bar Chart with Red-to-Green Transition */}
            <div className="h-64 sm:h-72 flex items-end justify-between gap-1 sm:gap-1.5 pt-6 pb-2 px-2.5 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto relative">
              {isCompletelySorted && (
                <div className="absolute top-2.5 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold backdrop-blur-xs animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% ORDERED • ALL BARS GREEN</span>
                </div>
              )}

              {currentStep.array.map((price, idx) => {
                const isActive = currentStep.activeIndices.includes(idx);
                const isPivot = activeTab === 'quick' && currentStep.pivotIndex === idx;
                const heightPercent = Math.max(8, Math.round((price / maxPrice) * 100));

                // COLOR TRANSITION: RED ➔ GREEN
                let barColor = '';
                if (isCompletelySorted) {
                  // Completely sorted: Radiant Emerald Green across all bars
                  barColor = 'bg-gradient-to-t from-emerald-600 via-emerald-500 to-teal-400 ring-1 ring-emerald-300 shadow-md shadow-emerald-500/30';
                } else if (isPivot) {
                  // Quick sort pivot: Vibrant Purple
                  barColor = 'bg-gradient-to-t from-purple-600 to-violet-500 shadow-md ring-2 ring-purple-300';
                } else if (isActive) {
                  // Active comparison: Bright Amber / Gold
                  barColor = 'bg-gradient-to-t from-amber-400 to-yellow-300 ring-2 ring-amber-300 shadow-md shadow-amber-400/50 scale-[1.03] z-10';
                } else {
                  // Unsorted element: Red / Crimson (transitions to green upon completion)
                  barColor = 'bg-gradient-to-t from-rose-600 via-rose-500 to-red-500 ring-1 ring-rose-400/40 shadow-xs shadow-rose-500/20';
                }

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative min-w-[12px]"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono px-2 py-1 rounded-md pointer-events-none whitespace-nowrap z-30 shadow-lg">
                      ₹{price.toLocaleString('en-IN')} (#{idx}) {isCompletelySorted ? '✓ Sorted' : '• Unsorted'}
                    </div>

                    {/* Bar with smooth color & height transition */}
                    <div
                      style={{ 
                        height: `${heightPercent}%`,
                        transition: 'height 180ms ease, background-color 400ms ease, box-shadow 400ms ease'
                      }}
                      className={`w-full rounded-t-md ${barColor}`}
                    />

                    {/* Index label */}
                    <span className="text-[9px] font-mono text-slate-400 mt-1.5 select-none hidden sm:block">
                      {idx}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Playback Controls & Speed Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  id="btn-play-pause-sort"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
                </button>

                <button
                  id="btn-step-forward-sort"
                  disabled={isPlaying || currentStepIdx >= steps.length - 1}
                  onClick={() => setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-200 font-bold text-xs disabled:opacity-50 transition-colors"
                >
                  <StepForward className="w-4 h-4" />
                  <span>Step Forward</span>
                </button>

                <button
                  id="btn-reset-sort"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIdx(0);
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                  title="Reset to beginning"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar scrubber */}
              <div className="flex-1 max-w-xs flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">Step:</span>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, steps.length - 1)}
                  value={currentStepIdx}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setCurrentStepIdx(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <span className="text-[10px] text-slate-400 px-2 font-mono">Speed:</span>
                {[
                  { label: '0.5x', speed: 350 },
                  { label: '1x', speed: 180 },
                  { label: '2x', speed: 80 }
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setPlaybackSpeed(s.speed)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                      playbackSpeed === s.speed 
                        ? 'bg-indigo-600 text-white font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Theoretical Foundations & Pseudocode */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Complexity Matrix */}
            <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="font-bold font-display text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Asymptotic Analysis & Recurrence
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Best Case</span>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">O(n log n)</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Average Case</span>
                  <span className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">O(n log n)</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Worst Case</span>
                  <span className="text-sm font-bold font-mono text-purple-600 dark:text-purple-400">
                    {activeTab === 'merge' ? 'O(n log n)' : 'O(n²)'}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block font-mono">Space</span>
                  <span className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                    {activeTab === 'merge' ? 'O(n)' : 'O(log n)'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block font-mono">
                  {activeTab === 'merge' ? 'Master Theorem Recurrence:' : 'Partitioning Mechanics:'}
                </span>
                {activeTab === 'merge' ? (
                  <p className="font-mono text-xs bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-300">
                    T(n) = 2T(n/2) + Θ(n) ⟹ a=2, b=2, d=1 ⟹ Θ(n log n)
                  </p>
                ) : (
                  <p className="font-mono text-xs bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-purple-600 dark:text-purple-300">
                    Avg: T(n) = 2T(n/2) + Θ(n) = O(n log n) | Worst: T(n) = T(n-1) + Θ(n) = O(n²)
                  </p>
                )}
                <p className="leading-relaxed">
                  {activeTab === 'merge'
                    ? 'Merge sort divides the catalog strictly into halves and merges in linear time. Because equal price elements never cross unnecessarily, it is inherently Stable.'
                    : 'Quick sort avoids auxiliary arrays by placing smaller items to the left of the pivot in-place. Because distant elements can swap past each other, it is Unstable.'}
                </p>
              </div>
            </div>

            {/* Right: Pure Manual Pseudocode */}
            <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xs text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  PYTHON MANUAL IMPLEMENTATION
                </span>
                <span className="text-[10px] text-slate-400 font-mono">algorithms.py</span>
              </div>

              <pre className="font-mono text-xs text-slate-200 bg-black/40 p-4 rounded-2xl overflow-x-auto leading-relaxed border border-white/5">
                {activeTab === 'merge'
                  ? `def merge_sort(products, key='price'):
    if len(products) <= 1:
        return products
    mid = len(products) // 2
    left = merge_sort(products[:mid], key)
    right = merge_sort(products[mid:], key)
    return merge(left, right, key)

def merge(left, right, key):
    res = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i][key] <= right[j][key]:
            res.append(left[i]); i += 1
        else:
            res.append(right[j]); j += 1
    res.extend(left[i:])
    res.extend(right[j:])
    return res`
                  : `def quick_sort(products, key='price'):
    if len(products) <= 1:
        return products
    pivot = products[len(products) // 2]
    left = [x for x in products if x[key] < pivot[key]]
    middle = [x for x in products if x[key] == pivot[key]]
    right = [x for x in products if x[key] > pivot[key]]
    return quick_sort(left, key) + middle + quick_sort(right, key)`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB CONTENT: BINARY SEARCH */}
      {/* ========================================================================= */}
      {activeTab === 'binary' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  Logarithmic Halving Search
                </span>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  O(log n)
                </span>
              </div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Binary Search Price Engine
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pre-requisite: Catalog automatically pre-sorted ascending via manual Merge Sort.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                Theoretical Max Comparisons: ⌈log₂ {sortedProductsAsc.length}⌉ = {Math.ceil(Math.log2(sortedProductsAsc.length))}
              </span>
            </div>
          </div>

          {/* Interactive Search Input Box */}
          <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
            <div className="max-w-2xl">
              <label 
                htmlFor="binary-search-lab-input"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono"
              >
                Enter Target Price to Search in Catalog (₹):
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    id="binary-search-lab-input"
                    type="number"
                    min="1"
                    step="any"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="e.g. 24999, 14999, 54999"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRunBinarySearch();
                    }}
                  />
                </div>
                <button
                  onClick={() => handleRunBinarySearch()}
                  className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Search className="w-4 h-4" />
                  <span>Execute Binary Search</span>
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold font-mono">
                Quick Viva Values:
              </span>
              {quickPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => {
                    setTargetInput(preset.value.toString());
                    handleRunBinarySearch(preset.value);
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Result Visualizer Banner */}
          {binaryResult && (
            <div className="bg-white dark:bg-[#131C31] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  {binaryResult.found ? (
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                      <XCircle className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {binaryResult.found
                        ? `Target Price ₹${binaryResult.targetPrice.toLocaleString('en-IN')} Found!`
                        : `Target Price ₹${binaryResult.targetPrice.toLocaleString('en-IN')} Not in Catalog`}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Resolved in {binaryResult.comparisons} comparisons (Execution Time: {binaryResult.executionTimeMs} ms)
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  {binaryResult.matchedProducts.length} Product Match(es)
                </span>
              </div>

              {/* Sorted Array Visualization with Low, Mid, High Pointers */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">
                  Sorted Catalog Array & Active Halving Scope:
                </span>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
                  <div className="flex items-center gap-1.5 min-w-[700px]">
                    {sortedProductsAsc.map((prod, idx) => {
                      const isMatch = binaryResult.found && binaryResult.matchedIndices.includes(idx);

                      return (
                        <div
                          key={prod.id}
                          className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                            isMatch
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-400 font-bold'
                              : 'bg-white dark:bg-[#131C31] border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <span className="text-[9px] font-mono text-slate-400">
                            #{idx}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[8px] text-slate-500 dark:text-slate-400 truncate max-w-[70px]">
                            {prod.name.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Decision Trace */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">
                  Logarithmic Step Trace Timeline:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {binaryResult.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">
                          Step #{step.stepNumber}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold">
                          Mid = {step.midIndex}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-center font-mono text-[11px] py-1 border-y border-slate-200 dark:border-slate-800">
                        <div>
                          <span className="text-[9px] text-slate-400 block">Low</span>
                          <span className="font-bold">{step.lowIndex}</span>
                        </div>
                        <div className="bg-indigo-100 dark:bg-indigo-950/60 rounded-md">
                          <span className="text-[9px] text-indigo-600 dark:text-indigo-400 block">Mid Val</span>
                          <span className="font-bold text-indigo-700 dark:text-indigo-300">
                            ₹{step.midPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block">High</span>
                          <span className="font-bold">{step.highIndex}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {step.decision}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched Product Cards */}
              {binaryResult.matchedProducts.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block font-mono">
                    Matching Catalog Items:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {binaryResult.matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 shadow-2xs flex items-center gap-3"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-slate-400 block">
                            {p.id} • {p.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {p.name}
                          </h4>
                          <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
