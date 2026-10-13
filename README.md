# Campus Convenience Store POS

A desktop-friendly Point-of-Sale application for the IT 415 practical examination.

## Stage 2 status

Stage 2 adds an in-memory shopping cart. Users can add products, change quantities, remove products, and see item subtotals plus the total amount due update immediately. Payment handling and receipts will be implemented in Stage 3.

## Run the application

Open `index.html` in a modern desktop browser. No installation, database, or server is required.

## Project files

- `index.html` - application layout and accessible page structure
- `styles.css` - desktop-oriented visual design and responsive layout
- `app.js` - product catalogue, cart state, quantity controls, and total calculations

## Stage 2 manual checks

1. Open `index.html` in a browser.
2. Confirm all six products show the correct names and prices.
3. Confirm each product displays an **Add to Cart** button.
4. Confirm Cart, Payment, and Receipt are visually separate.
5. Add the same product twice and confirm its quantity becomes 2 and its subtotal doubles.
6. Add a second product and confirm the overall total equals both subtotals.
7. Use the + and − controls and confirm totals update correctly.
8. Decrease an item to zero and confirm it is removed from the cart.
9. Use Remove and confirm the item disappears and the total updates.

