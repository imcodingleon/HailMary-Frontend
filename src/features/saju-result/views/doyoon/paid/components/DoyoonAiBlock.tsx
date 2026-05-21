import { DOYOON_TOKENS } from "./doyoonTokens";

// 도윤 AI 박스 — 도윤_final.html line 689~810 미러.
// 4 모서리 ㄱ자 + 우상단 분석 인장 워터마크 + 라이트 한지 텍스처.

interface DoyoonAiBlockProps {
  body: string;
}

export function DoyoonAiBlock({ body }: DoyoonAiBlockProps) {
  return (
    <div
      className="relative rounded-md my-2.5"
      style={{
        background:
          "linear-gradient(rgba(255,250,240,0.62), rgba(255,250,240,0.62)), url(/doyoon/texture/texture_hanji_light.png)",
        backgroundSize: "auto, 200px 200px",
        padding: "14px 16px",
        boxShadow:
          "0 0 0 0.5px rgba(139,105,20,0.22), 0 1px 3px rgba(120,80,30,0.06)",
      }}
    >
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      <div
        className="absolute right-[10px] top-[10px] w-[96px] h-[96px] bg-no-repeat bg-right-top bg-contain"
        style={{
          backgroundImage: "url(/doyoon/dy_sub/seal_bunseok_dy_.png)",
          opacity: 0.13,
          pointerEvents: "none",
        }}
        aria-hidden
      />
      <p
        className="relative text-[14px] leading-[1.95] whitespace-pre-line"
        style={{ color: DOYOON_TOKENS.textSoft, zIndex: 1 }}
      >
        {body.length > 0 && (
          <span
            style={{
              float: "left",
              fontSize: "32px",
              lineHeight: 0.95,
              fontWeight: 700,
              color: DOYOON_TOKENS.warmGold,
              padding: "2px 6px 0 0",
              fontFamily: '"NotoSerifTC", "ChosunNm", serif',
            }}
          >
            {body.charAt(0)}
          </span>
        )}
        {body.substring(1)}
      </p>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<
    "tl" | "tr" | "bl" | "br",
    { top?: number; bottom?: number; left?: number; right?: number; transform?: string }
  > = {
    tl: { top: 5, left: 5 },
    tr: { top: 5, right: 5, transform: "scaleX(-1)" },
    bl: { bottom: 5, left: 5, transform: "scaleY(-1)" },
    br: { bottom: 5, right: 5, transform: "scale(-1,-1)" },
  };
  return (
    <span
      aria-hidden
      className="absolute w-5 h-5 bg-no-repeat bg-contain pointer-events-none"
      style={{
        ...map[pos],
        backgroundImage: "url(/doyoon/motif/motif_corner_frame_piece.png)",
        opacity: 0.7,
        filter: "hue-rotate(-15deg) saturate(1.05)",
        zIndex: 0,
      }}
    />
  );
}
