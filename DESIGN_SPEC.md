# Venice 스타일 청첩장 - 디자인 & 모션 스펙

## 📋 프로젝트 현재 상태

### 기술 스택
- **HTML5** (시맨틱 마크업)
- **CSS3** (CSS Variables, Flexbox, Grid)
- **Vanilla JavaScript** (ES6+)
- **이미지**: JPG (lazy loading)

### 현재 섹션 구조
1. **히어로** - 대표 사진 + 이름 + 날짜 (상하단 배치)
2. **초대글** - 인사말 + 신랑/신부 이름
3. **일정** - 달력 + 카운트다운
4. **오시는 길** - 예식장 정보 + 지도 + 교통 안내
5. **연락처** - 전화/문자 버튼
6. **참석 의사** - RSVP 폼 링크
7. **계좌번호** - 아코디언 토글
8. **갤러리** - 그리드 + 라이트박스
9. **공유** - URL 복사/공유 버튼

---

## 🎬 1단계: 모션 스펙 규격표

### A. 섹션 등장 애니메이션

| 요소 | 효과 | 거리 | 지속시간 | Easing | Delay |
|------|------|------|----------|-------|-------|
| 섹션 전체 | Fade + Slide Up | 24px | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 0ms |
| 섹션 제목 | Fade + Slide Up | 16px | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 100ms |
| 본문 텍스트 | Fade + Slide Up | 16px | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 150ms |
| 카드/버튼 | Fade + Scale | - | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 200ms |

**초기 상태:**
```css
opacity: 0;
transform: translateY(24px); /* 섹션 */
transform: translateY(16px); /* 텍스트 */
transform: scale(0.96); /* 카드 */
```

**최종 상태:**
```css
opacity: 1;
transform: translateY(0);
transform: scale(1);
```

### B. Stagger (순차 등장)

| 그룹 | 요소 간격 | 예시 |
|------|----------|------|
| 카운트다운 그리드 | 50ms | 일 → 시간 → 분 → 초 |
| 갤러리 이미지 | 30ms | 01 → 02 → 03 ... |
| 연락처 버튼 | 40ms | 전화 → 문자 → 전화 → 문자 |
| 계좌 항목 | 60ms | 신랑 → 혼주(부) → 신부 → 혼주(모) |

### C. 스크롤 Reveal (IntersectionObserver)

**옵션:**
- `rootMargin: '0px 0px -80px 0px'` (뷰포트 하단 80px 전에 트리거)
- `threshold: 0.1` (10% 보이면 시작)
- **애니메이션**: 위 A 규격 적용
- **한 번만 실행**: `once: true`

### D. 히어로 스크롤 반응

- **패럴럭스 효과 없음** (모바일 성능 고려)
- **오버레이 그라데이션**: 고정 (스크롤 시 변화 없음)
- **텍스트**: 고정 위치 (상하단)

### E. 토글/모달 트랜지션

#### 계좌 아코디언 (details)
- **열기**: `height` + `opacity` (300ms, `ease-out`)
- **닫기**: `height` + `opacity` (250ms, `ease-in`)
- **내용**: `transform: translateY(-8px)` → `translateY(0)` (200ms)

#### 갤러리 라이트박스
- **열기**: 
  - 배경: `opacity: 0` → `1` (200ms)
  - 이미지: `scale(0.9)` + `opacity: 0` → `scale(1)` + `opacity: 1` (350ms, `cubic-bezier(0.16, 1, 0.3, 1)`)
- **닫기**: 역순 (250ms)
- **이전/다음**: `translateX(-20px)` → `translateX(0)` (300ms)

### F. 클릭 피드백

| 요소 | 효과 | 지속시간 | Easing |
|------|------|----------|--------|
| 버튼 Press | `scale(0.97)` | 100ms | `ease-out` |
| 버튼 Release | `scale(1)` | 150ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 복사 토스트 | Fade In + Slide Up | 200ms | `ease-out` |
| 복사 토스트 사라짐 | Fade Out | 150ms | `ease-in` |

