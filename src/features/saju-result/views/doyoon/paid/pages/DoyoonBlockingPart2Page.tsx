import type { PaidChapterP4Doyoon } from "../../../../domain/paidReport";
import SpouseImage from "../../../yeonwoo/paid/components/SpouseImage";
import { DoyoonAiBlock } from "../components/DoyoonAiBlock";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import { DoyoonSdWithBubble } from "../components/DoyoonSdWithBubble";
import {
  DoyoonSBody,
  DoyoonSLabel,
  DoyoonSTitle,
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

interface DoyoonBlockingPart2PageProps {
  data?: PaidChapterP4Doyoon;
}

const MOCK_P4: PaidChapterP4Doyoon = {
  user_name: "홍길동",
  akyon_slot_id: "m-water-yang",
  keyword_tags: ["차가운 인상", "감정 변동 큼", "약속 일관성 낮음", "자기중심 응답", "반응 속도 빠름"],
  info_rows: [
    { key: "키 분포", val: "평균보다 +5cm 이상 표본 64%" },
    { key: "체형", val: "마른 골격 · 어깨 좁은 편" },
    { key: "얼굴상", val: "광대 도드라짐 · 턱선 각짐" },
    { key: "이목구비", val: "얇은 입술 · 눈꼬리 상향" },
    { key: "스타일 특성", val: "시즌 트렌드 추종도 높음" },
    { key: "인상 점수", val: "첫인상 강도 91 / 6개월 호감 14" },
    { key: "감정 변동성", val: "평균 대비 1.9배" },
    { key: "행동 신호", val: "초기 과접근, 중반 급랭각" },
    { key: "비호환 이유", val: "감정 주파수 불일치 87%" },
    { key: "대응 전략", val: "초기 신호 2개 이상 시 즉시 거리 조정" },
  ],
  ai_akyon:
    "데이터가 분류한 비호환 프로파일이에요. 외형부터 보여드릴게요.\n\n" +
    "키 분포 — 평균보다 +5cm 이상 표본이 64%. 체형은 마른 골격에 어깨가 좁은 편이 많아요. " +
    "얼굴 데이터는 광대 도드라짐, 턱선 각짐. 눈매는 끝이 상향이고 입술이 얇은 패턴이 동일 비호환 사례의 71%를 차지해요.\n\n" +
    "문제는 외형이 아니라 인상 점수예요. 첫인상 강도 91점 — 눈에 띄게 높아요. " +
    "근데 6개월 호감 유지율이 14점. 격차가 77점이에요. 평균 격차가 32점인 걸 감안하면 이 유형은 정말 위험해요.\n\n" +
    "임수(壬水) 일간과의 감정 주파수 불일치율이 87%예요. 초기에 끌려도 중반 이후 안정성이 13%밖에 안 돼요. " +
    "첫 만남에서 위 신호 두 개 이상 보이면 그냥 거리 두시는 게 나아요. 홍길동님 매력을 낭비하기엔 아까운 유형이에요.",
  sd_avatar_asset: "dy_08",
  akyon_bubble: "이 신호 두 개 이상 보이면 그냥 다음으로 넘어가세요. 시간이 아까워요.",
  illusion_signs: [
    { keyword: "첫 만남 점수 90+", pct: "78%", desc: "초기 호감도가 비정상적으로 높음. 평균 사례는 65~75 분포." },
    { keyword: "2주차 연락 빈도 급감", pct: "64%", desc: "초반 폭발적 접촉 후 2주 안에 빈도 60% 이상 감소." },
    { keyword: "3개월차 대화 온도 -38%", pct: "71%", desc: "대화 길이·답장 속도가 같은 시점 평균 대비 38% 하락." },
  ],
  ai_illusion:
    "임수(壬水) 일간 표본에서 착각 인연 발생률이 평균보다 1.3배 높아요. " +
    "초기 강한 끌림을 운명으로 오인하는 경향이 통계적으로 유의미하게 나타나거든요.\n\n" +
    "핵심은 첫 만남 점수가 아니라 3개월차 호감 곡선의 기울기예요. " +
    "데이터를 보면 진짜 인연은 3개월 시점에 호감도가 +18% 상승해요. " +
    "착각 인연은 같은 시점에 -38% 하락해요. 이 기울기 차이가 첫 만남 점수보다 9배 더 정확한 지표예요.\n\n" +
    "오인 신호 3종 — 첫 만남 점수 90+ (발생률 78%), 2주차 연락 빈도 급감 (발생률 64%), " +
    "3개월차 대화 온도 -38% (발생률 71%). 두 가지 이상 잡히면 검증 진입하세요.\n\n" +
    "홍길동님, 첫 만남 점수에 휘둘리지 마세요. 3개월 기다리는 게 가장 정확한 검증법입니다.",
  illusion_bubble: "첫 만남 점수에 속지 마세요. 3개월차 기울기가 진짜 지표예요.",
  decisive_gradient_label: "3개월차 호감 곡선의 기울기",
  real_growth_pct: "+18%",
  fake_drop_pct: "-38%",
  accuracy_multiplier: "9배",
};


export default function DoyoonBlockingPart2Page({ data }: DoyoonBlockingPart2PageProps) {
  const d = data ?? MOCK_P4;

  return (
    <section
      data-page-idx="4"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="2"
        hanja="二"
        title="연애를 막는 것 (2/2)"
        sub="구조적 원인 · 반복 패턴 · 비호환 유형"
      />

      {/* ── 2-3 통계적 비호환 유형 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-3 통계적 비호환 유형</DoyoonSLabel>
        <DoyoonSTitle>데이터가 분류한 비호환 프로파일.</DoyoonSTitle>

        <SpouseImage
          character="doyoon"
          type="avoid"
          slotId={d.akyon_slot_id}
          alt="비호환 유형 프로파일"
        />

        <KeywordTagsDoyoon tags={d.keyword_tags} />

        <InfoGridDoyoon rows={d.info_rows} />

        <DoyoonAiBlock body={d.ai_akyon} />

        <DoyoonSdWithBubble
          sdAsset={d.sd_avatar_asset}
          quote={d.akyon_bubble}
          flow="left"
        />
      </DoyoonSection>

      {/* ── 2-4 착각 인연 — 운명 오인 패턴 분석 ── */}
      <DoyoonSection>
        <DoyoonSLabel>2-4 착각 인연 — 운명 오인 패턴 분석</DoyoonSLabel>
        <DoyoonSTitle>초기 매력도 91% → 6개월 유지율 14%. 가장 흔한 오인 패턴이에요.</DoyoonSTitle>
        <DoyoonSBody>
          데이터상 "운명이라 확신했다가 6개월 안에 끝난" 사례를 분류해보면 공통 신호가 명확합니다.
          첫 만남 점수와 3개월차 점수의 격차가 결정적인 지표예요.
        </DoyoonSBody>

        <LineChartDoyoon />

        <div
          className="my-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 8,
          }}
        >
          {d.illusion_signs.map((s, i) => (
            <IllusionSignCardDoyoon
              key={i}
              index={i + 1}
              keyword={s.keyword}
              pct={s.pct}
              desc={s.desc}
            />
          ))}
        </div>

        <GoodDecisionCardDoyoon
          label="진짜 인연 vs 착각 인연 — 결정적 분기점"
          value={`"${d.decisive_gradient_label}"`}
          sub={`진짜 인연은 3개월 시점에 호감도 ${d.real_growth_pct} 상승. 착각 인연은 ${d.fake_drop_pct} 하락. 첫 만남 점수보다 이 기울기가 ${d.accuracy_multiplier} 더 정확한 지표예요.`}
        />

        <DoyoonAiBlock body={d.ai_illusion} />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// P-4 전용 인라인 컴포넌트
// ════════════════════════════════════════════════════════════════════

function KeywordTagsDoyoon({ tags }: { tags: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-wrap gap-1.5 my-3 justify-center">
      {tags.map((t, i) => (
        <span
          key={i}
          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(212,180,140,0.18)",
            color: DOYOON_TOKENS.text,
            border: "0.5px solid rgba(139,105,20,0.30)",
            letterSpacing: "0.02em",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function InfoGridDoyoon({ rows }: { rows: ReadonlyArray<{ key: string; val: string }> }) {
  return (
    <div
      className="rounded-[10px] my-3 overflow-hidden"
      style={{
        background: "rgba(139,105,20,0.04)",
        border: "0.5px solid rgba(139,105,20,0.20)",
      }}
    >
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-start gap-3 px-3.5 py-2.5"
          style={{
            borderBottom:
              i < rows.length - 1
                ? "0.5px solid rgba(139,105,20,0.10)"
                : undefined,
          }}
        >
          <span
            className="text-[13px] font-medium flex-shrink-0"
            style={{
              color: DOYOON_TOKENS.goldSoft,
              letterSpacing: "0.02em",
              width: 80,
              lineHeight: 1.6,
            }}
          >
            {r.key}
          </span>
          <span
            className="text-[13px] flex-1 font-bold text-right"
            style={{ color: DOYOON_TOKENS.text, wordBreak: "keep-all", lineHeight: 1.6 }}
          >
            {r.val}
          </span>
        </div>
      ))}
    </div>
  );
}

// 원본 인라인 SVG 그대로 (300×130, 4시점 진짜/착각 라인)
function LineChartDoyoon() {
  return (
    <div className="my-3 rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(139,105,20,0.04)",
        border: "0.5px solid rgba(139,105,20,0.20)",
      }}
    >
      <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        {/* 축 미세 떨림 선 */}
        <path d="M0 100 Q50 99.5 100 100.4 T200 99.6 T300 100.2" stroke="rgba(139,105,20,0.15)" fill="none" strokeWidth="0.5" />
        <path d="M0 65 Q60 65.4 120 64.6 T240 65.3 T300 64.8" stroke="rgba(139,105,20,0.15)" fill="none" strokeWidth="0.5" />
        <path d="M0 30 Q40 30.4 80 29.6 T160 30.3 T240 29.7 T300 30" stroke="rgba(139,105,20,0.15)" fill="none" strokeWidth="0.5" />
        {/* 진짜 인연 — 상승선 (녹색) */}
        <polyline points="30,75 100,60 170,40 240,28" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="30" cy="75" r="3" fill="#fff8ec" stroke="#1D9E75" strokeWidth="1.5" />
        <circle cx="100" cy="60" r="3" fill="#fff8ec" stroke="#1D9E75" strokeWidth="1.5" />
        <circle cx="170" cy="40" r="3" fill="#fff8ec" stroke="#1D9E75" strokeWidth="1.5" />
        <circle cx="240" cy="28" r="4" fill="#1D9E75" style={{ filter: "drop-shadow(0 0 3px rgba(29,158,117,0.55))" }} />
        {/* 착각 인연 — 급락선 (빨강 dashed) */}
        <polyline points="30,18 100,38 170,72 240,108" fill="none" stroke="#E24B4A" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="3,3" />
        <circle cx="30" cy="18" r="4" fill="#E24B4A" style={{ filter: "drop-shadow(0 0 3px rgba(226,75,74,0.55))" }} />
        <circle cx="100" cy="38" r="3" fill="#fff8ec" stroke="#E24B4A" strokeWidth="1.5" />
        <circle cx="170" cy="72" r="3" fill="#fff8ec" stroke="#E24B4A" strokeWidth="1.5" />
        <circle cx="240" cy="108" r="3" fill="#fff8ec" stroke="#E24B4A" strokeWidth="1.5" />
        <text x="30" y="122" textAnchor="middle" fontSize="9" fill="#7a5020">첫 만남</text>
        <text x="100" y="122" textAnchor="middle" fontSize="9" fill="#7a5020">1개월</text>
        <text x="170" y="122" textAnchor="middle" fontSize="9" fill="#7a5020">3개월</text>
        <text x="240" y="122" textAnchor="middle" fontSize="9" fill="#7a5020">6개월</text>
        <text x="248" y="32" fontSize="8" fill="#1D9E75" fontWeight="700">진짜 인연</text>
        <text x="248" y="104" fontSize="8" fill="#E24B4A" fontWeight="700">착각 인연</text>
      </svg>
      <p className="text-[12px] text-center mt-2" style={{ color: DOYOON_TOKENS.textMeta }}>
        진짜 인연은 시간에 따라 호감 상승 · 착각 인연은 급락
      </p>
    </div>
  );
}

function IllusionSignCardDoyoon({
  index,
  keyword,
  pct,
  desc,
}: { index: number; keyword: string; pct: string; desc: string }) {
  return (
    <div
      className="rounded-[10px] px-3 py-3"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: DOYOON_TOKENS.pink, letterSpacing: "0.05em" }}
      >
        오인 신호 {index} · 발생률 {pct}
      </div>
      <div
        className="text-[14px] font-bold leading-[1.4] mb-1.5"
        style={{ color: "#7a2f4f", wordBreak: "keep-all" }}
      >
        {keyword}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(122,47,79,0.85)", wordBreak: "keep-all" }}
      >
        {desc}
      </div>
    </div>
  );
}

function GoodDecisionCardDoyoon({
  label,
  value,
  sub,
}: { label: string; value: string; sub: string }) {
  return (
    <div
      className="rounded-[10px] px-3.5 py-3 my-2"
      style={{
        background: "rgba(75,167,138,0.08)",
        border: "0.5px solid rgba(75,167,138,0.25)",
      }}
    >
      <div
        className="text-[12px] font-semibold mb-2 uppercase"
        style={{ color: "#3a8068", letterSpacing: "0.05em" }}
      >
        {label}
      </div>
      <div
        className="text-[15px] font-bold leading-[1.4] mb-2"
        style={{ color: "#2a604f", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      <div
        className="text-[13px] leading-[1.65]"
        style={{ color: "rgba(42,96,79,0.85)", wordBreak: "keep-all" }}
      >
        {sub}
      </div>
    </div>
  );
}
