# Campus Convenience Store POS

A modern, desktop-friendly Point-of-Sale application for the IT 415 practical examination.

## System Overview

The POS application provides an end-to-end retail cashier interface built for desktop and laptop environments. It preserves all required core business logic while offering a modernized design system, smooth micro-animations, an accessible modal dialog system, and selectable color schemes with session persistence.

## Features & Enhancements

- **Product Catalogue**: Six fixed scenario products with authentic Philippine-peso pricing (`₱`) and distinct category badges.
- **Stable Fixed-Height Shopping Cart**: Fixed 250px container with smooth internal vertical scrolling that prevents the cart panel from expanding or resizing as snacks are added.
- **Payment Validation & Cash Tender**: Rigorous validation rejecting blank, non-numeric, negative, and insufficient payments with exact feedback messages.
- **Quick Cash Tender Chips**: Fast-access tender buttons (`Exact`, `₱50`, `₱100`, `₱200`, `₱500`) to accelerate desktop cashier input.
- **Digital Receipt Modal & Slip**: Full itemized receipt pops up automatically as an accessible modal upon payment completion, complete with breakdown, total, change, reference (`CCS-XXXXXX`), and direct **Start New Transaction** action (with a **View in Modal** button in the sidebar).
- **Transaction Locking & Clean Reset**: Controls lock immediately upon payment completion; clicking **Start New Transaction** (in modal or sidebar) resets cart, inputs, receipt, and controls.
- **Centralized Multi-Theme Engine**: Six custom color schemes built with centralized CSS variables, persisted across browser reloads via `localStorage`.
- **Accessible Modal Dialog System**: Centered, balanced dialogs with backdrop blur, focus trapping, Escape key closing, and click-outside dismissal.
- **Subtle Micro-Animations**: Smooth panel entrances, tactile button states (`:hover`, `:active`, `:focus-visible`), total bounce pulse, receipt unfold effect, and full `@media (prefers-reduced-motion: reduce)` support.

---

## Instructions for Using the Color-Scheme Selector

Cashiers can switch between six tailored color schemes at any time without resetting or interrupting an active order:

### 1. Using the Header Dropdown
1. Locate the **Color Scheme** dropdown in the top right of the application header (next to the transaction status badge).
2. Click the dropdown menu and select any of the six themes:
   - **Light Mode**: High-contrast daylight campus store palette.
   - **Dark Mode**: Low-glare obsidian theme for evening and low-light cashier shifts.
   - **Ocean Blue**: Marine teal and sky azure accents for a fresh maritime feel.
   - **Forest Green**: Eco botanical emerald and mint tones.
   - **Warm Amber**: Cozy coffeehouse amber and honey cream tones.
   - **Purple Night**: High-tech midnight violet and neon purple theme.
3. The interface updates instantly across all backgrounds, cards, inputs, borders, badges, buttons, modals, and receipts. The selection is automatically saved in browser storage.

### 2. Using the Theme Palette Modal
1. Click the **Palette** button next to the theme dropdown.
2. An accessible modal dialog opens displaying visual theme preview cards with color swatch circles and descriptive text.
3. Click any theme card to preview and apply it immediately. The currently active theme displays an **Active** badge.
4. Press **Close** (or click outside the dialog / press `Esc`) to return to the POS workspace.

---

## How to Run the Application

1. Open `index.html` in any modern desktop web browser (Chrome, Edge, Firefox, Safari).
2. No web server, database, node installation, or external dependencies are required.

---

## Project Files

- `index.html` - Semantic layout, accessible modal structure, quick-tender controls, and theme picker.
- `styles.css` - Centralized CSS variables for 6 themes, responsive desktop grid, accessible micro-animations, and modal design system.
- `app.js` - Product catalogue, in-memory cart state, payment validation, receipt generation, transaction reset, modal controller, and theme engine.
- `MANUAL-TEST-CASES.md` - Complete verification record covering core POS workflows, animations, modals, and themes.
- `AI-DEVELOPMENT-DOCUMENTATION.md` - Honest draft records for genuine AI-assisted development.
- `SUBMISSION-CHECKLIST.md` - Application, evidence, Git, and final declaration checklist.

---

## Run and Verify

1. Open `index.html` in a desktop browser.
2. Confirm all six products show their correct names, category badges, and Philippine-peso prices.
3. Confirm each product card displays an **Add to Cart** button.
4. Confirm Products, Shopping Cart, Payment, and Receipt sections are visually balanced and distinct.
5. Add two Instant Noodles and one Bottled Water. Confirm the total is **₱56.00**.
6. Switch themes using the header dropdown or the **Palette** modal; confirm theme colors apply cleanly without resetting the cart.
7. Click **Confirm Payment** with an empty amount. Confirm: `"Please enter a valid payment amount."`
8. Enter `abc` and `-10`. Confirm both entries are rejected with: `"Please enter a valid payment amount."`
9. Enter `50` for the ₱56.00 order. Confirm: `"Insufficient payment. Please enter at least ₱56.00."`
10. Enter `100` (or click the **₱100** Quick Tender button). Click **Confirm Payment**.
11. Confirm payment succeeds, change is **₱44.00**, and the digital receipt pops up automatically as an accessible modal dialog with item breakdown, totals, change, and transaction reference `CCS-XXXXXX` (with a **View in Modal** button in the sidebar).
12. Confirm product, cart, and payment controls are locked while reviewing the receipt.
13. Click **Start New Transaction**. Confirm cart, payment input, receipt, status badge, and controls reset for the next customer.
