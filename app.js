// The hard-coded catalogue keeps the project in scope for the practical examination.
const products = [
  { id: "instant-noodles", name: "Instant Noodles", price: 18, category: "Snack" },
  { id: "potato-chips", name: "Potato Chips", price: 25, category: "Snack" },
  { id: "soft-drink", name: "Soft Drink (Can)", price: 25, category: "Beverage" },
  { id: "bottled-water", name: "Bottled Water", price: 20, category: "Beverage" },
  { id: "ballpen", name: "Ballpen (piece)", price: 12, category: "School supply" },
  { id: "notebook", name: "Notebook (piece)", price: 35, category: "School supply" },
];

const productList = document.querySelector("#product-list");
const appMessage = document.querySelector("#app-message");
const cartContent = document.querySelector("#cart-content");
const cartTotal = document.querySelector("#cart-total");
const cart = [];

// Formats prices consistently for Philippine pesos across the POS interface.
function formatCurrency(amount) {
  return `₱${amount.toFixed(2)}`;
}

// Draws product cards from the catalogue rather than repeating product HTML.
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <p class="product-category">${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${formatCurrency(product.price)}</p>
          <button class="add-button" type="button" data-product-id="${product.id}" data-product-name="${product.name}">
            Add to Cart
          </button>
        </article>
      `
    )
    .join("");
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
                    <button class="quantity-button" type="button" data-action="decrease" data-product-id="${item.id}" aria-label="Decrease ${item.name} quantity">−</button>
                    <span class="quantity-value" aria-label="${item.quantity} items">${item.quantity}</span>
                    <button class="quantity-button" type="button" data-action="increase" data-product-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
                  </div>
                  <button class="remove-button" type="button" data-action="remove" data-product-id="${item.id}">Remove</button>
                </div>
              </article>`;
          })
          .join("")}
      </div>`;
  }

  cartTotal.textContent = formatCurrency(calculateTotal());
}

productList.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;

  addToCart(button.dataset.productId);
  renderCart();
  appMessage.textContent = `${button.dataset.productName} was added to the cart.`;
});

// One handler supports all quantity and removal buttons created during cart rendering.
cartContent.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

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

renderProducts();
renderCart();
