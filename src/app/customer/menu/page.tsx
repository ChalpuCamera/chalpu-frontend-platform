"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock 데이터 - 모든 메뉴
const mockMenus = [
  {
    foodId: "1",
    name: "김치찌개",
    storeName: "맛있는 한식당",
    storeAddress: "강남구",
    price: 8000,
    category: "찌개류",
    feedbackCount: 45,
    image: "🍲"
  },
  {
    foodId: "2",
    name: "된장찌개",
    storeName: "맛있는 한식당", 
    storeAddress: "강남구",
    price: 7000,
    category: "찌개류",
    feedbackCount: 32,
    image: "🍲"
  },
  {
    foodId: "3",
    name: "제육볶음",
    storeName: "맛있는 한식당",
    storeAddress: "강남구",
    price: 12000,
    category: "볶음류",
    feedbackCount: 38,
    image: "🥘"
  },
  {
    foodId: "4",
    name: "떡볶이",
    storeName: "김사장 분식",
    storeAddress: "서초구",
    price: 5000,
    category: "분식",
    feedbackCount: 52,
    image: "🍜"
  },
  {
    foodId: "5",
    name: "김밥",
    storeName: "김사장 분식",
    storeAddress: "서초구",
    price: 3500,
    category: "분식",
    feedbackCount: 28,
    image: "🍙"
  },
  {
    foodId: "6",
    name: "비빔밥",
    storeName: "맛있는 한식당",
    storeAddress: "강남구",
    price: 9000,
    category: "밥류",
    feedbackCount: 21,
    image: "🍚"
  }
];

const categories = ["전체", "한식", "분식", "찌개류", "볶음류", "밥류"];

export default function MenuListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 필터링된 메뉴
  const filteredMenus = mockMenus.filter(menu => {
    const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          menu.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || menu.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-2xl font-bold">메뉴 탐색</h1>
          <p className="text-muted-foreground">피드백을 남길 메뉴를 선택하세요</p>
        </div>

        {/* 검색 바 */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="메뉴명 또는 가게명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 카테고리 필터 */}
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

        {/* 결과 수 */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredMenus.length}개의 메뉴
          </p>
          <Button variant="ghost" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            필터
          </Button>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenus.map((menu) => (
            <Card
              key={menu.foodId}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/customer/menu/${menu.foodId}`)}
            >
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="text-4xl">{menu.image}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{menu.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {menu.storeName}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{menu.storeAddress}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{menu.category}</Badge>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-bold text-lg">{menu.price.toLocaleString()}원</p>
                      <Badge variant="outline" className="text-xs">
                        피드백 가능
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      피드백 {menu.feedbackCount}개
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredMenus.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">검색 결과가 없습니다</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}