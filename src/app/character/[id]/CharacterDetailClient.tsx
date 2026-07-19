'use client';

// 캐릭터 상세 (스펙 §7.4 / §7.7 위치 ①) — 상단 히어로 풀이미지 → 다크 콘텐츠 → 정보 흐름.
// 기본 캐릭터 + (프로토타입) 잠금 캐릭터 미리보기 모두 렌더. 없는 필드는 [TBD]/placeholder.
// P3 이식: SOURCE 1:1 복제 본문 — id는 useParams 대신 상위 page.tsx(generateStaticParams)로부터 prop 전달.
import { useRouter } from 'next/navigation';
import { useCharacterDetail } from '@/features/chat/application/hooks/useCharacterDetail';
import { useAffinity } from '@/features/chat/application/hooks/useAffinity';
import CharacterSlot from '@/features/chat/ui/CharacterSlot';
import CharacterImage from '@/features/chat/ui/CharacterImage';
import AffinityGauge from '@/features/chat/ui/AffinityGauge';
import ThumbnailStrip from '@/features/chat/ui/ThumbnailStrip';
import IconImg from '@/features/chat/ui/IconImg';
import { iconAsset } from '@/features/chat/ui/iconAsset';
import { decorAsset } from '@/features/chat/ui/decorAsset';

