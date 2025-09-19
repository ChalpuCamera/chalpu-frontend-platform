"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useInfiniteMyFeedbacks } from "@/lib/hooks/useCustomerFeedback";

export default function FeedbackHistoryPage() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteMyFeedbacks(10);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const feedbackHistory = data?.pages.flatMap((page) => page.content) ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-5 p-5 pt-16 mx-auto max-w-md">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-center text-muted-foreground mb-4">
            피드백 내역을 불러오는데 실패했습니다
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            다시 시도
          </Button>
        </Card>
      </div>
    );
  }

  const latestFeedback = feedbackHistory[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-5 p-5 pt-16 mx-auto max-w-md">
        {/* 헤더 */}
        <h1 className="text-2xl font-bold">📝 피드백 내역</h1>

        {/* 최근 피드백 메뉴 */}
        {latestFeedback && (
          <Card className="border border-foreground p-0">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">🍽️ 최근 피드백 메뉴</h3>
              <div className="flex gap-3">
                {/* 메뉴 썸네일 */}
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden border border-foreground flex-shrink-0">
                  {latestFeedback.photoUrls && latestFeedback.photoUrls[0] ? (
                    <Image
                      src={latestFeedback.photoUrls[0]}
                      alt={latestFeedback.foodName}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🍲
                    </div>
                  )}
                </div>

                {/* 메뉴 정보 */}
                <div className="flex-1">
                  <p className="font-medium">{latestFeedback.foodName}</p>
                  <p className="text-sm text-muted-foreground">
                    {latestFeedback.storeName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(latestFeedback.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>

                {/* 리워드 표시 - TODO: Add reward field when available */}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 작성 내역 섹션 */}
        <Card className="border border-foreground p-0">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">📋 피드백 작성 내역</h3>
            <div className="space-y-4">
              {feedbackHistory.map((item) => (
                <div key={item.id} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{item.foodName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.storeName} · {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    {/* TODO: Add reward display when available */}
                  </div>
                  {item.textFeedback && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.textFeedback}
                    </p>
                  )}
                </div>
              ))}

              {/* 로딩 인디케이터 */}
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                </div>
              )}

              {/* Intersection Observer 타겟 */}
              <div ref={loadMoreRef} className="h-1" />
            </div>
          </CardContent>
        </Card>

        {/* 빈 상태 */}
        {feedbackHistory.length === 0 && !isLoading && (
          <Card className="border-2 border-foreground">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                아직 피드백 내역이 없습니다
              </p>
              <Button onClick={() => router.push("/customer/menu")}>
                메뉴 둘러보기
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 더 이상 로드할 항목이 없음 */}
        {!hasNextPage && feedbackHistory.length > 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            모든 피드백 내역을 불러왔습니다
          </p>
        )}
      </div>
    </div>
  );
}