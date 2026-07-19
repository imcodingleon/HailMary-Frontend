// [ui] AffinityGauge — 호감도 게이지 (스펙 §7.7). 표시 전용 Dumb. 적립 로직 없음(H6).
// 전통 편액(얇은 버전): 선황금 프레임 + 양끝 당초무늬로 감싼 트랙 + 안쪽 도화홍 채움(값 %).
// 레벨·수치는 선황금 톤. 값(score)은 데이터/props에서만 — 하드코딩 금지.
// (tone은 API 호환용으로 유지하되, 편액 언어는 톤과 무관하게 동일.)
import PlaqueOrnaments from './PlaqueOrnaments';
import IconImg from './IconImg';
import { decorAsset } from './decorAsset';

export interface AffinityGaugeProps {
  level: number;
  score: number; // 0~100 표시용
  nextReward: string;
  tone?: 'light' | 'dark';
}

export default function AffinityGauge({ level, score, nextReward }: AffinityGaugeProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="font-title text-sm font-semibold text-seonhwanggeum">호감도 Lv.{level}</span>
        <span className="font-body text-[11px] text-seonhwanggeum">{score} / 100</span>
      </div>

      {/* 얇은 편액 — 선황금 프레임 + 양끝 당초무늬 + 안쪽 도화홍 채움 + 채움 끝점 문양. width%는 데이터(score)에서만. */}
      <div className="relative w-full">
        {/* 프레임 + 채움 (overflow-hidden: 채움 글로우/모서리 클립) */}
        <div className="plaque relative h-5 w-full overflow-hidden rounded-pill bg-meokheuk">
          <div className="plaque-fill h-full rounded-pill bg-dohwahong" style={{ width: `${score}%` }} />
          <PlaqueOrnaments />
        </div>
        {/* 채움 끝점 장식 — 값(%)에 따라 이동, 세로 중앙. overflow 밖이라 0/100%에서도 안 잘림. 없으면 장식 없음(fallback) */}
        <div
          className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${score}%` }}
        >
          <IconImg src={decorAsset.gaugeTip} alt="" className="h-7 w-auto object-contain" fallback={null} />
        </div>
      </div>

      <span className="font-body text-[11px] text-seonhwanggeum">
        다음 보상: <span className="font-semibold text-dohwahong">{nextReward}</span>
      </span>
    </div>
  );
}
