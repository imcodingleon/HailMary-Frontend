# Amplitude 이벤트 트래킹 작업 계획 — Yeonwoo 유료 결과 12페이지

작성일: 2026-05-19
대상: `yeonwoo` 캐릭터 **유료(paid)** 결과 페이지 p0~p11 (사용자 화면 표기 1~12)
범위 제외: doyoon, 무료(free) 흐름, 결제 이전 단계

> **확장 약속**: doyoon 유료 페이지가 추후 도입되어도 본 이벤트 포맷(이벤트명·속성 키·페이지 매핑)을 그대로 재사용한다. 분석가는 `character` 속성값만 `"yeonwoo"` → `"doyoon"`으로 바뀐 것으로 식별한다.

---

## 1. 목적

- 사용자가 유료 결과 각 페이지에 **진입했는지**, **얼만큼 읽었는지(스크롤)**, **얼만큼 머물렀는지(체류시간)** 측정
- 사용자/사주 속성을 Amplitude user property로 1회 set하여 모든 이벤트를 **인구 통계·사주 세그먼트로 분해** 가능하게 함
- 최종 활용: 페이지별 이탈 분포, 챕터별 완독률, 사주 세그먼트별 콘텐츠 만족도 분석

---

## 2. 이벤트 설계 — 페이지별 진입/이탈 (24개)

이벤트명을 페이지별로 분리한다. Amplitude 이벤트 카탈로그에서 페이지를 바로 식별·필터할 수 있어 분석 동선이 짧아진다.

**네이밍 규칙**: `page{N}_entered`, `page{N}_exited` — N은 **사용자 표기 1~12**.
코드 키 `p0`~`p11`은 이벤트 속성 `page_key`로 함께 전송 (분석가가 양쪽 다 조회 가능).

| 이벤트명 | 발화 시점 | 주요 속성 |
|---|---|---|
| `page1_entered` ~ `page12_entered` (12종) | 해당 페이지 마운트 직후 1회 | page_key, page_number, page_title, order_id, character |
| `page1_exited` ~ `page12_exited` (12종) | 언마운트 / route change / `pagehide` / `visibilitychange=hidden` | 위 + `max_scroll_pct`, `dwell_ms`, `exit_reason` |

**진입과 이탈을 분리**하는 이유:
- 진입은 즉시 발화 → 도달률(funnel) 명확
- 이탈은 max_scroll·dwell까지 누적해서 한 번에 → 완독률·체류 분석

**페이지별 이벤트명을 쓰는 이유**:
- Amplitude 이벤트 목록에서 페이지를 바로 식별 (`page3_exited` 클릭만으로 분석 시작)
- 페이지별 퍼널·차트 구성 시 이벤트 선택이 단순화됨
- 단일 이벤트 + page_number 필터 방식 대비 카탈로그는 조금 늘지만 (2 → 24) 분석 생산성이 더 큼

---

## 3. 페이지 식별 (p0~p11 ↔ 1~12)

| page_key | page_number | page_title | 컴포넌트 |
|---|---|---|---|
| `p0` | 1 | `prologue` | ProloguePage |
| `p1` | 2 | `self_part1` | SelfPart1Page |
| `p2` | 3 | `self_part2` | SelfPart2Page |
| `p3` | 4 | `blocking_part1` | BlockingPart1Page |
| `p4` | 5 | `blocking_part2` | BlockingPart2Page |
| `p5` | 6 | `charm` | CharmPage |
| `p6` | 7 | `destined_part1` | DestinedPart1Page |
| `p7` | 8 | `destined_part2` | DestinedPart2Page |
| `p8` | 9 | `timing` | TimingPage |
| `p9` | 10 | `practice` | PracticePage |
| `p10` | 11 | `letter` | LetterPage |
| `p11` | 12 | `epilogue` | EpiloguePage |

매핑 단일 진실원: `src/features/saju-result/domain/paidReport.ts`의 `PaidChapterKey`.

---

## 4. 공통 이벤트 속성 (모든 paid 이벤트)

| key | type | 예시 | 설명 |
|---|---|---|---|
| `page_key` | string | `"p3"` | 코드 식별자 |
| `page_number` | number | `4` | 사용자 화면 표기 (1~12) |
| `page_title` | string | `"blocking_part1"` | 챕터 슬러그 |
| `order_id` | string | `"ord_..."` | 결제 주문 ID |
| `character` | string | `"yeonwoo"` | 캐릭터 식별자 (doyoon 확장 대비) |

`device_id`, `session_id`, `timestamp`는 `trackEvent()`가 자동 주입 (`shared/utils/analytics.ts`).

---

## 5. `page{N}_exited` 전용 속성

| key | type | 설명 |
|---|---|---|
| `max_scroll_pct` | number (0~100) | 페이지 체류 중 도달한 최대 스크롤 비율. throttle 200ms로 갱신. |
| `dwell_ms` | number | 진입 ~ 이탈까지 millisecond |
| `exit_reason` | string | `"page_change"`(셸 내 슬라이드 이동) \| `"unmount"`(셸 언마운트·route change) \| `"pagehide"`(모바일 뒤로가기·앱 전환) \| `"visibility_hidden"`(탭 전환) |

