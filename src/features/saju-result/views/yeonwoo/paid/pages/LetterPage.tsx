import Image from "next/image";
import PageHead from "../components/PageHead";
import { Sec, VarTag } from "../components/Section";

// HTML 명세 (line 2681~2753) 정밀 포팅.
// 7-1 편지: SD yw_cg_a (sz-xxxl 240×316 골드 글로우) + letter-yw 박스
//   letter-yw 구성:
//     - letter-from-yw "강 연 우 의 편 지"
//     - letter-to-yw "— {ILJU} 일주, 너에게"
//     - letter-quote-yw "{USER_CONCERN}" + "— 네가 적은 너의 고민"
//     - letter-body-yw 5단 (580~700자, ai_letter)
//       · 진입: 밤잠 정서 받아주기
//       · 일간 관점 고민의 뿌리
//       · OHANG 무속적 위로
//       · 행동 권유 ("비워")
//       · 마지막 강조구 (letter-emphasis-yw) + "오늘 밤은 좀 자"
//     - letter-sign-yw "— 연우 올림"

interface LetterData {
  ilju: string;                // "임술(壬戌)" 한자 포함
  user_concern: string;        // 사용자 자유서술 (최대 100자)
  ai_letter_body: string;      // 5단 본문 (580~700자, 일간/일주/OHANG placeholder 자동 치환된 결과)
  ai_letter_emphasis: string;  // 마지막 강조구 ("너 정도면 충분해..." 등)
}

const MOCK_P10: LetterData = {
  ilju: "임술(壬戌)",
  user_concern: "요즘 사람을 만나도 깊어지지 않아.",
  ai_letter_body:
    "네가 쓴 고민, 잘 봤어. 밤마다 너를 깨우는 게 그거구나. 머릿속에서 안 떠나지. 잠들기 전에 떠올라서, 눈 감으면 더 또렷해지고. 그게 네 명줄에 묶여 있어서 그래. 풀리지 않은 매듭은 밤에 더 보이거든.\n\n" +
    "임수(壬水) 일간이 그래. 속에서 다 끓는데 밖으론 한 방울도 안 새. 그러니까 사람들은 네 진짜 마음을 모르고, 너는 또 혼자 다 짊어져. 너의 고민이 무거운 게 아니야. 네가 그걸 너 혼자만 들고 있어서 무거운 거야. 임술(壬戌) 일주는 거기에 한 겹 더 얹은 결이라 더 그래.\n\n" +
    "수(水)가 너무 많고 토(土)가 비어 있어. 그래서 흐름이 안 돌아. 매듭은 풀라고 묶여 있는 거지, 평생 끌어안고 살라고 있는 게 아니야. 너 지금 그 매듭 하나 붙잡고 너무 오래 있었어. 손에서 안 놓고 살아왔지. 풀어도 돼. 풀라고 있는 거니까.\n\n" +
    "딱 하나만 해. 비워. 사람이든 미련이든 답 안 오는 연락이든 — 하나라도 비워. 자리가 비어야 새 실이 들어와. 너처럼 깊은 사람한테는 비워두는 시간이 곧 채우는 시간이야. 가만히 있는 게 아니야, 받을 준비를 하는 거야.",
  ai_letter_emphasis: "너 정도면 충분해. 아직 안 보일 뿐이야.",
};

