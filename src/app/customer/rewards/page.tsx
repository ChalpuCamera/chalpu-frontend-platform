"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, ArrowRight } from "lucide-react";

// Mock 데이터
const mockRewardData = {
  currentPoints: 3,
  totalEarned: 12,
  exchangeHistory: [
    { id: 1, item: "CU 5,000원권", date: "2024.01.05", points: 5 },
    { id: 2, item: "GS25 5,000원권", date: "2023.12.20", points: 5 }
  ],
  availableRewards: [
    { id: 1, name: "CU 편의점 5,000원권", points: 5, available: false },
    { id: 2, name: "GS25 편의점 5,000원권", points: 5, available: false },
    { id: 3, name: "세븐일레븐 5,000원권", points: 5, available: false }
  ]
};

export default function RewardsPage() {
  const handleExchange = (rewardId: number) => {
    // TODO: 리워드 교환 처리
    console.log("Exchange reward:", rewardId);
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <h1 className="text-2xl font-bold">내 리워드</h1>

        {/* 현재 포인트 */}
        <Card>
          <CardHeader>
            <CardTitle>적립 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{mockRewardData.currentPoints}P</p>
                  <p className="text-sm text-muted-foreground">현재 보유 포인트</p>
                </div>
                <Gift className="h-10 w-10 text-primary" />
              </div>
              
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 flex-1 rounded ${
                      i < mockRewardData.currentPoints
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                {5 - mockRewardData.currentPoints}개 더 모으면 상품권 교환 가능!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 교환 가능 상품 */}
        <Card>
          <CardHeader>
            <CardTitle>교환 가능 상품</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRewardData.availableRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{reward.name}</p>
                    <p className="text-sm text-muted-foreground">
                      필요 포인트: {reward.points}P
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={mockRewardData.currentPoints < reward.points}
                    onClick={() => handleExchange(reward.id)}
                  >
                    교환
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 교환 내역 */}
        <Card>
          <CardHeader>
            <CardTitle>교환 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRewardData.exchangeHistory.map((history) => (
                <div
                  key={history.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{history.item}</p>
                    <p className="text-sm text-muted-foreground">
                      {history.date}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    -{history.points}P
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}