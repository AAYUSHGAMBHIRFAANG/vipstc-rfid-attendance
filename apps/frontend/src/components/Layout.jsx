import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header" style={{
        background: 'var(--color-primary)',
        color: '#fff',
        padding: 'var(--spacing-lg)'
      }}>
        <h1>Teacher Dashboard</h1>
      </header>
      <main style={{ padding: 'var(--spacing-lg)' }}>{children}</main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
      />
    </div>
  );
}
