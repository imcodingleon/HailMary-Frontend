import { DOYOON_TOKENS } from "./doyoonTokens";

// 도윤 페이지 헤더 — 도윤_final.html line 391~511 미러.
// ch별 우측 아이콘 자산 매핑: 0/7/ep = 緣 인장, 1~6 = 각 챕터 모티프.

const CH_ICON: Record<string, { src: string; isSeal: boolean }> = {
  "0":  { src: "/doyoon/motif/motif_seal_yeon.png",     isSeal: true  },
  "1":  { src: "/doyoon/icon/icon_person_dot.png",      isSeal: false },
  "2":  { src: "/doyoon/icon/icon_two_dots.png",        isSeal: false },
  "3":  { src: "/doyoon/icon/icon_gauge.png",           isSeal: false },
  "4":  { src: "/doyoon/icon/icon_radar.png",           isSeal: false },
  "5":  { src: "/doyoon/icon/icon_line_chart.png",      isSeal: false },
  "6":  { src: "/doyoon/icon/icon_bar_chart.png",       isSeal: false },
  "7":  { src: "/doyoon/motif/motif_seal_yeon.png",     isSeal: true  },
  "ep": { src: "/doyoon/motif/motif_seal_yeon.png",     isSeal: true  },
};

interface DoyoonPageHeadProps {
  ch: string;        // "0" | "1" | ... | "ep"
  hanja: string;     // "序" | "一" | ...
  title: React.ReactNode;
  sub: string;
}

export function DoyoonPageHead({ ch, hanja, title, sub }: DoyoonPageHeadProps) {
  const icon = CH_ICON[ch] ?? CH_ICON["0"];
  return (
    <div
      className="relative flex items-center gap-3 mb-3.5"
      style={{
        padding: "18px 8px 14px",
        background: "linear-gradient(180deg, #fffaf0, #fdf3e7)",
        borderRadius: 10,
        borderBottom: "0.5px solid rgba(139,105,20,0.20)",
      }}
    >
      <div
        className="relative flex flex-col items-center justify-center flex-shrink-0"
        style={{
          padding: "8px 12px",
          background: "rgba(139,105,20,0.05)",
          border: "0.5px solid rgba(139,105,20,0.45)",
          borderRadius: 2,
          gap: 4,
        }}
      >
        <span
          className="font-bold"
          style={{
            fontFamily: "var(--font-serif, serif)",
            fontSize: 18,
            color: DOYOON_TOKENS.warmGold,
            letterSpacing: "0.05em",
            lineHeight: 1.4,
            textShadow: "0 0 8px rgba(139,105,20,0.18)",
          }}
        >
          {hanja}
        </span>
        <span
          className="uppercase font-bold"
          style={{
            fontSize: 13,
            color: DOYOON_TOKENS.goldSoft,
            letterSpacing: "0.10em",
            lineHeight: 1.5,
          }}
        >
          {ch === "ep" ? "EP" : `CH-${ch}`}
        </span>
        <BadgeCorner pos="tl" />
        <BadgeCorner pos="tr" />
        <BadgeCorner pos="bl" />
        <BadgeCorner pos="br" />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="font-bold"
          style={{
            fontSize: 18,
            color: DOYOON_TOKENS.text,
            lineHeight: 1.4,
            marginBottom: 4,
            letterSpacing: "-0.01em",
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: DOYOON_TOKENS.goldSoft,
            letterSpacing: "0.02em",
            wordBreak: "keep-all",
            lineHeight: 1.5,
          }}
        >
          {sub}
        </div>
      </div>

      <div
        aria-hidden
        className="flex-shrink-0 bg-no-repeat bg-center bg-contain"
        style={{
          width: 48,
          height: 48,
          backgroundImage: `url(${icon.src})`,
          backgroundColor: icon.isSeal
            ? "rgba(255,250,235,0.95)"
            : "rgba(139,105,20,0.05)",
          border: icon.isSeal
            ? "1px solid rgba(139,105,20,0.55)"
            : "0.5px solid rgba(139,105,20,0.20)",
          borderRadius: 6,
          padding: 4,
          boxSizing: "border-box",
          filter: icon.isSeal
            ? "saturate(1.6) contrast(1.15) drop-shadow(0 1px 2px rgba(80,50,10,0.25))"
            : "drop-shadow(0 0 10px rgba(139,105,20,0.45)) drop-shadow(0 0 4px rgba(139,105,20,0.25))",
        }}
      />
    </div>
  );
}

function BadgeCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const offset: Record<
    "tl" | "tr" | "bl" | "br",
    { top?: number; bottom?: number; left?: number; right?: number; transform?: string }
  > = {
    tl: { top: -4, left: -4 },
    tr: { top: -4, right: -4, transform: "scaleX(-1)" },
    bl: { bottom: -4, left: -4, transform: "scaleY(-1)" },
    br: { bottom: -4, right: -4, transform: "scale(-1,-1)" },
  };
  return (
    <span
      aria-hidden
      className="absolute pointer-events-none bg-no-repeat bg-contain"
      style={{
        ...offset[pos],
        width: 14,
        height: 14,
        backgroundImage: "url(/doyoon/motif/motif_corner_frame_piece.png)",
        opacity: 1,
        filter: "hue-rotate(-12deg) saturate(1.6) brightness(0.85)",
      }}
    />
  );
}
