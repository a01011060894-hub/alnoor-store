# توثيق الواجهات والدوال (API Documentation)

## دوال الأداة (Utils)

### `formatCurrency(value)`
تنسيق الأرقام كعملات بصيغة مصرية.

```javascript
import { formatCurrency } from './utils.js';

const price = formatCurrency(1500);
// النتيجة: "1,500.00 ج.م"
```

**المعاملات**:
- `value` (number): القيمة المراد تنسيقها

**النتيجة**: (string) القيمة منسقة بالعملة

---

### `getCategoryName(categoryId, categories)`
الحصول على اسم الفئة من المعرّف.

```javascript
const name = getCategoryName('books', categories);
// النتيجة: "كتب ومذكرات"
```

**المعاملات**:
- `categoryId` (string): معرّف الفئة
- `categories` (array): مصفوفة الفئات

**النتيجة**: (string) اسم الفئة

---

### `getElement(id)`
اختيار عنصر DOM بأمان مع التحقق.

```javascript
const button = getElement('submit-button');
if (button) button.click();
```

**المعاملات**:
- `id` (string): معرّف العنصر

**النتيجة**: (Element|null) العنصر أو null

---

### `addEventListener(element, eventType, callback)`
إضافة مستمع حدث بطريقة آمنة.

```javascript
const button = getElement('my-button');
addEventListener(button, 'click', () => {
  console.log('تم الضغط');
});
```

**المعاملات**:
- `element` (Element): العنصر المستهدف
- `eventType` (string): نوع الحدث (click, input, etc.)
- `callback` (function): الدالة المراد تنفيذها

---

### `toggleClass(element, className, force)`
تبديل فئة CSS على عنصر.

```javascript
const drawer = getElement('cart-drawer');
toggleClass(drawer, 'is-open', true);  // إضافة
toggleClass(drawer, 'is-open', false); // إزالة
toggleClass(drawer, 'is-open');        // تبديل
```

**المعاملات**:
- `element` (Element): العنصر المستهدف
- `className` (string): اسم الفئة
- `force` (boolean, optional): true=إضافة، false=إزالة

---

### `setContent(element, content)`
تعيين محتوى نصي للعنصر.

```javascript
const title = getElement('page-title');
setContent(title, 'مرحباً بك');
```

**المعاملات**:
- `element` (Element): العنصر المستهدف
- `content` (string): المحتوى النصي

---

### `getFormValue(id)`
الحصول على قيمة حقل النموذج.

```javascript
const quantity = getFormValue('quantity-input');
console.log(quantity); // "100"
```

**المعاملات**:
- `id` (string): معرّف الحقل

**النتيجة**: (string) قيمة الحقل

---

### `debounce(func, delay)`
تأخير تنفيذ الدالة عند استدعاءات متكررة.

```javascript
const searchProducts = debounce((query) => {
  console.log('البحث عن:', query);
}, 300);

// ستُستدعى مرة واحدة بعد 300 ميلي ثانية من آخر استدعاء
searchInput.addEventListener('input', (e) => {
  searchProducts(e.target.value);
});
```

**المعاملات**:
- `func` (function): الدالة المراد تأخيرها
- `delay` (number): التأخير بالميلي ثانية

**النتيجة**: (function) دالة مُحسّنة مع تأخير

---

## دوال المنتجات (Products)

### `initProducts()`
تهيئة وحدة المنتجات وتحميل البيانات.

```javascript
import { initProducts } from './products.js';
await initProducts();
```

---

### `getProducts()`
الحصول على جميع المنتجات.

```javascript
const products = getProducts();
console.log(products.length); // 13
```

**النتيجة**: (array) مصفوفة جميع المنتجات

---

### `setProfitMargin(margin)`
تعيين هامش الربح.

```javascript
setProfitMargin(25); // إضافة 25% هامش ربح
```

**المعاملات**:
- `margin` (number): النسبة المئوية (0-500)

---

### `applyMargin(value)`
تطبيق هامش الربح على السعر.

```javascript
const basePrice = 100;
const adjustedPrice = applyMargin(basePrice);
// إذا كان الهامش 25%: النتيجة = 125
```

**المعاملات**:
- `value` (number): السعر الأساسي

**النتيجة**: (number) السعر مع الهامش

---

### `renderProducts()`
عرض شبكة المنتجات المصفاة.

```javascript
renderProducts();
// تعرض جميع المنتجات بناءً على الفلتر والبحث الحالي
```

---

### `setActiveFilter(filter)`
تعيين الفلتر النشط.

```javascript
setActiveFilter('books');   // عرض الكتب فقط
setActiveFilter('bags');    // عرض الشنط فقط
setActiveFilter('all');     // عرض الكل
```

