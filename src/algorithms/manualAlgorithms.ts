import {
  Product,
  SortOrderType,
  SortMetrics,
  BinarySearchResult,
  BinarySearchStep,
  VisualizationStep
} from '../types';

/**
 * MANUAL MERGE SORT IMPLEMENTATION
 * Divide and conquer algorithm:
 * 1. Base case: if array length <= 1, it is already sorted.
 * 2. Divide: split array into left and right halves.
 * 3. Conquer: recursively sort both halves.
 * 4. Combine: merge the two sorted halves comparing prices.
 */
export function manualMergeSortWithMetrics(
  products: Product[],
  order: SortOrderType = 'asc'
): { sortedProducts: Product[]; metrics: SortMetrics } {
  let comparisons = 0;

  function merge(left: Product[], right: Product[]): Product[] {
    const result: Product[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      comparisons++;
      let condition = false;
      if (order === 'asc') {
        condition = left[i].price <= right[j].price;
      } else {
        condition = left[i].price >= right[j].price;
      }

      if (condition) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // Append remaining elements
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    return result;
  }

  function mergeSortRecursive(arr: Product[]): Product[] {
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    const sortedLeft = mergeSortRecursive(leftHalf);
    const sortedRight = mergeSortRecursive(rightHalf);

    return merge(sortedLeft, sortedRight);
  }

  const startTime = performance.now();
  const sortedProducts = mergeSortRecursive([...products]);
  const endTime = performance.now();

  const totalTimeMs = Math.max(0.001, endTime - startTime);
  const microseconds = Math.round(totalTimeMs * 1000);

  return {
    sortedProducts,
    metrics: {
      algorithm: 'Merge Sort',
      order,
      productCount: products.length,
      executionTimeMs: Number(totalTimeMs.toFixed(3)),
      executionTimeMicroseconds: microseconds,
      comparisons,
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      spaceComplexity: 'O(n)',
      timestamp: new Date().toLocaleTimeString(),
    },
  };
}

/**
 * MANUAL QUICK SORT IMPLEMENTATION
 * Divide and conquer with pivot partitioning:
 * 1. Choose a pivot (middle element to avoid worst-case on already sorted data).
 * 2. Partition elements into less, equal, and greater partitions based on price.
 * 3. Recursively sort partitions and concatenate.
 */
export function manualQuickSortWithMetrics(
  products: Product[],
  order: SortOrderType = 'asc'
): { sortedProducts: Product[]; metrics: SortMetrics } {
  let comparisons = 0;

  function quickSortRecursive(arr: Product[]): Product[] {
    if (arr.length <= 1) {
      return arr;
    }

    // Choose middle pivot element
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];

    const left: Product[] = [];
    const middle: Product[] = [];
    const right: Product[] = [];

    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      const current = arr[i];
      if (current.price === pivot.price) {
        middle.push(current);
      } else if (order === 'asc') {
        if (current.price < pivot.price) {
          left.push(current);
        } else {
          right.push(current);
        }
      } else {
        // desc
        if (current.price > pivot.price) {
          left.push(current);
        } else {
          right.push(current);
        }
      }
    }

    return [
      ...quickSortRecursive(left),
      ...middle,
      ...quickSortRecursive(right),
    ];
  }

  const startTime = performance.now();
  const sortedProducts = quickSortRecursive([...products]);
  const endTime = performance.now();

  const totalTimeMs = Math.max(0.001, endTime - startTime);
  const microseconds = Math.round(totalTimeMs * 1000);

  return {
    sortedProducts,
    metrics: {
      algorithm: 'Quick Sort',
      order,
      productCount: products.length,
      executionTimeMs: Number(totalTimeMs.toFixed(3)),
      executionTimeMicroseconds: microseconds,
      comparisons,
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(log n)',
      timestamp: new Date().toLocaleTimeString(),
    },
  };
}

/**
 * MANUAL BINARY SEARCH IMPLEMENTATION
 * 1. Array must be sorted in ascending order by price.
 * 2. Calculate mid = floor((low + high) / 2).
 * 3. Compare target with array[mid].price.
 * 4. Narrow search to left or right half until found or low > high.
 * 5. If found, scan adjacent items to collect all matching products.
 */
