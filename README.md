# Campus Convenience Store POS

A desktop-friendly Point-of-Sale application for the IT 415 practical examination.

## Stage 4 status

The POS application is functionally complete. Stage 4 adds the documentation and review materials needed to verify the final transaction flow, record genuine AI assistance, and prepare submission evidence.

## Run the application

Open `index.html` in a modern desktop browser. No installation, database, or server is required.

## Project files

- `index.html` - application layout and accessible page structure
- `styles.css` - desktop-oriented visual design and responsive layout
- `app.js` - product catalogue, cart state, payment validation, receipt generation, and transaction reset
- `MANUAL-TEST-CASES.md` - final end-to-end and validation test record
- `AI-DEVELOPMENT-DOCUMENTATION.md` - honest draft records for genuine AI interactions
- `SUBMISSION-CHECKLIST.md` - application, screenshot, GitHub, and documentation evidence checklist

## Run and verify

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

Use `MANUAL-TEST-CASES.md` to record the final results and `SUBMISSION-CHECKLIST.md` before submitting. The AI documentation file is a truthful draft only; complete its evaluation and modification fields using your own review of the code.

