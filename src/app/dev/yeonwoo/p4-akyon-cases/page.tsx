// dev 전용 P-4 2-3 피해야 할 인연의 특징 — slotId 20 케이스 비교.
//
// 사용자 결정 2026-05-11:
// - 사진/외형 정보/태그/AI 박스 모두 slotId 20 매트릭스 통일
// - 사진 매칭: spouse-face-prompts.md slotId 규칙 (`{m|f}-{element}-{yang|yin}`)
// - 호스팅 경로: /images/spouse/yeonwoo/avoid/{slotId}.png

import AiBlock from "@/features/saju-result/views/yeonwoo/paid/components/AiBlock";
import SpouseImage from "@/features/saju-result/views/yeonwoo/paid/components/SpouseImage";
import KeywordTags from "@/features/saju-result/views/yeonwoo/paid/components/KeywordTags";
import InfoGrid from "@/features/saju-result/views/yeonwoo/paid/components/InfoGrid";
import { YeonwooBubble } from "@/features/saju-result/views/yeonwoo/paid/components/Section";

interface Case {
  label: string;
  slotId: string;
  nickname: string;
  keyword_tags: ReadonlyArray<string>;
  info_rows: ReadonlyArray<{ key: string; val: string }>;
  ai_akyon: string;
}

// 임수(壬水) 일간 + 수(水) 과다 가정으로 AI 박스 일간 placeholder 채움.
// 실제 합성에선 사용자 일간/오행에 따라 마지막 단락이 바뀜.
function ai(slotId: string, looks: string, mood: string): string {
  return [
    "이 사람 보이면 멈춰. 첫인상부터 알아볼 수 있어.",
    looks,
    mood,
    "임수(壬水) 일간한테는 가장 안 맞아. 네 깊이를 못 받아. 받아주는 척하다 떠나. 수(水) 과다인 너에겐 더 무거운 매듭이 돼.",
    "위 신호 두 개 이상 보이면 더 깊어지기 전에 끊어. 깊어진 다음엔 너만 다쳐.",
  ].join("\n\n");
}

