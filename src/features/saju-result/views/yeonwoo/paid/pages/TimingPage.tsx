import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 2401~2582) 정밀 포팅.
// 단일 섹션 5-1 (label 없음, 도입부에 SD + AI + 타임라인 12개월 + 버블만)
//
// 구성:
//   - SD yw_08 (sz-spotlight 260×260) + thread_corner 대각 액센트
//   - AI 박스 (12개월 흐름 도입, 200~300자)
//   - 두루마리 (scroll_top/middle/bottom) + 타임라인 12 row
//     · 각 row: label + hearts ♥♥♥♥♥ + knot (loose/tight/glowing) + state + desc
//     · 피크 row (M+3, M+8): tl-peak-row + 촛불 + 분홍 강조
//   - 강연우 버블 "이 시기에 붉은 실이 가장 강하게 당겨."

type KnotKind = "loose" | "tight" | "glowing";

interface MonthRow {
  label: string;       // "5월 (이번달)" / "6월" / "'27. 1월" 등 동적
  hearts: number;      // 0~5 (♥ 채워진 개수)
  knot: KnotKind;
  state: string;       // "시작" / "진입" / "상승" / "피크" / "심화" / "안정" / "정체" / "재상승" / "2차 피크" / "신뢰" / "충전" / "1년차 마무리"
  desc: string;
  is_peak?: boolean;
}

interface TimingData {
  months: ReadonlyArray<MonthRow>;
  ai_intro: string;          // 200~300자, {PEAK_LABEL_1}/{PEAK_LABEL_2}/{ILGAN} placeholder 자동 치환된 결과
  bubble: string;            // 강연우 멘트 (고정)
}

const DEFAULT_MONTHS: ReadonlyArray<MonthRow> = [
  { label: "5월 (이번달)", hearts: 2, knot: "loose",   state: "시작",        desc: "이번 달부터 흐름이 움직여. 큰 사건은 없어도 결이 바뀌는 시기야." },
  { label: "6월",          hearts: 3, knot: "tight",   state: "진입",        desc: "실이 한 가닥 새로 묶여. 익숙한 자리에서 새 사람 보일 수 있어." },
  { label: "7월",          hearts: 5, knot: "glowing", state: "상승",        desc: "흐름이 빠르게 차오르는 달. 다가오는 신호 놓치지 마." },
  { label: "8월",          hearts: 5, knot: "glowing", state: "피크",        desc: "실이 가장 강하게 당겨지는 달. 이때 움직이면 매듭이 단단히 묶여.", is_peak: true },
  { label: "9월",          hearts: 4, knot: "tight",   state: "심화",        desc: "관계가 깊어지는 시기. 상대 페이스에 맞춰 움직여." },
  { label: "10월",         hearts: 3, knot: "tight",   state: "안정",        desc: "잔잔한 시기. 큰 변화보다 지금 흐름 유지가 좋아." },
  { label: "11월",         hearts: 2, knot: "loose",   state: "정체",        desc: "잠깐 흐름이 막혀. 조급하게 밀어붙이면 매듭이 엉켜." },
  { label: "12월",         hearts: 3, knot: "tight",   state: "재상승",      desc: "새 환경, 새 자리에 가봐. 거기서 실이 다시 움직여." },
  { label: "'27. 1월",     hearts: 5, knot: "glowing", state: "2차 피크",    desc: "한 해를 새로 여는 달. 실이 한 번 더 강하게 당겨져. 표현을 분명히 해.", is_peak: true },
  { label: "'27. 2월",     hearts: 4, knot: "tight",   state: "신뢰",        desc: "관계 단단해지는 시기. 약속 한 번이 천 마디보다 무거워." },
  { label: "'27. 3월",     hearts: 2, knot: "loose",   state: "충전",        desc: "속을 비우는 달. 다음 흐름에 쓸 기운을 모아." },
  { label: "'27. 4월",     hearts: 4, knot: "tight",   state: "1년차 마무리", desc: "1년이 한 바퀴 돌았어. 용기 있는 한마디가 다음 흐름을 바꿔." },
];

const MOCK_P8: TimingData = {
  months: DEFAULT_MONTHS,
  ai_intro:
    "한 해의 흐름이 보여. 일 년 내내 같은 결이 아니야. 강하게 당겨지는 달이 있고, 비워야 하는 달이 있어.\n\n" +
    "이번 달부터 1년을 봐. 너의 명줄에서 실이 가장 강하게 당겨지는 건 8월과 '27. 1월이야. 그 두 달은 가만히 있어도 사람이 들어와. 그 사이는 충전 구간이야. 조급해하지 마. 비우는 시간이 곧 채우는 시간이야.\n\n" +
    "임수(壬水) 일간은 흐름을 거스르면 안 되는 결이야. 피크에 움직이고, 정체기엔 멈춰. 그게 너에게 가장 잘 맞아.",
  bubble: "이 시기에 붉은 실이 가장 강하게 당겨.",
};

