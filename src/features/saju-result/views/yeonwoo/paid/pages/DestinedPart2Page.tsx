import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 2338~2398) 정밀 포팅.
// 4-3 결말 예측 시나리오:
//   - notice-yw 박스 (🔮 안내문, 고정)
//   - 카드 3개: card-warn(지금 이대로) / card-good(네가 먼저, 권장) / card-amber(상대가 먼저)
//   - AI 박스 400~450자 (일간 10 변형 예정 — 현재 임수 톤)
//   - SD yw_05 (sz-md 120×120) + 강연우 버블 (data-flow="left", 고정)

// 백엔드 PaidChapterP7과 1:1 매칭.
type CardTone = "warn" | "good" | "amber";

interface DestinedPart2EndingCard {
  label: string;
  value: string;
  sub: string;
  tone: CardTone;
}

interface DestinedPart2Data {
  ending_card_1: DestinedPart2EndingCard;  // warn
  ending_card_2: DestinedPart2EndingCard;  // good
  ending_card_3: DestinedPart2EndingCard;  // amber
  ai_ending: string;                       // 400~450자, 일간별 변형
  notice: string;                          // 🔮 안내문 (고정)
  bubble: string;                          // 강연우 멘트 (고정)
}

const MOCK_P7: DestinedPart2Data = {
  // 임수 톤 — backend yeonwoo_p7_inner.py compose_p7_inner(ilgan="임수") 결과 1:1.
  ending_card_1: {
    tone: "warn",
    label: "지금 이대로",
    value: "실이 천천히 풀려",
    sub: "둘 다 기다리다가 그냥 흐려져. 시간이 갈수록 약해져.",
  },
  ending_card_2: {
    tone: "good",
    label: "네가 먼저",
    value: "실이 빠르게 당겨져",
    sub: "너의 한마디로 매듭이 풀려. 가장 권하는 길이야.",
  },
  ending_card_3: {
    tone: "amber",
    label: "상대가 먼저",
    value: "실이 강하게 묶여",
    sub: "가능성은 있어. 다만 네가 그 신호를 못 알아볼 수도 있어.",
  },
  ai_ending:
    "세 갈래가 보여. 같은 사람을 두고도 결말이 다 달라.\n\n" +
    "첫째, 지금 이대로. 둘 다 기다리다가 그냥 흐려져. 실이 끊어지진 않아. 그냥 천천히 풀려서 어느 날 보면 사라져 있어. 가장 흔한 결말이야. 너는 또 혼자 그 자리를 만지작거릴 거야.\n\n" +
    "둘째, 네가 먼저. 너의 한마디로 매듭이 풀려. 한마디가 어렵지 풀리면 빠르게 당겨져. 임수(壬水) 일간한테는 이게 가장 권하는 길이야. 깊은 사람이 먼저 손 내밀면 상대는 그 무게를 알아봐. 가벼운 한마디가 아니라는 걸 알아.\n\n" +
    "셋째, 상대가 먼저. 가능성은 있지만 시간이 더 걸려. 상대도 너랑 비슷한 결이라 망설여. 기다리는 동안 네가 견디기 어려울 수도 있어.\n\n" +
    "결정은 네가 해. 다만 명줄의 흐름은 한 번 갈라지면 다시 안 합쳐져. 잘 골라.",
  notice:
    "네가 어떻게 움직이느냐에 따라 명줄의 흐름이 갈라져. 세 갈래 중 하나가 너의 길이야.",
  bubble: "명줄의 흐름이 이렇게 보여.",
};

