// [ui] SilhouetteSlot — 미해금 카드의 "가려진 인물" 자리 (스펙 §7.2/§4.1). 표시 전용 Dumb.
// ❗인물·실루엣을 임의 SVG로 그리지 않는다. 단색/미세 그라데이션(심야갈→먹흑)으로 어두운 실루엣 느낌만.
// 이미지 도착 시: 어둡게 처리된 실루엣 컷(헤어 윤곽 정도만 식별, 얼굴 디테일 X)이 이 자리에 들어감.
export interface SilhouetteSlotProps {
  className?: string;
}

export default function SilhouetteSlot({ className = 'h-full w-full' }: SilhouetteSlotProps) {
  return <div className={`${className} bg-gradient-to-b from-simyagal to-meokheuk`} />;
}
