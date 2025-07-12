import React, { createContext, useState, useContext } from 'react';
import Spinner from '../components/Spinner.jsx';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Spinner />}
    </LoadingContext.Provider>
  );
}

// Hook for convenience
export const useLoading = () => useContext(LoadingContext);
