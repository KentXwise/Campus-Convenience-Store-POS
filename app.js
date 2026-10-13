/**
 * Campus Convenience Store POS - Application Logic
 * Desktop-friendly Point-of-Sale System with Theme Selector & Modal System
 */

// Hard-coded catalogue preserving the scenario requirements and Philippine-peso prices.
const products = [
  { id: "instant-noodles", name: "Instant Noodles", price: 18, category: "Snack", icon: "🍜" },
  { id: "potato-chips", name: "Potato Chips", price: 25, category: "Snack", icon: "🥔" },
  { id: "soft-drink", name: "Soft Drink (Can)", price: 25, category: "Beverage", icon: "🥤" },
  { id: "bottled-water", name: "Bottled Water", price: 20, category: "Beverage", icon: "💧" },
  { id: "ballpen", name: "Ballpen (piece)", price: 12, category: "School supply", icon: "🖊️" },
  { id: "notebook", name: "Notebook (piece)", price: 35, category: "School supply", icon: "📓" },
];

// Core POS DOM elements
const productList = document.querySelector("#product-list");
const appMessage = document.querySelector("#app-message");
const cartContent = document.querySelector("#cart-content");
const cartTotal = document.querySelector("#cart-total");
const paymentInput = document.querySelector("#payment-input");
const payButton = document.querySelector("#pay-button");
const paymentFeedback = document.querySelector("#payment-feedback");
const receiptContent = document.querySelector("#receipt-content");

// Header and status elements
const themeSelect = document.querySelector("#theme-select");
const themeModalBtn = document.querySelector("#theme-modal-btn");
const transactionStatusBadge = document.querySelector("#transaction-status-badge");
const transactionBadgeText = document.querySelector("#transaction-badge-text");
const clearCartBtn = document.querySelector("#clear-cart-btn");
const tenderChips = document.querySelectorAll(".tender-chip");

// Modal dialog system elements
const modalBackdrop = document.querySelector("#pos-modal-backdrop");
const modalDialog = document.querySelector("#pos-modal");
const modalTitle = document.querySelector("#modal-title");
const modalIcon = document.querySelector("#modal-icon");
const modalBody = document.querySelector("#modal-body");
const modalFooter = document.querySelector("#modal-footer");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const modalCancelBtn = document.querySelector("#modal-cancel-btn");
const modalConfirmBtn = document.querySelector("#modal-confirm-btn");

// Transaction & Cart State
const cart = [];
let paymentComplete = false;

/* ==========================================================================
   1. Theme Management Logic
   Multi-theme engine with local persistence and CSS variables mapping
   ========================================================================== */

const THEMES = [
  {
    id: "light",
    name: "Light Mode",
    desc: "Classic high-contrast daylight campus store styling.",
    colors: ["#f4f7fa", "#ffffff", "#1d5f91", "#15803d"]
  },
  {
    id: "dark",
    name: "Dark Mode",
    desc: "Low-glare obsidian palette for evening shifts.",
    colors: ["#0b0f19", "#182235", "#38bdf8", "#34d399"]
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    desc: "Refreshing marine teal and sky azure accents.",
    colors: ["#edf5fa", "#ffffff", "#0284c7", "#0d9488"]
  },
  {
    id: "forest-green",
    name: "Forest Green",
    desc: "Eco botanical emerald and natural mint tones.",
    colors: ["#f0f7f2", "#ffffff", "#15803d", "#16a34a"]
  },
  {
    id: "warm-amber",
    name: "Warm Amber",
    desc: "Cozy coffeehouse amber, honey, and warm cream.",
    colors: ["#fbf7f0", "#ffffff", "#d97706", "#15803d"]
  },
  {
    id: "purple-night",
    name: "Purple Night",
    desc: "Deep twilight purple with electric neon violet.",
    colors: ["#100c1e", "#231b3d", "#a855f7", "#34d399"]
  }
];

const THEME_STORAGE_KEY = "campus_pos_theme";

/**
 * Applies a theme by setting the data-theme attribute on documentElement,
 * synchronizing the select dropdown, and persisting the choice.
 */
