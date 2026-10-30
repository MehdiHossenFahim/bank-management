# NovaTrust Bank - Bank Management System

A simulated retail banking web application built with React 18, Vite, and React Router. The application implements core account operations including real-time ledger management, validated fund deposits, balance-guarded withdrawals, and a persistent transaction history log.

<p align="left">
  <a href="https://bank-management-eight-roan.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Vercel-0070f3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

---

## Table of Contents
- [Architecture and State Management](#architecture-and-state-management)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Component Specifications](#component-specifications)
- [Author](#author)
- [License](#license)

---

## Architecture and State Management

The application is structured around a centralized state layer powered by React Context (`BankContext`) with automated browser persistence (`localStorage` synchronization). Key architectural highlights include:

- **Single Source of Truth:** Centralized account metadata, live balance, and transaction history exposed via a custom `useBank` hook.
- **Predictable State Transitions:** Ledger operations (deposits and withdrawals) perform atomic state updates with balance-after snapshots calculated at the time of transaction execution.
- **Client-Side Guardrails:** Strict validation against overdrafts, non-positive numbers, empty inputs, and race conditions prior to state modification.
- **Form UX and Accessibility:** Input focus management via `useRef`, modal focus trapping, and real-time validation error messaging.

---

## Key Features

### 1. Dashboard
- Displays bank identity, account holder credentials, and routing numbers.
- High-level metric overview using reusable stat cards: Current Balance, Cumulative Inflow, Cumulative Outflow, and Net Cash Position.
- Recent activity feed showing latest transactions with quick navigation to full statement.
- Testing controls to reset mock state or clear transactions for empty-state inspection.

### 2. Deposit Processing (`/deposit`)
- Controlled form handling with input sanitization.
- Immediate balance update upon submission.
- Guardrails preventing zero, negative, or invalid amounts.
- Contextual success alerts detailing credited funds and new balance.
- Preset amount buttons for rapid transaction entry.

### 3. Balance-Guarded Withdrawals (`/withdraw`)
- Overdraft protection: Rejects any transaction exceeding the active account balance.
- Interactive pre-flight confirmation modal providing transaction summary and post-transaction balance calculation before commit.
- Dynamic input error hints displaying maximum allowable withdrawal in real time.

### 4. Transaction Audit Log (`/transactions`)
- Itemized record of all deposits and withdrawals with formatted timestamps, reference memos, and balance-after values.
- Distinct status color schemes for inbound (credit) and outbound (debit) transactions.
- Filter controls by transaction type (All, Deposits, Withdrawals).
- Real-time client-side search across notes, transaction types, and amounts.
- Graceful empty-state rendering when no records match filter criteria.

### 5. Routing and Layout
- Declarative client-side routing via React Router DOM (`NavLink` with active route indication).
- Responsive navigation shell featuring a sticky desktop navbar, mobile drawer menu, and live balance monitor.

---

## Project Structure

```text
bank-management/
├── src/
│   ├── components/
│   │   ├── BalanceCard.jsx         # Metric display component supporting multiple variants
│   │   ├── ConfirmationModal.jsx   # Pre-transaction authorization modal
│   │   ├── DepositForm.jsx         # Controlled deposit form with validation
│   │   ├── Navbar.jsx              # Responsive header with mobile drawer & balance pill
│   │   ├── TransactionItem.jsx     # Individual styled transaction entry
│   │   ├── TransactionList.jsx     # Transaction feed with filtering, search, and empty state
│   │   └── WithdrawForm.jsx        # Controlled withdrawal form with overdraft checks
│   ├── context/
│   │   └── BankContext.jsx         # Centralized state store and storage sync
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main account overview and quick actions
│   │   ├── Deposit.jsx             # Deposit page with recent inbound transactions
│   │   ├── Withdraw.jsx            # Withdrawal page with guardrail notifications
│   │   └── Transactions.jsx        # Full audit ledger and search filters
│   ├── App.jsx                     # Layout wrapper and route definitions
│   ├── index.css                   # Custom responsive CSS design system
│   └── main.jsx                    # Application entry point
├── index.html                      # HTML root template
├── package.json                    # Project configuration and dependencies
├── vite.config.js                  # Vite configuration
└── README.md                       # Project documentation
```

---

## Technology Stack

- **Core Library:** React 18
- **Build Tool:** Vite 6
- **Routing:** React Router DOM 6
- **Iconography:** Lucide React
- **Styles:** Custom CSS3 with CSS custom properties, Flexbox, and CSS Grid
- **Persistence:** Web Storage API (`localStorage`)

---

## Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MehdiHossenFahim/bank-management.git
   cd bank-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build production bundle:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## Component Specifications

| Component | Primary Hooks | Responsibilities |
| :--- | :--- | :--- |
| `BankContext` | `useState`, `useEffect`, `useMemo`, `useContext` | Ledger state management, storage hydration, atomic deposit/withdraw dispatchers |
| `Dashboard` | `useBank` | Aggregates KPIs, renders user account header, mounts recent transactions |
| `DepositForm` | `useState`, `useRef`, `useEffect` | Validates input bounds, manages input focus, dispatches deposits |
| `WithdrawForm` | `useState`, `useRef`, `useEffect` | Checks available balance, triggers confirmation modal, dispatches withdrawals |
| `ConfirmationModal` | `useEffect` | Accessible dialog review prior to debiting funds |
| `TransactionList` | `useState` | Client-side filtering, text search querying, and empty state rendering |
| `Navbar` | `useState`, `useBank` | Navigation routing, active link states, mobile menu toggling, live balance badge |

---

## Author

- **Mehdi Hossen Fahim**

---

## License
This project is open-source and available under the MIT License.
