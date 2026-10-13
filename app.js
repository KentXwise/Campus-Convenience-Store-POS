// Stage 1 keeps the product catalogue in one place. Cart behavior is added in Stage 2.
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

// Formats prices consistently for Philippine pesos across the POS interface.
function formatCurrency(amount) {
  return `₱${amount.toFixed(2)}`;
}

// Draws the product cards from the catalogue rather than repeating product HTML.
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <p class="product-category">${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${formatCurrency(product.price)}</p>
          <button class="add-button" type="button" data-product-name="${product.name}">
            Add to Cart
          </button>
        </article>
      `
    )
    .join("");
}

// Provides honest feedback until real cart behavior is introduced in Stage 2.
productList.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;

  appMessage.textContent = `${button.dataset.productName} is ready to be added when cart controls are implemented in Stage 2.`;
});

renderProducts();
