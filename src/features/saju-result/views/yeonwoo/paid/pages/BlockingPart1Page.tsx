import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  SectionBody,
  VarTag,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 1895~1973) 정밀 포팅.
// 2-1 명줄에 걸린 것: card-warn 과다 구조 + AI + 강연우 버블
// 2-2 반복되는 실수 패턴: sbody 3단계 + AI + 강연우 버블
// 2-2-1 근데 이거 역이용 가능해: SD yw_cg_b 240x240 + card-good × 2 + 강연우 버블

interface BlockingPart1Data {
  // 2-1 명줄에 걸린 것
  ohang_excess: string;   // 한자 포함 표기 "수(水)"
  blockade_card_sub: string;
  ai_blockade: string;    // 300~350자 (Ch2 오프닝)

  // 2-2 반복되는 실수 패턴
  pattern_body: string;   // SectionBody 3단계 패턴 묘사
  ai_pattern: string;     // 250~300자

  // 2-2-1 역이용
  reverse_card_1: { value: string; sub: string };
  reverse_card_2: { value: string; sub: string };
}

const MOCK_P3: BlockingPart1Data = {
  // 백엔드 templates/yeonwoo_p3_blocking.py compose_p3_blocking(ilgan="임수", ohang_excess="수") 결과 동기화 (예정).
  ohang_excess: "수(水)",
  blockade_card_sub: "이 기운이 너무 깊어서 다른 인연이 안 들어와. 흐름이 막혔어.",
  ai_blockade:
    "네 명줄에 매듭이 보여. 한 곳에 너무 오래 묶여 있어서 색이 진해졌어. 풀려고 한 흔적도 안 보여. 그냥 끌어안고 살아왔지.\n\n" +
    "수(水) 기운이 너무 무거워. 이게 새 인연이 들어올 자리를 막고 있어. 임수(壬水) 일간이 원래도 깊은데 거기에 같은 기운이 더 쌓였어. 물 위에 또 물을 부은 격이야. 흐름이 안 돌아.\n\n" +
    "비워. 사람이든 일이든 미련이든. 자리가 비어야 새 실이 들어와. 지금처럼 꽉 차 있으면 누가 와도 못 머물러. 너 혼자 다 쥐고 있는 거야. 인연이 안 오는 게 아니라 들어올 틈이 없는 거야.",

  pattern_body:
    "처음엔 빨리 빠지고, 중반엔 말 안 해서 멀어지고, 끝엔 한꺼번에 무너져.",
  ai_pattern:
    "매듭 모양이 매번 똑같이 묶여. 사람은 바뀌었는데 패턴은 그대로야. 너는 매번 같은 자리에서 넘어져.\n\n" +
    "처음엔 너무 빨리 마음을 줘. 상대가 손만 내밀어도 다 줘버려. 중반엔 말없이 기다려. 받은 만큼 돌아오기를 기다리는데, 그 신호가 너무 조용해서 상대는 못 읽어. 끝엔 한꺼번에 폭발해. 너는 무너지고 상대는 도망가.\n\n" +
    "임수(壬水) 일간이 빠지기 쉬운 함정이야. 다음번엔 처음 한 달은 천천히 가. 그게 너의 가장 약한 구간이야.",

  reverse_card_1: {
    value: "깊이를 천천히 보여줘",
    sub: "한 번에 다 주지 말고 조금씩 풀어. 깊은 사람은 한 번에 보여주면 부담이 되고, 천천히 보여주면 빠져들어.",
  },
  reverse_card_2: {
    value: "침묵의 타이밍 활용",
    sub: "네 침묵은 약점이 아니야. 잘 쓰면 가장 큰 무기야. 다들 말이 많을 때 너 하나만 조용하면, 그게 사람을 끌어당겨.",
  },
};

export default function BlockingPart1Page({ data }: { data?: BlockingPart1Data }) {
  const p = data ?? MOCK_P3;
  return (
    <section
      data-page-idx="3"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="二"
        chCode="CH-2"
        title="연애를 막는 것 (1/2)"
        sub="방해 구조 · 반복 패턴 · 악연 컷팅"
        iconAsset="/yeonwoo/icon/icon_broken_thread.svg"
      />

      {/* ── 2-1 명줄에 걸린 것 ── */}
      <Sec>
        <SectionLabel qaSectionId="2-1">2-1 명줄에 걸린 것</SectionLabel>
        <SectionTitle>과다 오행 — 네 길을 막는 매듭.</SectionTitle>

        <CardWarn
          label="과다 구조"
          value={<><VarTag>{p.ohang_excess}</VarTag> 과다</>}
          sub={p.blockade_card_sub}
        />

        <AiBlock text={p.ai_blockade} />

        <YeonwooBubble text="내 눈엔 보여. 네 명줄에 뭔가 걸려 있어." />
      </Sec>

      {/* ── 2-2 반복되는 실수 패턴 ── */}
      <Sec>
        <SectionLabel qaSectionId="2-2">2-2 반복되는 실수 패턴</SectionLabel>
        <SectionTitle>사람은 바뀌어도 매듭 모양은 똑같아.</SectionTitle>

        <SectionBody>{p.pattern_body}</SectionBody>

        <AiBlock text={p.ai_pattern} />

        <YeonwooBubble text="사람은 바뀌었는데 매듭 모양이 똑같아." />
      </Sec>

      {/* ── 2-2-1 근데 이거 역이용 가능해 ── */}
      <Sec>
        <SectionLabel qaSectionId="2-2-1">2-2-1 근데 이거 역이용 가능해</SectionLabel>
        <SectionTitle>독을 약으로 바꾸는 법.</SectionTitle>

        {/* SD 슬롯 yw_cg_b (240×240 손바닥 펼침 — 반전·안내) */}
        <div className="flex justify-center my-3">
          <div className="relative w-full max-w-[240px] aspect-square">
            <Image
              src="/yeonwoo/sd_yw/yw_cg_b.png"
              alt="강연우 — 반전 안내"
              fill
              sizes="(max-width: 480px) 70vw, 240px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <CardsGrid>
          <CardGood
            label="역이용 포인트"
            value={p.reverse_card_1.value}
            sub={p.reverse_card_1.sub}
          />
          <CardGood
            label="실전 방법"
            value={p.reverse_card_2.value}
            sub={p.reverse_card_2.sub}
          />
        </CardsGrid>

        <YeonwooBubble text="이게 독인지 약인지는 네가 어떻게 쓰냐에 달려있어." />
      </Sec>
    </section>
  );
}

// ── 로컬 컴포넌트 (SelfPart2Page와 동일 패턴, 추후 Section.tsx로 승격 검토) ──

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

// .card-warn — 경고색 (과다 구조 / 시나리오)
function CardWarn({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div
      className="rounded-[8px] px-[11px] py-[10px] my-[7px]"
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

// .card-good — 회복/처방색 (역이용 / 실전 방법)
function CardGood({
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
        background: "rgba(29,158,117,0.07)",
        border: "0.5px solid rgba(29,158,117,0.2)",
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
