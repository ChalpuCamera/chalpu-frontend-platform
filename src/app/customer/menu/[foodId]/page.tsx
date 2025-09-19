"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFoodDetail } from "@/lib/hooks/useCustomerFood";

export default function CustomerMenuDetailPage({
  params
}: {
  params: Promise<{ foodId: string }>
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const foodId = parseInt(resolvedParams.foodId, 10);

  const { data: food, isLoading, isError } = useCustomerFoodDetail(foodId);

  const handleFeedbackRequest = () => {
    if (!food?.isAvailableForFeedback) {
      alert("현재 이 메뉴는 피드백을 받지 않고 있습니다.");
      return;
    }
    if (food?.hasSubmittedFeedback) {
      alert("이미 이 메뉴에 대한 피드백을 작성하셨습니다.");
      return;
    }
    router.push(`/customer/verification?foodId=${foodId}`);
  };

  const handleDeliveryApp = (app: string) => {
    // TODO: 배달 앱 연동
    console.log(`${app} 연동`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-5 p-5 pt-16 mx-auto max-w-md">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !food) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-center text-muted-foreground mb-4">
            메뉴를 불러오는데 실패했습니다
          </p>
          <Button onClick={() => router.back()} className="w-full">
            돌아가기
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-5 p-5 pt-16 mx-auto max-w-md">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="w-10 h-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* 메뉴 이미지 */}
        <div className="w-full h-52 bg-muted rounded-lg overflow-hidden border-2 border-foreground">
          {food.photoUrl || food.thumbnailUrl ? (
            <Image
              src={food.photoUrl || food.thumbnailUrl || "/mock.png"}
              alt={food.name || food.foodName || "Food image"}
              width={335}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-base">🍽️ 메뉴 사진</p>
            </div>
          )}
        </div>

        {/* 메뉴 정보 */}
        <Card className="border-0 shadow-none p-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold">{food.name || food.foodName}</h2>
              <p className="text-sm text-muted-foreground">{food.storeName}</p>
            </div>
            <p className="text-lg font-semibold">{food.price.toLocaleString()}원</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {food.description || "맛있는 음식입니다"}
          </p>
          {food.feedbackCount > 0 && (
            <p className="text-sm text-primary mt-2">
              ⭐ 피드백 {food.feedbackCount}개
            </p>
          )}
        </Card>

        {/* 액션 버튼들 */}
        <div className="flex flex-col gap-3 pt-3">
          {/* 피드백 작성 신청 버튼 */}
          <Button
            size="lg"
            variant={food.isAvailableForFeedback && !food.hasSubmittedFeedback ? "outline" : "secondary"}
            onClick={handleFeedbackRequest}
            disabled={!food.isAvailableForFeedback || food.hasSubmittedFeedback}
            className="w-full h-12 border-2 border-foreground rounded-lg font-semibold"
          >
            {food.hasSubmittedFeedback
              ? "✅ 피드백 작성 완료"
              : food.isAvailableForFeedback
                ? "📝 피드백 작성 신청하기"
                : "❌ 피드백 불가"}
          </Button>

          {/* 배달 앱 연결 버튼들 */}
          <Button
            size="lg"
            onClick={() => handleDeliveryApp("배달의민족")}
            className="w-full h-12 bg-foreground text-background rounded-lg font-semibold"
          >
            🛵 배달의민족에서 주문하기
          </Button>

          <Button
            size="lg"
            onClick={() => handleDeliveryApp("요기요")}
            className="w-full h-12 bg-foreground text-background rounded-lg font-semibold"
          >
            🛵 요기요에서 주문하기
          </Button>

          <Button
            size="lg"
            onClick={() => handleDeliveryApp("쿠팡이츠")}
            className="w-full h-12 bg-foreground text-background rounded-lg font-semibold"
          >
            🛵 쿠팡이츠에서 주문하기
          </Button>
        </div>
      </div>
    </div>
  );
}