import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Calendar, Tag, ShieldCheck } from 'lucide-react';

/**
 * Reusable TransactionItem Component
 * Renders a single transaction with distinct visual styles for Deposits vs Withdrawals.
 */
const TransactionItem = ({ transaction, formatCurrency }) => {
  const isDeposit = transaction.type === 'Deposit';
  
  // Safe currency fallback if helper is not passed as prop
  const formatAmt = (val) => {
    if (typeof formatCurrency === 'function') {
      return formatCurrency(val);
    }
    return `$${Number(val).toFixed(2)}`;
  };

  return (
    <div className={`tx-item ${isDeposit ? 'tx-item-deposit' : 'tx-item-withdrawal'}`}>
      <div className="tx-item-left">
        {/* Type Icon */}
        <div className={`tx-icon-badge ${isDeposit ? 'bg-deposit' : 'bg-withdrawal'}`}>
          {isDeposit ? (
            <ArrowDownLeft size={20} className="text-deposit" />
          ) : (
            <ArrowUpRight size={20} className="text-withdrawal" />
          )}
        </div>

        {/* Details: Note, Type Badge, and Date */}
        <div className="tx-details">
          <div className="tx-header-row">
            <span className="tx-note">{transaction.note || (isDeposit ? 'Deposit' : 'Withdrawal')}</span>
            <span className={`tx-type-pill ${isDeposit ? 'pill-deposit' : 'pill-withdrawal'}`}>
              {transaction.type}
            </span>
          </div>
          
          <div className="tx-meta-row">
            <span className="tx-date">
              <Calendar size={13} className="inline-icon" />
              {transaction.date}
            </span>
            {transaction.balanceAfter !== undefined && (
              <span className="tx-balance-after">
                Post Balance: {formatAmt(transaction.balanceAfter)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Amount Display */}
      <div className="tx-item-right">
        <span className={`tx-amount ${isDeposit ? 'amount-deposit' : 'amount-withdrawal'}`}>
          {isDeposit ? `+${formatAmt(transaction.amount)}` : `-${formatAmt(transaction.amount)}`}
        </span>
        <span className="tx-status-verified">
          <ShieldCheck size={12} className="inline-icon" /> Settled
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;

