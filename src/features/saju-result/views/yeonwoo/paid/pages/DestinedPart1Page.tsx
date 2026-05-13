import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import PersonFrame from "../components/PersonFrame";
import KeywordTags from "../components/KeywordTags";
import InfoGrid from "../components/InfoGrid";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 2226~2336) 정밀 포팅.
// ⚠️ P-6 점수 계산 엔진은 다른 클코가 개선 중 — 구조 동기화만 + 임수 케이스 MOCK.
//
// 4-1 붉은 실이 이어진 사람:
//   - PersonFrame (inyon) + keyword-tags 5 + 정보 그리드 8 row
//   - AI 박스 #1 (프로파일 400~500자)
//   - AI 박스 #2 (만남 시나리오 300~400자)
//   - 강연우 버블 "이 사람 네 주변에 이미 있을 수 있어."
//
// 4-2 속마음 투시:
//   - notice-yw 박스 (🔮 안내)
//   - SD yw_03 (sz-xl 150×200) + 카드 3개 단일 컬럼 (data-flow="right")
//   - AI 박스 300~350자

// 백엔드 PaidChapterP6와 1:1 매칭. paidReport.ts의 PaidChapterP6 임포트와 호환되도록 필드명 통일.
interface DestinedPart1Data {
  // 4-1
  match_slot_id: string;                           // "m-water-yang" 등 (PersonFrame 동적 사진)
  keyword_tags: ReadonlyArray<string>;             // 5
  info_rows: ReadonlyArray<{ key: string; val: string }>; // 8 (마지막 row "궁합 지수" 강조)
  ai_looks: string;                                // 외형 묘사 단락
  ai_match: string;                                // 오행+일간 매칭 단락
  ai_first_meeting: string;                        // 첫 만남 시나리오 단락
  bubble: string;                                  // 강연우 멘트 (고정)

  // 4-2
  inner_cards: ReadonlyArray<{
    label: string;
    value: string;
    sub: string;
  }>;                                              // 3개
  ai_inner: string;                                // 300~350자
}

const NOTICE_INNER_TEXT =
  "지금 마음에 걸리는 상대가 있다면 그 사람에 대입해봐. 아직 없다면 — 곧 들어올 인연을 기준으로 읽으면 돼.";

