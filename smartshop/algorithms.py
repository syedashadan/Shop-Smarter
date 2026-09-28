"""
SmartShop – E-Commerce Product Sorting & Search Analyzer
Design & Analysis of Algorithms (DAA) Core Implementations

CRITICAL DAA CONSTRAINTS:
- ZERO use of Python's built-in sorted() or list.sort().
- All sorting and searching logic is written completely by hand.
- High-precision execution timing via time.perf_counter().
- Exact comparison tracking for empirical time complexity analysis.
- Clean, structured, well-commented code ideal for viva explanation.
"""

import time
import random


# =====================================================================
# 1. MERGE SORT (Divide and Conquer)
# Time Complexity:
#   Best Case:    O(n log n)
#   Average Case: O(n log n)
#   Worst Case:   O(n log n)
# Space Complexity: O(n) (auxiliary space for sub-arrays)
# =====================================================================

def merge_sort(products, reverse=False):
    """
    Sorts a list of product dictionaries by 'price' using manual Merge Sort.
    
    Parameters:
        products (list): List of product dicts containing {'price': float/int, ...}
        reverse (bool): False for Low -> High (Ascending), True for High -> Low (Descending)
        
    Returns:
        tuple: (sorted_list, execution_time_ms, comparison_count)
    """
    comparisons = 0

    def merge(left, right):
        nonlocal comparisons
        merged = []
        i = 0
        j = 0

        # Compare elements from left and right halves and merge in sorted order
        while i < len(left) and j < len(right):
            comparisons += 1
            if not reverse:
                # Ascending order: Low -> High
                condition = left[i]['price'] <= right[j]['price']
            else:
                # Descending order: High -> Low
                condition = left[i]['price'] >= right[j]['price']

            if condition:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1

        # Append remaining elements from left half
        while i < len(left):
            merged.append(left[i])
            i += 1

        # Append remaining elements from right half
        while j < len(right):
            merged.append(right[j])
            j += 1

        return merged

    def recursive_split(arr):
        # Base case: 0 or 1 item is inherently sorted
        if len(arr) <= 1:
            return arr

        # Divide: Calculate middle index
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        # Conquer: Recursively sort both sub-arrays
        sorted_left = recursive_split(left_half)
        sorted_right = recursive_split(right_half)

        # Combine: Merge both sorted sub-arrays
        return merge(sorted_left, sorted_right)

    # Measure exact execution time
    start_time = time.perf_counter()
    sorted_products = recursive_split(list(products))
    end_time = time.perf_counter()

    execution_time_ms = (end_time - start_time) * 1000.0

    return sorted_products, execution_time_ms, comparisons


# =====================================================================
# 2. QUICK SORT (Divide and Conquer with Partitioning)
# Time Complexity:
#   Best Case:    O(n log n)
#   Average Case: O(n log n)
#   Worst Case:   O(n^2) (e.g. extreme pivot selection on already sorted input)
# Space Complexity: O(log n) (call stack)
# =====================================================================

def quick_sort(products, reverse=False):
    """
    Sorts a list of product dictionaries by 'price' using manual Quick Sort.
    Uses median/middle pivot selection to avoid worst-case on pre-sorted data.
    
    Parameters:
        products (list): List of product dicts containing {'price': float/int, ...}
        reverse (bool): False for Low -> High (Ascending), True for High -> Low (Descending)
        
    Returns:
        tuple: (sorted_list, execution_time_ms, comparison_count)
    """
    comparisons = 0

    def recursive_partition(arr):
        nonlocal comparisons
        # Base case: 0 or 1 element is inherently sorted
        if len(arr) <= 1:
            return arr

        # Choose middle element as pivot
        pivot_index = len(arr) // 2
        pivot = arr[pivot_index]
        pivot_price = pivot['price']

        left = []
        middle = []
        right = []

        # Partition elements based on price relative to pivot
        for item in arr:
            comparisons += 1
            item_price = item['price']

            if item_price == pivot_price:
                middle.append(item)
            elif not reverse:
                # Ascending order: smaller go to left, larger to right
                if item_price < pivot_price:
                    left.append(item)
                else:
                    right.append(item)
            else:
                # Descending order: larger go to left, smaller to right
                if item_price > pivot_price:
                    left.append(item)
                else:
                    right.append(item)

        # Recursively sort partitions and concatenate
        return recursive_partition(left) + middle + recursive_partition(right)

    # Measure exact execution time
    start_time = time.perf_counter()
    sorted_products = recursive_partition(list(products))
    end_time = time.perf_counter()

    execution_time_ms = (end_time - start_time) * 1000.0

    return sorted_products, execution_time_ms, comparisons


# =====================================================================
# 3. BINARY SEARCH (Divide and Conquer on Sorted Array)
# Time Complexity:
#   Best Case:    O(1) (element is at mid on step 1)
#   Average Case: O(log n)
#   Worst Case:   O(log n)
# Space Complexity: O(1) (iterative)
# =====================================================================

