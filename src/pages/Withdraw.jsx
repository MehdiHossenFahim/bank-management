import React from 'react';
import { ArrowUpCircle, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { useBank } from '../context/BankContext';
import WithdrawForm from '../components/WithdrawForm';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';

/**
 * Task 3: Withdraw Page
 * Houses the withdrawal form, balance metrics, and displays recent withdrawal transactions.
 */
const Withdraw = () => {
  const { balance, totalWithdrawn, transactions, formatCurrency } = useBank();

  // Filter only withdrawals for the recent withdrawals list
  const withdrawalTransactions = transactions.filter((t) => t.type === 'Withdrawal');

  return (
    <div className="page-container withdraw-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-category-badge text-rose-600 bg-rose-50">
            <ArrowUpCircle size={14} className="inline-icon" /> Outbound Funds
          </div>
          <h1 className="page-title">Withdraw Money</h1>
          <p className="page-description">
            Withdraw funds from your active account balance safely with real-time balance safeguards.
          </p>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="deposit-stats-grid">
        <BalanceCard
          title="Current Available Balance"
          amount={formatCurrency(balance)}
          subtitle="Funds eligible for immediate payout"
          variant="balance"
        />
        <BalanceCard
          title="Total Lifetime Withdrawn"
          amount={formatCurrency(totalWithdrawn)}
          subtitle={`${withdrawalTransactions.length} successful withdrawals recorded`}
          variant="withdrawal"
        />
      </div>

      {/* Two Column Layout: Withdraw Form & Recent Outflow Activity */}
      <div className="page-split-layout">
        <div className="layout-primary-col">
          <WithdrawForm />
        </div>

        <div className="layout-secondary-col">
          {/* Safeguard & Policy Callout */}
          <div className="info-callout-card callout-warning">
            <div className="callout-header">
              <ShieldAlert size={20} className="text-amber-600" />
              <h4>Withdrawal Safeguards & Policies</h4>
            </div>
            <p className="callout-body">
              To protect your financial security, every withdrawal requires explicit confirmation before funds are deducted.
            </p>
            <ul className="callout-bullet-points">
              <li>Overdraft protection is actively enforced</li>
              <li>Withdrawals exceeding available balance are rejected</li>
              <li>A pre-transaction review modal validates your intent</li>
            </ul>
          </div>

          {/* Recent Withdrawals Feed */}
          <div className="content-panel">
            <div className="panel-header">
              <h3 className="panel-title-sm">Recent Withdrawals</h3>
              <span className="badge badge-danger">
                {withdrawalTransactions.length} Recorded
              </span>
            </div>
            <div className="panel-body">
              <TransactionList
                transactions={withdrawalTransactions}
                formatCurrency={formatCurrency}
                limit={4}
                showFilters={false}
                emptyMessage="No withdrawals recorded yet"
                emptySubtext="You haven't made any withdrawals from this account yet."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
