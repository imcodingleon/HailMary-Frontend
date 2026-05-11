import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import SpouseImage from "../components/SpouseImage";
import KeywordTags from "../components/KeywordTags";
import InfoGrid from "../components/InfoGrid";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  SectionBody,
  YeonwooBubble,
} from "../components/Section";

// HTML 명세 (line 1975~2076) 정밀 포팅 (사용자 결정 2026-05-11 반영).
//
// 2-3 피해야 할 인연의 특징
//   - stitle "악연의 얼굴 — 미리 보고 끊어." 고정
//   - 사진 + keyword-tags + 정보 그리드 + AI 박스 → slotId 20 변형
//   - 강연우 버블 고정
//
// 2-4 운명인 줄 알았는데 — 착각 인연 식별
//   - stitle → 일간 10 변동 (실 색 메타포 X)
//   - sbody 고정
//   - card-warn × 3 → 일간 10 변동 (라벨: "착각 신호 N · 첫/두/세 번째")
//   - card-good 결정적 차이 → 일간 10 변동 (실 색 메타포 X, 운명/착각 본주제 초점)
//   - AI 박스 → 일간 10 변동
//   - 강연우 버블 고정

interface BlockingPart2Data {
  // 2-3 (slotId 20 변형)
  akyon_slot_id: string; // e.g. "m-water-yang"
  akyon_keyword_tags: ReadonlyArray<string>; // 5
  akyon_info_rows: ReadonlyArray<{ key: string; val: string }>; // 6
  ai_akyon: string;

  // 2-4 (일간 10 변형)
  illusion_stitle: string;
  illusion_signals: ReadonlyArray<{ value: string; sub: string }>; // 3
  illusion_good_card: { value: string; sub: string };
  ai_illusion: string;
}

const SBODY_FIXED =
  "진짜 인연이랑 착각 인연은 처음엔 구별이 안 돼. 둘 다 강하게 끌리거든. 차이는 두 번째, 세 번째 마주칠 때 드러나. 실 색이 그대로면 진짜고, 색이 흐려지거나 결이 어긋나면 착각이야.";

const SIGNAL_LABELS = ["첫 번째", "두 번째", "세 번째"] as const;

const MOCK_P4: BlockingPart2Data = {
  // 백엔드 templates/yeonwoo_p4_blocking2.py compose_p4_blocking2(ilgan="임수", akyon_slot_id="m-water-yang") 결과 동기화 (예정).
  akyon_slot_id: "m-water-yang",
  akyon_keyword_tags: [
    "차가운 인상",
    "말이 빠른 사람",
    "감정 기복",
    "약속 잘 깸",
    "자기중심",
  ],
  akyon_info_rows: [
    { key: "키·체형", val: "평균보다 큰 편 · 마른 골격" },
    { key: "얼굴상", val: "광대 도드라짐 · 눈매 날카로움" },
    { key: "이목구비", val: "얇은 입술 · 끝이 올라간 눈꼬리" },
    { key: "스타일", val: "차림이 화려하거나 정반대로 무심함" },
    { key: "분위기", val: "처음엔 끌리는데 곁에 있으면 식는 결" },
    { key: "말의 속도", val: "평균보다 빠름 · 끊어 말하는 습관" },
  ],
  ai_akyon:
    "이 사람 보이면 멈춰. 첫인상부터 알아볼 수 있어.\n\n" +
    "키가 평균보다 큰 편에 마른 골격. 어깨가 좁아서 옷이 흘러내리듯 걸리는 사람. 광대가 도드라지고 턱선이 각져 있어. 눈매 끝이 살짝 올라가 있어서 웃을 때도 어딘가 서늘해. 입술은 얇고, 말할 때 끝이 빨리 닫혀.\n\n" +
    "분위기가 처음엔 매혹적이야. 차가운데 끌려. 근데 곁에 있어 보면 결이 안 맞아. 말 속도가 빨라서 네가 따라가다 지쳐. 약속을 가볍게 깨고도 미안해하지 않아.\n\n" +
    "임수(壬水) 일간한테는 가장 안 맞아. 네 깊이를 못 받아. 받아주는 척하다 떠나. 수(水) 과다인 너에겐 더 무거운 매듭이 돼.\n\n" +
    "위 신호 두 개 이상 보이면 더 깊어지기 전에 끊어. 깊어진 다음엔 너만 다쳐.",

  illusion_stitle: "처음엔 운명 같은데, 결이 다른 사람이 있어.",
  illusion_signals: [
    {
      value: "너무 빨리 가까워져",
      sub: "첫날부터 운명 같다고 느끼면 의심해. 진짜는 천천히 당겨져.",
    },
    {
      value: "결이 어긋나기 시작",
      sub: "대화의 온도가 첫날보다 식어. 너만 같은 결로 남아 있어.",
    },
    {
      value: "처음의 그 빛이 안 보여",
      sub: "분명 같은 사람인데 처음의 끌림이 사라져. 그게 답이야.",
    },
  ],
  illusion_good_card: {
    value: "세 번째 만남에서 보여",
    sub: "처음 강한 끌림은 누구나 만들 수 있어. 진짜 운명은 세 번째에 더 또렷해져. 흐려졌으면 그건 운명이 아니야.",
  },
  ai_illusion:
    "너 같은 임수(壬水) 일간이 가장 잘 속는 게 이거야. 처음에 강하게 끌리는 사람을 운명이라 단정해. 깊은 사람일수록 그래. 한 번 빠지면 다 끝났다고 믿어.\n\n" +
    "근데 매듭은 한 번에 안 묶여. 진짜는 천천히 당겨지는 거야. 첫날 운명 같다고 느껴지면 일주일만 멈춰봐. 가만히 두고 봐. 두 번째 마주칠 때 같은 끌림이 보이면 그건 진짜야. 세 번째에도 더 또렷해지면 그게 너의 사람이야.\n\n" +
    "흐려졌으면 미련 두지 마. 그건 네가 보고 싶었던 환영이야. 너 마음이 만들어낸 그림자일 뿐이야. 그림자랑은 살 수 없어.",
};

