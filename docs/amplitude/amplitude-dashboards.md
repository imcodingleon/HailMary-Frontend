# Amplitude — 도화선 분석 자산 인덱스

> 프로젝트: `dohwasun` (appId `808332`, org `phm-service`)
> 마지막 갱신: 2026-05-07 — 이벤트 33개로 확장(체크아웃 인터랙션 7종 추가) + `intro_step_complete` → `intro_start_clicked`, `paid_report_cta_clicked` → `pay_cta_click` 이름 변경 + StrictMode 더블 발화 가드 적용 (`info_form_view`, `survey_step_view`, `loading_enter`).

도화선 서비스의 33개 이벤트(F/E 32 + B/E 1 예정)를 기반으로 차트 9개와 대시보드 5개를 운용 중이다. 이 문서는 그 자산의 위치, 운용 리듬, 후속 액션을 한 곳에 모아둔 단일 인덱스다.

---

## 0. 운용 리듬

| 리듬 | 보는 시점 | 대시보드 | 핵심 질문 |
| --- | --- | --- | --- |
| **데일리** | 매일 오후 3시 5분 | D-1 일일 모니터링 (통합) | 어제 어디서 빠졌는가? 누가 들어왔는가? |
| **주 1~2회 깊게** | 주 1~2회 30~60분 | D-3 콘텐츠 분석 | scene 단계별 도달은? 무료 결과 페이지 콘텐츠 도달률(max_scroll)은? |
| **주 1회** | 주 1회 30분 | D-5 사용자 정보 | 인구통계 분포 추세 — 마케팅 페르소나 |
| **수시 점검** | 이슈/QA 시 | D-4 Data Health | 데이터 수집 자체의 건강 |

> D-2 주간 리뷰는 이번 재구성에서 폐지 (Retention·Stickiness 차트 삭제로 잔여 차트 0). 일일 트렌드는 D-1에 흡수.

---

## 1. 대시보드 (5개)

각 대시보드는 비공개(unpublished) 상태로 개인 스페이스에 생성됨. 검토 후 팀 스페이스로 게시 가능.

| # | 대시보드 | 용도 | URL |
| --- | --- | --- | --- |
| D-1 | **일일 모니터링 (통합)** | 단순 퍼널 13단계 + DAU + 캐릭터 비중 + 성별×캐릭터 | <https://app.amplitude.com/analytics/phm-service/dashboard/s8dzaqka> |
| D-3 | **콘텐츠 분석** | scene별 도달률 (scenario_progress + story_cut_view 통합) + 무료 결과 페이지 max_scroll 분포 | <https://app.amplitude.com/analytics/phm-service/dashboard/q2raaehz> |
| D-4 | **Data Health Assessment** | rich_text만 — 이슈·QA 메모 | <https://app.amplitude.com/analytics/phm-service/dashboard/4n9tfcww> |
| D-5 | **사용자 정보 (신규)** | 성별 비중 + 연령대 분포 (birth_year raw) | <https://app.amplitude.com/analytics/phm-service/dashboard/pqsr439y> |

> archive 처리됨: `hk38g9ap`, `4nh5e2hg`, `v4g7ew2a`, `ss1klq9s`, `bwnrkbwn`, `2cuhejza`, `ef4hnhkt`, `h8a9cbfp` (D-2 주간 리뷰는 차트 0이라 archive 권장).

---

## 2. 차트 (9개 — 신규 2개 추가 가능)

### D-1 일일 모니터링용 (4개)

| chartId | 이름 | 유형 | 상태 |
| --- | --- | --- | --- |
| `dig0nibm` | 사용자 단순 퍼널 (13단계) | funnels | **신규** |
| `r3l963rv` | 일별 활성 사용자 (DAU) | eventsSegmentation | 보존 |
| `bzx6afk3` | 캐릭터 선택 비중 | eventsSegmentation | 보존 |
| `pll6v8c6` | 성별 × 캐릭터 분포 | eventsSegmentation | 보존 |

### D-3 콘텐츠 분석용 (2개)

