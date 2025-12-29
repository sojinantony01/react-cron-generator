/**
 * Cron Context for sharing state across components
 * Eliminates prop drilling and centralizes cron configuration
 */

import React, { createContext, useContext, ReactNode } from 'react';

export interface CronContextValue {
  isUnix: boolean;
  disabled?: boolean;
  translate: (key: string) => string;
  value: string[];
  onChange: (value?: string[]) => void;
}

const CronContext = createContext<CronContextValue | undefined>(undefined);

export interface CronProviderProps {
  children: ReactNode;
  value: CronContextValue;
}

/**
 * Provider component for Cron context
 */
export function CronProvider({ children, value }: CronProviderProps) {
  return <CronContext.Provider value={value}>{children}</CronContext.Provider>;
}

/**
 * Hook to access Cron context
 * @throws Error if used outside of CronProvider
 */
export function useCronContext(): CronContextValue {
  const context = useContext(CronContext);
  if (context === undefined) {
    throw new Error('useCronContext must be used within a CronProvider');
  }
  return context;
}

/**
 * Hook to safely access Cron context (returns undefined if not in provider)
 */
export function useCronContextSafe(): CronContextValue | undefined {
  return useContext(CronContext);
}


