import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownCircle, CheckCircle2, AlertCircle, Sparkles, DollarSign, FileText } from 'lucide-react';
import { useBank } from '../context/BankContext';

/**
 * Reusable DepositForm Component
 * Manages input state, form validation, immediate balance updates,
 * success alerts, and utilizes useRef to auto-focus the amount input.
 */
const DepositForm = ({ onSuccess }) => {
  const { deposit, formatCurrency, balance } = useBank();
  
  // State for form inputs and feedback messages
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bonus Task: Use useRef to auto-focus on the amount input
  const amountInputRef = useRef(null);

  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, []);

  // Quick preset deposit amounts for enhanced user experience
  const quickPresets = [50, 100, 250, 500, 1000];

  const handlePresetClick = (val) => {
    setAmount(val.toString());
    setStatus({ type: null, message: '' });
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    // Validation 1: Prevent empty input
    if (!amount || amount.trim() === '') {
      setStatus({
        type: 'error',
        message: 'Please enter a deposit amount before submitting.'
      });
      if (amountInputRef.current) amountInputRef.current.focus();
      return;
    }

    const numericAmount = parseFloat(amount);

    // Validation 2: Prevent zero, negative, or NaN amounts
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setStatus({
        type: 'error',
        message: 'Invalid amount! Deposit must be a positive number greater than $0.00.'
      });
      if (amountInputRef.current) amountInputRef.current.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute deposit through context
      const result = deposit(numericAmount, note);

      if (result.success) {
        setStatus({
          type: 'success',
          message: `${result.message} New Balance: ${formatCurrency(result.newBalance)}`
        });

        // Clear input fields
        setAmount('');
        setNote('');

        // Trigger optional parent callback
        if (typeof onSuccess === 'function') {
          onSuccess(result);
        }

        // Refocus amount input for rapid entry
        if (amountInputRef.current) {
          amountInputRef.current.focus();
        }
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to complete deposit. Please try again.'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'An unexpected error occurred while processing your deposit.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card deposit-form-card">
      <div className="form-card-header">
        <div className="form-header-icon-box bg-emerald-50 text-emerald-600">
          <ArrowDownCircle size={28} />
        </div>
        <div>
          <h2 className="form-title">Deposit Funds</h2>
          <p className="form-subtitle">Add funds directly to your verified checking account.</p>
        </div>
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
          <Sparkles size={14} className="inline-icon" /> Quick Amounts:
        </span>
        <div className="presets-grid">
          {quickPresets.map((val) => (
            <button
              key={val}
              type="button"
              className="preset-pill-btn"
              onClick={() => handlePresetClick(val)}
            >
              +${val}
            </button>
          ))}
        </div>
      </div>

      {/* Deposit Form */}
      <form onSubmit={handleSubmit} className="bank-form" noValidate>
        {/* Amount Field */}
        <div className="form-group">
          <label htmlFor="deposit-amount" className="form-label">
            Deposit Amount (USD) <span className="required-star">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-prefix">
              <DollarSign size={18} />
            </span>
            <input
              id="deposit-amount"
              ref={amountInputRef}
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (status.type === 'error') setStatus({ type: null, message: '' });
              }}
              className="form-input with-prefix"
              required
            />
          </div>
          <span className="form-hint">
            Minimum deposit: $0.01 • Maximum single deposit: $50,000.00
          </span>
        </div>

        {/* Note / Memo Field */}
        <div className="form-group">
          <label htmlFor="deposit-note" className="form-label">
            Transaction Note / Memo <span className="optional-tag">(Optional)</span>
          </label>
          <div className="input-wrapper">
            <span className="input-prefix">
              <FileText size={18} />
            </span>
            <input
              id="deposit-note"
              type="text"
              placeholder="e.g. Salary, Client payment, Savings goal"
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
          className="btn btn-primary-gradient btn-full"
          disabled={isSubmitting}
        >
          <ArrowDownCircle size={18} className="btn-icon" />
          {isSubmitting ? 'Processing Deposit...' : 'Confirm Deposit'}
        </button>
      </form>
    </div>
  );
};

export default DepositForm;