function applyTheme(themeId) {
  const selected = THEMES.find((t) => t.id === themeId) ? themeId : "light";
  document.documentElement.setAttribute("data-theme", selected);

  if (themeSelect) {
    themeSelect.value = selected;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, selected);
  } catch (err) {
    // Gracefully handle environments with restricted storage
  }

  // If theme modal is open, update active card highlight
  updateThemeGalleryActiveCard(selected);
}

/**
 * Initializes the theme from localStorage or defaults to Light mode.
 */
function initTheme() {
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
  } catch (err) {
    savedTheme = "light";
  }
  applyTheme(savedTheme);
}

/* ==========================================================================
   2. Consistent Modal Design System
   Centered container, backdrop overlay, focus trapping, Esc key handling
   ========================================================================== */

let currentModalConfirmHandler = null;
let lastFocusedElement = null;

/**
 * Opens a modal dialog with custom title, icon, HTML content, and actions.
 */
function openModal({
  title = "Notice",
  icon = "ℹ️",
  content = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  showConfirm = true,
  showCancel = true,
  onConfirm = null
}) {
  if (!modalBackdrop || !modalDialog) return;

  // Remember current focused element to restore on close
  lastFocusedElement = document.activeElement;

  modalTitle.textContent = title;
  modalIcon.textContent = icon;
  modalBody.innerHTML = content;

  modalConfirmBtn.textContent = confirmText;
  modalConfirmBtn.style.display = showConfirm ? "inline-block" : "none";

  modalCancelBtn.textContent = cancelText;
  modalCancelBtn.style.display = showCancel ? "inline-block" : "none";

  currentModalConfirmHandler = onConfirm;

  // Show modal and update ARIA states
  modalBackdrop.removeAttribute("hidden");
  modalBackdrop.setAttribute("aria-hidden", "false");

  // Move focus into the modal for keyboard accessibility
  setTimeout(() => {
    modalDialog.focus();
  }, 50);
}

/**
 * Closes the currently active modal dialog and restores keyboard focus.
 */
function closeModal() {
  if (!modalBackdrop) return;

  modalBackdrop.setAttribute("hidden", "");
  modalBackdrop.setAttribute("aria-hidden", "true");
  currentModalConfirmHandler = null;

  // Restore keyboard focus to the triggering element
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

/**
 * Opens the interactive Color Scheme Gallery Modal.
 */
function openThemeGalleryModal() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

  const galleryHtml = `
    <p style="margin-top: 0; margin-bottom: 14px; font-size: 0.92rem; color: var(--text-muted);">
      Choose a color scheme to instantly personalize the POS cashier interface:
    </p>
    <div class="theme-gallery-grid" role="radiogroup" aria-label="Available themes">
      ${THEMES.map(
        (t) => `
          <button type="button" class="theme-card ${t.id === currentTheme ? "active" : ""}" data-theme-id="${t.id}" role="radio" aria-checked="${t.id === currentTheme}">
            <div class="theme-card-top">
              <span class="theme-card-name">${t.name}</span>
              ${t.id === currentTheme ? '<span class="theme-card-badge">Active</span>' : ""}
            </div>
            <div class="theme-swatches" aria-hidden="true">
              ${t.colors.map((c) => `<span class="theme-swatch-dot" style="background-color: ${c};"></span>`).join("")}
            </div>
            <p class="theme-card-desc">${t.desc}</p>
          </button>
        `
      ).join("")}
    </div>
  `;

  openModal({
    title: "Color Scheme Selection",
    icon: "🎨",
    content: galleryHtml,
    cancelText: "Close",
    showConfirm: false,
    showCancel: true
  });
}

function updateThemeGalleryActiveCard(selectedThemeId) {
  const cards = document.querySelectorAll(".theme-card");
  cards.forEach((card) => {
    const isCurrent = card.dataset.themeId === selectedThemeId;
    card.classList.toggle("active", isCurrent);
    card.setAttribute("aria-checked", isCurrent ? "true" : "false");
    const badge = card.querySelector(".theme-card-badge");
    if (isCurrent && !badge) {
      const top = card.querySelector(".theme-card-top");
      if (top) {
        const span = document.createElement("span");
        span.className = "theme-card-badge";
        span.textContent = "Active";
        top.appendChild(span);
      }
    } else if (!isCurrent && badge) {
      badge.remove();
    }
  });
}

// Modal Event Listeners
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

if (modalCancelBtn) {
  modalCancelBtn.addEventListener("click", closeModal);
}

