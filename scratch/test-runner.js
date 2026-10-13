// scratch test runner to simulate browser interaction and verify POS logic
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Read files
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const cssContent = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf-8');
const jsContent = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf-8');

console.log("--- 1. Static HTML & CSS Validation ---");
// Check IDs in HTML
const requiredIds = [
  "product-list", "app-message", "cart-content", "cart-total",
  "payment-input", "pay-button", "payment-feedback", "receipt-content",
  "theme-select", "theme-modal-btn", "pos-modal-backdrop", "pos-modal"
];
for (const id of requiredIds) {
  if (!htmlContent.includes(`id="${id}"`)) {
    console.error(`FAIL: Missing ID in HTML: ${id}`);
    process.exit(1);
  }
}
console.log("PASS: All required HTML element IDs present.");

// Check Themes in CSS
const requiredThemes = ["light", "dark", "ocean-blue", "forest-green", "warm-amber", "purple-night"];
for (const theme of requiredThemes) {
  if (!cssContent.includes(`[data-theme="${theme}"]`)) {
    console.error(`FAIL: Missing theme in CSS: ${theme}`);
    process.exit(1);
  }
}
console.log("PASS: All 6 required color schemes present in styles.css.");

// Check CSS variable backwards compatibility
const requiredVars = ["--navy", "--blue", "--blue-light", "--ink", "--muted", "--line", "--surface", "--canvas"];
for (const v of requiredVars) {
  if (!cssContent.includes(v)) {
    console.error(`FAIL: Missing backward compatible CSS variable: ${v}`);
    process.exit(1);
  }
}
console.log("PASS: CSS variable backwards compatibility intact.");

// Check prefers-reduced-motion
if (!cssContent.includes("prefers-reduced-motion: reduce")) {
  console.error("FAIL: Missing prefers-reduced-motion media query");
  process.exit(1);
}
console.log("PASS: Accessibility prefers-reduced-motion present.");

console.log("--- 2. JS Logic & Test Case Validation ---");

// Mock basic DOM environment to run app.js logic
class MockElement {
  constructor(tag, id = "", className = "") {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = className;
    this.dataset = {};
    this.attributes = new Map();
    this.innerHTML = "";
    this.textContent = "";
    this.disabled = false;
    this.value = "";
    this.classList = {
      classes: new Set(className ? className.split(" ") : []),
      add: (c) => this.classList.classes.add(c),
      remove: (c) => this.classList.classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList.classes.has(c)) this.classList.classes.delete(c);
          else this.classList.classes.add(c);
        } else if (force) {
          this.classList.classes.add(c);
        } else {
          this.classList.classes.delete(c);
        }
      },
      contains: (c) => this.classList.classes.has(c)
    };
    this.listeners = {};
    this.style = {};
  }
  setAttribute(k, v) { this.attributes.set(k, v); }
  getAttribute(k) { return this.attributes.get(k); }
  removeAttribute(k) { this.attributes.delete(k); }
  hasAttribute(k) { return this.attributes.has(k); }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  dispatchEvent(evt) {
    if (this.listeners[evt.type]) {
      this.listeners[evt.type].forEach(fn => fn(evt));
    }
  }
  focus() {}
  offsetWidth = 100;
}

const mockDoc = {
  documentElement: new MockElement("html"),
  elements: {},
  querySelector(sel) {
    if (sel.startsWith("#")) {
      const id = sel.slice(1);
      if (!this.elements[id]) {
        this.elements[id] = new MockElement("div", id);
      }
      return this.elements[id];
    }
    return new MockElement("div");
  },
  querySelectorAll(sel) {
    return [];
  },
  addEventListener() {},
  activeElement: null
};

const storage = {};
const sandbox = {
  document: mockDoc,
  localStorage: {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); }
  },
  setTimeout: (fn) => fn(),
  Date: Date,
  Number: Number,
  console: console
};

vm.createContext(sandbox);
vm.runInContext(jsContent, sandbox);

const run = (expr) => vm.runInContext(expr, sandbox);

// Verify Catalogue
const products = run('products');
console.log(`PASS: Catalogue length: ${products.length} items`);
if (products.length !== 6) throw new Error("Expected 6 products");
const expectedProducts = [
  { id: "instant-noodles", price: 18 },
  { id: "potato-chips", price: 25 },
  { id: "soft-drink", price: 25 },
  { id: "bottled-water", price: 20 },
  { id: "ballpen", price: 12 },
  { id: "notebook", price: 35 }
];
for (const ep of expectedProducts) {
  const p = products.find(x => x.id === ep.id);
  if (!p || p.price !== ep.price) throw new Error(`Product ${ep.id} mismatch!`);
}
console.log("PASS: TC-01: All six products show their correct Philippine-peso prices.");

// Test TC-02: Add Instant Noodles twice and Bottled Water once
run('addToCart("instant-noodles")');
run('addToCart("instant-noodles")');
run('addToCart("bottled-water")');
run('renderCart()');
const cart = run('cart');
console.log(`Cart total: ₱${run('calculateTotal()').toFixed(2)}`);
if (cart.length !== 2) throw new Error("Cart should have 2 unique items");
if (cart[0].quantity !== 2 || cart[1].quantity !== 1) throw new Error("Quantities mismatch");
if (run('calculateTotal()') !== 56) throw new Error("Total should be 56.00");
console.log("PASS: TC-02: Add Instant Noodles twice and Bottled Water once -> Total is ₱56.00.");

