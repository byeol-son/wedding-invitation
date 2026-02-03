// ============================================
// ⭐ 여기만 수정하면 됩니다 - 청첩장 설정 ⭐
// ============================================

const INVITE = {
  // ========== 상단 히어로 섹션 ==========
  hero: {
    title: "신현욱 ❤️ 손별",
    dateText: "2026년 7월 4일 토요일 오후 3시",
    placeText: "세인트메리엘, 세인트홀",
    kicker: "Wedding Invitation",
  },

  // ========== 신랑/신부 정보 ==========
  couple: {
    groom: { 
      name: "신현욱", 
      phone: "010-8734-5621", 
      parentsLine: "신유열 · 장옥수 의 장남" 
    },
    bride: { 
      name: "손별", 
      phone: "010-8200-1913", 
      parentsLine: "손주목 · 이옥례 의 장녀" 
    },
  },

  // ========== 초대 인사말 ==========
  invitationText: `3년이라는 시간 동안,\n우리는 서로의 하루를 더 다정하게 만드는 법을 배웠습니다.\n\n소중한 마음들이 쌓여 \n이제는 같은 방향으로 걸어가려 합니다.\n\n저희의 새로운 시작을 \n따뜻한 축복으로 함께해 주시면 감사하겠습니다.`,

  // ========== 예식 일정 ==========
  schedule: {
    weddingDateTime: "2026-07-04T15:00:00+09:00",
  },

  // ========== 예식장 정보 ==========
  venue: {
    name: "세인트메리엘",
    hall: "2층 세인트홀",
    address: "서울특별시 강남구 논현로79길 72 올림피아센터빌딩",
    kakaoMapUrl: "https://place.map.kakao.com/1478744978", 
    naverMapUrl: "https://naver.me/5JpUFe0x",
    googleMapUrl: "https://maps.app.goo.gl/8yqrqcgVFLrNswF87",
    mapQuery: "서울특별시 강남구 논현로79길 72 세인트메리엘",
    transportText: "지하철: 2호선 역삼역 1번 출구 도보 5분\n주차: 올림피아센터빌딩 내 주차 가능",
  },

  // ========== 참석 의사 전달 ==========
  rsvp: {
    formUrl: "https://forms.gle/pJCxp9tg9rurkp9p6",
  },

  // ========== 계좌번호 ==========
  accounts: {
    groomSide: [
      { label: "신랑", bank: "OO은행", number: "000-0000-0000-00" },
    ],
    brideSide: [
      { label: "손별", bank: "신한 은행", number: "110-385-059931" },
    ],
  },

  // ========== 갤러리 사진 ==========
  gallery: {
    images: ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg"],
  },

  // ========== Firebase 설정 ==========
  // ⚠️ Firebase 프로젝트 생성 후 아래 정보를 입력하세요
  // 설정 방법은 FIREBASE_SETUP.md 파일을 참고하세요
  firebase: {
    apiKey: "AIzaSyDj5ELPuBynx9IqWkrMJ5IqFLB5GOXh8Ok",
    authDomain: "wedding-invitation-2bbaf.firebaseapp.com",
    projectId: "wedding-invitation-2bbaf",
    storageBucket: "wedding-invitation-2bbaf.firebasestorage.app",
    messagingSenderId: "166603008244",
    appId: "1:166603008244:web:8f397024532ed0b57ed6a1"
  },
};

// ====== 로직 (버그 수정됨) ======
const $ = (sel) => (typeof sel === 'string' ? document.querySelector(sel) : sel);
const $$ = (sel) => (typeof sel === 'string' ? document.querySelectorAll(sel) : sel);

class FadeIn {
  constructor(selector, options = {}) {
    this.elements = $$(selector);
    this.options = {
      rootMargin: options.rootMargin || '0px 0px -80px 0px',
      threshold: options.threshold || 0.1,
      once: options.once !== false,
      ...options
    };
    this.init();
  }

  init() {
    if (!this.elements.length || !window.IntersectionObserver) {
      this.elements.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (this.options.once) observer.unobserve(entry.target);
        } else if (!this.options.once) {
          // 깜빡거림 방지: threshold를 높여서 완전히 벗어났을 때만 제거
          // 또는 아예 제거하지 않고 유지
          // entry.target.classList.remove('visible');
        }
      });
    }, {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    });
    this.elements.forEach(el => observer.observe(el));
  }
}

