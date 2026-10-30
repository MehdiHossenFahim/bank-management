import React from 'react';
import { History, ArrowDownLeft, ArrowUpRight, Filter, Download, Trash2, RotateCcw } from 'lucide-react';
import { useBank } from '../context/BankContext';
import TransactionList from '../components/TransactionList';

/**
 * Task 4: Transaction History Page
 * Full audit log of all account deposits and withdrawals with filtering,
 * search, and conditional rendering for empty states.
 */
const Transactions = () => {
  const { 
    transactions, 
    formatCurrency, 
    totalDeposited, 
    totalWithdrawn, 
    clearTransactions,
    resetToDefault 
  } = useBank();

  const depositCount = transactions.filter((t) => t.type === 'Deposit').length;
  const withdrawalCount = transactions.filter((t) => t.type === 'Withdrawal').length;

  return (
    <div className="page-container transactions-page">
      {/* Page Header */}
      <div className="page-header page-header-with-actions">
        <div>
          <div className="page-category-badge text-blue-600 bg-blue-50">
            <History size={14} className="inline-icon" /> Audit Trail
          </div>
          <h1 className="page-title">Transaction History</h1>
          <p className="page-description">
            Complete statement of all simulated deposits, withdrawals, and ledger balances.
          </p>
        </div>

        {/* Action Buttons for Review / Demo */}
        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={resetToDefault}
            title="Reset to initial sample transactions"
          >
            <RotateCcw size={14} className="btn-icon" />
            Reset Data
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={clearTransactions}
            title="Clear all transactions to inspect empty state rendering"
          >
            <Trash2 size={14} className="btn-icon" />
            Clear Statement
          </button>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="tx-summary-strip">
        <div className="strip-item">
          <span className="strip-label">Total Transactions:</span>
          <span className="strip-val font-semibold">{transactions.length}</span>
        </div>
        <div className="strip-item text-emerald-600">
          <ArrowDownLeft size={16} className="inline-icon" />
          <span className="strip-label">Deposits:</span>
          <span className="strip-val font-semibold">
            {depositCount} ({formatCurrency(totalDeposited)})
          </span>
        </div>
        <div className="strip-item text-rose-600">
          <ArrowUpRight size={16} className="inline-icon" />
          <span className="strip-label">Withdrawals:</span>
          <span className="strip-val font-semibold">
            {withdrawalCount} ({formatCurrency(totalWithdrawn)})
          </span>
        </div>
      </div>

      {/* Full Transaction List Container */}
      <div className="content-panel tx-full-panel">
        <div className="panel-body">
          <TransactionList
            transactions={transactions}
            formatCurrency={formatCurrency}
            showFilters={true}
            emptyMessage="No transaction records found"
            emptySubtext="Your statement is currently clear. Head over to the Deposit or Withdraw page to generate records!"
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;

