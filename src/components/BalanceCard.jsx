import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Reusable BalanceCard Component
 * Displays financial metric cards with custom titles, amounts, badges, and color themes.
 */
const BalanceCard = ({
  title,
  amount,
  subtitle,
  variant = 'balance', // 'balance' | 'deposit' | 'withdrawal' | 'neutral'
  icon: CustomIcon,
  badge,
  badgeType = 'neutral'
}) => {
  // Determine variant styling & default icons
  const getVariantStyles = () => {
    switch (variant) {
      case 'deposit':
        return {
          cardClass: 'stat-card stat-card-deposit',
          iconBg: 'bg-emerald-100 text-emerald-600',
          defaultIcon: ArrowDownRight,
          amountClass: 'stat-amount text-emerald-600'
        };
      case 'withdrawal':
        return {
          cardClass: 'stat-card stat-card-withdrawal',
          iconBg: 'bg-rose-100 text-rose-600',
          defaultIcon: ArrowUpRight,
          amountClass: 'stat-amount text-rose-600'
        };
      case 'neutral':
        return {
          cardClass: 'stat-card stat-card-neutral',
          iconBg: 'bg-slate-100 text-slate-600',
          defaultIcon: DollarSign,
          amountClass: 'stat-amount text-slate-800'
        };
      case 'balance':
      default:
        return {
          cardClass: 'stat-card stat-card-primary',
          iconBg: 'bg-blue-600 text-white shadow-blue',
          defaultIcon: Wallet,
          amountClass: 'stat-amount text-slate-900'
        };
    }
  };

  const styles = getVariantStyles();
  const IconComponent = CustomIcon || styles.defaultIcon;

  return (
    <div className={styles.cardClass}>
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon-wrapper ${styles.iconBg}`}>
          <IconComponent size={22} strokeWidth={2.2} />
        </div>
      </div>

      <div className="stat-card-body">
        <div className={styles.amountClass}>{amount}</div>
        {(subtitle || badge) && (
          <div className="stat-footer">
            {badge && (
              <span className={`stat-badge stat-badge-${badgeType}`}>
                {badge}
              </span>
            )}
            {subtitle && <span className="stat-subtitle">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceCard;
