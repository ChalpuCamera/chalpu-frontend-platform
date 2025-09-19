import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { customerFoodApi, type FoodSearchParams } from '@/lib/api/customer/customerFood';
import type { Pageable } from '@/lib/types/api/common';

// Query Keys
export const customerFoodKeys = {
  all: ['customerFoods'] as const,
  lists: () => [...customerFoodKeys.all, 'list'] as const,
  list: (filters: FoodSearchParams) => [...customerFoodKeys.lists(), filters] as const,
  details: () => [...customerFoodKeys.all, 'detail'] as const,
  detail: (id: number) => [...customerFoodKeys.details(), id] as const,
  popular: () => [...customerFoodKeys.all, 'popular'] as const,
  categories: () => [...customerFoodKeys.all, 'categories'] as const,
  byStore: (storeId: number, filters?: Pageable) =>
    [...customerFoodKeys.all, 'store', storeId, filters ?? {}] as const,
};

// 전체 메뉴 목록 조회
export function useAllFoods(params: FoodSearchParams = {}) {
  return useQuery({
    queryKey: customerFoodKeys.list(params),
    queryFn: async () => {
      const response = await customerFoodApi.getAllFoods(params);
      return response.result;
    },
  });
}

// 무한 스크롤을 위한 메뉴 목록 조회
export function useInfiniteFoods(params: Omit<FoodSearchParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: [...customerFoodKeys.lists(), 'infinite', params],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await customerFoodApi.getAllFoods({
        ...params,
        page: pageParam,
        size: params.size || 20,
      });
      return response.result;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 0,
  });
}

// 메뉴 상세 조회
export function useCustomerFoodDetail(foodId: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: customerFoodKeys.detail(foodId),
    queryFn: async () => {
      const response = await customerFoodApi.getFoodDetail(foodId);
      return response.result;
    },
    enabled: options?.enabled ?? !!foodId,
  });
}

// 인기 메뉴 조회
export function usePopularFoods(limit: number = 10) {
  return useQuery({
    queryKey: [...customerFoodKeys.popular(), limit],
    queryFn: async () => {
      const response = await customerFoodApi.getPopularFoods(limit);
      return response.result;
    },
  });
}

// 카테고리 목록 조회
export function useFoodCategories() {
  return useQuery({
    queryKey: customerFoodKeys.categories(),
    queryFn: async () => {
      const response = await customerFoodApi.getCategories();
      return response.result;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// 매장별 메뉴 조회
export function useFoodsByStore(storeId: number, pageable: Pageable = {}) {
  return useQuery({
    queryKey: customerFoodKeys.byStore(storeId, pageable),
    queryFn: async () => {
      const response = await customerFoodApi.getFoodsByStore(storeId, pageable);
      return response.result;
    },
    enabled: !!storeId,
  });
}

// 검색 및 필터링 hook
export function useSearchFoods(searchTerm: string, category?: string, enabled = true) {
  return useQuery({
    queryKey: customerFoodKeys.list({ search: searchTerm, category }),
    queryFn: async () => {
      const response = await customerFoodApi.getAllFoods({
        search: searchTerm,
        category,
        size: 50,
      });
      return response.result;
    },
    enabled: enabled && searchTerm.length > 0,
  });
}