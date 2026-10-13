# Manual Test Cases

Use this document while testing `index.html` in a desktop browser. Mark the Actual Result and Status only after performing each test yourself.

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

## Automated checks already completed

- JavaScript syntax check passed.
- Git whitespace check passed.
- Behavioral checks passed for cart changes, payment validation, receipt creation, change calculation, and transaction reset.

These checks do not replace the browser-based manual tests above or the required screenshots.
