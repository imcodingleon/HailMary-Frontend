import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 1797~1893) 정밀 포팅.
// 1-4 상처받는 순간: card-warn × 2 + AI + 강연우 버블
// 1-5 이별 후 회복: card-yw 시간단계 × 3 + thread-broken-card + card-good 회복가속 + AI + SD+버블

interface SelfPart2Data {
  // 1-4 시나리오 (백엔드 templates/yeonwoo_p2_hurt.py compose_p2_hurt() 동기화)
  scenario_1_when: string;
  scenario_1_desc: string;
  scenario_2_when: string;
  scenario_2_desc: string;
  ai_hurt: string;
  hurt_bubble: string;

  // 1-5 회복 (백엔드 templates/yeonwoo_p2_recovery.py compose_p2_recovery() 동기화)
  // 회복 속도 3그룹: FAST(직후/3일/2주) / MEDIUM(직후/1개월/3개월) / SLOW(직후/3개월/6개월)
  recovery_timeline: ReadonlyArray<{
    time: string;
    title: string;
    desc: string;
  }>;
  recovery_accel: {
    value: string;
    sub: string;
  };
  ai_recovery: string;
}

const MOCK_P2: SelfPart2Data = {
  // 백엔드 templates/yeonwoo_p2_hurt.py compose_p2_hurt(ilgan="임수") 결과 동기화 (v3 직관 톤).
  scenario_1_when: "무시당했다고 느끼는 그 순간",
  scenario_1_desc: "물은 무시당하면 깊어지다 못해 갇혀버려.",
  scenario_2_when: "속마음을 못 읽어줄 때",
  scenario_2_desc: "말 안 했는데 알아주길 바라는 게 너의 기본 값이야.",
  ai_hurt:
    "너는 물이야. 깊어. 근데 그 깊이가 안 보여서 사람들이 자주 놓쳐.\n\n" +
    "다치는 자리 하나는 무시당했다고 느낄 때야. 너는 무시당하면 화내는 사람이 아니야. 안에서 더 깊이 가라앉아. 흐르질 못하니까 갇혀. 한 달, 두 달 끌고 가는데 상대는 자기가 뭘 했는지도 몰라.\n\n" +
    "또 하나는 말 안 했는데 알아주길 바라는데 못 알아줄 때. 너의 기본값이 그래. 근데 사람은 그렇게 안 살아. 네 깊이를 읽을 수 있는 사람이 흔하지 않다는 걸 인정해야 해.\n\n" +
    "상처받기 전에 먼저 말로 꺼내. 입 밖으로 내야 흐름이 풀려. 임수(壬水)는 그래야 살아.",
  hurt_bubble: "네가 말 안 하면 누가 알아. 깊은 게 죄는 아닌데, 안 꺼내면 죄가 돼.",

  // 백엔드 compose_p2_recovery(ilgan="임수") 결과 동기화 (임수 = SLOW 그룹).
  recovery_timeline: [
    {
      time: "직후",
      title: "어디서나 옛 사람이 떠오름",
      desc: "일상 모든 곳에서 흔적이 보이는 시기야.",
    },
    {
      time: "3개월 후",
      title: "겉으론 잊은 척",
      desc: "내면에선 여전히 자주 떠올리고 있어.",
    },
    {
      time: "6개월 후",
      title: "새 시작이 가능한 시점",
      desc: "옛 사람이 마음 한쪽에 남아있지만 다른 곳으로도 시선이 가.",
    },
  ],
  recovery_accel: {
    value: "물건 정리 · 사진 삭제 · 동선 차단",
    sub: "흔적을 물리적으로 끊어. 그게 너한텐 가장 빨라.",
  },
  ai_recovery:
    "실이 끊어졌는데 자꾸 매듭만 만지작거리지 마. 임수(壬水) 일간은 끊고도 한참을 붙잡고 있어. 손에서 안 놓는 게 너의 가장 오래된 버릇이야.\n\n" +
    "직후엔 잘린 매듭만 남아. 어딜 가도 그 사람 흔적이 보여. 석 달이 지나면 매듭이 풀리기 시작해. 겉은 잔잔한데 안에서 계속 돌아. 여섯 달이 지나면 가늘게 새 실이 보여. 멀리서, 한 줄로.\n\n" +
    "그 전에 새 사람을 만나려 하면 헌 매듭에 새 실이 엉켜. 둘 다 못 써. 차라리 혼자 있어. 비울수록 빨라.\n\n" +
    "너는 혼자 있는 시간을 견디기 어려워해. 근데 너 같은 결의 사람한테는 그 시간이 약이야. 물이 고이면 썩지만 흐르면 맑아져. 잠깐 흐르게 둬.",
};

