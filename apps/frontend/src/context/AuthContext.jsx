// apps/frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as svcLogin, fetchProfile, logout as svcLogout } from '../services/auth.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On mount: if we have a token, try load profile
 useEffect(() => {
  console.log('[AuthProvider] mounting, token=', localStorage.getItem('accessToken'));
  if (access) {
    fetchProfile()
      .then((u) => {
        console.log('[AuthProvider] fetched profile', u);
        setUser(u);
      })
      .catch((e) => {
        console.error('[AuthProvider] fetchProfile failed', e);
        svcLogout();
        navigate('/login', { replace: true });
      });
  }
}, [navigate]);


  const login = async (creds) => {
    try {
      await svcLogin(creds);
      const u = await fetchProfile();
      setUser(u);
      navigate('/', { replace: true });
    } catch (err) {
      toast.error('Invalid credentials');
      throw err;
    }
  };

  const logout = () => {
    svcLogout();
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook
export function useAuth() {
  return useContext(AuthContext);
}
