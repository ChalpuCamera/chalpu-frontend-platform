import { apiClient } from '../client';
import type { ApiResponse } from '@/lib/types/api/common';

// Customer Taste Profile Types
export interface CustomerTasteDto {
  spiceLevel?: number; // 1-5 scale
  portionSize?: number; // 1-5 scale
  priceRange?: number; // 1-5 scale
}

export interface CustomerProfileResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  totalFeedbacks: number;
  totalRewards: number;
  currentRewardBalance: number;
  tasteProfile?: CustomerTasteDto;
}

export const customerApi = {
  // 고객 프로필 조회
  getProfile: () =>
    apiClient.get<ApiResponse<CustomerProfileResponse>>('/api/users/me'),

  // 고객 취향 정보 조회
  getCustomerTaste: () =>
    apiClient.get<ApiResponse<CustomerTasteDto>>('/api/users/me/taste'),

  // 고객 취향 정보 수정
  updateCustomerTaste: (data: CustomerTasteDto) =>
    apiClient.put<ApiResponse<CustomerTasteDto>>('/api/users/me/taste', data),

  // 고객 정보 수정
  updateProfile: (data: Partial<CustomerProfileResponse>) =>
    apiClient.put<ApiResponse<CustomerProfileResponse>>('/api/users/me', data),
};