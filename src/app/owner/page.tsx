"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, ChevronRight, MessageSquare, Menu as MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock 데이터
const mockData = {
  owner: {
    name: "김사장",
    restaurantName: "맛있는 한식당",
    restaurantCount: 2
  },
  stats: {
    totalFeedbacks: 152,
    thisMonthGrowth: 15
  },
  // 모든 가게의 메뉴들
  menus: [
    {
      id: "1",
      restaurantId: "1",
      restaurantName: "맛있는 한식당",
      name: "김치찌개",
      feedbackCount: 23
    },
    {
      id: "2",
      restaurantId: "1",
      restaurantName: "맛있는 한식당", 
      name: "된장찌개",
      feedbackCount: 18
    },
    {
      id: "3",
      restaurantId: "1",
      restaurantName: "맛있는 한식당",
      name: "제육볶음",
      feedbackCount: 15
    },
    {
      id: "4",
      restaurantId: "2",
      restaurantName: "김사장 분식",
      name: "떡볶이",
      feedbackCount: 32
    },
    {
      id: "5",
      restaurantId: "2",
      restaurantName: "김사장 분식",
      name: "김밥",
      feedbackCount: 28
    }
  ],
  monthlyTrend: [
    { month: "1월", feedbacks: 42 },
    { month: "2월", feedbacks: 58 },
    { month: "3월", feedbacks: 45 },
    { month: "4월", feedbacks: 72 },
    { month: "5월", feedbacks: 65 },
    { month: "6월", feedbacks: 78 }
  ]
};

export default function OwnerDashboardPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-950">사장님 대시보드</h1>
        </div>

        {/* 사장님 정보 카드 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">
                    {mockData.owner.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{mockData.owner.name}</h2>
                  <p className="text-muted-foreground">
                    {mockData.owner.restaurantName} 운영
                  </p>
                </div>
              </div>
              <Button 
                variant="outline"
                onClick={() => router.push("/owner/mypage")}
              >
                설정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 전체 현황 */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <CardTitle>전체 현황</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">피드백</p>
                <p className="text-3xl font-bold">{mockData.stats.totalFeedbacks}개</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">이번 달 성장</p>
                <p className="text-3xl font-bold text-green-600">+{mockData.stats.thisMonthGrowth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 차트와 그래프 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 차트 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">차트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">월별 피드백 트렌드</p>
                </div>
              </div>
              {/* 간단한 바 차트 시뮬레이션 */}
              <div className="mt-4 space-y-2">
                {mockData.monthlyTrend.slice(-3).map((month) => (
                  <div key={month.month} className="flex items-center space-x-2">
                    <span className="text-xs w-8">{month.month}</span>
                    <div className="flex-1 bg-muted rounded h-2">
                      <div 
                        className="bg-primary rounded h-2" 
                        style={{ width: `${(month.feedbacks / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs w-8">{month.feedbacks}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 그래프 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">그래프</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">피드백 증가 추세</p>
                </div>
              </div>
              {/* 간단한 통계 */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">이번 달</p>
                  <p className="text-lg font-bold text-green-600">+15%</p>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">지난 달</p>
                  <p className="text-lg font-bold">+8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 등록된 메뉴 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-6 bg-primary rounded" />
                <CardTitle>등록된 메뉴</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/owner/menu")}
              >
                전체보기
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockData.menus.map((menu) => (
                <div
                  key={menu.id}
                  className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🍲</span>
                    <div>
                      <p className="font-medium">{menu.name}</p>
                      <p className="text-sm text-muted-foreground">{menu.restaurantName}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    피드백 {menu.feedbackCount}개
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}