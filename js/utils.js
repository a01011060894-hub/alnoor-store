/**
 * Utility Functions
 * دوال مساعدة عامة
 */

/**
 * Format price with currency
 * تنسيق السعر بالعملة
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 2
  }).format(value).replace('EGP', 'ج.م');
};

/**
 * Get category name by ID
 * الحصول على اسم الفئة من المعرّف
 */
export const getCategoryName = (categoryId, categories) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
};

/**
 * Safe DOM element selection
 * اختيار عنصر DOM بأمان
 */
export const getElement = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID "${id}" not found`);
  }
  return element;
};

/**
 * Safe event listener attachment
 * إضافة مستمع حدث بأمان
 */
export const addEventListener = (element, eventType, callback) => {
  if (element) {
    element.addEventListener(eventType, callback);
  }
};

/**
 * Toggle CSS class
 * تبديل فئة CSS
 */
export const toggleClass = (element, className, force) => {
  if (element) {
    element.classList.toggle(className, force);
  }
};

/**
 * Set element content
 * تعيين محتوى العنصر
 */
export const setContent = (element, content) => {
  if (element) {
    element.textContent = content;
  }
};

/**
 * Set element HTML
 * تعيين HTML العنصر
 */
export const setHTML = (element, html) => {
  if (element) {
    element.innerHTML = html;
  }
};

/**
 * Get form field value
 * الحصول على قيمة حقل النموذج
 */
export const getFormValue = (id) => {
  const element = getElement(id);
  return element ? element.value : '';
};

/**
 * Set form field value
 * تعيين قيمة حقل النموذج
 */
export const setFormValue = (id, value) => {
  const element = getElement(id);
  if (element) {
    element.value = value;
  }
};

/**
 * Debounce function
 * دالة تأخير التنفيذ
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Copy to clipboard
 * نسخ إلى الحافظة
 */
export const copyToClipboard = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const result = document.execCommand('copy');
    textArea.remove();
    return Promise.resolve(result);
  }
};

/**
 * Get element data attribute
 * الحصول على سمة بيانات العنصر
 */
export const getData = (element, key) => {
  return element ? element.dataset[key] : null;
};

/**
 * Set element data attribute
 * تعيين سمة بيانات العنصر
 */
export const setData = (element, key, value) => {
  if (element) {
    element.dataset[key] = value;
  }
};
