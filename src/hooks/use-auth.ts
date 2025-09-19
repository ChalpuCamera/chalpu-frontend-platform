'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { UserRole } from '@/lib/navigation';
import { saveRedirectUrl } from '@/lib/auth';

interface UseAuthOptions {
  required?: boolean;
  role?: UserRole;
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { required = false, role, redirectTo } = options;
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (required && !isAuthenticated) {
      // Save current path for redirect after login
      saveRedirectUrl(pathname);

      // Redirect to login
      const loginPath = redirectTo || (pathname.includes('/owner') ? '/owner' : '/customer');
      router.push(loginPath);
    }

    if (role && user && user.role !== role) {
      // Wrong role, redirect to correct area
      router.push(`/${user.role}`);
    }
  }, [isAuthenticated, isLoading, required, role, user, router, pathname, redirectTo]);

  return {
    isAuthenticated,
    user,
    isLoading,
    role: user?.role,
  };
}

// Hook for protected pages
export function useRequireAuth(role?: UserRole) {
  return useAuth({ required: true, role });
}

// Hook for checking if user has specific role
export function useHasRole(requiredRole: UserRole): boolean {
  const { user } = useAuthStore();
  return user?.role === requiredRole;
}

// Hook for getting current user
export function useCurrentUser() {
  const { user } = useAuthStore();
  return user;
}