export default function BlockingPart2Page({ data }: { data?: BlockingPart2Data }) {
  const p = data ?? MOCK_P4;
  return (
    <section
      data-page-idx="4"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="二"
        chCode="CH-2"
        title="연애를 막는 것 (2/2)"
        sub="방해 구조 · 반복 패턴 · 악연 컷팅"
        iconAsset="/yeonwoo/icon/icon_broken_thread.svg"
      />

      {/* ── 2-3 피해야 할 인연의 특징 ── */}
      <Sec>
        <SectionLabel qaSectionId="2-3">2-3 피해야 할 인연의 특징</SectionLabel>
        <SectionTitle>악연의 얼굴 — 미리 보고 끊어.</SectionTitle>

        <SpouseImage
          character="yeonwoo"
          type="avoid"
          slotId={p.akyon_slot_id}
          alt="강연우 — 악연 얼굴"
        />

        <KeywordTags tags={p.akyon_keyword_tags} />
        <InfoGrid rows={p.akyon_info_rows} />

        <AiBlock text={p.ai_akyon} />

        <YeonwooBubble text="이런 기운 가진 사람 보이면 바로 끊어." />
      </Sec>

      {/* ── 2-4 운명인 줄 알았는데 — 착각 인연 식별 ── */}
      <Sec>
        <SectionLabel qaSectionId="2-4">
          2-4 운명인 줄 알았는데 — 착각 인연 식별
        </SectionLabel>
        <SectionTitle>{p.illusion_stitle}</SectionTitle>

        <SectionBody>{SBODY_FIXED}</SectionBody>

        <CardsGrid>
          {p.illusion_signals.map((s, i) => (
            <CardWarn
              key={i}
              label={`착각 신호 ${i + 1} · ${SIGNAL_LABELS[i]}`}
              value={s.value}
              sub={s.sub}
            />
          ))}
        </CardsGrid>

        <CardGood
          label="진짜 인연 vs 착각 인연 — 결정적 차이"
          value={p.illusion_good_card.value}
          sub={p.illusion_good_card.sub}
          marginTop={8}
        />

        <AiBlock text={p.ai_illusion} />

        {/* SD yw_cg_e (140×140 sz-lg) + 강연우 버블 row 묶음 (data-flow="right") */}
        <div className="flex items-start gap-3 my-3 flex-row-reverse">
          <div className="relative w-[140px] h-[140px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_cg_e.png"
              alt="강연우 — 경고"
              fill
              sizes="140px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="처음에 강하게 끌리는 게 다 운명은 아니야. 세 번째를 봐." />
          </div>
        </div>
      </Sec>
    </section>
  );
}

// ── 로컬 컴포넌트 (P-2/P-3과 동일 패턴) ──

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
