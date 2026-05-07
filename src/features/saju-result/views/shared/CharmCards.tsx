"use client";

import type {
  CharmCopyPool,
  CharmManifestationKey,
  CharmTypeKey,
  CharmView,
} from "@/features/saju-result/domain/types";

function pickIndex(id: string, poolLength: number): number {
  if (poolLength === 0) return 0;
  let hash = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash % poolLength;
}

function resolveCharmLabel(charmStrength: number): string {
  const table: ReadonlyArray<{ scoreMin: number; label: string }> = [
    { scoreMin: 0, label: "숨겨진 매력" },
    { scoreMin: 7, label: "잠재적 매력" },
    { scoreMin: 14, label: "은은한 매력" },
    { scoreMin: 20, label: "내재된 매력" },
    { scoreMin: 28, label: "조용한 매력" },
    { scoreMin: 34, label: "차분한 매력" },
    { scoreMin: 40, label: "안정적 매력" },
    { scoreMin: 46, label: "뚜렷한 매력" },
    { scoreMin: 52, label: "발현된 매력" },
    { scoreMin: 58, label: "풍부한 매력" },
    { scoreMin: 63, label: "강한 매력" },
    { scoreMin: 68, label: "탁월한 매력" },
    { scoreMin: 73, label: "빼어난 매력" },
    { scoreMin: 78, label: "압도적 매력" },
    { scoreMin: 83, label: "희귀한 매력" },
    { scoreMin: 89, label: "전설적 매력" },
  ];
  const clamped = Math.max(0, Math.min(100, charmStrength));
  let label = table[0]?.label ?? "매력";
  for (const bucket of table) {
    if (clamped >= bucket.scoreMin) label = bucket.label;
  }
  return label;
}

export type CharmCardsTheme = "dark" | "beige";

const THEME_TOKENS = {
  dark: {
    labelColor: "#856C51",
    bodyColor: "#D0C5B6",
    typeNameColor: "#c9a96e",
    typeNameShadow: "0 0 12px rgba(201,169,110,0.4)",
    typeBorderColor: "#856C51",
    typeBg: "rgba(133,108,81,0.08)",
    typeGlow: "transparent",
    manifestBorderColor: "#9CC8B0",
    manifestBg: "rgba(156,200,176,0.08)",
    manifestGlow: "rgba(156,200,176,0.15)",
    manifestNameColor: "#9CC8B0",
    manifestNameShadow: "0 0 10px rgba(156,200,176,0.4)",
    percentLabelColor: "#998f82",
    panelBg: "rgba(255, 255, 255, 0.03)",
    panelBorder: "1px solid rgba(255, 255, 255, 0.08)",
    panelBackdrop: "blur(20px)",
    panelShadow:
      "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
    headerTitleColor: "#E8DDC8",
    headerSubColor: "#998f82",
    headerDivColor: "#c9a96e",
  },
  beige: {
    labelColor: "#856C51",
    bodyColor: "#4a3a2a",
    typeNameColor: "#AD7D38",
    typeNameShadow: "0 0 10px rgba(173,125,56,0.3)",
    typeBorderColor: "#AD7D38",
    typeBg: "rgba(173,125,56,0.07)",
    typeGlow: "transparent",
    manifestBorderColor: "#9CC8B0",
    manifestBg: "rgba(156,200,176,0.06)",
    manifestGlow: "rgba(156,200,176,0.10)",
    manifestNameColor: "#5A8E78",
    manifestNameShadow: "0 0 8px rgba(90,142,120,0.3)",
    percentLabelColor: "#7A6B55",
    panelBg: "#FBF1E7",
    panelBorder: "1px solid #E0CFB6",
    panelBackdrop: "none",
    panelShadow: "0 4px 20px rgba(160,120,70,0.12)",
    headerTitleColor: "#2a1f15",
    headerSubColor: "#7A6B55",
    headerDivColor: "#AD7D38",
  },
} as const;

const DOHWA_HUE_DARK = "#E6A88E";
const DOHWA_HUE_BEIGE = "#E94E3F";