export default function LetterPage({ data }: { data?: LetterData }) {
  const p = data ?? MOCK_P10;
  return (
    <section
      data-page-idx="10"
      className="text-[#d8d6d0]"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <PageHead
        chHanja="七"
        chCode="CH-7"
        title="편지"
        sub="너의 한 줄에 답하다"
        iconAsset="/yeonwoo/motif/motif_seal_jeom.svg"
        iconOpacity={0.35}
      />

      <Sec>
        {/* SD yw_cg_a (sz-xxxl 240×316) 골드 글로우 + thread_corner 외곽 wrapper */}
        <div className="relative my-2" style={{ marginBottom: "-10px" }}>
          <span
            aria-hidden
            className="absolute -top-3 -left-3 w-[60px] h-[60px] bg-no-repeat bg-contain pointer-events-none opacity-65 z-10"
            style={{ backgroundImage: "url(/yeonwoo/thread/thread_corner.png)" }}
          />
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 w-[60px] h-[60px] bg-no-repeat bg-contain pointer-events-none opacity-65 z-10"
            style={{
              backgroundImage: "url(/yeonwoo/thread/thread_corner.png)",
              transform: "scale(-1,-1)",
            }}
          />
          <div className="flex justify-center">
            <div className="relative w-[240px] h-[316px]">
              <Image
                src="/yeonwoo/sd_yw/yw_cg_a.png"
                alt="강연우 — 편지 쓰는"
                fill
                sizes="240px"
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 18px rgba(232,201,160,0.35))",
                }}
              />
            </div>
          </div>
        </div>

        {/* letter-yw 편지 박스 */}
        <LetterBox
          ilju={p.ilju}
          userConcern={p.user_concern}
          body={p.ai_letter_body}
          emphasis={p.ai_letter_emphasis}
        />
      </Sec>
    </section>
  );
}

// ── letter-yw 편지 박스 ──
function LetterBox({
  ilju,
  userConcern,
  body,
  emphasis,
}: {
  ilju: string;
  userConcern: string;
  body: string;
  emphasis: string;
}) {
  return (
    <div
      className="rounded-[12px] px-5 py-6 my-4"
      style={{
        background: "linear-gradient(180deg, #1a1715 0%, #14110f 100%)",
        border: "0.5px solid rgba(200,168,112,0.30)",
        boxShadow: "0 0 24px rgba(0,0,0,0.4) inset",
      }}
    >
      {/* letter-from-yw "강 연 우 의 편 지" */}
      <div
        className="text-center mb-1"
        style={{
          fontFamily: "var(--font-nanum-myeongjo)",
          fontSize: "13px",
          color: "#888",
          letterSpacing: "0.5em",
        }}
      >
        강 연 우 의 편 지
      </div>

      {/* letter-to-yw "— {ILJU} 일주, 너에게" */}
      <div
        className="text-center mb-5 pb-4"
        style={{
          fontSize: "13px",
          color: "#b0aea4",
          borderBottom: "0.5px solid rgba(200,168,112,0.20)",
        }}
      >
        — <VarTag>{ilju}</VarTag> 일주, 너에게
      </div>

      {/* letter-quote-yw 사용자 고민 인용 */}
      <div
        className="rounded-[8px] px-3 py-3 mb-5 text-center"
        style={{
          background: "rgba(232,201,160,0.05)",
          border: "0.5px dashed rgba(232,201,160,0.30)",
        }}
      >
        <div
          className="text-[14px] leading-[1.75] italic mb-1"
          style={{
            color: "#d8d4cc",
            fontFamily: "var(--font-nanum-myeongjo)",
            wordBreak: "keep-all",
          }}
        >
          &ldquo;<VarTag>{userConcern}</VarTag>&rdquo;
        </div>
        <div
          className="text-[11px]"
          style={{ color: "#888", letterSpacing: "0.04em" }}
        >
          — 네가 적은 너의 고민
        </div>
      </div>

      {/* letter-body-yw 본문 5단 */}
      <div
        className="text-[14px] leading-[1.95] mb-4"
        style={{
          color: "#d8d6d0",
          wordBreak: "keep-all",
          letterSpacing: "-0.005em",
        }}
      >
        {body.split("\n\n").map((para, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {para}
          </p>
        ))}
        {/* 마지막 강조구 + "오늘 밤은 좀 자" */}
        <p className="mt-4">
          <span
            style={{
              color: "#E8C9A0",
              fontWeight: 600,
              fontSize: "15px",
            }}
          >
            {emphasis}
          </span>
          <br />
          <span style={{ color: "#b0aea4" }}>
            … 가봐. 이제 네 차례야. 오늘 밤은 좀 자.
          </span>
        </p>
      </div>

      {/* letter-sign-yw "— 연우 올림" */}
      <div
        className="text-right mt-6"
        style={{
          fontFamily: "var(--font-nanum-myeongjo)",
          fontSize: "14px",
          color: "#E8C9A0",
          letterSpacing: "0.05em",
        }}
      >
        — 연우 올림
      </div>
    </div>
  );
}