if (modalConfirmBtn) {
  modalConfirmBtn.addEventListener("click", () => {
    if (typeof currentModalConfirmHandler === "function") {
      currentModalConfirmHandler();
    }
    closeModal();
  });
}

// Close when clicking outside the modal dialog (on the backdrop overlay)
if (modalBackdrop) {
  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });
}

// Keyboard handling: Escape to close & focus trapping within dialog
document.addEventListener("keydown", (event) => {
  if (modalBackdrop && !modalBackdrop.hasAttribute("hidden")) {
    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "Tab") {
      const focusableElements = modalDialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }
});

// Modal Theme Gallery click delegation
if (modalBody) {
  modalBody.addEventListener("click", (event) => {
    const card = event.target.closest(".theme-card");
    if (!card) return;
    const themeId = card.dataset.themeId;
    if (themeId) {
      applyTheme(themeId);
    }
  });
}

// Header theme control listeners
if (themeSelect) {
  themeSelect.addEventListener("change", (event) => {
    applyTheme(event.target.value);
  });
}

if (themeModalBtn) {
  themeModalBtn.addEventListener("click", openThemeGalleryModal);
}

/* ==========================================================================
   3. Core POS Functions (Preserved & Enhanced)
   ========================================================================== */

// Formats prices consistently for Philippine pesos across the POS interface.
function formatCurrency(amount) {
  return `₱${amount.toFixed(2)}`;
}

// Draws product cards from the catalogue with accessible tags and responsive layout.
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-card-header">
            <span class="product-icon" aria-hidden="true">${product.icon || "📦"}</span>
            <span class="product-category">${product.category}</span>
          </div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price-row">
            <p class="product-price">${formatCurrency(product.price)}</p>
          </div>
          <button class="add-button" type="button" data-product-id="${product.id}" data-product-name="${product.name}" ${paymentComplete ? "disabled" : ""}>
            <span class="btn-icon" aria-hidden="true">+</span> Add to Cart
          </button>
        </article>
      `
    )
    .join("");
}

// Updates transaction status badge text and visual indicator
function updateStatusBadge() {
  if (!transactionStatusBadge || !transactionBadgeText) return;

  if (paymentComplete) {
    transactionBadgeText.textContent = "Payment complete";
    transactionStatusBadge.className = "transaction-badge";
  } else if (cart.length > 0) {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    transactionBadgeText.textContent = `Order in progress (${totalCount} ${totalCount === 1 ? "item" : "items"})`;
    transactionStatusBadge.className = "transaction-badge active-order";
  } else {
    transactionBadgeText.textContent = "New transaction";
    transactionStatusBadge.className = "transaction-badge";
  }
}

// Adds an existing item by increasing its quantity; otherwise it starts at one.
function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    cart.push({ ...product, quantity: 1 });
  }
}

// Changes quantity and removes an item if its quantity reaches zero.
function updateQuantity(productId, change) {
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) removeFromCart(productId);
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId);
  if (itemIndex !== -1) cart.splice(itemIndex, 1);
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Re-renders item subtotals and the order total after every cart change.
function renderCart() {
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon" aria-hidden="true">🛒</span>
        <p>Your cart is empty.</p>
        <small>Add a product to begin the order.</small>
      </div>`;
    if (clearCartBtn) clearCartBtn.style.display = "none";
  } else {
    cartContent.innerHTML = `
      <div class="cart-items">
        ${cart
          .map((item) => {
            const subtotal = item.price * item.quantity;
            return `
              <article class="cart-item">
                <div class="cart-item-top">
                  <p class="cart-item-name">${item.name}</p>
                  <span class="cart-item-subtotal">${formatCurrency(subtotal)}</span>
                </div>
                <div class="cart-item-bottom">
                  <div class="quantity-controls" aria-label="Quantity controls for ${item.name}">
                    <button class="quantity-button" type="button" data-action="decrease" data-product-id="${item.id}" aria-label="Decrease ${item.name} quantity" ${paymentComplete ? "disabled" : ""}>−</button>
                    <span class="quantity-value" aria-label="${item.quantity} items">${item.quantity}</span>
                    <button class="quantity-button" type="button" data-action="increase" data-product-id="${item.id}" aria-label="Increase ${item.name} quantity" ${paymentComplete ? "disabled" : ""}>+</button>
                  </div>
                  <button class="remove-button" type="button" data-action="remove" data-product-id="${item.id}" ${paymentComplete ? "disabled" : ""}>Remove</button>
                </div>
              </article>`;
          })
          .join("")}
      </div>`;
    if (clearCartBtn) {
      clearCartBtn.style.display = paymentComplete ? "none" : "inline-block";
    }
  }

  // Animate total update
  const total = calculateTotal();
  cartTotal.textContent = formatCurrency(total);
  cartTotal.classList.remove("total-bump");
  // Trigger DOM reflow to re-trigger CSS animation
  void cartTotal.offsetWidth;
  cartTotal.classList.add("total-bump");

  // Update quick tender button states
  tenderChips.forEach((chip) => {
    chip.disabled = paymentComplete;
  });

  updateStatusBadge();
}