| chartId | 이름 | 유형 | 상태 |
| --- | --- | --- | --- |
| `d85fh9bw` | scene별 도달률 (scenario_progress + story_cut_view) | eventsSegmentation | 보존 — 구 `p7g2z1ae` 대체 |
| `nc3xhh2x` | 무료 결과 페이지 max_scroll 분포 (`result_page_exit` Property Histogram) | eventsSegmentation | **신규 (2026-05-06)** — 구 `nv0y0ku2`(자유서술 submit vs skip) 대체 |

### D-5 사용자 정보용 (2개, 모두 신규)

| chartId | 이름 | 유형 | 상태 |
| --- | --- | --- | --- |
| `9g1tmhas` | 사용자 성별 비중 | eventsSegmentation | **신규** |
| `nsgw8iwq` | 사용자 연령대 분포 (birth_year raw) | eventsSegmentation | **신규** |

### 사용자 UI 삭제 권장

| chartId | 이름 | 사유 |
| --- | --- | --- |
| `p7g2z1ae` | (구) 컷별 도달률 | 신규 `d85fh9bw`가 두 이벤트(scenario_progress + story_cut_view) 통합 추적하므로 대체됨 |
| `nv0y0ku2` | (구) 자유서술 submit vs skip 비율 | D-3 대시보드에서 제거됨 (2026-05-06). max_scroll 분포(`nc3xhh2x`)로 대체. 자유서술 활용도는 표본 수집 후 필요 시 차트 재생성. |

`67cgv3qe` 삭제로 신규 차트 2개 추가 가능. 위 2개 UI 삭제 시 추가 슬롯 더 확보.

---

## 3. 단순 퍼널(`dig0nibm`) 13단계 — 실제 사용자 동선

```
1. landing_enter            → 진입
2. intro_step_complete      → 인트로 완주
3. scenario_progress        → 시나리오 진행 (인트로 21단계)
4. character_select         → 캐릭터 결정
5. story_scene_start        → 스토리 시작 (캐릭터 선택 직후)
6. story_cut_view           → 첫 컷
7. info_form_view           → 정보 폼 노출 (스토리 도중 임베드)
8. info_form_submit         → 정보 제출
9. survey_step_view         → 설문 진입
10. survey_step_submit      → 설문 제출
11. loading_enter           → 로딩 진입
12. loading_done            → 로딩 완료
13. loading_result_clicked  → 결과 클릭 (최종 KPI)
```

**자유서술(`survey_freetext_submit` / `survey_freetext_skip`)은 funnel에서 제외.** ordered funnel 구조상 옵셔널 단계를 포함시키면 skip 사용자가 그 단계 미통과로 잡혀 이후 단계 0으로 떨어진다. (자유서술 활용도 추적 차트 `nv0y0ku2`는 D-3에서 제거됨, 2026-05-06. 표본이 더 쌓인 후 필요 시 재생성.)

### 단계간 이탈 점검 가이드

- 1→2 (50% 미만) → 인트로가 길거나 답답함
- 4→5 (낮음) → 캐릭터 매력·섬네일 부족 가능성
- 7→8 (80% 미만) → 정보 입력 부담
- 9→10 (낮음) → 설문 길이 부담
- 12→13 (30% 미만) → 결제 유도 이전에 서사 콘텐츠가 도달
- 13의 절대 도달자 수 = 핵심 KPI

---

## 4. 검증된 33개 이벤트와 속성

> 공통 속성 (모든 이벤트 자동 첨부): `device_id`, `session_id`, `timestamp`.
> 이벤트 흐름 단계별로 묶어 정리.

---

### 4-1. 진입 단계

#### 1) `landing_enter`
- **핵심 속성:** (없음)
- **목적:** 랜딩 페이지 첫 진입. 모든 퍼널의 출발점이자 트래픽 유입량의 기준선. 마케팅 채널·캠페인 성과 평가의 분모.
- **발화 가드:** sessionStorage 1회 (StrictMode 더블 인보크 방지).

