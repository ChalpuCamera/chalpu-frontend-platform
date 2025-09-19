import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  customerFeedbackApi,
  type CustomerFeedbackRequest,
  type PresignedUrlRequest,
} from '@/lib/api/customer/customerFeedback';
import { apiClient } from '@/lib/api/client';
import type { Pageable } from '@/lib/types/api/common';
import { toast } from 'sonner';

// Query Keys
export const customerFeedbackKeys = {
  all: ['customerFeedback'] as const,
  lists: () => [...customerFeedbackKeys.all, 'list'] as const,
  myList: (filters?: Pageable) => [...customerFeedbackKeys.lists(), 'me', filters ?? {}] as const,
  details: () => [...customerFeedbackKeys.all, 'detail'] as const,
  detail: (id: number) => [...customerFeedbackKeys.details(), id] as const,
  byFood: (foodId: number, filters?: Pageable) =>
    [...customerFeedbackKeys.all, 'food', foodId, filters ?? {}] as const,
  survey: (foodId: number) => [...customerFeedbackKeys.all, 'survey', foodId] as const,
};

// 피드백 생성
export function useCreateCustomerFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustomerFeedbackRequest) => {
      const response = await customerFeedbackApi.createFeedback(data);
      return response.result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: customerFeedbackKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerFeedbackKeys.byFood(data.foodId) });
      // 리워드 관련 쿼리도 무효화
      queryClient.invalidateQueries({ queryKey: ['customerRewards'] });
      toast.success('피드백이 제출되었습니다! 포인트가 적립되었어요.');
    },
    onError: () => {
      toast.error('피드백 제출에 실패했습니다');
    },
  });
}

// 내 피드백 목록 조회
export function useMyFeedbacks(pageable: Pageable = {}) {
  return useQuery({
    queryKey: customerFeedbackKeys.myList(pageable),
    queryFn: async () => {
      const response = await customerFeedbackApi.getMyFeedbacks(pageable);
      return response.result;
    },
  });
}

// 무한 스크롤을 위한 내 피드백 목록
export function useInfiniteMyFeedbacks(size: number = 10) {
  return useInfiniteQuery({
    queryKey: [...customerFeedbackKeys.lists(), 'infinite', 'me'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await customerFeedbackApi.getMyFeedbacks({
        page: pageParam,
        size,
        sort: ['createdAt,desc'],
      });
      return response.result;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 0,
  });
}

// 피드백 상세 조회
export function useFeedbackDetail(feedbackId: number) {
  return useQuery({
    queryKey: customerFeedbackKeys.detail(feedbackId),
    queryFn: async () => {
      const response = await customerFeedbackApi.getFeedback(feedbackId);
      return response.result;
    },
    enabled: !!feedbackId,
  });
}

// 음식별 피드백 조회
export function useFeedbacksByFood(foodId: number, pageable: Pageable = {}) {
  return useQuery({
    queryKey: customerFeedbackKeys.byFood(foodId, pageable),
    queryFn: async () => {
      const response = await customerFeedbackApi.getFeedbacksByFood(foodId, pageable);
      return response.result;
    },
    enabled: !!foodId,
  });
}

// 설문조사 질문 조회
export function useFeedbackSurvey(foodId: number) {
  return useQuery({
    queryKey: customerFeedbackKeys.survey(foodId),
    queryFn: async () => {
      const response = await customerFeedbackApi.getSurvey(foodId);
      return response.result;
    },
    enabled: !!foodId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

// 사진 업로드를 위한 Presigned URL 생성
export function useGetPresignedUrls() {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const requests: PresignedUrlRequest[] = files.map(file => ({
        fileName: file.name,
        contentType: file.type,
      }));
      const response = await customerFeedbackApi.getPresignedUrls(requests);
      return response.result;
    },
  });
}

// 사진 업로드
export function useUploadFeedbackPhotos() {
  const getPresignedUrls = useGetPresignedUrls();

  return useMutation({
    mutationFn: async (files: File[]) => {
      // 1. Get presigned URLs
      const presignedData = await getPresignedUrls.mutateAsync(files);

      // 2. Upload files to S3
      const uploadPromises = presignedData.map((data, index) =>
        apiClient.uploadFile(data.presignedUrl, files[index])
      );
      await Promise.all(uploadPromises);

      // 3. Return S3 keys for feedback submission
      return presignedData.map(data => data.s3Key);
    },
    onError: () => {
      toast.error('사진 업로드에 실패했습니다');
    },
  });
}

// 피드백 수정
export function useUpdateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      feedbackId,
      data,
    }: {
      feedbackId: number;
      data: Partial<CustomerFeedbackRequest>;
    }) => {
      const response = await customerFeedbackApi.updateFeedback(feedbackId, data);
      return response.result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: customerFeedbackKeys.detail(variables.feedbackId) });
      queryClient.invalidateQueries({ queryKey: customerFeedbackKeys.lists() });
      toast.success('피드백이 수정되었습니다');
    },
    onError: () => {
      toast.error('피드백 수정에 실패했습니다');
    },
  });
}

// 피드백 삭제
export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feedbackId: number) => {
      await customerFeedbackApi.deleteFeedback(feedbackId);
    },
    onSuccess: (_, feedbackId) => {
      queryClient.invalidateQueries({ queryKey: customerFeedbackKeys.lists() });
      queryClient.removeQueries({ queryKey: customerFeedbackKeys.detail(feedbackId) });
      toast.success('피드백이 삭제되었습니다');
    },
    onError: () => {
      toast.error('피드백 삭제에 실패했습니다');
    },
  });
}