class StaggerIn {
  constructor(target, options = {}) {
    this.container = (typeof target === 'string') ? $(target) : target;
    if (!this.container) return;

    this.items = Array.from(this.container.children);
    this.options = {
      delay: options.delay || 50,
      rootMargin: options.rootMargin || '0px 0px -80px 0px',
      threshold: options.threshold || 0.1,
      once: options.once !== false,   // 기본 true, false면 반복
      ...options
    };
    this.init();
  }

  init() {
    if (!this.items.length || !window.IntersectionObserver) {
      this.items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * this.options.delay);
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.items.forEach((item, index) => {
            // 이미 visible이 아닐 때만 애니메이션 실행
            if (!item.classList.contains('visible')) {
              setTimeout(() => item.classList.add('visible'), index * this.options.delay);
            }
          });
          if (this.options.once) observer.unobserve(entry.target);
        } else if (!this.options.once) {
          // 깜빡거림 방지: visible 상태 유지
          // this.items.forEach(item => item.classList.remove('visible'));
        }
      });
    }, {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    });

    observer.observe(this.container);
  }
}

function setText(id, value){ const el = $(id); if(el) el.textContent = value; }

function initHero(){
  const dateMatch = INVITE.hero.dateText.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  if (dateMatch) {
    setText("#heroDate", `${dateMatch[1]}.${String(dateMatch[2]).padStart(2, '0')}.${String(dateMatch[3]).padStart(2, '0')}`);
  }
  const timeMatch = INVITE.hero.dateText.match(/(오전|오후)\s*(\d{1,2})시/);
  if (timeMatch) {
    setText("#heroTime", `${timeMatch[2]}:00 ${timeMatch[1] === '오전' ? 'AM' : 'PM'}`);
  }
  setText("#heroVenueTop", INVITE.hero.placeText.split(',')[0].trim().toUpperCase());
  setText("#heroScript", "We are getting married");
  setText("#heroNames", INVITE.hero.title.replace('❤️', '·'));
  setText("#heroVenue", INVITE.hero.placeText);
}

function initNames(){
  setText("#groomParents", INVITE.couple.groom.parentsLine);
  setText("#groomName", INVITE.couple.groom.name);
  setText("#brideParents", INVITE.couple.bride.parentsLine);
  setText("#brideName", INVITE.couple.bride.name);
  setText("#invitationText", INVITE.invitationText);
}

function parseWeddingDate(){ return new Date(INVITE.schedule.weddingDateTime); }

function initCalendar(){
  const d = parseWeddingDate();
  if (isNaN(d.getTime())) return;
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  setText("#scheduleYear", String(year));
  setText("#scheduleMonth", String(month).padStart(2, "0"));
  const first = new Date(year, month-1, 1);
  const last = new Date(year, month, 0);
  const weddingDay = d.getDate();
  const dow = ["일","월","화","수","목","금","토"];
  const grid = $("#calendar");
  if(!grid) return;
  grid.innerHTML = "";
  dow.forEach((w, i) => {
    const cell = document.createElement("div");
    cell.className = "cal__cell cal__dow";
    cell.textContent = w;
    if(i===0) cell.style.color = "#c94848";
    if(i===6) cell.style.color = "#3d63b8";
    grid.appendChild(cell);
  });
  for(let i=0;i<first.getDay();i++){
    const cell = document.createElement("div");
    cell.className = "cal__cell cal__empty";
    cell.textContent = ".";
    grid.appendChild(cell);
  }
  for(let day=1; day<=last.getDate(); day++){
    const cell = document.createElement("div");
    const dayOfWeek = new Date(year, month-1, day).getDay();
    let cls = "cal__cell cal__day";
    if(day === weddingDay) cls += " cal__day--wedding";
    if(dayOfWeek === 0) cls += " cal__day--sun";
    if(dayOfWeek === 6) cls += " cal__day--sat";
    cell.className = cls;
    cell.textContent = String(day);
    grid.appendChild(cell);
  }
}

function initCountdown(){
  const target = parseWeddingDate();
  if (isNaN(target.getTime())) return;
  const whenText = $("#whenText");
  if (whenText) whenText.textContent = INVITE.hero.dateText;
  const tick = () => {
    const now = new Date();
    let diff = target.getTime() - now.getTime();
    if (diff < 0) diff = 0;
    const s = Math.floor(diff/1000);
    setText("#dday", String(Math.floor(s / (3600*24))));
    setText("#hh", String(Math.floor((s % (3600*24)) / 3600)).padStart(2,"0"));
    setText("#mm", String(Math.floor((s % 3600) / 60)).padStart(2,"0"));
    setText("#ss", String(s % 60).padStart(2,"0"));
  };
  tick();
  setInterval(tick, 1000);
}