`max_scroll_pct` 계산식:
```
pct = (scrollTop + viewportHeight) / scrollHeight * 100
```
가시 영역 하단 기준 백분율. 100이면 완독.

---

## 6. 사용자/사주 속성 — Amplitude user property로 set

발화 위치: **p0 페이지 진입 시 1회만** `amplitude.identify()` + `setUserProperties`로 적용.
적용 후 **모든 이벤트가 자동으로 해당 user property로 쿼리·세그먼트** 가능.

### 6-1. 사용자 속성 (PII 가공 후)

| user property | type | 가공 규칙 |
|---|---|---|
| `user_nickname` | string | 사용자 입력 그대로 |
| `user_email_domain` | string | 이메일에서 `@` 뒤만 (예: `gmail.com`) |
| `user_email_hash` | string | 원본 이메일 SHA-256 (식별 가능하지만 평문 노출 X) |
| `user_name_initial` | string | 이름 첫 글자만 (예: "강○○") |

**원본 이름·이메일은 user property에 절대 set 금지.** 식별이 필요하면 hash, 표시는 initial.

### 6-2. 사주 속성 (가공값만)

| user property | type | 원본 → 가공 규칙 |
|---|---|---|
| `birth_year` | number | YYYY-MM-DD → 연도만 |
| `age_group` | string | 연 → `"20s"`, `"30s"` 등 10년 단위 |
| `birth_branch` | string | 태어난 시각 → 12지(자축인묘…) 시진 |
| `gender` | string | `"M"` \| `"F"` \| `"other"` |

생년월일·태어난 시각 원본은 **절대 user property에 보내지 않는다.**

### 6-3. user_id

`amplitude.setUserId(user_id)` — 백엔드 사용자 PK 사용. 결제 후 첫 page_entered 직전에 set.

---

## 7. 구현 위치 (다음 단계 작업 대상 — 이번 산출물엔 코드 미포함)

| 파일 | 추가/수정 | 역할 |
|---|---|---|
| `src/features/saju-result/hooks/usePaidPageTracking.ts` (신규) | 신규 | 진입/이탈/스크롤/체류 추적 훅. `usePaidPageTracking({ pageKey, pageNumber, pageTitle, orderId })` |
| `src/features/saju-result/hooks/usePaidUserPropertiesSync.ts` (신규) | 신규 | p0 진입 시 user property identify 1회 실행 |
| `src/features/saju-result/views/yeonwoo/paid/pages/*.tsx` | 수정 (12개) | 각 페이지 최상단에서 `usePaidPageTracking` 호출 |
| `src/features/saju-result/views/yeonwoo/paid/pages/ProloguePage.tsx` | 추가 호출 | `usePaidUserPropertiesSync` 호출 (p0 전용) |
| `src/shared/utils/analytics.ts` | 보강 | `setUserProperties`, `setUserId` 래퍼 추가 (현재 trackEvent만 노출) |

도메인·DDD 의존성 방향 준수: 훅은 `shared/utils/analytics.ts`만 의존. View는 훅만 호출.

---

## 8. 스크롤·체류 측정 메커니즘 (요약)

- 진입 시 `entered_at = performance.now()`, `max_scroll_pct = 0`
- `window` scroll listener throttle 200ms → `max_scroll_pct = max(prev, current)`
- 이탈 트리거 4종 모두 처리:
  1. 셸 내 슬라이드 페이지 전환 (`page_change`) — `PaidShell`의 `currentIdx` 변경
  2. React unmount (`useEffect` cleanup) — 셸 자체 언마운트·route change
  3. `pagehide` 이벤트 (모바일 뒤로가기·앱 전환)
  4. `visibilitychange === "hidden"` (탭 전환)
- 이탈 시 해당 페이지의 `page{N}_exited` 1회 발화 후 listener 정리. 중복 방지 플래그 사용.

---

## 9. PII·법무 체크

- 이메일·이름 원본은 어떤 이벤트·user property에도 보내지 않는다.
- 생년월일·태어난 시간 원본도 가공값만 전송.
- 동의 화면(개인정보 수집 동의)에 "분석 도구로 가공된 통계값 전송" 문구가 포함되어 있는지 별도 확인 필요 (이번 작업 범위 외).

---

## 10. 산출물

1. **본 문서** — 작업 계획 (`HailMary-Frontend/docs/amplitude/amplitude-paid-report.md`)
2. **이벤트 스펙 표** — `Hailmary-docs/DA-Amplitude/260519(화)/yeonwoo_eventlog.md`
3. **코드 구현** — 2026-05-19 1차, 2026-05-20 복구 완료. 아래 §11 참조.

---

## 11. 구현 현황 (2026-05-20 기준)

### ✅ 코드 (현재 main 기준 실재 파일)