#### 2) `intro_start_clicked` *(2026-05-07: `intro_step_complete`에서 변경)*
- **핵심 속성:** `step`
- **목적:** 랜딩 → "1화 연애운편 시작하기" CTA 클릭 시점. 사용자가 본격적으로 서비스에 진입하는 첫 의도 신호. `landing_enter → intro_start_clicked` 전환율 = **CTA 도달률**.

---

### 4-2. 시나리오 & 캐릭터 선택
1
#### 3) `scenario_progress`
- **핵심 속성:** `chapter_index`, `scene_label` (1/21 ~ 21/21)
- **목적:** 인트로 21단계 시나리오 진행률 측정. `scene_label`로 어느 챕터가 가장 큰 이탈 지점인지 식별 → 서사 콘텐츠 리밸런싱 근거.

#### 4) `character_select`
- **핵심 속성:** `character_id` (`yeonwoo` / `doyoon`)
- **목적:** 캐릭터 선택 분기점. 성별·연령대 user property와 교차해 **타겟 페르소나 매칭** 분석. 도화선 핵심 분기 KPI.

---

### 4-3. 스토리 진행

#### 5) `story_scene_start`
- **핵심 속성:** `character_id`
- **목적:** 캐릭터 선택 직후 스토리 진입 시점. `character_select → story_scene_start` 전환율로 캐릭터별 매력도 비교.

#### 6) `story_cut_view`
- **핵심 속성:** `character_id`, `cut_index`, `cut_type`, `scene_label` (+ user property `gender`/`birth_year`/`birth_month`/`calendar` 자동 첨부)
- **목적:** 스토리 컷 단위 도달률. `cut_index`로 어느 컷에서 이탈하는지, `cut_type`으로 컷 종류별(텍스트/일러스트/CG) 체류 패턴 분석.

---

### 4-4. 정보 입력

#### 7) `info_form_view`
- **핵심 속성:** `character_id`
- **목적:** 정보 입력 폼 노출 시점. 스토리 → 폼 임베드 시점에서의 첫 노출률 측정. 부담감 진단의 출발점.
- **발화 가드:** sessionStorage `character_id`별 1회 (이전 scene 7↔8 전환 시 더블 발화 이슈 해결, 2026-05-07).

#### 8) `info_form_submit`
- **핵심 속성:** `character_id`, `birth_year`, `birth_month`, `calendar`, `gender`, `has_birth_time`
- **목적:** 사주 계산용 핵심 정보 제출. **인구통계(birth_year/gender) 단일 진실원** — 마케팅 페르소나 분석의 기반 데이터.

---

### 4-5. 설문

#### 9) `survey_step_view`
- **핵심 속성:** `character_id`, `step`
- **목적:** 설문 각 단계 노출 추적. step별 도달률로 설문 길이 부담 지점 진단.
- **발화 가드:** sessionStorage `character_id` × `step`별 1회 (이전 scene 8↔9, 9↔10, 10↔11 전환 시 더블 발화 이슈 해결, 2026-05-07).

#### 10) `survey_step_submit`
- **핵심 속성:** `character_id`, `step`, `selected_options`, `selected_labels` (객관식 step 1·2)
- **목적:** 설문 단계별 응답 제출. view → submit 차이가 곧 단계별 이탈률. 4/27 데이터에서 **9→10이 가장 큰 병목**으로 확인된 핵심 지표.

#### 11) `survey_freetext_submit`
- **핵심 속성:** `character_id`, `has_text`, `text_length`
- **목적:** 자유서술(step 3) 응답 제출. 사용자 인게이지먼트 깊이 측정 — `text_length`로 정성 응답의 무게 정량화.
- **PII 정책 (2026-05-07):** 원문 `text_content` 속성 **제거됨**. 자유서술 원문에는 이름·연락처 등 PII가 섞일 수 있어 Amplitude 미전송. 원문이 필요하면 운영 DB에 별도 저장 후 `order_id` 또는 `saju_request_id`로 조인.

#### 12) `survey_freetext_skip`
- **핵심 속성:** `character_id`
- **목적:** 자유서술 건너뛰기. submit과의 비율로 **자유서술 활용도** 측정. ⚠️ ordered funnel에서는 제외 (skip 사용자가 후속 단계 0으로 잡히는 한계).

