// [domain/model] UserProfile — 순수 타입 (스펙 §7.1/§12). 메인 계정에서 주입되는 사주 프로필.
// ❗채팅 인앱은 생년월일시를 입력받지 않고 "주입받는다". 사주 변수는 유저의 사주.
// 코드 변수는 로마자(ilgan 등), UI 노출 시 한자 음독 병기.
export interface UserProfile {
  nickname: string;
  ilgan: string; // 일간 (예 UI: 丙火(병화))
  ohaeng: string; // 오행 (예 UI: 화(火))
  birth: string; // 생년월일시 (더미)
}
