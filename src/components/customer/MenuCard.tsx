"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MenuCardProps {
  id: string;
  name: string;
  restaurant: string;
  category: string;
  menu: string;
  price: string;
  image: string;
  feedbackCount: number;
  compact?: boolean;
  onClick?: (id: string) => void;
}

export function MenuCard({
  id,
  name,
  restaurant,
  category,
  menu,
  price,
  image,
  feedbackCount,
  compact = false,
  onClick
}: MenuCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(id)}
    >
      <CardHeader className={compact ? "p-4" : "pb-3"}>
        <div className="flex items-start space-x-4">
          {/* 이미지 */}
          <div className={`${compact ? "w-16 h-16" : "w-20 h-20"} bg-muted rounded-lg flex items-center justify-center text-3xl shrink-0`}>
            {image}
          </div>
          
          {/* 정보 */}
          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{name || restaurant}</h3>
                <p className="text-sm text-muted-foreground">{category}</p>
              </div>
              <Badge variant="default" className="shrink-0">
                신청 가능
              </Badge>
            </div>
            <p className="font-medium truncate">{menu}</p>
            <div className="flex items-center justify-between">
              <span className="text-primary font-semibold">{price}</span>
              {!compact && (
                <span className="text-xs text-muted-foreground">
                  피드백 {feedbackCount}개
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}