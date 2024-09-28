'use client';
import useUserStore from '@/stores/slices/user';
import { useEffect } from 'react';

export default function InitializeApp({ children }: { children: React.ReactNode }) {
  const { loadUserFromCookies } = useUserStore();

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  return <>{children}</>;
}
