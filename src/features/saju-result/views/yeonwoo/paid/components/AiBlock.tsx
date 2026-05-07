interface AiBlockProps {
  text: string;
}

// AI 응답 박스. 한지 텍스처 배경 + 4모서리 ㄱ자 + 우하단 촛불.
// 디자인 원본: 연우_final.html .ai-block-yw 패턴 (모든 페이지 공통 자산).

export default function AiBlock({ text }: AiBlockProps) {
  return (
    <div
      className="relative rounded-md px-4 py-3.5 my-2.5 overflow-hidden"
      style={{
        // 디자인 원본 .ai-block-yw 패턴 (line 95~109):
        // 다크 그라디언트 97% 오버레이를 한지 텍스처 위에 깔아 한지가 3%만 노이즈로 비치게 함.
        // 한지 PNG 자체는 흰 톤이라 100%로 박으면 흰 배경 노출됨.
        background:
          "linear-gradient(rgba(26,26,24,0.97), rgba(26,26,24,0.97)), url(/yeonwoo/texture/texture_hanji_dark.png)",
        backgroundSize: "auto, 200px 200px",
        backgroundRepeat: "no-repeat, repeat",
        boxShadow:
          "0 0 0 0.5px rgba(200,168,112,0.18), 0 1px 3px rgba(0,0,0,0.25)",
      }}
    >
      <SealWatermark />
      <AiCorner pos="tl" />
      <AiCorner pos="tr" />
      <AiCorner pos="bl" />
      <AiCorner pos="br" />
      <AiFlame />
      <span className="sr-only">AI 생성</span>
      <p
        className="relative text-[14px] leading-[1.95] text-[#b0aea4] whitespace-pre-line"
        style={{
          fontFamily: "var(--font-nanum-myeongjo)",
          letterSpacing: "-0.01em",
          wordBreak: "keep-all",
          zIndex: 1,
        }}
      >
        {text}
      </p>
    </div>
  );
}

type CornerPos = "tl" | "tr" | "bl" | "br";

function AiCorner({ pos }: { pos: CornerPos }) {
  const transforms: Record<CornerPos, string> = {
    tl: "",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1,-1)",
  };
  const positions: Record<CornerPos, React.CSSProperties> = {
    tl: { top: 5, left: 5 },
    tr: { top: 5, right: 5 },
    bl: { bottom: 5, left: 5 },
    br: { bottom: 5, right: 5 },
  };
  return (
    <span
      aria-hidden
      className="absolute w-4 h-4 bg-no-repeat bg-contain pointer-events-none"
      style={{
        ...positions[pos],
        transform: transforms[pos],
        backgroundImage: "url(/yeonwoo/motif/motif_corner_frame_piece.svg)",
      }}
    />
  );
}

function AiFlame() {
  return (
    <span
      aria-hidden
      className="absolute bottom-2 right-2 w-5 h-7 bg-no-repeat bg-contain pointer-events-none opacity-80"
      style={{ backgroundImage: "url(/yeonwoo/candle/candle_weak_flame.svg)" }}
    />
  );
}

// 우상단 占 인장 큰 워터마크 (88×88, opacity 0.13, sepia filter)
// 디자인 원본 .ai-block-yw::after (line 1054~1067)
function SealWatermark() {
  return (
    <span
      aria-hidden
      className="absolute top-1 right-1 w-[88px] h-[88px] bg-no-repeat bg-contain pointer-events-none"
      style={{
        backgroundImage: "url(/yeonwoo/motif/motif_seal_jeom.svg)",
        backgroundPosition: "top right",
        opacity: 0.13,
        filter: "sepia(0.2)",
        zIndex: 0,
      }}
    />
  );
}
