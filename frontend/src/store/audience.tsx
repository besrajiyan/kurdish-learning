'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './auth';

export type Audience = 'child' | 'adult';

interface AudienceState {
  audience: Audience | null;
  setAudience: (a: Audience) => void;
  isChild: boolean;
  isAdult: boolean;
}

const AudienceContext = createContext<AudienceState | null>(null);

export function AudienceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [audience, setAudienceState] = useState<Audience | null>(null);

  // Load from user profile or localStorage
  useEffect(() => {
    if (user?.audience) {
      setAudienceState(user.audience);
    } else {
      const stored = localStorage.getItem('kurdi_audience') as Audience | null;
      setAudienceState(stored);
    }
  }, [user]);

  // Apply body class for theme switching
  useEffect(() => {
    if (audience === 'adult') {
      document.body.classList.add('adult-mode');
      document.body.classList.remove('child-mode');
    } else if (audience === 'child') {
      document.body.classList.add('child-mode');
      document.body.classList.remove('adult-mode');
    }
  }, [audience]);

  function setAudience(a: Audience) {
    setAudienceState(a);
    localStorage.setItem('kurdi_audience', a);
  }

  return (
    <AudienceContext.Provider
      value={{
        audience,
        setAudience,
        isChild: audience === 'child',
        isAdult: audience === 'adult',
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error('useAudience must be used within AudienceProvider');
  return ctx;
}
