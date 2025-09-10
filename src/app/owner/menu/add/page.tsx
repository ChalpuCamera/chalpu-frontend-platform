"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";

// Mock 가게 데이터 (실제로는 API에서 가져옴)
const mockStores = [
  { id: "1", name: "맛있는 한식당" },
  { id: "2", name: "김사장 분식" }
];

export default function AddMenuPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    storeId: "",
    name: "",
    category: "",
    price: "",
    description: "",
    ingredients: [] as string[],
    images: [] as File[]
  });
  const [newIngredient, setNewIngredient] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출
    console.log("메뉴 등록:", formData);
    router.push("/owner/menu");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages].slice(0, 5) // 최대 5개
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient.trim()]
      });
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    });
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
            <h1 className="text-2xl font-bold">새 메뉴 등록</h1>
            <p className="text-muted-foreground">메뉴 정보를 입력해주세요</p>
          </div>
        </div>

        {/* 등록 폼 */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>메뉴 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 가게 선택 */}
              <div>
                <Label htmlFor="store">가게 선택 *</Label>
                <select
                  id="store"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={formData.storeId}
                  onChange={(e) => setFormData({...formData, storeId: e.target.value})}
                  required
                >
                  <option value="">가게를 선택하세요</option>
                  {mockStores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 메뉴명 */}
              <div>
                <Label htmlFor="name">메뉴명 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="예: 김치찌개"
                  required
                />
              </div>

              {/* 카테고리 */}
              <div>
                <Label htmlFor="category">카테고리 *</Label>
                <select
                  id="category"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="메인요리">메인요리</option>
                  <option value="사이드">사이드</option>
                  <option value="찌개류">찌개류</option>
                  <option value="면류">면류</option>
                  <option value="밥류">밥류</option>
                  <option value="음료">음료</option>
                  <option value="디저트">디저트</option>
                </select>
              </div>

              {/* 가격 */}
              <div>
                <Label htmlFor="price">가격 *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="예: 8000"
                  required
                />
              </div>

              {/* 설명 */}
              <div>
                <Label htmlFor="description">메뉴 설명</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="메뉴에 대한 설명을 작성해주세요"
                  rows={4}
                />
              </div>

              {/* 주요 재료 */}
              <div>
                <Label>주요 재료</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="재료명 입력"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addIngredient();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={addIngredient}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.ingredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 bg-secondary px-2 py-1 rounded"
                      >
                        <span className="text-sm">{ingredient}</span>
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 이미지 업로드 */}
              <div>
                <Label>메뉴 사진 (최대 5개)</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <span className="mt-2 text-sm text-muted-foreground">
                        클릭하여 이미지 업로드
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`메뉴 이미지 ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 버튼 */}
          <div className="flex space-x-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button type="submit" className="flex-1">
              메뉴 등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}