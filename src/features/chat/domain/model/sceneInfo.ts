// [domain/model] 상태창(INFO) — 채팅 상단 패널의 월드 상태. 순수 타입.
// LLM이 응답 끝 <<<INFO>>> tail로 내보낸 값(감정 점수는 앱 관리라 여기 없음 — affinity 사용).
export interface SceneInfo {
  place: string; // 현재 장면의 장소
  timeHint: string; // 시간대 느낌 (BE JSON의 time_hint)
  relation: string; // 지금 상대와의 관계 한마디
  situation: string; // 이번 턴 상황 한 줄 요약
}
