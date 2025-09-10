"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Edit, 
  BarChart3, 
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  Image as ImageIcon
} from "lucide-react";

// Mock 메뉴 상세 데이터
const mockMenuDetail = {
  id: "1",
  name: "김치찌개",
  price: 8000,
  category: "찌개류",
  description: "정성스럽게 끓인 김치찌개입니다. 신김치와 돼지고기가 들어가 깊은 맛을 냅니다.",
  ingredients: ["신김치", "돼지고기", "두부", "대파", "양파", "마늘"],
  restaurant: {
    id: "1",
    name: "맛있는 한식당"
  },
  isActive: true,
  createdAt: "2024.01.01",
  
  // 통계
  stats: {
    totalFeedbacks: 45,
    pendingFeedbacks: 3,
    thisMonthFeedbacks: 12,
    averageReorderIntention: 8.5,
    averageRecommendation: 8.2
  },
  
  // 이미지
  images: ["image1.jpg", "image2.jpg"]
};

// Mock 최근 피드백
const mockRecentFeedbacks = [
  {
    id: "1",
    customerName: "김고객",
    reorderIntention: 9,
    recommendationScore: 9,
    textFeedback: "정말 맛있었어요! 김치가 잘 익어서 깊은 맛이 났습니다.",
    createdAt: "2024.01.09 14:30",
    hasReceipt: true,
    photoCount: 2
  },
  {
    id: "2",
    customerName: "이손님",
    reorderIntention: 8,
    recommendationScore: 7,
    textFeedback: "양도 많고 좋았어요. 김치가 조금 더 익었으면 좋겠어요.",
    createdAt: "2024.01.08 12:15",
    hasReceipt: true,
    photoCount: 1
  },
  {
    id: "3",
    customerName: "박고객",
    reorderIntention: 10,
    recommendationScore: 10,
    textFeedback: "진짜 맛있어요! 자주 시켜먹을 것 같아요.",
    createdAt: "2024.01.07 11:00",
    hasReceipt: true,
    photoCount: 0
  }
];

export default function MenuDetailPage({ 
  params 
}: { 
  params: { foodId: string } 
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{mockMenuDetail.name}</h1>
              <p className="text-muted-foreground">{mockMenuDetail.restaurant.name}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/owner/menu/${params.foodId}/analytics`)}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              통계 분석
            </Button>
            <Button
              onClick={() => router.push(`/owner/menu/${params.foodId}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              수정
            </Button>
          </div>
        </div>

        {/* 메뉴 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>메뉴 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 메뉴 이미지 */}
              <div className="grid grid-cols-2 gap-4">
                {mockMenuDetail.images.map((_, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🍲</span>
                  </div>
                ))}
              </div>

              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">카테고리</p>
                  <p className="font-medium">{mockMenuDetail.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">가격</p>
                  <p className="font-medium">{mockMenuDetail.price.toLocaleString()}원</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">상태</p>
                  <Badge variant={mockMenuDetail.isActive ? "default" : "destructive"}>
                    {mockMenuDetail.isActive ? "판매중" : "판매중지"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">등록일</p>
                  <p className="font-medium">{mockMenuDetail.createdAt}</p>
                </div>
              </div>

              {/* 설명 */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">메뉴 설명</p>
                <p className="text-sm">{mockMenuDetail.description}</p>
              </div>

              {/* 재료 */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">주요 재료</p>
                <div className="flex flex-wrap gap-2">
                  {mockMenuDetail.ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 요약 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">총 피드백</p>
                  <p className="text-2xl font-bold">{mockMenuDetail.stats.totalFeedbacks}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">이번달</p>
                  <p className="text-2xl font-bold">{mockMenuDetail.stats.thisMonthFeedbacks}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">재주문 의향</p>
                  <p className="text-2xl font-bold">{mockMenuDetail.stats.averageReorderIntention}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* 최근 피드백 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>최근 피드백</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push(`/owner/feedbacks?menuId=${params.foodId}`)}
              >
                전체 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentFeedbacks.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{feedback.customerName}님</p>
                      <p className="text-xs text-muted-foreground">{feedback.createdAt}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {feedback.hasReceipt && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          인증
                        </Badge>
                      )}
                      {feedback.photoCount > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <ImageIcon className="mr-1 h-3 w-3" />
                          {feedback.photoCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm mb-2">&ldquo;{feedback.textFeedback}&rdquo;</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>재주문 의향: {feedback.reorderIntention}/10</span>
                    <span>추천 점수: {feedback.recommendationScore}/10</span>
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