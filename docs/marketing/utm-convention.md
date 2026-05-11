# UTM 트래킹 컨벤션 — 도화선

> 프로젝트: `dohwaseon-main` (appId `813226`, 도메인 `https://www.dohwaseonsaju.com`)
> 마지막 갱신: 2026-05-07

도화선의 모든 외부 유입 URL에 부착할 UTM 파라미터의 단일 진실원. 이 문서를 따르면 Amplitude `gp:initial_utm_*` 속성으로 채널별·캠페인별·크리에이티브별 전환 분석이 가능해진다.

---

## 1. UTM이 무엇이고 왜 필요한가

UTM은 URL 끝에 붙이는 5개 쿼리 파라미터로, **사용자가 어디서 어떤 캠페인을 보고 들어왔는지** 식별하는 표준 방식이다. Amplitude SDK는 첫 방문 시점에 이 값을 자동으로 user property(`gp:initial_utm_*`)로 기록한다. UTM 없이 들어온 사용자는 `(none)`으로 분류되어 organic/direct로 해석.

현재 상황: `dohwaseon-dev` 기준 Last 30 Days 모든 사용자(115명)가 `(none)` — localhost 환경이라 정상. main 도메인에 트래픽 흐르기 전에 컨벤션을 확정하는 것이 이 문서의 목적.

---

## 2. UTM 5개 파라미터 역할

| 파라미터 | 역할 | 예시 |
| --- | --- | --- |
| `utm_source` | **어디서 왔는가** (플랫폼명) | `instagram`, `tiktok`, `x`, `youtube`, `google`, `kakao`, `naver`, `blog_naver`, `theqoo`, `qr` |
| `utm_medium` | **어떤 형식인가** (포맷/유료여부) | `organic`, `cpc`, `social`, `email`, `story`, `reel`, `post`, `bio`, `video`, `banner`, `qr_offline` |
| `utm_campaign` | **어느 캠페인인가** (목적+YYYYMM) | `launch_202605`, `valentine_202602`, `awareness_q2` |
| `utm_content` | **어떤 크리에이티브인가** (A/B 식별) | `red_thread_v1`, `couple_silhouette`, `story_15s` |
| `utm_term` | **검색 키워드** (paid search 한정) | `사주`, `무료사주`, `연애운` |

---

## 3. 명명 규칙 (필수 준수)

