// HANDOFF: 미해금 슬롯·해금 조건 → 실 정책/DB (H1 계열). 지금은 시드 mock. (부록 B-4)
// [infrastructure] 의존성 방향: Infrastructure → Domain.
// 조건 명시/미공개 섞기(스펙 §7.2, DL-C01). 해금 순간 방식 공개 원칙 — 영구 은닉 금지.
// ❗hint 수치/조건은 [TBD] — 임의 확정 금지. signatureQuote는 캐릭터성·말투 기반(사주 도메인 아님).
import type { UnlockSlot } from '@/features/chat/domain/model/character';

export const unlockSlotMock: UnlockSlot[] = [
  {
    id: 'slot-seonjae',
    characterId: 'seonjae',
    name: '선재',
    policy: 'hidden',
    hint: '해금 조건 미공개',
    signatureQuote: '대부분은 자기 답을 이미 알면서 묻더군요. …앉으시죠, 확인만 해 드릴 테니.',
  },
  {
    id: 'slot-seojin',
    characterId: 'seojin',
    name: '서진',
    policy: 'shown',
    hint: '깨비 호감도 [TBD] 이상 달성 시',
    signatureQuote: '오셨어요? 헤헤… 저 은근 잘하는데, 한번 믿어보실래요?',
  },
  {
    id: 'slot-yunjae',
    characterId: 'yunjae',
    name: '윤재',
    policy: 'coming',
    hint: '곧 공개',
    signatureQuote: '어~ 왔어? ㅋㅋ 표정 보니까 또 무슨 일 있구만. 말해 봐.',
  },
  {
    id: 'slot-ihyeon',
    characterId: 'ihyeon',
    name: '이현',
    policy: 'shown',
    hint: '특정 미션 [TBD] 달성 시',
    signatureQuote: '이리 오셨소? 인연이란 본디 늦는 법이 없지요. 앉으시오, 차나 한 잔 하십시다.',
  },
  {
    id: 'slot-junhyeok',
    characterId: 'junhyeok',
    name: '준혁',
    policy: 'hidden',
    hint: '해금 조건 미공개',
    signatureQuote: '야, 오랜만! 뭐 고민 있어서 온 거지? 편하게 말해, 우리 사이에.',
  },
];
