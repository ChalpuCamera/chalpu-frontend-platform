// lib/constants.ts
export const DOMAINS = {
  OWNER: process.env.NEXT_PUBLIC_OWNER_DOMAIN || "https://owner.chalpu.com",
  CUSTOMER:
    process.env.NEXT_PUBLIC_CUSTOMER_DOMAIN || "https://customer.chalpu.com",
  API: process.env.NEXT_PUBLIC_API_URL || "https://platform.chalpu.com",
};

export const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === "development";
export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production";

// OAuth & External Links
export const KAKAO_CHAT_URL = "https://open.kakao.com/o/sCpB58Hh";

export const OAUTH_ENDPOINTS = {
  KAKAO: "/api/oauth2/authorization/kakao",
  SUCCESS_PATH: "/oauth2/success",
  FAILURE_PATH: "/oauth2/failure",
} as const;
