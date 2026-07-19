// [ui] formatTime — epoch ms → "오후 2:30" 표기. 순수 함수.
// timeZone 고정으로 SSR/클라 일관(하이드레이션 불일치 방지). 표기 형식은 [TBD].
export function formatTime(epoch: number): string {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour: 'numeric',
    minute: '2-digit',
  }).format(epoch);
}
