"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [userType, setUserType] = useState("customer");

  const handleKakaoLogin = () => {
    console.log("Kakao login initiated");
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/authorization/${userType}/kakao`;
    } catch (error) {
      console.error("Kakao login failed:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md space-y-10">
        {/* 헤더 */}
        <div className="flex flex-col items-center space-y-4">
          <Image src="/chalpu_logo.png" alt="Logo" width={206} height={61} />
          <p className="font-400 text-base text-[#595959]">
            {userType === "customer"
              ? "여러분의 솔직한 평가가 가게를 살립니다."
              : "안녕하세요 사장님, 가게를 살리는 찰푸입니다."}
          </p>
        </div>

        {/* 홍보 소개 이미지 */}
        <div className="flex justify-center">
          <Image
            className="w-full h-auto"
            src="/image.png"
            alt="Promotion"
            width={343}
            height={256}
          />
        </div>

        {/* 로그인 버튼 */}
        <div className="flex flex-col gap-4">
          <Button
            className="rounded-[12px] w-full h-14 text-lg bg-[#FFE812] hover:bg-[#FDD835] text-[#3C1E1C] font-bold"
            onClick={handleKakaoLogin}
          >
            <Image src="/kakao_icon.png" alt="Kakao" width={24} height={24} />
            {userType === "customer"
              ? "카카오로 계속하기"
              : "카카오로 로그인하기"}
          </Button>
          {/* 사용자 분기 */}
          <div
            className={`text-center text-base text-[#595959] ${
              userType === "customer" ? "font-semibold" : "font-400"
            }`}
            onClick={() => {
              if (userType === "customer") {
                setUserType("owner");
              } else {
                window.open("https://open.kakao.com/o/sCpB58Hh", "_blank");
              }
            }}
          >
            {userType === "customer"
              ? "👨‍🌾 사장님으로 입장하기"
              : "로그인에 문제가 있어요"}
          </div>
        </div>
      </div>
    </div>
  );
}
