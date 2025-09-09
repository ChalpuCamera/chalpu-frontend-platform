// ============================================================================
// 공통 유틸리티 타입 정의
// ============================================================================

// 에러 상태
export interface ErrorState {
  message: string;
  code?: string;
  statusCode?: number;
  validationErrors?: ValidationError[];
  details?: Record<string, unknown>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// 로딩 상태
export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

// 파일 업로드 응답
export interface FileUploadResponse {
  url: string;
  key: string;
  size: number;
  mimeType: string;
}