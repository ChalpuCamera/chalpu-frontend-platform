"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock 데이터 - 모든 가게의 메뉴들
const mockMenus = [
  {
    id: "1",
    restaurantId: "1",
    restaurantName: "맛있는 한식당",
    name: "김치찌개",
    price: 8000,
    category: "찌개류",
    isActive: true,
    feedbackCount: 45,
  },
  {
    id: "2",
    restaurantId: "1",
    restaurantName: "맛있는 한식당",
    name: "된장찌개",
    price: 7000,
    category: "찌개류",
    isActive: true,
    feedbackCount: 32,
  },
  {
    id: "3",
    restaurantId: "1",
    restaurantName: "맛있는 한식당",
    name: "제육볶음",
    price: 12000,
    category: "볶음류",
    isActive: true,
    feedbackCount: 38,
  },
  {
    id: "4",
    restaurantId: "2",
    restaurantName: "김사장 분식",
    name: "떡볶이",
    price: 5000,
    category: "분식",
    isActive: true,
    feedbackCount: 52,
  },
  {
    id: "5",
    restaurantId: "2",
    restaurantName: "김사장 분식",
    name: "김밥",
    price: 3500,
    category: "분식",
    isActive: false,
    feedbackCount: 28,
  },
];

export default function MenusManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("all");

  // 필터링된 메뉴
  const filteredMenus = mockMenus.filter((menu) => {
    const matchesSearch =
      menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRestaurant =
      selectedRestaurant === "all" || menu.restaurantId === selectedRestaurant;
    return matchesSearch && matchesRestaurant;
  });

  // 가게 목록 추출
  const restaurants = Array.from(
    new Set(mockMenus.map((m) => m.restaurantName))
  );

  const handleMenuClick = (menuId: string) => {
    router.push(`/owner/menu/${menuId}`);
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">메뉴 관리</h1>
          <Button onClick={() => router.push("/owner/menu/new")}>
            <Plus className="mr-2 h-4 w-4" />
            새 메뉴 추가
          </Button>
        </div>

        {/* 필터 및 검색 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="메뉴명 또는 카테고리로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedRestaurant === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRestaurant("all")}
                >
                  전체
                </Button>
                {restaurants.map((restaurant, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedRestaurant === String(idx + 1)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedRestaurant(String(idx + 1))}
                  >
                    {restaurant}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 메뉴 리스트 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>전체 메뉴 ({filteredMenus.length}개)</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>
                  활성: {filteredMenus.filter((m) => m.isActive).length}개
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredMenus.map((menu) => (
                <div 
                  key={menu.id} 
                  className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleMenuClick(menu.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <span className="text-lg">🍲</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{menu.name}</h3>
                          <Badge variant="secondary">{menu.category}</Badge>
                          {!menu.isActive && (
                            <Badge variant="destructive">판매중지</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {menu.restaurantName} · {menu.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">
                        피드백 {menu.feedbackCount}개
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}