| 규칙 | 예시 | 위반 시 |
| --- | --- | --- |
| **소문자만** 사용 | ✅ `instagram` ❌ `Instagram` | 같은 채널이 두 이름으로 분산 |
| **공백 금지**, 단어 구분은 `_` 또는 `-` | ✅ `blog_naver` ❌ `blog naver` | URL 인코딩으로 `%20` 섞이며 깨짐 |
| **한글 금지** | ✅ `valentine_202602` ❌ `발렌타인_202602` | 인코딩 깨짐 + 분석 UI에서 가독성 0 |
| **utm_source는 플랫폼 풀네임** | ✅ `instagram` ❌ `ig`, `insta` | 줄임말 다양화로 분산 |
| **utm_medium은 enum 고정** | 아래 [4-2 enum set](#4-2-utm_medium-enum-set) 참조 | 자유 입력 시 통계 깨짐 |
| **utm_campaign은 `목적_YYYYMM`** | `launch_202605` | 시계열 정렬 가능 |
| **본인 사이트 내부 링크에 UTM 절대 금지** | 외부 → 내부만 부착, 내부 간 이동은 plain | 세션 끊김, 데이터 왜곡 |

---

## 4. enum set (확정값)

### 4-1. utm_source enum

| 값 | 채널 |
| --- | --- |
| `instagram` | Instagram |
| `tiktok` | TikTok |
| `x` | X (구 Twitter) |
| `youtube` | YouTube |
| `google` | Google (Ads / Search) |
| `naver` | 네이버 (검색광고 / 검색결과) |
| `kakao` | 카카오 (모먼트 / 채널) |
| `blog_naver` | 네이버 블로그 |
| `blog_tistory` | 티스토리 |
| `blog_brunch` | 브런치 |
| `theqoo` | 더쿠 |
| `dcinside` | 디시인사이드 |
| `instiz` | 인스티즈 |
| `qr` | 오프라인 QR 코드 |
| `email` | 이메일/뉴스레터 |
| `partner` | 제휴 인플루언서/블로거 |

신규 채널 추가 시 이 표에 먼저 등록 → 그 다음 사용.

### 4-2. utm_medium enum set

| 값 | 의미 |
| --- | --- |
| `organic` | 무료 게시물 (블로그 글, 커뮤니티 등) |
| `cpc` | 유료 검색/디스플레이 광고 (Pay Per Click) |
| `social` | 소셜 광고 일반 |
| `post` | 피드 게시물 (IG/X) |
| `story` | 스토리 (IG) |
| `reel` | 릴스 (IG) |
| `video` | 영상 본문 (TikTok/YouTube) |
| `description` | 영상 설명란 (YouTube) |
| `bio` | 프로필 링크 (IG/TT/X/YT) |
| `channel_msg` | 카카오톡 채널 메시지 |
| `email` | 이메일 본문 |
| `banner` | 배너 광고 (디스플레이) |
| `qr_offline` | 오프라인 QR (전단지/포스터/카페 거치) |

### 4-3. utm_campaign 명명 규칙

`{목적}_{YYYYMM}` 형식 권장. 예시:
- `launch_202605` — 5월 런칭 캠페인
- `valentine_202602` — 발렌타인 시즌
- `awareness_q2` — Q2 인지도 캠페인 (분기 단위)
- `cafe_event_202605` — 5월 카페 이벤트 콜라보

### 4-4. utm_content 명명 규칙

크리에이티브 A/B 식별. 자유로우나 `목적_버전` 권장:
- `red_thread_v1`, `red_thread_v2` — 붉은 실 컨셉 시안 1·2
- `couple_silhouette` — 커플 실루엣 시안
- `story_15s`, `story_30s` — 길이 변형

---

## 5. 채널별 즉시 사용 URL 12종

### 무료 게시 (organic)

```
1. Instagram 피드 게시물
https://www.dohwaseonsaju.com/?utm_source=instagram&utm_medium=post&utm_campaign=launch_202605

2. Instagram 스토리
https://www.dohwaseonsaju.com/?utm_source=instagram&utm_medium=story&utm_campaign=launch_202605

3. Instagram 릴스
https://www.dohwaseonsaju.com/?utm_source=instagram&utm_medium=reel&utm_campaign=launch_202605

4. Instagram 프로필 링크 (bio)
https://www.dohwaseonsaju.com/?utm_source=instagram&utm_medium=bio&utm_campaign=launch_202605

5. TikTok 영상 캡션
https://www.dohwaseonsaju.com/?utm_source=tiktok&utm_medium=video&utm_campaign=launch_202605

6. TikTok 프로필 링크 (bio)
https://www.dohwaseonsaju.com/?utm_source=tiktok&utm_medium=bio&utm_campaign=launch_202605

7. X 트윗
https://www.dohwaseonsaju.com/?utm_source=x&utm_medium=post&utm_campaign=launch_202605

8. YouTube 설명란
https://www.dohwaseonsaju.com/?utm_source=youtube&utm_medium=description&utm_campaign=launch_202605
```

### 메시지·블로그·커뮤니티

```
9. 카카오톡 채널 메시지
https://www.dohwaseonsaju.com/?utm_source=kakao&utm_medium=channel_msg&utm_campaign=launch_202605

10. 네이버 블로그 게시물
https://www.dohwaseonsaju.com/?utm_source=blog_naver&utm_medium=organic&utm_campaign=launch_202605

11. 커뮤니티 (더쿠 예시 — dcinside, instiz도 동일 패턴)
https://www.dohwaseonsaju.com/?utm_source=theqoo&utm_medium=organic&utm_campaign=launch_202605
```

### 오프라인

```
12. QR 코드 (전단지·포스터·카페 거치)
https://www.dohwaseonsaju.com/?utm_source=qr&utm_medium=qr_offline&utm_campaign=cafe_event_202605
```

### 유료 광고는 utm_content로 A/B 분리

```
?utm_source=instagram&utm_medium=cpc&utm_campaign=launch_202605&utm_content=red_thread_v1
?utm_source=instagram&utm_medium=cpc&utm_campaign=launch_202605&utm_content=couple_silhouette_v2
?utm_source=tiktok&utm_medium=cpc&utm_campaign=launch_202605&utm_content=story_15s
?utm_source=google&utm_medium=cpc&utm_campaign=launch_202605&utm_term=무료사주
```

→ "어느 크리에이티브가 결제 전환 더 잘 일으키는가" 즉석 비교 가능.

---

## 6. 광고 플랫폼 자동 click ID (UTM 없이도 추적됨)

Google/Meta/TikTok/카카오 등은 광고 집행 시 자동으로 click ID를 URL에 붙여준다. Amplitude SDK가 이를 별도 user property로 자동 기록.

| 광고 플랫폼 | 자동 추가 파라미터 | Amplitude 속성 |
| --- | --- | --- |
| Google Ads | `?gclid=...` | `gp:initial_gclid` |
| Meta (Facebook/Instagram Ads) | `?fbclid=...` | `gp:initial_fbclid` |
| TikTok Ads | `?ttclid=...` | `gp:initial_ttclid` |
| 카카오 모먼트 | `?ko_click_id=...` | `gp:initial_ko_click_id` |
| Microsoft Ads | `?msclkid=...` | `gp:initial_msclkid` |
| X Ads | `?twclid=...` | `gp:initial_twclid` |
| LinkedIn Ads | `?li_fat_id=...` | `gp:initial_li_fat_id` |
| Reddit Ads | `?rdt_cid=...` | `gp:initial_rdt_cid` |

→ click ID는 자동, **UTM은 수동으로 직접 추가**해야 함. 둘 다 있으면 분석 깊이 배가.

---

## 7. DA/Marketing Team에서 직접 해야 할 일

> 본 문서의 컨벤션을 적용해 실제 외부 채널에 UTM URL을 배포하는 작업은 DA/Marketing Team의 역할이다.

### 7-1. 즉시 (1~2일 내)

| # | 작업 | 위치 |
| --- | --- | --- |
| 1 | **Instagram 프로필 bio 링크 교체** | IG 앱 → 프로필 편집 → 웹사이트 필드에 위 4번 URL 붙여넣기 |
| 2 | **TikTok 프로필 bio 링크 교체** | TikTok 앱 → 프로필 편집 → 웹사이트 필드에 6번 URL |
| 3 | **X 프로필 웹사이트 링크 교체** | X 앱 → 프로필 편집 → 웹사이트 필드에 7번 URL |
| 4 | **YouTube 채널 링크 교체** | YouTube Studio → 사용자 정의 → 기본 정보 → 링크에 8번 URL |
| 5 | **카카오톡 채널 홈 링크 교체** | 카카오 채널 관리자 → 홈 설정 → 외부 링크에 9번 URL |

### 7-2. 게시물·캠페인 발행 시 (상시)

| # | 작업 | 비고 |
| --- | --- | --- |
| 6 | **새 게시물 캡션에 UTM URL 사용** | 채널·포맷에 맞는 utm_medium 골라 위 표에서 복붙 |
| 7 | **유료 광고 집행 시 URL 필드에 UTM 입력** | Meta Ads Manager / TikTok Ads / Google Ads / 카카오 모먼트 / 네이버 광고 — 도달 URL 필드에 직접 입력. utm_content로 크리에이티브별 분리 |
| 8 | **카카오톡 채널 메시지 푸시 발송** | 본문 링크에 9번 URL (또는 캠페인별 변형) |
| 9 | **블로거·인플루언서 협업** | 협업 메시지에 11번 URL 또는 utm_source=partner&utm_content={partner_name} 변형 동봉 |
| 10 | **이메일/뉴스레터 발송** | 본문 모든 링크에 `?utm_source=email&utm_medium=email&utm_campaign={캠페인명}` 부착 |
| 11 | **오프라인 행사·카페 거치** | QR 코드 생성 시 12번 URL을 utm_campaign만 행사명으로 변경해 사용 |

### 7-3. 정기 (월 1회)

| # | 작업 |
| --- | --- |
| 12 | **신규 채널·캠페인이 생기면 본 문서 enum set에 먼저 등록** ([4-1](#4-1-utm_source-enum)·[4-2](#4-2-utm_medium-enum-set) 표 업데이트) |
| 13 | **utm_campaign 명명을 `목적_YYYYMM` 형식으로 통일했는지 점검** |
| 14 | **Amplitude 콘솔에서 `gp:initial_utm_*` 속성 트래킹 플랜 등록** (Settings → Tracking Plan → Properties — 7개 속성: utm_source/medium/campaign/term/content/id/initial_referring_domain) |

### 7-4. 절대 금지 ❌

| 금지 사항 | 이유 |
| --- | --- |
| 본인 사이트 내부 링크에 UTM 부착 | 세션 끊겨서 새 유입으로 잘못 잡힘 |
| 한글 utm 값 | URL 인코딩 깨짐 |
| 매번 다른 컨벤션 | 같은 채널이 여러 이름으로 분산 → 분석 불가 |
| utm_term을 광고 식별에 오용 | 표준은 paid search 키워드 한정. 식별은 utm_content |

---

## 8. 분석은 어떻게 보는가

main 도메인에 트래픽 쌓이기 시작하면 Amplitude MCP로 즉석 질의:

- "5월 인스타 vs 틱톡 결제 전환율"
- "utm_campaign=launch_202605 유입 사용자의 무료 퍼널 완주율"
- "utm_content별 결제 의도율 비교 (`pay_cta_click`)"
- "organic(`(none)`) vs paid 사용자의 콘텐츠 도달률(`max_scroll`) 차이"
- "카카오 광고 vs 네이버 광고 캐릭터 선택 비중 차이"

차트 슬롯 여유가 있으면 "**유입 채널별 일일 신규 사용자**"(`utm_source` × `landing_enter` unique) 1개를 D-1 일일 모니터링에 추가 검토.

---

## 9. 참고 자료

- Amplitude 공식 가이드: <https://amplitude.com/docs/data/sources/marketing-attribution>
- Google Campaign URL Builder: <https://ga-dev-tools.google/campaign-url-builder/>
- 도화선 이벤트 명세: [`docs/amplitude/amplitude-dashboards.md`](../amplitude/amplitude-dashboards.md)
