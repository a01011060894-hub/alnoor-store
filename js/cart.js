/**
 * Shopping Cart Management Module
 * وحدة إدارة سلة التسوق
 */

import { formatCurrency, getElement, setHTML, setContent } from './utils.js';

let cart = [];

/**
 * Initialize cart module
 * تهيئة وحدة السلة
 */
export const initCart = () => {
  setupEventListeners();
};

/**
 * Get cart items
 * الحصول على عناصر السلة
 */
export const getCartItems = () => cart;

/**
 * Get cart total
 * الحصول على إجمالي السلة
 */
export const getCartTotal = () => {
  return cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};

/**
 * Get cart item count
 * الحصول على عدد عناصر السلة
 */
export const getCartItemCount = () => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Add item to cart
 * إضافة عنصر إلى ��لسلة
 */
export const addToCart = (item) => {
  const existing = cart.find(cartItem => cartItem.key === item.key);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  renderCart();
};

/**
 * Update cart item
 * تحديث عنصر السلة
 */
export const updateCartItem = (key, action) => {
  const item = cart.find(entry => entry.key === key);
  if (!item) return;

  if (action === 'increase') {
    item.quantity += item.minimum || 1;
  } else if (action === 'decrease') {
    item.quantity -= item.minimum || 1;
  }

  if (action === 'remove' || item.quantity < item.minimum) {
    cart = cart.filter(entry => entry.key !== key);
  }

  renderCart();
};

/**
 * Remove item from cart
 * إزالة عنصر من السلة
 */
export const removeFromCart = (key) => {
  cart = cart.filter(item => item.key !== key);
  renderCart();
};

/**
 * Clear cart
 * مسح السلة
 */
export const clearCart = () => {
  cart = [];
  renderCart();
};

/**
 * Render cart
 * عرض السلة
 */
export const renderCart = () => {
  const cartItems = getElement('cart-items');
  const cartEmpty = getElement('cart-empty');
  const cartTotal = getElement('cart-total');
  const cartCount = getElement('cart-count');
  const whatsappBtn = getElement('whatsapp-button');

  const total = getCartTotal();
  const count = getCartItemCount();

  // Update totals
  if (cartTotal) setContent(cartTotal, formatCurrency(total));
  if (cartCount) setContent(cartCount, count);
  if (whatsappBtn) whatsappBtn.disabled = cart.length === 0;

  // Toggle visibility
  if (cartEmpty) cartEmpty.classList.toggle('hidden', cart.length > 0);
  if (cartItems) cartItems.classList.toggle('hidden', cart.length === 0);

  // Render items
  if (cartItems) {
    setHTML(cartItems, cart.map(item => `
      <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-sm font-black text-slate-950">${item.title}</h3>
            <p class="mt-1 text-xs font-bold leading-6 text-slate-600">${item.details.join(' • ')}</p>
          </div>
          <button type="button" data-action="remove" data-key="${item.key}" class="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div class="flex items-center gap-2">
            <button type="button" data-action="increase" data-key="${item.key}" class="grid h-8 w-8 place-items-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100">+</button>
            <span class="min-w-8 text-center text-xs font-black">${item.quantity}</span>
            <button type="button" data-action="decrease" data-key="${item.key}" class="grid h-8 w-8 place-items-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100">−</button>
          </div>
          <strong class="text-sm font-black text-orange-600">${formatCurrency(item.unitPrice * item.quantity)}</strong>
        </div>
      </article>
    `).join(''));
  }
};

/**
 * Build order summary
 * بناء ملخص الطلب
 */
export const buildOrderSummary = () => {
  return cart.map((item, index) =>
    `${index + 1}. ${item.title} | ${item.details.join(' - ')} | الكمية: ${item.quantity} | الإجمالي: ${formatCurrency(item.quantity * item.unitPrice)}`
  ).join('\n');
};

/**
 * Setup event listeners
 * إعداد مستمعي الأحداث
 */
const setupEventListeners = () => {
  const cartItems = getElement('cart-items');

  if (cartItems) {
    cartItems.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (button) {
        updateCartItem(button.dataset.key, button.dataset.action);
      }
    });
  }
};