function setPaymentFeedback(message, isSuccess = false) {
  paymentFeedback.textContent = message;
  paymentFeedback.classList.toggle("success", isSuccess);
}

// Checks every required invalid-payment case before accepting a transaction.
function validatePayment(rawAmount) {
  const normalizedAmount = rawAmount.trim();
  const total = calculateTotal();

  if (cart.length === 0) return { valid: false, message: "Add at least one product before accepting payment." };
  if (!normalizedAmount) return { valid: false, message: "Please enter a valid payment amount." };
  if (!/^\d+(\.\d{1,2})?$/.test(normalizedAmount)) {
    return { valid: false, message: "Please enter a valid payment amount." };
  }

  const amountPaid = Number(normalizedAmount);
  if (amountPaid < 0) return { valid: false, message: "Please enter a valid payment amount." };
  if (amountPaid < total) {
    return { valid: false, message: `Insufficient payment. Please enter at least ${formatCurrency(total)}.` };
  }

  return { valid: true, amountPaid, change: amountPaid - total };
}

function createTransactionReference() {
  return `CCS-${Date.now().toString().slice(-6)}`;
}

// Builds the official receipt markup string
function buildReceiptHtml(amountPaid, change, reference) {
  const itemLines = cart
    .map(
      (item) => `
        <div class="receipt-line">
          <span>${item.name} × ${item.quantity}</span>
          <span>${formatCurrency(item.price * item.quantity)}</span>
        </div>`
    )
    .join("");

  return `
    <div class="receipt-details receipt-slip">
      <div class="receipt-store-header">
        <h3 class="receipt-store-title">Campus Convenience Store</h3>
        <p class="receipt-store-sub">Official Cash Receipt</p>
      </div>
      <div class="receipt-items-list">
        ${itemLines}
      </div>
      <div class="receipt-summary-lines">
        <div class="receipt-line receipt-total"><span>Total amount</span><span>${formatCurrency(calculateTotal())}</span></div>
        <div class="receipt-line"><span>Amount paid</span><span>${formatCurrency(amountPaid)}</span></div>
        <div class="receipt-line"><span>Change</span><span>${formatCurrency(change)}</span></div>
      </div>
      <p class="receipt-reference">Transaction reference: ${reference}</p>
      <div class="receipt-footer-msg">Thank you for your purchase!</div>
    </div>`;
}

// Opens the receipt as a centered, accessible modal dialog
function openReceiptModal(amountPaid, change, reference) {
  const receiptHtml = buildReceiptHtml(amountPaid, change, reference);
  openModal({
    title: "Transaction Receipt",
    icon: "🧾",
    content: receiptHtml,
    confirmText: "Start New Transaction",
    cancelText: "Close Receipt",
    showConfirm: true,
    showCancel: true,
    onConfirm: () => {
      startNewTransaction();
    }
  });
}

// Renders an authentic digital receipt slip with transaction metadata in sidebar and modal
function renderReceipt(amountPaid, change, reference) {
  const receiptHtml = buildReceiptHtml(amountPaid, change, reference);

  receiptContent.innerHTML = `
    ${receiptHtml}
    <div class="receipt-action-group">
      <button id="view-receipt-modal-btn" class="view-receipt-modal-btn" type="button">🧾 View in Modal</button>
      <button id="new-transaction-button" class="new-transaction-button" type="button">Start New Transaction</button>
    </div>`;
}

