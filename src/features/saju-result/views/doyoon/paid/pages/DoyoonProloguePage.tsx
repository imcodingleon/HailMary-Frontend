import type {
  OhangKey,
  OhangStrength,
  PaidChapterP0Doyoon,
  SajuPillarsP0,
} from "../../../../domain/paidReport";

interface DoyoonProloguePageProps {
  data?: PaidChapterP0Doyoon;
}

// dev/미리보기 fallback — 백엔드 응답 채워지면 props.data로 대체.
const MOCK_P0: PaidChapterP0Doyoon = {
  saju_pillars: {
    si_g: "戊", si_j: "申",
    il_g: "壬", il_j: "戌",
    wl_g: "丙", wl_j: "辰",
    yr_g: "庚", yr_j: "子",
  },
  ohang_strength: { mok: 50, hwa: 38, to: 15, geum: 48, su: 88 },
  ohang_excess: "su",
  ohang_lack: "to",
  ilgan: "임수(壬水)",
  user_name: "홍길동",
  ilgan_card: {
    name_kor: "임수",
    name_han: "壬水",
    subtitle: "큰 물 / 깊은 바다 유형",
    data_traits: [
      "깊이감 평균 대비 1.7배",
      "표현 빈도 평균 대비 0.4배",
      "감정 회복 속도 1.4배 느림",
    ],
    love_variables: [
      "장기 관계 유지율 ↑",
      "첫 진입 속도 ↓",
      "깊이 호환 매칭 시 안정성 ↑↑",
    ],
    main_conflict: "표현 따라잡기 못하는 상대와 매칭 시 충돌.",
  },
  ai_intro:
    "홍길동님, 데이터 정리 다 끝났어요.\n\n일간은 임수(壬水) — 깊이감과 통찰력이 평균 대비 1.7배인 유형이에요. 매력 변수도 동일 일간 평균보다 높게 측정돼요.\n\n다만 오행 분포에서 수(水) 기운이 과다(상위 15%) 상태고, 토(土) 기운이 부족(하위 12%)으로 측정돼요. 이 두 변수가 연애 영역에서 직접적인 영향을 주거든요. 실제로 동일 패턴 표본의 신규 인연 접촉률이 평균보다 36% 낮게 잡혀요.\n\n다음 장부터 이 변수들을 하나씩 분석해드릴게요. 그냥 따라오시면 돼요.",
};

const OHANG_LABELS: Record<OhangKey, { hanja: string; hangul: string }> = {
  mok: { hanja: "木", hangul: "목" },
  hwa: { hanja: "火", hangul: "화" },
  to:  { hanja: "土", hangul: "토" },
  geum:{ hanja: "金", hangul: "금" },
  su:  { hanja: "水", hangul: "수" },
};

const OHANG_ORDER: ReadonlyArray<OhangKey> = ["mok", "hwa", "to", "geum", "su"];

// 도윤 색
const C = {
  bg: "#fffdf7",
  warmGold: "#8B6914",
  goldSoft: "#a07840",
  text: "#2c1a08",
  textSoft: "#4a3215",
  textMeta: "#7a5020",
  pink: "#D4537E",
  excess: "#E24B4A",
  lack: "#a8a07a",
};

// 무료 WuxingChartSection과 동일 hue 셋 — 도윤 5 오행 색
const DOYOON_WUXING_HUES: Record<OhangKey, string> = {
  mok: "#4FB84F",
  hwa: "#E94E3F",
  to: "#E5A938",
  geum: "#ABABAA",
  su: "#4180DC",
};
// 일주 강조용 — 진한 톤
const DOYOON_WUXING_HUES_DAY: Record<OhangKey, string> = {
  mok: "#3A933A",
  hwa: "#B8392E",
  to: "#B0822A",
  geum: "#828180",
  su: "#2D5BA8",
};

