# 모바일 청첩장 (정적 페이지 템플릿)

## 1) 빠른 수정 포인트
- `script.js` 상단의 `INVITE` 설정만 바꾸면 대부분 끝납니다.
- 대표 사진: `./images/main.jpg` 파일을 원하는 사진으로 교체
- 카톡 미리보기 이미지: `./images/og.jpg` 교체 + `index.html`의 og:title/og:description 수정

## 2) 갤러리 넣는 방법
1) `./images/gallery/` 폴더에 사진을 넣습니다. (예: 01.jpg, 02.jpg ...)
2) `script.js`의 `gallery.images`에 파일명을 동일하게 적습니다.

## 3) 배포(가장 쉬운 방법: Netlify)
- Netlify 사이트에 로그인 → "Add new site" → "Deploy manually"
- 이 폴더 전체를 드래그&드롭하면 바로 배포됩니다.

## 4) 자주 나는 문제
- 카톡 미리보기(OG)는 배포 후에도 캐시가 남습니다. 이미지/제목을 바꿨는데 안 바뀌면,
  카카오/페이스북 디버거로 캐시 갱신을 해주세요.
