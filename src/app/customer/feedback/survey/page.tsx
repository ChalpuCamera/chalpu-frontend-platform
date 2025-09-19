"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeedbackSurvey, useCreateCustomerFeedback } from "@/lib/hooks/useCustomerFeedback";
import { toast } from "sonner";

function FeedbackSurveyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get("foodId");
  const receiptUrl = searchParams.get("receiptUrl");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const { data: surveyData, isLoading, isError } = useFeedbackSurvey(
    foodId ? parseInt(foodId) : 0
  );
  const submitFeedback = useCreateCustomerFeedback();

  const handleSliderChange = (value: number[]) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value[0]
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (!surveyData || !surveyData.questions) return;

    if (currentQuestion < surveyData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 마지막 질문인 경우 피드백 제출
      if (foodId) {
        const feedbackData = {
          foodId: parseInt(foodId),
          surveyAnswers: Object.entries(answers).map(([questionIdx, value]) => ({
            questionId: surveyData.questions[parseInt(questionIdx)].id,
            score: value
          })),
          photoS3Keys: receiptUrl ? [receiptUrl] : undefined
        };

        submitFeedback.mutate(feedbackData, {
          onSuccess: () => {
            router.push(`/customer/feedback/complete?foodId=${foodId}`);
          },
          onError: () => {
            toast.error("피드백 제출에 실패했습니다.");
          }
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-6 p-5 pt-16 mx-auto max-w-md">
          <Skeleton className="h-[500px] w-full" />
          <div className="flex justify-between gap-4">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !surveyData || !surveyData.questions || surveyData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-center text-muted-foreground mb-4">
            설문 질문을 불러오는데 실패했습니다
          </p>
          <Button onClick={() => router.back()} className="w-full">
            돌아가기
          </Button>
        </Card>
      </div>
    );
  }

  const question = surveyData.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion] || 50;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-5 pt-16 mx-auto max-w-md">
        {/* 설문 카드 */}
        <Card className="border border-foreground rounded-xl">
          <CardContent className="p-6 flex flex-col items-center gap-5 min-h-[500px] justify-center">
            <h2 className="text-xl font-bold">피드백 설문</h2>
            <p className="text-sm text-muted-foreground">{question.category}</p>
            <p className="text-xs text-muted-foreground">
              {currentQuestion + 1} / {surveyData.questions.length}
            </p>

            <p className="text-base font-semibold text-center whitespace-pre-line mt-4">
              {question.question}
            </p>

            {/* 슬라이더 카드 */}
            <Card className="w-full border border-foreground rounded-lg">
              <CardContent className="p-5">
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span>{question.leftLabel}</span>
                  <span>{question.rightLabel}</span>
                </div>

                <Slider
                  value={[currentAnswer]}
                  onValueChange={handleSliderChange}
                  max={100}
                  step={1}
                  className="w-full"
                />

                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    현재 값: {currentAnswer}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* 하단 버튼들 */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="w-24 border border-foreground rounded-lg"
          >
            이전
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined || submitFeedback.isPending}
            className="w-24 bg-foreground text-background rounded-lg"
          >
            {submitFeedback.isPending ? "제출 중..." :
             currentQuestion === surveyData.questions.length - 1 ? "완료" : "다음"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackSurveyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <FeedbackSurveyContent />
    </Suspense>
  );
}