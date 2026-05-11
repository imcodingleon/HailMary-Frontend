"use client";

const SECTION_BG = "#FDF5EA";
const TITLE_COLOR = "#2a1f15";
const SUBTITLE_COLOR = "#a5803c";
const CH_LABEL_COLOR = "#a5803c";
const DIVIDER_COLOR = "#E0CFB6";
const LOCK_COLOR = "#E94E3F";
const PUBLIC_PILL_BG = "#F4E5CD";
const PUBLIC_PILL_BORDER = "#a5803c";
const PUBLIC_PILL_TEXT = "#a5803c";
const HEADER_DECO_COLOR = "#A5773C";
const LOCKED_TITLE_COLOR = "#977e68";

type Chapter = {
  ch: string;
  title: string;
  subtitle: string;
  isPublic: boolean;
};

const CHAPTERS: Chapter[] = [
  {
    ch: "01",
    title: "{name}님이라는 사람",
    subtitle: "연애 성향 · 감정 구조 · 매력",
    isPublic: true,
  },
  {
    ch: "02",
    title: "연애를 방해하는 변수들",
    subtitle: "구조적 원인 · 반복 패턴",
    isPublic: false,
  },
  {
    ch: "03",
    title: "나의 매력 지수 분석",
    subtitle: "매력 지수 · 호감 패턴",
    isPublic: false,
  },
  {
    ch: "04",
    title: "최적 인연 · 데이터 프로파일",
    subtitle: "궁합 지수 · 심리 분석",
    isPublic: false,
  },
  {
    ch: "05",
    title: "인연 접촉 확률 분석",
    subtitle: "월별 접촉 확률 · 피크 구간",
    isPublic: false,
  },
  {
    ch: "06",
    title: "연애 변수 최적화 가이드",
    subtitle: "변수 보완 · 리스크 제거",
    isPublic: false,
  },
];

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5V4.5C3.5 2.567 5.067 1 7 1C8.933 1 10.5 2.567 10.5 4.5V6.5M3 6.5H11C11.5523 6.5 12 6.94772 12 7.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3C2.44772 13.5 2 13.0523 2 12.5V7.5C2 6.94772 2.44772 6.5 3 6.5Z"
        stroke={LOCK_COLOR}
        strokeWidth="1.2"
      />
    </svg>
  );
}

function PublicPill() {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "13px",
        background: PUBLIC_PILL_BG,
        color: PUBLIC_PILL_TEXT,
        border: `1px solid ${PUBLIC_PILL_BORDER}`,
        borderRadius: "9999px",
        padding: "3px 12px",
        fontFamily: "Pretendard, sans-serif",
        fontWeight: 500,
        letterSpacing: "0.05em",
      }}
    >
      공개
    </span>
  );
}

function ChapterRow({
  ch,
  title,
  subtitle,
  isPublic,
  isLast,
}: {
  ch: string;
  title: string;
  subtitle: string;
  isPublic: boolean;
  isLast: boolean;
}) {
  return (
    <>
      <div
        className="flex items-stretch"
        style={{ paddingTop: "18px", paddingBottom: "18px" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "64px",
            flexShrink: 0,
            fontSize: "13px",
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 500,
            color: CH_LABEL_COLOR,
            letterSpacing: "0.02em",
            borderRight: `1px solid ${DIVIDER_COLOR}`,
          }}
        >
          {ch}
        </div>
        <div
          className="flex-1 flex flex-col pr-3 pl-4 justify-center"
          style={{ gap: "6px" }}
        >
          <p
            style={{
              fontSize: "16px",
              fontFamily: '"JejuMyeongjo", "Pretendard", serif',
              fontWeight: 600,
              color: isPublic ? TITLE_COLOR : LOCKED_TITLE_COLOR,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              textWrap: "auto",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: "13px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 400,
              color: SUBTITLE_COLOR,
              lineHeight: 1.5,
              letterSpacing: "0.02em",
              textWrap: "auto",
            }}
          >
            {subtitle}
          </p>
        </div>
        <div
          style={{
            width: "56px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "2px",
          }}
        >
          {isPublic ? <PublicPill /> : <LockIcon />}
        </div>
      </div>
      {!isLast && (
        <div style={{ height: "1px", background: DIVIDER_COLOR }} />
      )}
    </>
  );
}

function HeaderDecoration() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ gap: "8px", marginBottom: "16px" }}
    >
      <div style={{ width: "16px", height: "1px", background: HEADER_DECO_COLOR }} />
      <span style={{ color: HEADER_DECO_COLOR, fontSize: "10px" }}>◇</span>
      <div style={{ width: "16px", height: "1px", background: HEADER_DECO_COLOR }} />
      <h2
        style={{
          fontSize: "20px",
          fontFamily: '"JejuMyeongjo", "Pretendard", serif',
          fontWeight: 600,
          color: HEADER_DECO_COLOR,
          letterSpacing: "0.01em",
          marginLeft: "4px",
          marginRight: "4px",
        }}
      >
        전체 결과 구성
      </h2>
      <div style={{ width: "16px", height: "1px", background: HEADER_DECO_COLOR }} />
      <span style={{ color: HEADER_DECO_COLOR, fontSize: "10px" }}>◇</span>
      <div style={{ width: "16px", height: "1px", background: HEADER_DECO_COLOR }} />
    </div>
  );
}

type Props = {
  displayName: string;
};

export default function FullResultIndexSection({ displayName }: Props) {
  return (
    <div
      className="w-full"
      style={{
        background: SECTION_BG,
        paddingTop: "32px",
        paddingBottom: "32px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <HeaderDecoration />

      <div>
        {CHAPTERS.map((c, i) => (
          <ChapterRow
            key={c.ch}
            ch={c.ch}
            title={c.title.replace("{name}", displayName)}
            subtitle={c.subtitle}
            isPublic={c.isPublic}
            isLast={i === CHAPTERS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
