import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuthError = async (error: AuthError, operation: string) => {
    console.error(`Error ${operation}:`, error);

    if (error.code === 'auth/visibility-check-was-unavailable') {
      throw new Error('Authentication service is temporarily unavailable. Please try again in a few moments.');
    }

    throw error;
  };

  const retryOperation = async <T extends (...args: any[]) => Promise<any>>(
    operation: T,
    ...args: Parameters<T>
  ): Promise<ReturnType<T>> => {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await operation(...args);
      } catch (error) {
        lastError = error as Error;
        if (error instanceof Error && 
            error.message.includes('visibility-check-was-unavailable')) {
          if (attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAY * attempt);
            continue;
          }
        }
        break;
      }
    }

    throw lastError;
  };

  const signUp = async (email: string, password: string) => {
    try {
      await retryOperation(createUserWithEmailAndPassword, auth, email, password);
    } catch (error) {
      await handleAuthError(error as AuthError, 'signing up');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await retryOperation(signInWithEmailAndPassword, auth, email, password);

      // Check if user is a provider and update status
      const providers = JSON.parse(localStorage.getItem('providers') || '[]');
      const provider = providers.find(
        p => p.email.toLowerCase() === email.toLowerCase()
      );
      
      if (provider) {
        // Store provider status
        localStorage.setItem('currentProviderStatus', provider.status || 'pending');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      await handleAuthError(error as AuthError, 'signing out');
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 