interface PageHeadProps {
  chHanja: string;          // 序 / 一 / 二 ...
  chCode: string;           // CH-0 / CH-1 ...
  title: string;            // "시작에 앞서"
  sub: string;              // "너의 명줄을 펼치기 전에"
  iconAsset: string;        // /yeonwoo/... full url
  iconOpacity?: number;     // P-0/P-10/P-11 占 인장 0.35
}

// 페이지 상단 헤더. 한자 번호 박스 + 제목/부제 + 우측 챕터 아이콘.
// 디자인 원본: 연우_final.html line 408~513 (CSS), 1479~1492 (HTML 예시).

export default function PageHead({
  chHanja,
  chCode,
  title,
  sub,
  iconAsset,
  iconOpacity = 1,
}: PageHeadProps) {
  return (
    <div
      className="relative flex items-center gap-3 rounded-[10px] mb-3.5"
      style={{
        padding: "18px 8px 14px",
        background: "linear-gradient(180deg, #151513, #111110)",
        borderBottom: "0.5px solid rgba(200,168,112,0.18)",
      }}
    >
      {/* 한자 번호 박스 */}
      <span
        className="relative flex flex-col items-center justify-center flex-shrink-0"
        style={{
          padding: "8px 12px",
          background: "rgba(200,168,112,0.04)",
          border: "0.5px solid rgba(200,168,112,0.4)",
          borderRadius: 2,
          gap: 4,
        }}
      >
        <span
          className="text-[18px] font-bold leading-[1.4]"
          style={{
            fontFamily: "'Noto Serif KR', 'Nanum Myeongjo', serif",
            color: "#E8C9A0",
            letterSpacing: "0.05em",
            textShadow: "0 0 8px rgba(200,168,112,0.25)",
          }}
        >
          {chHanja}
        </span>
        <span
          className="text-[13px] font-medium leading-[1.5] uppercase"
          style={{ color: "#8a8580", letterSpacing: "0.15em" }}
        >
          {chCode}
        </span>
        {/* 4모서리 ㄱ자 데코 */}
        <CornerDeco pos="tl" />
        <CornerDeco pos="tr" />
        <CornerDeco pos="bl" />
        <CornerDeco pos="br" />
      </span>

      {/* 텍스트 영역 */}
      <div className="flex-1 min-w-0">
        <div
          className="text-[18px] font-bold leading-[1.4] mb-1"
          style={{
            fontFamily: "'Noto Serif KR', 'Nanum Myeongjo', serif",
            color: "#f0ede8",
            letterSpacing: "0.02em",
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
        <div
          className="text-[13px] leading-[1.5]"
          style={{
            color: "#a8a6a0",
            letterSpacing: "0.02em",
            wordBreak: "keep-all",
          }}
        >
          {sub}
        </div>
      </div>

      {/* 우측 챕터 아이콘 */}
      <div
        aria-hidden
        className="flex-shrink-0 w-12 h-12 bg-no-repeat bg-center bg-contain rounded-md"
        style={{
          backgroundImage: `url(${iconAsset})`,
          opacity: iconOpacity,
          filter:
            "drop-shadow(0 0 10px rgba(200,168,112,0.55)) drop-shadow(0 0 4px rgba(200,168,112,0.35))",
          backgroundColor: "rgba(200,168,112,0.04)",
          border: "0.5px solid rgba(200,168,112,0.18)",
          padding: 4,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

type CornerPos = "tl" | "tr" | "bl" | "br";

function CornerDeco({ pos }: { pos: CornerPos }) {
  const transforms: Record<CornerPos, string> = {
    tl: "",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1,-1)",
  };
  const positions: Record<CornerPos, React.CSSProperties> = {
    tl: { top: -3, left: -3 },
    tr: { top: -3, right: -3 },
    bl: { bottom: -3, left: -3 },
    br: { bottom: -3, right: -3 },
  };
  return (
    <span
      aria-hidden
      className="absolute w-2.5 h-2.5 bg-no-repeat bg-contain pointer-events-none"
      style={{
        ...positions[pos],
        transform: transforms[pos],
        backgroundImage: "url(/yeonwoo/motif/motif_corner_frame_piece.svg)",
        opacity: 0.85,
      }}
    />
  );
}
