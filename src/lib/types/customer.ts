// ============================================================================
// 손님 페이지 데이터 타입 정의
// ============================================================================

import type { User, Restaurant, Menu, Feedback, RewardTransaction, UserTasteProfile, TasteRating } from './entities';

// 사전 피드백 페이지
export interface PreFeedbackFormData {
  userProfile: UserTasteProfile;
}

// 가게(메뉴) 리스트 페이지
export interface CustomerRestaurantsData {
  restaurants: Array<
    Restaurant & {
      menus: Menu[];
      feedbackCount: number;
      availableFeedbackSlots: number; // 각 메뉴당 최대 10명까지
    }
  >;

  // 검색/필터 옵션
  categories: string[];
  searchQuery?: string;
  selectedCategory?: string;
}

// 가게 상세 페이지 (customer/restaurants/[id]/page.tsx)
export interface CustomerRestaurantDetailData {
  restaurant: Restaurant;
  menus: Array<Menu & {
    feedbackCount: number;
    averageRating?: number;
    availableSlots: number;
  }>;
  totalFeedbackCount: number;
}

// 메뉴 세부 페이지
export interface CustomerMenuDetailData {
  menu: Menu;
  restaurant: Restaurant;

  // 피드백 신청 정보
  feedbackInfo: {
    availableSlots: number; // 남은 피드백 슬롯 (최대 10명)
    currentFeedbackCount: number;
    isEligible: boolean; // 해당 메뉴에 피드백 가능 여부
    hasAlreadySubmitted: boolean; // 이미 피드백 작성했는지
  };

  // 타 배달 플랫폼 연결 정보 (클라이언트에서 처리)
  deliveryPlatforms?: Array<{
    name: string; // '배달의민족', '쿠팡이츠', '요기요'
    url: string;
    isAvailable: boolean;
  }>;
}

// 주문 인증 페이지
export interface OrderVerificationData {
  selectedMenu: Menu;
  selectedRestaurant: Restaurant;
}

export interface OrderVerificationFormData {
  orderId?: string;
  receiptImage: File;
}

// 사후 피드백 페이지
export interface PostFeedbackFormData {
  ratings: TasteRating;
  overallSatisfaction: number;
  reorderIntention: number;
  recommendationScore: number;
  foodPhotos?: File[]; // 선택적 업로드
}

// 피드백 작성 마무리(한마디) 페이지
export interface FeedbackMessageFormData {
  textFeedback: string; // 30자 이상 필수
}

// 피드백 완료 페이지
export interface FeedbackCompleteData {
  feedback: Feedback;
  menu: Menu;
  restaurant: Restaurant;
  rewardEarned: number; // 적립된 횟수
  totalRewards: number; // 총 적립 횟수
}

// 마이페이지 (손님)
export interface CustomerMyPageData {
  customer: User;

  // 피드백 작성 내역 요약
  feedbackSummary: {
    totalSubmitted: number;
    totalApproved: number;
    totalPending: number;
    totalRejected: number;
  };

  // 적립 현황
  rewardSummary: {
    totalEarned: number;
    totalRedeemed: number;
    currentBalance: number;
    canRedeem: boolean; // 5회 이상 적립시 true
  };

}

// 피드백(선택한 메뉴) 내역 조회 페이지
export interface CustomerFeedbackHistoryData {
  // 피드백을 위해 선택한 메뉴들과 작성한 피드백 목록
  feedbacks: Array<{
    feedback: Feedback;
    menu: Menu;
    restaurant: Restaurant;
    statusText: string; // '승인 완료', '검토 중', '반려'
  }>;

  // 필터 옵션
  filters: {
    status: Array<"pending" | "approved" | "rejected">;
    dateRange: {
      start?: Date;
      end?: Date;
    };
  };

  // 페이지네이션
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}

// 리워드 페이지
export interface CustomerRewardData {
  customer: User;

  // 현재 적립 현황
  currentRewards: {
    totalEarned: number;
    totalRedeemed: number;
    currentBalance: number;
    nextRedemptionAt: number; // 다음 교환까지 필요한 횟수
  };

  // 교환 가능한 상품권
  availableVouchers: Array<{
    id: string;
    name: string; // 'CU 5,000원 상품권'
    requiredPoints: number; // 5회
    description: string;
    termsAndConditions: string[];
  }>;

  // 교환 내역
  redeemHistory: Array<{
    transaction: RewardTransaction;
    voucherName: string;
    redeemedAt: Date;
    status: "processing" | "completed" | "failed";
  }>;

  // 적립 내역
  earnHistory: Array<{
    transaction: RewardTransaction;
    relatedFeedback?: {
      menu: Menu;
      restaurant: Restaurant;
    };
    earnedAt: Date;
  }>;
}