// 천간 한자 → {한글, 오행}
const STEM_MAP: Record<string, { hangul: string; el: OhangKey }> = {
  "甲": { hangul: "갑", el: "mok" },
  "乙": { hangul: "을", el: "mok" },
  "丙": { hangul: "병", el: "hwa" },
  "丁": { hangul: "정", el: "hwa" },
  "戊": { hangul: "무", el: "to" },
  "己": { hangul: "기", el: "to" },
  "庚": { hangul: "경", el: "geum" },
  "辛": { hangul: "신", el: "geum" },
  "壬": { hangul: "임", el: "su" },
  "癸": { hangul: "계", el: "su" },
};

// 지지 한자 → {한글, 오행}
const BRANCH_MAP: Record<string, { hangul: string; el: OhangKey }> = {
  "子": { hangul: "자", el: "su" },
  "丑": { hangul: "축", el: "to" },
  "寅": { hangul: "인", el: "mok" },
  "卯": { hangul: "묘", el: "mok" },
  "辰": { hangul: "진", el: "to" },
  "巳": { hangul: "사", el: "hwa" },
  "午": { hangul: "오", el: "hwa" },
  "未": { hangul: "미", el: "to" },
  "申": { hangul: "신", el: "geum" },
  "酉": { hangul: "유", el: "geum" },
  "戌": { hangul: "술", el: "to" },
  "亥": { hangul: "해", el: "su" },
};

function lookupStem(hanja: string): { hangul: string; el: OhangKey } {
  return STEM_MAP[hanja] ?? { hangul: "?", el: "su" };
}
function lookupBranch(hanja: string): { hangul: string; el: OhangKey } {
  return BRANCH_MAP[hanja] ?? { hangul: "?", el: "su" };
}

