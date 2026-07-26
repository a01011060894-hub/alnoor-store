/**
 * Admin Panel Module
 * وحدة لوحة التحكم
 */

import { getElement, setContent } from './utils.js';
import { setProfitMargin, getProfitMargin, renderProducts } from './products.js';
import { getCartItems } from './cart.js';

let currentRecords = [];
let dataReady = false;

/**
 * Initialize admin panel
 * تهيئة لوحة التحكم
 */
export const initAdmin = async () => {
  setupEventListeners();
  await initializeOrdersSheet();
};

/**
 * Setup event listeners
 * إعداد مستمعي الأحداث
 */
const setupEventListeners = () => {
  const pricingForm = getElement('pricing-form');
  const adminToggle = getElement('admin-toggle');

  if (pricingForm) {
    pricingForm.addEventListener('submit', handlePricingSubmit);
  }

  if (adminToggle) {
    adminToggle.addEventListener('click', handleAdminToggle);
  }
};

/**
 * Handle pricing form submission
 * معالجة إرسال نموذج التسعير
 */
const handlePricingSubmit = (event) => {
  event.preventDefault();

  const marginInput = getElement('margin-input');
  const marginMessage = getElement('margin-message');
  const marginValue = getElement('admin-margin-value');

  if (!marginInput) return;

  const newMargin = Math.max(0, Math.min(500, Number(marginInput.value) || 0));
  setProfitMargin(newMargin);
  marginInput.value = newMargin;

  if (marginValue) {
    setContent(marginValue, `${newMargin}%`);
  }

  if (marginMessage) {
    marginMessage.textContent = 'تم تحديث هامش الربح وتطبيقه على الأسعار.';
    marginMessage.className = 'mt-3 text-sm font-bold text-emerald-400';
  }

  renderProducts();
};

/**
 * Handle admin panel toggle
 * معالجة تبديل لوحة التحكم
 */
const handleAdminToggle = () => {
  const adminPanel = getElement('admin-panel');
  const adminToggle = getElement('admin-toggle');

  if (!adminPanel) return;

  const isHidden = adminPanel.classList.toggle('hidden');

  if (adminToggle) {
    adminToggle.setAttribute('aria-expanded', String(!isHidden));
  }

  if (!isHidden) {
    adminPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Initialize orders sheet
 * تهيئة سجل الطلبات
 */
const initializeOrdersSheet = async () => {
  const ordersCount = getElement('admin-orders-count');

  // Simulated initialization - replace with actual data SDK if available
  if (ordersCount) {
    setContent(ordersCount, '0');
    dataReady = true;
  }
};

/**
 * Get data ready status
 * الحصول على حالة جاهزية البيانات
 */
export const isDataReady = () => dataReady;

/**
 * Get current records
 * الحصول على السجلات الحالية
 */
export const getCurrentRecords = () => currentRecords;

/**
 * Update orders count
 * تحديث عدد الطلبات
 */
export const updateOrdersCount = (count) => {
  const ordersCount = getElement('admin-orders-count');
  if (ordersCount) {
    setContent(ordersCount, count);
  }
};