const CHARM_TYPE_KO: Record<CharmTypeKey, string> = {
  active: "능동형",
  passive: "수용형",
  expressive: "표현형",
  mystery: "신비형",
  charisma: "카리스마형",
  dignified: "품격형",
  free: "자유형",
  withdrawn: "내향형",
  balanced: "균형형",
};

const MANIFESTATION_KO: Record<CharmManifestationKey, string> = {
  stable: "꾸준히",
  crescendo: "갈수록",
  burst: "첫인상에",
  peakFade: "정점 순간에",
  oscillating: "리듬감 있게",
  latent: "잠재적으로",
};

type Tokens = (typeof THEME_TOKENS)[CharmCardsTheme];

function CardShell({
  label,
  badge,
  borderColor,
  bgColor,
  glowColor,
  labelColor,
  children,
}: {
  label: string;
  badge?: string;
  borderColor: string;
  bgColor: string;
  glowColor: string;
  labelColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}33`,
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: `0 0 18px ${glowColor}`,
      }}
    >
      <div className="px-4 pt-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-[14px] tracking-[0.2em] font-medium"
            style={{ color: labelColor }}
          >
            {label}
          </p>
          {badge && (
            <span
              className="text-[13px] tracking-wider px-2.5 py-1 rounded-full"
              style={{ border: `1px solid ${borderColor}`, color: borderColor }}
            >
              {badge}
            </span>
          )}
        </div>
        <div
          className="h-px w-full mb-4"
          style={{ background: `${borderColor}40` }}
        />
        {children}
      </div>
    </div>
  );
}

function CharmTypeCard({
  charm,
  sajuRequestId,
  copies,
  tokens,
}: {
  charm: CharmView;
  sajuRequestId: string;
  copies: CharmCopyPool;
  tokens: Tokens;
}) {
  const pool = copies.charmType[charm.typeKey] ?? [];
  const copy = pool[pickIndex(sajuRequestId, pool.length)] ?? "";
  const typeKo = CHARM_TYPE_KO[charm.typeKey];

  return (
    <CardShell
      label="매력 유형"
      borderColor={tokens.typeBorderColor}
      bgColor={tokens.typeBg}
      glowColor={tokens.typeGlow}
      labelColor={tokens.labelColor}
    >
      <p
        className="text-base font-extrabold tracking-[0.15em] mb-2"
        style={{ color: tokens.typeNameColor }}
      >
        {typeKo}
      </p>
      <p
        className="text-[13px] leading-relaxed"
        style={{ color: tokens.bodyColor }}
      >
        {copy}
      </p>
    </CardShell>
  );
}

function DohwaCard({
  charm,
  copies,
  tokens,
  dohwaHue,
}: {
  charm: CharmView;
  copies: CharmCopyPool;
  tokens: Tokens;
  dohwaHue: string;
}) {
  const copyKey = copies.pickDohwaCopyKey(charm.dohwa, charm.variantTags);
  const copy = copies.dohwa[copyKey] ?? "";
  const hasDohwa = charm.dohwa.present;

  return (
    <CardShell
      label="도화살"
      borderColor={hasDohwa ? dohwaHue : tokens.typeBorderColor}
      bgColor={hasDohwa ? `${dohwaHue}14` : `${tokens.typeBorderColor}0f`}
      glowColor={hasDohwa ? `${dohwaHue}33` : "transparent"}
      labelColor={tokens.labelColor}
    >
      <p
        className="text-base font-extrabold tracking-[0.15em] mb-2"
        style={{ color: hasDohwa ? dohwaHue : tokens.typeBorderColor }}
      >
        {hasDohwa
          ? `도화(桃花殺) ${charm.dohwa.hanja ?? "있음"}`
          : "도화살 없음"}
      </p>
      <p
        className="text-[12px] leading-relaxed"
        style={{ color: tokens.bodyColor }}
      >
        {copy}
      </p>
    </CardShell>
  );
}

function StrengthCard({
  charm,
  tokens,
}: {
  charm: CharmView;
  tokens: Tokens;
}) {
  const label = resolveCharmLabel(charm.charmStrength);
  const pct = charm.charmStrength;
  const steps = 10;
  const filled = Math.round((pct / 100) * steps);
  const hue = "#D2A965";

  return (
    <CardShell
      label="매력 강도"
      borderColor={hue}
      bgColor={`${hue}14`}
      glowColor={`${hue}33`}
      labelColor={tokens.labelColor}
    >
      <p
        className="text-base font-extrabold tracking-[0.15em] mb-3"
        style={{ color: hue }}
      >
        {label}
      </p>

      <div className="flex gap-1 mb-3">
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full"
            style={{ background: i < filled ? hue : `${hue}30` }}
          />
        ))}
      </div>

      {charm.showPercent ? (
        <p
          className="text-[13px] tracking-widest"
          style={{ color: tokens.percentLabelColor }}
        >
          {charm.charmStrength}/100 · 상위 {100 - charm.charmPercentile}%
        </p>
      ) : (
        <p
          className="text-[13px] tracking-widest"
          style={{ color: tokens.percentLabelColor }}
        >
          {label}
        </p>
      )}
    </CardShell>
  );
}

function ManifestationCard({
  charm,
  sajuRequestId,
  copies,
  tokens,
}: {
  charm: CharmView;
  sajuRequestId: string;
  copies: CharmCopyPool;
  tokens: Tokens;
}) {
  const pool = copies.manifestation[charm.manifestationKey] ?? [];
  const copy = pool[pickIndex(sajuRequestId + "_m", pool.length)] ?? "";
  const manifestKo = MANIFESTATION_KO[charm.manifestationKey];

  return (
    <CardShell
      label="매력 발현"
      borderColor={tokens.manifestBorderColor}
      bgColor={tokens.manifestBg}
      glowColor={tokens.manifestGlow}
      labelColor={tokens.labelColor}
    >
      <p
        className="text-base font-extrabold tracking-[0.15em] mb-2"
        style={{ color: tokens.manifestNameColor }}
      >
        {manifestKo} 빛남
      </p>
      <p
        className="text-[12px] leading-relaxed"
        style={{ color: tokens.bodyColor }}
      >
        {copy}
      </p>
    </CardShell>
  );
}

type Props = {
  charm: CharmView;
  sajuRequestId: string;
  copies: CharmCopyPool;
  theme?: CharmCardsTheme;
  subtitle?: string;
};

export default function CharmCards({
  charm,
  sajuRequestId,
  copies,
  theme = "dark",
  subtitle,
}: Props) {
  const tokens = THEME_TOKENS[theme];
  const dohwaHue = theme === "beige" ? DOHWA_HUE_BEIGE : DOHWA_HUE_DARK;
  const subtitleText =
    subtitle ??
    (theme === "beige"
      ? "사주에서 가장 또렷하게 드러나는 결"
      : "네 사주에서 가장 또렷하게 드러나는 결");

  return (
    <div className="w-full px-6 pt-12" style={{ paddingBottom: "68px" }}>
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          background: tokens.panelBg,
          border: tokens.panelBorder,
          backdropFilter: tokens.panelBackdrop,
          WebkitBackdropFilter: tokens.panelBackdrop,
          boxShadow: tokens.panelShadow,
        }}
      >
        <div className="px-6 pt-6" style={{ paddingBottom: "48px" }}>
          <h2
            className="text-center text-[22px] font-bold tracking-[0.05em] mb-2"
            style={{ color: tokens.headerTitleColor }}
          >
            나의 매력
          </h2>
          <p
            className="text-center text-[12px] tracking-[0.08em] mb-3"
            style={{ color: tokens.headerSubColor }}
          >
            {subtitleText}
          </p>
          <div className="flex justify-center mb-5">
            <div
              className="w-12 h-[1px]"
              style={{ background: tokens.headerDivColor, opacity: 0.7 }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <CharmTypeCard
              charm={charm}
              sajuRequestId={sajuRequestId}
              copies={copies}
              tokens={tokens}
            />
            <DohwaCard
              charm={charm}
              copies={copies}
              tokens={tokens}
              dohwaHue={dohwaHue}
            />
            <StrengthCard charm={charm} tokens={tokens} />
            <ManifestationCard
              charm={charm}
              sajuRequestId={sajuRequestId}
              copies={copies}
              tokens={tokens}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
