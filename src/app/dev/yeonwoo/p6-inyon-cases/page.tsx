// dev 전용 P-6 4-1 붉은 실이 이어진 사람 — 일간 10 케이스 비교.
//
// 일간별 키워드 태그 5 / 정보 그리드 8 row / 외형 + 매칭 + 첫 만남 AI 박스 비교.
// backend yeonwoo_p6_destined.compose_p6_destined() 결과를 _cases-p6.json에 추출.
// 대표 슬롯/부족 오행은 일간 명리학 패턴 기반 가정 (실제 사용자 사주는 다를 수 있음).

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import PersonFrame from "@/features/saju-result/views/yeonwoo/paid/components/PersonFrame";
import KeywordTags from "@/features/saju-result/views/yeonwoo/paid/components/KeywordTags";
import InfoGrid from "@/features/saju-result/views/yeonwoo/paid/components/InfoGrid";
import { YeonwooBubble } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

import cases from "../_cases-p6.json";

interface CaseEntry {
  ilgan: string;
  user_gender: string;        // "여자" / "남자" — 사용자 성별 (매칭은 반대 성별)
  match_slot_id_used: string;
  ohang_lack_used: string;
  result: {
    match_slot_id: string;
    keyword_tags: string[];
    info_rows: { key: string; val: string }[];
    ai_looks: string;
    ai_match: string;
    ai_first_meeting: string;
    bubble: string;
    inner_cards: unknown;
    ai_inner: unknown;
  };
}

const CASES = cases as unknown as ReadonlyArray<CaseEntry>;

export default function P6InyonCasesPage() {
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
            P-6 4-1 붉은 실이 이어진 사람 — 일간 10 × 성별 2
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            사용자 성별별 매칭 슬롯 비교 (여자→m / 남자→f).
            <br />
            키워드·정보 그리드·외형 = 매칭 상대 결 (slot 기반) / 매칭·첫만남 AI = 사용자 본인 결.
            <br />
            <span className="text-[#c89060]">※ slot은 yongSin 없을 때의 인성(印星) fallback 가정.</span>
            <span className="text-[#888]"> 실제 사주에 yongSin이 있으면 그게 우선 적용되어 다른 slot이 나올 수 있음.</span>
          </p>
        </header>

        <div className="space-y-12">
          {CASES.map((c) => (
            <section key={`${c.ilgan}-${c.user_gender}`}>
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center justify-center px-2 h-7 rounded-full text-[11px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {c.ilgan} · {c.user_gender}
                </span>
                <span className="text-[12px] text-[#888]">
                  매칭={c.match_slot_id_used} · 부족 {c.ohang_lack_used}
                </span>
              </div>

              <PersonFrame person="inyon" slotId={c.result.match_slot_id} />
              <KeywordTags tags={c.result.keyword_tags} />
              <InfoGrid rows={c.result.info_rows} />
              <AiBlock text={c.result.ai_looks} />
              <AiBlock text={c.result.ai_match} />
              <AiBlock text={c.result.ai_first_meeting} />
              <YeonwooBubble text={c.result.bubble} />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          일간 10 케이스 톤 검증 — 어색한 외형/태그/AI 박스 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
