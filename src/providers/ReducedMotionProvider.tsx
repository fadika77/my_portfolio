import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionPreferenceContextValue {
  /** True if animations should be minimized (OS setting OR user override). */
  reduceMotion: boolean;
  /** True if the user explicitly disabled the custom cursor. */
  cursorDisabled: boolean;
  setCursorDisabled: (value: boolean) => void;
}

const MotionPreferenceContext = createContext<MotionPreferenceContextValue | null>(null);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const systemPrefersReduced = useReducedMotion();
  const [cursorDisabled, setCursorDisabled] = useState(false);

  const value = useMemo(
    () => ({
      reduceMotion: systemPrefersReduced,
      cursorDisabled,
      setCursorDisabled,
    }),
    [systemPrefersReduced, cursorDisabled],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference(): MotionPreferenceContextValue {
  const context = useContext(MotionPreferenceContext);
  if (!context) {
    throw new Error('useMotionPreference must be used within a ReducedMotionProvider');
  }
  return context;
}
