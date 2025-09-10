"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  "한식", "중식", "일식", "양식", "분식", "치킨", "피자", "버거",
  "카페", "디저트", "찌개류", "볶음류", "구이류", "탕류", "밥류"
];

// Mock 데이터 (기존 메뉴 정보)
const mockMenuData = {
  id: "1",
  restaurantId: "1",
  restaurantName: "맛있는 한식당",
  name: "김치찌개",
  price: 8000,
  category: "찌개류",
  description: "정성스럽게 끓인 김치찌개입니다. 신김치와 돼지고기가 들어가 깊은 맛을 냅니다.",
  isActive: true,
  ingredients: ["신김치", "돼지고기", "두부", "대파", "양파", "마늘"]
};

export default function EditMenuPage({ 
  params 
}: { 
  params: { foodId: string } 
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: mockMenuData.name,
    price: mockMenuData.price.toString(),
    category: mockMenuData.category,
    description: mockMenuData.description,
    isActive: mockMenuData.isActive,
    ingredients: mockMenuData.ingredients.join(", ")
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출하여 메뉴 수정
    console.log("Updating menu:", params.foodId, formData);
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
          <div>
            <h1 className="text-2xl font-bold">메뉴 수정</h1>
            <p className="text-muted-foreground">{mockMenuData.name} · {mockMenuData.restaurantName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 현재 상태 */}
          <Card>
            <CardHeader>
              <CardTitle>현재 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{mockMenuData.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockMenuData.price.toLocaleString()}원 · {mockMenuData.category}
                  </p>
                </div>
                <div className="text-2xl">🍲</div>
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 수정 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <SelectValue />
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
                  placeholder="예: 신김치, 돼지고기, 두부, 대파"
                />
              </div>
            </CardContent>
          </Card>

          {/* 판매 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>판매 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isActive">판매 상태</Label>
                  <p className="text-sm text-muted-foreground">
                    판매중으로 설정하면 고객이 주문할 수 있습니다
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
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
              disabled={!formData.name || !formData.price}
            >
              <Save className="mr-2 h-4 w-4" />
              수정 완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}