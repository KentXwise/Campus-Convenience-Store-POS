# Campus Convenience Store POS Requirements

## Scenario catalogue

Use at least five of these hard-coded products and preserve Philippine-peso prices:

| Product | Price |
| --- | ---: |
| Instant Noodles | ₱18.00 |
| Potato Chips | ₱25.00 |
| Soft Drink (Can) | ₱25.00 |
| Bottled Water | ₱20.00 |
| Ballpen (piece) | ₱12.00 |
| Notebook (piece) | ₱35.00 |

## Required transaction flow

1. Browse products with names and prices.
2. Add one or more products to the cart and adjust quantities.
3. Review items, quantities, subtotals, and total.
4. Enter a cash amount in a numeric input.
5. Validate payment and calculate change.
6. Show payment confirmation.
7. Show a digital receipt and allow a new transaction.

## Required behavior

- On-screen controls add products, increase or decrease quantities, and remove products.
- Item subtotals and overall total update whenever the cart changes.
- Payment validation rejects blank, non-numeric, negative, and insufficient values with a clear on-screen message.
- Valid change equals amount paid minus total amount.
- The receipt lists items, quantities, subtotals, total, amount paid, change, and a transaction reference.
- New transaction clears cart, payment amount, and receipt data.

## Scope boundaries

Use a mouse-and-keyboard-friendly desktop layout. Keep products, cart/order summary, payment, and receipt distinguishable. A database, login, inventory system, deployment, real gateway, QR, and card payment are not required.
