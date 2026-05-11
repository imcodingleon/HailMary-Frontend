"use client";

function StarRow({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < filled ? "#E05C6A" : "#3a2a2a",
            fontSize: "16px",
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
}: {
  ilju: string;
  name: string;
  stars: number;
  body: string;
  highlights?: string[];
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "#1a0e10",
        border: "1px solid #3a2024",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block text-[13px] tracking-wider px-2.5 py-0.5 rounded-md"
            style={{ border: "1px solid #5a2a30", color: "#E6A88E" }}
          >
            {ilju}
          </span>
          <span className="text-[16px]" style={{ color: "#c9b89e" }}>
            {name}
          </span>
        </div>
        <StarRow filled={stars} />
      </div>
      <p className="text-[16px] leading-relaxed mb-3" style={{ color: "#D0C5B6" }}>
        {renderBody(body, highlights)}
      </p>
      <span
        className="inline-block text-[10px] tracking-wider px-2 py-0.5 rounded"
        style={{ border: "1px solid #4a3a30", color: "#856C51" }}
      >
        강연우 버전
      </span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-2">
      <p className="text-[24px] font-bold" style={{ color: "#B49874" }}>
        {value}
      </p>
      <p className="text-[16px]" style={{ color: "#998f82" }}>
        {label}
      </p>
    </div>
  );
}

export function RealReviewsSection() {
  return (
    <div className="w-full px-5 py-12" style={{ background: "#000" }}>
      <h2
        className="text-center text-[22px] font-bold tracking-[0.05em] mb-2"
        style={{ color: "#E8DDC8" }}
      >
        실제 후기
      </h2>
      <p
        className="text-center text-[14px] tracking-[0.08em] mb-3"
        style={{ color: "#998f82" }}
      >
        도화선을 경험한 사람들
      </p>
      <div className="flex justify-center mb-7">
        <div className="w-12 h-[1px]" style={{ background: "#c9a96e", opacity: 0.7 }} />
      </div>

      <div className="flex items-center justify-center gap-8 mb-8">
        <StatBlock value="★ 4.9" label="평균 별점" />
        <div className="w-px h-10" style={{ background: "#3a3530" }} />
        <StatBlock value="94%" label="재방문율" />
      </div>

      <div className="flex flex-col gap-3">
        <ReviewCard
          ilju="丁亥"
          name="현*님"
          stars={5}
          body="제가 혹시 연우랑 사귈 순 없나요? ㅋㅋㅋㅋ딴 데 신경 쓰지 말고 자기가 짚어주는 대로만 보라는데 시크한 매력에 치였음... 오글거림 없이 팩트로만 연애운 분석받고 싶으면 무조건 연우 추천합니다!"
          highlights={["시크한 매력에 치였음", "오글거림 없이 팩트로만 연애운 분석받고 싶으면 무조건 연우 추천합니다"]}
        />
        <ReviewCard
          ilju="癸卯"
          name="서*님"
          stars={5}
          body="오글거리는 거 질색인데 여긴 담백해서 좋네요. 맨날 쓸데없이 미련가지던 거 연우가 팩폭으로 다 잡아줘서 이제야 살 것 같습니다."
          highlights={["여긴 담백해서 좋네요", "연우가 팩폭으로 다 잡아줘서 이제야 살 것 같습니다"]}
        />
        <ReviewCard
          ilju="丙午"
          name="보*님"
          stars={5}
          body="피해야 할 인연 설명 읽다가 전남친 생각나서 소름 돋았어요... 좀 더 일찍 사주 봤으면 좋았을 걸 왜 이제서야 본 건지!"
          highlights={["전남친 생각나서 소름 돋았어요", "왜 이제서야 본 건지"]}
        />
        <ReviewCard
          ilju="庚寅"
          name="아*님"
          stars={5}
          body="저처럼 썸탈 때 삽질 많이 하는 사람들은 연우한테 상담 받으면 정신 차리실 수 있습니다."
          highlights={["연우한테 상담 받으면 정신 차리실 수 있습니다"]}
        />
      </div>
    </div>
  );
}