// slotId 20 매트릭스. nickname/외형/태그/분위기는 spouse-face-prompts.md 톤 답습.
const CASES: ReadonlyArray<Case> = [
  // ── 남 10 ─────────────────────────────────────
  {
    label: "A",
    slotId: "m-wood-yang",
    nickname: "시원시원한 큰나무",
    keyword_tags: ["통제형", "직진 발언", "자기 페이스", "고집스러움", "타협 X"],
    info_rows: [
      { key: "키·체형", val: "키 큰 편 · 긴 팔다리 · 마른 골격" },
      { key: "얼굴상", val: "또렷한 이목구비 · 시원한 인상" },
      { key: "이목구비", val: "광대 살짝 · 코 곧음" },
      { key: "스타일", val: "심플하고 정돈 · 운동웨어 자주" },
      { key: "분위기", val: "처음엔 듬직한데 가까워지면 뻣뻣한 결" },
      { key: "말의 속도", val: "보통 · 자기 결론으로 끌고 감" },
    ],
    ai_akyon: ai(
      "m-wood-yang",
      "키 큰 편에 긴 팔다리, 마른 골격. 또렷한 이목구비에 시원한 인상. 광대가 살짝 있고 코가 곧아. 옷차림은 심플하고 정돈된 결.",
      "분위기가 처음엔 듬직하고 매혹적이야. 근데 가까워질수록 자기 결론으로 끌고 가. 네 의견은 들은 척만 하고 자기 방향으로 가. 타협이 안 돼.",
    ),
  },
  {
    label: "B",
    slotId: "m-wood-yin",
    nickname: "섬세한 대나무",
    keyword_tags: ["우유부단", "회피형", "결정 미룸", "수동적", "거리 둠"],
    info_rows: [
      { key: "키·체형", val: "키 큰 편 · 슬렌더 · 얇은 골격" },
      { key: "얼굴상", val: "섬세한 이목구비 · 부드러운 인상" },
      { key: "이목구비", val: "눈매 처짐 · 입꼬리 살짝 내림" },
      { key: "스타일", val: "차분한 톤 · 니트류 자주" },
      { key: "분위기", val: "처음엔 다정한데 결정 순간엔 사라지는 결" },
      { key: "말의 속도", val: "느림 · 끝맺음 흐림" },
    ],
    ai_akyon: ai(
      "m-wood-yin",
      "키 큰 편에 슬렌더한 골격. 섬세한 이목구비에 부드러운 인상. 눈매가 살짝 처지고 입꼬리도 내려가 있어. 차분한 톤의 니트를 자주 입어.",
      "분위기가 처음엔 다정해. 근데 중요한 순간엔 사라져. 결정 못 내리고 미루다 너 혼자 짊어지게 만들어. 회피가 본업이야.",
    ),
  },
  {
    label: "C",
    slotId: "m-fire-yang",
    nickname: "태양같은 활기",
    keyword_tags: ["과시형", "주목 욕구", "감정 기복", "빠른 식음", "약속 가볍게"],
    info_rows: [
      { key: "키·체형", val: "보통~큰 편 · 어깨 넓은 운동형" },
      { key: "얼굴상", val: "밝고 또렷한 인상 · 화색" },
      { key: "이목구비", val: "큰 눈 · 두꺼운 눈썹" },
      { key: "스타일", val: "선명한 컬러 · 액세서리 자주" },
      { key: "분위기", val: "처음엔 환한데 식으면 한 번에 떠나는 결" },
      { key: "말의 속도", val: "빠름 · 자기 얘기 위주" },
    ],
    ai_akyon: ai(
      "m-fire-yang",
      "보통~큰 키에 어깨 넓은 운동형. 밝고 또렷한 인상에 화색이 도는 얼굴. 큰 눈에 두꺼운 눈썹. 선명한 컬러 옷과 액세서리를 자주 걸쳐.",
      "분위기가 처음엔 햇살처럼 환해. 근데 빛이 너무 세서 너를 태워. 자기 얘기 위주로 빠르게 말하고, 식으면 한 번에 떠나. 약속도 가볍게 깨.",
    ),
  },
  {
    label: "D",
    slotId: "m-fire-yin",
    nickname: "은은한 촛불",
    keyword_tags: ["기복 심함", "감정 숨김", "갑작스런 거리", "예민함", "오해 잦음"],
    info_rows: [
      { key: "키·체형", val: "보통 · 슬림" },
      { key: "얼굴상", val: "잘 정돈 · 살짝 어두운 톤" },
      { key: "이목구비", val: "눈 안쪽 깊음 · 입술 얇음" },
      { key: "스타일", val: "톤다운 컬러 · 안경 자주" },
      { key: "분위기", val: "처음엔 따뜻한데 갑자기 식는 결" },
      { key: "말의 속도", val: "보통 · 침묵 길어짐" },
    ],
    ai_akyon: ai(
      "m-fire-yin",
      "보통 키에 슬림한 체형. 잘 정돈됐는데 살짝 어두운 톤. 눈 안쪽이 깊고 입술이 얇아. 톤다운 컬러 옷과 안경을 자주 써.",
      "분위기가 처음엔 은근히 따뜻해. 근데 어느 순간 갑자기 식어. 이유 안 말해. 너 혼자 오해 풀려고 끙끙 앓게 돼.",
    ),
  },
  {
    label: "E",
    slotId: "m-earth-yang",
    nickname: "듬직한 산",
    keyword_tags: ["집착 강함", "소유욕", "통제", "변화 거부", "고립 유도"],
    info_rows: [
      { key: "키·체형", val: "보통~중간 · 단단한 골격" },
      { key: "얼굴상", val: "둥근 인상 · 안정적" },
      { key: "이목구비", val: "눈 작음 · 턱 두꺼움" },
      { key: "스타일", val: "베이직 · 무거운 색감" },
      { key: "분위기", val: "처음엔 든든한데 점점 옭아매는 결" },
      { key: "말의 속도", val: "느림 · 강하게 못 박음" },
    ],
    ai_akyon: ai(
      "m-earth-yang",
      "보통~중간 키에 단단한 골격. 둥근 인상에 안정적인 얼굴. 눈이 작고 턱이 두꺼워. 베이직한 무거운 색감 옷을 자주 입어.",
      "분위기가 처음엔 든든해. 기댈 수 있을 것 같아. 근데 점점 옭아매. 네 인간관계까지 정리하라고 해. 변화는 절대 안 받아들여.",
    ),
  },
  {
    label: "F",
    slotId: "m-earth-yin",
    nickname: "포근한 흙",
    keyword_tags: ["의존형", "수동공격", "삐짐 잦음", "잔소리", "자기연민"],
    info_rows: [
      { key: "키·체형", val: "보통 · 약간 통통" },
      { key: "얼굴상", val: "부드러운 인상 · 친근함" },
      { key: "이목구비", val: "둥근 눈 · 통통한 볼" },
      { key: "스타일", val: "편한 옷 · 무드한 컬러" },
      { key: "분위기", val: "처음엔 편한데 점점 의존하는 결" },
      { key: "말의 속도", val: "보통 · 잔소리 톤" },
    ],
    ai_akyon: ai(
      "m-earth-yin",
      "보통 키에 약간 통통한 체형. 부드럽고 친근한 인상. 둥근 눈과 통통한 볼. 편한 옷에 무드한 컬러를 즐겨.",
      "분위기가 처음엔 편안해. 근데 점점 너한테 다 의존해. 삐지면 말 안 하고, 자기연민으로 끌어내려. 너만 챙겨주다 지쳐.",
    ),
  },
  {
    label: "G",
    slotId: "m-metal-yang",
    nickname: "단단한 칼",
    keyword_tags: ["냉정함", "비판적", "감정 차단", "거리 두기", "지적 우월"],
    info_rows: [
      { key: "키·체형", val: "보통~큰 편 · 각진 골격" },
      { key: "얼굴상", val: "차가운 인상 · 각진 턱선" },
      { key: "이목구비", val: "눈매 날카로움 · 얇은 입술" },
      { key: "스타일", val: "모노톤 · 정장 자주" },
      { key: "분위기", val: "처음엔 시크한데 곁에 있으면 차가운 결" },
      { key: "말의 속도", val: "빠름 · 끊어 말함" },
    ],
    ai_akyon: ai(
      "m-metal-yang",
      "보통~큰 키에 각진 골격. 차가운 인상에 각진 턱선. 눈매가 날카롭고 입술이 얇아. 모노톤 정장을 자주 입어.",
      "분위기가 처음엔 시크하고 매혹적이야. 근데 곁에 있어 보면 차가워. 네 감정을 비판하고 지적해. 자기는 안 들여다보고 너만 분석해.",
    ),
  },
  {
    label: "H",
    slotId: "m-metal-yin",
    nickname: "차분한 은",
    keyword_tags: ["자기검열", "거리 둠", "소통 어려움", "비밀스러움", "차가운 침묵"],
    info_rows: [
      { key: "키·체형", val: "보통 · 슬림" },
      { key: "얼굴상", val: "맑은 피부 · 차분함" },
      { key: "이목구비", val: "정돈된 이목구비 · 무표정" },
      { key: "스타일", val: "심플 · 화이트/회색" },
      { key: "분위기", val: "처음엔 신비로운데 끝까지 거리 두는 결" },
      { key: "말의 속도", val: "느림 · 짧게 끊음" },
    ],
    ai_akyon: ai(
      "m-metal-yin",
      "보통 키에 슬림한 체형. 맑은 피부에 차분한 분위기. 정돈된 이목구비에 무표정이 디폴트. 심플한 화이트/회색 옷을 즐겨.",
      "분위기가 처음엔 신비로워. 근데 끝까지 거리 둬. 너한테 마음 안 열어. 비밀이 너무 많아서 네가 다 짐작해야 해. 침묵이 무거워.",
    ),
  },
  {
    label: "I",
    slotId: "m-water-yang",
    nickname: "깊은 바다",
    keyword_tags: ["차가운 인상", "말이 빠른 사람", "감정 기복", "약속 잘 깸", "자기중심"],
    info_rows: [
      { key: "키·체형", val: "평균보다 큰 편 · 마른 골격" },
      { key: "얼굴상", val: "광대 도드라짐 · 눈매 날카로움" },
      { key: "이목구비", val: "얇은 입술 · 끝이 올라간 눈꼬리" },
      { key: "스타일", val: "차림이 화려하거나 정반대로 무심함" },
      { key: "분위기", val: "처음엔 끌리는데 곁에 있으면 식는 결" },
      { key: "말의 속도", val: "평균보다 빠름 · 끊어 말하는 습관" },
    ],
    ai_akyon: ai(
      "m-water-yang",
      "키가 평균보다 큰 편에 마른 골격. 어깨가 좁아서 옷이 흘러내리듯 걸리는 사람. 광대가 도드라지고 턱선이 각져 있어. 눈매 끝이 살짝 올라가 있어서 웃을 때도 어딘가 서늘해. 입술은 얇고, 말할 때 끝이 빨리 닫혀.",
      "분위기가 처음엔 매혹적이야. 차가운데 끌려. 근데 곁에 있어 보면 결이 안 맞아. 말 속도가 빨라서 네가 따라가다 지쳐. 약속을 가볍게 깨고도 미안해하지 않아.",
    ),
  },
  {
    label: "J",
    slotId: "m-water-yin",
    nickname: "몽환적 안개",
    keyword_tags: ["흐릿함", "거짓말 잦음", "감정 회피", "두 얼굴", "자취 감춤"],
    info_rows: [
      { key: "키·체형", val: "보통 · 슬림" },
      { key: "얼굴상", val: "흐릿한 인상 · 살짝 멍한 톤" },
      { key: "이목구비", val: "눈 풀림 · 입술 흐림" },
      { key: "스타일", val: "톤다운 · 후드/오버사이즈" },
      { key: "분위기", val: "처음엔 신비로운데 잡으면 사라지는 결" },
      { key: "말의 속도", val: "느림 · 말끝 흐림" },
    ],
    ai_akyon: ai(
      "m-water-yin",
      "보통 키에 슬림. 흐릿한 인상에 살짝 멍한 톤. 눈이 풀려있고 입술도 흐려. 후드나 오버사이즈 톤다운 옷을 즐겨.",
      "분위기가 처음엔 신비로워. 근데 잡으려 하면 사라져. 거짓말이 가볍고 두 얼굴이 보여. 어느 날 자취 감춰도 이상하지 않은 결이야.",
    ),
  },
  // ── 여 10 ─────────────────────────────────────
  {
    label: "K",
    slotId: "f-wood-yang",
    nickname: "시원한 봄나무",
    keyword_tags: ["과시형", "비교 잦음", "자기 페이스", "주도권 욕구", "타협 X"],
    info_rows: [
      { key: "키·체형", val: "키 큰 편 · 슬렌더" },
      { key: "얼굴상", val: "또렷한 이목구비 · 시원한 인상" },
      { key: "이목구비", val: "긴 코 · 또렷한 눈" },
      { key: "스타일", val: "트렌디 · 컬러풀" },
      { key: "분위기", val: "처음엔 화사한데 자기 결로 끌고 가는 결" },
      { key: "말의 속도", val: "빠름 · 자기 위주" },
    ],
    ai_akyon: ai(
      "f-wood-yang",
      "키 큰 편에 슬렌더한 골격. 또렷한 이목구비에 시원한 인상. 코가 길고 눈이 또렷해. 트렌디하고 컬러풀한 옷을 즐겨.",
      "분위기가 처음엔 화사하고 활기 넘쳐. 근데 자기 결로 끌고 가. 너랑 비교하고 자기가 위에 있으려고 해.",
    ),
  },
  {
    label: "L",
    slotId: "f-wood-yin",
    nickname: "단아한 난초",
    keyword_tags: ["수동공격", "은근한 비교", "삐짐", "결정 회피", "내적 거리"],
    info_rows: [
      { key: "키·체형", val: "보통~큰 · 슬림" },
      { key: "얼굴상", val: "섬세 · 차분함" },
      { key: "이목구비", val: "긴 속눈썹 · 작은 입" },
      { key: "스타일", val: "차분한 톤 · 단아함" },
      { key: "분위기", val: "처음엔 청초한데 내적 거리 두는 결" },
      { key: "말의 속도", val: "느림 · 말 줄임" },
    ],
    ai_akyon: ai(
      "f-wood-yin",
      "보통~큰 키에 슬림. 섬세하고 차분한 인상. 긴 속눈썹과 작은 입. 차분한 톤의 단아한 옷차림.",
      "분위기가 처음엔 청초하고 매혹적이야. 근데 내적 거리를 끝까지 둬. 직접 말 안 하고 은근히 삐지고 비교해. 네가 다 짐작해야 해.",
    ),
  },
  {
    label: "M",
    slotId: "f-fire-yang",
    nickname: "빛나는 햇살",
    keyword_tags: ["주목 욕구", "감정 기복", "질투 잦음", "비교 화", "즉흥적"],
    info_rows: [
      { key: "키·체형", val: "보통 · 글래머" },
      { key: "얼굴상", val: "화사한 인상 · 환한 미소" },
      { key: "이목구비", val: "큰 눈 · 도톰한 입술" },
      { key: "스타일", val: "선명한 컬러 · 화려함" },
      { key: "분위기", val: "처음엔 환한데 식으면 한 번에 폭발하는 결" },
      { key: "말의 속도", val: "빠름 · 큰 목소리" },
    ],
    ai_akyon: ai(
      "f-fire-yang",
      "보통 키에 글래머 체형. 화사한 인상에 환한 미소. 큰 눈과 도톰한 입술. 선명한 컬러로 화려하게 입어.",
      "분위기가 처음엔 햇살같이 환해. 근데 감정 기복이 커. 질투가 빠르고 한 번 식으면 폭발해. 너 혼자 진정시켜야 해.",
    ),
  },
  {
    label: "N",
    slotId: "f-fire-yin",
    nickname: "은은한 노을",
    keyword_tags: ["기복 심함", "내적 화", "삐짐 잦음", "투정", "감정 갑작 변화"],
    info_rows: [
      { key: "키·체형", val: "보통 · 슬림" },
      { key: "얼굴상", val: "잘 정돈 · 따뜻한 톤" },
      { key: "이목구비", val: "눈 아래 보조개 · 입꼬리 살짝" },
      { key: "스타일", val: "내추럴 · 파스텔" },
      { key: "분위기", val: "처음엔 따뜻한데 갑자기 차가워지는 결" },
      { key: "말의 속도", val: "보통 · 한숨 잦음" },
    ],
    ai_akyon: ai(
      "f-fire-yin",
      "보통 키에 슬림. 잘 정돈된 따뜻한 톤. 눈 아래 보조개와 살짝 올라간 입꼬리. 내추럴한 파스텔 옷을 즐겨.",
      "분위기가 처음엔 노을처럼 은은해. 근데 갑자기 차가워져. 내적 화가 쌓이다 한숨으로 새. 투정도 잦아. 네가 풀어줘야 해.",
    ),
  },
  {
    label: "O",
    slotId: "f-earth-yang",
    nickname: "따뜻한 대지",
    keyword_tags: ["과보호", "통제", "구속", "변화 거부", "고립 유도"],
    info_rows: [
      { key: "키·체형", val: "보통 · 안정적" },
      { key: "얼굴상", val: "둥근 인상 · 안정감" },
      { key: "이목구비", val: "둥근 눈 · 통통한 볼" },
      { key: "스타일", val: "베이직 · 따뜻한 톤" },
      { key: "분위기", val: "처음엔 든든한데 점점 너를 묶는 결" },
      { key: "말의 속도", val: "느림 · 강하게 못 박음" },
    ],
    ai_akyon: ai(
      "f-earth-yang",
      "보통 키에 안정적인 체형. 둥근 인상에 안정감 있는 얼굴. 둥근 눈과 통통한 볼. 따뜻한 톤의 베이직한 옷차림.",
      "분위기가 처음엔 든든하고 포근해. 근데 점점 너를 묶어. 어디 가는지 누구 만나는지 다 묻기 시작해. 변화는 거부야.",
    ),
  },
  {
    label: "P",
    slotId: "f-earth-yin",
    nickname: "푸근한 흙",
    keyword_tags: ["수동공격", "삐짐", "잔소리", "의존형", "자기연민"],
    info_rows: [
      { key: "키·체형", val: "보통 · 통통" },
      { key: "얼굴상", val: "부드러움 · 친근함" },
      { key: "이목구비", val: "둥근 눈 · 통통한 입술" },
      { key: "스타일", val: "편한 옷 · 무드 컬러" },
      { key: "분위기", val: "처음엔 편한데 점점 의존하는 결" },
      { key: "말의 속도", val: "보통 · 잔소리" },
    ],
    ai_akyon: ai(
      "f-earth-yin",
      "보통 키에 통통한 체형. 부드럽고 친근한 인상. 둥근 눈과 통통한 입술. 편한 옷에 무드한 컬러.",
      "분위기가 처음엔 푸근해. 근데 점점 다 의존해. 잔소리가 늘고 자기연민이 깊어. 너만 챙겨주다 지쳐.",
    ),
  },
  {
    label: "Q",
    slotId: "f-metal-yang",
    nickname: "단단한 백자",
    keyword_tags: ["냉정함", "비판적", "거리 두기", "지적 우월", "감정 차단"],
    info_rows: [
      { key: "키·체형", val: "보통~큰 · 슬렌더" },
      { key: "얼굴상", val: "차가운 인상 · 각진 결" },
      { key: "이목구비", val: "날카로운 눈매 · 얇은 입술" },
      { key: "스타일", val: "모노톤 · 모던" },
      { key: "분위기", val: "처음엔 시크한데 곁에 있으면 차가운 결" },
      { key: "말의 속도", val: "보통 · 끊어 말함" },
    ],
    ai_akyon: ai(
      "f-metal-yang",
      "보통~큰 키에 슬렌더한 골격. 차가운 인상에 각진 결. 날카로운 눈매와 얇은 입술. 모노톤 모던한 옷차림.",
      "분위기가 처음엔 시크하고 매혹적이야. 근데 곁에 있어 보면 차가워. 네 감정을 비판해. 자기는 안 보여주고 너만 분석해.",
    ),
  },
  {
    label: "R",
    slotId: "f-metal-yin",
    nickname: "차분한 진주",
    keyword_tags: ["자기검열", "비밀스러움", "거리 둠", "소통 어려움", "감정 숨김"],
    info_rows: [
      { key: "키·체형", val: "보통 · 슬림" },
      { key: "얼굴상", val: "맑은 피부 · 차분함" },
      { key: "이목구비", val: "정돈된 이목구비 · 무표정" },
      { key: "스타일", val: "심플 · 회색/베이지" },
      { key: "분위기", val: "처음엔 신비로운데 끝까지 거리 두는 결" },
      { key: "말의 속도", val: "느림 · 짧게 끊음" },
    ],
    ai_akyon: ai(
      "f-metal-yin",
      "보통 키에 슬림. 맑은 피부에 차분함. 정돈된 이목구비에 무표정. 회색/베이지 톤의 심플한 옷.",
      "분위기가 처음엔 신비로워. 근데 끝까지 거리를 둬. 비밀이 많아서 네가 다 짐작해야 해. 마음 안 열어.",
    ),
  },
  {
    label: "S",
    slotId: "f-water-yang",
    nickname: "깊은 호수",
    keyword_tags: ["감정 차단", "차가운 침묵", "거리 둠", "감정 기복", "감정 휘두름"],
    info_rows: [
      { key: "키·체형", val: "보통~큰 · 슬렌더" },
      { key: "얼굴상", val: "차가운 인상 · 깊은 눈" },
      { key: "이목구비", val: "그윽한 눈 · 얇은 입술" },
      { key: "스타일", val: "네이비/딥블루 · 정돈" },
      { key: "분위기", val: "처음엔 깊이 끌리는데 점점 휘두르는 결" },
      { key: "말의 속도", val: "느림 · 침묵 길어짐" },
    ],
    ai_akyon: ai(
      "f-water-yang",
      "보통~큰 키에 슬렌더. 차가운 인상에 깊은 눈. 그윽한 눈매와 얇은 입술. 네이비/딥블루 톤의 정돈된 옷차림.",
      "분위기가 처음엔 깊이 끌려. 근데 점점 네 감정을 휘둘러. 침묵으로 벌주고 갑자기 다정해. 네가 매번 흔들려.",
    ),
  },
  {
    label: "T",
    slotId: "f-water-yin",
    nickname: "몽환적 달빛",
    keyword_tags: ["흐릿함", "감정 회피", "거짓말 가벼움", "두 얼굴", "자취 감춤"],
    info_rows: [
      { key: "키·체형", val: "보통 · 슬림" },
      { key: "얼굴상", val: "흐릿한 인상 · 살짝 멍한 톤" },
      { key: "이목구비", val: "눈 풀림 · 입술 흐림" },
      { key: "스타일", val: "톤다운 · 보헤미안" },
      { key: "분위기", val: "처음엔 신비로운데 잡으면 사라지는 결" },
      { key: "말의 속도", val: "느림 · 말끝 흐림" },
    ],
    ai_akyon: ai(
      "f-water-yin",
      "보통 키에 슬림. 흐릿한 인상에 살짝 멍한 톤. 눈이 풀려있고 입술도 흐려. 보헤미안 톤다운 옷차림.",
      "분위기가 처음엔 달빛처럼 신비로워. 근데 잡으려 하면 사라져. 거짓말이 가볍고 두 얼굴이 보여. 어느 날 자취를 감춰도 이상하지 않은 결이야.",
    ),
  },
];

