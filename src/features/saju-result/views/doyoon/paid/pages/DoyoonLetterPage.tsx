import type { PaidChapterP10 } from "../../../../domain/paidReport";
import { DoyoonPageHead } from "../components/DoyoonPageHead";
import {
  DoyoonSection,
} from "../components/DoyoonSection";
import { DOYOON_TOKENS } from "../components/doyoonTokens";

// P-10 (CH-7) 도윤의 편지 — 박스 3개 분리 디자인 (연우 패턴 차용 + 도윤 톤).
// 박스 1: 지금 입력하신 상황 (step1 AI 답변)
// 박스 2: 알고 싶다 하신 영역 (step2 AI 답변)
// 박스 3: 당신의 한 줄에 답합니다 (step3 quote + AI 답장 + 강조 + 꼬리)
// 헤더: "한 도 윤 의 편 지" + 일주 (박스 1 위)
// 시그니처: "— 도윤 드림" (박스 3 아래)

interface DoyoonLetterPageProps {
  data?: PaidChapterP10;
  userName?: string;
}

const MOCK_P10: PaidChapterP10 = {
  ilju_with_hanja: "병인(丙寅)",
  box1_body:
    "홍길동님이 선택해주신 상황 변수, 데이터로 정리해드릴게요. 분류 자체는 어렵지 않은 케이스입니다.\n\n" +
    "입력값: 썸 진행 중 · 연애 중. 임수(壬水) 일간 표본에서 이 조합은 일관된 분류 패턴으로 잡혀요. " +
    "변수가 한 곳으로 쏠려 감정 활성도가 평균보다 1.4배 높게 측정되는 상태입니다.\n\n" +
    "홍길동님께서 당장 결정 내리지 않으셔도 됩니다. 데이터부터 보고 그다음에 움직이시는 게 효율적이에요.",
  box2_body:
    "홍길동님이 알고 싶다고 표시하신 질문 영역, 데이터 측면에서 정리해드릴게요. 분류 자체가 답 가능 영역에 포함됩니다.\n\n" +
    "질문 영역: 운명의 상대 · 다음 인연의 시기. 임수(壬水) 일간 표본에서 가장 자주 잡히는 질문 셋이에요. " +
    "답변 가능한 변수는 이미 측정돼 있고, 다음 장에서 차례로 풀어드리겠습니다.\n\n" +
    "데이터가 답할 수 있는 영역과 그렇지 않은 영역이 분명하게 나뉩니다. 화(火) 보완 효율도 답 가능 영역 안에 포함돼요.",
  quote_text: "사람을 만나면 처음엔 잘 가다가 꼭 중반에 무너져요. 왜 같은 패턴이 반복되는지 모르겠어요.",
  quote_label: "— 홍길동님이 적어주신 고민",
  box3_body:
    "홍길동님, 적어주신 고민 여러 번 읽었어요. 짧지만 데이터로 들어가면 꽤 많은 게 보이는 문장이에요. " +
    "밤마다 머릿속에서 안 떠나는 거, 그게 지금 사주 변수가 한 곳으로 쏠려 있어서 그래요. " +
    "변수가 정리되지 않으면 잠들기 직전에 가장 활성화되거든요. 이건 홍길동님만의 패턴이 아니라 동일 일간 표본에서 일관되게 나타나는 현상이에요.\n\n" +
    "먼저 안심하셔도 되는 부분부터요. 임수 일간 표본에서 같은 결의 고민을 입력하시는 분들 비율이 꽤 높게 나타났어요. " +
    "적은 숫자가 아니에요. 홍길동님만 그런 게 아니라는 뜻이고, 동시에 이 패턴이 통계적으로 충분히 추적 가능한 영역이라는 의미이기도 해요.\n\n" +
    "그리고 객관적으로요 — 홍길동님은 연애 유형 상위 12%, 매력 지수 상위 8%예요. 이거 그냥 듣기 좋으라고 드리는 말씀 아니에요. " +
    "같은 표본 안에서 이 정도 수치가 나오는 분이 흔하지 않거든요. 단지 화 변수가 비어 있어서 흐름이 약간 막혀 있을 뿐이에요.\n\n" +
    "변수 보완은 통제 가능한 영역이에요. 6장에서 정리해 드린 세 가지 — 색채·공간·행동 — 이 그 답이에요. " +
    "데이터가 할 수 있는 말은 여기까지예요. 이제부터는 홍길동님의 선택이라는 변수가 결과값을 결정하실 거예요. " +
    "다만 분석가로서 한 가지만 말씀드리면, 홍길동님 조합은 오차 범위를 감안해도 기대값이 꽤 높게 측정돼요.",
  emphasis: "홍길동님은 이미 가장 완벽한 답안지를 갖고 계세요.",
  tail: "스스로를 의심하지 마시고, 데이터를 믿어보세요.\n오늘 밤은 편하게 주무셨으면 좋겠네요.",
  uses_ai: false,
  step1_labels: ["썸 진행 중", "연애 중"],
  step2_labels: ["운명의 상대", "다음 인연의 시기"],
};