export default function TimingPage({ data }: { data?: TimingData }) {
  const p = data ?? MOCK_P8;
  return (
    <section
      data-page-idx="8"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="五"
        chCode="CH-5"
        title="인연이 오는 시간"
        sub="12개월 연애운 전체"
        iconAsset="/yeonwoo/icon/icon_calendar.svg"
      />

      <Sec>
        {/* HTML 명세에 slabel 없음 — SD 스포트라이트만 */}
        <SectionLabel qaSectionId="5-1">5-1 12개월 운명선</SectionLabel>

        {/* SD yw_08 (sz-spotlight 260×260) + thread_corner 대각 액센트 */}
        <div className="relative my-3 flex justify-center">
          <span
            aria-hidden
            className="absolute -top-2 -left-2 w-10 h-10 bg-no-repeat bg-contain pointer-events-none opacity-60"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)" }}
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-no-repeat bg-contain pointer-events-none opacity-60"
            style={{
              backgroundImage: "url(/yeonwoo/thread/thread_corner.png)",
              transform: "scale(-1,-1)",
            }}
          />
          <div className="relative w-full max-w-[260px] aspect-square">
            <Image
              src="/yeonwoo/sd_yw/yw_08.png"
              alt="강연우 — 12개월 운명선"
              fill
              sizes="(max-width: 480px) 70vw, 260px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <AiBlock text={p.ai_intro} />

        {/* 두루마리 + 12 row 타임라인 */}
        <Scroll>
          <div className="flex flex-col">
            {p.months.map((m, i) => (
              <TimelineRow
                key={m.label}
                row={m}
                isLast={i === p.months.length - 1}
              />
            ))}
          </div>
        </Scroll>

        <YeonwooBubble text={p.bubble} />
      </Sec>
    </section>
  );
}

