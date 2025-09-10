"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Users, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock 데이터
const mockMenuData = {
  id: "1",
  name: "김치찌개",
  price: 8000,
  category: "찌개류", 
  description: "정성스럽게 끓인 김치찌개입니다. 신김치와 돼지고기가 들어가 깊은 맛을 냅니다. 집에서 직접 담근 김치를 사용하여 더욱 특별한 맛을 선사합니다.",
  restaurant: {
    id: "1",
    name: "맛있는 한식당"
  },
  feedbackCount: 45,
  images: ["kimchi1.jpg", "kimchi2.jpg"],
  ingredients: ["신김치", "돼지고기", "두부", "대파", "양파", "마늘"],
  nutritionInfo: {
    calories: "약 320kcal",
    servingSize: "1인분"
  }
};

const mockFeedbacks = [
  {
    id: "1",
    customerName: "김고객",
    textFeedback: "정말 맛있었어요! 김치가 잘 익어서 깊은 맛이 났습니다. 집에서 먹는 것처럼 정말 맛있어요.",
    spiceTolerance: 4,
    portionPreference: 4,
    createdAt: "2024.01.09"
  },
  {
    id: "2",
    customerName: "이손님",
    textFeedback: "양도 많고 좋았어요. 다음에도 주문할게요. 김치가 조금 더 익었으면 더 좋을 것 같아요.",
    spiceTolerance: 3,
    portionPreference: 5,
    createdAt: "2024.01.08"
  },
  {
    id: "3",
    customerName: "박고객",
    textFeedback: "진짜 맛있어요! 사장님이 정성스럽게 만드신 게 느껴집니다. 재료도 신선하고 좋네요.",
    spiceTolerance: 4,
    portionPreference: 4,
    createdAt: "2024.01.07"
  },
  {
    id: "4",
    customerName: "최고객",
    textFeedback: "조금 짜긴 했지만 전체적으로 만족스러웠습니다. 김치의 신맛이 좋았어요.",
    spiceTolerance: 3,
    portionPreference: 3,
    createdAt: "2024.01.06"
  }
];

export default function CustomerMenuDetailPage({ 
  params 
}: { 
  params: { foodId: string } 
}) {
  const router = useRouter();

  const handleSelectForFeedback = () => {
    router.push(`/customer/feedback/add?foodId=${params.foodId}`);
  };

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-4xl mx-auto space-y-6">
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
            <h1 className="text-2xl font-bold">{mockMenuData.name}</h1>
            <p className="text-muted-foreground">{mockMenuData.restaurant.name}</p>
          </div>
        </div>

        {/* 메뉴 기본 정보 */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* 메뉴 사진 */}
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-6xl">🍲</span>
              </div>

              {/* 메뉴 정보 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h2 className="text-2xl font-bold">{mockMenuData.name}</h2>
                      <Badge variant="outline">{mockMenuData.category}</Badge>
                    </div>
                    <p className="text-3xl font-bold text-primary">{mockMenuData.price.toLocaleString()}원</p>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="default" className="mb-2">
                      피드백 가능
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      피드백 {mockMenuData.feedbackCount}개
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed">{mockMenuData.description}</p>

                {/* 재료 정보 */}
                <div>
                  <h3 className="font-medium mb-2">주요 재료</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockMenuData.ingredients.map((ingredient) => (
                      <Badge key={ingredient} variant="secondary">{ingredient}</Badge>
                    ))}
                  </div>
                </div>

                {/* 영양 정보 */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">칼로리</p>
                    <p className="font-medium">{mockMenuData.nutritionInfo.calories}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">제공량</p>
                    <p className="font-medium">{mockMenuData.nutritionInfo.servingSize}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 정보 */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold">{mockMenuData.feedbackCount}</span>
            </div>
            <p className="text-sm text-muted-foreground">총 피드백</p>
          </CardContent>
        </Card>

        {/* 피드백 선택 버튼 */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">이 메뉴를 드셨나요?</h3>
                <p className="text-sm text-muted-foreground">
                  피드백을 작성하고 리워드를 받으세요!
                </p>
              </div>
              
              <Button 
                onClick={handleSelectForFeedback}
                className="w-full max-w-sm"
                size="lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                피드백 작성하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 최근 피드백 */}
        <Card>
          <CardHeader>
            <CardTitle>최근 피드백</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFeedbacks.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">{feedback.customerName}님</p>
                      <p className="text-sm text-muted-foreground">{feedback.createdAt}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3">&ldquo;{feedback.textFeedback}&rdquo;</p>
                  
                  {/* 맛 취향 정보 */}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>매운맛 {feedback.spiceTolerance}/5</span>
                    <span>양 선호도 {feedback.portionPreference}/5</span>
                  </div>
                </div>
              ))}
            </div>
            
            {mockFeedbacks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">아직 피드백이 없습니다.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  첫 번째 피드백을 남겨보세요!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}