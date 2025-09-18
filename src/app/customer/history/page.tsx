"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle } from "lucide-react";

// Mock 데이터
const mockFeedbackHistory = {
  selected: [
    {
      id: 1,
      menu: "김치찌개",
      restaurant: "김밥천국",
      selectedDate: "2024.01.09",
      status: "pending",
      dueDate: "2024.01.11"
    },
    {
      id: 2,
      menu: "된장찌개",
      restaurant: "맛있는 식당",
      selectedDate: "2024.01.08",
      status: "completed",
      completedDate: "2024.01.09"
    }
  ],
  completed: [
    {
      id: 3,
      menu: "제육볶음",
      restaurant: "한식당",
      date: "2024.01.07",
      feedback: "맛있었어요! 양도 많고 좋았습니다."
    },
    {
      id: 4,
      menu: "비빔밥",
      restaurant: "전주식당",
      date: "2024.01.05",
      feedback: "야채가 신선했어요"
    }
  ]
};

export default function FeedbackHistoryPage() {
  return (
    <div className="min-h-screen bg-background p-5">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* 헤더 */}
        <h1 className="text-2xl font-bold">피드백 내역</h1>

        <Tabs defaultValue="selected" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="selected">선택한 메뉴</TabsTrigger>
            <TabsTrigger value="completed">작성 완료</TabsTrigger>
          </TabsList>

          {/* 선택한 메뉴 탭 */}
          <TabsContent value="selected" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">피드백 대기중</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFeedbackHistory.selected.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-3">
                          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                            🍲
                          </div>
                          <div>
                            <p className="font-medium">{item.menu}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.restaurant}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              선택일: {item.selectedDate}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {item.status === "pending" ? (
                            <Badge variant="outline" className="mb-2">
                              <Clock className="mr-1 h-3 w-3" />
                              대기중
                            </Badge>
                          ) : (
                            <Badge variant="default" className="mb-2">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              완료
                            </Badge>
                          )}
                          {item.dueDate && (
                            <p className="text-xs text-muted-foreground">
                              마감: {item.dueDate}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 작성 완료 탭 */}
          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">작성한 피드백</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFeedbackHistory.completed.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{item.menu}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.restaurant} · {item.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}