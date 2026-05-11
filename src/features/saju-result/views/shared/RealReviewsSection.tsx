"use client";

const SECTION_BG = "#FDF5EA";
const CARD_BG = "#FBF1E7";
const CARD_BORDER = "#E0CFB6";
const TITLE_COLOR = "#2a1f15";
const SUBTITLE_COLOR = "#998f82";
const STAT_LABEL_COLOR = "#998f82";
const STAT_DIVIDER_COLOR = "#E0CFB6";
const STAR_COLOR = "#E94E3F";
const STAR_EMPTY_COLOR = "#E0CFB6";
const ILJU_PILL_BG = "#FDEEEC";
const ILJU_PILL_BORDER = "#E94E3F";
const ILJU_PILL_TEXT = "#E94E3F";
const NAME_COLOR = "#856C51";
const BODY_COLOR = "#4a3a2a";
const VERSION_BADGE_BG = "#F4E5CD";
const VERSION_BADGE_TEXT = "#856C51";

export type ReviewItem = {
  ilju: string;
  name: string;
  stars: number;
  body: string;
  highlights?: string[];
};

type Props = {
  reviews: ReviewItem[];
  versionBadgeLabel: string;
  subtitle?: string;
  averageRating?: string;
  revisitRate?: string;
};

function StarRow({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex items-center" style={{ gap: "2px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            color: i < filled ? STAR_COLOR : STAR_EMPTY_COLOR,
            fontSize: "16px",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function renderBody(body: string, highlights?: string[]) {
  if (!highlights?.length) return <>{body}</>;
  const pattern = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const parts = body.split(new RegExp(`(${pattern})`));
  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
      )}
    </>
  );
}

function ReviewCard({
  ilju,
  name,
  stars,
  body,
  highlights,
  versionBadgeLabel,
}: ReviewItem & { versionBadgeLabel: string }) {
  return (
    <div
      style={{
        padding: "20px 18px",
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: "14px",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "12px" }}
      >
        <div className="flex items-center" style={{ gap: "10px" }}>
          <span
            style={{
              display: "inline-block",
              background: ILJU_PILL_BG,
              border: `1px solid ${ILJU_PILL_BORDER}`,
              color: ILJU_PILL_TEXT,
              fontFamily: '"NotoSerifTC", "ChosunNm", serif',
              fontWeight: 600,
              fontSize: "13px",
              padding: "2px 10px",
              borderRadius: "6px",
              letterSpacing: "0.05em",
            }}
          >
            {ilju}
          </span>
          <span
            style={{
              fontSize: "16px",
              color: NAME_COLOR,
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 500,
            }}
          >
            {name}
          </span>
        </div>
        <StarRow filled={stars} />
      </div>

      <p
        style={{
          fontSize: "16px",
          color: BODY_COLOR,
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          lineHeight: 1.7,
          whiteSpace: "pre-line",
          marginBottom: "14px",
          textWrap: "auto",
        }}
      >
        {renderBody(body, highlights)}
      </p>

      <span
        style={{
          display: "inline-block",
          background: VERSION_BADGE_BG,
          color: VERSION_BADGE_TEXT,
          fontSize: "13px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          padding: "3px 10px",
          borderRadius: "9999px",
          letterSpacing: "0.04em",
        }}
      >
        {versionBadgeLabel}
      </span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: "4px" }}>
      <p
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#B49874",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: "16px",
          color: STAT_LABEL_COLOR,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function RealReviewsSection({
  reviews,
  versionBadgeLabel,
  subtitle = "도화선을 경험한 사람들",
  averageRating = "★ 4.9",
  revisitRate = "94%",
}: Props) {
  return (
    <div
      className="w-full"
      style={{
        background: SECTION_BG,
        paddingTop: "40px",
        paddingBottom: "48px",
      }}
    >
      <h2
        className="text-center"
        style={{
          fontSize: "24px",
          fontFamily: '"JejuMyeongjo", "Pretendard", serif',
          fontWeight: 600,
          color: TITLE_COLOR,
          letterSpacing: "0.01em",
          marginBottom: "8px",
        }}
      >
        실제 후기
      </h2>
      <p
        className="text-center"
        style={{
          fontSize: "14px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          color: SUBTITLE_COLOR,
          letterSpacing: "0.04em",
          marginBottom: "16px",
        }}
      >
        {subtitle}
      </p>
      <div className="flex justify-center" style={{ marginBottom: "28px" }}>
        <div
          style={{ width: "48px", height: "1px", background: "#A5773C", opacity: 0.7 }}
        />
      </div>

      <div
        className="flex items-center justify-center"
        style={{ gap: "0", marginBottom: "32px" }}
      >
        <StatBlock value={averageRating} label="평균 별점" />
        <div
          style={{
            width: "1px",
            height: "36px",
            background: STAT_DIVIDER_COLOR,
            margin: "0 24px",
          }}
        />
        <StatBlock value={revisitRate} label="재방문율" />
      </div>

      <div
        className="flex flex-col"
        style={{ gap: "14px", margin: "0 35px" }}
      >
        {reviews.map((r) => (
          <ReviewCard key={r.ilju} {...r} versionBadgeLabel={versionBadgeLabel} />
        ))}
      </div>
    </div>
  );
}