**토스트 위치:** 하단 중앙, `bottom: 24px`

### G. prefers-reduced-motion 대응

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* 즉시 표시 */
  .fade-in {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 🎨 2단계: 디자인 토큰 (Design Tokens)

### 색상 시스템

```css
:root {
  /* 배경 */
  --bg: #faf9f6;              /* 크림 베이스 */
  --paper: #ffffff;            /* 카드 배경 */
  
  /* 텍스트 */
  --text: #2c2c2c;             /* 본문 (고대비) */
  --text-muted: #8b8b8b;       /* 보조 텍스트 */
  --text-light: #ffffff;       /* 히어로 텍스트 */
  
  /* 액센트 */
  --accent: #b89f7a;           /* 골드 베이지 */
  --accent-dark: #9a8565;      /* 호버/활성 */
  --accent-light: #e8d5c4;    /* 로즈 톤 */
  
  /* 보더/라인 */
  --line: #e8e5e0;            /* 연한 구분선 */
  --line-strong: #d4d0c8;     /* 강한 구분선 */
  
  /* 상태 */
  --success: #6b8e6b;         /* 복사 성공 */
  --error: #c94848;           /* 에러 (사용 안 함) */
}
```

**원칙:**
- 과한 채도 금지 (고급스러운 인쇄물 느낌)
- 대비는 WCAG AA 기준 준수 (텍스트 가독성)
- 그림자는 부드럽고 얕게

### 타이포그래피

```css
:root {
  /* 폰트 패밀리 */
  --font-family: 
    "Apple SD Gothic Neo", 
    "Noto Sans KR", 
    -apple-system, 
    BlinkMacSystemFont, 
    "Segoe UI", 
    sans-serif;
  
  /* 크기 스케일 */
  --text-xs: 11px;      /* Kicker, Label */
  --text-sm: 13px;      /* 보조 텍스트 */
  --text-base: 14px;    /* 본문 기본 */
  --text-md: 15px;      /* 본문 강조 */
  --text-lg: 18px;      /* 카드 제목 */
  --text-xl: 20px;      /* 섹션 제목 */
  --text-2xl: 22px;     /* 이름 */
  --text-3xl: 36px;     /* 히어로 제목 */
  
  /* Weight */
  --weight-light: 300;   /* 사용 안 함 (가독성) */
  --weight-normal: 400;  /* 본문 */
  --weight-medium: 500;  /* 제목, 버튼 */
  --weight-semibold: 600; /* 강조 (사용 최소화) */
  
  /* Line Height */
  --leading-tight: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.9;
  
  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.15em; /* Kicker */
}
```

### 여백 스케일

```css
:root {
  /* Spacing Scale (4px 기준) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  
  /* 섹션 패딩 */
  --section-padding-y: 40px;
  --section-padding-x: 20px;
  
  /* 카드 패딩 */
  --card-padding: 24px 20px;
  
  /* 버튼 패딩 */
  --btn-padding-y: 14px;
  --btn-padding-x: 24px;
}
```

### 라운드 & 그림자

```css
:root {
  /* Border Radius */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-full: 999px;
  
  /* Shadow */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.08);
  
  /* 그림자 원칙: 부드럽고 얕게, 과하지 않게 */
}
```

---

## 📝 3단계: 구현 계획 (커밋 단위 체크리스트)

### Phase 1: 기반 구조 (Foundation)
- [ ] **커밋 1**: 디자인 토큰 CSS 변수 정의 (`styles.css` 상단)
- [ ] **커밋 2**: `prefers-reduced-motion` 미디어 쿼리 추가
- [ ] **커밋 3**: 공통 유틸리티 클래스 추가 (`.fade-in`, `.stagger-item`)

### Phase 2: 모션 컴포넌트 (Motion Components)
- [ ] **커밋 4**: IntersectionObserver 기반 `FadeIn` 컴포넌트 (JS)
- [ ] **커밋 5**: `StaggerIn` 컴포넌트 (순차 등장)
- [ ] **커밋 6**: 섹션에 FadeIn 적용 (초대글, 일정, 오시는길 등)

### Phase 3: 인터랙션 개선 (Interactions)
- [ ] **커밋 7**: 버튼 클릭 피드백 (scale 애니메이션)
- [ ] **커밋 8**: 계좌 아코디언 트랜지션 개선
- [ ] **커밋 9**: 갤러리 라이트박스 애니메이션 개선
- [ ] **커밋 10**: 복사 토스트 컴포넌트 추가

### Phase 4: 성능 최적화 (Performance)
- [ ] **커밋 11**: 이미지 lazy loading 최적화 (`loading="lazy"`, `decoding="async"`)
- [ ] **커밋 12**: 갤러리 이미지 스크롤 성능 개선 (will-change, contain)
- [ ] **커밋 13**: 애니메이션 GPU 가속 (transform, opacity만 사용)

### Phase 5: 반응형 & 접근성 (Responsive & A11y)
- [ ] **커밋 14**: iPhone SE (375px) 레이아웃 테스트 및 수정
- [ ] **커밋 15**: 키보드 네비게이션 개선 (포커스 스타일)
- [ ] **커밋 16**: 스크린 리더 개선 (aria-label, role)

### Phase 6: 최종 검증 (Final Polish)
- [ ] **커밋 17**: 모든 애니메이션 타이밍 일관성 검증
- [ ] **커밋 18**: OG 메타 태그 최종 확인
- [ ] **커밋 19**: 크로스 브라우저 테스트 (Safari, Chrome, Firefox)

---

## 🎯 구현 우선순위

1. **High Priority** (Phase 1-2): 기반 구조 + 섹션 등장 애니메이션
2. **Medium Priority** (Phase 3): 인터랙션 개선
3. **Low Priority** (Phase 4-6): 성능 최적화 및 폴리시

---

## 📐 컴포넌트 구조 (제안)

### CSS 구조
```css
/* 1. Design Tokens */
:root { /* 변수 정의 */ }

/* 2. Reset & Base */
* { /* 기본 스타일 */ }

/* 3. Utilities */
.fade-in { /* 애니메이션 클래스 */ }
.stagger-item { /* 순차 등장 */ }

/* 4. Components */
.hero { /* 히어로 섹션 */ }
.section { /* 섹션 공통 */ }
.card { /* 카드 */ }
.btn { /* 버튼 */ }
/* ... */

/* 5. Animations */
@keyframes fadeInUp { /* 등장 애니메이션 */ }
```

### JavaScript 구조
```javascript
// 1. Utils
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// 2. Motion Components
class FadeIn { /* IntersectionObserver 기반 */ }
class StaggerIn { /* 순차 등장 */ }

// 3. UI Components
class Toast { /* 토스트 메시지 */ }
class Lightbox { /* 갤러리 라이트박스 */ }
class Accordion { /* 아코디언 (기존 details 개선) */ }

// 4. Main
function init() { /* 초기화 */ }
```

---

## ✅ 완료 기준 (테스트 체크리스트)

- [ ] iPhone SE (375px) 레이아웃 깨짐 없음
- [ ] 스크롤 시 60fps 유지 (갤러리 포함)
- [ ] 모든 섹션이 스크롤 시 자연스럽게 등장
- [ ] 버튼 클릭 피드백 즉각적 (100ms 이내)
- [ ] 복사 토스트 정상 동작
- [ ] 라이트박스 열기/닫기 부드러움
- [ ] `prefers-reduced-motion` 시 애니메이션 최소화
- [ ] 텍스트 길어져도 자연스러운 줄바꿈
- [ ] OG 메타 태그 정상 (카톡 미리보기)
- [ ] 모든 애니메이션 일관성 (거리/속도/이징)

---

**다음 단계**: Phase 1부터 순차적으로 구현 시작