const MOCK_P6: DestinedPart1Data = {
  // HTML 원본 임수 톤 그대로. backend yeonwoo_p6_destined.py 합성 결과와 1:1.
  match_slot_id: "m-water-yang",
  keyword_tags: [
    "따뜻한 인상",
    "조용한 사람",
    "손이 예쁨",
    "웃음이 깊음",
    "기다릴 줄 앎",
  ],
  info_rows: [
    { key: "키·체형", val: "평균~약간 큰 편 · 어깨선 단단함" },
    { key: "얼굴상", val: "선이 부드러운 둥근형 · 이마 넓음" },
    {
      key: "이목구비",
      val: "눈매 길고 끝이 부드러움 · 입꼬리 살짝 올라감",
    },
    { key: "손·분위기", val: "손가락 길고 단정 · 차분한 결" },
    { key: "성격", val: "차분하지만 한 번 마음 열면 깊음" },
    { key: "직업군", val: "기획·교육·창작 계열" },
    { key: "첫 느낌", val: "왠지 익숙한 사람" },
    // 마지막 row "궁합 지수"는 분홍 강조 — InfoGrid에서 받아서 처리.
    { key: "궁합 지수", val: "매우 강함" },
  ],
  ai_looks:
    "붉은 실이 이 사람한테 이어져 있어. 한 번 묶이면 안 풀리는 결이야.\n\n" +
    "키는 평균에서 약간 큰 편. 어깨선이 단단해서 옆에 서면 너를 가려주는 느낌이야. 얼굴은 선이 부드러운 둥근형. 이마가 넓어.\n\n" +
    "눈매가 길고 끝이 부드럽게 떨어져 있어서, 웃지 않아도 따뜻해 보이는 사람이야. 입꼬리가 살짝 올라가 있어서 무표정일 때도 차갑지 않아. 손가락은 길고 단정해. 손을 보면 알아. 함부로 쓴 손이 아니야. 차분한 결로 살아온 사람이지.",
  ai_match:
    "너의 토(土)가 부족한 자리에 이 사람이 그걸 채워. 따뜻하고 조용해. 말이 많지 않은데 곁에 있으면 편해. 너는 깊은 사람이라 옆에 있는 사람이 시끄러우면 못 견디잖아. 이 사람은 안 시끄러워. 그게 너한테 가장 중요해.\n\n" +
    "임수(壬水) 일간한테 가장 안정적인 짝이야. 기다릴 줄 아는 사람이라 너의 침묵을 받아줘. 너는 침묵으로 사랑하는 사람인데, 그걸 읽을 수 있는 사람이 흔하지 않아. 이 사람은 읽어.",
  ai_first_meeting:
    "이 사람은 네 주변에 이미 있을 가능성이 커. 새로운 사람이 아니라 이미 한 번 스쳤던 사람일 수 있어. 너는 못 알아봤을 뿐이야. 깊은 사람은 한 번에 못 알아봐.\n\n" +
    "익숙한 자리, 자주 가는 공간 — 거기서 다시 마주칠 거야. 카페일 수도 있고, 일하는 자리일 수도 있고, 누가 소개해서 한 번 본 사람일 수도 있어. 처음엔 조용해서 못 알아볼 수 있어. 너의 결과 비슷한 사람이라 도드라지지 않거든.\n\n" +
    "두 번째 마주칠 때 시선을 한 번 더 줘. 그게 신호야. 거기서 실이 당겨져. 첫 번째는 그냥 지나가도 돼. 두 번째에 멈춰. 그게 너에게 주어진 단 한 번의 기회야.",
  bubble: "이 사람 네 주변에 이미 있을 수 있어.",

  inner_cards: [
    {
      label: "실의 상태",
      value: "팽팽하게 당겨져 있음",
      sub: "상대도 너를 의식하고 있어. 단지 표현을 안 할 뿐이야.",
    },
    {
      label: "행동 → 심리 1",
      value: "먼저 연락 안 함",
      sub: "관심 없음이 아니야. 망설이고 있는 거야.",
    },
    {
      label: "행동 → 심리 2",
      value: "대화는 길게 받음",
      sub: "시작할 마음은 없는데 끊을 마음도 없어.",
    },
  ],
  ai_inner:
    "실이 끊어진 게 아니야. 팽팽하게 당겨져 있어. 손에 잡으면 떨림이 느껴져. 그게 살아 있다는 증거야.\n\n" +
    "상대도 너를 의식해. 의식 안 하는 사람이 대화 길게 받지 않아. 안 끊는다는 건 끊을 마음이 없다는 뜻이야. 다만 먼저 움직일 사람이 아니야. 임수(壬水) 일간인 너랑 비슷한 결이라 둘 다 기다려. 둘 다 자존심이 깊어서 먼저 손 내미는 게 어려워.\n\n" +
    "그래서 누군가는 신호를 줘야 해. 작은 거라도 돼. 안부 한 줄, 우연을 가장한 만남 한 번. 그 한 번이 매듭을 풀어. 보통은 너야. 너의 한마디가 이 흐름을 결정해.",
};

