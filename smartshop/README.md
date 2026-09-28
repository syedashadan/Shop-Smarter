# SmartShop – E-Commerce Product Sorting & Search Analyzer

> **Design and Analysis of Algorithms (DAA) Assignment 4 Project**  
> *A modern e-commerce web application implementing and benchmarking manual DAA algorithms in Python 3.11, Flask, and SQLite.*

---

## 📌 Project Overview
**SmartShop** demonstrates how core computer science algorithms power modern e-commerce platforms. Instead of relying on opaque built-in library functions like Python's `sorted()` or `.sort()`, this application implements **Merge Sort**, **Quick Sort**, and **Binary Search** manually from scratch.

Users can browse products in Indian Rupees (₹), sort the catalog dynamically, inspect execution times with microsecond precision, perform binary searches with step-by-step trace visualizations, and compare algorithm performance side-by-side.

---

## 🚀 Key Features

1. **Manual DAA Algorithm Implementations (No Built-in Sorts):**
   - **Merge Sort:** Recursive divide-and-conquer implementation with left/right partitioning and merging.
   - **Quick Sort:** Pivot-based partitioning with recursive sorting.
   - **Binary Search:** Logarithmic search over pre-sorted product arrays with complete step-by-step decision tracing (Low, Mid, High).

2. **Real-time Performance Benchmarking:**
   - Accurate timing using Python's `time.perf_counter()`.
   - Comparison counter tracking the exact number of key price comparisons.
   - Execution time reported in milliseconds (ms) with microsecond precision.

3. **Algorithm Analyzer Dashboard:**
   - Direct empirical comparison of Merge Sort vs Quick Sort on identical datasets.
   - Interactive vertical bar chart visualizer.
   - Dynamic winner indicator highlighting which algorithm performed faster for each specific run.

4. **Product Catalog & Persistence:**
   - 15+ realistic initial tech products (Laptops, Smartphones, Cameras, Watches, Audio).
   - Includes standard DAA viva test values (₹45,000, ₹12,000, ₹65,000, ₹25,000, ₹18,000).
   - Persistent storage using SQLite with Add Product form validation and Delete functionality.

5. **Student Viva Preparation Guide:**
   - Clear definitions, how-it-works, pseudocode, and complexity proofs.
   - Step-by-step mathematical tracing on assignment sample data.
   - Common viva questions and answers.

---

## 🧠 Algorithmic Complexity Summary

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity | Stability |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Merge Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | Stable |
| **Quick Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ | Unstable |
| **Binary Search** | $\mathcal{O}(1)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(\log n)$ | $\mathcal{O}(1)$ | N/A |

---

## 📂 Project Structure

```
smartshop/
├── app.py              # Flask server routes, API endpoints, database bindings
├── algorithms.py       # Pure manual implementations of Merge Sort, Quick Sort, Binary Search
├── init_db.py          # SQLite database schema creation and seed script
├── database.db         # Persistent SQLite database storing products
├── requirements.txt    # Python dependencies (Flask, Werkzeug)
├── README.md           # Project documentation and viva guide
├── static/
│   ├── css/
│   │   └── style.css   # Custom beige/cream aesthetic with brown accents
│   └── js/
│       └── main.js     # Bar visualization & comparison runner
└── templates/
    ├── base.html       # Shared layout, navbar, footer & responsive grid
    ├── index.html      # Homepage with hero & statistical dashboard
    ├── products.html   # Product cards with sorting controls & execution banner
    ├── search.html     # Binary Search analyzer with Low-Mid-High trace
    ├── analyzer.html   # Merge Sort vs Quick Sort comparison & visualizer
    ├── algorithms.html # Viva study guide with pseudocode & explanations
    └── add_product.html# Form with validation to add new products
```

---

## 💻 How to Run Locally in VS Code

### 1. Prerequisites
- Python 3.10 or Python 3.11 installed.
- VS Code (or any code editor).

### 2. Setup Steps

```bash
# 1. Navigate to the project directory
cd smartshop

# 2. (Optional but recommended) Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# 3. Install requirements
pip install -r requirements.txt

# 4. Initialize the SQLite database (seeds 16 products)
python init_db.py

# 5. Run the application
python app.py
```

Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 🌐 Free Cloud Deployment Guide (Render / PythonAnywhere)

### Option A: Deploying on Render (Free Web Service)
1. Push this folder to a GitHub repository.
2. Log in to [Render](https://render.com) and click **New > Web Service**.
3. Select your GitHub repository.
4. Set:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && python init_db.py`
   - **Start Command:** `gunicorn app:app` (or add `gunicorn` to `requirements.txt`).
5. Click **Deploy Web Service**.

### Option B: Deploying on PythonAnywhere
1. Create a free account on [PythonAnywhere](https://www.pythonanywhere.com).
2. Go to the **Files** tab and upload the `smartshop` zip file, or clone via Bash console.
3. Open a Bash console:
   ```bash
   pip install -r requirements.txt
   python init_db.py
   ```
4. In the **Web** tab, configure a manual Flask web app pointing to `app.py`.
5. Reload the web app.

---

## 🔮 Future Improvements
- Multi-pivot Dual-Pivot QuickSort implementation.
- Exporting sorting logs to CSV / JSON.
- Adding Interpolation Search for uniformly distributed prices.
- Live sound synthesizers for auditory sorting representation.