export default function P4AkyonCasesPage() {
  return (
    <main
      className="bg-[#0a0a09] min-h-screen"
      data-paid-scene="yeonwoo"
      style={{ fontFamily: "var(--font-pretendard)" }}
    >
      <div className="max-w-[430px] mx-auto py-6 px-4">
        <header className="mb-6 text-center">
          <h1
            className="text-[20px] font-bold text-[#E8C9A0]"
            style={{ fontFamily: "var(--font-nanum-myeongjo)" }}
          >
            P-4 2-3 피해야 할 인연 — 20 slotId
          </h1>
          <p className="text-[12px] text-[#888] mt-2 leading-relaxed">
            사진 / keyword-tags 5 / 정보 그리드 6 row / AI 박스 모두 slotId 매트릭스 변형
            <br />
            AI 박스 마지막 단락은 임수+수 과다 가정 (실제 합성 시 placeholder 자동 치환)
          </p>
        </header>

        <div className="space-y-12">
          {CASES.map((c) => (
            <section key={c.slotId}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-bold text-[#0a0a09]"
                  style={{ background: "#E8C9A0" }}
                >
                  {c.label}
                </span>
                <span className="text-[13px] text-[#d8d6d0]">
                  {c.slotId} · {c.nickname}
                </span>
              </div>

              <SpouseImage
                character="yeonwoo"
                type="avoid"
                slotId={c.slotId}
                alt={`악연 — ${c.nickname}`}
              />
              <KeywordTags tags={c.keyword_tags} />
              <InfoGrid rows={c.info_rows} />
              <AiBlock text={c.ai_akyon} />
              <YeonwooBubble text="이런 기운 가진 사람 보이면 바로 끊어." />
            </section>
          ))}
        </div>

        <footer className="mt-10 mb-4 text-center text-[11px] text-[#666]">
          slotId 20 케이스 톤 검증 — 어색한 외형/태그/AI 박스 발견하면 알려주세요.
        </footer>
      </div>
    </main>
  );
}
