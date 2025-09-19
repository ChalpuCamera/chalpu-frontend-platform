"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomerProfile } from "@/lib/hooks/useCustomer";
import { useRewardBalance } from "@/lib/hooks/useCustomerReward";
import { useMyFeedbacks } from "@/lib/hooks/useCustomerFeedback";

export default function CustomerMyPage() {
  const router = useRouter();
  const { data: profile, isLoading: profileLoading } = useCustomerProfile();
  const { data: rewardBalance, isLoading: rewardLoading } = useRewardBalance();
  const { data: feedbackHistory, isLoading: feedbackLoading } = useMyFeedbacks({ size: 1 });

  if (profileLoading || rewardLoading || feedbackLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-6 p-5 pt-16 mx-auto max-w-md">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-1" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
      </div>
    );
  }

  const recentFeedback = feedbackHistory?.content?.[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-5 pt-16 mx-auto max-w-md">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">🏠 마이페이지</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("설정")}
            className="px-4 py-2"
          >
            설정
          </Button>
        </div>

        {/* 사용자 정보 */}
        <Card className="border-0 shadow-none p-0">
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 bg-muted rounded-full overflow-hidden border border-foreground flex items-center justify-center">
              <Image
                src="/user_profile.png"
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '👤';
                }}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{profile?.name || '사용자'}</h2>
              <p className="text-sm text-muted-foreground mb-1">
                {profile?.joinDate ? `${new Date(profile.joinDate).toLocaleDateString('ko-KR')} 가입` : ''}
              </p>
              <p className="text-sm text-muted-foreground">
                피드백 작성수: {profile?.totalFeedbacks || 0}개
              </p>
            </div>
          </div>
        </Card>

        {/* 피드백 내역 */}
        <Card className="border border-foreground p-0">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">📝 피드백 작성 내역</h3>
            {recentFeedback ? (
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-muted/50 p-2 -m-2 rounded"
                onClick={() => router.push("/customer/history")}
              >
                <div>
                  <p className="font-medium">{recentFeedback.foodName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(recentFeedback.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                {/* TODO: Add reward display when available */}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                아직 작성한 피드백이 없습니다
              </p>
            )}
          </CardContent>
        </Card>

        {/* 리워드 요약 */}
        <Card
          className="border border-foreground p-0 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/customer/rewards")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium">🎁 내 리워드</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
              >
                자세히 보기
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <p className="text-2xl font-bold mb-2">
              현재 {rewardBalance?.currentBalance || 0} 포인트
            </p>
            <p className="text-sm text-muted-foreground">
              {rewardBalance && rewardBalance.currentBalance >= 5
                ? '교환 가능한 상품권이 있습니다!'
                : `${5 - (rewardBalance?.currentBalance || 0)}포인트 더 모으면 교환 가능해요!`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