function BackGlyph({ className }: { className?: string }) {
  // TODO(asset): 뒤로가기 커스텀 아이콘 교체 — /icons/back.png 예정 (현재 lucide 스타일 인라인 글리프 유지)
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function CharacterDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { character, lockedSlot, quoteText, storyText, isSampleCopy } = useCharacterDetail(id);
  const { profile: affinity } = useAffinity(id);

  if (!character && !lockedSlot) {
    return (
      <section className="flex flex-1 items-center justify-center px-8 text-center">
        <p className="font-body text-sm text-hwaseonji">캐릭터를 찾을 수 없습니다.</p>
      </section>
    );
  }

  // 통합 표시값 (기본 캐릭터 / 잠금 미리보기)
  const isPreview = !character; // 잠금 미리보기(프로토타입)
  const name = character?.name ?? lockedSlot!.name;
  const accent = character?.accent ?? 'simyagal';
  const quote = character ? quoteText : lockedSlot!.signatureQuote;
  const tags = character?.tags ?? [];

  return (
    // 히어로+콘텐츠를 하나의 연속 배경(solid 먹흑) 위에 둔다 — 운문 이미지(app-bg) 대신 단색으로 통일해야
    // 히어로 하단 페이드(→먹흑)가 콘텐츠 배경과 "완전히 같은 값"이 되어 중간 붕 뜨는 구간 없이 1회로 매끄럽게 이어짐.
    <section className="flex flex-1 flex-col bg-meokheuk">
      {/* 좌상단 뒤로가기 — sticky 0-height 래퍼로 스크롤 내내 고정 */}
      <div className="sticky top-0 z-20 h-0">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="app-surface absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-pill text-hwaseonji"
        >
          <IconImg
            src={iconAsset.back}
            alt=""
            className="h-5 w-5 object-contain"
            fallback={<BackGlyph className="h-5 w-5" />}
          />
        </button>
      </div>

      {/* 1. 히어로 풀이미지 (placeholder/이미지) → 다크로 페이드 */}
      <div className="relative h-[58dvh] shrink-0">
        <CharacterImage
          id={id}
          kind="hero"
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          fallback={
            <CharacterSlot label={name} accent={accent} className="absolute inset-0 h-full w-full" bordered={false} />
          }
        />
        {/* 히어로 하단 페이드 — 콘텐츠 배경(먹흑)으로 매끄럽게 녹아듦.
            상단 투명 → 중간 먹흑(via) → 하단 먹흑(solid)로, 하단 edge는 완전히 콘텐츠 배경색과 동일해 경계가 안 보임.
            색은 --color-meokheuk 토큰(=콘텐츠 배경)만 사용. 히어로 하단 구간만 덮어 얼굴 가리지 않음. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-meokheuk to-meokheuk" />
      </div>

      {/* 2. 콘텐츠 영역 (다크 + 밝은 텍스트) */}
      {/* pb는 sticky 버튼 높이만큼 확보 — 스크롤 끝에서 마지막 콘텐츠가 버튼에 가리지 않도록 (112px→77px, 하단 여백 축소) */}
      <div className="flex flex-col gap-5 px-5 pb-[77px] pt-2">
        <div className="flex flex-col gap-2">
          {isPreview && (
            <span className="self-start rounded-pill border border-dohwahong px-2 py-0.5 font-body text-[10px] text-dohwahong">
              잠금 미리보기 · 프로토타입
            </span>
          )}
          <h1 className="font-title text-2xl font-bold text-hwaseonji">{name}</h1>
          <p className="font-body text-sm leading-relaxed text-hwaseonji">“{quote}”</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {tags.map((tag) => (
                <span key={tag} className="font-body text-xs text-seonhwanggeum">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 스토리 미리보기 */}
        <div className="flex flex-col gap-2">
          <h2 className="font-title text-sm font-semibold text-seonhwanggeum">〈스토리 미리보기〉</h2>
          {isPreview ? (
            <p className="font-body text-sm leading-relaxed text-hwaseonji">[TBD] 스토리 미리보기 준비 중</p>
          ) : (
            <p className="font-body text-sm leading-relaxed text-hwaseonji">{storyText}</p>
          )}
          {isSampleCopy && !isPreview && (
            <p className="font-body text-[11px] italic text-dohwahong">
              ※ 임시 샘플 카피 — 실제 사주 해설로 교체 예정
            </p>
          )}
        </div>

        {/* 호감도 표시 (위치 ①) — 다크 톤 게이지 */}
        {affinity ? (
          <button
            type="button"
            onClick={() => router.push(`/affinity/${id}`)}
            className="text-left"
            aria-label="호감도 화면 열기"
          >
            <AffinityGauge
              level={affinity.state.level}
              score={affinity.state.score}
              nextReward={affinity.state.nextReward}
              tone="dark"
            />
          </button>
        ) : (
          isPreview && (
            <p className="font-body text-[11px] text-hwaseonji">호감도 [TBD] — 해금 후 공개</p>
          )
        )}

        {/* 보조 썸네일 placeholder */}
        <ThumbnailStrip count={4} />
      </div>

      {/* 대화 시작하기 — 스크롤 위치와 무관하게 화면 하단에 항상 고정(sticky).
          scroll 컨테이너(overflow-y-auto) 기준 bottom-0에 붙어, 콘텐츠는 버튼 뒤로 흐른다.
          상단 페이드(투명→먹흑)로 뒤 콘텐츠가 버튼에 자연스럽게 녹아들도록 처리. 잠금 미리보기는 비활성. */}
      <div className="sticky bottom-0 z-10 -mt-6 bg-gradient-to-t from-meokheuk via-meokheuk to-transparent px-5 pb-5 pt-6">
        <button
          type="button"
          disabled={isPreview}
          onClick={() => {
            if (!isPreview) router.push(`/room/${id}`);
          }}
          className="plaque-btn relative block w-full text-hwaseonji disabled:opacity-50"
        >
          {/* 편액 통이미지 — 비율 유지(h-auto), 컨테이너 폭에 맞춰 스케일. 없으면 도화홍 pill fallback */}
          <IconImg
            src={decorAsset.btnStart}
            alt=""
            className="block h-auto w-full"
            fallback={<span className="block w-full rounded-pill bg-dohwahong py-3.5" />}
          />
          {/* 가운데 텍스트 — 양끝 무늬와 안 겹치게 가로 패딩 */}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-14 text-center font-title text-base font-semibold tracking-wide text-hwaseonji">
            {isPreview ? '잠금 — 미리보기' : '대화 시작하기'}
          </span>
        </button>
      </div>
    </section>
  );
}
