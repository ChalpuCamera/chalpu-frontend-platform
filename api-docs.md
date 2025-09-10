# 찰푸 API 문서

## 개요

이 문서는 찰푸(Chalpu) 서비스의 REST API 명세를 정의합니다.

### 기본 정보
- **Base URL**: `https://api.chalpu.com/v1`
- **Content-Type**: `application/json`
- **인증 방식**: Bearer Token (JWT)

### 인증 헤더
```
Authorization: Bearer {access_token}
```

### 공통 응답 형태
```json
{
  "success": boolean,
  "data": object | array,
  "message": string (optional),
  "error": string (optional)
}
```

### HTTP 상태 코드
- `200 OK`: 요청 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 오류

---

## 1. 인증 관련 API

### 1.1 카카오 로그인
**POST** `/auth/kakao/login`

카카오 OAuth 토큰으로 로그인합니다.

#### Request Body
```json
{
  "kakaoAccessToken": "string",
  "role": "customer" | "owner"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": 3600,
    "user": {
      "id": "string",
      "phone": "string",
      "role": "customer" | "owner",
      "name": "string",
      "profileImage": "string",
      "email": "string",
      "kakaoId": "string",
      "isOnboarded": boolean,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### 1.2 토큰 갱신
**POST** `/auth/refresh`

Refresh token을 사용하여 새로운 access token을 발급받습니다.

#### Request Body
```json
{
  "refreshToken": "string"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "accessToken": "string",
    "expiresIn": 3600
  }
}
```

### 1.3 현재 사용자 정보 조회
**GET** `/auth/me`

현재 로그인한 사용자의 정보를 조회합니다.

#### Headers
- `Authorization: Bearer {access_token}`

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "string",
    "phone": "string",
    "role": "customer" | "owner",
    "name": "string",
    "profileImage": "string",
    "email": "string",
    "isOnboarded": boolean,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## 2. 손님(Customer) API

### 2.1 가게 목록 조회
**GET** `/customer/restaurants`

피드백 가능한 가게 목록을 조회합니다.

#### Query Parameters
- `category` (string, optional): 카테고리 필터
- `search` (string, optional): 검색어
- `page` (number, optional, default: 1): 페이지 번호
- `limit` (number, optional, default: 20): 페이지당 항목 수

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": "string",
        "name": "string",
        "address": "string",
        "description": "string",
        "images": ["string"],
        "categories": ["string"],
        "menus": [
          {
            "id": "string",
            "name": "string",
            "price": 10000,
            "description": "string",
            "images": ["string"],
            "category": "string",
            "isActive": true
          }
        ],
        "feedbackCount": 42,
      }
    ],
    "categories": ["한식", "중식", "일식", "양식"],
    "totalCount": 100,
    "currentPage": 1,
    "totalPages": 5
  }
}
```

### 2.2 가게 상세 조회
**GET** `/customer/restaurants/{restaurantId}`

특정 가게의 상세 정보와 메뉴 목록을 조회합니다.

#### Path Parameters
- `restaurantId` (string): 가게 ID

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "restaurant": {
      "id": "string",
      "name": "string",
      "address": "string",
      "description": "string",
      "images": ["string"],
      "phoneNumber": "string",
      "operatingHours": {
        "monday": { "open": "09:00", "close": "22:00" },
        "tuesday": { "open": "09:00", "close": "22:00" }
      },
      "categories": ["string"],
      "isActive": true
    },
    "menus": [
      {
        "id": "string",
        "name": "string",
        "price": 10000,
        "description": "string",
        "images": ["string"],
        "category": "string",
        "feedbackCount": 5,
        "averageRating": 4.5,
      }
    ],
    "totalFeedbackCount": 150
  }
}
```

### 2.3 메뉴 상세 조회
**GET** `/customer/restaurants/{restaurantId}/menus/{menuId}`

특정 메뉴의 상세 정보를 조회합니다.

#### Path Parameters
- `restaurantId` (string): 가게 ID
- `menuId` (string): 메뉴 ID

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "menu": {
      "id": "string",
      "restaurantId": "string",
      "name": "string",
      "price": 10000,
      "description": "string",
      "images": ["string"],
      "category": "string",
      "isActive": true
    },
    "restaurant": {
      "id": "string",
      "name": "string",
      "address": "string"
    },
    "feedbackInfo": {
      "currentFeedbackCount": 5,
      "isEligible": true,
      "hasAlreadySubmitted": false
    },
    "deliveryPlatforms": [
      {
        "name": "배달의민족",
        "url": "string",
        "isAvailable": true
      }
    ]
  }
}
```

