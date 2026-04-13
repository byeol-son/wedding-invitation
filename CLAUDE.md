# Wedding Invitation 프로젝트 지침

## 프로젝트 개요
- **목적:** 웨딩 초대장 정적 웹사이트
- **배포:** GitHub Pages (push하면 자동 배포, 1~3분 소요)
- **스택:** HTML / CSS / JavaScript (바닐라), Firebase Storage (갤러리/방명록)

## 핵심 파일 구조
- `script.js` 상단 `INVITE` 객체 — 날짜/장소/이름 등 핵심 설정
- `styles.css` — 모든 스타일
- `index.html` — 마크업
- `images/` — 사진 파일 (main2.jpg, gallery/, og.png)
- `storage.rules` — Firebase 보안 규칙 (쓰기 금지, 읽기만 허용)

## 주의사항
- Firebase API 키는 프론트엔드 공개 키라 노출 무방 (storage.rules로 쓰기 차단됨)
- 배포는 git push만 하면 됨 (별도 빌드 과정 없음)
- `.gitignore` 확인 후 민감 정보 커밋하지 않기

## 작업 히스토리 요약
- Hero 이미지 scale(1.1)로 확대, 상단 텍스트 흰색+그림자 처리
- "We are getting married!" 위치 top 22%로 조정
- 신현욱 ❤️ 손별 하트 이모지 유지 (script.js replace 제거)
