// HANDOFF(H7): 선발신 인앱 흉내(시드 + 안 읽음 배지) → 실 푸시 인프라 + 맥락 발신 로직. 시그니처/인터페이스 유지.
// [infrastructure] chatRoomMock = 더미(교체 대상). 푸시 인프라 없음.
// ❗단체발송처럼 보이지 않게 — 캐릭터별 개별 맥락 메시지. 선발신/마지막 메시지는 사적 톤(사주 근거 없음).
import type { ChatRoom } from '@/features/chat/domain/model/chatRoom';

// 고정 시드 시각(SSR/클라 일관 — Date.now 사용 안 함). 시간 표기 형식은 [TBD].
const BASE_AT = 1782000000000;
const HOUR = 3600 * 1000;

export const chatRoomMock: Record<string, ChatRoom> = {
  // 강연우 — 선발신(안 읽음 1). 차가운 한 줄, 개별 맥락.
  yeonu: {
    characterId: 'yeonu',
    mode: 'casual',
    messages: [
      {
        id: 'seed-yeonu-1',
        role: 'character',
        type: 'text',
        content:
          '어둑한 상담실, 촛불 하나만 타고 있다. 강연우가 문 열리는 소리에 시선만 슬쩍 돌린다.\n\n"또 혼자 끙끙 앓고 있지. …말 안 해도 다 보여."',
      },
    ],
    lastMessage: '또 혼자 끙끙 앓고 있지. 말 안 해도 다 보여.',
    unreadCount: 1,
    lastAt: BASE_AT + 3 * HOUR,
  },
  // 한도윤 — 진행 중(읽음). 다정한 톤, 이어지는 대화.
  doyoon: {
    characterId: 'doyoon',
    mode: 'casual',
    messages: [
      {
        id: 'seed-doyoon-1',
        role: 'character',
        type: 'text',
        content:
          '한도윤이 찻잔을 내려놓으며 부드럽게 맞이한다.\n\n"어서 오세요, 손님. 편하게 말씀하셔도 괜찮아요."',
      },
      { id: 'seed-doyoon-2', role: 'user', type: 'text', content: '요즘 좀 지쳐서요.' },
      {
        id: 'seed-doyoon-3',
        role: 'character',
        type: 'text',
        content:
          '고개를 가만히 끄덕이며, 한도윤이 목소리를 낮춘다.\n\n"그러셨군요. 천천히 오셔도 괜찮아요, 기다리고 있을게요."',
      },
    ],
    lastMessage: '그러셨군요. 천천히 오셔도 괜찮아요, 기다리고 있을게요.',
    unreadCount: 0,
    lastAt: BASE_AT,
  },
};
