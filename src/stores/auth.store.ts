import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRole } from '@/lib/navigation';

interface User {
  id: string;
  email?: string;
  name?: string;
  role: UserRole;
}

interface AuthState {
  // State
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (token: string, refreshToken: string, user: User) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateToken: (token: string) => void;
  checkAuth: () => Promise<boolean>;
  refreshAccessToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Set authentication data (refreshToken is now stored as httpOnly cookie)
      setAuth: (token: string, refreshToken: string, user: User) => {
        set({
          token,
          refreshToken: refreshToken || '', // Empty string if using httpOnly cookie
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      // Set only tokens
      setTokens: (token: string, refreshToken: string) => {
        set({
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },

      // Clear authentication
      clearAuth: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Update access token
      updateToken: (token: string) => {
        set({ token });
      },

      // Check if authenticated (validate token)
      checkAuth: async () => {
        const { token, clearAuth } = get();

        if (!token) {
          clearAuth();
          return false;
        }

        try {
          // Check if token is expired
          const payload = parseJWT(token);
          if (!payload || typeof payload.exp !== 'number') {
            clearAuth();
            return false;
          }

          const isExpired = Date.now() >= payload.exp * 1000;
          if (isExpired) {
            // Try to refresh token
            const refreshed = await get().refreshAccessToken();
            return refreshed;
          }

          return true;
        } catch (error) {
          console.error('Auth check failed:', error);
          clearAuth();
          return false;
        }
      },

      // Refresh access token using refresh token (now stored as httpOnly cookie)
      refreshAccessToken: async () => {
        const { clearAuth, updateToken } = get();

        try {
          // Refresh token is sent automatically as httpOnly cookie
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: include cookies
          });

          if (!response.ok) {
            throw new Error('Token refresh failed');
          }

          const data = await response.json();

          // Update only access token (refresh token remains in httpOnly cookie)
          updateToken(data.accessToken);
          return true;
        } catch (error) {
          console.error('Token refresh failed:', error);
          clearAuth();
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper function to parse JWT token
function parseJWT(token: string): Record<string, unknown> | null {
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
  } catch {
    return null;
  }
}

// Selectors for common use cases
export const useAuth = () => useAuthStore((state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
  token: state.token,
  isLoading: state.isLoading,
}));

export const useAuthActions = () => useAuthStore((state) => ({
  setAuth: state.setAuth,
  clearAuth: state.clearAuth,
  checkAuth: state.checkAuth,
  refreshAccessToken: state.refreshAccessToken,
}));

export const useUserRole = () => useAuthStore((state) => state.user?.role);