---

### 4-6. 로딩 & 결과 도달

#### 13) `loading_enter`
- **핵심 속성:** `character_id`
- **목적:** 사주 계산 로딩 화면 진입. 설문 제출 → 로딩 전환율로 API 호출 직전 이탈 진단.
- **발화 가드:** sessionStorage `character_id`별 1회 (이전 더블 발화 이슈 해결, 2026-05-07).

#### 14) `loading_slot_change`
- **핵심 속성:** `character_id`, `slot_index`, `line_slug`
- **목적:** 로딩 중 카피 슬롯(line) 회전 추적. 어떤 `line_slug`가 노출됐을 때 사용자가 더 오래 머무는지 **로딩 카피 효과 분석**. 슬롯 회전 인터벌마다 발화 (의도된 동작).

#### 15) `loading_done`
- **핵심 속성:** `character_id`
- **목적:** 로딩 완료. enter → done 전환율 = 로딩 인내율. 백엔드 응답 지연 시 이탈 진단.

#### 16) `loading_result_clicked`
- **핵심 속성:** `character_id`
- **목적:** 결과 보기 클릭. **무료 퍼널의 최종 KPI** — 단순 퍼널의 마지막 단계.

---

### 4-7. 무료 결과 페이지

#### 17) `result_page_view`
- **핵심 속성:** `character_id`, `saju_request_id`
- **목적:** 결과 페이지 마운트 + `saju_request_id` 로드 완료 시점 (세션당 1회). **결제 퍼널의 시작점**이자 콘텐츠 도달의 측정 기준.

#### 18) `pay_cta_click` *(2026-05-07: `paid_report_cta_clicked` → `paid_cta_clicked` → `pay_cta_click` 두 차례 변경)*
- **핵심 속성:** `character_id`
- **목적:** Sticky 결제 CTA 클릭. `result_page_view → pay_cta_click` = **결제 의도율(intent rate)**. 무료 → 유료 전환의 핵심 선행지표.

#### 19) `result_page_exit`
- **핵심 속성:** `character_id`, `saju_request_id`, `max_scroll` (0~100 정수 %)
- **목적:** 결과 페이지 이탈 시 `max_scroll` 누적 기록. **콘텐츠 도달률(engagement)** 측정. unmount/pagehide 시 발화. 같은 탭 재진입 시 누적.

---

### 4-8. 체크아웃 페이지 인터랙션

#### 20) `checkout_page_view`
- **핵심 속성:** `character_id`, `saju_request_id`, `amount`
- **목적:** `/checkout/[character]` 마운트 시 (캐릭터별 세션당 1회). 결제 페이지 도달자 수 — 결제 퍼널 2단계.

#### 21) `checkout_back_click` *(2026-05-07 신규)*
- **핵심 속성:** `character_id`
- **목적:** 체크아웃 헤더의 뒤로가기 버튼 클릭. **결제창 진입 직후 이탈** 측정 — 가격·약관·결제수단을 본 직후 망설임 신호.

#### 22) `checkout_email_input` *(2026-05-07 신규)*
- **핵심 속성:** `character_id`, `has_value` (boolean), `is_valid` (boolean)
- **목적:** 이메일 입력 필드 blur 시점에 발화. 입력 시도율(`has_value=true` 비율)과 포맷 유효율(`is_valid=true` 비율)로 **이메일 입력 마찰** 진단.
- **PII 주의:** 이메일 원문은 미전송. 입력 여부·유효성만 boolean으로 기록.

#### 23) `checkout_coupon_input` *(2026-05-07 신규)*
- **핵심 속성:** `character_id`, `has_value` (boolean)
- **목적:** 쿠폰 입력 필드 blur 시점. 쿠폰 입력 시도율 측정 — 쿠폰 보유자/관심자 규모 추정.

#### 24) `checkout_coupon_apply_click` *(2026-05-07 신규)*
- **핵심 속성:** `character_id`, `has_value` (boolean)
- **목적:** 쿠폰 "적용" 버튼 클릭. input → apply 전환율로 **쿠폰 사용 의지 강도** 측정. `has_value=false`인 클릭은 빈 클릭(어뷰즈/실수) 분리 신호.