export default function DoyoonLetterPage({ data, userName }: DoyoonLetterPageProps) {
  const d = data ?? MOCK_P10;
  const name = userName ?? "홍길동";

  return (
    <section
      data-page-idx="10"
      style={{ background: DOYOON_TOKENS.bg, color: DOYOON_TOKENS.text }}
    >
      <DoyoonPageHead
        ch="7"
        hanja="七"
        title="도윤의 편지"
        sub={`${name}님의 한 줄에 답하다`}
      />

      <DoyoonSection>
        <SdSignatureDy03 />

        {/* 편지 헤더 (박스 1 위 1번) */}
        <LetterHeaderDoyoon ilju={d.ilju_with_hanja} userName={name} />

        {/* 박스 1 — step1 AI 답변 */}
        <LetterBoxDoyoon
          subtitle="지금 입력하신 상황"
          chips={d.step1_labels ?? undefined}
          body={d.box1_body}
        />

        {/* 박스 2 — step2 AI 답변 */}
        <LetterBoxDoyoon
          subtitle="알고 싶다 하신 영역"
          chips={d.step2_labels ?? undefined}
          body={d.box2_body}
        />

        {/* 박스 3 — quote + AI 답장 + emphasis + tail */}
        <LetterBox3Doyoon
          quoteText={d.quote_text}
          quoteLabel={d.quote_label}
          body={d.box3_body}
          emphasis={d.emphasis}
          tail={d.tail}
        />

        {/* 시그니처 */}
        <LetterSignatureDoyoon />
      </DoyoonSection>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════
// 인라인 컴포넌트 (도윤 톤 — 베이지·골드·핑크)
// ════════════════════════════════════════════════════════════════════

function SdSignatureDy03() {
  return (
    <div className="relative mx-auto mb-[-10px]" style={{ width: 220, height: 280 }}>
      <ThreadCorner pos="tl" />
      <ThreadCorner pos="br" />
      <div
        aria-label="한도윤 — 편지 시그니처"
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url(/doyoon/sd_dy/dy_03.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

function ThreadCorner({ pos }: { pos: "tl" | "br" }) {
  const map: Record<"tl" | "br", React.CSSProperties> = {
    tl: { top: -8, left: -8, transform: "rotate(-90deg)" },
    br: { bottom: -8, right: -8, transform: "rotate(90deg)" },
  };
  return (
    <span
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        ...map[pos],
        width: 110,
        height: 110,
        backgroundImage: "url(/doyoon/thread/thread_corner.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        opacity: 0.55,
        zIndex: 3,
      }}
    />
  );
}

// ── 편지 헤더 ──
function LetterHeaderDoyoon({ ilju, userName }: { ilju: string; userName: string }) {
  return (
    <div className="mt-4 mb-5">
      <div
        className="text-center mb-1"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.warmGold,
          letterSpacing: "0.5em",
          fontWeight: 700,
        }}
      >
        한 도 윤 의 편 지
      </div>
      <div
        className="text-center pb-4"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.textMeta,
          borderBottom: "0.5px solid rgba(139,105,20,0.20)",
        }}
      >
        — <span style={{ color: DOYOON_TOKENS.warmGold, fontWeight: 600 }}>{ilju}</span> 일주, {userName}님께
      </div>
    </div>
  );
}

