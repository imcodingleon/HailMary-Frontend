### 최종 결제 깔때기 (이벤트로 본 사용자 여정)

checkout_page_view                  체크아웃 페이지 진입
  ↓
checkout_email_input                이메일 입력
checkout_coupon_input               쿠폰 입력
checkout_consent_toggle             약관 토글
checkout_pay_button_click           [결제하기 클릭]
  ↓
payment_initiated                   토스 결제창 열림 (새창)
  ↓ (새창 내부는 블랙박스 — 사용자가 결제수단 선택/QR/취소 등)
  ↓
  ├─ checkout_success_view          토스가 successUrl로 리다이렉트
  │    ↓
  │    ├─ paid_result_redirect (F/E)        백엔드 confirm 응답 성공 → 유료 페이지로 (F/E 시그널)
  │    │    └─ payment_completed (B/E ✨)   백엔드 fire-and-forget 발화 (단일 진실원, GMV/ARPPU/결제수단)
  │    └─ payment_confirm_failed            백엔드 confirm 실패
  │
  └─ payment_failed                 토스가 failUrl로 리다이렉트
       (error_code: PAY_PROCESS_CANCELED, USER_CANCEL, INSUFFICIENT_FUNDS, ...)


### Amplitude에서 만들 수 있는 분석
결제 전환율 깔때기: checkout_page_view → checkout_pay_button_click → payment_initiated → payment_completed
이탈 지점 분석: payment_initiated 후 payment_failed / payment_confirm_failed / 30분 내 아무것도 없음 → 3가지 이탈 유형 식별 가능
취소 사유 분포: payment_failed 의 error_code 그룹화 — PAY_PROCESS_CANCELED(사용자 마음 바뀜) vs 카드사 거절 vs 기타
백엔드 confirm 실패율: payment_confirm_failed / payment_completed 비율 — 0%가 정상. 올라가면 백엔드 이슈 시그널
GMV / ARPPU / 결제수단 분포: payment_completed 의 amount, payment_method, easy_pay_provider 속성으로 직접 집계 (DB 쿼리 없이 Amplitude 한 화면에서).
환경 분리: payment_completed 의 environment 속성으로 local 테스트 데이터 vs production 매출 분리.
새창 내부는 어차피 불투명하지만, 결과 분기는 100% 추적됩니다. 이 정도면 분석 목적상 충분합니다.

### paid_result_redirect (F/E) vs payment_completed (B/E)
같은 결제 1건마다 각각 1회씩 발화. 둘이 모두 도달해야 정상 깔때기.
- F/E만 도달 + B/E 누락 → Amplitude HTTP API 인입 실패 (백엔드 로그에서 `amplitude.failed` 또는 `amplitude.exception` 확인).
- B/E만 도달 + F/E 누락 → 프론트 라우팅 실패 (드물지만 가능).
- 둘 다 도달 → 정상.