// ── 두루마리 컨테이너 (scroll_top/middle/bottom) ──
// HTML CSS 정밀 매핑 (line 877~928):
//   - scroll-body: 좌우 검정 매듭 + 가운데 한지 (좌우 14% 비움)
//   - margin top/bottom -32%: top/bottom cap의 한지 영역에 컨텐츠 끌어올림
//   - 좌측 thread_straight 세로 라인 (opacity 0.5)
//   - 안쪽 텍스트 색: 다크 브라운 (#3a2a14)
function Scroll({ children }: { children: React.ReactNode }) {
  // 본문 marginTop/marginBottom -32%로 컨텐츠를 cap 한지 영역까지 끌어올리는 디자인.
  // 외부 cap을 한 번 더 두어 두루마리가 자연스럽게 시작/끝나는 시각적 연장 효과.
  return (
    <div className="mt-[70px] mb-[70px] relative">
      {/* 외부 상단 cap — 두루마리 시각적 연장.
          SVG 원본 비율(958x706 ≈ 16:12)로 그려서 검정 매듭이 내부 cap과 동일한 시각 크기.
          내부 cap은 본문이 marginTop -32%로 한지 영역을 덮으므로 16:4 강제 압축이 의도된 디자인. */}
      <div
        aria-hidden
        className="w-full"
        style={{
          aspectRatio: "958 / 706",
          backgroundImage: "url(/yeonwoo/scroll/scroll_top_yw.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />
      {/* 내부 상단 cap (한지 + 위쪽 검정 막대) — 본문이 한지 영역에 -32% 끌어올려짐 */}
      <div
        aria-hidden
        className="w-full"
        style={{
          aspectRatio: "16 / 4",
          backgroundImage: "url(/yeonwoo/scroll/scroll_top_yw.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center bottom",
        }}
      />
      {/* 본문 영역 (좌우 14% 패딩으로 검정 매듭 영역 비우기) */}
      <div
        className="relative"
        style={{
          backgroundImage: "url(/yeonwoo/scroll/scroll_middle_yw.svg)",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          padding: "14px 14% 14px calc(14% + 6px)",
          marginTop: "-32%",
          marginBottom: "-32%",
          color: "#3a2a14",
          minHeight: "100px",
          zIndex: 1,
        }}
      >
        {/* 좌측 세로 thread_straight 라인 (opacity 0.5) */}
        <span
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: "calc(14% - 8px)",
            top: "8px",
            bottom: "8px",
            width: "6px",
            backgroundImage: "url(/yeonwoo/thread/thread_straight.svg)",
            backgroundRepeat: "repeat-y",
            backgroundSize: "6px auto",
            backgroundPosition: "center top",
            opacity: 0.5,
          }}
        />
        {children}
      </div>
      {/* 내부 하단 cap (한지 + 아래쪽 검정 막대) */}
      <div
        aria-hidden
        className="w-full"
        style={{
          aspectRatio: "16 / 4",
          backgroundImage: "url(/yeonwoo/scroll/scroll_bottom_yw.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center top",
        }}
      />
      {/* 외부 하단 cap — 두루마리 시각적 연장 (SVG 자연 비율로 검정 매듭 정상 크기). */}
      <div
        aria-hidden
        className="w-full"
        style={{
          aspectRatio: "958 / 706",
          backgroundImage: "url(/yeonwoo/scroll/scroll_bottom_yw.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}

// ── 타임라인 1개월 row ──
// HTML CSS 정밀 매핑 (line 181~196, 938~1038):
//   - 일반 row: 점선 border-bottom + padding 8px 0 + tl-row-inner flex / gap 8px
//   - tl-label: 다크 브라운 #3a2a14, 14px, weight 500
//   - tl-hearts: ♥ #D4537E (분홍) / ♡ rgba(60,40,20,0.18) (옅은 브라운)
//   - tl-knot: 우측 끝 (margin-left:auto), 24~32px SVG
//   - 그 다음 state span
//   - month-desc: #5a4020 브라운, 12px, line-height 1.7
//   - 피크 row: 분홍 배경 + 좌측 큰 candle_peak (36×62) + 우측 decoration_petals
function TimelineRow({ row, isLast }: { row: MonthRow; isLast: boolean }) {
  const isPeak = !!row.is_peak;
  const labelColor = isPeak ? "#D4537E" : "#3a2a14";
  const labelWeight = isPeak ? 700 : 500;
  const stateColor = isPeak ? "#B83E66" : "#5a4020";
  const descColor = isPeak ? "#B83E66" : "#5a4020";
  const knotSize =
    row.knot === "loose" ? 24 : row.knot === "tight" ? 28 : 32;
  return (
    <div
      className="relative"
      style={{
        borderBottom: isLast ? "none" : "0.5px solid rgba(60,40,20,0.10)",
        padding: isPeak ? "8px 6px" : "8px 0",
        background: isPeak ? "rgba(212,83,126,0.10)" : "transparent",
        borderRadius: isPeak ? "8px" : 0,
        margin: isPeak ? "4px -4px" : 0,
        boxShadow: isPeak ? "inset 0 0 24px rgba(212,83,126,0.10)" : "none",
      }}
    >
      {/* 피크 우측 — decoration_petals */}
      {isPeak && (
        <span
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            right: "-2px",
            width: "36px",
            height: "36px",
            transform: "translateY(-50%)",
            backgroundImage: "url(/yeonwoo/decoration/decoration_petals.svg)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.55,
          }}
        />
      )}

      <div
        className="flex items-center"
        style={{ gap: "8px", flexWrap: "nowrap" }}
      >
        {/* 피크 좌측 candle_peak (36×62) */}
        {isPeak && (
          <span
            aria-hidden
            className="inline-block flex-shrink-0"
            style={{
              width: "36px",
              height: "62px",
              backgroundImage: "url(/yeonwoo/candle/candle_peak.svg)",
              backgroundSize: "contain",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              verticalAlign: "bottom",
            }}
          />
        )}

        {/* label */}
        <span
          className="flex-shrink-0"
          style={{
            fontSize: "14px",
            color: labelColor,
            fontWeight: labelWeight,
            whiteSpace: "nowrap",
          }}
        >
          {row.label}
        </span>

        {/* hearts ♥ × 5 */}
        <span
          className="flex-shrink-0"
          style={{ fontSize: "14px", whiteSpace: "nowrap" }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{
                color: i < row.hearts ? "#D4537E" : "rgba(60,40,20,0.18)",
              }}
            >
              {i < row.hearts ? "♥" : "♡"}
            </span>
          ))}
        </span>

        {/* knot 아이콘 (우측 끝으로 밀려감) */}
        <span
          aria-hidden
          className="inline-block flex-shrink-0"
          style={{
            width: `${knotSize}px`,
            height: `${knotSize}px`,
            marginLeft: "auto",
            backgroundImage: `url(/yeonwoo/thread/thread_knot_${row.knot}.svg)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter:
              row.knot === "glowing"
                ? "drop-shadow(0 0 8px rgba(212,83,126,0.65))"
                : "none",
          }}
        />

        {/* state 라벨 */}
        <span
          className="flex-shrink-0"
          style={{
            fontSize: "13px",
            color: stateColor,
            fontWeight: isPeak ? 600 : 400,
          }}
        >
          {row.state}
        </span>
      </div>

      {/* month-desc (둘째 줄) */}
      <p
        className="mt-1"
        style={{
          fontSize: "12px",
          color: descColor,
          lineHeight: 1.7,
          marginTop: "3px",
          padding: "2px 0",
          wordBreak: "keep-all",
        }}
      >
        {row.desc}
      </p>
    </div>
  );
}