#### 25) `checkout_consent_toggle` *(2026-05-07 신규)*
- **핵심 속성:** `character_id`, `consent_type` (예: `"data_usage" \| "payment"`), `checked` (boolean)
- **목적:** 동의 체크박스 변경 (체크/해제 모두). 어떤 약관에서 가장 많이 머뭇거리는지(체크 → 해제 토글 발생률) 진단. `consent_type`별 체크율로 **약관 거부 패턴** 분석.

#### 26) `checkout_consent_detail_click` *(2026-05-07 신규)*
- **핵심 속성:** `character_id`, `consent_type`
- **목적:** 동의 항목의 "자세히 보기" 클릭. 약관 정독률(약관별 detail 클릭률) 측정 — 클릭률이 높으면 약관이 부담스럽다는 신호, 낮으면 무심코 동의 의미.

#### 27) `checkout_pay_button_click` *(2026-05-07 신규)*
- **핵심 속성:** `character_id`, `payment_method` (`"GENERAL" \| "KAKAOPAY" \| "NAVERPAY"`), `email_filled` (boolean), `agree_data_usage` (boolean), `agree_payment` (boolean)
- **목적:** 카카오페이/네이버페이/일반결제 버튼 클릭 **즉시** 발화. **검증 통과 여부와 무관하게 클릭 자체를 추적**해 결제수단별 클릭 의지 절대값 확보. 이후 `checkout_validation_failed`(검증 실패) 또는 `payment_method_selected → payment_initiated`(검증 통과)로 분기.
- **분석 활용:** `pay_button_click → payment_initiated` 전환율 = 검증 통과율. 클릭 시점의 `email_filled`/`agree_*` 상태 분포로 **어느 약관이 미체크된 채로 클릭이 일어나는지** 패턴 분석 가능.

#### 28) `checkout_validation_failed`
- **핵심 속성:** `character_id`, `reason` (`"email_invalid" \| "consent_missing"`)
- **발생 시점:** `checkout_pay_button_click` 직후 클라이언트 검증에서 실패한 시점. tossPayments SDK 호출 **전**.
- **목적:** 사용자가 결제 의도가 있었으나 폼 입력에서 막힌 케이스 추적. **결제 UX 마찰 진단** — `reason` 분포로 어느 검증이 가장 큰 장애물인지 식별.

---

### 4-9. 결제 진행

#### 29) `payment_method_selected`
- **핵심 속성:** `character_id`, `saju_request_id`, `payment_method` (`"GENERAL" \| "KAKAOPAY" \| "NAVERPAY"`), `amount`, `order_id`
- **발생 시점:** 검증 통과 직후, 결제수단을 결정해서 `order_id`가 클라이언트에서 생성되는 시점. tossPayments SDK 호출 **직전**.
- **목적:** (1) 결제수단 선호도 분포 분석. (2) `order_id` 발급 시점 기록 — 이후 `payment_completed`(B/E)와 조인 키. (3) 검증 통과율 측정.

#### 30) `payment_initiated`
- **핵심 속성:** `character_id`, `saju_request_id`, `payment_method`, `amount`, `order_id`
- **발생 시점:** `tossPayments.requestPayment()` 호출 직후, **토스 결제창(외부 모달/리다이렉트)이 사용자에게 노출된 시점**.
- **목적:** 결제수단 결정 → 실제 결제창 진입 직전 망설임 측정 (`payment_method_selected → payment_initiated` 차이). 토스 결제창 노출률 = 결제 의지 표명의 마지막 클라이언트 단계.

#### 31) `payment_failed`
- **핵심 속성:** `character_id`, `order_id`, `error_code`, `error_message`
- **발생 시점:** 두 경로 — **(a)** `/checkout/fail`로 리다이렉트 진입 (토스가 fail URL로 보낸 경우), **(b)** `tossPayments.requestPayment()` catch 블록 (USER_CANCEL 포함, 사용자가 결제창 X 클릭).
- **목적:** 결제 실패 사유 분포 — `error_code`별 카운트로 카드 거부, 한도 초과, 사용자 취소 등 분리 분석. USER_CANCEL 비율이 높으면 결제 직전 망설임 신호.

