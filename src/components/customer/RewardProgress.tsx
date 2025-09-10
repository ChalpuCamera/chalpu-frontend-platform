"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Gift, TrendingUp } from "lucide-react";

interface RewardProgressProps {
  currentPoints: number;
  maxPoints?: number;
  nextReward?: string;
}

export function RewardProgress({ 
  currentPoints, 
  maxPoints = 5,
  nextReward = "편의점 상품권 5,000원"
}: RewardProgressProps) {
  const percentage = (currentPoints / maxPoints) * 100;
  const remaining = maxPoints - currentPoints;

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">내 리워드</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{currentPoints}P</p>
              <p className="text-xs text-muted-foreground">/ {maxPoints}P</p>
            </div>
          </div>

          {/* 프로그레스 바 */}
          <div className="space-y-2">
            <div className="flex gap-1">
              {[...Array(maxPoints)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3 flex-1 rounded-full transition-all ${
                    i < currentPoints
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            
            {/* 동기부여 메시지 */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {remaining > 0 ? (
                  <>
                    <span className="text-primary">{remaining}개</span> 더 모으면 {nextReward}!
                  </>
                ) : (
                  <span className="text-green-600">🎉 상품권 교환 가능!</span>
                )}
              </p>
              {remaining > 0 && remaining <= 2 && (
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>거의 다 왔어요!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}