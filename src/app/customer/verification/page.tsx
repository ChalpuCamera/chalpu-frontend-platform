"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Camera, Image as ImageIcon, Upload } from "lucide-react";
import { useUploadFeedbackPhotos } from "@/lib/hooks/useCustomerFeedback";
import { toast } from "sonner";

function OrderVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get("foodId");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const uploadPhotos = useUploadFeedbackPhotos();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileUpload(file);
    };
    input.click();
  };

  const handleGallerySelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileUpload(file);
    };
    input.click();
  };

  const handleSubmit = async () => {
    if (uploadedFile && foodId) {
      uploadPhotos.mutate(
        [uploadedFile],
        {
          onSuccess: (photoUrls) => {
            // 영수증 업로드 성공 시 설문 페이지로 이동하며 photoUrl 전달
            const receiptUrl = photoUrls[0];
            router.push(`/customer/feedback/survey?foodId=${foodId}&receiptUrl=${encodeURIComponent(receiptUrl)}`);
          },
          onError: () => {
            toast.error("영수증 업로드에 실패했습니다. 다시 시도해주세요.");
          }
        }
      );
    }
  };

  const handleStartSurvey = () => {
    router.push(`/customer/feedback/survey?foodId=${foodId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-8 p-5 pb-8 pt-16 mx-auto max-w-md">
        <div>
          <h1 className="text-2xl font-bold mb-2">📄 주문 인증</h1>
          <p className="text-base text-muted-foreground">
            실제 주문을 하셨는지 확인하기 위해<br />
            영수증 사진 캡쳐본을 업로드해주세요
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            캡쳐본은 배달중 또는 배달 완료 표시가 나온 화면을 업로드해주세요
          </p>
        </div>

        {/* 업로드 영역 */}
        <Card className="border-2 border-foreground">
          <CardContent className="p-0">
            <div className="h-64 bg-muted/50 flex flex-col items-center justify-center gap-4">
              {previewUrl ? (
                <div className="w-full h-full p-4">
                  <Image
                    src={previewUrl}
                    alt="Uploaded receipt"
                    width={256}
                    height={256}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-semibold text-base mb-2">
                      영수증 사진 또는 캡쳐본 업로드
                    </p>
                    <p className="text-sm text-muted-foreground">
                      카메라로 촬영하거나<br />
                      갤러리에서 선택해주세요
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 업로드 버튼들 */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCameraCapture}
            className="flex-1 h-11 border-2 border-foreground"
          >
            <Camera className="mr-2 h-4 w-4" />
            📷 카메라 촬영
          </Button>
          <Button
            variant="outline"
            onClick={handleGallerySelect}
            className="flex-1 h-11 border border-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            🖼️ 갤러리 선택
          </Button>
        </div>

        {/* 제출 버튼 */}
        <div className="flex flex-col gap-3">
          {uploadedFile && (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={uploadPhotos.isPending}
              className="w-full border-2 border-foreground"
              variant="outline"
            >
              {uploadPhotos.isPending ? "업로드 중..." : "제출"}
            </Button>
          )}

          <Button
            size="lg"
            onClick={handleStartSurvey}
            disabled={uploadPhotos.isPending}
            className="w-full border-2 border-foreground"
            variant="outline"
          >
            설문 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrderVerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <OrderVerificationContent />
    </Suspense>
  );
}