import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  customerRewardApi,
  type RewardBalance,
  type Voucher,
} from '@/lib/api/customer/customerReward';
import type { Pageable } from '@/lib/types/api/common';
import { toast } from 'sonner';

// Query Keys
export const customerRewardKeys = {
  all: ['customerRewards'] as const,
  balance: () => [...customerRewardKeys.all, 'balance'] as const,
  vouchers: () => [...customerRewardKeys.all, 'vouchers'] as const,
  myVouchers: (status?: string) => [...customerRewardKeys.all, 'myVouchers', status ?? 'ALL'] as const,
  transactions: (filters?: Pageable) => [...customerRewardKeys.all, 'transactions', filters ?? {}] as const,
  redemption: (id: number) => [...customerRewardKeys.all, 'redemption', id] as const,
  stats: () => [...customerRewardKeys.all, 'stats'] as const,
};

// 리워드 잔액 조회
export function useRewardBalance() {
  return useQuery({
    queryKey: customerRewardKeys.balance(),
    queryFn: async () => {
      const response = await customerRewardApi.getRewardBalance();
      return response.result;
    },
    refetchInterval: 1000 * 60, // Refresh every minute
  });
}

// 사용 가능한 상품권 목록
export function useAvailableVouchers() {
  return useQuery({
    queryKey: customerRewardKeys.vouchers(),
    queryFn: async () => {
      const response = await customerRewardApi.getAvailableVouchers();
      return response.result;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// 리워드 거래 내역
export function useRewardTransactions(pageable: Pageable = {}) {
  return useQuery({
    queryKey: customerRewardKeys.transactions(pageable),
    queryFn: async () => {
      const response = await customerRewardApi.getTransactionHistory(pageable);
      return response.result;
    },
  });
}

// 무한 스크롤을 위한 거래 내역
export function useInfiniteRewardTransactions(size: number = 20) {
  return useInfiniteQuery({
    queryKey: [...customerRewardKeys.all, 'transactions', 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await customerRewardApi.getTransactionHistory({
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

// 상품권 교환
export function useRedeemVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (voucherId: string) => {
      const response = await customerRewardApi.redeemVoucher(voucherId);
      return response.result;
    },
    onSuccess: (data) => {
      // 잔액 및 거래 내역 갱신
      queryClient.invalidateQueries({ queryKey: customerRewardKeys.balance() });
      queryClient.invalidateQueries({ queryKey: customerRewardKeys.transactions() });
      queryClient.invalidateQueries({ queryKey: customerRewardKeys.myVouchers() });

      toast.success(`${data.voucherName}이 성공적으로 교환되었습니다!`);
    },
    onError: (error: unknown) => {
      let message = '상품권 교환에 실패했습니다';
      if (error && typeof error === 'object' && 'response' in error) {
        const responseError = error as { response?: { data?: { message?: string } } };
        message = responseError.response?.data?.message || message;
      }
      toast.error(message);
    },
  });
}

// 내 상품권 목록
export function useMyVouchers(status?: 'ALL' | 'ACTIVE' | 'USED' | 'EXPIRED') {
  return useQuery({
    queryKey: customerRewardKeys.myVouchers(status),
    queryFn: async () => {
      const response = await customerRewardApi.getMyVouchers(status);
      return response.result;
    },
  });
}

// 특정 교환 내역 상세
export function useVoucherRedemption(redemptionId: number) {
  return useQuery({
    queryKey: customerRewardKeys.redemption(redemptionId),
    queryFn: async () => {
      const response = await customerRewardApi.getVoucherRedemption(redemptionId);
      return response.result;
    },
    enabled: !!redemptionId,
  });
}

// 리워드 통계
export function useRewardStats() {
  return useQuery({
    queryKey: customerRewardKeys.stats(),
    queryFn: async () => {
      const response = await customerRewardApi.getRewardStats();
      return response.result;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// 리워드 잔액 폴링 (실시간 업데이트)
export function useRewardBalanceWithPolling(enabled = false) {
  return useQuery({
    queryKey: customerRewardKeys.balance(),
    queryFn: async () => {
      const response = await customerRewardApi.getRewardBalance();
      return response.result;
    },
    refetchInterval: enabled ? 3000 : false, // 3초마다 폴링 (enabled일 때만)
  });
}

// 낙관적 업데이트를 위한 상품권 교환
export function useOptimisticRedeemVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (voucherId: string) => {
      const response = await customerRewardApi.redeemVoucher(voucherId);
      return response.result;
    },
    onMutate: async (voucherId) => {
      await queryClient.cancelQueries({ queryKey: customerRewardKeys.balance() });

      const previousBalance = queryClient.getQueryData<RewardBalance>(
        customerRewardKeys.balance()
      );

      // 낙관적으로 잔액 차감
      if (previousBalance) {
        const vouchers = queryClient.getQueryData<Voucher[]>(customerRewardKeys.vouchers());
        const voucher = vouchers?.find(v => v.id === voucherId);

        if (voucher) {
          queryClient.setQueryData(customerRewardKeys.balance(), {
            ...previousBalance,
            currentBalance: previousBalance.currentBalance - voucher.requiredPoints,
            totalRedeemed: previousBalance.totalRedeemed + voucher.requiredPoints,
          });
        }
      }

      return { previousBalance };
    },
    onError: (err, voucherId, context) => {
      if (context?.previousBalance) {
        queryClient.setQueryData(customerRewardKeys.balance(), context.previousBalance);
      }
      toast.error('상품권 교환에 실패했습니다');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: customerRewardKeys.balance() });
      queryClient.invalidateQueries({ queryKey: customerRewardKeys.myVouchers() });
    },
    onSuccess: (data) => {
      toast.success(`${data.voucherName}이 성공적으로 교환되었습니다!`);
    },
  });
}