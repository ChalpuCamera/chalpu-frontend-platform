// lib/navigation.ts
import { DOMAINS, isDevelopment, OAUTH_ENDPOINTS } from './constants';

export type UserRole = "owner" | "customer";

export const navigateToDomain = (userRole: UserRole) => {
  if (isDevelopment) {
    // 개발환경에서는 내부 라우팅
    window.location.href = `/${userRole}`;
  } else {
    // 프로덕션에서는 도메인 이동
    window.location.href = userRole === "owner" ? DOMAINS.OWNER : DOMAINS.CUSTOMER;
  }
};

export const getOtherDomainUrl = (currentRole: UserRole): string => {
  return currentRole === "owner" ? DOMAINS.CUSTOMER : DOMAINS.OWNER;
};

export const getOAuthLoginUrl = (): string => {
  return `${DOMAINS.API}${OAUTH_ENDPOINTS.KAKAO}`;
};

export const navigateToHome = (userRole: UserRole) => {
  if (isDevelopment) {
    window.location.href = `/${userRole}/home`;
  } else {
    window.location.href = `${userRole === "owner" ? DOMAINS.OWNER : DOMAINS.CUSTOMER}/home`;
  }
};