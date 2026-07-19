// [ui] PlaqueOrnaments — 편액 양끝 당초무늬(선황금) 좌우 1쌍. 표시 전용 Dumb.
// 프레임 높이에 맞춰(h-full w-auto) 양끝에 고정. 이미지 실패 시 아무것도 안 그림 → 프레임만 남음(fallback).
// 부모는 position: relative + overflow-hidden(모서리 클립) 전제. 경로는 decorAsset util에서만.
import IconImg from './IconImg';
import { decorAsset } from './decorAsset';

export default function PlaqueOrnaments() {
  return (
    <>
      <IconImg
        src={decorAsset.frameOrnamentLeft}
        alt=""
        className="pointer-events-none absolute left-0 top-0 h-full w-auto object-contain"
        fallback={null}
      />
      <IconImg
        src={decorAsset.frameOrnamentRight}
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-full w-auto object-contain"
        fallback={null}
      />
    </>
  );
}