export default function DoyoonProloguePage({ data }: DoyoonProloguePageProps) {
  const d = data ?? MOCK_P0;

  // 연우 구조 미러: section/data-page-idx + 페이지 전체 채우는 솔리드 bg (라운드 X).
  return (
    <section
      data-page-idx="0"
      style={{ background: C.bg, color: C.text }}
    >
      {/* 페이지 헤더 */}
      <DoyoonPageHead title="시작에 앞서" sub="분석 시작 전 데이터 요약" ch="0" hanja="序" />

      {/* 0-1 사주 원국 데이터 */}
      <SectionDy>
        <SLabel>0-1 사주 원국 데이터</SLabel>
        <STitle>8개 글자로 구성된 사주 데이터.</STitle>
        <SajuTableDoyoon pillars={d.saju_pillars} />
        <SBody>
          <VarTag>{d.user_name}</VarTag>님 사주 8글자예요. 가운데 강조된 일간이 모든 분석의
          기준점이고, 나머지 7글자가 변수로 작동해요.
        </SBody>
      </SectionDy>

      {/* 0-2 오행 분포 데이터 */}
      <SectionDy>
        <SLabel>0-2 오행 분포 데이터</SLabel>
        <STitle>5개 변수의 강도 측정값.</STitle>
        <OhangListDoyoon
          strength={d.ohang_strength}
          excess={d.ohang_excess}
          lack={d.ohang_lack}
          ilgan={d.ilgan}
        />
        <SBody>
          오행 5개 변수의 강도예요. 평균 대비 +1.7배 이상은 과다, -0.6배 이하는 부족으로
          분류해요.{" "}
          <VarTag>
            {OHANG_LABELS[d.ohang_excess].hangul}({OHANG_LABELS[d.ohang_excess].hanja})
          </VarTag>{" "}
          과다,{" "}
          <VarTag>
            {OHANG_LABELS[d.ohang_lack].hangul}({OHANG_LABELS[d.ohang_lack].hanja})
          </VarTag>{" "}
          부족 상태로 측정돼요.
        </SBody>
      </SectionDy>

      {/* 0-3 일간 분석 */}
      <SectionDy>
        <SLabel>0-3 일간 분석</SLabel>
        <STitle>
          <VarTag>{d.ilgan}</VarTag> — 핵심 데이터.
        </STitle>
        <IlganCardDoyoon userName={d.user_name} card={d.ilgan_card} />
      </SectionDy>

      {/* 0-4 사주 용어 사전 (고정) */}
      <SectionDy>
        <SLabel>0-4 알아두면 좋은 사주 용어</SLabel>
        <STitle>앞으로 자주 나올 용어들.</STitle>
        <GlossaryDoyoon />
      </SectionDy>

      {/* 0-5 분석 진입 요약 */}
      <SectionDy>
        <SLabel>0-5 분석 진입 요약</SLabel>
        <STitle>본격 분석에 앞서 핵심 데이터부터.</STitle>
        <DoyoonSdSpotlight />
        <AiBlockDoyoon body={d.ai_intro} />
        <BubbleDoyoon
          name="한도윤"
          quote="이게 분석의 출발점이에요. 차근차근 가볼게요."
        />
      </SectionDy>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// Inline sub-components (P-0 전용; P-1+ 진입 시 공통 추출 검토)
// ════════════════════════════════════════════════════════════════════

// 도윤_final.html line 391~470 미러. badge는 한자/영문 세로 스택 + 4모서리 데코,
// ch="0"은 motif_seal_yeon 풀 opacity + saturate 필터.
function DoyoonPageHead({
  title, sub, ch, hanja,
}: { title: string; sub: string; ch: string; hanja: string }) {
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
      {/* 배지 — 한자/영문 세로 스택 + 4모서리 */}
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
            color: C.warmGold,
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
            color: C.goldSoft,
            letterSpacing: "0.10em",
            lineHeight: 1.5,
          }}
        >
          CH-{ch}
        </span>
        <BadgeCorner pos="tl" />
        <BadgeCorner pos="tr" />
        <BadgeCorner pos="bl" />
        <BadgeCorner pos="br" />
      </div>

      {/* 타이틀 + 서브 */}
      <div className="flex-1 min-w-0">
        <div
          className="font-bold"
          style={{
            fontSize: 18,
            color: C.text,
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
            color: C.goldSoft,
            letterSpacing: "0.02em",
            wordBreak: "keep-all",
            lineHeight: 1.5,
          }}
        >
          {sub}
        </div>
      </div>

      {/* 우측 챕터 아이콘 — ch="0"은 seal_yeon 인장, 풀 opacity + saturate */}
      <div
        aria-hidden
        className="flex-shrink-0 bg-no-repeat bg-center bg-contain"
        style={{
          width: 48,
          height: 48,
          backgroundImage: "url(/doyoon/motif/motif_seal_yeon.png)",
          backgroundColor: "rgba(255,250,235,0.95)",
          border: "1px solid rgba(139,105,20,0.55)",
          borderRadius: 6,
          padding: 4,
          boxSizing: "border-box",
          filter:
            "saturate(1.6) contrast(1.15) drop-shadow(0 1px 2px rgba(80,50,10,0.25))",
        }}
      />
    </div>
  );
}

function BadgeCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const offset: Record<"tl" | "tr" | "bl" | "br", { top?: number; bottom?: number; left?: number; right?: number; transform?: string }> = {
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

function SectionDy({ children }: { children: React.ReactNode }) {
  // 연우 구조 미러: px-[14px] py-5 + border-b 톤(도윤 골드 10% 알파).
  return (
    <div
      className="px-[14px] py-5 relative"
      style={{ borderBottom: `0.5px solid rgba(139,105,20,0.10)` }}
    >
      {children}
    </div>
  );
}

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[13px] font-semibold mb-1.5 uppercase"
      style={{ color: C.goldSoft, letterSpacing: "0.05em" }}
    >
      {children}
    </div>
  );
}

function STitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[17px] font-bold mb-2 leading-[1.5]"
      style={{ color: C.text, letterSpacing: "-0.01em", wordBreak: "keep-all" }}
    >
      {children}
    </div>
  );
}

function SBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[15px] leading-[1.75] mb-2"
      style={{ color: C.textMeta, letterSpacing: "-0.01em", wordBreak: "keep-all" }}
    >
      {children}
    </div>
  );
}

