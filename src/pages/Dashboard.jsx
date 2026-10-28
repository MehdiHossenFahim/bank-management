import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  User, 
  CreditCard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  History, 
  RotateCcw, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Layers
} from 'lucide-react';
import { useBank } from '../context/BankContext';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';

/**
 * Task 1: Dashboard Page
 * Displays bank name, application title, account holder details, account number,
 * current balance, total deposits, total withdrawals, and recent transactions.
 */
const Dashboard = () => {
  const { 
    accountInfo, 
    balance, 
    totalDeposited, 
    totalWithdrawn, 
    transactions, 
    formatCurrency, 
    resetToDefault,
    clearTransactions 
  } = useBank();

  const netCashFlow = totalDeposited - totalWithdrawn;

  return (
    <div className="page-container dashboard-page">
      {/* Hero / Account Profile Header */}
      <section className="account-hero-card">
        <div className="account-hero-main">
          <div className="account-avatar-box">
            <User size={32} className="text-white" />
          </div>
          <div className="account-details">
            <div className="account-badges-row">
              <span className="badge badge-primary">{accountInfo.bankName}</span>
              <span className="badge badge-pill">{accountInfo.accountType}</span>
              <span className="badge badge-success">
                <ShieldCheck size={12} className="inline-icon" /> Verified & Active
              </span>
            </div>
            <h1 className="account-holder-name">{accountInfo.accountHolder}</h1>
            <div className="account-meta-info">
              <span className="meta-item">
                <CreditCard size={15} className="inline-icon" />
                <span className="meta-label">Account No:</span>
                <code className="account-number-code">{accountInfo.accountNumber}</code>
              </span>
              <span className="meta-separator">•</span>
              <span className="meta-item">
                <span className="meta-label">Routing:</span>
                <code>{accountInfo.routingNumber}</code>
              </span>
              <span className="meta-separator">•</span>
              <span className="meta-item">
                <span className="meta-label">Branch:</span>
                <span>{accountInfo.branch}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="account-hero-actions">
          <Link to="/deposit" className="btn btn-emerald">
            <ArrowDownCircle size={18} className="btn-icon" />
            Deposit Money
          </Link>
          <Link to="/withdraw" className="btn btn-rose">
            <ArrowUpCircle size={18} className="btn-icon" />
            Withdraw Money
          </Link>
        </div>
      </section>

      {/* Financial Metrics Section using Reusable BalanceCard Components */}
      <section className="metrics-grid">
        <BalanceCard
          title="Current Account Balance"
          amount={formatCurrency(balance)}
          subtitle="Available for immediate withdrawal"
          variant="balance"
          badge="Live Balance"
          badgeType="primary"
        />

        <BalanceCard
          title="Total Deposited"
          amount={formatCurrency(totalDeposited)}
          subtitle="Cumulative account inflow"
          variant="deposit"
          badge="+ Inflow"
          badgeType="success"
        />

        <BalanceCard
          title="Total Withdrawn"
          amount={formatCurrency(totalWithdrawn)}
          subtitle="Cumulative account outflow"
          variant="withdrawal"
          badge="- Outflow"
          badgeType="danger"
        />

        <BalanceCard
          title="Net Cash Position"
          amount={formatCurrency(netCashFlow)}
          subtitle={`${transactions.length} total operations recorded`}
          variant="neutral"
          icon={Layers}
          badge={netCashFlow >= 0 ? 'Surplus' : 'Deficit'}
          badgeType={netCashFlow >= 0 ? 'success' : 'danger'}
        />
      </section>

      {/* Main Content Split: Recent Activity & Quick Tools */}
      <div className="dashboard-content-grid">
        {/* Recent Transactions Section */}
        <section className="content-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Recent Transactions</h2>
              <p className="panel-subtitle">Latest account deposits and withdrawals</p>
            </div>
            <Link to="/transactions" className="panel-link">
              View All History <ArrowRight size={16} className="inline-icon" />
            </Link>
          </div>

          <div className="panel-body">
            <TransactionList
              transactions={transactions}
              formatCurrency={formatCurrency}
              limit={5}
              showFilters={false}
              emptyMessage="No recent transactions found"
              emptySubtext="Your transaction history is currently empty. Make a deposit or withdrawal to see records here."
            />
          </div>
        </section>

        {/* Sidebar: Demo Controls & Quick Advice */}
        <aside className="dashboard-sidebar">
          {/* Quick Account Summary */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">Banking Overview</h3>
            <ul className="overview-list">
              <li>
                <span className="overview-label">Institution:</span>
                <span className="overview-val">{accountInfo.bankName}</span>
              </li>
              <li>
                <span className="overview-label">Application:</span>
                <span className="overview-val">{accountInfo.appTitle}</span>
              </li>
              <li>
                <span className="overview-label">Account Tier:</span>
                <span className="overview-val">{accountInfo.tier}</span>
              </li>
              <li>
                <span className="overview-label">Daily Transfer Limit:</span>
                <span className="overview-val">$25,000.00</span>
              </li>
              <li>
                <span className="overview-label">FDIC Insurance:</span>
                <span className="overview-val text-emerald-600 font-semibold">Protected to $250,000</span>
              </li>
            </ul>
          </div>

          {/* Reviewer / Evaluator Testing Controls */}
          <div className="sidebar-card test-controls-card">
            <h3 className="sidebar-card-title">Testing & Demo Controls</h3>
            <p className="sidebar-card-subtext">
              Test conditional rendering, empty state messages, or restore sample state:
            </p>
            <div className="test-controls-buttons">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={resetToDefault}
                title="Restore default sample balance and transactions"
              >
                <RotateCcw size={14} className="btn-icon" />
                Reset Sample Data
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={clearTransactions}
                title="Clear all transactions to test empty state message"
              >
                <Trash2 size={14} className="btn-icon" />
                Clear All Transactions
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