export default function DestinedPart1Page({ data }: { data?: DestinedPart1Data }) {
  const p = data ?? MOCK_P6;
  return (
    <section
      data-page-idx="6"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <div className="relative">
        <PageHead
          chHanja="四"
          chCode="CH-4"
          title="운명의 짝 (1/2)"
          sub="인연 프로파일 · 속마음 · 결말 예측"
          iconAsset="/yeonwoo/icon/icon_two_threads.svg"
        />
        <span
          aria-hidden
          className="absolute top-0 right-0 w-12 h-12 bg-no-repeat bg-contain pointer-events-none opacity-80"
          style={{
            backgroundImage: "url(/yeonwoo/decoration/decoration_petals.svg)",
          }}
        />
      </div>

      {/* ── 4-1 붉은 실이 이어진 사람 ── */}
      <Sec>
        <SectionLabel qaSectionId="4-1">4-1 붉은 실이 이어진 사람</SectionLabel>
        <SectionTitle>네 명줄에 묶인 그 사람의 모습.</SectionTitle>

        <PersonFrame person="inyon" slotId={p.match_slot_id} />

        <KeywordTags tags={p.keyword_tags} />

        {/* 정보 그리드 8 row (마지막 "궁합 지수"는 분홍 강조) */}
        <InyonInfoGrid rows={p.info_rows} />

        {/* AI 박스 — 외형 + 매칭을 한 박스로 묶고, 첫 만남은 별도 박스 */}
        <AiBlock text={`${p.ai_looks}\n\n${p.ai_match}`} />
        <AiBlock text={p.ai_first_meeting} />

        <YeonwooBubble text={p.bubble} />
      </Sec>

      {/* ── 4-2 속마음 투시 ── */}
      <Sec>
        <SectionLabel qaSectionId="4-2">4-2 속마음 투시</SectionLabel>

        {/* notice-yw 박스 (🔮 안내) */}
        <NoticeBox text={NOTICE_INNER_TEXT} />

        <SectionTitle>실이 어떻게 묶여 있는지 보여.</SectionTitle>

        {/* SD yw_03 (sz-xl 150×200) + 카드 3개 단일 컬럼 (data-flow="right") */}
        <div className="flex items-start gap-3 my-3 flex-row-reverse">
          <div className="relative w-[150px] h-[200px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_03.png"
              alt="강연우 — 속마음 투시"
              fill
              sizes="150px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            {p.inner_cards.map((c) => (
              <InnerCard
                key={c.label}
                label={c.label}
                value={c.value}
                sub={c.sub}
              />
            ))}
          </div>
        </div>

        <AiBlock text={p.ai_inner} />
      </Sec>
    </section>
  );
}

// ── 로컬 컴포넌트 ─────────────────────────────────

// 4-1 인연 정보 그리드 (.info-row × 8) — 마지막 "궁합 지수"는 분홍 강조.
function InyonInfoGrid({
  rows,
}: {
  rows: ReadonlyArray<{ key: string; val: string }>;
}) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px] my-2"
      style={{
        background: "#1a1a18",
        border: "0.5px solid #2a2a28",
      }}
    >
      {rows.map((row, i) => {
        const isLast = i === rows.length - 1;
        const isMatchScore = row.key === "궁합 지수";
        return (
          <div
            key={row.key}
            className="flex justify-between py-2"
            style={{
              fontSize: "13px",
              borderBottom: isLast
                ? "none"
                : "0.5px dashed rgba(200,168,112,0.15)",
            }}
          >
            <span style={{ color: "#888780" }}>{row.key}</span>
            <span
              className="text-right"
              style={{
                color: isMatchScore ? "#D4537E" : "#d8d6d0",
                fontWeight: isMatchScore ? 600 : 500,
                maxWidth: "60%",
                wordBreak: "keep-all",
              }}
            >
              {row.val}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// notice-yw — 분홍 알림 박스 (P-7의 NoticeBox와 동일 톤, 향후 components/로 승격 검토)
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

// 4-2 속마음 카드 (실의 상태 / 행동→심리) — .card-yw 3-tier
function InnerCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{
        background: "#1a1a18",
        border: "0.5px solid #2a2a28",
      }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[10px]"
        style={{ color: "#E8C9A0", letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div
        className="text-[13px] font-semibold leading-[1.45] mb-[6px]"
        style={{ color: "#f0ede8", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      <div
        className="text-[12px] leading-[1.6]"
        style={{
          color: "#b0aea4",
          wordBreak: "keep-all",
        }}
      >
        {sub}
      </div>
    </div>
  );
}
