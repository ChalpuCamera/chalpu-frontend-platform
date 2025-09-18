"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Camera, Upload, CheckCircle } from "lucide-react";

function AddFeedbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get("foodId");
  
  const [step, setStep] = useState(1); // 1: 영수증, 2: 피드백 작성, 3: 완료
  const [formData, setFormData] = useState({
    reorderIntention: "",
    recommendationScore: "",
    textFeedback: "",
    receiptImage: null as File | null,
    foodPhotos: [] as File[]
  });

  // Mock 메뉴 데이터 (실제로는 foodId로 fetch)
  const mockMenu = {
    foodId: foodId || "1",
    name: "김치찌개",
    storeName: "맛있는 한식당",
    price: 8000
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receiptImage: e.target.files[0] });
    }
  };

  const handleFoodPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setFormData({ 
        ...formData, 
        foodPhotos: [...formData.foodPhotos, ...newPhotos].slice(0, 3)
      });
    }
  };

  const handleSubmit = async () => {
    // TODO: API 호출하여 피드백 제출
    console.log("Submitting feedback:", formData);
    setStep(3);
  };

  const handleComplete = () => {
    router.push("/customer");
  };

  if (step === 3) {
    // 완료 화면
    return (
      <div className="min-h-screen bg-background p-5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">피드백 완료!</h2>
            <p className="text-muted-foreground mb-6">
              소중한 의견 감사합니다.<br />
              리워드 포인트가 적립되었습니다.
            </p>
            <div className="p-4 bg-muted rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">적립 포인트</p>
              <p className="text-2xl font-bold text-primary">+1 포인트</p>
            </div>
            <Button className="w-full" onClick={handleComplete}>
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">피드백 작성</h1>
            <p className="text-muted-foreground">
              {mockMenu.name} · {mockMenu.storeName}
            </p>
          </div>
        </div>

        {/* 진행 표시 */}
        <div className="flex justify-between items-center">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
          <div className="w-4" />
          <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        </div>

        {step === 1 ? (
          // Step 1: 영수증 인증
          <Card>
            <CardHeader>
              <CardTitle>영수증 인증</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                실제 구매를 확인하기 위해 영수증을 업로드해주세요.
              </p>
              
              {formData.receiptImage ? (
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium mb-2">업로드된 영수증</p>
                  <p className="text-sm text-muted-foreground">{formData.receiptImage.name}</p>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      영수증 사진을 업로드하세요
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleReceiptUpload}
                  />
                </label>
              )}

              <Button 
                className="w-full" 
                disabled={!formData.receiptImage}
                onClick={() => setStep(2)}
              >
                다음 단계
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Step 2: 피드백 작성
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>만족도 평가</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>재주문 의향 (1-10)</Label>
                  <RadioGroup
                    value={formData.reorderIntention}
                    onValueChange={(value) => setFormData({ ...formData, reorderIntention: value })}
                  >
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {[...Array(10)].map((_, i) => (
                        <div key={i + 1} className="flex flex-col items-center">
                          <RadioGroupItem value={(i + 1).toString()} id={`reorder-${i + 1}`} />
                          <Label htmlFor={`reorder-${i + 1}`} className="mt-1 text-xs">
                            {i + 1}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>추천 점수 (1-10)</Label>
                  <RadioGroup
                    value={formData.recommendationScore}
                    onValueChange={(value) => setFormData({ ...formData, recommendationScore: value })}
                  >
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {[...Array(10)].map((_, i) => (
                        <div key={i + 1} className="flex flex-col items-center">
                          <RadioGroupItem value={(i + 1).toString()} id={`recommend-${i + 1}`} />
                          <Label htmlFor={`recommend-${i + 1}`} className="mt-1 text-xs">
                            {i + 1}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>상세 피드백</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feedback">자유롭게 의견을 작성해주세요</Label>
                  <Textarea
                    id="feedback"
                    placeholder="맛, 양, 서비스 등에 대한 솔직한 의견을 들려주세요..."
                    value={formData.textFeedback}
                    onChange={(e) => setFormData({ ...formData, textFeedback: e.target.value })}
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>음식 사진 (선택사항)</Label>
                  <p className="text-xs text-muted-foreground mb-2">최대 3장까지 업로드 가능</p>
                  
                  {formData.foodPhotos.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {formData.foodPhotos.map((photo, index) => (
                        <div key={index} className="p-2 border rounded text-xs">
                          사진 {index + 1}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {formData.foodPhotos.length < 3 && (
                    <label>
                      <div className="border rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50">
                        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-1" />
                        <p className="text-sm text-muted-foreground">사진 추가</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFoodPhotoUpload}
                      />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setStep(1)}
              >
                이전
              </Button>
              <Button 
                className="flex-1"
                disabled={!formData.textFeedback}
                onClick={handleSubmit}
              >
                제출하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AddFeedbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddFeedbackContent />
    </Suspense>
  );
}