export function manualBinarySearch(
  sortedProductsAsc: Product[],
  targetPrice: number
): BinarySearchResult {
  const steps: BinarySearchStep[] = [];
  let comparisons = 0;
  let low = 0;
  let high = sortedProductsAsc.length - 1;
  let matchIndex = -1;

  const startTime = performance.now();

  while (low <= high) {
    comparisons++;
    const stepNumber = steps.length + 1;
    const mid = Math.floor((low + high) / 2);
    const midPrice = sortedProductsAsc[mid].price;

    if (midPrice === targetPrice) {
      matchIndex = mid;
      steps.push({
        stepNumber,
        lowIndex: low,
        highIndex: high,
        midIndex: mid,
        midPrice,
        targetPrice,
        action: `Target ₹${targetPrice.toLocaleString('en-IN')} == Middle ₹${midPrice.toLocaleString('en-IN')}`,
        explanation: `Target price ₹${targetPrice.toLocaleString('en-IN')} found at index ${mid} ("${sortedProductsAsc[mid].name}")!`,
      });
      break;
    } else if (targetPrice < midPrice) {
      steps.push({
        stepNumber,
        lowIndex: low,
        highIndex: high,
        midIndex: mid,
        midPrice,
        targetPrice,
        action: `Target ₹${targetPrice.toLocaleString('en-IN')} < Middle ₹${midPrice.toLocaleString('en-IN')}`,
        explanation: `Target is smaller than middle value ₹${midPrice.toLocaleString('en-IN')} → Search left half (High = ${mid - 1})`,
      });
      high = mid - 1;
    } else {
      steps.push({
        stepNumber,
        lowIndex: low,
        highIndex: high,
        midIndex: mid,
        midPrice,
        targetPrice,
        action: `Target ₹${targetPrice.toLocaleString('en-IN')} > Middle ₹${midPrice.toLocaleString('en-IN')}`,
        explanation: `Target is larger than middle value ₹${midPrice.toLocaleString('en-IN')} → Search right half (Low = ${mid + 1})`,
      });
      low = mid + 1;
    }
  }

  const endTime = performance.now();
  const totalTimeMs = Math.max(0.001, endTime - startTime);
  const microseconds = Math.round(totalTimeMs * 1000);

  // If match found, gather all products with this exact price (could be multiple products)
  const matchedProducts: Product[] = [];
  if (matchIndex !== -1) {
    // Scan left
    let l = matchIndex;
    while (l >= 0 && sortedProductsAsc[l].price === targetPrice) {
      l--;
    }
    // Scan right
    let r = matchIndex;
    while (r < sortedProductsAsc.length && sortedProductsAsc[r].price === targetPrice) {
      r++;
    }
    for (let k = l + 1; k < r; k++) {
      matchedProducts.push(sortedProductsAsc[k]);
    }
  }

  return {
    searchedPrice: targetPrice,
    found: matchedProducts.length > 0,
    matchedProducts,
    steps,
    comparisons,
    executionTimeMs: Number(totalTimeMs.toFixed(3)),
    executionTimeMicroseconds: microseconds,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  };
}

/**
 * Step generator for visual bar animation of Merge Sort
 */
export function generateMergeSortVisualSteps(initialPrices: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const arr = [...initialPrices];

  steps.push({
    array: [...arr],
    activeIndices: [],
    description: `Original array with ${arr.length} items.`,
  });

  // Iterative or recording recursive merge sort
  function rec(l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    rec(l, m);
    rec(m + 1, r);

    // Merge in-place copy
    const leftPart = arr.slice(l, m + 1);
    const rightPart = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;
    while (i < leftPart.length && j < rightPart.length) {
      const activeIdx = [k, l + i, m + 1 + j];
      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        arr[k] = rightPart[j];
        j++;
      }
      steps.push({
        array: [...arr],
        activeIndices: [k],
        leftBound: l,
        rightBound: r,
        description: `Merging sub-arrays [${l}..${m}] & [${m + 1}..${r}]: Placing ₹${arr[k].toLocaleString('en-IN')} at index ${k}`,
      });
      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i];
      steps.push({
        array: [...arr],
        activeIndices: [k],
        leftBound: l,
        rightBound: r,
        description: `Flushing remaining left element ₹${arr[k].toLocaleString('en-IN')} to index ${k}`,
      });
      i++;
      k++;
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j];
      steps.push({
        array: [...arr],
        activeIndices: [k],
        leftBound: l,
        rightBound: r,
        description: `Flushing remaining right element ₹${arr[k].toLocaleString('en-IN')} to index ${k}`,
      });
      j++;
      k++;
    }
  }

  rec(0, arr.length - 1);

  steps.push({
    array: [...arr],
    activeIndices: [],
    description: 'Merge Sort complete! All elements sorted in non-decreasing order.',
  });

  return steps;
}

/**
 * Step generator for visual bar animation of Quick Sort
 */
export function generateQuickSortVisualSteps(initialPrices: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const arr = [...initialPrices];

  steps.push({
    array: [...arr],
    activeIndices: [],
    description: `Original array with ${arr.length} items.`,
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({
      array: [...arr],
      activeIndices: [high],
      pivotIndex: high,
      leftBound: low,
      rightBound: high,
      description: `Selected pivot ₹${pivot.toLocaleString('en-IN')} at index ${high}. Partitioning range [${low}..${high}]`,
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, high],
        pivotIndex: high,
        leftBound: low,
        rightBound: high,
        description: `Comparing ₹${arr[j].toLocaleString('en-IN')} with pivot ₹${pivot.toLocaleString('en-IN')}`,
      });

      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        steps.push({
          array: [...arr],
          activeIndices: [i, j],
          pivotIndex: high,
          leftBound: low,
          rightBound: high,
          description: `Swapped ₹${arr[i].toLocaleString('en-IN')} (smaller) to index ${i}`,
        });
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      array: [...arr],
      activeIndices: [i + 1],
      pivotIndex: i + 1,
      leftBound: low,
      rightBound: high,
      description: `Placed pivot ₹${arr[i + 1].toLocaleString('en-IN')} at its correct sorted position (index ${i + 1})`,
    });

    return i + 1;
  }

  function rec(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      rec(low, pi - 1);
      rec(pi + 1, high);
    }
  }

  rec(0, arr.length - 1);

  steps.push({
    array: [...arr],
    activeIndices: [],
    description: 'Quick Sort complete! All elements sorted in non-decreasing order.',
  });

  return steps;
}