export default function DestinedPart2Page({ data }: { data?: DestinedPart2Data }) {
  const p = data ?? MOCK_P7;
  return (
    <section
      data-page-idx="7"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <div className="relative">
        <PageHead
          chHanja="四"
          chCode="CH-4"
          title="운명의 짝 · 결말 (2/2)"
          sub="인연 프로파일 · 속마음 · 결말 예측"
          iconAsset="/yeonwoo/icon/icon_two_threads.svg"
        />
        <span
          aria-hidden
          className="absolute top-0 right-0 w-12 h-12 bg-no-repeat bg-contain pointer-events-none opacity-80"
          style={{ backgroundImage: "url(/yeonwoo/decoration/decoration_petals.svg)" }}
        />
      </div>

      {/* ── 4-3 결말 예측 시나리오 ── */}
      <Sec>
        <SectionLabel qaSectionId="4-3">4-3 결말 예측 시나리오</SectionLabel>

        {/* notice-yw 박스 (🔮 안내문, 고정) */}
        <NoticeBox text={p.notice} />

        {/* 카드 3개 (3종 톤) — 백엔드 데이터로 동적 렌더 */}
        <CardsGrid>
          {[p.ending_card_1, p.ending_card_2, p.ending_card_3].map((c) => (
            <EndingCard
              key={c.label}
              tone={c.tone}
              label={c.label}
              value={c.value}
              sub={c.sub}
            />
          ))}
        </CardsGrid>

        <AiBlock text={p.ai_ending} />

        {/* SD yw_05 (sz-md 120×120) + 강연우 버블 (data-flow="left") */}
        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[120px] h-[120px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_05.png"
              alt="강연우 — 결말 시나리오"
              fill
              sizes="120px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text={p.bubble} />
          </div>
        </div>
      </Sec>
    </section>
  );
}

// ── 로컬 컴포넌트 ─────────────────────────────────

// .notice-yw — 안내 박스 (🔮 + 한 줄 메시지)
function NoticeBox({ text }: { text: string }) {
  return (
    <div
      className="my-2 rounded-[8px] px-3 py-2.5 flex items-start gap-2"
      style={{
        background: "rgba(212,83,126,0.06)",
        border: "0.5px solid rgba(212,83,126,0.22)",
      }}
    >
      <span className="text-[16px] leading-[1.4]" aria-hidden>
        🔮
      </span>
      <span
        className="text-[13px] leading-[1.7] flex-1"
        style={{
          color: "rgba(232,201,160,0.95)",
          wordBreak: "keep-all",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function CardsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-[7px]"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "6px",
      }}
    >
      {children}
    </div>
  );
}

// 3종 톤 카드 (warn / good / amber) — HTML CSS 정밀 매핑.
// CardTone은 파일 상단에서 이미 정의됨.

const CARD_TONE_STYLES: Record<
  CardTone,
  {
    bg: string;
    border: string;
    labelColor: string;
    valueColor: string;
    subColor: string;
  }
> = {
  warn: {
    bg: "rgba(220,60,60,0.08)",
    border: "0.5px solid rgba(220,80,80,0.2)",
    labelColor: "#E24B4A",
    valueColor: "#f0c0c0",
    subColor: "rgba(240,180,180,0.85)",
  },
  good: {
    bg: "rgba(29,158,117,0.07)",
    border: "0.5px solid rgba(29,158,117,0.2)",
    labelColor: "#5DCAA5",
    valueColor: "#a0e8d0",
    subColor: "rgba(160,220,200,0.8)",
  },
  amber: {
    bg: "rgba(200,168,112,0.08)",
    border: "0.5px solid rgba(200,168,112,0.2)",
    labelColor: "#E8C9A0",
    valueColor: "#e8d080",
    subColor: "rgba(200,168,112,0.8)",
  },
};

function EndingCard({
  tone,
  label,
  value,
  sub,
}: {
  tone: CardTone;
  label: string;
  value: string;
  sub: string;
}) {
  const s = CARD_TONE_STYLES[tone];
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{ background: s.bg, border: s.border }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: s.labelColor, letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: s.valueColor, wordBreak: "keep-all" }}
      >
        {value}
      </div>
      <div
        className="text-[14px] leading-[1.7]"
        style={{
          color: s.subColor,
          letterSpacing: "-0.01em",
          wordBreak: "keep-all",
        }}
      >
        {sub}
      </div>
    </div>
  );
}
