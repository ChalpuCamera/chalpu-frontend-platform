'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { getAndClearRedirectUrl, getUserFromToken } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { storeApi } from '@/lib/api/owner/store';

function OAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // Handle error from OAuth provider
      if (error) {
        toast.error(`로그인 실패: ${errorDescription || error}`);
        router.push('/owner');
        return;
      }

      // Check if code exists
      if (!code) {
        toast.error('인증 코드가 없습니다.');
        router.push('/owner');
        return;
      }

      try {
        // Exchange code for tokens
        const response = await api.post<{
          accessToken: string;
          user?: {
            id: string;
            email?: string;
            name?: string;
            role: 'owner' | 'customer';
          };
        }>('/api/auth/token', {
          code,
          role: 'owner',
        }, {
          credentials: 'include', // Important: include cookies in request
        });

        const { accessToken, user: userData } = response;

        // Extract user info from token if not provided by backend
        const user = userData || getUserFromToken(accessToken);

        if (!user) {
          toast.error('사용자 정보를 가져올 수 없습니다.');
          router.push('/owner');
          return;
        }

        // Verify role
        if (user.role !== 'owner') {
          toast.error('권한이 없습니다. 사장님 계정으로 로그인해주세요.');
          router.push('/owner');
          return;
        }

        // Note: refreshToken is now stored as httpOnly cookie by backend
        // We store empty string as placeholder since we can't access httpOnly cookie
        setAuth(accessToken, '', user);

        toast.success('로그인 성공!');

        // Check if owner has any stores
        try {
          const storesResponse = await storeApi.getMyStores({ page: 0, size: 1 });
          const hasStore = storesResponse.result.totalElements > 0;

          // Check for redirect URL or determine destination based on store existence
          const redirectUrl = getAndClearRedirectUrl();
          if (redirectUrl) {
            router.push(redirectUrl);
          } else if (hasStore) {
            router.push('/owner/home');
          } else {
            router.push('/owner/welcome');
          }
        } catch (storeError) {
          console.error('Failed to check stores:', storeError);
          // If store check fails, proceed to home page
          const redirectUrl = getAndClearRedirectUrl();
          router.push(redirectUrl || '/owner/home');
        }
      } catch (error) {
        console.error('OAuth token exchange error:', error);
        toast.error('로그인 처리 중 오류가 발생했습니다.');
        router.push('/owner');
      }
    };

    handleOAuthSuccess();
  }, [searchParams, router, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">로그인 처리 중...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">잠시만 기다려주세요</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-5">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <OAuthSuccessContent />
    </Suspense>
  );
}