#### 32) `checkout_success_view`
- **핵심 속성:** `character_id`, `order_id`
- **발생 시점:** `/checkout/success` 페이지 마운트 시. 토스가 success URL로 사용자를 보낸 직후.
- **목적:** **F/E 관점의 결제 완료 신호** — 사용자가 성공 페이지를 본 시점. ⚠️ 단일 진실원 아님 — 실제 결제 검증은 B/E `payment_completed`. F/E 신호와 B/E 검증 사이의 갭 추적용.

---

### 4-10. 백엔드 결제 검증 (예정)

#### 33) `payment_completed` *(B/E)*
- **핵심 속성:** `character_id`, `saju_request_id`, `order_id`, `amount`, `payment_method`, `paid_at`
- **발생 시점:** 토스 webhook `DONE` 수신 → 백엔드 검증 → Amplitude HTTP API 직접 전송.
- **목적:** **GMV / ARPPU / 유료 사용자 수의 단일 진실원**. F/E `checkout_success_view`와의 차이 = 결제 검증 실패 케이스(Data Health 경고 신호).

---

### 개인정보 정책

- **모든 이벤트는 PII(이메일 원문·이름·전화번호) 미포함**. 이메일은 `has_value`/`is_valid` boolean으로만, 자유서술은 `text_length`로만 기록.
- CS 대응이 필요하면 `order_id` 또는 `saju_request_id`를 키로 운영 DB 조회 (Amplitude(익명) ↔ DB(PII) 분리).
- 이름·전화번호는 Toss Payments confirm API 응답을 B/E가 받아 **운영 DB에만 저장**.

### 트래킹 플랜 등록 상태

| 그룹 | 등록 상태 |
| --- | --- |
| 초기 17개 이벤트 (`landing_enter` ~ `loading_result_clicked` + `story_*` + `result_page_view`) | `isInSchema: true` (라이브) |
| 2026-05-06 결제 퍼널 9종 (`pay_cta_click` 등) | `isInSchema: false` — 콘솔 등록 필요 |
| 2026-05-07 신규 7종 (체크아웃 인터랙션) | `isInSchema: false` — 콘솔 등록 필요 |
| 2026-05-07 이름 변경 2종 (`intro_start_clicked`, `pay_cta_click`) | 신규 이름으로 재등록 필요 (구 이름 데이터와 단절) |

---

## 5. 데이터에서 즉시 보이는 인사이트 (4/25 ~ 4/30)

- **Apr 28·30 단순 퍼널 100% 완주** — 표본은 작지만(2명, 1명) 13단계 전 구간을 통과하는 흐름이 실제 작동함을 검증.
- **Apr 27 단순 퍼널 14% 완주** — 7명 중 1명만 결과 클릭. 단계간 첫 큰 드롭은 7→8(`info_form_view → info_form_submit`)이 아니라 9→10(`survey_step_view → survey_step_submit`, 5→4) 그리고 10→11(`survey_step_submit → loading_enter`, 4→1). 설문 단계가 핵심 병목.
- **자유서술 활용도** — Apr 27: submit 3 vs skip 4 (43% 활용). Apr 28: submit 2 vs skip 0 (100%). 표본 작아 노이즈, 한 달 후 재해석.
- **연령대 분포** — Apr 27 `1997` 3명 + `1999` 3명 = 20대 후반 6명이 가장 많음. 1964·1988·1995·2001·2005도 각 1명씩 (4/27만). `(none)` 2명 — 사용자가 birth_year 입력 안 한 경우(코드 변경 전 데이터일 가능성).
- **성별 비중** — Apr 27 female 5 vs male 4 (균등). Apr 28 female 1 vs male 1 (균등).
- **female-yeonwoo 0** — 누적 0 유지. 마케팅 타겟팅 재검토 신호.

---

## 6. Data Health 액션 항목