### 2.4 사용자 입맛 프로필 조회
**GET** `/customer/taste-profile`

현재 사용자의 입맛 프로필을 조회합니다.

#### Headers
- `Authorization: Bearer {access_token}`

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "spiceTolerance": 3,
    "portionPreference": 2,
    "budgetRange": "8000-12999",
    "favoriteCategories": ["한식", "중식"],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Response (404 Not Found)
```json
{
  "success": false,
  "error": "입맛 프로필이 존재하지 않습니다"
}
```

### 2.5 사용자 입맛 프로필 저장/수정
**POST** `/customer/taste-profile`

사용자의 입맛 프로필을 저장하거나 수정합니다.

#### Headers
- `Authorization: Bearer {access_token}`

#### Request Body
```json
{
  "spiceTolerance": 3,
  "portionPreference": 2,
  "budgetRange": "8000-12999",
  "favoriteCategories": ["한식", "중식"]
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "입맛 프로필이 저장되었습니다"
  }
}
```

### 2.6 피드백 제출
**POST** `/customer/feedback/submit`

메뉴에 대한 피드백을 제출합니다.

#### Request Body
```json
{
  "menuId": "string",
  "restaurantId": "string",
  "orderId": "string",
  "tasteProfileId": "string",
  "ratings": {
    "spiciness": 3,
    "saltiness": 4,
    "sweetness": 2,
    "sourness": 1,
    "portion": 4,
    "price": 5
  },
  "overallSatisfaction": 4,
  "reorderIntention": 8,
  "recommendationScore": 7,
  "textFeedback": "음식이 정말 맛있었습니다. 양도 적당하고 가격도 합리적이에요.",
  "orderReceiptImage": "base64_encoded_image_or_url",
  "foodPhotos": ["base64_encoded_image_or_url"]
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "feedbackId": "string",
    "status": "pending",
    "rewardEarned": 1,
    "totalRewards": 5
  }
}
```

### 2.7 마이페이지 조회
**GET** `/customer/mypage`

손님 마이페이지 정보를 조회합니다.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "customer": {
      "id": "string",
      "phone": "string",
      "name": "string",
      "profileImage": "string"
    },
    "feedbackSummary": {
      "totalSubmitted": 10,
      "totalApproved": 8,
      "totalPending": 1,
      "totalRejected": 1
    },
    "rewardSummary": {
      "totalEarned": 8,
      "totalRedeemed": 5,
      "currentBalance": 3,
      "canRedeem": false
    },
    "recentActivities": [
      {
        "type": "feedback_approved",
        "date": "2024-01-01T00:00:00Z",
        "description": "김치찌개 피드백이 승인되었습니다",
        "relatedMenu": {
          "id": "string",
          "name": "김치찌개"
        },
        "relatedRestaurant": {
          "id": "string",
          "name": "맛있는 식당"
        }
      }
    ]
  }
}
```

### 2.8 피드백 이력 조회
**GET** `/customer/feedbacks`

작성한 피드백 이력을 조회합니다.

#### Query Parameters
- `status` (string, optional): pending | approved | rejected
- `startDate` (string, optional): YYYY-MM-DD
- `endDate` (string, optional): YYYY-MM-DD
- `page` (number, optional, default: 1)
- `limit` (number, optional, default: 20)

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "feedbacks": [
      {
        "feedback": {
          "id": "string",
          "status": "approved",
          "createdAt": "2024-01-01T00:00:00Z",
          "overallSatisfaction": 4,
          "textFeedback": "맛있었어요"
        },
        "menu": {
          "id": "string",
          "name": "김치찌개",
          "price": 8000
        },
        "restaurant": {
          "id": "string",
          "name": "맛있는 식당"
        },
        "statusText": "승인 완료"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 100
    }
  }
}
```

