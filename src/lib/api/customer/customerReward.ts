import { apiClient } from '../client';
import type { ApiResponse, PageResponse, Pageable } from '@/lib/types/api/common';

export interface RewardBalance {
  totalEarned: number;
  totalRedeemed: number;
  currentBalance: number;
  nextRedemptionAt: number; // Points needed for next redemption
  canRedeem: boolean;
}

export interface Voucher {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  imageUrl?: string;
  termsAndConditions: string[];
  expiryDays: number; // Days until expiration after redemption
}

export interface RewardTransaction {
  id: number;
  userId: number;
  type: 'EARNED' | 'REDEEMED';
  amount: number;
  balance: number;
  description: string;
  relatedFeedbackId?: number;
  relatedVoucherId?: string;
  createdAt: string;
}

export interface VoucherRedemption {
  id: number;
  userId: number;
  voucherId: string;
  voucherName: string;
  voucherCode?: string; // Actual voucher code after redemption
  pointsUsed: number;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';
  redeemedAt: string;
  expiresAt?: string;
}

export const customerRewardApi = {
  // 리워드 잔액 조회
  getRewardBalance: () =>
    apiClient.get<ApiResponse<RewardBalance>>('/api/rewards/balance'),

  // 사용 가능한 상품권 목록
  getAvailableVouchers: () =>
    apiClient.get<ApiResponse<Voucher[]>>('/api/rewards/vouchers'),

  // 리워드 거래 내역
  getTransactionHistory: (pageable: Pageable = {}) => {
    const params = {
      page: pageable.page ?? 0,
      size: pageable.size ?? 20,
      sort: pageable.sort ?? ['createdAt,desc'],
    };
    return apiClient.get<ApiResponse<PageResponse<RewardTransaction>>>(
      '/api/rewards/transactions',
      { params }
    );
  },

  // 상품권 교환
  redeemVoucher: (voucherId: string) =>
    apiClient.post<ApiResponse<VoucherRedemption>>(
      `/api/rewards/redeem/${voucherId}`
    ),

  // 교환한 상품권 목록
  getMyVouchers: (status?: 'ALL' | 'ACTIVE' | 'USED' | 'EXPIRED') => {
    const params = status && status !== 'ALL' ? { status } : {};
    return apiClient.get<ApiResponse<VoucherRedemption[]>>(
      '/api/rewards/my-vouchers',
      { params }
    );
  },

  // 특정 교환 내역 상세
  getVoucherRedemption: (redemptionId: number) =>
    apiClient.get<ApiResponse<VoucherRedemption>>(
      `/api/rewards/redemption/${redemptionId}`
    ),

  // 리워드 통계
  getRewardStats: () =>
    apiClient.get<ApiResponse<{
      totalEarnedThisMonth: number;
      totalRedeemedThisMonth: number;
      averageMonthlyEarning: number;
      nextMilestone: number; // Next reward milestone
    }>>('/api/rewards/stats'),
};