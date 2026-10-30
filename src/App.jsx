import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BankProvider } from './context/BankContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';

/**
 * App Component
 * Integrates BankProvider context, React Router DOM routing,
 * and maintains consistent Navbar and Footer layout across all views.
 */
function App() {
  return (
    <BankProvider>
      <Router>
        <div className="app-shell">
          {/* Consistent Navbar across all pages */}
          <Navbar />

          {/* Main App Content Router */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/transactions" element={<Transactions />} />
              {/* Fallback to Dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Consistent Footer */}
          <footer className="app-footer">
            <div className="footer-container">
              <div className="footer-left">
                <span className="footer-brand font-bold">NovaTrust Bank</span>
                <span className="footer-copy">
                  © {new Date().getFullYear()} Simulated Bank Management System. Built for React Assignment.
                </span>
              </div>
              <div className="footer-right">
                <span className="footer-badge">
                  Frontend Demo • React 18 & Vite
                </span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </BankProvider>
  );
}

export default App;

