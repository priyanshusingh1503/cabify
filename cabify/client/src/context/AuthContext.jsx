import { createContext, useContext, useState, useCallback } from 'react';
import { sendOtp, verifyOtp } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginWithOtp = useCallback(async (email) => {
    setLoading(true);
    try { return await sendOtp(email); }
    finally { setLoading(false); }
  }, []);

  const confirmOtp = useCallback(async (email, otp) => {
    setLoading(true);
    try {
      const data = await verifyOtp(email, otp);
      if (data.success) setUser({ email });
      return data;
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithOtp, confirmOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
