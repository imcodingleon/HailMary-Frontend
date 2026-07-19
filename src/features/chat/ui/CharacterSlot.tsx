// [ui] CharacterSlot — 캐릭터 일러스트 placeholder (스펙 §4.1). Dumb.
// ❗코드에서 캐릭터를 SVG/이미지로 그리지 않는다. 점선 테두리 + 토큰 색 + [캐릭터명] 라벨만.
// 이 점선 테두리는 "일러스트 영역"에만 적용 — 카드 프레임에는 적용하지 않는다.
import type { AccentToken } from '@/features/chat/domain/model/character';

export interface CharacterSlotProps {
  label: string;
  accent: AccentToken;
  /** 사이징은 호출부가 결정(카드=aspect 영역, 상세=full-bleed). 기본은 부모 채움. */
  className?: string;
  /** true=점선 테두리(이미지 자리 표시, 상세·썸네일). false=솔리드 채움(풀카드 — 카드 전체 이미지 영역). */
  bordered?: boolean;
}

// accent 토큰 키 → Tailwind 토큰 클래스 (literal이라 JIT가 인식). 하드코딩 hex 없음.
const ACCENT_BORDER: Record<AccentToken, string> = {
  meokheuk: 'border-meokheuk',
  dohwahong: 'border-dohwahong',
  seonhwanggeum: 'border-seonhwanggeum',
  simyagal: 'border-simyagal',
  hwaseonji: 'border-hwaseonji',
};
const ACCENT_TEXT: Record<AccentToken, string> = {
  meokheuk: 'text-meokheuk',
  dohwahong: 'text-dohwahong',
  seonhwanggeum: 'text-seonhwanggeum',
  simyagal: 'text-simyagal',
  hwaseonji: 'text-hwaseonji',
};

export default function CharacterSlot({
  label,
  accent,
  className = 'h-full w-full',
  bordered = true,
}: CharacterSlotProps) {
  // bordered: 점선 테두리 + 먹흑(이미지 자리 표시). 비테두리: 심야갈 솔리드(풀카드, 페이지 배경과 구분).
  const frame = bordered
    ? `rounded-card border-2 border-dashed bg-meokheuk ${ACCENT_BORDER[accent]}`
    : 'bg-simyagal';
  return (
    <div className={`${className} flex items-center justify-center ${frame}`}>
      <span className={`font-body text-xs ${ACCENT_TEXT[accent]}`}>[{label}]</span>
    </div>
  );
}
