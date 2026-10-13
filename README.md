# Campus Convenience Store POS

A desktop-friendly Point-of-Sale application for the IT 415 practical examination.

## Stage 3 status

Stage 3 completes the checkout flow. The application validates cash payments, calculates change, confirms successful payments, produces a receipt with a transaction reference, and resets safely for a new transaction.

## Run the application

Open `index.html` in a modern desktop browser. No installation, database, or server is required.

## Project files

- `index.html` - application layout and accessible page structure
- `styles.css` - desktop-oriented visual design and responsive layout
- `app.js` - product catalogue, cart state, payment validation, receipt generation, and transaction reset

## Stage 3 manual checks

1. Open `index.html` in a browser.
2. Confirm all six products show the correct names and prices.
3. Confirm each product displays an **Add to Cart** button.
4. Confirm Cart, Payment, and Receipt are visually separate.
5. Add two Instant Noodles and one Bottled Water. Confirm the total is ₱56.00.
6. Click Confirm Payment with an empty amount. Confirm a clear validation message appears.
7. Enter `abc` and then `-10`. Confirm both are rejected with a clear validation message.
8. Enter `50` for the ₱56.00 order. Confirm the insufficient-payment message tells you the minimum required amount.
9. Enter `100`. Confirm payment succeeds, change is ₱44.00, and the receipt shows items, quantities, total, amount paid, change, and a transaction reference.
10. Confirm product and cart controls are locked after a successful payment.
11. Click Start New Transaction. Confirm cart, payment input, receipt, feedback, and controls reset for the next customer.

