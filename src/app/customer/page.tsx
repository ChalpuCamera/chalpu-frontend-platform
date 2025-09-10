"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuList } from "@/components/customer/MenuList";
import { RewardProgress } from "@/components/customer/RewardProgress";
import { QuickStats } from "@/components/customer/QuickStats";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock 사용자 데이터
const mockUserData = {
  name: "김고객",
  currentPoints: 3,
  totalFeedbacks: 12,
  pendingFeedbacks: 2,
  earnedRewards: 2
};

export default function CustomerHomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto p-5 space-y-8">
        {/* 환영 메시지 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            안녕하세요, {mockUserData.name}님! 👋
          </h1>
          <p className="text-muted-foreground">
            오늘도 맛있는 피드백 남기고 리워드 받아가세요
          </p>
        </div>

        {/* 리워드 진행 상황 */}
        <RewardProgress 
          currentPoints={mockUserData.currentPoints}
          maxPoints={5}
        />

        {/* 오늘의 추천 메뉴 (Optional Hero Section) */}
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <CardTitle>오늘의 추천 메뉴</CardTitle>
              </div>
              <Badge className="bg-orange-500">HOT</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">김밥천국 - 김치찌개</h3>
                <p className="text-muted-foreground">지금 피드백 작성하면 즉시 포인트 적립!</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">🔥 5명 남음</Badge>
                  <span className="text-sm text-muted-foreground">오늘 마감</span>
                </div>
              </div>
              <Button 
                size="lg"
                onClick={() => router.push("/customer/menu/1")}
              >
                바로 신청
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 피드백 가능 메뉴 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">지금 피드백 가능한 메뉴</h2>
            <Link 
              href="/customer/menu" 
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              전체 메뉴 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <MenuList 
            limit={6}
            compact={true}
            gridCols={2}
          />
        </div>

        {/* 빠른 통계 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">내 활동</h2>
          <QuickStats
            totalFeedbacks={mockUserData.totalFeedbacks}
            pendingFeedbacks={mockUserData.pendingFeedbacks}
            earnedRewards={mockUserData.earnedRewards}
          />
        </div>

        {/* 빠른 액션 버튼들 */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-20"
            onClick={() => router.push("/customer/mypage")}
          >
            <div className="text-center">
              <span className="block text-2xl mb-1">👤</span>
              <span className="text-sm">마이페이지</span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="h-20"
            onClick={() => router.push("/customer/rewards")}
          >
            <div className="text-center">
              <span className="block text-2xl mb-1">🎁</span>
              <span className="text-sm">리워드 확인</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