function completePayment() {
  const result = validatePayment(paymentInput.value);
  if (!result.valid) {
    setPaymentFeedback(result.message);
    return;
  }

  paymentComplete = true;
  paymentInput.disabled = true;
  payButton.disabled = true;
  const reference = createTransactionReference();
  renderProducts();
  renderCart();
  renderReceipt(result.amountPaid, result.change, reference);
  openReceiptModal(result.amountPaid, result.change, reference);
  setPaymentFeedback(`Payment successful. Change: ${formatCurrency(result.change)}.`, true);
  appMessage.textContent = `Payment confirmed. Transaction ${reference} is complete.`;
  updateStatusBadge();
}

function startNewTransaction() {
  closeModal();
  cart.splice(0, cart.length);
  paymentComplete = false;
  paymentInput.value = "";
  paymentInput.disabled = false;
  payButton.disabled = false;
  receiptContent.innerHTML = "<p>A completed receipt will appear here after payment.</p>";
  setPaymentFeedback("");
  renderProducts();
  renderCart();
  appMessage.textContent = "New transaction started. Add products to the cart.";
  updateStatusBadge();
}

/* ==========================================================================
   4. Event Listeners & Interactive Handlers
   ========================================================================= */

// Product List Click Delegation
productList.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button || button.disabled) return;

  addToCart(button.dataset.productId);
  renderCart();
  appMessage.textContent = `${button.dataset.productName} was added to the cart.`;
});

// Cart Controls Click Delegation
cartContent.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || button.disabled) return;

  const { action, productId } = button.dataset;
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  if (action === "increase") {
    updateQuantity(productId, 1);
    appMessage.textContent = `${product.name} quantity increased.`;
  } else if (action === "decrease") {
    updateQuantity(productId, -1);
    appMessage.textContent = `${product.name} quantity decreased.`;
  } else if (action === "remove") {
    removeFromCart(productId);
    appMessage.textContent = `${product.name} was removed from the cart.`;
  }

  renderCart();
});

// Clear Cart Modal Confirmation Trigger
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    if (cart.length === 0 || paymentComplete) return;

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    openModal({
      title: "Clear Current Order",
      icon: "🗑️",
      content: `
        <p style="margin-top: 0; font-size: 0.95rem;">
          Are you sure you want to remove all <strong>${totalCount} item(s)</strong> from the shopping cart?
        </p>
        <p style="margin-bottom: 0; font-size: 0.85rem; color: var(--text-muted);">
          This will reset the current order summary.
        </p>
      `,
      confirmText: "Clear Cart",
      cancelText: "Keep Order",
      showConfirm: true,
      showCancel: true,
      onConfirm: () => {
        cart.splice(0, cart.length);
        renderCart();
        setPaymentFeedback("");
        appMessage.textContent = "Shopping cart was cleared.";
        updateStatusBadge();
      }
    });
  });
}

// Quick Tender Suggestion Chips
tenderChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    if (paymentComplete) return;

    const tenderType = chip.dataset.tender;
    if (tenderType === "exact") {
      const currentTotal = calculateTotal();
      paymentInput.value = currentTotal > 0 ? currentTotal.toFixed(2) : "";
    } else {
      paymentInput.value = Number(tenderType).toFixed(2);
    }

    paymentInput.focus();
    // Clear previous error message if amount is now valid
    if (paymentFeedback.textContent && !paymentFeedback.classList.contains("success")) {
      const validation = validatePayment(paymentInput.value);
      if (validation.valid) {
        setPaymentFeedback("");
      }
    }
  });
});

payButton.addEventListener("click", completePayment);

paymentInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") completePayment();
});

receiptContent.addEventListener("click", (event) => {
  if (event.target.closest("#new-transaction-button")) {
    startNewTransaction();
  } else if (event.target.closest("#view-receipt-modal-btn")) {
    const rawPaid = paymentInput.value.trim();
    const paid = Number(rawPaid) || calculateTotal();
    const change = Math.max(0, paid - calculateTotal());
    const refEl = receiptContent.querySelector(".receipt-reference");
    const ref = refEl ? refEl.textContent.replace("Transaction reference: ", "").trim() : createTransactionReference();
    openReceiptModal(paid, change, ref);
  }
});

// Initialize Theme, Products, and Cart on Load
initTheme();
renderProducts();
renderCart();
updateStatusBadge();
