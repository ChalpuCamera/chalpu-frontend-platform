"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 처리
    console.log("Kakao login initiated");
    // 실제 구현 시 카카오 OAuth 연동
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">🔐 로그인</h1>
          <p className="text-muted-foreground">간편하게 소셜 로그인으로 시작하세요</p>
        </div>

        {/* 로그인 버튼 */}
        <div className="space-y-4">
          <Button 
            className="w-full h-14 text-lg bg-[#FEE500] hover:bg-[#FDD835] text-black font-semibold"
            onClick={handleKakaoLogin}
          >
            <svg 
              className="w-6 h-6 mr-2" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 3C6.48 3 2 6.12 2 10c0 2.23 1.5 4.22 3.84 5.5-.15.48-.84 2.78-.86 2.93 0 0-.02.15.08.21.1.06.22.01.22.01.29-.04 3.36-2.2 3.88-2.57.55.08 1.17.12 1.84.12 5.52 0 10-3.12 10-7S17.52 3 12 3z"/>
            </svg>
            카카오톡으로 시작하기
          </Button>
        </div>

        {/* 이용약관 안내 */}
        <div className="text-center text-xs text-muted-foreground mt-8">
          로그인 시 이용약관 및 개인정보처리방침에
          <br />
          동의한 것으로 간주됩니다
        </div>
      </div>
    </div>
  );
}