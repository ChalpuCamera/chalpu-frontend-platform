"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  "한식", "중식", "일식", "양식", "분식", "치킨", "피자", "버거",
  "카페", "디저트", "찌개류", "볶음류", "구이류", "탕류", "밥류"
];

const restaurants = [
  { id: "1", name: "맛있는 한식당" },
  { id: "2", name: "김사장 분식" }
];

export default function NewMenuPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    restaurantId: "",
    name: "",
    price: "",
    category: "",
    description: "",
    ingredients: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출하여 메뉴 생성
    console.log("Creating menu:", formData);
    router.push("/owner/menu");
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">새 메뉴 추가</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>메뉴 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="restaurant">가게 선택 *</Label>
                <Select
                  value={formData.restaurantId}
                  onValueChange={(value) => setFormData({ ...formData, restaurantId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="가게를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurants.map((restaurant) => (
                      <SelectItem key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="name">메뉴명 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">가격 *</Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                  <span className="absolute right-3 top-3 text-sm text-muted-foreground">원</span>
                </div>
              </div>

              <div>
                <Label htmlFor="category">카테고리</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">메뉴 설명</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="ingredients">주요 재료 (쉼표로 구분)</Label>
                <Input
                  id="ingredients"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="예: 김치, 돼지고기, 두부, 대파"
                />
              </div>

            </CardContent>
          </Card>

          {/* 제출 버튼 */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!formData.restaurantId || !formData.name || !formData.price}
            >
              <Save className="mr-2 h-4 w-4" />
              메뉴 추가
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}