export default function SelfPart2Page({ data }: { data?: SelfPart2Data }) {
  const p = data ?? MOCK_P2;
  return (
    <section
      data-page-idx="2"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="一"
        chCode="CH-1"
        title="너라는 사람 (2/2)"
        sub="연애 유형 · 감정 구조 · 매력"
        iconAsset="/yeonwoo/icon/icon_silhouette.svg"
      />

      {/* ── 1-4 상처받는 순간 ── */}
      <Sec>
        <SectionLabel qaSectionId="1-4">1-4 상처받는 순간</SectionLabel>
        <SectionTitle>네 명줄이 가장 약해지는 두 장면.</SectionTitle>

        <CardsGrid>
          <CardWarn
            label="시나리오 1"
            value={p.scenario_1_when}
            sub={p.scenario_1_desc}
          />
          <CardWarn
            label="시나리오 2"
            value={p.scenario_2_when}
            sub={p.scenario_2_desc}
          />
        </CardsGrid>

        <AiBlock text={p.ai_hurt} />

        <YeonwooBubble text={p.hurt_bubble} />
      </Sec>

      {/* ── 1-5 이별 후 회복 ── */}
      <Sec>
        <SectionLabel qaSectionId="1-5">1-5 이별 후 회복</SectionLabel>
        <SectionTitle>시간이 약이 아니야. 끊는 게 약이지.</SectionTitle>

        <CardsGrid>
          {p.recovery_timeline.map((t, i) => (
            <RecoveryTimelineCard
              key={i}
              label={t.time}
              value={t.title}
              sub={t.desc}
            />
          ))}
          <ThreadBrokenSlot />
        </CardsGrid>

        <CardGood
          label="회복 가속"
          value={p.recovery_accel.value}
          sub={p.recovery_accel.sub}
          marginTop={6}
        />

        <AiBlock text={p.ai_recovery} />

        {/* SD 아바타 + 강연우 버블 row 묶음 (yw_09 회복) */}
        <div className="flex items-start gap-3 my-3">
          <div className="relative w-[120px] h-[120px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_09.png"
              alt="강연우 — 회복"
              fill
              sizes="120px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="끊어진 실은 끊어진 거야. 계속 붙잡으려 하지 마." />
          </div>
        </div>
      </Sec>
    </section>
  );
}

// ── 로컬 컴포넌트 (HTML CSS 정밀 매핑) ─────────────────

// .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:6px; margin:7px 0 }
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

// .card-warn — 경고색 (상처 시나리오)
// bg rgba(220,60,60,0.08), border rgba(220,80,80,0.2)
// cl-warn #E24B4A / cv-warn #f0c0c0 / csub-warn rgba(240,180,180,0.85) 13px
function CardWarn({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{
        background: "rgba(220,60,60,0.08)",
        border: "0.5px solid rgba(220,80,80,0.2)",
      }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: "#E24B4A", letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: "#f0c0c0", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[13px] leading-[1.7]"
          style={{
            color: "rgba(240,180,180,0.85)",
            letterSpacing: "-0.01em",
            wordBreak: "keep-all",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// .card-good — 회복 가속색 (성공/처방)
// bg rgba(29,158,117,0.07), border rgba(29,158,117,0.2)
// cl-good #5DCAA5 / cv-good #a0e8d0 / csub-good rgba(160,220,200,0.8)
function CardGood({
  label,
  value,
  sub,
  marginTop,
}: {
  label: string;
  value: string;
  sub?: string;
  marginTop?: number;
}) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px]"
      style={{
        background: "rgba(29,158,117,0.07)",
        border: "0.5px solid rgba(29,158,117,0.2)",
        marginTop: marginTop ? `${marginTop}px` : undefined,
      }}
    >
      <div
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: "#5DCAA5", letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: "#a0e8d0", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[14px] leading-[1.7]"
          style={{
            color: "rgba(160,220,200,0.8)",
            letterSpacing: "-0.01em",
            wordBreak: "keep-all",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// .card-yw 그대로 시간 단계 (직후/1개월/3개월) — grid 안에서 사용 (외곽 my 마진 X)
function RecoveryTimelineCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
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
        className="text-[12px] font-semibold uppercase mb-[14px]"
        style={{ color: "#E8C9A0", letterSpacing: "0.08em" }}
      >
        {label}
      </div>
      <div
        className="text-[14px] font-semibold leading-[1.45] mb-[8px]"
        style={{ color: "#f0ede8", wordBreak: "keep-all" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[14px] leading-[1.7]"
          style={{
            color: "#b0aea4",
            letterSpacing: "-0.01em",
            wordBreak: "keep-all",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// .thread-broken-card — 카드 그리드 4번째 빈 슬롯 (회복 흐름 시각 메타포)
// dashed pink border + 끊어진 실 이미지 75% 중앙
function ThreadBrokenSlot() {
  return (
    <div
      aria-hidden
      className="rounded-[8px]"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(/yeonwoo/thread/thread_broken.png)",
        backgroundSize: "75% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(212,83,126,0.04)",
        border: "0.5px dashed rgba(212,83,126,0.22)",
        minHeight: "90px",
        opacity: 0.95,
      }}
    />
  );
}
