# Firebase 방명록 기능 설정 가이드

이 가이드는 GitHub Pages로 배포된 웹사이트에 Firebase Firestore를 사용한 방명록 기능을 설정하는 방법을 안내합니다.

## 📋 사전 준비

1. Google 계정이 필요합니다
2. Firebase는 무료 티어를 제공합니다 (일일 읽기/쓰기 제한 내에서 무료)

## 🚀 설정 단계

### 1단계: Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `wedding-invitation`)
4. Google Analytics 설정은 선택사항 (필요 없으면 비활성화 가능)
5. "프로젝트 만들기" 클릭

### 2단계: 웹 앱 등록

1. Firebase Console에서 프로젝트 선택
2. 왼쪽 메뉴에서 "프로젝트 설정" (톱니바퀴 아이콘) 클릭
3. "내 앱" 섹션에서 웹 아이콘 (`</>`) 클릭
4. 앱 닉네임 입력 (예: `Wedding Invitation Web`)
5. "앱 등록" 클릭

> ⚠️ **중요**: Firebase Console에서 "npm" 또는 "CDN" 선택 화면이 나타나면, **어떤 것을 선택해도 상관없습니다**. 
> 이 프로젝트는 **npm 설치 없이 CDN을 통해 자동으로 Firebase를 로드**하므로, 
> Firebase Console에서 제공하는 **설정 객체(설정 정보)만 복사**하면 됩니다.

### 3단계: Firebase 설정 정보 복사

앱 등록 후 나타나는 Firebase 설정 객체를 복사합니다:

> 💡 **참고**: Firebase Console에서 코드 예시가 보이는데, 그 코드 전체를 사용할 필요는 없습니다. 
> **설정 객체(`firebaseConfig`)의 값들만** 복사하면 됩니다. 
> npm 설치나 `<script>` 태그 추가는 필요 없습니다!

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

### 4단계: Firestore 데이터베이스 생성

1. Firebase Console 왼쪽 메뉴에서 "Firestore Database" 클릭
2. "데이터베이스 만들기" 클릭
3. **"프로덕션 모드에서 시작"** 선택 (나중에 보안 규칙 수정)
4. 위치 선택 (가장 가까운 지역 선택, 예: `asia-northeast3 (Seoul)`)
5. "사용 설정" 클릭

### 5단계: Firestore 보안 규칙 설정

1. Firestore Database 페이지에서 "규칙" 탭 클릭
2. 다음 규칙으로 변경:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 방명록 컬렉션: 누구나 읽기/작성/수정/삭제 가능
    // ⚠️ 참고: 수정/삭제 기능을 사용하려면 아래 규칙을 사용하세요
    match /guestbook/{document} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'createdAt'])
                   && request.resource.data.name is string
                   && request.resource.data.message is string
                   && request.resource.data.name.size() <= 20
                   && request.resource.data.message.size() <= 500;
      // 수정/삭제 기능 사용 시 아래 주석 해제
      allow update: if request.resource.data.keys().hasAll(['name', 'message'])
                   && request.resource.data.name is string
                   && request.resource.data.message is string
                   && request.resource.data.name.size() <= 20
                   && request.resource.data.message.size() <= 500;
      allow delete: if true;
      
      // 수정/삭제 기능을 사용하지 않으려면 아래 규칙 사용:
      // allow update, delete: if false;
    }
  }
}
```

3. "게시" 클릭

### 6단계: 코드에 Firebase 설정 추가

1. `script.js` 파일을 엽니다
2. `INVITE` 객체의 `firebase` 섹션을 찾습니다 (약 68번째 줄)
3. 3단계에서 복사한 설정 정보의 **값들만** 입력합니다:

> 📝 **예시**: Firebase Console에서 다음과 같이 보이면:
> ```javascript
> const firebaseConfig = {
>   apiKey: "AIzaSyC...",
>   authDomain: "my-project.firebaseapp.com",
>   projectId: "my-project-id",
>   // ...
> };
> ```
> 
> `script.js`에는 이렇게 입력:
> ```javascript
> firebase: {
>   apiKey: "AIzaSyC...",  // firebaseConfig의 값만 복사
>   authDomain: "my-project.firebaseapp.com",
>   projectId: "my-project-id",
>   // ...
> }
> ```

```javascript
firebase: {
  apiKey: "AIza...",  // 여기에 실제 값 입력
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
},
```

### 7단계: 인덱스 생성 (선택사항)

Firestore에서 날짜순 정렬을 사용하므로 인덱스가 자동으로 생성될 수 있습니다. 
만약 콘솔에서 인덱스 생성 요청이 나타나면 "인덱스 만들기"를 클릭하세요.

## ✅ 완료!

이제 방명록 기능이 작동합니다. GitHub에 푸시하면 방명록을 작성하고 조회할 수 있습니다.

## 🔒 보안 참고사항

- Firebase API 키는 클라이언트에 노출되지만, Firestore 보안 규칙으로 데이터 보호가 가능합니다
- 위의 보안 규칙은 방명록 읽기와 작성만 허용하며, 수정/삭제는 불가능합니다
- 필요시 관리자만 수정/삭제할 수 있도록 인증 기능을 추가할 수 있습니다

## 🐛 문제 해결

### 방명록이 표시되지 않을 때
- 브라우저 콘솔(F12)에서 에러 메시지 확인
- Firebase 설정 정보가 올바른지 확인
- Firestore 보안 규칙이 올바르게 설정되었는지 확인

### 방명록 작성이 안 될 때
- Firestore 보안 규칙에서 `create` 권한이 있는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### Firebase 무료 제한
- 무료 티어: 일일 읽기 50,000회, 쓰기 20,000회
- 일반적인 결혼식 방명록 용도로는 충분합니다

## 📚 추가 리소스

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Firestore 보안 규칙 가이드](https://firebase.google.com/docs/firestore/security/get-started)
