"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Clock, Award } from "lucide-react";

interface QuickStatsProps {
  totalFeedbacks?: number;
  pendingFeedbacks?: number;
  earnedRewards?: number;
}

export function QuickStats({
  totalFeedbacks = 0,
  pendingFeedbacks = 0,
  earnedRewards = 0
}: QuickStatsProps) {
  const stats = [
    {
      icon: MessageSquare,
      label: "작성한 피드백",
      value: totalFeedbacks,
      unit: "개",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      label: "대기중 피드백",
      value: pendingFeedbacks,
      unit: "개",
      color: "text-orange-600"
    },
    {
      icon: Award,
      label: "받은 상품권",
      value: earnedRewards,
      unit: "개",
      color: "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">
                    {stat.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}