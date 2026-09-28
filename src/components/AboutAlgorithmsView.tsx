import React from 'react';
import { 
  Split, 
  Zap, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Globe, 
  HelpCircle,
  Code,
  GraduationCap,
  Cpu
} from 'lucide-react';

export const AboutAlgorithmsView: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-2xs">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-500" />
          <span>DAA Assignment 4 Viva Preparation Guide</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white">
          Algorithm Comprehensive Study Guide
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Student-friendly definitions, step-by-step mechanics, asymptotic complexities, and mathematical traces on
          sample viva prices: <strong className="text-indigo-600 dark:text-indigo-400">₹45,000, ₹12,000, ₹65,000, ₹25,000, ₹18,000</strong>.
        </p>
      </div>

      {/* 1. MERGE SORT */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Algorithm 1
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold font-mono">
                Stable Sort
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Merge Sort (Divide and Conquer)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                Definition
              </h4>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Merge Sort is a classic comparison-based, divide-and-conquer algorithm. It recursively
                halves an array of product prices until sub-lists of size 1 remain, sorts the sub-lists,
                and merges them back together in non-decreasing order.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                How It Works
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                <li><strong>Divide:</strong> Compute <code>mid = len // 2</code> and split into Left and Right halves.</li>
                <li><strong>Conquer:</strong> Recursively call <code>merge_sort()</code> on both halves.</li>
                <li><strong>Combine:</strong> Merge the two sorted halves by comparing head prices one-by-one.</li>
              </ol>
            </div>

            {/* Complexity Table */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">
                Asymptotic Complexity Analysis
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Best</span>
                  <strong className="font-mono text-xs text-emerald-600 dark:text-emerald-400">O(n log n)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Average</span>
                  <strong className="font-mono text-xs text-indigo-600 dark:text-indigo-400">O(n log n)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Worst</span>
                  <strong className="font-mono text-xs text-purple-600 dark:text-purple-400">O(n log n)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Space</span>
                  <strong className="font-mono text-xs text-cyan-600 dark:text-cyan-400">O(n)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Pseudocode Box */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Manual Python / DAA Pseudocode
            </h4>
            <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`def merge_sort(products):
    if len(products) <= 1:
        return products

    # 1. Divide
    mid = len(products) // 2
    left = merge_sort(products[:mid])
    right = merge_sort(products[mid:])

    # 2. Combine / Merge
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i]['price'] <= right[j]['price']:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged`}</pre>
            </div>
          </div>
        </div>

        {/* Step-by-step viva walkthrough */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider font-mono text-indigo-600 dark:text-indigo-400">
            Viva Example Demonstration on Assignment Test Data:
          </div>
          <div className="text-xs font-mono bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            Input: [₹45,000, ₹12,000, ₹65,000, ₹25,000, ₹18,000]
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-1 font-mono">
            <p>• <strong>Divide:</strong> Left = [45k, 12k] | Right = [65k, 25k, 18k]</p>
            <p>• <strong>Sort Left:</strong> [45k] and [12k] merge to <strong>[12k, 45k]</strong></p>
            <p>• <strong>Sort Right:</strong> [65k] and [25k, 18k] → [25k, 18k] merges to [18k, 25k], then with [65k] becomes <strong>[18k, 25k, 65k]</strong></p>
            <p>• <strong>Final Merge:</strong> Merge [12k, 45k] with [18k, 25k, 65k] → <strong>[₹12,000, ₹18,000, ₹25,000, ₹45,000, ₹65,000]</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Advantages
            </span>
            <p className="text-slate-600 dark:text-slate-400">Guaranteed O(n log n) runtime even in worst-case; stable sorting.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-1 font-mono">
              <XCircle className="w-3.5 h-3.5" /> Limitations
            </span>
            <p className="text-slate-600 dark:text-slate-400">Requires O(n) auxiliary memory for sub-arrays; slower for tiny in-memory arrays.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 mb-1 font-mono">
              <Globe className="w-3.5 h-3.5" /> Real-World Usage
            </span>
            <p className="text-slate-600 dark:text-slate-400">External sorting for massive files, database sort-merge joins, Linux list sorting.</p>
          </div>
        </div>
      </div>

      {/* 2. QUICK SORT */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-800">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Algorithm 2
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-semibold font-mono">
                In-Place Partitioning
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Quick Sort (Partitioning)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                Definition
              </h4>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Quick Sort is an in-place divide-and-conquer algorithm that selects a "pivot" element from
                the catalog and partitions the remaining elements into two sub-arrays according to whether
                their price is less than or greater than the pivot.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                How It Works
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                <li><strong>Pivot Selection:</strong> Select a pivot price (middle element to prevent sorted worst-case).</li>
                <li><strong>Partition:</strong> Arrange elements so prices &lt; pivot go left, and &gt; pivot go right.</li>
                <li><strong>Recurse:</strong> Recursively apply the algorithm to left and right partitions.</li>
              </ol>
            </div>

            {/* Complexity Table */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">
                Asymptotic Complexity Analysis
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Best</span>
                  <strong className="font-mono text-xs text-emerald-600 dark:text-emerald-400">O(n log n)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Average</span>
                  <strong className="font-mono text-xs text-purple-600 dark:text-purple-400">O(n log n)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Worst</span>
                  <strong className="font-mono text-xs text-rose-600 dark:text-rose-400">O(n²)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Space</span>
                  <strong className="font-mono text-xs text-indigo-600 dark:text-indigo-400">O(log n)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Pseudocode Box */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-purple-400" />
              Manual Python / DAA Pseudocode
            </h4>
            <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`def quick_sort(products):
    if len(products) <= 1:
        return products

    # Choose middle pivot
    pivot = products[len(products) // 2]
    left = []
    middle = []
    right = []

    for item in products:
        if item['price'] < pivot['price']:
            left.append(item)
        elif item['price'] > pivot['price']:
            right.append(item)
        else:
            middle.append(item)

    return quick_sort(left) + middle + quick_sort(right)`}</pre>
            </div>
          </div>
        </div>

        {/* Step-by-step viva walkthrough */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider font-mono text-purple-600 dark:text-purple-400">
            Viva Example Demonstration on Assignment Test Data:
          </div>
          <div className="text-xs font-mono bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            Input: [₹45,000, ₹12,000, ₹65,000, ₹25,000, ₹18,000]
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-1 font-mono">
            <p>• <strong>Pivot:</strong> Pick middle element <strong>₹65,000</strong>.</p>
            <p>• <strong>Partition 1:</strong> Left: [45k, 12k, 25k, 18k] | Middle: [65k] | Right: []</p>
            <p>• <strong>Partition 2 (on Left):</strong> Pivot = 25k → Left: [12k, 18k] | Mid: [25k] | Right: [45k]</p>
            <p>• <strong>Combine:</strong> [12k, 18k] + [25k] + [45k] + [65k] → <strong>[₹12,000, ₹18,000, ₹25,000, ₹45,000, ₹65,000]</strong></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> Advantages
            </span>
            <p className="text-slate-600 dark:text-slate-400">Superior in-memory cache locality; only O(log n) call stack space.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-1 font-mono">
              <XCircle className="w-3.5 h-3.5" /> Limitations
            </span>
            <p className="text-slate-600 dark:text-slate-400">Degrades to O(n²) if an unbalanced pivot is picked repeatedly; not stable.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 mb-1 font-mono">
              <Globe className="w-3.5 h-3.5" /> Real-World Usage
            </span>
            <p className="text-slate-600 dark:text-slate-400">C Standard Library <code>qsort()</code>, JavaScript V8 engine primitive sorts.</p>
          </div>
        </div>
      </div>

      {/* 3. BINARY SEARCH */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-100 dark:border-cyan-800">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Algorithm 3
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 font-semibold font-mono">
                Logarithmic Search
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Binary Search (Divide and Conquer on Ordered Sequences)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                Definition & Prerequisite
              </h4>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Binary Search finds the location of a target price by halving the search space at every step.
                <strong> Mandatory prerequisite:</strong> The array must be pre-sorted (in SmartShop, we sort via
                Merge Sort first).
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                How It Works
              </h4>
              <ol className="list-decimal pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Initialize <code>low = 0</code> and <code>high = len - 1</code>.</li>
                <li>Calculate <code>mid = (low + high) // 2</code>.</li>
                <li>If <code>arr[mid].price == target</code>, element found!</li>
                <li>If <code>target &lt; arr[mid].price</code>, search left half (<code>high = mid - 1</code>).</li>
                <li>If <code>target &gt; arr[mid].price</code>, search right half (<code>low = mid + 1</code>).</li>
              </ol>
            </div>

            {/* Complexity Table */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">
                Asymptotic Complexity Analysis
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Best</span>
                  <strong className="font-mono text-xs text-emerald-600 dark:text-emerald-400">O(1)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Average</span>
                  <strong className="font-mono text-xs text-cyan-600 dark:text-cyan-400">O(log n)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Worst</span>
                  <strong className="font-mono text-xs text-indigo-600 dark:text-indigo-400">O(log n)</strong>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">Space</span>
                  <strong className="font-mono text-xs text-slate-700 dark:text-slate-300">O(1)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Pseudocode Box */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Manual Python / DAA Pseudocode
            </h4>
            <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`def binary_search(sorted_products, target_price):
    low = 0
    high = len(sorted_products) - 1

    while low <= high:
        mid = (low + high) // 2
        mid_price = sorted_products[mid]['price']

        if mid_price == target_price:
            return mid # Found at index mid!
        elif target_price < mid_price:
            high = mid - 1 # Search left half
        else:
            low = mid + 1  # Search right half

    return -1 # Not found`}</pre>
            </div>
          </div>
        </div>

        {/* Step-by-step viva walkthrough */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider font-mono text-cyan-600 dark:text-cyan-400">
            Viva Example Demonstration (Search Target = ₹25,000):
          </div>
          <div className="text-xs font-mono bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            Sorted Array: [0: ₹12,000, 1: ₹18,000, 2: ₹25,000, 3: ₹45,000, 4: ₹65,000]
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-1 font-mono">
            <p>• <strong>Step 1:</strong> Low = 0, High = 4 → Mid = (0 + 4) // 2 = <strong>2</strong>.</p>
            <p>• <strong>Inspect:</strong> Value at index 2 is <strong>₹25,000</strong>.</p>
            <p>• <strong>Result:</strong> Target ₹25,000 == ₹25,000 → <strong>MATCH FOUND in 1 single comparison! (Best Case O(1))</strong></p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Viva Questions */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            Frequently Asked DAA Viva Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white font-mono">
              Q1: Why must the list be sorted before Binary Search?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Binary Search relies on monotonic ordering to safely discard half of the elements. In an unsorted
              array, an element might lie in either half, making it impossible to eliminate candidates in O(1)
              per step.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white font-mono">
              Q2: Why does Merge Sort require O(n) auxiliary space?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When merging two sorted halves, we cannot overwrite elements in place without shifting items
              (which would cost O(n²)). Therefore, temporary sub-arrays of size n are allocated during merge.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white font-mono">
              Q3: When does Quick Sort suffer from O(n²) worst case?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When the pivot is consistently the smallest or largest element (such as picking the first element of
              an already sorted array). In SmartShop, we select the middle element to prevent this breakdown.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white font-mono">
              Q4: Why can small execution time differences vary between runs?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Raw clock time is subject to operating system background threads, cache line heating, and CPU
              frequency throttling. Hence, asymptotic Big-O bounds are the true mathematical metric for algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
