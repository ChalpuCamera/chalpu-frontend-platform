"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FeedbackSuccessPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/customer/mypage");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col gap-6 p-5 mx-auto max-w-md w-full">
        <Card className="border-0 shadow-none p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold mb-2">피드백 완료!</h1>
          </div>

          <p className="text-base text-muted-foreground mb-8">
            소중한 피드백 감사합니다!<br />
            사장님께 전달되었습니다.<br />
            리워드 포인트가 적립되었어요!
          </p>

          <Button
            size="lg"
            onClick={handleComplete}
            className="w-full border-2 border-foreground"
            variant="outline"
          >
            완료
          </Button>
        </Card>
      </div>
    </div>
  );
}