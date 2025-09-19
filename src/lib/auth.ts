import { useAuthStore } from '@/stores/auth.store';
import { UserRole } from './navigation';

// JWT Token utilities
export function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || typeof payload.exp !== 'number') return true;

  // Check if token is expired (with 5 minute buffer)
  const buffer = 5 * 60 * 1000; // 5 minutes in milliseconds
  return Date.now() >= (payload.exp * 1000) - buffer;
}

export function getTokenExpirationTime(token: string): Date | null {
  const payload = decodeJWT(token);
  if (!payload || typeof payload.exp !== 'number') return null;
  return new Date(payload.exp * 1000);
}

// Get authorization header
export function getAuthHeader(): { Authorization: string } | Record<string, never> {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Extract user info from token
export function getUserFromToken(token: string): {
  id: string;
  email?: string;
  name?: string;
  role: UserRole;
} | null {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: (payload.sub as string) || (payload.userId as string) || '',
    email: payload.email as string | undefined,
    name: payload.name as string | undefined,
    role: (payload.role as UserRole) || (payload.userType as UserRole) || 'customer',
  };
}

// Check if user has specific role
export function hasRole(requiredRole: UserRole): boolean {
  const user = useAuthStore.getState().user;
  return user?.role === requiredRole;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const state = useAuthStore.getState();
  return state.isAuthenticated && !!state.token && !isTokenExpired(state.token);
}

// Storage keys
export const AUTH_STORAGE_KEY = 'auth-storage';
export const REDIRECT_KEY = 'auth-redirect';

// Save redirect URL before login
export function saveRedirectUrl(url: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(REDIRECT_KEY, url);
  }
}

// Get and clear redirect URL after login
export function getAndClearRedirectUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const url = sessionStorage.getItem(REDIRECT_KEY);
  if (url) {
    sessionStorage.removeItem(REDIRECT_KEY);
  }
  return url;
}

// Parse OAuth callback parameters
export function parseOAuthCallback(searchParams: URLSearchParams): {
  token?: string;
  refreshToken?: string;
  error?: string;
  errorDescription?: string;
} {
  return {
    token: searchParams.get('token') || undefined,
    refreshToken: searchParams.get('refreshToken') || undefined,
    error: searchParams.get('error') || undefined,
    errorDescription: searchParams.get('error_description') || undefined,
  };
}

// Parse OAuth code from success callback
export function parseOAuthCode(searchParams: URLSearchParams): {
  code?: string;
  error?: string;
  errorDescription?: string;
} {
  return {
    code: searchParams.get('code') || undefined,
    error: searchParams.get('error') || undefined,
    errorDescription: searchParams.get('error_description') || undefined,
  };
}

// Exchange OAuth code for tokens
export async function exchangeCodeForToken(
  code: string,
  role: UserRole
): Promise<{
  accessToken: string;
  user?: {
    id: string;
    email?: string;
    name?: string;
    role: UserRole;
  };
}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies
    body: JSON.stringify({ code, role }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to exchange code for token');
  }

  return response.json();
}

// Validate role against current path
export function validateRoleForPath(path: string, userRole: UserRole | null): boolean {
  if (!userRole) return false;

  if (path.startsWith('/owner') && userRole !== 'owner') {
    return false;
  }

  if (path.startsWith('/customer') && userRole !== 'customer') {
    return false;
  }

  return true;
}

// Format token for display (show first/last 4 chars)
export function formatTokenForDisplay(token: string): string {
  if (!token || token.length < 10) return '****';
  return `${token.slice(0, 4)}...${token.slice(-4)}`;
}