// ── 박스 1·2 공통 카드 ──
function LetterBoxDoyoon({
  subtitle,
  chips,
  body,
}: { subtitle: string; chips?: ReadonlyArray<string>; body: string }) {
  return (
    <div
      className="rounded-[12px] px-5 py-5 my-4 relative"
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #fdf3e7 100%)",
        border: "0.5px solid rgba(139,105,20,0.28)",
      }}
    >
      {/* top hairline */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0"
        style={{
          height: 2,
          background: `linear-gradient(90deg, transparent, ${DOYOON_TOKENS.warmGold}, transparent)`,
        }}
      />
      <div
        className="text-center mb-3"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.warmGold,
          letterSpacing: "0.1em",
          fontWeight: 700,
        }}
      >
        {subtitle}
      </div>

      {/* 사용자 선택 칩 */}
      {chips && chips.length > 0 && (
        <div
          className="flex flex-wrap gap-1.5 justify-center mb-3 pb-3"
          style={{
            borderBottom: "0.5px dashed rgba(139,105,20,0.22)",
          }}
        >
          {chips.map((c, i) => (
            <span
              key={i}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(212,180,140,0.20)",
                color: DOYOON_TOKENS.text,
                border: "0.5px solid rgba(139,105,20,0.30)",
                letterSpacing: "0.02em",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      )}

      <BodyTextDoyoon body={body} />
    </div>
  );
}

// ── 박스 3 (quote + 답장 + 강조 + 꼬리) ──
function LetterBox3Doyoon({
  quoteText,
  quoteLabel,
  body,
  emphasis,
  tail,
}: {
  quoteText: string;
  quoteLabel: string;
  body: string;
  emphasis: string;
  tail: string;
}) {
  return (
    <div
      className="rounded-[12px] px-5 py-5 my-4 relative"
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #fdf3e7 100%)",
        border: "0.5px solid rgba(212,83,126,0.32)",
        boxShadow: "0 0 16px rgba(212,83,126,0.06) inset",
      }}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0"
        style={{
          height: 2,
          background: `linear-gradient(90deg, transparent, ${DOYOON_TOKENS.pink}, transparent)`,
        }}
      />
      <div
        className="text-center mb-4 pb-2"
        style={{
          fontSize: 13,
          color: DOYOON_TOKENS.pink,
          letterSpacing: "0.1em",
          fontWeight: 700,
          borderBottom: "0.5px dashed rgba(212,83,126,0.25)",
        }}
      >
        당신의 한 줄에 답합니다
      </div>

      {/* quote */}
      <div
        className="rounded-[8px] px-3 py-3 mb-5 text-center"
        style={{
          background: "rgba(139,105,20,0.06)",
          border: "0.5px dashed rgba(139,105,20,0.28)",
        }}
      >
        <div
          className="text-[14px] leading-[1.75] italic mb-1"
          style={{ color: DOYOON_TOKENS.warmGold, wordBreak: "keep-all" }}
        >
          &ldquo;{quoteText}&rdquo;
        </div>
        <div
          className="text-[11px]"
          style={{ color: DOYOON_TOKENS.textMeta, letterSpacing: "0.04em" }}
        >
          {quoteLabel}
        </div>
      </div>

      {/* 답장 본문 */}
      <BodyTextDoyoon body={body} />

      {/* 강조 — 핑크 */}
      <p className="mt-4 mb-2">
        <span
          style={{
            color: DOYOON_TOKENS.pink,
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {emphasis}
        </span>
      </p>

      {/* 꼬리 */}
      <p
        style={{
          color: DOYOON_TOKENS.textMeta,
          fontSize: 14,
          lineHeight: 1.85,
          whiteSpace: "pre-line",
          wordBreak: "keep-all",
        }}
      >
        {tail}
      </p>
    </div>
  );
}

// ── 시그니처 ──
function LetterSignatureDoyoon() {
  return (
    <div
      className="text-right mt-4 mb-2 px-2"
      style={{
        fontSize: 14,
        color: DOYOON_TOKENS.warmGold,
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      — 도윤 드림
    </div>
  );
}

// ── 본문 단락 렌더 ──
function BodyTextDoyoon({ body }: { body: string }) {
  return (
    <div
      className="text-[14px] leading-[1.95]"
      style={{
        color: DOYOON_TOKENS.text,
        wordBreak: "keep-all",
      }}
    >
      {body.split("\n\n").map((para, i) => {
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="mb-3 last:mb-0">
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong
                    key={j}
                    style={{ color: DOYOON_TOKENS.pink, fontWeight: 700 }}
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={j}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