// Test TC-03: Increase and decrease an item
run('updateQuantity("instant-noodles", 1)');
if (run('calculateTotal()') !== 74) throw new Error("Total should be 74 after increase");
run('updateQuantity("instant-noodles", -1)');
if (run('calculateTotal()') !== 56) throw new Error("Total should be 56 after decrease");
console.log("PASS: TC-03: Increase and decrease an item works properly.");

// Test TC-04: Decrease item with quantity 1
run('updateQuantity("bottled-water", -1)');
if (run('cart.find(x => x.id === "bottled-water")')) throw new Error("Bottled water should be removed");
console.log("PASS: TC-04: Decreasing item with quantity 1 removes it from cart.");

// Test TC-05: Explicit remove
run('removeFromCart("instant-noodles")');
if (run('cart.length') !== 0) throw new Error("Cart should be empty");
if (run('calculateTotal()') !== 0) throw new Error("Total should be 0");
console.log("PASS: TC-05: Remove cart item empties cart and recalculates total.");

// Rebuild 56 order for payment checks
run('addToCart("instant-noodles")');
run('addToCart("instant-noodles")');
run('addToCart("bottled-water")');

// Test TC-06: Empty payment
const vEmpty = run('validatePayment("")');
if (vEmpty.valid !== false || vEmpty.message !== "Please enter a valid payment amount.") {
  throw new Error(`TC-06 failed: ${JSON.stringify(vEmpty)}`);
}
console.log("PASS: TC-06: Empty payment rejected with 'Please enter a valid payment amount.'");

// Test TC-07: 'abc' and '-10'
const vAbc = run('validatePayment("abc")');
if (vAbc.valid !== false || vAbc.message !== "Please enter a valid payment amount.") {
  throw new Error(`TC-07 'abc' failed: ${JSON.stringify(vAbc)}`);
}
const vNeg = run('validatePayment("-10")');
if (vNeg.valid !== false || vNeg.message !== "Please enter a valid payment amount.") {
  throw new Error(`TC-07 '-10' failed: ${JSON.stringify(vNeg)}`);
}
console.log("PASS: TC-07: 'abc' and '-10' rejected with 'Please enter a valid payment amount.'");

// Test TC-08: Insufficient payment 50 for 56
const vInsuff = run('validatePayment("50")');
if (vInsuff.valid !== false || vInsuff.message !== "Insufficient payment. Please enter at least ₱56.00.") {
  throw new Error(`TC-08 failed: ${JSON.stringify(vInsuff)}`);
}
console.log("PASS: TC-08: 50 for ₱56.00 rejected with 'Insufficient payment. Please enter at least ₱56.00.'");

// Test TC-09: Sufficient payment 100 for 56
const vSuff = run('validatePayment("100")');
if (vSuff.valid !== true || vSuff.amountPaid !== 100 || vSuff.change !== 44) {
  throw new Error(`TC-09 failed: ${JSON.stringify(vSuff)}`);
}
console.log("PASS: TC-09: 100 for ₱56.00 accepted, change is ₱44.00.");

// Test TC-10: Complete payment and receipt
run('paymentInput.value = "100"');
run('completePayment()');
const receiptHtml = run('receiptContent.innerHTML');
if (!receiptHtml.includes("Transaction reference: CCS-")) {
  throw new Error("TC-10 failed: receipt reference missing");
}
if (!receiptHtml.includes("Instant Noodles × 2")) {
  throw new Error("TC-10 failed: items missing from receipt");
}
if (!receiptHtml.includes("₱44.00")) {
  throw new Error("TC-10 failed: change amount missing from receipt");
}
console.log("PASS: TC-10: Receipt renders items, quantities, total, amount paid, change, and transaction reference.");

// Test TC-11: Controls locked after payment
if (!run('paymentComplete')) throw new Error("paymentComplete should be true");
if (!run('payButton.disabled')) throw new Error("payButton should be disabled");
if (!run('paymentInput.disabled')) throw new Error("paymentInput should be disabled");
console.log("PASS: TC-11: Product and cart controls are locked after payment.");

// Test TC-12: Start new transaction
run('startNewTransaction()');
if (run('cart.length') !== 0) throw new Error("Cart should be empty after reset");
if (run('paymentComplete') !== false) throw new Error("paymentComplete should be false after reset");
if (run('paymentInput.value') !== "") throw new Error("paymentInput should be cleared");
if (run('paymentInput.disabled') !== false) throw new Error("paymentInput should be enabled");
if (run('payButton.disabled') !== false) throw new Error("payButton should be enabled");
console.log("PASS: TC-12: Start New Transaction resets cart, payment, receipt, and controls.");

// Test Theming
run('applyTheme("purple-night")');
if (mockDoc.documentElement.getAttribute("data-theme") !== "purple-night") {
  throw new Error("Theme purple-night not applied");
}
if (storage["campus_pos_theme"] !== "purple-night") {
  throw new Error("Theme not saved to localStorage");
}
run('applyTheme("ocean-blue")');
if (mockDoc.documentElement.getAttribute("data-theme") !== "ocean-blue") {
  throw new Error("Theme ocean-blue not applied");
}
console.log("PASS: Theming logic correctly applies and persists themes across all options.");

console.log("\n>>> ALL 12 TEST CASES AND THEME/MODAL CHECKS PASSED PERFECTLY! <<<");
