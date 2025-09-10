"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UserTypeSelectionPage() {
  const router = useRouter();

  const handleCustomerClick = () => {
    // TODO: 역할을 저장하고 로그인 페이지로 이동
    console.log("Customer selected");
    router.push("/customer");
  };

  const handleOwnerClick = () => {
    // TODO: 역할을 저장하고 로그인 페이지로 이동
    console.log("Owner selected");
    router.push("/owner");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-">🍽️ 찰푸</h1>
          <p className="text-muted-foreground">어떤 역할로 서비스를 이용하시나요?</p>
        </div>

        {/* 역할 선택 카드 */}
        <div className="space-y-4">
          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={handleCustomerClick}
          >
            <CardHeader>
              <div className="text-4xl mb-2">👤</div>
              <CardTitle>손님</CardTitle>
              <CardDescription>
                메뉴를 주문하고 피드백을 남깁니다
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={handleOwnerClick}
          >
            <CardHeader>
              <div className="text-4xl mb-2">👨‍💼</div>
              <CardTitle>사장님</CardTitle>
              <CardDescription>
                메뉴를 등록하고 피드백을 확인합니다
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
