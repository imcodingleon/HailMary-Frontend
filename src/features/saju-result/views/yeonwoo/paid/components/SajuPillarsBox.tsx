// 사주 8글자 차트. 무료 결과 페이지(yeonwoo/sections/SajuChartSection.tsx)의
// PillarBox/PillarCard 디자인을 paid에 가져옴. "무료" 라벨/외부 wrapper 패딩만 정리.
//
// 데이터 어댑터: P-0 응답의 saju_pillars (한자 8글자) → 천간/지지 한자→오행/한글 매핑.

import type { WuxingKey } from "@/features/saju/types";
import type { SajuPillarsP0 } from "../../../../domain/paidReport";

// paid 전용 오행 색. 무료 WUXING_HUES는 파스텔 톤이라 다크 배경에서 식별 어려움 →
// 다크 배경(#151513)에서 뚜렷이 구분되는 채도 높은 톤으로 교체.
// 명리 전통: 목=청, 화=적, 토=황, 금=은/흰, 수=청흑.
const PAID_WUXING_HUES: Record<WuxingKey, string> = {
  목: "#5CC689", // 선명한 초록
  화: "#F26B5E", // 선명한 빨강
  토: "#F5C04C", // 선명한 황토/금
  금: "#D4D4D8", // 밝은 은
  수: "#5BA0E8", // 선명한 파랑
};

const HEAVEN_TO_WUXING: Record<string, WuxingKey> = {
  甲: "목", 乙: "목",
  丙: "화", 丁: "화",
  戊: "토", 己: "토",
  庚: "금", 辛: "금",
  壬: "수", 癸: "수",
};

const EARTH_TO_WUXING: Record<string, WuxingKey> = {
  子: "수", 丑: "토",
  寅: "목", 卯: "목",
  辰: "토", 巳: "화",
  午: "화", 未: "토",
  申: "금", 酉: "금",
  戌: "토", 亥: "수",
};

const HEAVEN_HANJA_TO_HANGUL: Record<string, string> = {
  甲: "갑", 乙: "을", 丙: "병", 丁: "정", 戊: "무",
  己: "기", 庚: "경", 辛: "신", 壬: "임", 癸: "계",
};

const EARTH_HANJA_TO_HANGUL: Record<string, string> = {
  子: "자", 丑: "축", 寅: "인", 卯: "묘",
  辰: "진", 巳: "사", 午: "오", 未: "미",
  申: "신", 酉: "유", 戌: "술", 亥: "해",
};

function PillarBox({
  hanja,
  hangul,
  hue,
  isHighlight,
}: {
  hanja: string;
  hangul: string;
  hue: string;
  isHighlight: boolean;
}) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center rounded-xl gap-4"
      style={{
        background: isHighlight ? `${hue}33` : `${hue}1a`,
        border: `${isHighlight ? "2px" : "1px"} solid ${hue}${isHighlight ? "ff" : "55"}`,
        boxShadow: isHighlight
          ? `0 0 24px ${hue}cc, 0 0 8px ${hue}99, inset 0 0 14px ${hue}55`
          : "none",
        aspectRatio: "9 / 11",
      }}
    >
      <span
        className="text-3xl leading-none"
        style={{
          color: hue,
          textShadow: `0 0 12px ${hue}80`,
          fontFamily: 'var(--font-nanum-myeongjo), "NotoSerifTC", serif',
          fontWeight: 700,
        }}
      >
        {hanja}
      </span>
      <span
        className="text-[14px] leading-none"
        style={{
          color: "#c9b89e",
          opacity: 0.7,
          fontFamily: 'var(--font-pretendard), "JejuMyeongjo", serif',
        }}
      >
        {hangul}
      </span>
    </div>
  );
}

interface SajuPillarsBoxProps {
  pillars: SajuPillarsP0;
}

export default function SajuPillarsBox({ pillars }: SajuPillarsBoxProps) {
  // gHighlight = 일주의 천간(IL_G)만 true. 일간이 사주의 핵심이라 그 셀만 빛남.
  // 지지(IL_J)는 일반 표기. 무료 결과 페이지에서는 일주 컬럼 전체(천간+지지) 둘 다 빛났는데,
  // paid에서는 일간 한 글자만 강조(사용자 정정).
  const cols: Array<{
    label: string;
    g: string;
    gHighlight: boolean;
    j: string;
  }> = [
    { label: "時 시주", g: pillars.si_g, gHighlight: false, j: pillars.si_j },
    { label: "日 일주", g: pillars.il_g, gHighlight: true, j: pillars.il_j },
    { label: "月 월주", g: pillars.wl_g, gHighlight: false, j: pillars.wl_j },
    { label: "年 연주", g: pillars.yr_g, gHighlight: false, j: pillars.yr_j },
  ];

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
      }}
    >
      <div className="px-5 py-5">
        <div className="grid grid-cols-4 gap-3">
          {cols.map((c) => {
            const heavenWuxing = HEAVEN_TO_WUXING[c.g];
            const earthWuxing = EARTH_TO_WUXING[c.j];
            const heavenHue =
              (heavenWuxing && PAID_WUXING_HUES[heavenWuxing]) || "#888";
            const earthHue =
              (earthWuxing && PAID_WUXING_HUES[earthWuxing]) || "#888";

            return (
              <div key={c.label} className="flex flex-col items-center gap-1.5">
                <p
                  className="text-[12px] tracking-widest"
                  style={{ color: "#a08a6c" }}
                >
                  {c.label}
                </p>
                <PillarBox
                  hanja={c.g}
                  hangul={HEAVEN_HANJA_TO_HANGUL[c.g] ?? ""}
                  hue={heavenHue}
                  isHighlight={c.gHighlight}
                />
                <PillarBox
                  hanja={c.j}
                  hangul={EARTH_HANJA_TO_HANGUL[c.j] ?? ""}
                  hue={earthHue}
                  isHighlight={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