### 2.9 리워드 정보 조회
**GET** `/customer/rewards`

리워드 적립 및 교환 정보를 조회합니다.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "currentRewards": {
      "totalEarned": 10,
      "totalRedeemed": 5,
      "currentBalance": 5,
      "nextRedemptionAt": 0
    },
    "availableVouchers": [
      {
        "id": "string",
        "name": "CU 5,000원 상품권",
        "requiredPoints": 5,
        "description": "CU에서 사용 가능한 5,000원 상품권",
        "termsAndConditions": ["유효기간 1년", "타 쿠폰과 중복 사용 불가"]
      }
    ],
    "redeemHistory": [
      {
        "transaction": {
          "id": "string",
          "type": "redeem",
          "amount": 5,
          "createdAt": "2024-01-01T00:00:00Z"
        },
        "voucherName": "CU 5,000원 상품권",
        "redeemedAt": "2024-01-01T00:00:00Z",
        "status": "completed"
      }
    ],
    "earnHistory": [
      {
        "transaction": {
          "id": "string",
          "type": "earn",
          "amount": 1,
          "createdAt": "2024-01-01T00:00:00Z"
        },
        "relatedFeedback": {
          "menu": {
            "id": "string",
            "name": "김치찌개"
          },
          "restaurant": {
            "id": "string",
            "name": "맛있는 식당"
          }
        },
        "earnedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### 2.10 리워드 교환
**POST** `/customer/rewards/redeem`

적립된 리워드를 상품권으로 교환합니다.

#### Request Body
```json
{
  "voucherId": "string"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "transactionId": "string",
    "voucherCode": "string",
    "status": "processing"
  }
}
```

---

## 3. 사장님(Owner) API

### 3.1 대시보드 조회
**GET** `/owner/dashboard`

사장님 대시보드 정보를 조회합니다.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "owner": {
      "id": "string",
      "name": "string",
      "phone": "string"
    },
    "restaurants": [
      {
        "id": "string",
        "name": "string",
        "address": "string"
      }
    ],
    "totalStats": {
      "totalFeedbacks": 150,
      "totalCustomers": 100,
      "averageRating": 4.3,
      "totalMenus": 25
    },
    "recentFeedbacks": [
      {
        "feedback": {
          "id": "string",
          "overallSatisfaction": 4,
          "textFeedback": "맛있어요",
          "createdAt": "2024-01-01T00:00:00Z"
        },
        "menu": {
          "id": "string",
          "name": "김치찌개"
        },
        "restaurant": {
          "id": "string",
          "name": "맛있는 식당"
        }
      }
    ],
    "popularMenus": [
      {
        "menu": {
          "id": "string",
          "name": "김치찌개",
          "price": 8000
        },
        "feedbackCount": 30,
        "averageRating": 4.5
      }
    ],
    "monthlyTrends": [
      {
        "month": "2024-01",
        "feedbackCount": 50,
        "averageRating": 4.3
      }
    ]
  }
}
```

### 3.2 내 가게 목록 조회
**GET** `/owner/restaurants`

사장님이 등록한 가게 목록을 조회합니다.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": "string",
        "name": "string",
        "address": "string",
        "description": "string",
        "images": ["string"],
        "menuCount": 10,
        "feedbackCount": 50,
        "averageRating": 4.3,
        "lastFeedbackAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### 3.3 가게 등록
**POST** `/owner/restaurants`

새로운 가게를 등록합니다.

#### Request Body
```json
{
  "name": "맛있는 식당",
  "address": "서울시 강남구 테헤란로 123",
  "description": "전통 한식을 제공하는 맛집입니다",
  "images": ["url1", "url2"],
  "businessNumber": "123-45-67890",
  "phoneNumber": "02-1234-5678",
  "operatingHours": {
    "monday": { "open": "09:00", "close": "22:00" },
    "tuesday": { "open": "09:00", "close": "22:00" }
  },
  "categories": ["한식", "전통음식"]
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "restaurantId": "string"
  }
}
```

### 3.4 가게 정보 수정
**PUT** `/owner/restaurants/{restaurantId}`

가게 정보를 수정합니다.

#### Path Parameters
- `restaurantId` (string): 가게 ID

#### Request Body
```json
{
  "name": "맛있는 식당",
  "address": "서울시 강남구 테헤란로 123",
  "description": "전통 한식을 제공하는 맛집입니다",
  "phoneNumber": "02-1234-5678",
  "operatingHours": {
    "monday": { "open": "09:00", "close": "22:00" }
  }
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "가게 정보가 수정되었습니다"
  }
}
```

### 3.5 메뉴 목록 조회
**GET** `/owner/restaurants/{restaurantId}/menus`

특정 가게의 메뉴 목록을 조회합니다.

#### Path Parameters
- `restaurantId` (string): 가게 ID

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "restaurant": {
      "id": "string",
      "name": "맛있는 식당"
    },
    "menus": [
      {
        "id": "string",
        "name": "김치찌개",
        "price": 8000,
        "description": "신김치로 끓인 김치찌개",
        "images": ["string"],
        "category": "찌개류",
        "isActive": true,
        "feedbackCount": 10,
        "averageRating": 4.5,
        "pendingFeedbackCount": 2
      }
    ]
  }
}
```

