import Image from "next/image";
import PageHead from "../components/PageHead";
import AiBlock from "../components/AiBlock";
import {
  Sec,
  SectionLabel,
  SectionTitle,
  CardYw,
  VarTag,
  YeonwooBubble,
} from "../components/Section";
import PersonFrame from "../components/PersonFrame";

interface DestinedPart1Data {
  ohang_lack: string;       // "토(土)"
  ilgan: string;            // "壬水"
  inyon_keyword: string;
  inyon_meeting: string;
  ai_profile: string;       // 인연 프로파일 400~500자
  ai_meeting: string;       // 만남 시나리오 300~400자
  ai_inner: string;         // 속마음 투시 300~350자
}

const MOCK_P6: DestinedPart1Data = {
  ohang_lack: "토(土)",
  ilgan: "壬水",
  inyon_keyword: "결을 받쳐주는 사람",
  inyon_meeting: "익숙한 길에서 어색한 걸음",
  ai_profile:
    "네 인연은 너랑 다른 결이야. 너는 깊은 물이고 그 사람은 단단한 흙이야. 흙이 있어야 물이 고이지 않고 흐를 수 있어.\n\n토(土) 기운이 네 사주에 비어 있어. 그래서 그 자리를 채워주는 사람이 너의 인연이야. 너를 받쳐주고 흐름을 만들어주는 결.\n\n壬水 일간한테는 안정된 토 기운이 운명이야. 너랑 비슷한 깊이가 아니라, 너를 흐르게 해주는 단단함이야.",
  ai_meeting:
    "익숙한 길에서 어색한 걸음으로 와. 처음엔 네가 그 사람을 못 알아봐. 너랑 너무 다르거든. 한 번 지나치고 두 번째에 멈춰.\n\n장소는 너에게 익숙한 곳이야. 그런데 그 사람은 거기에 어색해. 그 어색함 때문에 네가 한 번 더 보게 돼.",
  ai_inner:
    "그 사람도 네가 처음엔 이해가 안 가. 그런데 너의 침묵을 답답해하지 않아. 그게 다른 결이야.\n\n壬水 일간의 깊이를 그 사람은 시간 들여서 읽어. 한 번에 다 알려고 안 해. 너한테 처음 그런 사람일 거야.",
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
          title="운명의 짝 · 그 사람 (1/2)"
          sub="인연 프로파일 · 속마음 · 결말 예측"
          iconAsset="/yeonwoo/icon/icon_two_threads.svg"
        />
        {/* Ch-4 헤더 우상단 꽃잎 */}
        <span
          aria-hidden
          className="absolute top-0 right-0 w-12 h-12 bg-no-repeat bg-contain pointer-events-none opacity-80"
          style={{ backgroundImage: "url(/yeonwoo/decoration/decoration_petals.svg)" }}
        />
      </div>

      <Sec>
        <SectionLabel>4-1 인연 프로파일</SectionLabel>
        <SectionTitle>
          네 결을 받쳐줄 사람은 <VarTag>{p.ohang_lack}</VarTag>의 사람.
        </SectionTitle>

        <PersonFrame person="inyon" />

        <CardYw
          label="기운 매칭"
          value={
            <>
              <VarTag>{p.ilgan}</VarTag> ↔ <VarTag>{p.ohang_lack}</VarTag>
            </>
          }
          sub="너랑 같은 깊이가 아니라, 너를 흐르게 해주는 단단함."
        />
        <CardYw
          label="키워드"
          value={<VarTag>{p.inyon_keyword}</VarTag>}
          sub="너의 침묵을 답답해하지 않는 결."
        />
        <AiBlock text={p.ai_profile} />
      </Sec>

      <Sec>
        <SectionLabel>4-2 만남 시나리오</SectionLabel>
        <SectionTitle>
          <VarTag>{p.inyon_meeting}</VarTag>
        </SectionTitle>
        <AiBlock text={p.ai_meeting} />
      </Sec>

      <Sec>
        <SectionLabel>4-3 속마음 투시</SectionLabel>
        <SectionTitle>그 사람은 너를 이렇게 봐.</SectionTitle>

        <div className="flex items-start gap-3 my-3 relative">
          {/* 대각 thread_corner 액센트 */}
          <span
            aria-hidden
            className="absolute -top-2 -left-2 w-8 h-8 bg-no-repeat bg-contain pointer-events-none opacity-60"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)" }}
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-no-repeat bg-contain pointer-events-none opacity-60"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)", transform: "scale(-1,-1)" }}
          />
          <div className="relative w-[150px] h-[200px] flex-shrink-0">
            <Image
              src="/yeonwoo/sd_yw/yw_03.png"
              alt="강연우 — 속마음 투시"
              fill
              sizes="150px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <YeonwooBubble text="그 사람 마음 안엔 너 같은 깊이가 처음이야. 천천히 왜 너인지 알게 돼." />
          </div>
        </div>
        <AiBlock text={p.ai_inner} />
      </Sec>
    </section>
  );
}
