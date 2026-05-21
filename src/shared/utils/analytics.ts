// =============================================================================
// [DA팀 연동 가이드] Amplitude SDK 연결 방법
// =============================================================================
//
// 1. SDK 설치:
//    npm install @amplitude/analytics-browser
//    (이미 설치 완료 — package.json 참조)
//
// 2. 초기화 위치: src/app/AmplitudeProvider.tsx에서 initAmplitude() 호출.
//    AmplitudeProvider는 src/app/layout.tsx에 마운트됨.
//    import * as amplitude from "@amplitude/analytics-browser";
//    amplitude.init("YOUR_API_KEY", {
//      defaultTracking: {
//        attribution: true,        // UTM·referrer·광고 click ID 17종 자동 수집
//        pageViews: false,
//        sessions: false,
//        formInteractions: false,
//        fileDownloads: false,
//      },
//    });
//
// 3. 이 파일에서 수정할 부분:
//    - 상단 `import * as amplitude from "@amplitude/analytics-browser"` 적용 완료
//    - trackEvent 내부의 `amplitude.track(eventName, payload)` 호출은 그대로 유지
//    - initAmplitude()는 idempotent + lazy init — trackEvent 호출 시 자동 보장돼
//      AmplitudeProvider useEffect 타이밍과 무관하게 첫 이벤트 발화 전 init 완료.
//
// 4. device_id / session_id:
//    SDK 자체 device_id/session_id 사용으로 통일됨.
//    getDeviceId() → amplitude.getDeviceId() 래핑
//    getSessionId() → amplitude.getSessionId() 래핑
//    payload의 device_id/session_id는 SDK 메타와 동일 값 → 단일 진실원.
//    기존 자체 UUID 생성 로직(localStorage `hm_device_id` / sessionStorage
//    `hm_session_id`) 제거됨. 잔존 키는 무해(orphaned).
//
// =============================================================================

import * as amplitude from "@amplitude/analytics-browser";

let initialized = false;

// staging/prod 각자 자체 Amplitude 프로젝트로 분리됐기 때문에 QA 게이트와
// 트래킹 차단 결합을 끊는다. QA_GATE_ENABLED는 QaAuthGuard 비밀번호 게이트
// 전용으로만 의미를 유지한다.

export function initAmplitude(): void {
  if (initialized || typeof window === "undefined") return;
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) return;
  amplitude.init(apiKey, {
    defaultTracking: {
      attribution: true,
      pageViews: false,
      sessions: false,
      formInteractions: false,
      fileDownloads: false,
    },
  });
  initialized = true;
}

export function getDeviceId(): string {
  initAmplitude();
  return amplitude.getDeviceId() ?? "";
}

export function getSessionId(): string {
  initAmplitude();
  const sid = amplitude.getSessionId();
  return sid != null ? String(sid) : "";
}

export function setUserId(userId: string | null): void {
  initAmplitude();
  amplitude.setUserId(userId ?? undefined);
}

export function setUserProperties(properties: Record<string, unknown>): void {
  initAmplitude();
  const identify = new amplitude.Identify();
  for (const [key, value] of Object.entries(properties)) {
    if (value === undefined || value === null) continue;
    identify.set(key, value as string | number | boolean);
  }
  amplitude.identify(identify);
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics] identify", properties);
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  initAmplitude();

  const payload = {
    device_id: getDeviceId(),
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
    ...properties,
  };

  amplitude.track(eventName, payload);

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, payload);
  }
}
