import { apiClient } from '../client';
import type { ApiResponse, PageResponse, Pageable } from '@/lib/types/api/common';

export interface SurveyAnswer {
  questionId: number;
  score: number; // 1-100 scale for sliders
  textAnswer?: string;
}

export interface CustomerFeedbackRequest {
  foodId: number;
  surveyId?: number;
  photoS3Keys?: string[];
  surveyAnswers?: SurveyAnswer[];
  textFeedback?: string;
  reorderIntention?: number; // 1-5
  recommendationScore?: number; // 1-10
}

export interface CustomerFeedbackResponse {
  id: number;
  customerId: number;
  customerName: string;
  foodId: number;
  foodName: string;
  storeId: number;
  storeName: string;
  surveyAnswers?: SurveyAnswer[];
  textFeedback?: string;
  reorderIntention?: number;
  recommendationScore?: number;
  photoUrls?: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResponse {
  fileName: string;
  presignedUrl: string;
  s3Key: string;
}

export interface SurveyQuestion {
  id: number;
  question: string;
  category: string;
  leftLabel?: string;
  rightLabel?: string;
  type: 'SLIDER' | 'TEXT' | 'RATING';
}

export interface SurveyResponse {
  id: number;
  title: string;
  questions: SurveyQuestion[];
}

export const customerFeedbackApi = {
  // 피드백 생성
  createFeedback: (data: CustomerFeedbackRequest) =>
    apiClient.post<ApiResponse<CustomerFeedbackResponse>>(
      '/api/customer-feedback',
      data
    ),

  // 내 피드백 목록 조회
  getMyFeedbacks: (pageable: Pageable = {}) => {
    const params = {
      page: pageable.page ?? 0,
      size: pageable.size ?? 10,
      sort: pageable.sort ?? ['createdAt,desc'],
    };
    return apiClient.get<ApiResponse<PageResponse<CustomerFeedbackResponse>>>(
      '/api/customer-feedback/me',
      { params }
    );
  },

  // 피드백 상세 조회
  getFeedback: (feedbackId: number) =>
    apiClient.get<ApiResponse<CustomerFeedbackResponse>>(
      `/api/customer-feedback/${feedbackId}`
    ),

  // 음식별 피드백 조회
  getFeedbacksByFood: (foodId: number, pageable: Pageable = {}) => {
    const params = {
      page: pageable.page ?? 0,
      size: pageable.size ?? 10,
      sort: pageable.sort ?? ['createdAt,desc'],
    };
    return apiClient.get<ApiResponse<PageResponse<CustomerFeedbackResponse>>>(
      `/api/customer-feedback/food/${foodId}`,
      { params }
    );
  },

  // Presigned URL 생성 (사진 업로드용)
  getPresignedUrls: (requests: PresignedUrlRequest[]) =>
    apiClient.post<ApiResponse<PresignedUrlResponse[]>>(
      '/api/customer-feedback/presigned-urls',
      requests
    ),

  // 설문조사 질문 조회
  getSurvey: (foodId: number) =>
    apiClient.get<ApiResponse<SurveyResponse>>(
      `/api/customer-feedback/survey?foodId=${foodId}`
    ),

  // 피드백 수정
  updateFeedback: (feedbackId: number, data: Partial<CustomerFeedbackRequest>) =>
    apiClient.put<ApiResponse<CustomerFeedbackResponse>>(
      `/api/customer-feedback/${feedbackId}`,
      data
    ),

  // 피드백 삭제
  deleteFeedback: (feedbackId: number) =>
    apiClient.delete<ApiResponse<void>>(
      `/api/customer-feedback/${feedbackId}`
    ),
};