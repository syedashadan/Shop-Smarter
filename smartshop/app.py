"""
SmartShop – E-Commerce Product Sorting & Search Analyzer
Flask Web Application based on Design & Analysis of Algorithms (DAA) Assignment 4.

Project Tagline: "Shop Smarter. Search Faster. Understand Algorithms."
Core Algorithms:
  1. Merge Sort (O(n log n))
  2. Quick Sort (O(n log n) average)
  3. Binary Search (O(log n))
All executed strictly via manual algorithmic logic (NO built-in sorted() or .sort()).
"""

import os
import sqlite3
import time
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from algorithms import (
    merge_sort,
    quick_sort,
    binary_search,
    generate_benchmark_dataset,
    run_benchmark_comparison
)

app = Flask(__name__)
app.secret_key = 'smartshop-daa-assignment-secret-key-2026'

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def get_all_products_as_dicts():
    """Fetches all products from the persistent SQLite database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM products')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_catalog_stats(products=None):
    """Calculates live dynamic statistics from the product dataset."""
    if products is None:
        products = get_all_products_as_dicts()

    total_products = len(products)
    categories = sorted(list(set(p['category'] for p in products)))
    total_categories = len(categories)

    cheapest_product = None
    most_expensive_product = None
    avg_price = 0

    if products:
        cheapest_product = products[0]
        most_expensive_product = products[0]
        total_price = 0
        for p in products:
            price = p['price']
            total_price += price
            if price < cheapest_product['price']:
                cheapest_product = p
            if price > most_expensive_product['price']:
                most_expensive_product = p
        avg_price = round(total_price / total_products, 2)

    return {
        'total_products': total_products,
        'total_categories': total_categories,
        'categories': categories,
        'cheapest_product': cheapest_product,
        'most_expensive_product': most_expensive_product,
        'avg_price': avg_price
    }


# =====================================================================
# HTML WEB PAGES
# =====================================================================

@app.route('/')
def index():
    """
    Homepage:
    - Large premium hero section with tagline and explore CTAs
    - Feature cards: SMART SEARCH, SMART SORTING, ALGORITHM LAB
    - Live dynamic statistics from SQLite (No hard-coding)
    - 6 Featured product cards with 'View Product'
    - Category showcase (Laptops, Smartphones, Audio, etc.)
    - How It Works 3-step workflow
    - Algorithm Preview with complexities & 'Try Algorithm' links
    - Clean footer (NO Terms and Conditions anywhere on homepage)
    """
    products = get_all_products_as_dicts()
    stats = get_catalog_stats(products)

    # 6 featured items across distinct categories
    featured_products = products[:6]

    return render_template(
        'index.html',
        total_products=stats['total_products'],
        total_categories=stats['total_categories'],
        cheapest_product=stats['cheapest_product'],
        most_expensive_product=stats['most_expensive_product'],
        avg_price=stats['avg_price'],
        featured_products=featured_products
    )


@app.route('/products')
def products():
    """
    Products listing page:
    - Modern 4-column responsive grid (desktop), 2-3 (tablet), 1-2 (mobile)
    - Search by product name, ID, or category with live count
    - Filters: category, min price, max price, stock, rating, clear filters
    - Manual Sorting via Merge Sort and Quick Sort (Asc / Desc)
    - Live performance metrics banner: Algorithm Used, Input Size, Execution Time, Comparisons
    """
    all_products = get_all_products_as_dicts()

    # Search & Filters
    search_query = request.args.get('q', '').strip().lower()
    selected_category = request.args.get('category', '').strip()
    min_price_raw = request.args.get('min_price', '').strip()
    max_price_raw = request.args.get('max_price', '').strip()
    stock_filter = request.args.get('stock', '').strip()
    min_rating_raw = request.args.get('min_rating', '').strip()
    sort_type = request.args.get('sort', 'reset')

    # Apply search and filters
    filtered_products = []
    for p in all_products:
        # Search match: Name, ID, or Category
        if search_query:
            match = (
                search_query in p['name'].lower() or
                search_query in p['id'].lower() or
                search_query in p['category'].lower()
            )
            if not match:
                continue

        # Category filter
        if selected_category and selected_category != 'All':
            if p['category'].lower() != selected_category.lower():
                continue

        # Min price filter
        if min_price_raw:
            try:
                if p['price'] < float(min_price_raw):
                    continue
            except ValueError:
                pass

        # Max price filter
        if max_price_raw:
            try:
                if p['price'] > float(max_price_raw):
                    continue
            except ValueError:
                pass

        # In stock only
        if stock_filter == 'in_stock' and p['stock'] <= 0:
            continue

        # Min rating
        if min_rating_raw:
            try:
                if p['rating'] < float(min_rating_raw):
                    continue
            except ValueError:
                pass

        filtered_products.append(p)

    metrics = None
    display_products = list(filtered_products)

    # Manual DAA Sorting Execution (NO built-in sorted() or .sort())
    if sort_type == 'merge_asc':
        sorted_list, exec_time, comps = merge_sort(filtered_products, reverse=False)
        display_products = sorted_list
        metrics = {
            'algorithm': 'Merge Sort',
            'order': 'Price: Low → High',
            'count': len(display_products),
            'execution_time_ms': round(exec_time, 4),
            'comparisons': comps,
            'time_complexity': 'O(n log n)',
            'best_case': 'O(n log n)',
            'average_case': 'O(n log n)',
            'worst_case': 'O(n log n)',
            'space_complexity': 'O(n)'
        }
    elif sort_type == 'merge_desc':
        sorted_list, exec_time, comps = merge_sort(filtered_products, reverse=True)
        display_products = sorted_list
        metrics = {
            'algorithm': 'Merge Sort',
            'order': 'Price: High → Low',
            'count': len(display_products),
            'execution_time_ms': round(exec_time, 4),
            'comparisons': comps,
            'time_complexity': 'O(n log n)',
            'best_case': 'O(n log n)',
            'average_case': 'O(n log n)',
            'worst_case': 'O(n log n)',
            'space_complexity': 'O(n)'
        }
    elif sort_type == 'quick_asc':
        sorted_list, exec_time, comps = quick_sort(filtered_products, reverse=False)
        display_products = sorted_list
        metrics = {
            'algorithm': 'Quick Sort',
            'order': 'Price: Low → High',
            'count': len(display_products),
            'execution_time_ms': round(exec_time, 4),
            'comparisons': comps,
            'time_complexity': 'O(n log n)',
            'best_case': 'O(n log n)',
            'average_case': 'O(n log n)',
            'worst_case': 'O(n²)',
            'space_complexity': 'O(log n)'
        }
    elif sort_type == 'quick_desc':
        sorted_list, exec_time, comps = quick_sort(filtered_products, reverse=True)
        display_products = sorted_list
        metrics = {
            'algorithm': 'Quick Sort',
            'order': 'Price: High → Low',
            'count': len(display_products),
            'execution_time_ms': round(exec_time, 4),
            'comparisons': comps,
            'time_complexity': 'O(n log n)',
            'best_case': 'O(n log n)',
            'average_case': 'O(n log n)',
            'worst_case': 'O(n²)',
            'space_complexity': 'O(log n)'
        }

    # Extract all unique categories for filter dropdown
    categories = sorted(list(set(p['category'] for p in all_products)))

    return render_template(
        'products.html',
        products=display_products,
        total_found=len(display_products),
        total_products=len(all_products),
        categories=categories,
        selected_category=selected_category,
        search_query=search_query,
        min_price=min_price_raw,
        max_price=max_price_raw,
        stock_filter=stock_filter,
        min_rating=min_rating_raw,
        metrics=metrics,
        current_sort=sort_type
    )


@app.route('/search')
def search():
    """
    Binary Search interface:
    - User inputs Target Price (e.g. ₹25000)
    - Dataset is strictly pre-sorted using manual Merge Sort
    - Manual Binary Search records step-by-step LOW, MID, HIGH indices
    - Shows comparisons, execution time, matched product cards, and step explanation
    """
    price_query = request.args.get('price', '').strip()
    search_result = None
    target_price = None

    # Step 1: Pre-sort dataset ascending using our manual Merge Sort
    all_products = get_all_products_as_dicts()
    sorted_products, _, _ = merge_sort(all_products, reverse=False)

    if price_query:
        try:
            target_price = float(price_query)
            search_result = binary_search(sorted_products, target_price)
        except ValueError:
            flash('Please enter a valid numeric price (e.g., 25000)', 'danger')

    return render_template(
        'search.html',
        sorted_products=sorted_products,
        search_result=search_result,
        target_price=target_price
    )


@app.route('/analyzer')
def analyzer():
    """
    Algorithm Lab:
    - Interactive vertical bar visualizer
    - Step-by-step playback with comparisons, swaps, pivots
    - Merge Sort, Quick Sort, and Binary Search visualizations
    """
    products = get_all_products_as_dicts()
    return render_template('analyzer.html', products=products)


@app.route('/performance')
def performance():
    """
    Dedicated Algorithm Performance Benchmark page:
    - Benchmarking dataset sizes: 10, 30, 50, 100, 500, 1000
    - Side-by-side Merge Sort vs Quick Sort execution on exact same inputs
    - Empirical runtime and comparison comparison table
    - Scientific explanation of asymptotic growth vs hardware variability
    """
    selected_size = int(request.args.get('size', 50))
    if selected_size not in [10, 30, 50, 100, 500, 1000]:
        selected_size = 50

    benchmark_result = run_benchmark_comparison(selected_size)

    # Multi-size comparative matrix
    matrix_results = []
    for s in [10, 30, 50, 100, 500, 1000]:
        matrix_results.append(run_benchmark_comparison(s))

    return render_template(
        'performance.html',
        selected_size=selected_size,
        benchmark=benchmark_result,
        matrix=matrix_results
    )


@app.route('/about')
@app.route('/algorithms')
def algorithms_guide():
    """Educational Guide & Student Viva Preparation for DAA Assignment 4."""
    return render_template('algorithms.html')


@app.route('/add-product', methods=['GET', 'POST'])
def add_product():
    """Add a new product with full input validation and SQLite persistence."""
    if request.method == 'POST':
        product_id = request.form.get('id', '').strip().upper()
        name = request.form.get('name', '').strip()
        category = request.form.get('category', '').strip()
        price_raw = request.form.get('price', '').strip()
        rating_raw = request.form.get('rating', '').strip()
        stock_raw = request.form.get('stock', '').strip()
        image_url = request.form.get('imageUrl', '').strip()

        errors = []
        if not product_id:
            errors.append('Product ID is required (e.g. PROD-133).')
        if not name:
            errors.append('Product Name is required.')
        if not category:
            errors.append('Category is required.')

        price = 0.0
        try:
            price = float(price_raw)
            if price <= 0:
                errors.append('Price must be greater than 0.')
        except ValueError:
            errors.append('Price must be a valid numeric amount.')

        rating = 4.5
        try:
            rating = float(rating_raw)
            if not (0.0 <= rating <= 5.0):
                errors.append('Rating must be between 0.0 and 5.0.')
        except ValueError:
            errors.append('Rating must be a valid number.')

        stock = 0
        try:
            stock = int(stock_raw)
            if stock < 0:
                errors.append('Stock cannot be negative.')
        except ValueError:
            errors.append('Stock must be an integer.')

        if not image_url:
            image_url = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60'

        if errors:
            for err in errors:
                flash(err, 'danger')
            return render_template('add_product.html', form_data=request.form)

        conn = get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute('''
            INSERT INTO products (id, name, category, price, rating, stock, imageUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (product_id, name, category, price, rating, stock, image_url))
            conn.commit()
            flash(f"Product '{name}' (₹{price:,.0f}) added successfully!", 'success')
            return redirect(url_for('products'))
        except sqlite3.IntegrityError:
            flash(f"Product ID '{product_id}' already exists in SQLite. Please choose a unique ID.", 'danger')
            return render_template('add_product.html', form_data=request.form)
        finally:
            conn.close()

    return render_template('add_product.html', form_data={})


@app.route('/delete-product/<string:product_id>', methods=['POST'])
def delete_product(product_id):
    """Deletes a product from the SQLite database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
    conn.commit()
    conn.close()
    flash(f"Product {product_id} deleted successfully.", 'info')
    return redirect(url_for('products'))


