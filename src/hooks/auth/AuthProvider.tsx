
import React from 'react';
import { AuthStateProvider } from './providers/AuthStateProvider';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthStateProvider>{children}</AuthStateProvider>;
};
