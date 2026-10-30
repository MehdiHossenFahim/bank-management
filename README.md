# NovaTrust Bank - Bank Management System

A modern, responsive, and feature-rich Bank Management System built with React 18, Vite, and React Router DOM. This application simulates core banking operations including account balance inquiry, instant money deposits, secured fund withdrawals with overdraft protection, and an interactive transaction audit trail.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
  - [Core Requirements (Tasks 1-6)](#core-requirements-tasks-1-6)
  - [Bonus Tasks Implemented](#bonus-tasks-implemented)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Getting Started and Installation](#getting-started-and-installation)
- [GitHub Repository and Deployment](#github-repository-and-deployment)
- [Component Architecture and Hooks](#component-architecture-and-hooks)
- [Author](#author)
- [License](#license)

---

## Project Overview
NovaTrust Bank Management System allows users to:
1. View overall account details and real-time financial metrics on a dedicated Dashboard.
2. Deposit funds with instant balance updating, input validation, and quick-preset buttons.
3. Withdraw funds with real-time balance safeguards, overdraft prevention, and authorization confirmation.
4. Review an itemized Transaction History complete with type indicators, timestamps, balance snapshots, and filters.
5. Persist all balances and transaction activities across browser refreshes via localStorage.

> Note: This is a simulated frontend-only banking practice project. No real bank accounts or financial transfers occur.

---

## Key Features

### Core Requirements (Tasks 1-6)

#### Task 1: Dashboard
- Bank Identity: Displays bank name (*NovaTrust Bank*) and application title (*Bank Management System*).
- Account Holder Information: Name (*Sarah Jenkins*), account number (`NTB-8842-9103`), routing number, branch, and active verification status.
- Financial Metric Cards:
  - Current Account Balance (with live indicator)
  - Total Lifetime Deposited
  - Total Lifetime Withdrawn
  - Net Cash Position and Activity Count
- Recent Activity Preview: Displays the latest transactions with quick navigation to the complete ledger.

#### Task 2: Deposit Money (`/deposit`)
- Deposit form with amount input, optional transaction note/memo, and a submit button.
- Manages state via `useState` and handles submission using `onSubmit`.
- Validation:
  - Blocks empty values.
  - Blocks zero or negative values (`<= 0`).
- Immediate Balance Update: The account balance updates instantly upon successful deposit.
- Success Feedback: Displays a detailed success alert with the deposited sum and the newly calculated balance.
- Quick Preset Amounts: Fast one-click buttons (`+$50`, `+$100`, `+$250`, `+$500`, `+$1000`).

#### Task 3: Withdraw Money (`/withdraw`)
- Withdrawal form with real-time balance comparison.
- Safeguards and Validation:
  - Prevents withdrawals greater than available account balance (overdraft protection).
  - Blocks zero, negative, or non-numeric inputs.
  - Displays dynamic contextual warnings when the entered amount exceeds available funds.
- Immediate Balance Update: Deducts funds and updates the ledger synchronously upon confirmation.
- Success and Error Messaging: Distinct alert banners for successful payouts or rejection errors.

#### Task 4: Transaction History (`/transactions`)
- Itemized statement displaying:
  - Transaction type (*Deposit* vs *Withdrawal*)
  - Formatted amount (`+$X.XX` in emerald vs `-$X.XX` in rose)
  - Date and time formatted in standard human-readable format
  - Note / Purpose description
  - Resulting balance after each operation
- Iterated with `.map()` from context state.
- Conditional Rendering: If no transactions exist, displays a clean empty state with an icon and guidance.
- Interactive Controls: Filter by *All*, *Deposits*, or *Withdrawals*, plus instant text search across notes and amounts.

#### Task 5: Navigation
- Persistent, responsive navigation bar using React Router DOM (`NavLink`).
- Seamless page switching without page reloads:
  - `/` - Dashboard
  - `/deposit` - Deposit
  - `/withdraw` - Withdraw
  - `/transactions` - Transaction History
- Active link styling and visual indicators.
- Mobile drawer navigation for responsive mobile viewports.
- Live balance badge directly in the header for quick reference across all pages.

#### Task 6: Reusable Components
- `Navbar.jsx`: Brand identity, desktop links, mobile navigation drawer, and live balance widget.
- `BalanceCard.jsx`: Metric display card supporting multiple variants (`balance`, `deposit`, `withdrawal`, `neutral`) with badges and icons.
- `DepositForm.jsx`: Self-contained deposit form with input validation and quick amount presets.
- `WithdrawForm.jsx`: Self-contained withdrawal form with overdraft checks and confirmation triggers.
- `TransactionList.jsx`: List container supporting filters, search, and conditional empty-state rendering.
- `TransactionItem.jsx`: Individual transaction item with type pills, amounts, and post-transaction balances.
- `ConfirmationModal.jsx`: Pre-transaction review dialog.

---

### Bonus Tasks Implemented

- **`useRef` Input Auto-Focus:** Both `DepositForm` and `WithdrawForm` utilize `useRef` to automatically focus the amount input on component mount and immediately after every successful transaction.
- **Context API State Sharing:** `BankContext.jsx` centrally provides account data, balance, transaction history, and mutation methods across all pages and components without prop drilling.
- **`localStorage` Persistence:** Account balance and transaction history are automatically saved in `localStorage`, maintaining state even after page reloads or closing the browser.
- **Pre-Withdrawal Confirmation Modal:** An interactive authorization modal appears before executing any withdrawal, displaying the requested sum, current balance, and remaining balance.
- **Testing / Demo Tools:** Includes convenient buttons to **Reset Sample Data** or **Clear Transactions** to easily test and evaluate the conditional empty state rendering.

---

## Folder Structure

```text
bank-management/
├── src/
│   ├── components/
│   │   ├── BalanceCard.jsx         # Reusable financial metric card
│   │   ├── ConfirmationModal.jsx   # Pre-withdrawal confirmation modal (Bonus)
│   │   ├── DepositForm.jsx         # Reusable deposit form with validation
│   │   ├── Navbar.jsx              # Responsive navigation with live balance
│   │   ├── TransactionItem.jsx     # Individual styled transaction row
│   │   ├── TransactionList.jsx     # Transaction container with filter & empty state
│   │   └── WithdrawForm.jsx        # Reusable withdrawal form with balance check
│   ├── context/
│   │   └── BankContext.jsx         # Centralized state & localStorage sync (Bonus)
│   ├── pages/
│   │   ├── Dashboard.jsx           # Task 1: Complete account dashboard
│   │   ├── Deposit.jsx             # Task 2: Deposit page & inbound activity
│   │   ├── Withdraw.jsx            # Task 3: Withdrawal page & outbound activity
│   │   └── Transactions.jsx        # Task 4: Complete transaction statement & search
│   ├── App.jsx                     # Route definitions & app layout shell
│   ├── index.css                   # Responsive, modern fintech CSS styles
│   └── main.jsx                    # Application entry point
├── index.html                      # HTML template with Google Fonts
├── package.json                    # Project metadata & dependencies
├── vite.config.js                  # Vite configuration
└── README.md                       # Documentation & setup guide
```

---

## Tech Stack

- Framework: [React 18](https://react.dev/)
- Build Tool: [Vite 6](https://vitejs.dev/)
- Routing: [React Router DOM v6](https://reactrouter.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Styling: Custom Vanilla CSS with CSS Variables and Responsive Flexbox/Grid
- State Persistence: Browser `localStorage` API

---

## Getting Started and Installation

### Prerequisites
Make sure you have Node.js (v16 or higher) and npm installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/MehdiHossenFahim/bank-management.git
cd bank-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## GitHub Repository and Deployment

Repository URL:
`https://github.com/MehdiHossenFahim/bank-management`

Git Remote and Branch Configuration:
```bash
git remote add origin https://github.com/MehdiHossenFahim/bank-management.git
git branch -M main
git push -u origin main
```

---

## Component Architecture and Hooks

| Component / File | Hooks Used | Primary Purpose |
| :--- | :--- | :--- |
| `BankContext.jsx` | `useState`, `useEffect`, `useMemo`, `useContext` | Centralized ledger, balance persistence in `localStorage`, transaction dispatcher |
| `Dashboard.jsx` | `useBank` | Orchestrates metric cards, user profile, and recent activities |
| `DepositForm.jsx` | `useState`, `useRef`, `useEffect` | Validates deposit input, auto-focuses via `useRef`, provides success feedback |
| `WithdrawForm.jsx` | `useState`, `useRef`, `useEffect` | Guards against overdrafts, opens confirmation modal, dispatches withdrawal |
| `ConfirmationModal.jsx` | `useEffect` | Traps keyboard ESC events, provides pre-transaction review |
| `TransactionList.jsx` | `useState` | Handles type filter tabs, text search, and conditional empty-state rendering |
| `Navbar.jsx` | `useState`, `useBank` | NavLink active state, mobile menu toggle, live balance badge |

---

## Author

- **Mehdi Hossen Fahim**
- GitHub: [@MehdiHossenFahim](https://github.com/MehdiHossenFahim)
- Repository: [bank-management](https://github.com/MehdiHossenFahim/bank-management)

---

## License
This project is open-source and available under the MIT License.