function VarTag({ children }: { children: React.ReactNode }) {
  // 사용자 피드백 2026-05-18: 박스/배경 완전 제거 — 본문 흐름 안에서 보라 bold 텍스트로만.
  return (
    <span className="font-bold" style={{ color: "#3C3489" }}>
      {children}
    </span>
  );
}

// 무료 SajuChartSection 디자인 미러 — 한자 큰 글씨(오행 색) + 한글 작게 + 일간(천간만) 강조.
// 사용자 결정 2026-05-18: 0-1 사주 셀을 free 디자인으로 교체.
// 추가 결정: 하단 캡션 제거 + 일주 column 중 위 셀(천간/일간)만 강조 — 유료 P-0 톤 정합.
function SajuTableDoyoon({
  pillars,
}: { pillars: SajuPillarsP0 }) {
  const cols = [
    { label: "시주", g: pillars.si_g, j: pillars.si_j, isDayCol: false },
    { label: "일주", g: pillars.il_g, j: pillars.il_j, isDayCol: true },
    { label: "월주", g: pillars.wl_g, j: pillars.wl_j, isDayCol: false },
    { label: "년주", g: pillars.yr_g, j: pillars.yr_j, isDayCol: false },
  ];

  return (
    <div
      className="my-3 overflow-hidden"
      style={{
        background: "#FDF5EA",
        borderRadius: 28,
        border: "1px solid #E0CFB6",
      }}
    >
      <div style={{ padding: "20px 16px 22px" }}>
        <div className="grid grid-cols-4 gap-2">
          {cols.map((col) => (
            <PillarColumn key={col.label} col={col} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PillarColumn({
  col,
}: { col: { label: string; g: string; j: string; isDayCol: boolean } }) {
  const stem = lookupStem(col.g);
  const branch = lookupBranch(col.j);
  // 일간(천간)만 강조 색·하이라이트. 지지는 일반 색.
  const stemHue = col.isDayCol
    ? DOYOON_WUXING_HUES_DAY[stem.el]
    : DOYOON_WUXING_HUES[stem.el];
  const branchHue = DOYOON_WUXING_HUES[branch.el];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p
        className="text-center"
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "#A89272",
        }}
      >
        {col.label}
      </p>
      <PillarBox hanja={col.g} hangul={stem.hangul} hue={stemHue} highlight={col.isDayCol} />
      <PillarBox hanja={col.j} hangul={branch.hangul} hue={branchHue} highlight={false} />
    </div>
  );
}

function PillarBox({
  hanja, hangul, hue, highlight,
}: { hanja: string; hangul: string; hue: string; highlight: boolean }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-xl gap-1.5"
      style={{
        background: highlight ? "#FCEFD9" : "#FDF5EA",
        border: `${highlight ? "1.5px" : "1px"} solid ${highlight ? "#C9A96E" : "#E0CFB6"}`,
        aspectRatio: "9 / 11",
      }}
    >
      <span
        style={{
          fontFamily: '"NotoSerifTC", "ChosunNm", serif',
          fontWeight: 700,
          fontSize: "clamp(24px, 6.5vw, 36px)",
          lineHeight: 1,
          color: hue,
        }}
      >
        {hanja}
      </span>
      <span
        style={{
          fontFamily: '"JejuMyeongjo", "Pretendard", serif',
          fontWeight: 400,
          fontSize: 11,
          color: "#9C8A6D",
        }}
      >
        {hangul}
      </span>
    </div>
  );
}

// 0-2 오행 분포 — 무료 WuxingChartSection 디자인 차용 (세로 막대 + 좌측 일간 강조).
// 사용자 결정 2026-05-18: 가로 막대 → 세로 막대 차트로 교체.
function OhangListDoyoon({
  strength, excess, lack, ilgan,
}: { strength: OhangStrength; excess: OhangKey; lack: OhangKey; ilgan: string }) {
  const Y_TICKS = [100, 75, 50, 25, 0];
  const BAR_AREA_H = 154;
  const X_LABEL_H = 22;
  const BAR_WIDTH = 28;
  const Y_LABEL_W = 32;

  const ratios = OHANG_ORDER.map((k) => strength[k]);
  const maxRatio = Math.max(...ratios);
  const denom = maxRatio > 0 ? maxRatio : 1;

  // ilgan은 "임수(壬水)" 또는 "임수" 형태. 한자 표기 분해.
  const ilganMatch = ilgan.match(/^([가-힣]+)\(?([一-鿿]+)?/);
  const ilganKor = ilganMatch?.[1] ?? ilgan;
  const ilganHanja = ilganMatch?.[2] ?? "";
  // 일간의 오행 한 글자 추출 (ilgan 마지막 글자 = 오행)
  const elementKor = ilganKor.slice(-1); // 갑목 → 목
  const elementKey = (Object.entries(OHANG_LABELS).find(
    ([, v]) => v.hangul === elementKor,
  )?.[0] ?? "su") as OhangKey;
  const dayColor = DOYOON_WUXING_HUES[elementKey];

  return (
    <div
      className="my-3 overflow-hidden"
      style={{
        background: "#FDF5EA",
        borderRadius: 22,
        border: "1px solid #E0CFB6",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "20px 20px 16px",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        {/* 좌측 일간 강조 — 무료와 동일 */}
        <div
          style={{
            flexShrink: 0,
            width: "38%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginTop: 54,
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: '"NotoSerifTC", "ChosunNm", serif',
                fontWeight: 700,
                fontSize: "clamp(33px, 9.5vw, 43px)",
                lineHeight: 1.1,
                color: dayColor,
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {ilganHanja || ilganKor}
            </span>
            {ilganHanja && (
              <span
                style={{
                  fontSize: 16,
                  color: dayColor,
                  opacity: 0.6,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                ({ilganKor})
              </span>
            )}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 18,
              fontWeight: 500,
              color: "#9C8A6D",
              letterSpacing: "0.12em",
              textAlign: "center",
            }}
          >
            일 간
          </div>
        </div>

        {/* 우측 세로 막대 차트 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#AD7D38",
              letterSpacing: "0.05em",
              marginBottom: 8,
            }}
          >
            오행 강약
          </div>
          <div
            style={{
              position: "relative",
              height: `${BAR_AREA_H + X_LABEL_H}px`,
            }}
          >
            {/* Y 눈금선 */}
            <div
              style={{
                position: "absolute",
                left: Y_LABEL_W,
                right: 0,
                top: 0,
                height: BAR_AREA_H,
              }}
            >
              {Y_TICKS.map((tick) => {
                const topPx = BAR_AREA_H - (tick / 100) * BAR_AREA_H;
                return (
                  <div
                    key={tick}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: topPx,
                      height: 1,
                      background: "#E5D8C3",
                    }}
                  />
                );
              })}
            </div>

            {/* Y 라벨 */}
            <div
              style={{
                position: "absolute",
                left: 0,
                width: Y_LABEL_W,
                top: 0,
                height: BAR_AREA_H,
              }}
            >
              {Y_TICKS.map((tick) => {
                const topPx = BAR_AREA_H - (tick / 100) * BAR_AREA_H;
                return (
                  <div
                    key={tick}
                    style={{
                      position: "absolute",
                      right: 4,
                      top: topPx,
                      transform: "translateY(-50%)",
                      fontSize: 9,
                      fontWeight: 400,
                      color: "#B0997A",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      textAlign: "right",
                    }}
                  >
                    {tick}%
                  </div>
                );
              })}
            </div>

            {/* 막대 + X 라벨 */}
            <div
              style={{
                position: "absolute",
                left: Y_LABEL_W,
                right: 0,
                top: 0,
                height: `${BAR_AREA_H + X_LABEL_H}px`,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-around",
                paddingBottom: 0,
              }}
            >
              {OHANG_ORDER.map((k, i) => {
                const ratio = ratios[i];
                const color = DOYOON_WUXING_HUES[k];
                const rawH = Math.round((ratio / denom) * BAR_AREA_H);
                const barH = ratio > 0 ? Math.max(rawH, 4) : 0;
                return (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: `${BAR_AREA_H + X_LABEL_H}px`,
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: BAR_WIDTH,
                        height: barH > 0 ? barH : 2,
                        background: color,
                        borderRadius: "4px 4px 0 0",
                        flexShrink: 0,
                        opacity: barH > 0 ? 1 : 0.15,
                      }}
                    />
                    <div
                      style={{
                        height: X_LABEL_H,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 500,
                        color,
                        flexShrink: 0,
                      }}
                    >
                      {OHANG_LABELS[k].hangul}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 캡션 — 과다/부족 한자 + 라벨 */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: 20,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 4,
          lineHeight: 1.7,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 400, color: "#7A6B55" }}>
          <span
            style={{
              fontFamily: '"NotoSerifTC", "ChosunNm", serif',
              fontWeight: 600,
              fontSize: 18,
              color: DOYOON_WUXING_HUES[excess],
            }}
          >
            {OHANG_LABELS[excess].hanja}
          </span>{" "}
          과다
        </span>
        <span style={{ fontSize: 16, color: "#7A6B55" }}> · </span>
        <span style={{ fontSize: 16, fontWeight: 400, color: "#7A6B55" }}>
          <span
            style={{
              fontFamily: '"NotoSerifTC", "ChosunNm", serif',
              fontWeight: 600,
              fontSize: 18,
              color: DOYOON_WUXING_HUES[lack],
            }}
          >
            {OHANG_LABELS[lack].hanja}
          </span>{" "}
          부족
        </span>
      </div>
    </div>
  );
}

function IlganCardDoyoon({
  userName, card,
}: { userName: string; card: PaidChapterP0Doyoon["ilgan_card"] }) {
  return (
    <div
      className="rounded-xl my-2.5 relative"
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #fdf3e7 100%)",
        border: "0.5px solid rgba(139,105,20,0.30)",
        padding: 14,
      }}
    >
      {/* 상단 골드 그라데이션 라인 */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 rounded-t-xl"
        style={{
          height: 2,
          background:
            `linear-gradient(90deg, transparent, ${C.warmGold}, transparent)`,
        }}
      />
      <div
        className="text-[16px] font-bold"
        style={{ color: C.warmGold }}
      >
        <VarTag>{userName}</VarTag>님의 일간 — {card.name_kor}({card.name_han})
      </div>
      <div className="text-[13px] mt-0.5" style={{ color: C.goldSoft }}>
        {card.subtitle}
      </div>

      <IlganSec label="데이터 특성">
        <ul className="list-none pl-1">
          {card.data_traits.map((t, i) => (
            <li key={i} className="relative pl-3 leading-[1.7] text-[13px]"
                style={{ color: C.text }}>
              <span className="absolute left-[2px]" style={{ color: C.warmGold }}>·</span>
              {t}
            </li>
          ))}
        </ul>
      </IlganSec>

      <IlganSec label="연애 특화 변수">
        <ul className="list-none pl-1">
          {card.love_variables.map((v, i) => (
            <li key={i} className="relative pl-3 leading-[1.7] text-[13px]"
                style={{ color: C.text }}>
              <span className="absolute left-[2px]" style={{ color: C.warmGold }}>·</span>
              {v}
            </li>
          ))}
        </ul>
      </IlganSec>

      <IlganSec label="주요 변수 충돌">
        <div className="text-[13px] leading-[1.7]" style={{ color: C.text }}>
          {card.main_conflict}
        </div>
      </IlganSec>
    </div>
  );
}

function IlganSec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2.5">
      <div
        className="text-[12px] font-semibold mb-1"
        style={{ color: C.warmGold, letterSpacing: "0.05em" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

const GLOSSARY: ReadonlyArray<{ term: string; desc: string; subs?: ReadonlyArray<{ name: string; desc: string }> }> = [
  { term: "일간 (日干)", desc: "사주 8글자 중 가운데 글자. 너 자신을 나타내는 핵심 기준점." },
  { term: "일주 (日柱)", desc: "일간과 그 아래 지지 한 쌍. 본바탕을 가장 진하게 보여주는 기둥." },
  { term: "오행 (五行)", desc: "목·화·토·금·수 다섯 기운. 사주 안 분포 강약을 본다." },
  { term: "천간 / 지지", desc: "글자의 위(천간) / 아래(지지). 8글자는 천간 4 + 지지 4로 구성." },
  { term: "과다 / 부족", desc: "오행이 평균보다 많거나 적은 상태. 흐름이 막히는 원인이 됨." },
  {
    term: "매력살 (魅力煞)",
    desc: "연애운에 작용하는 살들의 묶음.",
    subs: [
      { name: "도화살 (桃花煞)", desc: "사람을 끌어당기는 매력의 별" },
      { name: "홍염살 (紅艶煞)", desc: "강한 끌림과 인상을 만드는 별" },
      { name: "천을귀인 (天乙貴人)", desc: "귀한 인연을 부르는 길신" },
    ],
  },
  { term: "십성 (十星)", desc: "일간을 기준으로 한 다른 글자들과의 관계. 비견·식신·재성·관성·인성 등 10가지 분류." },
  { term: "용신 (用神)", desc: "너에게 가장 도움이 되는 기운. 부족한 자리를 채워주는 핵심 변수." },
];

function GlossaryDoyoon() {
  return (
    <div
      className="rounded-lg px-3.5 py-3 my-2"
      style={{
        background: "rgba(139,105,20,0.04)",
        border: "0.5px solid rgba(139,105,20,0.15)",
      }}
    >
      <div
        className="text-[13px] font-bold mb-2"
        style={{ color: C.warmGold, letterSpacing: "0.05em" }}
      >
        사주 용어 사전
      </div>
      {GLOSSARY.map((g) => (
        <div key={g.term} className="mb-2.5">
          <div
            className="text-[13px] font-bold mb-0.5"
            style={{ color: C.warmGold }}
          >
            {g.term}
          </div>
          <div
            className="text-[13px] leading-[1.6]"
            style={{ color: C.textMeta }}
          >
            {g.desc}
          </div>
          {g.subs && (
            <div className="mt-1.5 pl-2">
              {g.subs.map((s) => (
                <div key={s.name} className="text-[13px] leading-[1.7]">
                  <span
                    className="font-semibold"
                    style={{ color: C.warmGold }}
                  >
                    {s.name}
                  </span>{" "}
                  <span style={{ color: C.textMeta }}>— {s.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DoyoonSdSpotlight() {
  return (
    <div className="flex justify-center my-3">
      <div
        aria-label="한도윤 — 진입/미소"
        className="bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: "url(/doyoon/sd_dy/dy_01.png)",
          width: 280,
          height: 280,
        }}
      />
    </div>
  );
}

function AiBlockDoyoon({ body }: { body: string }) {
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
        style={{ color: C.textSoft, zIndex: 1 }}
      >
        {body}
      </p>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<"tl" | "tr" | "bl" | "br", { top?: number; bottom?: number; left?: number; right?: number; transform?: string }> = {
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

function BubbleDoyoon({ name, quote }: { name: string; quote: string }) {
  return (
    <div
      className="rounded-[10px] px-[13px] py-[11px] my-2 italic text-[15px] leading-[1.85]"
      style={{
        background: "#fff8f0",
        color: C.text,
        border: "0.5px solid rgba(139,105,20,0.20)",
        letterSpacing: "-0.01em",
        wordBreak: "keep-all",
      }}
    >
      <div
        className="text-[12px] mb-1 not-italic font-bold"
        style={{ color: C.warmGold, letterSpacing: "0.05em" }}
      >
        {name}
      </div>
      &ldquo;{quote}&rdquo;
    </div>
  );
}
