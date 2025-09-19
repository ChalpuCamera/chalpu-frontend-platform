"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useInfiniteFoods, useFoodCategories } from "@/lib/hooks/useCustomerFood";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function MenuListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showFilter, setShowFilter] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useFoodCategories();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteFoods({
    search: debouncedSearch,
    category: selectedCategory,
    size: 10,
  });

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

  const foods = data?.pages.flatMap((page) => page.content) ?? [];

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    setShowFilter(false);
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-5 p-5 pt-16 mx-auto max-w-md">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-center text-muted-foreground mb-4">
            메뉴를 불러오는데 실패했습니다
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            다시 시도
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-5 p-5 pt-16 mx-auto max-w-md">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🍽️ 메뉴 찾기</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilter(!showFilter)}
          >
            🔍 필터
          </Button>
        </div>

        {/* 카테고리 필터 */}
        {showFilter && categories && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* 검색 바 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="🔍 가게명 또는 메뉴명 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 border-2 border-foreground"
          />
        </div>

        {selectedCategory && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">선택된 카테고리:</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedCategory("")}
            >
              {selectedCategory} ✕
            </Button>
          </div>
        )}

        {/* 메뉴 리스트 */}
        <div className="flex flex-col gap-4">
          {foods.map((food) => (
            <Card
              key={food.id || food.foodItemId}
              className="cursor-pointer hover:shadow-md transition-shadow border border-foreground p-0 overflow-hidden"
              onClick={() => router.push(`/customer/menu/${food.id || food.foodItemId}`)}
            >
              <div className="flex gap-4 p-3">
                {/* 이미지 */}
                <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 border border-foreground">
                  {food.photoUrl || food.thumbnailUrl ? (
                    <Image
                      src={food.photoUrl || food.thumbnailUrl || "/mock.png"}
                      alt={food.name || food.foodName || "Food"}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      🍽️
                    </div>
                  )}
                </div>

                {/* 정보 */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <h3 className="font-semibold text-base">{food.storeName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {food.name || food.foodName} • {food.price.toLocaleString()}원
                  </p>
                  {food.feedbackCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      피드백 {food.feedbackCount}개
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* 로딩 인디케이터 */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}

          {/* Intersection Observer 타겟 */}
          <div ref={loadMoreRef} className="h-1" />
        </div>

        {/* 빈 상태 */}
        {foods.length === 0 && !isLoading && (
          <Card className="border-2 border-foreground">
            <div className="p-12 text-center">
              <p className="text-muted-foreground">검색 결과가 없습니다</p>
            </div>
          </Card>
        )}

        {/* 더 이상 로드할 항목이 없음 */}
        {!hasNextPage && foods.length > 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            모든 메뉴를 불러왔습니다
          </p>
        )}
      </div>
    </div>
  );
}