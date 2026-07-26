# البنية المعمارية (Architecture)

## نظرة عامة

تم إعادة هيكلة المشروع من ملف HTML واحد ضخم (67 KB) إلى بنية منظمة بملفات منفصلة:

```
├── HTML Layer (عرض البيانات)
├── CSS Layer (أنماط والتصميم)
└── JavaScript Layer (المنطق والعمليات)
    ├── Utils (دوال مساعدة)
    ├── Products (إدارة المنتجات)
    ├── Cart (إدارة السلة)
    ├── Calculator (الحسابات)
    └── Admin (لوحة التحكم)
```

## طبقات المشروع

### 1. طبقة HTML (Presentation)

**الملف**: `index.html`  
**الحجم**: 26 KB (بدلاً من 67 KB)  
**الدور**: عرض الواجهة وأقسام الصفحة

```html
<!-- البنية الأساسية -->
<header>        <!-- رأس الصفحة -->
<main>          <!-- المحتوى الرئيسي -->
<footer>        <!-- التذييل -->
```

### 2. طبقة CSS (Styling)

**المجلد**: `css/`  
**الملفات**: 8 ملفات منفصلة

```
css/
├── main.css        (استيراد جميع الملفات الأخرى)
├── variables.css   (متغيرات الألوان والمسافات)
├── base.css        (أنماط أساسية عامة)
├── text.css        (أنماط النصوص والطباعة)
├── spacing.css     (فئات المسافات والفراغات)
├── layout.css      (نظام الشبكات والتخطيط)
├── forms.css       (أنماط النماذج والمدخلات)
└── components.css  (مكونات الواجهة)
```

### 3. طبقة JavaScript (Logic)

**المجلد**: `js/`  
**الملفات**: 6 وحدات

#### `main.js` - الملف الرئيسي
```javascript
// المسؤول عن:
- تهيئة التطبيق
- إعداد مستمعي الأحداث العامين
- ربط جميع الوحدات
```

#### `utils.js` - دوال مساعدة
```javascript
// يحتوي على:
- formatCurrency()      // تنسيق العملات
- getCategoryName()     // الحصول على أسماء الفئات
- getElement()          // اختيار عناصر DOM بأمان
- addEventListener()    // إضافة مستمعي الأحداث
- toggleClass()         // تبديل فئات CSS
- debounce()           // تأخير تنفيذ الدوال
- copyToClipboard()    // نسخ إلى الحافظة
```

#### `products.js` - إدارة المنتجات
```javascript
// المسؤول عن:
- تحميل بيانات المنتجات من JSON
- تخزين قائمة المنتجات والفئات
- إدارة هامش الربح
- فلترة المنتجات
- عرض شبكة المنتجات
- البحث والفلترة
```

#### `cart.js` - إدارة السلة
```javascript
// المسؤول عن:
- إضافة عناصر للسلة
- حذف عناصر من السلة
- تحديث الكميات
- حساب الإجمالي
- عرض قائمة السلة
- بناء ملخص الطلب
```

#### `calculator.js` - الآلة الحاسبة
```javascript
// المسؤول عن:
- حساب سعر الوحدة
- حساب الإجمالي
- تطبيق هامش الربح
- تحديث النتائج فوراً
```

#### `admin.js` - لوحة التحكم
```javascript
// المسؤول عن:
- تعديل هامش الربح
- إظهار/إخفاء لوحة التحكم
- عرض إحصائيات الطلبات
- إدارة البيانات
```

### 4. طبقة البيانات (Data)

**المجلد**: `data/`  
**الملفات**: 3 ملفات JSON

#### `products.json` - المنتجات
```json
{
  "products": [
    {
      "id": "books",
      "category": "books",
      "title": "...",
      "options": [...],
      "pricing": [...],
      "note": "..."
    }
  ]
}
```

#### `categories.json` - الفئات
```json
{
  "categories": [
    {
      "id": "books",
      "name": "كتب ومذكرات",
      "icon": "book-open"
    }
  ]
}
```

#### `settings.json` - الإعدادات
```json
{
  "site": { ... },
  "sections": { ... },
  "admin": { ... }
}
```

## تدفق البيانات (Data Flow)

```
1. تحميل البيانات
   ├── GET /data/products.json
   ├── GET /data/categories.json
   └── GET /data/settings.json

2. معالجة البيانات
   ├── products.js: تخزين وتصفية
   ├── calculator.js: حساب الأسعار
   └── admin.js: إدارة الهامش

3. عرض الواجهة
   ├── renderProducts()
   ├── renderCart()
   └── updateUI()

4. التفاعل مع المستخدم
   ├── Click Events
   ├── Input Events
   └── Form Submit

5. إجراء العمليات
   ├── addToCart()
   ├── updateCart()
   └── sendOrder()
```

