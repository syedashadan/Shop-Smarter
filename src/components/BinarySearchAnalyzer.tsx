import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Activity, 
  Layers, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Product, BinarySearchResult } from '../types';
import { manualMergeSortWithMetrics, manualBinarySearch } from '../algorithms/manualAlgorithms';

interface BinarySearchAnalyzerProps {
  products: Product[];
}

export const BinarySearchAnalyzer: React.FC<BinarySearchAnalyzerProps> = ({ products }) => {
  const [targetInput, setTargetInput] = useState<string>('25000');
  const [searchResult, setSearchResult] = useState<BinarySearchResult | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  // Pre-sort products ascending using manual Merge Sort as required by DAA rules
  const sortedProductsAsc = useMemo(() => {
    return manualMergeSortWithMetrics(products, 'asc').sortedProducts;
  }, [products]);

  // Execute binary search
  const handleRunSearch = (priceToSearch?: number) => {
    const price = priceToSearch ?? parseFloat(targetInput);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid numeric price greater than 0.');
      return;
    }
    const result = manualBinarySearch(sortedProductsAsc, price);
    setSearchResult(result);
    setActiveStepIndex(result.steps.length - 1); // select last step by default
  };

  // Quick Preset Prices
  const quickPresets = [
    { label: '₹25,000 (Multiple Items)', value: 25000 },
    { label: '₹18,000 (Apple Watch)', value: 18000 },
    { label: '₹45,000 (DSLR Camera)', value: 45000 },
    { label: '₹65,000 (Ultra Laptop)', value: 65000 },
    { label: '₹12,000 (JBL Speaker)', value: 12000 },
    { label: '₹99,999 (Not Found Case)', value: 99999 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#E6DCce] text-[#7B4B27] text-xs font-semibold mb-2">
          <Search className="w-3.5 h-3.5" />
          Binary Search Algorithm Analyzer
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#2B2118]">
          Logarithmic Product Price Search
        </h2>
        <p className="text-xs sm:text-sm text-[#7A6B5D] max-w-2xl mt-1">
          Search the catalog in <strong>O(log n)</strong> time by repeatedly halving the search space.
          Includes dynamic Low → Mid → High step trace and multi-product matching.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 shadow-xs space-y-5">
        <div className="max-w-2xl">
          <label 
            htmlFor="binary-search-input"
            className="block text-xs font-bold text-[#8A796A] uppercase tracking-wider mb-2"
          >
            Enter Target Price to Search (₹):
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8A796A]">
                ₹
              </span>
              <input
                id="binary-search-input"
                type="number"
                min="1"
                step="any"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="e.g. 25000, 18000, 45000"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#D5C4B4] bg-[#FAF7F2] text-[#2B2118] font-mono text-base font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#7B4B27] focus:bg-white transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRunSearch();
                }}
              />
            </div>
            <button
              onClick={() => handleRunSearch()}
              className="bg-[#7B4B27] hover:bg-[#633B1E] text-white px-6 py-3 rounded-xl font-semibold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Search className="w-4 h-4" />
              Run Binary Search
            </button>
          </div>
        </div>

        {/* Viva Test Presets */}
        <div>
          <span className="text-xs font-semibold text-[#8A796A] uppercase tracking-wider block mb-2">
            Quick Viva Test Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  setTargetInput(preset.value.toString());
                  handleRunSearch(preset.value);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#4A3B2C] border border-[#E8DEC8] transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Prerequisite Notice */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9] text-xs text-[#6B5E52]">
          <Info className="w-4 h-4 text-[#7B4B27] shrink-0 mt-0.5" />
          <div>
            <strong>DAA Rule Verified:</strong> Binary Search requires an ordered sequence. The product
            array below is pre-sorted in ascending order (Low → High) via our manual{' '}
            <strong>Merge Sort</strong> before running Binary Search.
          </div>
        </div>
      </div>

      {/* Search Result & Metrics Display */}
      {searchResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F0EBE1] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {searchResult.found ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                      <CheckCircle2 className="w-4 h-4" />
                      Product Found ({searchResult.matchedProducts.length} matching)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                      <XCircle className="w-4 h-4" />
                      No Product at this Price
                    </span>
                  )}
                  <span className="text-xs text-[#8A796A] font-mono">
                    Search Target = ₹{searchResult.searchedPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-[#2B2118]">
                  Search Outcome & Benchmark Metrics
                </h3>
              </div>

              {/* Performance Metrics */}
              <div className="flex flex-wrap gap-2.5">
                <div className="bg-[#FAF7F2] border border-[#EAE3D9] px-3.5 py-2 rounded-xl text-center">
                  <span className="text-[10px] text-[#8A796A] uppercase font-bold block">
                    Comparisons
                  </span>
                  <div className="text-base font-bold font-mono text-[#7B4B27]">
                    {searchResult.comparisons}
                  </div>
                </div>

                <div className="bg-[#FAF7F2] border border-[#EAE3D9] px-3.5 py-2 rounded-xl text-center">
                  <span className="text-[10px] text-[#8A796A] uppercase font-bold block">
                    Execution Time
                  </span>
                  <div className="text-base font-bold font-mono text-blue-700">
                    {searchResult.executionTimeMs} ms
                  </div>
                </div>

                <div className="bg-[#FAF7F2] border border-[#EAE3D9] px-3.5 py-2 rounded-xl text-center">
                  <span className="text-[10px] text-[#8A796A] uppercase font-bold block">
                    Complexity
                  </span>
                  <div className="text-base font-bold font-mono text-[#2B2118]">
                    O(log n)
                  </div>
                </div>
              </div>
            </div>

            {/* Matched Products Cards */}
            {searchResult.found && searchResult.matchedProducts.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A796A]">
                  Matching Product(s) Found in Dataset:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {searchResult.matchedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E6DCce] flex items-center gap-3.5"
                    >
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-16 h-16 rounded-xl object-cover bg-[#F5EFE6] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold text-[#7B4B27] bg-white px-2 py-0.5 rounded-md border border-[#E8DEC8] inline-block mb-1">
                          {p.category}
                        </span>
                        <h5 className="font-bold text-xs text-[#2B2118] truncate" title={p.name}>
                          {p.name}
                        </h5>
                        <div className="text-sm font-bold font-display text-[#7B4B27] mt-0.5">
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[11px] text-[#8A796A] font-mono">ID: {p.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Step-by-Step Execution Trace (Low → Mid → High) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-display text-[#2B2118]">
                    Dynamic Execution Trace (Low → Mid → High)
                  </h4>
                  <p className="text-xs text-[#7A6B5D]">
                    Step-by-step decisions generated directly by the manual Binary Search algorithm
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#7B4B27] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EAE3D9]">
                  {searchResult.steps.length} Steps Total
                </span>
              </div>

              <div className="space-y-3">
                {searchResult.steps.map((step, idx) => {
                  const isMatch = step.action.includes('==');
                  return (
                    <div
                      key={step.stepNumber}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                        activeStepIndex === idx
                          ? 'border-[#7B4B27] bg-[#FFFDF9] shadow-xs'
                          : 'border-[#EAE3D9] bg-[#FAF7F2] hover:border-[#D5C4B4]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#7B4B27] text-white text-xs font-bold flex items-center justify-center font-mono">
                            {step.stepNumber}
                          </span>
                          <span className="text-xs font-bold text-[#2B2118]">
                            Step {step.stepNumber} Evaluation
                          </span>
                          {isMatch && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                              MATCH FOUND
                            </span>
                          )}
                        </div>

                        {/* Search Window Info */}
                        <div className="flex items-center gap-2 text-xs font-mono text-[#6B5E52]">
                          <span>Low: [{step.lowIndex}]</span>
                          <span>•</span>
                          <span className="font-bold text-[#7B4B27]">Mid: [{step.midIndex}]</span>
                          <span>•</span>
                          <span>High: [{step.highIndex}]</span>
                        </div>
                      </div>

                      {/* Middle price comparison detail */}
                      <div className="p-2.5 rounded-xl bg-white border border-[#EAE3D9] text-xs font-mono mb-2 flex items-center justify-between flex-wrap gap-2">
                        <div>
                          Middle Price: <strong>₹{step.midPrice.toLocaleString('en-IN')}</strong> at index{' '}
                          {step.midIndex}
                        </div>
                        <div className="text-[#7B4B27] font-semibold">{step.action}</div>
                      </div>

                      {/* Step explanation */}
                      <div className="flex items-center gap-2 text-xs font-medium text-[#2B2118]">
                        <ArrowRight className="w-3.5 h-3.5 text-[#7B4B27] shrink-0" />
                        <span>{step.explanation}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pre-Sorted Products Array Table with Visual Highlighting */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-[#2B2118]">
              Pre-Sorted Search Space (Ascending Array)
            </h3>
            <p className="text-xs text-[#7A6B5D]">
              Array of {sortedProductsAsc.length} products sorted by price. Inspect indices inspected by
              the algorithm.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#7B4B27] border border-[#EAE3D9]">
            Low → High Sorted
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#EAE3D9]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-[#8A796A] font-bold uppercase tracking-wider border-b border-[#EAE3D9]">
              <tr>
                <th className="py-3 px-4">Index</th>
                <th className="py-3 px-4">Product ID</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Price (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE1]">
              {sortedProductsAsc.map((p, idx) => {
                const isTarget = searchResult && p.price === searchResult.searchedPrice;
                const isMidInActiveStep =
                  searchResult &&
                  activeStepIndex >= 0 &&
                  searchResult.steps[activeStepIndex]?.midIndex === idx;

                let rowBg = 'hover:bg-[#FAF7F2]';
                if (isTarget) {
                  rowBg = 'bg-amber-50/80 font-semibold';
                } else if (isMidInActiveStep) {
                  rowBg = 'bg-blue-50/80';
                }

                return (
                  <tr key={p.id} className={`${rowBg} transition-colors`}>
                    <td className="py-2.5 px-4 font-mono text-[#8A796A]">
                      <div className="flex items-center gap-1.5">
                        <span>{idx}</span>
                        {isMidInActiveStep && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white font-sans">
                            MID
                          </span>
                        )}
                        {isTarget && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-600 text-white font-sans">
                            MATCH
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-mono font-medium text-[#2B2118]">{p.id}</td>
                    <td className="py-2.5 px-4 text-[#2B2118] font-medium">{p.name}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#FAF7F2] text-[#7B4B27] border border-[#E8DEC8]">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-[#7B4B27]">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
