# Manual Test Cases

Use this document while testing `index.html` in a desktop browser. Mark the Actual Result and Status only after performing each test yourself.

## Core POS Workflows

| ID | Test steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Open the application. | All six products show their correct Philippine-peso prices. |  | Pending |
| TC-02 | Add Instant Noodles twice and Bottled Water once. | Cart shows quantities 2 and 1; total is ₱56.00. |  | Pending |
| TC-03 | Increase and decrease an item. | Quantity, subtotal, and total update immediately. |  | Pending |
| TC-04 | Decrease an item with quantity 1. | The item is removed from the cart. |  | Pending |
| TC-05 | Click Remove on a cart item. | The selected item disappears and the total recalculates. |  | Pending |
| TC-06 | With items in the cart, submit an empty payment. | A clear valid-payment message appears. |  | Pending |
| TC-07 | Submit `abc` and then `-10`. | Both entries are rejected with a clear valid-payment message. |  | Pending |
| TC-08 | Build a ₱56.00 order and submit `50`. | The application reports insufficient payment and shows at least ₱56.00. |  | Pending |
| TC-09 | Submit `100` for a ₱56.00 order. | Payment succeeds and change is ₱44.00. |  | Pending |
| TC-10 | Review the successful receipt. | It includes items, quantities, subtotals, total, paid amount, change, and a transaction reference. |  | Pending |
| TC-11 | After payment, try product and cart controls. | Controls are locked, preserving the completed receipt. |  | Pending |
| TC-12 | Click Start New Transaction. | Cart, payment input, receipt, feedback, and controls reset for the next customer. |  | Pending |

## Modernized UI, Animations, Modals & Theme Selection

| ID | Test steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- |
| TC-13 | Select **Dark Mode** from the header theme dropdown. | Backgrounds, cards, text, inputs, and buttons switch immediately to the dark obsidian palette. |  | Pending |
| TC-14 | Switch across **Ocean Blue**, **Forest Green**, **Warm Amber**, and **Purple Night**. | Each theme updates the entire POS interface with its respective centralized CSS variables without resetting active cart data. |  | Pending |
| TC-15 | Refresh the browser page (`F5`) after selecting a theme. | The previously selected color scheme is automatically restored from `localStorage`. |  | Pending |
| TC-16 | Click the **Palette** button in the header. | The Theme Gallery modal opens centered with backdrop blur, displaying 6 theme cards with color swatches and active indicator. |  | Pending |
| TC-17 | With the modal open, press `Escape` or click outside on the backdrop. | The modal closes smoothly and returns keyboard focus to the triggering button. |  | Pending |
| TC-18 | Add items to cart, then click the **Clear** button in the Shopping Cart header. | A confirmation modal appears asking to clear items. Confirming empties the cart; cancelling keeps the items. |  | Pending |
| TC-19 | Hover, click, and Tab across buttons (`Add to Cart`, quantity `+`/`−`, `Confirm Payment`). | Buttons exhibit subtle lift on hover, slight compression on click/press, and a visible outline ring on focus. |  | Pending |
| TC-20 | Click **Add to Cart** on multiple items. | Cart item smoothly slides into place, and the total amount due pulses with an animation. |  | Pending |
| TC-21 | Click a **Quick Tender** chip (e.g. `₱100` or `Exact`). | The payment input is instantly populated with the formatted amount and focused. |  | Pending |
| TC-22 | Submit a valid payment amount. | Payment feedback appears with success styling, transaction badge updates to "Payment complete", and receipt displays as an accessible modal popup as well as in the sidebar with a "View in Modal" button. |  | Pending |
| TC-23 | Add 3 or more products to the cart. | Cart content stays at a fixed height of 250px with smooth internal scrolling, without expanding or pushing the payment section. |  | Pending |
| TC-24 | Enable "prefers-reduced-motion" in browser/OS settings. | Animations and transitions are minimized/disabled, preserving instant functional navigation. |  | Pending |

## Automated checks already completed

- JavaScript syntax check passed (`node -c app.js`).
- Git whitespace and file integrity verified.
- Behavioral checks passed for cart operations, payment validation, change calculation, receipt generation, and transaction reset (`node scratch/test-runner.js`).
- Centralized CSS variable validation and 6-theme mapping checks passed.
- Accessibility checks passed for ARIA dialog, live regions, labels, and reduced-motion media queries.

These checks do not replace the browser-based manual tests above or the required screenshots.
