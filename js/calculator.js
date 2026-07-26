/**
 * Calculator Module
 * وحدة الآلة الحاسبة
 */

import { formatCurrency } from './utils.js';
import { applyMargin } from './products.js';

/**
 * Initialize calculator
 * تهيئة الآلة الحاسبة
 */
export const initCalculator = () => {
  setupEventListeners();
  updateCalculator();
};

/**
 * Update calculator
 * تحديث الآلة الحاسبة
 */
export const updateCalculator = (event) => {
  if (event) event.preventDefault();

  const quantityInput = document.getElementById('calc-quantity');
  const baseInput = document.getElementById('calc-base');
  const extraInput = document.getElementById('calc-extra');
  const unitResult = document.getElementById('calc-unit-result');
  const totalResult = document.getElementById('calc-total-result');

  if (!quantityInput || !baseInput || !extraInput) return;

  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const base = Math.max(0, Number(baseInput.value) || 0);
  const extra = Math.max(0, Number(extraInput.value) || 0);
  const unit = applyMargin(base + extra);

  if (unitResult) unitResult.textContent = formatCurrency(unit);
  if (totalResult) totalResult.textContent = formatCurrency(unit * quantity);
};

/**
 * Setup event listeners
 * إعداد مستمعي الأحداث
 */
const setupEventListeners = () => {
  const form = document.getElementById('calculator-form');
  const inputs = ['calc-quantity', 'calc-base', 'calc-extra'];

  if (form) {
    form.addEventListener('submit', updateCalculator);
  }

  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', updateCalculator);
    }
  });
};
