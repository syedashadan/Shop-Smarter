/**
 * SmartShop Main JavaScript Controller
 * Handles Theme Toggling (Light/Dark), View Details Modal, Delete Confirmation Modal,
 * Toast Notifications, and Dynamic UI interactions.
 */

// Global Toast Utility
window.showToast = function(message) {
    const toastEl = document.getElementById('liveToast');
    const msgEl = document.getElementById('toastMessage');
    if (toastEl && msgEl) {
        msgEl.innerHTML = `<i class="bi bi-info-circle-fill text-primary me-2"></i> ${message}`;
        const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
        toast.show();
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. THEME TOGGLING (Light / Dark Mode with LocalStorage)
    // =========================================================================
    const savedTheme = localStorage.getItem('smartshop-theme') || 'light';
    applyTheme(savedTheme);

    const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem('smartshop-theme', next);
            showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} theme.`);
        });
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icons = document.querySelectorAll('.theme-icon');
        icons.forEach(icon => {
            if (theme === 'dark') {
                icon.className = 'bi bi-sun-fill text-warning theme-icon';
            } else {
                icon.className = 'bi bi-moon-stars-fill theme-icon';
            }
        });
    }

    // =========================================================================
    // 2. VIEW PRODUCT DETAILS MODAL BINDINGS
    // =========================================================================
    const detailModalEl = document.getElementById('productDetailModal');
    let detailModal = null;
    if (detailModalEl) {
        detailModal = new bootstrap.Modal(detailModalEl);
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.view-product-btn');
            if (btn) {
                const id = btn.getAttribute('data-id') || 'PROD';
                const name = btn.getAttribute('data-name') || 'Product';
                const category = btn.getAttribute('data-category') || 'Electronics';
                const price = btn.getAttribute('data-price') || '₹0';
                const rating = btn.getAttribute('data-rating') || '4.5';
                const stock = btn.getAttribute('data-stock') || '10';
                const image = btn.getAttribute('data-image') || '';

                document.getElementById('modalId').textContent = id;
                document.getElementById('modalName').textContent = name;
                document.getElementById('modalCategory').textContent = category;
                document.getElementById('modalPrice').textContent = price;
                document.getElementById('modalRating').textContent = rating;
                document.getElementById('modalStock').textContent = `${stock} units available`;
                document.getElementById('modalImage').src = image;

                detailModal.show();
            }
        });
    }

    // =========================================================================
    // 3. DELETE PRODUCT CONFIRMATION MODAL BINDINGS
    // =========================================================================
    const deleteModalEl = document.getElementById('deleteConfirmModal');
    let deleteModal = null;
    if (deleteModalEl) {
        deleteModal = new bootstrap.Modal(deleteModalEl);
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.delete-confirm-btn');
            if (btn) {
                const name = btn.getAttribute('data-name') || 'this product';
                const url = btn.getAttribute('data-url') || '#';

                document.getElementById('deleteCandidateName').textContent = `"${name}"`;
                document.getElementById('deleteProductForm').action = url;

                deleteModal.show();
            }
        });
    }

    // =========================================================================
    // 4. ANIMATED STAT COUNTERS ON HOMEPAGE
    // =========================================================================
    const counters = document.querySelectorAll('.counter');
    counters.forEach(c => {
        const target = +c.getAttribute('data-target');
        if (!target) return;
        let count = 0;
        const inc = Math.max(1, Math.ceil(target / 25));
        const timer = setInterval(() => {
            count += inc;
            if (count >= target) {
                c.textContent = target;
                clearInterval(timer);
            } else {
                c.textContent = count;
            }
        }, 30);
    });

});
