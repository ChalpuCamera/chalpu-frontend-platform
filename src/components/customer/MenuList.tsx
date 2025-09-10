"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { MenuCard } from "./MenuCard";
import { useRouter } from "next/navigation";

interface Restaurant {
  id: string;
  name: string;
  category: string;
  menu: string;
  price: string;
  image: string;
  feedbackCount: number;
}

interface MenuListProps {
  restaurants?: Restaurant[];
  limit?: number;
  showSearch?: boolean;
  showCategories?: boolean;
  showFilter?: boolean;
  compact?: boolean;
  gridCols?: 1 | 2 | 3;
}

// Mock 데이터
const defaultRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "김밥천국",
    category: "한식",
    menu: "김치찌개",
    price: "8,000원",
    image: "🍲",
    feedbackCount: 15
  },
  {
    id: "2",
    name: "스시로",
    category: "일식",
    menu: "연어초밥 세트",
    price: "15,000원",
    image: "🍣",
    feedbackCount: 8
  },
  {
    id: "3",
    name: "파스타집",
    category: "양식",
    menu: "까르보나라",
    price: "12,000원",
    image: "🍝",
    feedbackCount: 20
  },
  {
    id: "4",
    name: "마라탕집",
    category: "중식",
    menu: "마라탕",
    price: "10,000원",
    image: "🥘",
    feedbackCount: 12
  },
  {
    id: "5",
    name: "한정식집",
    category: "한식",
    menu: "불고기 정식",
    price: "13,000원",
    image: "🥘",
    feedbackCount: 25
  },
  {
    id: "6",
    name: "라멘야",
    category: "일식",
    menu: "돈코츠 라멘",
    price: "11,000원",
    image: "🍜",
    feedbackCount: 18
  }
];

export function MenuList({
  restaurants = defaultRestaurants,
  limit,
  showSearch = false,
  showCategories = false,
  showFilter = false,
  compact = false,
  gridCols = 1
}: MenuListProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "한식", "중식", "일식", "양식"];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.menu.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayRestaurants = limit 
    ? filteredRestaurants.slice(0, limit)
    : filteredRestaurants;

  const handleMenuClick = (id: string) => {
    router.push(`/customer/menu/${id}`);
  };

  const gridClassName = gridCols === 2 
    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
    : gridCols === 3
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    : "space-y-4";

  return (
    <div className="space-y-4">
      {/* 헤더 with 필터 */}
      {showFilter && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">피드백 가능 메뉴</h2>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* 검색바 */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="가게명 또는 메뉴 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* 카테고리 필터 */}
      {showCategories && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* 메뉴 리스트 */}
      <div className={gridClassName}>
        {displayRestaurants.map((restaurant) => (
          <MenuCard
            key={restaurant.id}
            {...restaurant}
            restaurant={restaurant.name}
            compact={compact}
            onClick={handleMenuClick}
          />
        ))}
      </div>

      {/* 빈 상태 */}
      {displayRestaurants.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}