import React from 'react';
import { ArrowDownCircle, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { useBank } from '../context/BankContext';
import DepositForm from '../components/DepositForm';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';

/**
 * Task 2: Deposit Page
 * Houses the deposit form, balance metrics, and displays immediate deposit history.
 */
const Deposit = () => {
  const { balance, totalDeposited, transactions, formatCurrency } = useBank();

  // Filter only deposits for the recent deposits list on this page
  const depositTransactions = transactions.filter((t) => t.type === 'Deposit');

  return (
    <div className="page-container deposit-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-category-badge text-emerald-600 bg-emerald-50">
            <ArrowDownCircle size={14} className="inline-icon" /> Inbound Funds
          </div>
          <h1 className="page-title">Deposit Money</h1>
          <p className="page-description">
            Deposit funds instantly into your NovaTrust account with zero processing fees.
          </p>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="deposit-stats-grid">
        <BalanceCard
          title="Current Balance"
          amount={formatCurrency(balance)}
          subtitle="Available account balance"
          variant="balance"
        />
        <BalanceCard
          title="Total Lifetime Deposited"
          amount={formatCurrency(totalDeposited)}
          subtitle={`${depositTransactions.length} successful deposits recorded`}
          variant="deposit"
        />
      </div>

      {/* Two Column Layout: Deposit Form & Recent Inflow Activity */}
      <div className="page-split-layout">
        <div className="layout-primary-col">
          <DepositForm />
        </div>

        <div className="layout-secondary-col">
          {/* Security & Processing Info */}
          <div className="info-callout-card">
            <div className="callout-header">
              <ShieldCheck size={20} className="text-emerald-600" />
              <h4>Instant Settlement Guarantee</h4>
            </div>
            <p className="callout-body">
              All deposits made through this portal are processed and credited to your available balance in real time.
            </p>
            <ul className="callout-bullet-points">
              <li>No minimum holding period</li>
              <li>Immediate availability for withdrawal or transfer</li>
              <li>Protected by bank-grade 256-bit simulated encryption</li>
            </ul>
          </div>

          {/* Recent Deposits Feed */}
          <div className="content-panel">
            <div className="panel-header">
              <h3 className="panel-title-sm">Recent Deposits</h3>
              <span className="badge badge-success">
                {depositTransactions.length} Recorded
              </span>
            </div>
            <div className="panel-body">
              <TransactionList
                transactions={depositTransactions}
                formatCurrency={formatCurrency}
                limit={4}
                showFilters={false}
                emptyMessage="No deposits recorded yet"
                emptySubtext="Submit your first deposit using the form on the left!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
