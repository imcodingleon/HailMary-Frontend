"use client";

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 6.5V4.5C3.5 2.567 5.067 1 7 1C8.933 1 10.5 2.567 10.5 4.5V6.5M3 6.5H11C11.5523 6.5 12 6.94772 12 7.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3C2.44772 13.5 2 13.0523 2 12.5V7.5C2 6.94772 2.44772 6.5 3 6.5Z"
        stroke="#7a716b"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function ChapterRow({
  label,
  title,
  desc,
  badge,
  isLast,
}: {
  label: string;
  title: string;
  desc?: string;
  badge?: string;
  isLast?: boolean;
}) {
  return (
    <>
      <div className="flex items-start py-5">
        <div
          className="w-[56px] flex-shrink-0 text-[13px] font-medium pt-0.5"
          style={{ color: "#c9a96e", letterSpacing: "0.05em" }}
        >
          {label}
        </div>
        <div className="flex-1 flex flex-col gap-1.5 pr-4">
          <p className="text-[15px] font-bold leading-tight" style={{ color: "#E8DDC8" }}>
            {title}
          </p>
          {desc && (
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "#c9a96e", letterSpacing: "0.02em" }}
            >
              {desc}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 pt-0.5">
          {badge ? (
            <span
              className="inline-block text-[13px] tracking-wider px-3 py-1 rounded-full"
              style={{ border: "1px solid #c9a96e", color: "#c9a96e" }}
            >
              {badge}
            </span>
          ) : (
            <LockIcon />
          )}
        </div>
      </div>
      {!isLast && <div className="w-full h-[1px]" style={{ background: "#2a2520" }} />}
    </>
  );
}

export function FullResultIndexSection() {
  return (
    <div className="w-full px-5 py-12" style={{ background: "#000" }}>
      <h2
        className="text-[20px] font-bold tracking-[0.05em] mb-4"
        style={{ color: "#c9a96e" }}
      >
        전체 결과 구성
      </h2>
      <div className="w-full h-[1px] mb-1" style={{ background: "#4a4035" }} />

      <ChapterRow label="01" title="너라는 사람" desc="연애 유형 · 감정 구조 · 매력" badge="공개" />
      <ChapterRow label="—" title="두 선생님의 시각 차이" />
      <ChapterRow label="02" title="지금 연애를 막는 것" desc="방해 구조 · 반복 패턴 · 악연 컷팅" />
      <ChapterRow label="03" title="나의 도화기 (桃花氣)" desc="도화기 지수 · 이성이 끌리는 방식" />
      <ChapterRow label="04" title="운명의 짝 · 그 사람" desc="인연 프로파일 · 투시 · 결말 예측" />
      <ChapterRow label="05" title="인연이 오는 시간" desc="12개월 연애운 · 만남 시나리오" />
      <ChapterRow label="06" title="연애운 상승 실천 가이드" desc="오행 보완 · 매력살 활용" />
      <ChapterRow label="—" title="에필로그" isLast />
    </div>
  );
}
