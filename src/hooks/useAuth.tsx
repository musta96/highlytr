
import { useContext } from 'react';
import { AuthContext } from '@/hooks/auth/AuthContext';

export const useAuth = () => useContext(AuthContext);
