// dev 전용 P-5 3-1 매력살 카드 톤 검증.
// 1) 6종 매력살 카드 단일 비교 (색상/톤)
// 2) 보유 개수별 케이스 (1장 ~ 6장 전체)
// 3) 점수 + 상위 % 단계별 (낮음/중간/높음)

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import CharmSalCard, {
  type CharmSalProps,
} from "@/features/saju-result/views/yeonwoo/paid/components/CharmSalCard";
import { composeCharmAi } from "@/features/saju-result/views/yeonwoo/paid/charm-ai";
import { YeonwooBubble } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

// 6종 매력살 풀 — 백엔드 charm_sals.py 예정 dict.
const ALL_SALS: Record<string, CharmSalProps> = {
  do_hwa_sal: {
    charm_key: "do_hwa_sal",
    name_kor: "도화살",
    name_han: "桃花煞",
    trait: "사람을 끌어당기는 자기 매력",
  },
  hong_yeom_sal: {
    charm_key: "hong_yeom_sal",
    name_kor: "홍염살",
    name_han: "紅艶煞",
    trait: "한 번 보면 잊히지 않는 강렬한 매력",
  },
  cheon_eul_gwi_in: {
    charm_key: "cheon_eul_gwi_in",
    name_kor: "천을귀인",
    name_han: "天乙貴人",
    trait: "귀인 중 최상 — 어디서든 사랑받는 결",
  },
  hwa_gae_sal: {
    charm_key: "hwa_gae_sal",
    name_kor: "화개살",
    name_han: "華蓋煞",
    trait: "예술·종교적 깊이가 매력으로",
  },
  geum_yeo_rok: {
    charm_key: "geum_yeo_rok",
    name_kor: "금여록",
    name_han: "金輿祿",
    trait: "사랑과 풍요를 함께 부르는 결",
  },
  gong_mang: {
    charm_key: "gong_mang",
    name_kor: "공망",
    name_han: "空亡",
    trait: "신비롭게 비어있는 빈자리의 결",
  },
};

// 보유 케이스 (사주별 다양한 조합 시뮬레이션)
interface Case {
  label: string;
  title: string;
  charm_score: number;
  charm_percentile: number;
  sal_keys: ReadonlyArray<string>;
}

const CASES: ReadonlyArray<Case> = [
  {
    label: "A",
    title: "도화 단일 (가장 흔한 케이스)",
    charm_score: 42,
    charm_percentile: 58,
    sal_keys: ["do_hwa_sal"],
  },
  {
    label: "B",
    title: "도화 + 홍염 (분홍 계열)",
    charm_score: 65,
    charm_percentile: 28,
    sal_keys: ["do_hwa_sal", "hong_yeom_sal"],
  },
  {
    label: "C",
    title: "도화 + 천을귀인 (귀인 매력)",
    charm_score: 72,
    charm_percentile: 18,
    sal_keys: ["do_hwa_sal", "cheon_eul_gwi_in"],
  },
  {
    label: "D",
    title: "임수 가정 — 도화 + 홍염 + 천을귀인",
    charm_score: 81,
    charm_percentile: 10,
    sal_keys: ["do_hwa_sal", "hong_yeom_sal", "cheon_eul_gwi_in"],
  },
  {
    label: "E",
    title: "화개 + 공망 (신비/예술형)",
    charm_score: 55,
    charm_percentile: 40,
    sal_keys: ["hwa_gae_sal", "gong_mang"],
  },
  {
    label: "F",
    title: "금여록 단일 (풍요·골드)",
    charm_score: 48,
    charm_percentile: 50,
    sal_keys: ["geum_yeo_rok"],
  },
  {
    label: "G",
    title: "4종 보유 (강한 케이스)",
    charm_score: 88,
    charm_percentile: 6,
    sal_keys: ["do_hwa_sal", "hong_yeom_sal", "cheon_eul_gwi_in", "hwa_gae_sal"],
  },
  {
    label: "H",
    title: "6종 풀 보유 (극강 매력 — 이론상)",
    charm_score: 95,
    charm_percentile: 3,
    sal_keys: [
      "do_hwa_sal",
      "hong_yeom_sal",
      "cheon_eul_gwi_in",
      "hwa_gae_sal",
      "geum_yeo_rok",
      "gong_mang",
    ],
  },
  {
    label: "I",
    title: "공망 단일 (특이 케이스)",
    charm_score: 32,
    charm_percentile: 72,
    sal_keys: ["gong_mang"],
  },
];