1. ~~`gender` 속성 미수집~~ — **해결됨** (차트 쿼리 방식 문제였음)
2. ~~`character_id` vs `character` 키 통일~~ — **해결됨** (코드 수정)
3. ~~트래킹 플랜 등록~~ — **해결됨** (라이브) — 단, 2026-05-06 신규 추가된 9개 이벤트는 `isInSchema: false` 상태. 트래킹 플랜에 등록 필요 (Amplitude UI에서 수동, MCP 미지원).
4. ~~결제 이벤트 부재~~ — **부분 해결됨**. F/E 6종(`checkout_page_view`, `checkout_validation_failed`, `payment_method_selected`, `payment_initiated`, `payment_failed`, `checkout_success_view`) 구현 완료. **B/E `payment_completed`는 미해결** — Toss webhook → Amplitude HTTP API 연동 백엔드 작업 필요.
5. **자동 수집 속성 정리** — `[Amplitude] Page *` 검토 필요.
6. **`(none)` birth_year 발생** — Apr 27 2명. 코드 변경 전 데이터인지 또는 폼 입력 우회 경로가 있는지 확인 필요.
7. **타임존 설정 누락** — 프로젝트 `dateTimeSettings.timeZoneId`가 빈 문자열. Amplitude UI가 미국 시간 기준으로 표시되어 한국 사용자 활동 시간 해석 곤란. 콘솔 → Settings → Project Settings에서 `Asia/Seoul`로 변경 필요 (MCP 미지원).
8. **`landing_enter` 더블 발화** — React StrictMode 더블 인보크가 원인. `sessionStorage` 1회 가드 적용으로 해결됨 (2026-05-06). 다른 mount-시 발화 이벤트(`story_scene_start`, `info_form_view`, `loading_enter` 등)에도 동일 패턴 점검 권장.

---

## 7. 향후 보완

### UTM 추가 시
- 새 대시보드 D-6 마케팅 채널 분석
- D-1에 채널별 슬라이스

### 결제 B/E 연동 후 (`payment_completed` 라이브)
- D-1 단순 퍼널 14~18단계 확장 (`result_page_view` → `paid_report_cta_clicked` → `checkout_page_view` → `payment_method_selected` → `payment_initiated` → `payment_completed`)
- 새 대시보드 D-6 결제 퍼널 + 결제수단별 분포 + 결제 실패 사유(`error_code`) 분포
- D-5에 `paid_users` / GMV / ARPPU headline 추가 검토

### 결과 페이지 분석 차트 추가 후보 (D-3 슬롯 여유 시)
- `result_page_view → paid_report_cta_clicked` 전환율 — 결제 의도율
- `result_page_exit.max_scroll`을 `character_id`(yeonwoo/doyoon)로 segment — 캐릭터별 도달률 비교
- `result_page_exit.max_scroll` 차트의 10단위 binning 적용 검토 (Amplitude UI에서 Bucket size 수동 조정. MCP는 비공식 파라미터로 시도 가능하나 안정성 미검증)

---

## 8. 미사용 후보 차트 (필요 시 추가)

지금은 슬롯 한도로 안 만든 차트 (현재 신규 2개 추가 가능):
- `survey_step_submit.step` 분포 — 어느 설문 단계에서 가장 많이 빠지는가
- `info_form_submit.calendar` (양력/음력) × `has_birth_time` 분포
- 시간대별 `landing_enter` 분포 — 마케팅 타이밍

---

## 9. 작업 이력

### 2026-05-07 — `67cgv3qe` 차트 삭제

| 변경 | ID |
| --- | --- |
| 삭제 — 신규 vs 활성 사용자 추이 (주간) | `67cgv3qe` |

- D-1 일일 모니터링 차트 5개 → 4개로 축소.
- 전체 차트 10개 → 9개. 신규 차트 2개 추가 슬롯 확보.

### 2026-05-06 — 무료 결과 페이지 + 체크아웃·결제 퍼널 이벤트 9종 추가

