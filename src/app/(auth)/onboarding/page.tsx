"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

const onboardingSteps = [
  {
    title: "🎉 환영합니다!",
    image: "📱",
    description: [
      "음식에 대한 솔직한 피드백을 통해",
      "더 나은 맛을 만들어가는 서비스입니다.",
      "",
      "• 메뉴 선택 후 피드백 작성",
      "• 리워드 적립 및 교환",
      "• 사장님께 직접 전달되는 의견"
    ]
  },
  {
    title: "🍜 피드백 작성하기",
    image: "✍️",
    description: [
      "메뉴를 선택하고 주문 후",
      "솔직한 피드백을 남겨주세요.",
      "",
      "• 맛, 양, 가격 평가",
      "• 사진 업로드",
      "• 사장님께 한마디"
    ]
  },
  {
    title: "🎁 리워드 받기",
    image: "💰",
    description: [
      "피드백을 작성하면",
      "리워드가 적립됩니다.",
      "",
      "• 5회 적립 시 상품권 교환",
      "• CU, GS25 등 편의점 상품권",
      "• 누적 적립 가능"
    ]
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    // TODO: 온보딩 완료 처리 및 메인 페이지로 이동
    console.log("Onboarding completed");
    router.push("/");
  };

  const step = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md space-y-6">
        {/* 이미지 영역 */}
        <Card className="h-64 flex items-center justify-center bg-muted">
          <div className="text-6xl">{step.image}</div>
        </Card>

        {/* 제목 */}
        <h1 className="text-2xl font-bold">{step.title}</h1>

        {/* 설명 */}
        <div className="space-y-1">
          {step.description.map((line, index) => (
            <p key={index} className="text-muted-foreground">
              {line || "\u00A0"}
            </p>
          ))}
        </div>

        {/* 진행 표시 */}
        <div className="flex justify-center space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* 버튼 */}
        <div className="flex justify-between space-x-4">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            건너뛰기
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep === onboardingSteps.length - 1 ? "🚀 시작하기" : "다음"}
          </Button>
        </div>
      </div>
    </div>
  );
}