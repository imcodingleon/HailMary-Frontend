interface PersonFrameProps {
  person: "akyon" | "inyon";
  /**
   * 백엔드 spouse_match_service / spouse_avoid_service의 slotId.
   * 주어지면 `/images/spouse/yeonwoo/paid/{avoid|match}/{slotId}.png`로 동적 매칭.
   * 누락 시 기존 정적 fallback (`/yeonwoo/person/person_{person}.png`) 사용.
   */
  slotId?: string | null;
}

// 인물 프레임 (악연/인연). 통합 PNG 1차 + 4모서리 SVG 별도.
// 사용처: P-4 (악연), P-6 (인연).

const PERSON_TO_TYPE: Record<"akyon" | "inyon", "avoid" | "match"> = {
  akyon: "avoid",
  inyon: "match",
};

export default function PersonFrame({ person, slotId }: PersonFrameProps) {
  const personImg = slotId
    ? `/images/spouse/yeonwoo/paid/${PERSON_TO_TYPE[person]}/${slotId}.png`
    : `/yeonwoo/person/person_${person}.png`;
  const fullFrame = `/yeonwoo/frame/frame_${person}_yw_full.png`;
  return (
    <div className="relative my-3 mx-auto w-full max-w-[280px] aspect-[3/4]">
      {/* 1차 배경: 인물 사진 */}
      <div
        aria-hidden
        className="absolute inset-2 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${personImg})`,
          backgroundSize: "cover",
        }}
      />
      {/* fallback / 통합 프레임 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-no-repeat bg-center bg-contain pointer-events-none"
        style={{ backgroundImage: `url(${fullFrame})` }}
      />
      {/* 4모서리 SVG */}
      <FrameCorner person={person} pos="tl" />
      <FrameCorner person={person} pos="tr" />
      <FrameCorner person={person} pos="bl" />
      <FrameCorner person={person} pos="br" />
    </div>
  );
}

type FramePos = "tl" | "tr" | "bl" | "br";

const FRAME_POS_TO_FILE: Record<FramePos, string> = {
  tl: "top_left",
  tr: "top_right",
  bl: "bottom_left",
  br: "bottom_right",
};

function FrameCorner({ person, pos }: { person: "akyon" | "inyon"; pos: FramePos }) {
  const positions: Record<FramePos, React.CSSProperties> = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  };
  return (
    <span
      aria-hidden
      className="absolute w-10 h-10 bg-no-repeat bg-contain pointer-events-none"
      style={{
        ...positions[pos],
        backgroundImage: `url(/yeonwoo/frame/frame_${person}_yw_${FRAME_POS_TO_FILE[pos]}.svg)`,
      }}
    />
  );
}