| 파일 | 역할 |
|---|---|
| `src/shared/utils/analytics.ts` | `trackEvent` + `setUserId` + `setUserProperties` 래퍼 |
| `src/features/saju-result/domain/paidPageMeta.ts` | 12 페이지 메타 `PAID_PAGES` 단일 진실원 |
| `src/features/saju-result/domain/paidReport.ts` | `PaidReportUser` 타입 + `PaidReport.user` 필드 |
| `src/features/saju-result/hooks/usePaidPageTracking.ts` | `page{N}_entered/exited` 발화 + scroll/dwell + 4종 `exit_reason` |
| `src/features/saju-result/hooks/usePaidUserPropertiesSync.ts` | p0 진입 시 1회 identify + setUserId |
| `src/features/saju-result/views/yeonwoo/paid/PaidShell.tsx` | `PAID_PAGES` 순회 12회 트래킹 호출 + p0 identify 호출, `orderId/character/user` props |
| `src/features/saju-result/views/yeonwoo/paid/YeonwooPaidScene.tsx` | `report.order_id` + `character="yeonwoo"` + `user` props 전달 |
| `src/app/saju/paid/[order_id]/PaidResultClient.tsx` | `user={state.report.user}` 인입 |
| `src/app/dev/yeonwoo/full/page.tsx` | dev 픽스처: `orderId="dev-fixture"` + `character="yeonwoo"` |

### 🎯 wire-in 전략 — PaidShell 일괄 호출

스펙 §7 표는 "각 페이지에서 훅 호출"로 적혀 있지만, 실제 구현은 **PaidShell이 12회 호출**하는 방식으로 단순화. 12 페이지 컴포넌트는 수정 없이 그대로. hooks 규칙 준수를 위해 항상 12회 호출하되 `active = currentIdx === i`로 분기.

장점:
- 12 페이지 컴포넌트 수정 불필요 → 콘텐츠 작업과 트래킹 작업이 격리
- 트래킹 wiring 단일 진입점 → 누수/중복 발견 쉬움
- `nav.currentIdx` 전이로 인한 `page_change` 이탈 발화가 PaidShell 안에서 자연스럽게 일어남

### 🧪 검증 (2026-05-20)

- `npx tsc --noEmit` exit=0 (0 errors)
- 백엔드 `ruff check` All checks passed
- 백엔드 `python -c "from app.main import app"` OK, uvicorn 부팅 정상

### ⏳ 후속 작업

- `User.nickname` 도입 시 `usePaidUserPropertiesSync` 가 `user_nickname` 정상 전송 (백엔드 동시 반영)
- doyoon 유료 페이지 도입 시 `PaidShell` props 의 `character` / `branding` / `tocItems` 만 바뀜, 동일 wire-in 재사용
- 개인정보 수집 동의 문구 법무 확인 (이번 작업 범위 외)

---

## 12. 후속 변경 — 2026-05-20 오후 (정사 문서 링크)

본 절은 코드 구조에 영향을 준 변경만 짧게 요약. 시간순 흐름·결정 사유 전체는 `Hailmary-docs/DA-Amplitude/260520(수)/recovery-and-refactor.md` 참조.

### PaidShell shared 이전 (Option A 리팩토링)

doyoon 유료 페이지 확장 대비. PaidShell 자체는 character-agnostic 이어야 한다는 인식 하에 위치·시그니처 정리.

| 항목 | 변경 |
|---|---|
| `views/yeonwoo/paid/PaidShell.tsx` | **제거** |
| `views/yeonwoo/paid/components/TocModal.tsx` | **제거** |
| `views/shared/paid/PaidShell.tsx` | **신규** — character-agnostic |
| `views/shared/paid/TocModal.tsx` | **신규** — `title` + `items` 받는 generic |
| `views/shared/paid/types.ts` | **신규** — `PaidShellBranding`, `TocItem` |
| `views/yeonwoo/paid/yeonwooPaidConfig.ts` | **신규** — `YEONWOO_BRANDING`, `YEONWOO_TOC_ITEMS` |

PaidShell props 시그니처:
```ts
interface PaidShellProps {
  children: ReactNode;
  orderId: string;
  character: string;                      // "yeonwoo" | "doyoon"
  branding: PaidShellBranding;            // 헤더·TOC 캐릭터 정보
  tocItems: ReadonlyArray<TocItem>;       // 캐릭터별 TOC
  pages?: ReadonlyArray<PaidPageMeta>;    // page 슬러그 다를 시 override (기본 PAID_PAGES)
  user?: PaidUserProperties | null;
}
```

### user_id 형식 (백엔드 응답 계약)

백엔드 `PaidReportResponse.user.user_id` 가 `f"usr_{user.id}"` 형식으로 내려옴 (Amplitude 최소 길이 5자 충족). 프론트 `usePaidUserPropertiesSync` 는 받은 값을 그대로 `setUserId()` 에 넘기므로 코드 변경 없음 — 응답 계약만 알아두면 됨.
