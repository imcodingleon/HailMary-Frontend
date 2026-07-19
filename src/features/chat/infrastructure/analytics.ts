// HANDOFF(H10): 분석 이벤트 = no-op 자리 → 실 이벤트 로깅(모드ON비율·재충전·호감도 등). 시그니처/인터페이스 유지.
// [infrastructure] 현재 아무것도 기록하지 않는다(동작 영향 없음). 호출 지점(seam)만 표시.
export type AnalyticsEvent =
  | { name: 'casual_message_sent'; characterId: string }
  | { name: 'saju_message_sent'; characterId: string } // 모드 ON 전송
  | { name: 'token_charged'; packageId: string }; // 재충전

export const analytics = {
  track(_event: AnalyticsEvent): void {
    // no-op (H10). 실연동 시 이벤트 전송 구현.
  },
};
