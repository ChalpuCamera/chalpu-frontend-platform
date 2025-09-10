"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, ChevronRight, Gift, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock 데이터
const mockUserData = {
  name: "김고객",
  joinDate: "2024.01.01",
  feedbackCount: 12,
  currentPoints: 3,
  recentFeedbacks: [
    { id: 1, menu: "김치찌개", restaurant: "김밥천국", date: "2024.01.09" },
    { id: 2, menu: "된장찌개", restaurant: "맛있는 식당", date: "2024.01.08" },
  ],
};

export default function CustomerMyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">마이페이지</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* 사용자 정보 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">
                  {mockUserData.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{mockUserData.name}님</h2>
                <p className="text-sm text-muted-foreground">
                  가입일: {mockUserData.joinDate}
                </p>
                <p className="text-sm text-muted-foreground">
                  피드백 횟수: {mockUserData.feedbackCount}개
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 최근 피드백 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <CardTitle>최근 피드백</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/customer/history")}
              >
                전체보기
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUserData.recentFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{feedback.menu}</p>
                    <p className="text-sm text-muted-foreground">
                      {feedback.restaurant} · {feedback.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 리워드 요약 */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/customer/rewards")}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <CardTitle>내 리워드</CardTitle>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">
                {mockUserData.currentPoints} 포인트
              </p>
              <p className="text-sm text-muted-foreground">
                5포인트 모으면 상품권 교환 가능
              </p>
              <div className="flex space-x-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-12 rounded ${
                      i < mockUserData.currentPoints ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
