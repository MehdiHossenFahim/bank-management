import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import { Inbox, Filter, Search, ArrowUpDown } from 'lucide-react';

/**
 * Reusable TransactionList Component
 * Displays transactions via map(), handles conditional rendering for empty states,
 * and includes filtering by type and optional search.
 */
const TransactionList = ({
  transactions = [],
  formatCurrency,
  limit,
  showFilters = true,
  emptyMessage = 'No transactions recorded yet.',
  emptySubtext = 'Deposits and withdrawals will appear here as soon as you perform an account activity.'
}) => {
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'Deposit' | 'Withdrawal'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter transactions based on type and search query
  const filteredTransactions = transactions.filter((tx) => {
    const matchesType =
      filterType === 'ALL' || tx.type.toLowerCase() === filterType.toLowerCase();
    
    const matchesSearch =
      searchQuery.trim() === '' ||
      (tx.note && tx.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.type && tx.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.amount && tx.amount.toString().includes(searchQuery));

    return matchesType && matchesSearch;
  });

  // Apply limit if specified (e.g. on Dashboard for recent 5)
  const displayedTransactions = limit
    ? filteredTransactions.slice(0, limit)
    : filteredTransactions;

  return (
    <div className="transaction-list-container">
      {/* Optional Filter & Search Controls */}
      {showFilters && (
        <div className="tx-controls-bar">
          <div className="tx-filter-pills">
            <button
              type="button"
              className={`filter-btn ${filterType === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterType('ALL')}
            >
              All ({transactions.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filterType === 'Deposit' ? 'active' : ''}`}
              onClick={() => setFilterType('Deposit')}
            >
              Deposits ({transactions.filter((t) => t.type === 'Deposit').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filterType === 'Withdrawal' ? 'active' : ''}`}
              onClick={() => setFilterType('Withdrawal')}
            >
              Withdrawals ({transactions.filter((t) => t.type === 'Withdrawal').length})
            </button>
          </div>

          <div className="tx-search-box">
            <Search size={16} className="tx-search-icon" />
            <input
              type="text"
              placeholder="Search by note or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tx-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="tx-search-clear"
                onClick={() => setSearchQuery('')}
              >
                &times;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Conditional Rendering: Empty State vs Transaction Items */}
      {displayedTransactions.length === 0 ? (
        <div className="tx-empty-state">
          <div className="empty-state-icon-circle">
            <Inbox size={42} strokeWidth={1.5} className="text-muted" />
          </div>
          <h3 className="empty-state-title">{emptyMessage}</h3>
          <p className="empty-state-subtext">
            {searchQuery || filterType !== 'ALL'
              ? 'No transactions matched your active filter criteria. Try adjusting your search.'
              : emptySubtext}
          </p>
        </div>
      ) : (
        <div className="tx-items-stack">
          {displayedTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;

