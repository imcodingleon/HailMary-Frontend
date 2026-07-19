// [ui] HeaderDivider — 헤더 하단 수평 구분선(공통). 표시 전용 Dumb.
// divider-thread2.png(선황금 구분선)를 헤더 폭 전체로 완전 수평 배치.
// ❗PNG 상하에 투명 여백이 있어, 그냥 flush로 두면 실제 실선이 경계선보다 위로 뜬다.
//   → 절대배치 bottom-0 + translate-y-1/2 로 이미지 "세로 중앙(=실선)"을 헤더 박스 하단 경계에 정확히 겹친다.
//   (헤더는 sticky라 절대배치의 containing block이 됨. inset-x-0 로 좌우 edge-to-edge.)
// 이미지 실패 시 선황금 얇은 수평 라인(양끝 페이드) fallback. 경로는 decorAsset util에서만.
import IconImg from './IconImg';
import { decorAsset } from './decorAsset';

export default function HeaderDivider() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1/2">
      <IconImg
        src={decorAsset.dividerThread}
        alt=""
        className="block h-auto w-full select-none opacity-50"
        fallback={<div className="thread-fallback mx-5 h-px" />}
      />
    </div>
  );
}