# =====================================================================
# REST API ENDPOINTS
# =====================================================================

@app.route('/api/products', methods=['GET'])
def api_get_products():
    """GET /api/products - Returns products from SQLite with optional filtering."""
    all_products = get_all_products_as_dicts()
    q = request.args.get('q', '').strip().lower()
    cat = request.args.get('category', '').strip().lower()

    results = []
    for p in all_products:
        if q and not (q in p['name'].lower() or q in p['id'].lower() or q in p['category'].lower()):
            continue
        if cat and cat != 'all' and p['category'].lower() != cat:
            continue
        results.append(p)

    return jsonify({
        'success': True,
        'count': len(results),
        'products': results
    }), 200


@app.route('/api/products', methods=['POST'])
def api_create_product():
    """POST /api/products - Adds a new product."""
    data = request.get_json() or {}
    product_id = data.get('id', '').strip().upper()
    name = data.get('name', '').strip()
    category = data.get('category', '').strip()
    price = data.get('price')
    rating = data.get('rating', 4.5)
    stock = data.get('stock', 10)
    image_url = data.get('imageUrl', '').strip()

    if not product_id or not name or not category or price is None:
        return jsonify({'success': False, 'error': 'Missing required fields: id, name, category, price'}), 400

    try:
        price = float(price)
        if price <= 0:
            return jsonify({'success': False, 'error': 'Price must be greater than 0'}), 400
    except (ValueError, TypeError):
        return jsonify({'success': False, 'error': 'Invalid price'}), 400

    try:
        rating = float(rating)
        stock = int(stock)
    except (ValueError, TypeError):
        return jsonify({'success': False, 'error': 'Invalid rating or stock'}), 400

    if not image_url:
        image_url = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500'

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
        INSERT INTO products (id, name, category, price, rating, stock, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (product_id, name, category, price, rating, stock, image_url))
        conn.commit()
        return jsonify({
            'success': True,
            'message': 'Product added successfully',
            'product': {
                'id': product_id,
                'name': name,
                'category': category,
                'price': price,
                'rating': rating,
                'stock': stock,
                'imageUrl': image_url
            }
        }), 201
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'error': f"Product ID '{product_id}' already exists"}), 409
    finally:
        conn.close()


