"""
Database initialization script for SmartShop.
Creates the SQLite database and seeds it with at least 15 realistic products.
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')

SAMPLE_PRODUCTS = [
    ('PROD-101', 'Apple MacBook Air M2', 'Laptops', 89999, 4.8, 12, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60'),
    ('PROD-102', 'ASUS Vivobook 15 Thin & Light', 'Laptops', 45000, 4.3, 20, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60'),
    ('PROD-103', 'Sony WH-1000XM5 Wireless Headphones', 'Headphones', 25000, 4.7, 18, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'),
    ('PROD-104', 'OnePlus 12R 5G Smartphone', 'Smartphones', 39999, 4.6, 25, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60'),
    ('PROD-105', 'Apple Watch SE (2nd Gen)', 'Smartwatches', 25000, 4.5, 14, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'),
    ('PROD-106', 'Canon EOS 3000D DSLR Camera', 'Cameras', 34999, 4.4, 8, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60'),
    ('PROD-107', 'JBL Flip 6 Portable Bluetooth Speaker', 'Speakers', 12000, 4.6, 30, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60'),
    ('PROD-108', 'HP Pavilion 15 Gaming Laptop', 'Laptops', 65000, 4.5, 10, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60'),
    ('PROD-109', 'Samsung Galaxy Watch 6 Bluetooth', 'Smartwatches', 18000, 4.4, 22, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60'),
    ('PROD-110', 'Samsung Galaxy S23 FE 5G', 'Smartphones', 45000, 4.5, 15, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60'),
    ('PROD-111', 'Dell 27-inch 4K UHD IPS Monitor', 'Monitors', 28999, 4.6, 11, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60'),
    ('PROD-112', 'Logitech MX Master 3S Wireless Mouse', 'Mice', 8995, 4.9, 35, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60'),
    ('PROD-113', 'Keychron K2 Pro Mechanical Keyboard', 'Keyboards', 9499, 4.7, 16, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60'),
    ('PROD-114', 'GoPro HERO12 Black Action Camera', 'Cameras', 37990, 4.7, 9, 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop&q=60'),
    ('PROD-115', 'Apple iPad 10th Gen 64GB Wi-Fi', 'Tablets', 33900, 4.6, 19, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60'),
    ('PROD-116', 'Sony SRS-XB100 Compact Wireless Speaker', 'Speakers', 4490, 4.3, 40, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60'),
    ('PROD-117', 'boAt Rockerz 450 On-Ear Headphones', 'Headphones', 1499, 4.2, 55, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60'),
    ('PROD-118', 'Noise ColorFit Pulse 3 Smartwatch', 'Smartwatches', 1999, 4.1, 45, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60'),
    ('PROD-119', 'Samsung Galaxy Tab S9 FE (Wi-Fi 128GB)', 'Tablets', 36999, 4.7, 14, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=60'),
    ('PROD-120', 'Sony DualSense Wireless Controller', 'Gaming', 5990, 4.8, 26, 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60'),
    ('PROD-121', 'ASUS ROG Strix G16 Gaming Laptop', 'Gaming', 114990, 4.9, 7, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60'),
    ('PROD-122', 'Redmi Note 13 Pro 5G (8GB/256GB)', 'Smartphones', 24999, 4.5, 30, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60'),
    ('PROD-123', 'Sennheiser Accentum Plus Wireless ANC', 'Headphones', 14990, 4.6, 17, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60'),
    ('PROD-124', 'Realme 12 Pro+ 5G Periscope Telephoto', 'Smartphones', 29999, 4.4, 21, 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500&auto=format&fit=crop&q=60'),
    ('PROD-125', 'OnePlus Bullets Wireless Z2 Neckband', 'Headphones', 1999, 4.3, 60, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60'),
    ('PROD-126', 'LG 24-inch UltraGear IPS 144Hz', 'Monitors', 13499, 4.6, 18, 'https://images.unsplash.com/photo-1547119957-637f8679db17?w=500&auto=format&fit=crop&q=60'),
    ('PROD-127', 'Razer DeathAdder Essential Mouse', 'Mice', 1499, 4.5, 38, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60'),
    ('PROD-128', 'Cosmic Byte Firefly Mechanical Keyboard', 'Keyboards', 2199, 4.3, 32, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60'),
    ('PROD-129', 'Marshall Emberton II Bluetooth Speaker', 'Speakers', 15999, 4.8, 12, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60'),
    ('PROD-130', 'DJI Osmo Pocket 3 Creator Combo', 'Cameras', 53990, 4.9, 6, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop&q=60'),
    ('PROD-131', 'Anker 737 Power Bank 24000mAh', 'Accessories', 9999, 4.8, 24, 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=500&auto=format&fit=crop&q=60'),
    ('PROD-132', 'Fire-Boltt Phoenix Pro Bluetooth Watch', 'Smartwatches', 1499, 4.0, 50, 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60')
]

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        rating REAL NOT NULL,
        stock INTEGER NOT NULL,
        imageUrl TEXT NOT NULL
    )
    ''')

    # Insert or replace all 32 seed products so existing database is upgraded with full dataset
    cursor.executemany('''
    INSERT OR REPLACE INTO products (id, name, category, price, rating, stock, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', SAMPLE_PRODUCTS)
    conn.commit()

    cursor.execute('SELECT COUNT(*) FROM products')
    count = cursor.fetchone()[0]
    print(f"Database currently contains {count} products.")
    conn.close()

if __name__ == '__main__':
    init_db()
