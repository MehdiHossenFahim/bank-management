import React, { useEffect } from 'react';
import { AlertTriangle, X, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * ConfirmationModal Component (Bonus Requirement)
 * Prompts user for explicit confirmation before processing sensitive transactions (withdrawals).
 */
const ConfirmationModal = ({
  isOpen,
  title = 'Confirm Transaction',
  amount,
  currentBalance,
  resultingBalance,
  note,
  onConfirm,
  onCancel,
  formatCurrency
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const formatAmt = (val) => {
    if (typeof formatCurrency === 'function') return formatCurrency(val);
    return `$${Number(val).toFixed(2)}`;
  };

  return (
    <div className="modal-backdrop" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-warning-icon">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <h3 className="modal-title">{title}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-body">
          <p className="modal-intro">
            Please review the details below. This withdrawal will immediately deduct funds from your account.
          </p>

          <div className="modal-summary-card">
            <div className="summary-row">
              <span className="summary-label">Withdrawal Amount:</span>
              <span className="summary-value highlight-danger">
                {formatAmt(amount)}
              </span>
            </div>

            {note && (
              <div className="summary-row">
                <span className="summary-label">Note / Purpose:</span>
                <span className="summary-value">{note}</span>
              </div>
            )}

            <div className="summary-divider" />

            <div className="summary-row">
              <span className="summary-label">Current Balance:</span>
              <span className="summary-value">{formatAmt(currentBalance)}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Remaining Balance:</span>
              <span className="summary-value font-bold text-blue-600">
                {formatAmt(resultingBalance)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger-gradient"
            onClick={onConfirm}
          >
            <CheckCircle size={18} className="btn-icon" />
            Confirm & Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
