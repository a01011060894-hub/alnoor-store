/**
 * Products Management Module
 * وحدة إدارة المنتجات
 */

import { formatCurrency, getCategoryName, getElement, setHTML, getFormValue } from './utils.js';

let allProducts = [];
let categories = [];
let profitMargin = 0;
let activeFilter = 'all';

/**
 * Initialize products module
 * تهيئة وحدة المنتجات
 */
export const initProducts = async () => {
  try {
    // Load products data
    const productsRes = await fetch('./data/products.json');
    const productsData = await productsRes.json();
    allProducts = productsData.products;

    // Load categories data
    const categoriesRes = await fetch('./data/categories.json');
    const categoriesData = await categoriesRes.json();
    categories = categoriesData.categories;

    renderProducts();
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

/**
 * Get all products
 * الحصول على جميع المنتجات
 */
export const getProducts = () => allProducts;

/**
 * Get categories
 * الحصول على الفئات
 */
export const getCategories = () => categories;

/**
 * Set profit margin
 * تعيين هامش الربح
 */
export const setProfitMargin = (margin) => {
  profitMargin = Math.max(0, Math.min(500, margin || 0));
};

/**
 * Get profit margin
 * الحصول على هامش الربح
 */
export const getProfitMargin = () => profitMargin;

/**
 * Apply profit margin to price
 * تطبيق هامش الربح على السعر
 */
export const applyMargin = (value) => {
  return value * (1 + profitMargin / 100);
};

/**
 * Get product starting price
 * الحصول على سعر المنتج الأولي
 */
export const getProductStartingPrice = (product) => {
  let basePrice = 0;

  if (product.isFlexo) {
    basePrice = 2.18;
  } else if (product.id === 'books') {
    basePrice = 0.4;
  } else if (product.pricing) {
    basePrice = Math.min(...product.pricing.flat(Infinity));
  }

  return applyMargin(basePrice);
};

/**
 * Render products grid
 * عرض شبكة المنتجات
 */
export const renderProducts = () => {
  const grid = getElement('product-grid');
  const noResults = getElement('no-results');
  const searchInput = getElement('search-input');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  // Filter products
  const filtered = allProducts.filter(product => {
    const searchText = `${product.title} ${product.description} ${getCategoryName(product.category, categories)}`.toLowerCase();
    return (activeFilter === 'all' || product.category === activeFilter) && searchText.includes(query);
  });

  // Render grid
  if (grid) {
    setHTML(grid, filtered.map(product => `
      <article class="product-card flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div>
          <div class="relative h-52 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-700">
            <div class="h-full w-full bg-slate-200"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
            <span class="absolute right-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-black text-white">${getCategoryName(product.category, categories)}</span>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-black text-slate-950">${product.title}</h3>
            <p class="mt-2.5 text-sm leading-7 text-slate-600">${product.description}</p>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 p-6 pt-4">
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-slate-400">السعر التقريبي</span>
            <span class="price-chip inline-flex w-fit items-center rounded-xl">${formatCurrency(getProductStartingPrice(product))}</span>
          </div>
          <button type="button" data-product-id="${product.id}" class="product-open inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800">
            <span>التفاصيل</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
        </div>
      </article>
    `).join(''));
  }

  // Show/hide no results
  if (noResults) {
    noResults.classList.toggle('hidden', filtered.length !== 0);
  }
};

/**
 * Set active filter
 * تعيين المرشح النشط
 */
export const setActiveFilter = (filter) => {
  activeFilter = filter;
  renderProducts();
};

/**
 * Get active filter
 * الحصول على المرشح النشط
 */
export const getActiveFilter = () => activeFilter;

/**
 * Find product by ID
 * البحث عن منتج من خلال المعرّف
 */
export const findProductById = (id) => {
  return allProducts.find(p => p.id === id);
};
