import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider } from 'ethers';
import { supabase, type DAOMember } from './supabase';

interface AuthContextType {
  currentMember: DAOMember | null;
  isLoading: boolean;
  loginWithMetaMask: () => Promise<void>;
  loginWithEmail: (email: string, walletAddress: string) => Promise<void>;
  logout: () => void;
  refreshMember: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentMember, setCurrentMember] = useState<DAOMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedMemberId = localStorage.getItem('dao_member_id');
    if (savedMemberId) {
      loadMember(savedMemberId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadMember = async (memberId: string) => {
    const { data } = await supabase
      .from('dao_members')
      .select('*')
      .eq('id', memberId)
      .maybeSingle();

    if (data) {
      setCurrentMember(data);
    } else {
      localStorage.removeItem('dao_member_id');
    }
    setIsLoading(false);
  };

  const refreshMember = async () => {
    if (!currentMember) return;

    const { data } = await supabase
      .from('dao_members')
      .select('*')
      .eq('id', currentMember.id)
      .maybeSingle();

    if (data) {
      setCurrentMember(data);
    }
  };

  const loginWithMetaMask = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }

    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const walletAddress = accounts[0];

    const { data: existingMember } = await supabase
      .from('dao_members')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (existingMember) {
      setCurrentMember(existingMember);
      localStorage.setItem('dao_member_id', existingMember.id);
    } else {
      const { data: newMember, error } = await supabase
        .from('dao_members')
        .insert({
          wallet_address: walletAddress,
          token_balance: 100,
          name: '',
        })
        .select()
        .single();

      if (error) {
        throw new Error('Failed to create member: ' + error.message);
      }

      setCurrentMember(newMember);
      localStorage.setItem('dao_member_id', newMember.id);
    }
  };

  const loginWithEmail = async (email: string, walletAddress: string) => {
    const { data: existingMember } = await supabase
      .from('dao_members')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingMember) {
      setCurrentMember(existingMember);
      localStorage.setItem('dao_member_id', existingMember.id);
    } else {
      const { data: newMember, error } = await supabase
        .from('dao_members')
        .insert({
          wallet_address: walletAddress || `email_${Date.now()}`,
          email: email,
          token_balance: 100,
          name: '',
        })
        .select()
        .single();

      if (error) {
        throw new Error('Failed to create member: ' + error.message);
      }

      setCurrentMember(newMember);
      localStorage.setItem('dao_member_id', newMember.id);
    }
  };

  const logout = () => {
    setCurrentMember(null);
    localStorage.removeItem('dao_member_id');
  };

  return (
    <AuthContext.Provider
      value={{
        currentMember,
        isLoading,
        loginWithMetaMask,
        loginWithEmail,
        logout,
        refreshMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
