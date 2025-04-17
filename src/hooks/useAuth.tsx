
// Import directly from AuthContext to avoid circular dependencies
import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';

export const useAuth = () => useContext(AuthContext);