function initVenue(){
  setText("#venueName", INVITE.venue.name);
  setText("#venueHall", INVITE.venue.hall);
  setText("#venueAddress", INVITE.venue.address);
  setText("#transportText", INVITE.venue.transportText);
  const btnKakao = $("#btnKakao");
  const btnNaver = $("#btnNaver");
  const btnGoogle = $("#btnGoogle");
  if(btnKakao) btnKakao.href = INVITE.venue.kakaoMapUrl;
  if(btnNaver) btnNaver.href = INVITE.venue.naverMapUrl;
  if(btnGoogle) btnGoogle.href = INVITE.venue.googleMapUrl;
}

function initContacts(){
  const groom = INVITE.couple.groom;
  const bride = INVITE.couple.bride;
  $("#callGroom")?.addEventListener("click", () => location.href = `tel:${groom.phone}`);
  $("#smsGroom")?.addEventListener("click", () => location.href = `sms:${groom.phone}`);
  $("#callBride")?.addEventListener("click", () => location.href = `tel:${bride.phone}`);
  $("#smsBride")?.addEventListener("click", () => location.href = `sms:${bride.phone}`);
}

class Toast {
  constructor(message) {
    this.message = message;
    this.show();
  }
  show() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = this.message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => document.body.removeChild(toast), 150);
    }, 2000);
  }
}

function copyToClipboard(text){
  return navigator.clipboard?.writeText(text).then(() => new Toast('복사되었습니다'))
    .catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      new Toast('복사되었습니다');
    });
}

function renderAccounts(list, mountSel){
  const mount = $(mountSel);
  if(!mount) return;
  mount.innerHTML = "";
  list.forEach((a) => {
    const row = document.createElement("div");
    row.className = "account-row";
    row.style.cssText = "display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px dashed #e9e6e1";
    row.innerHTML = `<div><div style="font-weight:650">${a.label}</div><div style="color:#6b6b6b;font-size:13px">${a.bank} · ${a.number}</div></div>`;
    const btn = document.createElement("button");
    btn.className = "btn"; btn.textContent = "복사";
    btn.addEventListener("click", () => copyToClipboard(`${a.bank} ${a.number}`));
    row.appendChild(btn);
    mount.appendChild(row);
  });
  if(mount.lastElementChild) mount.lastElementChild.style.borderBottom = "0";
}

function initRSVP(){ const a = $("#btnRsvp"); if(a) a.href = INVITE.rsvp.formUrl; }

