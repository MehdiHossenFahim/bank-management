import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  History, 
  Wallet,
  Menu,
  X
} from 'lucide-react';
import { useBank } from '../context/BankContext';

/**
 * Navbar Component
 * Navigation header using React Router DOM's NavLink.
 * Displays bank logo, title, responsive nav links, and live balance indicator.
 */
const Navbar = () => {
  const { accountInfo, balance, formatCurrency } = useBank();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/deposit', label: 'Deposit', icon: ArrowDownCircle },
    { to: '/withdraw', label: 'Withdraw', icon: ArrowUpCircle },
    { to: '/transactions', label: 'Transaction History', icon: History }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Bank Name */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-logo-icon">
            <Building2 size={24} className="text-white" />
          </div>
          <div className="brand-text">
            <span className="brand-name">{accountInfo.bankName}</span>
            <span className="brand-tagline">{accountInfo.appTitle}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                end={item.to === '/'}
              >
                <Icon size={18} className="nav-link-icon" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Live Balance Widget & User Summary */}
        <div className="navbar-actions">
          <div className="navbar-balance-pill" title="Live Account Balance">
            <Wallet size={16} className="text-blue-600" />
            <div className="navbar-balance-details">
              <span className="navbar-balance-label">Balance</span>
              <span className="navbar-balance-val">{formatCurrency(balance)}</span>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={closeMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Navigation Menu</span>
              <button 
                type="button" 
                className="mobile-close-btn" 
                onClick={closeMobileMenu}
              >
                <X size={20} />
              </button>
            </div>
            <div className="mobile-nav-links">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
                    }
                    onClick={closeMobileMenu}
                    end={item.to === '/'}
                  >
                    <Icon size={20} className="mobile-nav-icon" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
            <div className="mobile-account-summary">
              <div className="mobile-account-holder">
                <span className="text-muted">Logged in as:</span>
                <strong>{accountInfo.accountHolder}</strong>
              </div>
              <div className="mobile-account-num">
                <span className="text-muted">Account No:</span>
                <code>{accountInfo.accountNumber}</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

