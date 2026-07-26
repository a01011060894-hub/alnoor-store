/**
 * Main Application Module
 * وحدة التطبيق الرئيسية
 */

import { initProducts, renderProducts, getProducts, getCategories, setProfitMargin } from './products.js';
import { initCart, renderCart, getCartItems, getCartTotal, buildOrderSummary, clearCart, addToCart } from './cart.js';
import { initCalculator } from './calculator.js';
import { initAdmin } from './admin.js';
import { getElement, addEventListener, toggleClass } from './utils.js';
import { formatCurrency } from './utils.js';

/**
 * Initialize application
 * تهيئة التطبيق
 */
export const initApp = async () => {
  try {
    // Initialize modules
    await initProducts();
    initCart();
    initCalculator();
    initAdmin();

    // Setup global event listeners
    setupEventListeners();

    // Initialize Lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }

    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Error initializing application:', error);
  }
};

/**
 * Setup global event listeners
 * إعداد مستمعي الأحداث العالميين
 */
const setupEventListeners = () => {
  // Search input
  const searchInput = getElement('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderProducts());
  }

  // Filter buttons
  const filterList = getElement('filter-list');
  if (filterList) {
    filterList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (button) {
        const filter = button.dataset.filter;
        // Update active filter and render
        document.querySelectorAll('.filter-button').forEach(btn => {
          btn.classList.toggle('active', btn === button);
        });
      }
    });
  }

  // Product grid (open product modal)
  const productGrid = getElement('product-grid');
  if (productGrid) {
    productGrid.addEventListener('click', (event) => {
      const button = event.target.closest('.product-open');
      if (button) {
        const productId = button.dataset.productId;
        // Emit event or call handler
        window.dispatchEvent(new CustomEvent('openProduct', { detail: { productId } }));
      }
    });
  }

  // Cart button
  const cartButton = getElement('cart-button');
  if (cartButton) {
    cartButton.addEventListener('click', openCart);
  }

  // Close cart
  const closeCart = getElement('close-cart');
  if (closeCart) {
    closeCart.addEventListener('click', closeCartDrawer);
  }

  // Cart overlay
  const cartOverlay = getElement('cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCartDrawer);
  }

  // FAQ toggle
  const faqList = getElement('faq-list');
  if (faqList) {
    faqList.addEventListener('click', (event) => {
      const button = event.target.closest('.faq-toggle');
      if (button) {
        const answer = button.nextElementSibling;
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        if (answer) {
          answer.classList.toggle('hidden', expanded);
        }
      }
    });
  }

  // Escape key to close modals
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCartDrawer();
    }
  });
};

/**
 * Open cart drawer
 * فتح درج السلة
 */
const openCart = () => {
  const overlay = getElement('cart-overlay');
  const drawer = getElement('cart-drawer');

  if (overlay) overlay.classList.remove('hidden');
  if (drawer) {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  }
};

/**
 * Close cart drawer
 * إغلاق درج السلة
 */
const closeCartDrawer = () => {
  const overlay = getElement('cart-overlay');
  const drawer = getElement('cart-drawer');

  if (overlay) overlay.classList.add('hidden');
  if (drawer) {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
