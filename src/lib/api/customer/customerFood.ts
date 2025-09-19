import { apiClient } from '../client';
import type { ApiResponse, PageResponse, Pageable } from '@/lib/types/api/common';
import type { FoodItemResponse } from '@/lib/types/api/food';

export interface CustomerFoodResponse extends FoodItemResponse {
  storeName: string;
  storeAddress?: string;
  feedbackCount: number;
  averageRating?: number;
  isAvailableForFeedback: boolean;
  hasSubmittedFeedback: boolean;
}

export interface FoodSearchParams extends Pageable {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  storeId?: number;
}

export const customerFoodApi = {
  // 전체 메뉴 목록 조회 (고객용)
  getAllFoods: (params: FoodSearchParams = {}) => {
    const queryParams = {
      page: params.page ?? 0,
      size: params.size ?? 20,
      sort: params.sort ?? ['createdAt,desc'],
      ...(params.search && { search: params.search }),
      ...(params.category && { category: params.category }),
      ...(params.minPrice && { minPrice: params.minPrice }),
      ...(params.maxPrice && { maxPrice: params.maxPrice }),
      ...(params.storeId && { storeId: params.storeId }),
    };

    return apiClient.get<ApiResponse<PageResponse<CustomerFoodResponse>>>(
      '/api/foods',
      { params: queryParams }
    );
  },

  // 메뉴 상세 조회 (고객용)
  getFoodDetail: (foodId: number) =>
    apiClient.get<ApiResponse<CustomerFoodResponse>>(`/api/foods/${foodId}/customer`),

  // 인기 메뉴 조회
  getPopularFoods: (limit: number = 10) =>
    apiClient.get<ApiResponse<CustomerFoodResponse[]>>(
      `/api/foods/popular?limit=${limit}`
    ),

  // 카테고리 목록 조회
  getCategories: () =>
    apiClient.get<ApiResponse<string[]>>('/api/foods/categories'),

  // 매장별 메뉴 조회
  getFoodsByStore: (storeId: number, pageable: Pageable = {}) => {
    const params = {
      page: pageable.page ?? 0,
      size: pageable.size ?? 10,
      sort: pageable.sort ?? ['createdAt,desc'],
    };
    return apiClient.get<ApiResponse<PageResponse<CustomerFoodResponse>>>(
      `/api/foods/store/${storeId}/customer`,
      { params }
    );
  },
};