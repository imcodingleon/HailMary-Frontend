// HANDOFF(H5): 기억 = 현재 세션·로컬 메모리 → 서버 영속 메모리(대화 요약 + 최근 N턴 조립). 시그니처/인터페이스 유지.
// [infrastructure] 저장 어댑터 자리. 현재 대화 맥락(history)은 chatRoomsAtom(메모리)에 보관되고,
//   command(sendMessage)에서 room.messages를 그대로 chatApi에 조립·전달한다(= 현재의 "기억 조립" 지점).
// 실연동 시: 여기에 영속 저장/요약 로직을 두고, command는 이 어댑터를 통해 history를 조립한다(시그니처 유지).
export {};