### 3.6 메뉴 등록
**POST** `/owner/restaurants/{restaurantId}/menus`

새로운 메뉴를 등록합니다.

#### Path Parameters
- `restaurantId` (string): 가게 ID

#### Request Body
```json
{
  "name": "김치찌개",
  "price": 8000,
  "description": "신김치로 끓인 김치찌개",
  "images": ["url1", "url2"],
  "category": "찌개류",
  "isActive": true
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "menuId": "string"
  }
}
```

### 3.7 메뉴 수정
**PUT** `/owner/menus/{menuId}`

메뉴 정보를 수정합니다.

#### Path Parameters
- `menuId` (string): 메뉴 ID

#### Request Body
```json
{
  "name": "김치찌개",
  "price": 9000,
  "description": "신김치로 끓인 김치찌개",
  "images": ["url1", "url2"],
  "category": "찌개류",
  "isActive": true
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "메뉴 정보가 수정되었습니다"
  }
}
```

### 3.8 메뉴 통계 조회
**GET** `/owner/menus/{menuId}/analytics`

특정 메뉴의 통계 및 분석 정보를 조회합니다.

#### Path Parameters
- `menuId` (string): 메뉴 ID

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "menu": {
      "id": "string",
      "name": "김치찌개",
      "price": 8000
    },
    "restaurant": {
      "id": "string",
      "name": "맛있는 식당"
    },
    "overallStats": {
      "totalFeedbacks": 50,
      "averageRatings": {
        "spiciness": 3.5,
        "saltiness": 3.2,
        "sweetness": 2.1,
        "sourness": 2.8,
        "portion": 4.2,
        "price": 4.5,
        "overall": 4.3,
        "reorderIntention": 7.8,
        "recommendationScore": 7.5
      },
      "ratingDistribution": {
        "spiciness": {
          "1": 5,
          "2": 10,
          "3": 20,
          "4": 10,
          "5": 5
        }
      },
      "npsData": {
        "reorderRate": 78,
        "recommendationRate": 75,
        "detractors": 15,
        "passives": 25,
        "promoters": 60
      }
    },
    "customerSegments": {
      "byAge": {
        "20대": 45,
        "30대": 30,
        "40대": 20,
        "50대 이상": 5
      },
      "byTasteProfile": {
        "spiceTolerance": {
          "1": 10,
          "2": 15,
          "3": 30,
          "4": 25,
          "5": 20
        },
        "portionPreference": {
          "1": 10,
          "2": 30,
          "3": 40,
          "4": 20
        },
        "budgetRange": {
          "8000미만": 20,
          "8000-12999": 50,
          "13000-19999": 25,
          "20000이상": 5
        }
      }
    },
    "improvements": [
      {
        "category": "taste",
        "priority": "high",
        "suggestion": "간이 조금 짜다는 의견이 많습니다. 염도를 조절해보세요.",
        "affectedPercentage": 35
      },
      {
        "category": "portion",
        "priority": "medium",
        "suggestion": "양이 부족하다는 의견이 있습니다.",
        "affectedPercentage": 20
      }
    ],
    "feedbacks": [
      {
        "feedback": {
          "id": "string",
          "overallSatisfaction": 4,
          "textFeedback": "맛있었어요",
          "createdAt": "2024-01-01T00:00:00Z"
        },
        "customer": {
          "id": "string",
          "createdAt": "2023-12-01T00:00:00Z"
        }
      }
    ]
  }
}
```

---

## 4. 공통 API

### 4.1 이미지 업로드

#### S3 presigned URL 사용

---

## 5. 에러 응답 형식

모든 에러 응답은 다음과 같은 형식을 따릅니다:

### 400 Bad Request
```json
{
  "success": false,
  "error": "요청 데이터가 올바르지 않습니다",
  "validationErrors": [
    {
      "field": "email",
      "message": "올바른 이메일 형식이 아닙니다"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "인증이 필요합니다",
  "code": "UNAUTHORIZED"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "접근 권한이 없습니다",
  "code": "FORBIDDEN"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "요청한 리소스를 찾을 수 없습니다",
  "code": "NOT_FOUND"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "서버 내부 오류가 발생했습니다",
  "code": "INTERNAL_ERROR"
}
```

---

## 6. 페이지별 필요 API 매핑

### 손님(Customer) 페이지
| 페이지 | 필요한 API |
|-------|-----------|
| C-01 사전 피드백 | GET /customer/taste-profile, POST /customer/taste-profile |
| C-02 가게 리스트 | GET /customer/restaurants |
| C-03 메뉴 세부 | GET /customer/restaurants/{id}/menus/{menuId} |
| C-04 주문 인증 | POST /upload/image (영수증) |
| C-05 사후 피드백 | POST /upload/image (음식 사진) |
| C-06 피드백 마무리 | POST /customer/feedback/submit |
| C-07 마이페이지 | GET /customer/mypage |
| C-08 피드백 내역 | GET /customer/feedbacks |
| C-10 리워드 | GET /customer/rewards, POST /customer/rewards/redeem |

### 사장님(Owner) 페이지
| 페이지 | 필요한 API |
|-------|-----------|
| O-01 대시보드 | GET /owner/dashboard |
| O-02 가게 조회 | GET /owner/restaurants |
| O-03 가게 등록 | POST /owner/restaurants, POST /upload/image |
| O-04 가게 수정 | PUT /owner/restaurants/{id} |
| O-05 가게 세부 | GET /owner/restaurants/{id}/menus |
| O-06 통계/분석 | GET /owner/menus/{menuId}/analytics |
| O-08 가게 등록 | POST /owner/restaurants |
| O-09 가게 수정 | PUT /owner/restaurants/{id} |

---

## 7. 데이터 타입 상세 정의

### UserTasteProfile
```typescript
{
  spiceTolerance: number;      // 1-5 (1: 순한맛 ~ 5: 매운맛)
  portionPreference: number;   // 1-4 (1: 소식 ~ 4: 대식)
  budgetRange: "8000미만" | "8000-12999" | "13000-19999" | "20000이상";
  favoriteCategories?: string[];
}
```

### TasteRating
```typescript
{
  spiciness: number;  // 1-5 (맵기)
  saltiness: number;  // 1-5 (짠맛)
  sweetness: number;  // 1-5 (단맛)
  sourness: number;   // 1-5 (신맛)
  portion: number;    // 1-5 (양)
  price: number;      // 1-5 (가격 만족도)
}
```

### Feedback Status
- `pending`: 검토 대기 중
- `approved`: 승인 완료
- `rejected`: 반려

### User Role
- `customer`: 손님
- `owner`: 사장님

---

## 변경 이력

| 버전 | 날짜 | 내용 |
|-----|------|------|
| 1.0.0 | 2024-01-09 | 초기 버전 작성 |