function initGallery(){
  const mount = $("#gallery");
  const imgs = INVITE.gallery.images || [];
  if(!mount) return;
  mount.innerHTML = "";
  const fullPaths = imgs.map(f => `./images/gallery/${f}`);
  fullPaths.forEach((src, idx) => {
    const img = document.createElement("img");
    img.className = "gallery__img stagger-item";
    img.src = src;
    img.addEventListener("click", () => openLightbox(idx));
    mount.appendChild(img);
  });

  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  let current = 0;
  function openLightbox(idx){ current = idx; lbImg.src = fullPaths[current]; lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  $("#lbClose").addEventListener("click", () => { lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; });
  $("#lbPrev").addEventListener("click", () => { current = (current - 1 + fullPaths.length) % fullPaths.length; lbImg.src = fullPaths[current]; });
  $("#lbNext").addEventListener("click", () => { current = (current + 1) % fullPaths.length; lbImg.src = fullPaths[current]; });
}

function initShare(){
  $("#btnCopyUrl")?.addEventListener("click", () => copyToClipboard(location.href));
  $("#btnShare")?.addEventListener("click", () => {
    if (navigator.share) navigator.share({ title: document.title, url: location.href });
    else copyToClipboard(location.href);
  });
}

function initAnimations(){
  // 애니메이션은 유지하되, 깜빡거림 방지를 위해 visible 상태는 유지
  new FadeIn('.section.fade-in', { once: false, rootMargin: '0px 0px -100px 0px', threshold: 0.15 });
  new StaggerIn('.countdown__grid', { delay: 100, once: false, rootMargin: '0px 0px -100px 0px', threshold: 0.15 });
  new StaggerIn('.gallery', { delay: 80, once: false, rootMargin: '0px 0px -100px 0px', threshold: 0.15 });
  new StaggerIn('.contactGrid', { delay: 80, once: false, rootMargin: '0px 0px -100px 0px', threshold: 0.15 });
  new FadeIn('.card.scale-in', { once: false, rootMargin: '0px 0px -100px 0px', threshold: 0.15 });
  
  // 버튼 행
  $$('.btnRow').forEach(btnRow => {
    new StaggerIn(btnRow, { delay: 100, once: false, rootMargin: '0px 0px -100px 0px', threshold: 0.15 });
  });
}

// ============================================
// 방명록 기능 (Firebase Firestore)
// ============================================

let db = null;

async function initFirebase() {
  const guestbookSection = $('.guestbook-section');
  
  if (!guestbookSection) {
    console.warn('방명록 섹션을 찾을 수 없습니다.');
    return;
  }

  // Firebase 설정이 완료되지 않았으면 방명록 기능 비활성화
  if (!INVITE.firebase || INVITE.firebase.apiKey === "YOUR_API_KEY" || !INVITE.firebase.apiKey) {
    console.warn('Firebase 설정이 완료되지 않았습니다. 방명록 섹션을 숨깁니다.');
    guestbookSection.style.display = 'none';
    return;
  }

  console.log('Firebase 초기화 시작...', INVITE.firebase.projectId);

  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    const app = initializeApp(INVITE.firebase);
    db = getFirestore(app);
    
    console.log('Firebase 초기화 성공!');
    
    // 방명록 기능 초기화
    initGuestbook();
  } catch (error) {
    console.error('Firebase 초기화 실패:', error);
    // 에러가 발생해도 섹션은 보이도록 하고 에러 메시지 표시
    guestbookSection.style.display = 'block';
    const form = $("#guestbookForm");
    if (form) {
      form.innerHTML = '<div class="card"><div class="card__desc" style="color: #c94848;">방명록 기능을 사용할 수 없습니다.<br>브라우저 콘솔을 확인해주세요.</div></div>';
    }
  }
}

function initGuestbook() {
  const form = $("#guestbookForm");
  const list = $("#guestbookList");
  const messageInput = $("#guestMessage");
  const charCount = $("#charCount");
  const submitBtn = $("#submitGuestbook");
  const submitText = $("#submitText");
  const submitLoading = $("#submitLoading");

  if (!form || !list) return;

  // 글자 수 카운터
  if (messageInput && charCount) {
    messageInput.addEventListener('input', (e) => {
      charCount.textContent = e.target.value.length;
    });
  }

  // 폼 제출
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nameInput = $("#guestName");
    if (!nameInput || !messageInput) return;

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      new Toast('이름과 메시지를 모두 입력해주세요');
      return;
    }

    // 제출 버튼 비활성화
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';

    try {
      const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
      
      await addDoc(collection(db, 'guestbook'), {
        name: name,
        message: message,
        createdAt: serverTimestamp(),
      });

      // 폼 초기화
      form.reset();
      charCount.textContent = '0';
      new Toast('방명록이 등록되었습니다!');
    } catch (error) {
      console.error('방명록 등록 실패:', error);
      new Toast('방명록 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      submitBtn.disabled = false;
      submitText.style.display = 'inline';
      submitLoading.style.display = 'none';
    }
  });

  // 방명록 목록 불러오기
  loadGuestbook();
}

async function loadGuestbook() {
  const list = $("#guestbookList");
  if (!list || !db) return;

  list.innerHTML = '<div class="guestbook-loading">방명록을 불러오는 중...</div>';

  try {
    const { collection, query, orderBy, limit, onSnapshot } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    // Firestore에서 최신 50개만 가져오기
    const q = query(
      collection(db, 'guestbook'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        list.innerHTML = '<div class="guestbook-empty">아직 방명록이 없습니다.<br>첫 번째 축하 메시지를 남겨주세요! 💕</div>';
        return;
      }

      list.innerHTML = '';
      snapshot.forEach((doc) => {
        const data = doc.data();
        const item = createGuestbookItem(data, doc.id);
        list.appendChild(item);
      });
    }, (error) => {
      console.error('방명록 불러오기 실패:', error);
      list.innerHTML = '<div class="guestbook-empty">방명록을 불러올 수 없습니다.</div>';
    });
  } catch (error) {
    console.error('Firestore 모듈 로드 실패:', error);
    list.innerHTML = '<div class="guestbook-empty">방명록을 불러올 수 없습니다.</div>';
  }
}

