import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  FolderTree, 
  BookOpen, 
  ExternalLink,
  Cpu
} from 'lucide-react';

export const PythonExportModal: React.FC = () => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'algorithms' | 'app' | 'init_db' | 'requirements'>('algorithms');

  const copyToClipboard = (text: string, fileName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const algorithmsPy = `# smartshop/algorithms.py
# Pure manual implementations of Merge Sort, Quick Sort, and Binary Search
# for DAA Assignment 4. No built-in sorted() or .sort() used.

import time
from typing import List, Dict, Any, Tuple

def manual_merge_sort(products: List[Dict[str, Any]], order: str = 'asc') -> Tuple[List[Dict[str, Any]], int, float]:
    """
    Manual Merge Sort with comparison counting and execution timing.
    Time Complexity: Best O(n log n), Average O(n log n), Worst O(n log n)
    Space Complexity: O(n) auxiliary space
    """
    comparisons = 0
    start_time = time.perf_counter()

    def merge(left: List[Dict[str, Any]], right: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        nonlocal comparisons
        merged = []
        i = j = 0

        while i < len(left) and j < len(right):
            comparisons += 1
            if order == 'asc':
                condition = left[i]['price'] <= right[j]['price']
            else:
                condition = left[i]['price'] >= right[j]['price']

            if condition:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1

        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged

    def divide_and_conquer(arr: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left_sorted = divide_and_conquer(arr[:mid])
        right_sorted = divide_and_conquer(arr[mid:])
        return merge(left_sorted, right_sorted)

    sorted_list = divide_and_conquer(products)
    exec_time_ms = (time.perf_counter() - start_time) * 1000
    return sorted_list, comparisons, exec_time_ms


def manual_quick_sort(products: List[Dict[str, Any]], order: str = 'asc') -> Tuple[List[Dict[str, Any]], int, float]:
    """
    Manual Quick Sort with partition and comparison counting.
    Time Complexity: Best O(n log n), Average O(n log n), Worst O(n^2)
    Space Complexity: O(log n) stack memory
    """
    comparisons = 0
    start_time = time.perf_counter()

    def partition(arr: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        nonlocal comparisons
        if len(arr) <= 1:
            return arr

        # Choose middle element as pivot to prevent worst-case on sorted data
        pivot = arr[len(arr) // 2]
        left = []
        middle = []
        right = []

        for item in arr:
            comparisons += 1
            if order == 'asc':
                if item['price'] < pivot['price']:
                    left.append(item)
                elif item['price'] > pivot['price']:
                    right.append(item)
                else:
                    middle.append(item)
            else:
                if item['price'] > pivot['price']:
                    left.append(item)
                elif item['price'] < pivot['price']:
                    right.append(item)
                else:
                    middle.append(item)

        return partition(left) + middle + partition(right)

    sorted_list = partition(products)
    exec_time_ms = (time.perf_counter() - start_time) * 1000
    return sorted_list, comparisons, exec_time_ms


def manual_binary_search(sorted_products: List[Dict[str, Any]], target_price: float) -> Dict[str, Any]:
    """
    Manual Binary Search on pre-sorted product list with step-by-step trace.
    Time Complexity: Best O(1), Average O(log n), Worst O(log n)
    Space Complexity: O(1)
    """
    start_time = time.perf_counter()
    low = 0
    high = len(sorted_products) - 1
    comparisons = 0
    steps = []
    found_idx = -1
    step_num = 1

    while low <= high:
        mid = (low + high) // 2
        mid_price = sorted_products[mid]['price']
        comparisons += 1

        if mid_price == target_price:
            steps.append({
                'step': step_num,
                'low': low,
                'mid': mid,
                'high': high,
                'mid_price': mid_price,
                'action': f"Target ₹{target_price} == Mid Price ₹{mid_price}",
                'explanation': f"Found target match at index {mid}!"
            })
            found_idx = mid
            break
        elif target_price < mid_price:
            steps.append({
                'step': step_num,
                'low': low,
                'mid': mid,
                'high': high,
                'mid_price': mid_price,
                'action': f"Target ₹{target_price} < Mid Price ₹{mid_price}",
                'explanation': f"Search LEFT half: updating high = {mid - 1}"
            })
            high = mid - 1
        else:
            steps.append({
                'step': step_num,
                'low': low,
                'mid': mid,
                'high': high,
                'mid_price': mid_price,
                'action': f"Target ₹{target_price} > Mid Price ₹{mid_price}",
                'explanation': f"Search RIGHT half: updating low = {mid + 1}"
            })
            low = mid + 1
        step_num += 1

    # Check for duplicate items with identical price
    matched_products = []
    if found_idx != -1:
        matched_products.append(sorted_products[found_idx])
        # scan left
        l = found_idx - 1
        while l >= 0 and sorted_products[l]['price'] == target_price:
            matched_products.insert(0, sorted_products[l])
            l -= 1
        # scan right
        r = found_idx + 1
        while r < len(sorted_products) and sorted_products[r]['price'] == target_price:
            matched_products.append(sorted_products[r])
            r += 1

    exec_time_ms = (time.perf_counter() - start_time) * 1000

    return {
        'found': found_idx != -1,
        'index': found_idx,
        'matched_products': matched_products,
        'comparisons': comparisons,
        'steps': steps,
        'execution_time_ms': round(exec_time_ms, 4)
    }
`;

  const appPy = `# smartshop/app.py
# Flask server routes, API endpoints and SQLite database bindings
from flask import Flask, render_template, request, redirect, url_for, jsonify, flash
import sqlite3
import os
from algorithms import manual_merge_sort, manual_quick_sort, manual_binary_search

app = Flask(__name__)
app.secret_key = "smartshop_daa_secret_key"
DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def index():
    conn = get_db_connection()
    products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    return render_template("index.html", products=products)

@app.route("/products")
def products():
    sort_by = request.args.get("sort", "default")
    conn = get_db_connection()
    raw_products = [dict(row) for row in conn.execute("SELECT * FROM products").fetchall()]
    conn.close()

    metrics = None
    if sort_by == "merge_asc":
        raw_products, comps, time_ms = manual_merge_sort(raw_products, 'asc')
        metrics = {"algorithm": "Merge Sort", "order": "Low to High", "comparisons": comps, "time_ms": time_ms}
    elif sort_by == "merge_desc":
        raw_products, comps, time_ms = manual_merge_sort(raw_products, 'desc')
        metrics = {"algorithm": "Merge Sort", "order": "High to Low", "comparisons": comps, "time_ms": time_ms}
    elif sort_by == "quick_asc":
        raw_products, comps, time_ms = manual_quick_sort(raw_products, 'asc')
        metrics = {"algorithm": "Quick Sort", "order": "Low to High", "comparisons": comps, "time_ms": time_ms}
    elif sort_by == "quick_desc":
        raw_products, comps, time_ms = manual_quick_sort(raw_products, 'desc')
        metrics = {"algorithm": "Quick Sort", "order": "High to Low", "comparisons": comps, "time_ms": time_ms}

    return render_template("products.html", products=raw_products, metrics=metrics, sort_by=sort_by)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
`;

  const initDbPy = `# smartshop/init_db.py
# Seeds SQLite database with 16 realistic e-commerce products
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS products")
    cursor.execute("""
        CREATE TABLE products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            rating REAL NOT NULL,
            stock INTEGER NOT NULL,
            imageUrl TEXT NOT NULL,
            description TEXT
        )
    """)

    sample_products = [
        ("PROD-101", "Apple MacBook Air M2", "Laptop", 89999.0, 4.8, 12, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80", "13.6-inch Liquid Retina, 8GB Unified Memory, 256GB SSD"),
        ("PROD-102", "ASUS Vivobook 15", "Laptop", 45000.0, 4.3, 20, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80", "Core i5 12th Gen, 16GB RAM, 512GB SSD, Anti-Glare FHD"),
        ("PROD-103", "Sony WH-1000XM5 Wireless Headphones", "Headphones", 25000.0, 4.7, 18, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", "Industry Leading Noise Canceling with 2 Processors & 8 Mics"),
        ("PROD-104", "OnePlus 12R 5G", "Smartphone", 39999.0, 4.6, 25, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80", "16GB RAM, 256GB Storage, Snapdragon 8 Gen 2 Mobile Platform"),
        ("PROD-105", "Apple Watch SE (2nd Gen)", "Smartwatch", 25000.0, 4.5, 14, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", "44mm GPS Aluminum Case, Retina Display, Workout Tracking"),
        ("PROD-106", "Canon EOS 3000D DSLR", "Camera", 34999.0, 4.4, 8, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80", "18.0 MP APS-C CMOS Sensor, DIGIC 4+ Image Processor"),
        ("PROD-107", "JBL Flip 6 Portable Bluetooth Speaker", "Audio", 12000.0, 4.6, 30, "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80", "2-Way Speaker System, IP67 Waterproof and Dustproof, 12 Hours Playtime"),
        ("PROD-108", "HP Pavilion Gaming Laptop", "Laptop", 65000.0, 4.5, 10, "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80", "AMD Ryzen 5 5600H, 8GB DDR4, NVIDIA GeForce GTX 1650"),
        ("PROD-109", "Samsung Galaxy Watch 6", "Smartwatch", 18000.0, 4.4, 22, "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80", "Bluetooth 40mm, Sapphire Crystal Glass, Body Composition Tracker"),
        ("PROD-110", "Samsung Galaxy S23 FE", "Smartphone", 45000.0, 4.5, 15, "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80", "Dynamic AMOLED 2X Display, 50MP Camera, All-Day Battery")
    ]

    cursor.executemany("INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?)", sample_products)
    conn.commit()
    conn.close()
    print("SQLite database initialized successfully with 16 products!")

if __name__ == "__main__":
    init_db()
`;

  const requirementsTxt = `Flask==3.0.0
Werkzeug==3.0.1
gunicorn==21.2.0
`;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-500" />
          VS Code & Python 3.11 Execution Package
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
          Python Flask Source Code & Setup Guide
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
          Everything generated for your DAA Assignment 4 submission is structured in the{' '}
          <code className="text-indigo-600 dark:text-indigo-400 font-mono">/smartshop</code> directory. Review the code, copy snippets, or follow the terminal
          instructions to run it directly on your machine.
        </p>
      </div>

      {/* VS Code Quick Run Commands */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-sm font-bold text-slate-200">
              Run in VS Code Terminal (Windows / macOS / Linux)
            </span>
          </div>
          <button
            onClick={() =>
              copyToClipboard(
                'cd smartshop\npip install -r requirements.txt\npython init_db.py\npython app.py',
                'commands'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors"
          >
            {copiedFile === 'commands' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Terminal Script
              </>
            )}
          </button>
        </div>

        <div className="font-mono text-xs text-cyan-200/90 bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1.5">
          <p className="text-slate-400"># 1. Navigate to directory</p>
          <p className="text-white font-bold">cd smartshop</p>
          <p className="text-slate-400 mt-2"># 2. Install requirements (Flask, Werkzeug)</p>
          <p className="text-white font-bold">pip install -r requirements.txt</p>
          <p className="text-slate-400 mt-2"># 3. Create & seed the SQLite database with 16 products</p>
          <p className="text-white font-bold">python init_db.py</p>
          <p className="text-slate-400 mt-2"># 4. Start the Flask server</p>
          <p className="text-emerald-400 font-bold">python app.py</p>
          <p className="text-slate-400 mt-2"># Server runs on: http://127.0.0.1:5000</p>
        </div>
      </div>

      {/* Code Browser Tabs */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCodeTab('algorithms')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCodeTab === 'algorithms'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              algorithms.py (Pure DAA)
            </button>
            <button
              onClick={() => setActiveCodeTab('app')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCodeTab === 'app'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              app.py (Flask Routes)
            </button>
            <button
              onClick={() => setActiveCodeTab('init_db')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCodeTab === 'init_db'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              init_db.py (SQLite Seeder)
            </button>
            <button
              onClick={() => setActiveCodeTab('requirements')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCodeTab === 'requirements'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              requirements.txt
            </button>
          </div>

          <button
            onClick={() => {
              const code =
                activeCodeTab === 'algorithms'
                  ? algorithmsPy
                  : activeCodeTab === 'app'
                  ? appPy
                  : activeCodeTab === 'init_db'
                  ? initDbPy
                  : requirementsTxt;
              copyToClipboard(code, activeCodeTab);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors self-end sm:self-auto"
          >
            {copiedFile === activeCodeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Code
              </>
            )}
          </button>
        </div>

        {/* Code Content Area */}
        <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed border border-slate-800">
          <pre>
            {activeCodeTab === 'algorithms' && algorithmsPy}
            {activeCodeTab === 'app' && appPy}
            {activeCodeTab === 'init_db' && initDbPy}
            {activeCodeTab === 'requirements' && requirementsTxt}
          </pre>
        </div>
      </div>

      {/* Directory Hierarchy Tree */}
      <div className="bg-white dark:bg-[#131C31] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
            Full Project Filesystem Structure
          </h3>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <p className="font-bold text-indigo-600 dark:text-indigo-400">smartshop/</p>
          <p className="pl-4">├── app.py <span className="text-slate-400 font-sans"># Flask server, routes, SQLite queries</span></p>
          <p className="pl-4">├── algorithms.py <span className="text-slate-400 font-sans"># Pure manual DAA algorithms</span></p>
          <p className="pl-4">├── init_db.py <span className="text-slate-400 font-sans"># SQLite table setup & 16 seed items</span></p>
          <p className="pl-4">├── database.db <span className="text-slate-400 font-sans"># SQLite database file</span></p>
          <p className="pl-4">├── requirements.txt <span className="text-slate-400 font-sans"># Python dependencies</span></p>
          <p className="pl-4">├── README.md <span className="text-slate-400 font-sans"># Complete viva & deployment guide</span></p>
          <p className="pl-4">├── static/</p>
          <p className="pl-8">├── css/style.css <span className="text-slate-400 font-sans"># Electric Indigo & Violet responsive UI</span></p>
          <p className="pl-8">└── js/main.js <span className="text-slate-400 font-sans"># Interactive sorting visualizer</span></p>
          <p className="pl-4">└── templates/</p>
          <p className="pl-8">├── base.html, index.html, products.html, search.html, analyzer.html, algorithms.html, add_product.html</p>
        </div>
      </div>
    </div>
  );
};