**المعاملات**:
- `filter` (string): معرّف الفئة أو 'all'

---

### `findProductById(id)`
البحث عن منتج من خلال المعرّف.

```javascript
const product = findProductById('books');
if (product) {
  console.log(product.title);
}
```

**المعاملات**:
- `id` (string): معرّف المنتج

**النتيجة**: (object|undefined) المنتج أو undefined

---

## دوال السلة (Cart)

### `initCart()`
تهيئة وحدة السلة.

```javascript
import { initCart } from './cart.js';
initCart();
```

---

### `addToCart(item)`
إضافة عنصر للسلة.

```javascript
const item = {
  key: 'books-0-0',
  title: 'طباعة الكتب',
  details: ['ألوان', 'وجهين'],
  quantity: 100,
  unitPrice: 45,
  minimum: 1
};

addToCart(item);
```

**المعاملات**:
- `item` (object): العنصر المراد إضافته
  - `key` (string): معرّف فريد للعنصر
  - `title` (string): اسم المنتج
  - `details` (array): تفاصيل الخيارات
  - `quantity` (number): الكمية
  - `unitPrice` (number): سعر الوحدة
  - `minimum` (number): الحد الأدنى

---

### `getCartItems()`
الحصول على عناصر السلة.

```javascript
const items = getCartItems();
console.log(items.length);
```

**النتيجة**: (array) عناصر السلة

---

### `getCartTotal()`
حساب الإجمالي الكلي للسلة.

```javascript
const total = getCartTotal();
console.log(formatCurrency(total));
```

**النتيجة**: (number) الإجمالي

---

### `removeFromCart(key)`
حذف عنصر من السلة.

```javascript
removeFromCart('books-0-0');
```

**المعاملات**:
- `key` (string): معرّف العنصر

---

### `clearCart()`
مسح جميع عناصر السلة.

```javascript
clearCart();
```

---

### `updateCartItem(key, action)`
تحديث عنصر السلة.

```javascript
updateCartItem('books-0-0', 'increase'); // زيادة الكمية
updateCartItem('books-0-0', 'decrease'); // تقليل الكمية
updateCartItem('books-0-0', 'remove');   // حذف العنصر
```

**المعاملات**:
- `key` (string): معرّف العنصر
- `action` (string): العملية ('increase', 'decrease', 'remove')

---

## دوال الآلة الحاسبة (Calculator)

### `initCalculator()`
تهيئة الآلة الحاسبة.

```javascript
import { initCalculator } from './calculator.js';
initCalculator();
```

---

### `updateCalculator(event)`
تحديث حسابات الآلة الحاسبة.

```javascript
updateCalculator();
// أو
calculatorForm.addEventListener('submit', updateCalculator);
```

**المعاملات**:
- `event` (Event, optional): حدث النموذج

---

## دوال لوحة التحكم (Admin)

### `initAdmin()`
تهيئة لوحة التحكم.

```javascript
import { initAdmin } from './admin.js';
await initAdmin();
```

---

### `isDataReady()`
التحقق من جاهزية البيانات.

```javascript
if (isDataReady()) {
  console.log('البيانات جاهزة');
}
```

**النتيجة**: (boolean) true إذا كانت البيانات جاهزة

---

### `updateOrdersCount(count)`
تحديث عدد الطلبات في لوحة التحكم.

```javascript
updateOrdersCount(42);
```

**المعاملات**:
- `count` (number): عدد الطلبات

---

## أمثلة عملية

### مثال 1: إضافة منتج للسلة
```javascript
import { findProductById, addToCart } from './products.js';

const product = findProductById('books');
if (product) {
  const item = {
    key: 'books-0-0',
    title: product.title,
    details: ['ألوان', 'وجه واحد'],
    quantity: 500,
    unitPrice: 275,
    minimum: 1
  };
  addToCart(item);
}
```

### مثال 2: البحث عن المنتجات
```javascript
import { getProducts, renderProducts, setActiveFilter } from './products.js';

// تعيين الفلتر
setActiveFilter('bags');
renderProducts(); // عرض الشنط فقط

// البحث
const searchInput = getElement('search-input');
searchInput.value = 'قماش';
renderProducts(); // عرض المنتجات التي تحتوي على "قماش"
```

### مثال 3: حساب الأسعار
```javascript
import { setProfitMargin, applyMargin, formatCurrency } from './products.js';
import { formatCurrency } from './utils.js';

setProfitMargin(30); // 30% هامش ربح

const basePrice = 100;
const finalPrice = applyMargin(basePrice);

console.log(formatCurrency(finalPrice)); // "130.00 ج.م"
```

---

**آخر تحديث**: 2026-07-26  
**الإصدار**: 1.0