function createGuestbookItem(data, docId) {
  const item = document.createElement('div');
  item.className = 'guestbook-item';
  item.dataset.docId = docId;

  const name = data.name || '익명';
  const message = data.message || '';
  const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
  
  const dateStr = formatDate(createdAt);

  item.innerHTML = `
    <div class="guestbook-item__header">
      <div class="guestbook-item__name">${escapeHtml(name)}</div>
      <div class="guestbook-item__header-right">
        <div class="guestbook-item__date">${dateStr}</div>
        <div class="guestbook-item__more-wrapper">
          <button class="guestbook-item__more" data-doc-id="${docId}" aria-label="더보기">⋯</button>
          <div class="guestbook-item__dropdown" style="display: none;">
            <button class="guestbook-item__dropdown-item btn--edit" data-doc-id="${docId}" data-name="${escapeHtml(name)}" data-message="${escapeHtml(message)}">수정</button>
            <button class="guestbook-item__dropdown-item btn--delete" data-doc-id="${docId}">삭제</button>
          </div>
        </div>
      </div>
    </div>
    <div class="guestbook-item__message" data-message="${escapeHtml(message)}">${escapeHtml(message)}</div>
  `;

  // 더보기 버튼 이벤트 (드롭다운)
  const moreBtn = item.querySelector('.guestbook-item__more');
  const dropdown = item.querySelector('.guestbook-item__dropdown');
  
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdown.style.display !== 'none';
    dropdown.style.display = isVisible ? 'none' : 'block';
  });

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener('click', (e) => {
    if (!item.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  // 수정 버튼 이벤트
  const editBtn = item.querySelector('.btn--edit');
  editBtn.addEventListener('click', () => {
    dropdown.style.display = 'none';
    editGuestbook(docId, name, message);
  });

  // 삭제 버튼 이벤트
  const deleteBtn = item.querySelector('.btn--delete');
  deleteBtn.addEventListener('click', () => {
    dropdown.style.display = 'none';
    deleteGuestbook(docId);
  });

  return item;
}

async function editGuestbook(docId, currentName, currentMessage) {
  const newName = prompt('이름을 수정하세요:', currentName);
  if (newName === null) return; // 취소

  const newMessage = prompt('메시지를 수정하세요:', currentMessage);
  if (newMessage === null) return; // 취소

  if (!newName.trim() || !newMessage.trim()) {
    new Toast('이름과 메시지를 모두 입력해주세요');
    return;
  }

  try {
    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    await updateDoc(doc(db, 'guestbook', docId), {
      name: newName.trim(),
      message: newMessage.trim(),
      updatedAt: new Date()
    });

    new Toast('방명록이 수정되었습니다!');
  } catch (error) {
    console.error('방명록 수정 실패:', error);
    new Toast('방명록 수정에 실패했습니다. 다시 시도해주세요.');
  }
}

async function deleteGuestbook(docId) {
  if (!confirm('정말 이 방명록을 삭제하시겠습니까?')) {
    return;
  }

  try {
    const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    await deleteDoc(doc(db, 'guestbook', docId));
    new Toast('방명록이 삭제되었습니다!');
  } catch (error) {
    console.error('방명록 삭제 실패:', error);
    new Toast('방명록 삭제에 실패했습니다. 다시 시도해주세요.');
  }
}

function formatDate(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function main(){
  initHero(); initNames(); initCalendar(); initCountdown(); initVenue();
  initContacts(); initRSVP(); initGallery(); initShare();
  renderAccounts(INVITE.accounts.groomSide, "#groomAccounts");
  renderAccounts(INVITE.accounts.brideSide, "#brideAccounts");
  setTimeout(initAnimations, 100);
  
  // 방명록 섹션이 있는지 확인
  const guestbookSection = $('.guestbook-section');
  if (guestbookSection) {
    console.log('방명록 섹션 발견:', guestbookSection);
    // 일단 보이도록 설정 (Firebase 초기화 전에)
    guestbookSection.style.display = 'block';
  } else {
    console.error('방명록 섹션을 찾을 수 없습니다!');
  }
  
  initFirebase(); // Firebase 초기화
}

document.addEventListener("DOMContentLoaded", main);