// CharmScoreGauge 복제 (운영 페이지와 동일 컴포넌트)
function CharmScoreGauge({
  score,
  label,
}: {
  score: number;
  label: string;
}) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div
      className="my-3 rounded-[10px] p-4"
      style={{
        background: "#141413",
        border: "0.5px solid #2a2a28",
      }}
    >
      <div className="flex items-end justify-between mb-3">
        <div className="flex flex-col">
          <span
            className="text-[11px] uppercase mb-0.5"
            style={{ color: "#888", letterSpacing: "0.08em" }}
          >
            매력 지수
          </span>
          <span
            className="text-[13px]"
            style={{ color: "#E8C9A0", fontWeight: 600 }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="text-[36px] font-bold leading-none"
            style={{
              color: "#E8C9A0",
              fontFamily: "var(--font-nanum-myeongjo)",
            }}
          >
            {pct}
          </span>
          <span className="text-[14px] text-[#888]">/ 100</span>
        </div>
      </div>
      <div
        className="h-2.5 rounded-[5px] overflow-hidden"
        style={{
          background: "#1a1a18",
          border: "0.5px solid #333",
        }}
      >
        <div
          className="h-full rounded-[5px]"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #E8C9A0 0%, #D4537E 100%)",
          }}
        />
      </div>
    </div>
  );
}

export default function P5CharmCasesPage() {
  return (
    <main
      className="bg-[#0a0a09] min-h-screen"
      data-paid-scene="yeonwoo"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <div className="max-w-[430px] mx-auto py-6 px-4">
        <header className="mb-6 text-center">
          <h1
            className="text-[20px] font-bold text-[#E8C9A0]"
            style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
          >
            P-5 3-1 매력살 — 톤 검증
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            6종 매력살 색상 비교 + 보유 케이스별 시뮬레이션
            <br />
            (점수 + 상위 % + 카드 그리드 + AI + 강연우 버블)
          </p>
        </header>

        {/* 1️⃣ 6종 매력살 단일 카드 비교 */}
        <section className="mb-12">
          <div className="mb-3 text-center">
            <h2
              className="text-[15px] font-bold text-[#E8C9A0] mb-1"
              style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
            >
              ① 6종 매력살 단일 비교
            </h2>
            <p className="text-[11px] text-[#666]">
              각 매력살별 고유 색상 톤
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(ALL_SALS).map((sal) => (
              <CharmSalCard key={sal.charm_key} sal={sal} />
            ))}
          </div>
        </section>

        {/* 2️⃣ 보유 케이스별 시뮬레이션 */}
        <section>
          <div className="mb-3 text-center">
            <h2
              className="text-[15px] font-bold text-[#E8C9A0] mb-1"
              style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
            >
              ② 사주별 보유 케이스
            </h2>
            <p className="text-[11px] text-[#666]">
              점수 + 상위 % + 카드 조합 시뮬레이션
            </p>
          </div>

          <div className="space-y-12">
            {CASES.map((c) => (
              <section key={c.label}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                    style={{ background: "#E8C9A0" }}
                  >
                    {c.label}
                  </span>
                  <span className="text-[12px] text-[#d8d6d0] leading-tight">
                    {c.title}
                  </span>
                </div>

                <CharmScoreGauge
                  score={c.charm_score}
                  label={`상위 ${c.charm_percentile}%`}
                />

                <div className="my-3 grid grid-cols-2 gap-2">
                  {c.sal_keys.map((k) => (
                    <CharmSalCard key={k} sal={ALL_SALS[k]} />
                  ))}
                </div>

                <AiBlock text={composeCharmAi(c.sal_keys, "임수")} />

                <YeonwooBubble text="매력 타고났으면서 왜 이렇게 안 쓰고 있어." />
              </section>
            ))}
          </div>
        </section>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          매력살 색상/카드 디자인 검토용 — 어색한 톤 있으면 알려주세요.
          <br />
          AI 박스는 임수 케이스 고정 (실제는 일간 10 변형 예정).
        </footer>
      </div>
    </main>
  );
}
