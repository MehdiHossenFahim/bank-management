import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpCircle, CheckCircle2, AlertCircle, AlertTriangle, DollarSign, FileText, Sparkles } from 'lucide-react';
import { useBank } from '../context/BankContext';
import ConfirmationModal from './ConfirmationModal';

/**
 * Reusable WithdrawForm Component
 * Features validation against overdrafts, negative/zero values,
 * auto-focus using useRef, and pre-withdrawal confirmation modal (Bonus Task).
 */
const WithdrawForm = ({ onSuccess }) => {
  const { withdraw, balance, formatCurrency } = useBank();

  // State for form inputs and feedback messages
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bonus Task: Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Bonus Task: Use useRef to auto-focus on the amount input
  const amountInputRef = useRef(null);

  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, []);

  // Quick withdrawal presets
  const quickPresets = [20, 50, 100, 200, 500];

  const handlePresetClick = (val) => {
    setAmount(val.toString());
    setStatus({ type: null, message: '' });
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  // Pre-validation before launching confirmation modal
  const handlePreSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    // Validation 1: Prevent empty input
    if (!amount || amount.trim() === '') {
      setStatus({
        type: 'error',
        message: 'Please enter a withdrawal amount before submitting.'
      });
      if (amountInputRef.current) amountInputRef.current.focus();
      return;
    }

    const numericAmount = parseFloat(amount);

    // Validation 2: Prevent zero, negative, or NaN amounts
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setStatus({
        type: 'error',
        message: 'Invalid amount! Withdrawal must be a positive number greater than $0.00.'
      });
      if (amountInputRef.current) amountInputRef.current.focus();
      return;
    }

    // Validation 3: Prevent withdrawals greater than current balance
    if (numericAmount > balance) {
      setStatus({
        type: 'error',
        message: `Insufficient funds! You requested ${formatCurrency(numericAmount)}, but your current balance is ${formatCurrency(balance)}.`
      });
      if (amountInputRef.current) amountInputRef.current.focus();
      return;
    }

    // All preliminary checks passed - prompt user with confirmation modal (Bonus Task)
    setShowConfirmModal(true);
  };

  // Confirmed execution from modal
  const executeWithdrawal = () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    try {
      const numericAmount = parseFloat(amount);
      const result = withdraw(numericAmount, note);

      if (result.success) {
        setStatus({
          type: 'success',
          message: `${result.message} Remaining Balance: ${formatCurrency(result.newBalance)}`
        });

        // Clear input fields
        setAmount('');
        setNote('');

        if (typeof onSuccess === 'function') {
          onSuccess(result);
        }

        if (amountInputRef.current) {
          amountInputRef.current.focus();
        }
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to process withdrawal.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'An unexpected error occurred while processing your withdrawal.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const parsedAmount = parseFloat(amount) || 0;
  const resultingBalance = Math.max(0, balance - parsedAmount);

  return (
    <>
      <div className="form-card withdraw-form-card">
        <div className="form-card-header">
          <div className="form-header-icon-box bg-rose-50 text-rose-600">
            <ArrowUpCircle size={28} />
          </div>
          <div>
            <h2 className="form-title">Withdraw Funds</h2>
            <p className="form-subtitle">Transfer funds out of your account or prepare an ATM payout.</p>
          </div>
        </div>

        {/* Live Available Balance Badge */}
        <div className="withdraw-balance-banner">
          <span className="balance-banner-label">Available for Withdrawal:</span>
          <span className="balance-banner-value">{formatCurrency(balance)}</span>
        </div>

        {/* Alert / Status Messages */}
        {status.message && (
          <div
            className={`alert-banner ${
              status.type === 'success' ? 'alert-success' : 'alert-error'
            }`}
            role="alert"
          >
            {status.type === 'success' ? (
              <CheckCircle2 size={20} className="alert-icon text-emerald-600" />
            ) : (
              <AlertCircle size={20} className="alert-icon text-rose-600" />
            )}
            <span className="alert-text">{status.message}</span>
          </div>
        )}

        {/* Quick Preset Amount Buttons */}
        <div className="presets-container">
          <span className="presets-label">
            <Sparkles size={14} className="inline-icon" /> Fast Amounts:
          </span>
          <div className="presets-grid">
            {quickPresets.map((val) => (
              <button
                key={val}
                type="button"
                className="preset-pill-btn"
                disabled={val > balance}
                onClick={() => handlePresetClick(val)}
                title={val > balance ? 'Exceeds balance' : `Withdraw $${val}`}
              >
                ${val}
              </button>
            ))}
          </div>
        </div>

        {/* Withdraw Form */}
        <form onSubmit={handlePreSubmit} className="bank-form" noValidate>
          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="withdraw-amount" className="form-label">
              Withdrawal Amount (USD) <span className="required-star">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-prefix">
                <DollarSign size={18} />
              </span>
              <input
                id="withdraw-amount"
                ref={amountInputRef}
                type="number"
                step="0.01"
                min="0.01"
                max={balance}
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (status.type === 'error') setStatus({ type: null, message: '' });
                }}
                className={`form-input with-prefix ${
                  parsedAmount > balance ? 'input-invalid' : ''
                }`}
                required
              />
            </div>
            {parsedAmount > balance ? (
              <span className="form-error-hint">
                <AlertTriangle size={13} className="inline-icon" /> Amount exceeds your available balance of {formatCurrency(balance)}
              </span>
            ) : (
              <span className="form-hint">
                Maximum allowed withdrawal right now: {formatCurrency(balance)}
              </span>
            )}
          </div>

          {/* Note / Memo Field */}
          <div className="form-group">
            <label htmlFor="withdraw-note" className="form-label">
              Reason / Memo <span className="optional-tag">(Optional)</span>
            </label>
            <div className="input-wrapper">
              <span className="input-prefix">
                <FileText size={18} />
              </span>
              <input
                id="withdraw-note"
                type="text"
                placeholder="e.g. Rent, Grocery shopping, ATM Cash"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="form-input with-prefix"
                maxLength={60}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-rose-gradient btn-full"
            disabled={isSubmitting || balance <= 0}
          >
            <ArrowUpCircle size={18} className="btn-icon" />
            {isSubmitting ? 'Verifying...' : 'Review & Withdraw'}
          </button>
        </form>
      </div>

      {/* Bonus Task: Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Authorize Withdrawal"
        amount={parsedAmount}
        currentBalance={balance}
        resultingBalance={resultingBalance}
        note={note}
        onConfirm={executeWithdrawal}
        onCancel={() => setShowConfirmModal(false)}
        formatCurrency={formatCurrency}
      />
    </>
  );
};

export default WithdrawForm;