## الحالة العامة (Application State)

```javascript
State Management:
├── Products
│   ├── allProducts[]      // قائمة جميع المنتجات
│   ├── categories[]       // الفئات المتاحة
│   ├── profitMargin       // هامش الربح
│   └── activeFilter       // الفلتر النشط
│
├── Cart
│   ├── cart[]             // عناصر السلة
│   ├── total              // الإجمالي
│   └── itemCount          // عدد العناصر
│
└── Admin
    ├── dataReady          // حالة جاهزية البيانات
    ├── currentRecords[]   // السجلات الحالية
    └── orderCount         // عدد الطلبات
```

## دورة الحياة (Lifecycle)

```
1. Initialization (DOMContentLoaded)
   └── initApp()
       ├── initProducts()    // تحميل المنتجات
       ├── initCart()        // تهيئة السلة
       ├── initCalculator()  // تهيئة الآلة الحاسبة
       ├── initAdmin()       // تهيئة لوحة التحكم
       └── setupEventListeners()  // إعداد الأحداث

2. User Interaction
   ├── Search/Filter       → renderProducts()
   ├── Add to Cart         → addToCart() → renderCart()
   ├── Update Quantity     → updateCartItem() → renderCart()
   ├── Set Margin          → setProfitMargin() → updateUI()
   └── Send Order          → saveAndSend() → WhatsApp

3. State Updates
   └── Re-render UI        → updateDisplay()
```

## معايير الكود (Code Standards)

### التسمية (Naming)
```javascript
// Functions
initProducts()              // فعل + اسم
getProductStartingPrice()   // get + كائن + صفة
formatCurrency()            // فعل + كائن

// Variables
allProducts                 // بادئة + اسم جمع
productMargin             // كائن + صفة
isDataReady               // is + صفة (للقيم البوليانية)
```

### التوثيق (Documentation)
```javascript
/**
 * اسم الدالة
 * الوصف بالعربية
 */
export const functionName = () => {
  // التطبيق
};
```

## الأداء (Performance)

### تحسينات متحققة
- ✅ تقليل حجم HTML من 67 KB إلى 26 KB
- ✅ فصل CSS لتحميل انتقائي
- ✅ استخدام ES6 modules للتحميل الديناميكي
- ✅ Debouncing على عمليات البحث
- ✅ التخزين المؤقت للبيانات

### أرقام الأداء
```
أحجام الملفات:
- index.html:    26 KB  (بدلاً من 67 KB)
- css/main.css:   ~8 KB
- js/*.js:        ~15 KB (مجموع جميع الملفات)
- data/*.json:    ~120 KB (المنتجات والبيانات)

Gross Total:      ~170 KB (نسبة ضغط أفضل)
```

## التوسعية (Scalability)

### إضافة ميزة جديدة

1. **أنشئ وحدة جديدة**
   ```javascript
   // js/newFeature.js
   export const initNewFeature = () => { ... };
   ```

2. **استوردها في main.js**
   ```javascript
   import { initNewFeature } from './newFeature.js';
   ```

3. **استدعها في initApp()**
   ```javascript
   export const initApp = async () => {
     // ...
     initNewFeature();
   };
   ```

### إضافة منتج جديد
```json
// data/products.json
{
  "id": "newProduct",
  "category": "books",
  "title": "...",
  "options": [...],
  "pricing": [...]
}
```

## الصيانة (Maintenance)

### نقاط للمراقبة
- تحديث بيانات المنتجات
- اختبار الحسابات المالية
- التوافقية مع المتصفحات
- الأداء على الأجهزة المحمولة

### أدوات مفيدة
- Browser DevTools
- Chrome Lighthouse
- Network tab للمراقبة

## الخلاصة

البنية الجديدة توفر:

✅ **قابلية الصيانة** - كل وحدة لها مسؤولية واحدة  
✅ **قابلية التوسع** - إضافة ميزات جديدة بسهولة  
✅ **الأداء** - تقليل أحجام الملفات  
✅ **إعادة الاستخدام** - دوال عامة وقابلة للاستخدام  
✅ **الوضوح** - كود سهل الفهم والقراءة  
✅ **التعاون** - فريق يمكنه العمل على ملفات مختلفة  

---

**تاريخ الإنشاء**: 2026-07-26  
**الإصدار**: 2.0  
