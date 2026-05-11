// 매력살 카드 (P-5 3-1).
// 등급(A/S/SS/SSS) 라벨 없음 — 매력살별 고유 색상으로 차별화.
// 백엔드 value_object/charm_sals.py CHARM_SALS dict와 매칭.

export interface CharmSalProps {
  /** "do_hwa_sal" 등 백엔드 키 — 색상 매핑에 사용 */
  charm_key?: string;
  name_kor: string;
  name_han: string;
  trait: string;
}

interface CharmTone {
  border: string;
  bgFrom: string;
  bgTo: string;
  hanColor: string;
  korColor: string;
  glow: string;
  textShadow: string;
}

// 매력살별 색상 매핑 (명리 본질 기반).
const TONES: Record<string, CharmTone> = {
  // 도화살 — 복숭아꽃 분홍 (가장 대표적 도화 색)
  do_hwa_sal: {
    border: "rgba(212,83,126,0.50)",
    bgFrom: "rgba(212,83,126,0.10)",
    bgTo: "rgba(212,83,126,0.03)",
    hanColor: "#D4537E",
    korColor: "#f0d4dc",
    glow: "none",
    textShadow: "none",
  },
  // 홍염살 — 더 진한 와인/적색 (홍염 = 붉은 염색)
  hong_yeom_sal: {
    border: "rgba(195,71,90,0.55)",
    bgFrom: "rgba(195,71,90,0.12)",
    bgTo: "rgba(195,71,90,0.04)",
    hanColor: "#E26577",
    korColor: "#f0d0d6",
    glow: "0 0 12px rgba(226,101,119,0.25)",
    textShadow: "0 0 6px rgba(226,101,119,0.30)",
  },
  // 천을귀인 — 보라+글로우 (귀인 중 최상)
  cheon_eul_gwi_in: {
    border: "rgba(167,139,250,0.65)",
    bgFrom: "rgba(167,139,250,0.13)",
    bgTo: "rgba(167,139,250,0.04)",
    hanColor: "#A78BFA",
    korColor: "#e0d8f0",
    glow: "0 0 22px rgba(167,139,250,0.40)",
    textShadow: "0 0 8px rgba(167,139,250,0.45)",
  },
  // 화개살 — 청록 (예술·신비)
  hwa_gae_sal: {
    border: "rgba(93,202,165,0.50)",
    bgFrom: "rgba(93,202,165,0.08)",
    bgTo: "rgba(93,202,165,0.02)",
    hanColor: "#5DCAA5",
    korColor: "#d4e8e0",
    glow: "none",
    textShadow: "none",
  },
  // 금여록 — 골드 (금·풍요)
  geum_yeo_rok: {
    border: "rgba(232,201,160,0.55)",
    bgFrom: "rgba(232,201,160,0.10)",
    bgTo: "rgba(232,201,160,0.03)",
    hanColor: "#E8C9A0",
    korColor: "#e8e0d4",
    glow: "0 0 10px rgba(232,201,160,0.20)",
    textShadow: "none",
  },
  // 공망 — 은회색 (빈 자리)
  gong_mang: {
    border: "rgba(180,180,184,0.45)",
    bgFrom: "rgba(200,200,204,0.05)",
    bgTo: "rgba(180,180,184,0.02)",
    hanColor: "#B0AEA4",
    korColor: "#d0cec8",
    glow: "none",
    textShadow: "none",
  },
};

// 기본 fallback (알 수 없는 매력살 키)
const DEFAULT_TONE: CharmTone = {
  border: "rgba(232,201,160,0.35)",
  bgFrom: "rgba(232,201,160,0.06)",
  bgTo: "rgba(232,201,160,0.02)",
  hanColor: "#E8C9A0",
  korColor: "#d8d6d0",
  glow: "none",
  textShadow: "none",
};

export default function CharmSalCard({ sal }: { sal: CharmSalProps }) {
  const tone = (sal.charm_key && TONES[sal.charm_key]) || DEFAULT_TONE;

  return (
    <div
      className="relative rounded-[10px] overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${tone.bgFrom}, ${tone.bgTo})`,
        border: `0.5px solid ${tone.border}`,
        boxShadow: tone.glow,
        padding: "14px 11px 12px",
        minHeight: "140px",
      }}
    >
      {/* 우상단 작은 인장 SVG */}
      <SealIcon color={tone.hanColor} />

      {/* 본문 — 한자 + 한글 */}
      <div className="flex flex-col items-center text-center pt-1 pb-1">
        <div
          style={{
            fontSize: "30px",
            fontFamily: "var(--font-nanum-myeongjo)",
            color: tone.hanColor,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textShadow: tone.textShadow,
            lineHeight: 1.1,
          }}
        >
          {sal.name_han}
        </div>
        <div
          className="mt-1"
          style={{
            fontSize: "13px",
            color: tone.korColor,
            letterSpacing: "0.04em",
          }}
        >
          {sal.name_kor}
        </div>
      </div>

      {/* 구분선 */}
      <div
        className="my-2"
        style={{
          height: "0.5px",
          background: `linear-gradient(90deg, transparent, ${tone.border}, transparent)`,
        }}
      />

      {/* 특징 한 줄 */}
      <div
        className="text-center"
        style={{
          fontSize: "12px",
          lineHeight: 1.55,
          color: "#a8a6a0",
          wordBreak: "keep-all",
          padding: "0 2px",
        }}
      >
        {sal.trait}
      </div>
    </div>
  );
}

// ── 인라인 SVG: 작은 인장 (우상단) ──
function SealIcon({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="absolute"
      style={{ top: "8px", right: "8px", opacity: 0.65 }}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="11"
        fontFamily="serif"
        fontWeight="700"
        fill={color}
      >
        占
      </text>
    </svg>
  );
}
