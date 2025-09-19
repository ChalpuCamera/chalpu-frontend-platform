"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateFeedback } from "@/lib/hooks/useCustomerFeedback";
import { toast } from "sonner";

function FeedbackCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get("foodId");

  const [message, setMessage] = useState("");
  const minLength = 30;

  const updateFeedback = useUpdateFeedback();

  const handleComplete = () => {
    if (message.length >= minLength && foodId) {
      // TODO: Get feedbackId from previous step or searchParams
      const feedbackId = searchParams.get("feedbackId");
      if (feedbackId) {
        updateFeedback.mutate(
          {
            feedbackId: parseInt(feedbackId),
            data: { textFeedback: message }
          },
          {
            onSuccess: () => {
              router.push("/customer/feedback/success");
            },
            onError: () => {
              toast.error("메시지 저장에 실패했습니다.");
            }
          }
        );
      } else {
        // If no feedbackId, skip the message and go to success
        router.push("/customer/feedback/success");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-5 pb-8 pt-16 mx-auto max-w-md">
        <div>
          <h1 className="text-2xl font-bold mb-2">💬 사장님께 한마디</h1>
          <p className="text-base text-muted-foreground">
            소중한 피드백 감사합니다!<br />
            사장님께 전하고 싶은 메시지를<br />
            자유롭게 남겨주세요.
          </p>
        </div>

        {/* 텍스트 입력 영역 */}
        <Card className="border-2 border-foreground">
          <CardContent className="p-4">
            <Textarea
              placeholder={`예) 정말 맛있게 잘 먹었습니다!\n다음에도 꼭 재방문하겠어요.\n김치찌개 국물이 진짜 끝내줘요~\n\n(30자 이상 작성해주세요)`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px] border-0 resize-none focus:ring-0 text-sm"
            />

            {/* 글자수 카운터 */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t">
              <span className="text-xs text-muted-foreground">
                최소 30자 이상
              </span>
              <span className={`text-xs font-semibold ${
                message.length >= minLength ? "text-green-600" : "text-muted-foreground"
              }`}>
                {message.length} / 30자
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 완료 버튼 */}
        <Button
          size="lg"
          onClick={handleComplete}
          disabled={message.length < minLength || updateFeedback.isPending}
          className="w-full border-2 border-foreground"
          variant={message.length >= minLength ? "default" : "outline"}
        >
          {updateFeedback.isPending ? "저장 중..." : "✅ 피드백 완료하기"}
        </Button>
      </div>
    </div>
  );
}

export default function FeedbackCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <FeedbackCompleteContent />
    </Suspense>
  );
}