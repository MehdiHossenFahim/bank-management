import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const BankContext = createContext(null);

const STORAGE_KEY_BALANCE = 'novatrust_bank_balance';
const STORAGE_KEY_TRANSACTIONS = 'novatrust_bank_transactions';
const STORAGE_KEY_ACCOUNT = 'novatrust_bank_account';

const DEFAULT_ACCOUNT = {
  bankName: 'NovaTrust Bank',
  appTitle: 'Bank Management System',
  accountHolder: 'Sarah Jenkins',
  accountNumber: 'NTB-8842-9103',
  accountType: 'Platinum Savings Account',
  routingNumber: '021000089',
  branch: 'Metropolitan Financial District',
  currency: '$',
  tier: 'VIP Priority'
};

const DEFAULT_BALANCE = 12450.00;

const DEFAULT_TRANSACTIONS = [
  {
    id: 'tx-101',
    type: 'Deposit',
    amount: 3500.00,
    date: 'Oct 24, 2026, 10:15 AM',
    timestamp: 1792833300000,
    note: 'Payroll Direct Deposit',
    balanceAfter: 12450.00
  },
  {
    id: 'tx-102',
    type: 'Withdrawal',
    amount: 450.00,
    date: 'Oct 22, 2026, 04:30 PM',
    timestamp: 1792683000000,
    note: 'ATM Cash Withdrawal',
    balanceAfter: 8950.00
  },
  {
    id: 'tx-103',
    type: 'Deposit',
    amount: 1200.00,
    date: 'Oct 20, 2026, 01:20 PM',
    timestamp: 1792500000000,
    note: 'Freelance Design Consulting',
    balanceAfter: 9400.00
  },
  {
    id: 'tx-104',
    type: 'Withdrawal',
    amount: 180.50,
    date: 'Oct 18, 2026, 11:45 AM',
    timestamp: 1792321500000,
    note: 'Utility & Internet Auto-Pay',
    balanceAfter: 8200.00
  },
  {
    id: 'tx-105',
    type: 'Deposit',
    amount: 800.00,
    date: 'Oct 15, 2026, 09:00 AM',
    timestamp: 1792054800000,
    note: 'Mobile Check Deposit',
    balanceAfter: 8380.50
  }
];

export const BankProvider = ({ children }) => {
  // Account Information (persisted in localStorage)
  const [accountInfo, setAccountInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACCOUNT);
      return saved ? JSON.parse(saved) : DEFAULT_ACCOUNT;
    } catch (e) {
      console.error('Failed to load account info from localStorage', e);
      return DEFAULT_ACCOUNT;
    }
  });

  // Account Balance (persisted in localStorage)
  const [balance, setBalance] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BALANCE);
      return saved !== null ? parseFloat(saved) : DEFAULT_BALANCE;
    } catch (e) {
      console.error('Failed to load balance from localStorage', e);
      return DEFAULT_BALANCE;
    }
  });

  // Transactions (persisted in localStorage)
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
    } catch (e) {
      console.error('Failed to load transactions from localStorage', e);
      return DEFAULT_TRANSACTIONS;
    }
  });

  // Sync to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BALANCE, balance.toString());
    } catch (e) {
      console.error('Failed to save balance to localStorage', e);
    }
  }, [balance]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACCOUNT, JSON.stringify(accountInfo));
    } catch (e) {
      console.error('Failed to save account info to localStorage', e);
    }
  }, [accountInfo]);

  // Compute total deposits and withdrawals
  const totalDeposited = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'Deposit')
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  const totalWithdrawn = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === 'Withdrawal')
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  // Format currency helper
  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  // Helper date formatter
  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Deposit Money action
  const deposit = (amount, note = 'Account Deposit') => {
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      return {
        success: false,
        error: 'Please enter a valid deposit amount greater than $0.00.'
      };
    }

    const newBalance = Math.round((balance + numAmount) * 100) / 100;
    const newTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: 'Deposit',
      amount: numAmount,
      date: getFormattedDate(),
      timestamp: Date.now(),
      note: note.trim() || 'General Deposit',
      balanceAfter: newBalance
    };

    setBalance(newBalance);
    setTransactions((prev) => [newTransaction, ...prev]);

    return {
      success: true,
      message: `Deposit successful! Added ${formatCurrency(numAmount)} to your account.`,
      newBalance
    };
  };

  // Withdraw Money action
  const withdraw = (amount, note = 'Account Withdrawal') => {
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      return {
        success: false,
        error: 'Please enter a valid withdrawal amount greater than $0.00.'
      };
    }

    if (numAmount > balance) {
      return {
        success: false,
        error: `Insufficient funds! Requested ${formatCurrency(numAmount)}, but current balance is ${formatCurrency(balance)}.`
      };
    }

    const newBalance = Math.round((balance - numAmount) * 100) / 100;
    const newTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: 'Withdrawal',
      amount: numAmount,
      date: getFormattedDate(),
      timestamp: Date.now(),
      note: note.trim() || 'ATM/Online Withdrawal',
      balanceAfter: newBalance
    };

    setBalance(newBalance);
    setTransactions((prev) => [newTransaction, ...prev]);

    return {
      success: true,
      message: `Withdrawal successful! Withdrew ${formatCurrency(numAmount)} from your account.`,
      newBalance
    };
  };

  // Reset to initial demo data (useful for demonstration and testing)
  const resetToDefault = () => {
    setBalance(DEFAULT_BALANCE);
    setTransactions(DEFAULT_TRANSACTIONS);
    setAccountInfo(DEFAULT_ACCOUNT);
    localStorage.removeItem(STORAGE_KEY_BALANCE);
    localStorage.removeItem(STORAGE_KEY_TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEY_ACCOUNT);
  };

  // Clear all transactions (allows testing the empty state requirement)
  const clearTransactions = () => {
    setTransactions([]);
  };

  const value = {
    accountInfo,
    setAccountInfo,
    balance,
    transactions,
    totalDeposited,
    totalWithdrawn,
    deposit,
    withdraw,
    formatCurrency,
    resetToDefault,
    clearTransactions
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};

