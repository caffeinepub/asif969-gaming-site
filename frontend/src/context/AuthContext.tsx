import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface MockUser {
  username: string;
  phone: string;
  balance: number;
}

interface AuthContextType {
  mockUser: MockUser | null;
  setMockUser: (user: MockUser | null) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalTab: 'login' | 'register';
  logout: () => void;
  updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mockUser, setMockUser] = useState<MockUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const openAuthModal = useCallback((tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setMockUser(null);
  }, []);

  const updateBalance = useCallback((newBalance: number) => {
    setMockUser(prev => prev ? { ...prev, balance: newBalance } : null);
  }, []);

  return (
    <AuthContext.Provider value={{
      mockUser,
      setMockUser,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      authModalTab,
      logout,
      updateBalance,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