def binary_search(products_sorted_asc, target_price):
    """
    Performs manual Binary Search on an array of products sorted ascending by price.
    Also logs the dynamic trace steps (Low -> Mid -> High) for viva demonstration.
    
    Parameters:
        products_sorted_asc (list): Products sorted by price in ascending order.
        target_price (float/int): The target price to find.
        
    Returns:
        dict: {
            'found': bool,
            'matched_products': list,
            'steps': list of step dicts,
            'comparisons': int,
            'execution_time_ms': float,
            'searched_price': float
        }
    """
    steps = []
    comparisons = 0
    low = 0
    high = len(products_sorted_asc) - 1
    match_index = -1

    start_time = time.perf_counter()

    while low <= high:
        comparisons += 1
        step_number = len(steps) + 1
        mid = (low + high) // 2
        mid_product = products_sorted_asc[mid]
        mid_price = mid_product['price']

        if mid_price == target_price:
            match_index = mid
            steps.append({
                'step': step_number,
                'low': low,
                'high': high,
                'mid': mid,
                'mid_price': mid_price,
                'action': f"₹{target_price:,.0f} == ₹{mid_price:,.0f}",
                'explanation': f"Target price ₹{target_price:,.0f} matches product at index {mid} ('{mid_product['name']}')!"
            })
            break
        elif target_price < mid_price:
            steps.append({
                'step': step_number,
                'low': low,
                'high': high,
                'mid': mid,
                'mid_price': mid_price,
                'action': f"₹{target_price:,.0f} < ₹{mid_price:,.0f}",
                'explanation': f"Target is less than middle value ₹{mid_price:,.0f} → Discard right half, search left (High = {mid - 1})"
            })
            high = mid - 1
        else:
            steps.append({
                'step': step_number,
                'low': low,
                'high': high,
                'mid': mid,
                'mid_price': mid_price,
                'action': f"₹{target_price:,.0f} > ₹{mid_price:,.0f}",
                'explanation': f"Target is greater than middle value ₹{mid_price:,.0f} → Discard left half, search right (Low = {mid + 1})"
            })
            low = mid + 1

    end_time = time.perf_counter()
    execution_time_ms = (end_time - start_time) * 1000.0

    # Collect all products with this target price (handling duplicates)
    matched_products = []
    if match_index != -1:
        # Scan left
        l = match_index
        while l >= 0 and products_sorted_asc[l]['price'] == target_price:
            l -= 1
        # Scan right
        r = match_index
        while r < len(products_sorted_asc) and products_sorted_asc[r]['price'] == target_price:
            r += 1
        matched_products = products_sorted_asc[l + 1:r]

    return {
        'searched_price': target_price,
        'found': len(matched_products) > 0,
        'matched_products': matched_products,
        'steps': steps,
        'comparisons': comparisons,
        'execution_time_ms': round(execution_time_ms, 4)
    }


# =====================================================================
# 4. BENCHMARK DATASET GENERATOR
# Used for testing performance on sizes: 10, 30, 50, 100, 500, 1000
# =====================================================================

CATEGORIES = ['Laptops', 'Smartphones', 'Headphones', 'Smartwatches', 'Cameras', 'Tablets', 'Monitors', 'Gaming', 'Accessories']

def generate_benchmark_dataset(size):
    """
    Generates a deterministic benchmark dataset of product dictionaries.
    Uses seeded pseudo-randomness so both Merge Sort and Quick Sort receive
    the exact same input array for scientific and honest comparison.
    """
    rng = random.Random(42 + size)
    sample_prices = [
        1499, 1999, 2199, 2499, 3499, 4490, 5990, 8500, 8995, 9499, 9999,
        12000, 13499, 14500, 14990, 15999, 18000, 24999, 25000, 28999, 29999,
        32000, 33900, 34999, 36999, 37990, 39999, 45000, 53990, 65000, 89999, 114990
    ]

    dataset = []
    for i in range(size):
        price = rng.choice(sample_prices) + (rng.randint(0, 100) * 10)
        cat = rng.choice(CATEGORIES)
        dataset.append({
            'id': f'BENCH-{i+1:04d}',
            'name': f'Benchmark Product #{i+1}',
            'category': cat,
            'price': float(price),
            'rating': round(rng.uniform(3.5, 5.0), 1),
            'stock': rng.randint(5, 50),
            'imageUrl': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400'
        })
    return dataset


def run_benchmark_comparison(dataset_size=30):
    """
    Runs both Merge Sort and Quick Sort on the exact same dataset of given size.
    Returns empirical metrics for comparison.
    """
    data = generate_benchmark_dataset(dataset_size)
    
    # Run Merge Sort on a fresh shallow copy
    _, merge_time, merge_comps = merge_sort(list(data), reverse=False)

    # Run Quick Sort on a fresh shallow copy
    _, quick_time, quick_comps = quick_sort(list(data), reverse=False)

    faster = 'Merge Sort' if merge_time < quick_time else ('Quick Sort' if quick_time < merge_time else 'Tie')

    return {
        'dataset_size': dataset_size,
        'merge_sort': {
            'algorithm': 'Merge Sort',
            'execution_time_ms': round(merge_time, 4),
            'comparisons': merge_comps,
            'best_case': 'O(n log n)',
            'average_case': 'O(n log n)',
            'worst_case': 'O(n log n)',
            'space_complexity': 'O(n)'
        },
        'quick_sort': {
            'algorithm': 'Quick Sort',
            'execution_time_ms': round(quick_time, 4),
            'comparisons': quick_comps,
            'best_case': 'O(n log n)',
            'average_case': 'O(n log n)',
            'worst_case': 'O(n²)',
            'space_complexity': 'O(log n)'
        },
        'faster': faster,
        'time_difference_ms': round(abs(merge_time - quick_time), 4)
    }
