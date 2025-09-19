"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomerTaste, useUpdateCustomerTaste } from "@/lib/hooks/useCustomer";
import type { CustomerTasteDto } from "@/lib/api/customer/customer";

export default function ProfilePage() {
  const router = useRouter();
  const { data: tasteProfile, isLoading } = useCustomerTaste();
  const updateTaste = useUpdateCustomerTaste();

  const [spiceLevel, setSpiceLevel] = useState<number>(0);
  const [portionSize, setPortionSize] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number>(0);

  // 기존 프로필 데이터 로드
  useEffect(() => {
    if (tasteProfile) {
      setSpiceLevel(tasteProfile.spiceLevel || 0);
      setPortionSize(tasteProfile.portionSize || 0);
      setPriceRange(tasteProfile.priceRange || 0);
    }
  }, [tasteProfile]);

  const handleNext = async () => {
    if (spiceLevel && portionSize && priceRange) {
      const tasteData: CustomerTasteDto = {
        spiceLevel,
        portionSize,
        priceRange,
      };

      updateTaste.mutate(tasteData, {
        onSuccess: () => {
          router.push("/customer/menu");
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-8 p-5 pb-8 pt-16 mx-auto max-w-md">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-8 p-5 pb-8 pt-16 mx-auto max-w-md">
        <div>
          <h1 className="text-2xl font-bold mb-2">👤 입맛 프로필</h1>
          <p className="text-base text-muted-foreground">
            더 정확한 피드백을 위해<br />
            평소 식성을 알려주세요
          </p>
        </div>

        {/* 맵기 섹션 */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">🌶️ 평소 맵기 정도</h2>
            <div className="flex gap-3">
              <Button
                variant={spiceLevel === 1 ? "default" : "outline"}
                onClick={() => setSpiceLevel(1)}
                className="flex-1"
              >
                안매워요
              </Button>
              <Button
                variant={spiceLevel === 3 ? "default" : "outline"}
                onClick={() => setSpiceLevel(3)}
                className="flex-1"
              >
                보통
              </Button>
              <Button
                variant={spiceLevel === 5 ? "default" : "outline"}
                onClick={() => setSpiceLevel(5)}
                className="flex-1"
              >
                매워요
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 식사량 섹션 */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">🍽️ 평소 식사량</h2>
            <div className="flex gap-3">
              <Button
                variant={portionSize === 1 ? "default" : "outline"}
                onClick={() => setPortionSize(1)}
                className="flex-1"
              >
                적게
              </Button>
              <Button
                variant={portionSize === 3 ? "default" : "outline"}
                onClick={() => setPortionSize(3)}
                className="flex-1"
              >
                보통
              </Button>
              <Button
                variant={portionSize === 5 ? "default" : "outline"}
                onClick={() => setPortionSize(5)}
                className="flex-1"
              >
                많이
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 지출 금액 섹션 */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">💰 평소 지출 금액</h2>
            <div className="flex gap-3">
              <Button
                variant={priceRange === 1 ? "default" : "outline"}
                onClick={() => setPriceRange(1)}
                className="flex-1"
              >
                ~10,000원
              </Button>
              <Button
                variant={priceRange === 3 ? "default" : "outline"}
                onClick={() => setPriceRange(3)}
                className="flex-1"
              >
                ~20,000원
              </Button>
              <Button
                variant={priceRange === 5 ? "default" : "outline"}
                onClick={() => setPriceRange(5)}
                className="flex-1"
              >
                20,000원+
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 다음 버튼 */}
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!spiceLevel || !portionSize || !priceRange || updateTaste.isPending}
          className="w-full"
        >
          {updateTaste.isPending ? "저장 중..." : "➡️ 다음으로"}
        </Button>
      </div>
    </div>
  );
}