@app.route('/api/products/<string:product_id>', methods=['PUT'])
def api_update_product(product_id):
    """PUT /api/products/<id> - Updates an existing product."""
    data = request.get_json() or {}
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM products WHERE id = ?', (product_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return jsonify({'success': False, 'error': 'Product not found'}), 404

    name = data.get('name', row['name'])
    category = data.get('category', row['category'])
    price = float(data.get('price', row['price']))
    rating = float(data.get('rating', row['rating']))
    stock = int(data.get('stock', row['stock']))
    image_url = data.get('imageUrl', row['imageUrl'])

    cursor.execute('''
    UPDATE products
    SET name = ?, category = ?, price = ?, rating = ?, stock = ?, imageUrl = ?
    WHERE id = ?
    ''', (name, category, price, rating, stock, image_url, product_id))
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'message': 'Product updated successfully'}), 200


@app.route('/api/products/<string:product_id>', methods=['DELETE'])
def api_delete_product(product_id):
    """DELETE /api/products/<id> - Deletes a product."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()

    if not deleted:
        return jsonify({'success': False, 'error': 'Product not found'}), 404

    return jsonify({'success': True, 'message': 'Product deleted successfully'}), 200


@app.route('/api/algorithms/merge-sort', methods=['POST'])
def api_merge_sort():
    """POST /api/algorithms/merge-sort - Executes manual Merge Sort."""
    data = request.get_json() or {}
    products_input = data.get('products') or get_all_products_as_dicts()
    reverse = bool(data.get('reverse', False))

    sorted_prods, exec_time, comps = merge_sort(products_input, reverse=reverse)

    return jsonify({
        'success': True,
        'algorithm': 'Merge Sort',
        'order': 'High to Low' if reverse else 'Low to High',
        'dataset_size': len(sorted_prods),
        'execution_time_ms': round(exec_time, 4),
        'comparisons': comps,
        'best_case': 'O(n log n)',
        'average_case': 'O(n log n)',
        'worst_case': 'O(n log n)',
        'space_complexity': 'O(n)',
        'products': sorted_prods
    }), 200


@app.route('/api/algorithms/quick-sort', methods=['POST'])
def api_quick_sort():
    """POST /api/algorithms/quick-sort - Executes manual Quick Sort."""
    data = request.get_json() or {}
    products_input = data.get('products') or get_all_products_as_dicts()
    reverse = bool(data.get('reverse', False))

    sorted_prods, exec_time, comps = quick_sort(products_input, reverse=reverse)

    return jsonify({
        'success': True,
        'algorithm': 'Quick Sort',
        'order': 'High to Low' if reverse else 'Low to High',
        'dataset_size': len(sorted_prods),
        'execution_time_ms': round(exec_time, 4),
        'comparisons': comps,
        'best_case': 'O(n log n)',
        'average_case': 'O(n log n)',
        'worst_case': 'O(n²)',
        'space_complexity': 'O(log n)',
        'products': sorted_prods
    }), 200


@app.route('/api/algorithms/binary-search', methods=['POST'])
def api_binary_search():
    """POST /api/algorithms/binary-search - Executes manual Binary Search on sorted array."""
    data = request.get_json() or {}
    target_price = data.get('target_price')

    if target_price is None:
        return jsonify({'success': False, 'error': 'Missing target_price in JSON request'}), 400

    try:
        target_price = float(target_price)
    except (ValueError, TypeError):
        return jsonify({'success': False, 'error': 'target_price must be a numeric value'}), 400

    # Ensure pre-sorted via manual Merge Sort
    all_products = get_all_products_as_dicts()
    sorted_products, _, _ = merge_sort(all_products, reverse=False)

    result = binary_search(sorted_products, target_price)
    return jsonify({
        'success': True,
        'result': result
    }), 200


@app.route('/api/algorithms/compare', methods=['POST'])
@app.route('/api/compare-sorts', methods=['POST'])
def api_compare():
    """POST /api/algorithms/compare - Compares Merge Sort vs Quick Sort on given size."""
    data = request.get_json() or {}
    size = data.get('size') or data.get('dataset_size') or len(get_all_products_as_dicts())
    try:
        size = int(size)
    except (ValueError, TypeError):
        size = 30

    comparison = run_benchmark_comparison(size)
    return jsonify({
        'success': True,
        'comparison': comparison
    }), 200


@app.route('/api/stats', methods=['GET'])
def api_stats():
    """GET /api/stats - Live dynamic catalog statistics."""
    stats = get_catalog_stats()
    return jsonify({
        'success': True,
        'stats': {
            'total_products': stats['total_products'],
            'total_categories': stats['total_categories'],
            'lowest_price': stats['cheapest_product']['price'] if stats['cheapest_product'] else 0,
            'highest_price': stats['most_expensive_product']['price'] if stats['most_expensive_product'] else 0,
            'avg_price': stats['avg_price'],
            'categories': stats['categories']
        }
    }), 200


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