#### F/E 코드 변경
| 변경 내용 | 위치 |
| --- | --- |
| `result_page_view` 발화 (마운트 + saju_request_id 로드 후, 세션당 1회, sessionStorage 가드) | `DoyoonResultScene.tsx`, `YeonwooResultScene.tsx` |
| `result_page_exit` 발화 (unmount/pagehide, max_scroll 누적) | 위 동일 |
| `paid_report_cta_clicked` 발화 (Sticky CTA onClick) | 위 + `yeonwoo/sections/StickyCheckoutCta.tsx` |
| `checkout_page_view` 발화 (마운트, 캐릭터별 세션당 1회) | `CheckoutView.tsx` |
| `checkout_validation_failed` 발화 (이메일/약관 검증 실패) | `useCheckout.ts` |
| `payment_method_selected` 발화 (orderId 생성 직후) | `useCheckout.ts` |
| `payment_initiated` 발화 (`requestPayment()` 호출 직전) | `useCheckout.ts` |
| `payment_failed` 발화 (SDK catch + `/checkout/fail`) | `useCheckout.ts`, `app/checkout/fail/page.tsx` |
| `checkout_success_view` 발화 (`/checkout/success` 마운트) | `app/checkout/success/page.tsx` |
| `landing_enter` 더블 발화 수정 (sessionStorage 1회 가드) | `useLanding.ts` |
| `max_scroll` 단위 변경 (0~1 비율 → 0~100 정수 %) | 위 결과 페이지 2개 |
| `max_scroll` sessionStorage 누적 (같은 탭 재진입 시 유지) | 위 결과 페이지 2개 |

#### Amplitude 자산 변경
| 변경 | ID |
| --- | --- |
| 신규 차트 — 무료 결과 페이지 max_scroll 분포 (Property Histogram) | `nc3xhh2x` |
| D-3 콘텐츠 분석 대시보드 재편 — 자유서술 차트 제거, max_scroll 분포 추가, rich_text/description 갱신 | `q2raaehz` |
| 사용자 UI 삭제 권장 추가 | `nv0y0ku2` (자유서술 submit vs skip) |

#### 미해결 / 후속 액션
- **트래킹 플랜 등록**: 신규 9개 이벤트 모두 `isInSchema: false`. Amplitude 콘솔 → Data → Tracking Plan에서 등록 필요.
- **B/E `payment_completed` 미구현**: Toss webhook → Amplitude HTTP API 연동 (백엔드 분장).
- **`nv0y0ku2` 차트 자체 삭제**: 대시보드에서는 제거됐으나 프로젝트에 차트 잔존. Amplitude 콘솔에서 직접 삭제 (MCP 미지원).
- **타임존 KST 변경**: 콘솔 Project Settings에서 `Asia/Seoul`로 (MCP 미지원).
- **`max_scroll` 10단위 binning**: 현재 1단위 자동 binning. 콘솔에서 Bucket size 수동 조정.

#### 정책 확정
- Amplitude는 **익명 행동 데이터만** 수집. PII(이메일·이름·전화번호) 절대 미포함.
- CS 대응이 필요하면 **`order_id`를 키로 운영 DB 조회** (Amplitude(익명) ↔ DB(PII) 분리).
- 이름·전화번호는 Toss Payments confirm API 응답을 B/E가 받아 운영 DB에만 저장.

---

## 부록: 운영 메모

- 모든 차트는 unpublished — 검토 후 게시 권장
- chartId / dashboardId 영구 식별자 — URL 안정적
- 차트/대시보드 삭제는 Amplitude MCP 도구 부재 — 사용자가 UI에서 직접 처리
- 트래킹 플랜 schema 등록·프로젝트 타임존 변경도 MCP 미노출 — 사용자가 콘솔에서 직접 처리
- D-3의 `d85fh9bw`(scene별 도달률)는 user property 자동 첨부 — **차트 안에서 segment만 추가**하면 성별/연령대별 컷 소비 패턴 즉석 도출 (신규 차트 불필요)
- D-3의 `nc3xhh2x`(max_scroll 분포)도 `character_id` segment 추가 시 연우/도윤 별 도달률 비교 즉석 도출
