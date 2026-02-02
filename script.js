// ============================================
// ⭐ 여기만 수정하면 됩니다 - 청첩장 설정 ⭐
// ============================================

const INVITE = {
  // ========== 상단 히어로 섹션 ==========
  hero: {
    // 신랑과 신부 이름 (하트 이모지 포함 가능)
    title: "신현욱 ❤️ 손별",
    
    // 예식 일시 (예: "2026년 7월 4일 토요일 오후 3시")
    dateText: "2026년 7월 4일 토요일 오후 3시",
    
    // 예식장 이름과 홀 정보
    placeText: "세인트메리엘, 세인트홀",
    
    // 상단 작은 텍스트 (영문 또는 한글)
    kicker: "Wedding Invitation",
    
    // 대표 사진: ./images/main.jpg 파일을 교체하면 됨
  },

  // ========== 신랑/신부 정보 ==========
  couple: {
    groom: { 
      name: "신랑",                    // 신랑 이름
      phone: "010-8734-5621",         // 신랑 전화번호
      parentsLine: "아버지 · 어머니 의 아들"  // 신랑 부모님 정보
    },
    bride: { 
      name: "신부",                    // 신부 이름
      phone: "010-8200-1913",         // 신부 전화번호
      parentsLine: "아버지 · 어머니 의 딸"   // 신부 부모님 정보
    },
  },

  // ========== 초대 인사말 ==========
  invitationText:
    "한 줄기 별빛이 되어 만난 인연, 평생을 함께 걸어가려 합니다. 소중한 분들의 축복 속에 저희 두 사람이 첫 걸음을 내딛습니다. 귀한 시간 내어 함께해 주신다면 그 어떤 축복보다 값진 선물이 될 것입니다.",

  // ========== 예식 일정 ==========
  schedule: {
    // ISO 형태로 정확히 입력 (한국시간 기준)
    // 형식: "YYYY-MM-DDTHH:mm:ss+09:00"
    // 예: "2026-07-04T15:00:00+09:00" (2026년 7월 4일 오후 3시)
    weddingDateTime: "2026-07-04T15:00:00+09:00",
  },

  // ========== 예식장 정보 ==========
  venue: {
    name: "예식장명",                    // 예식장 이름
    hall: "홀 정보(층/홀)",              // 홀 정보 (예: "3층 그랜드홀")
    address: "서울시 OO구 OO로 00, OO빌딩",  // 예식장 주소
    
    // 지도/길찾기 링크 (원하는 것만 채우기)
    kakaoMapUrl: "https://map.kakao.com/", 
    naverMapUrl: "https://map.naver.com/",
    googleMapUrl: "https://maps.google.com/",
    
    // 구글 지도 iframe용 검색어 (주소를 넣으면 됨)
    mapQuery: "서울시 OO구 OO로 00 예식장명",
    
    // 교통/주차 안내 (줄바꿈은 \n 사용)
    transportText: "예: 2호선 OO역 3번 출구 도보 5분\n주차: 지하 2-4층 무료 2시간\n셔틀: OO역 1번 출구 앞 20분 간격",
  },

  // ========== 참석 의사 전달 ==========
  rsvp: {
    // 구글폼 링크 추천 (없으면 '#'로 두면 됨)
    formUrl: "https://forms.gle/",
  },

  // ========== 계좌번호 ==========
  accounts: {
    groomSide: [
      { label: "신랑", bank: "OO은행", number: "000-0000-0000-00" },
      { label: "혼주(부)", bank: "OO은행", number: "000-0000-0000-00" },
    ],
    brideSide: [
      { label: "신부", bank: "OO은행", number: "000-0000-0000-00" },
      { label: "혼주(모)", bank: "OO은행", number: "000-0000-0000-00" },
    ],
  },

  // ========== 갤러리 사진 ==========
  gallery: {
    // ./images/gallery/ 폴더에 파일을 넣고 파일명만 적으세요.
    // 예: ["01.jpg","02.jpg","03.jpg",...]
    images: ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg"],
  },
};

// ====== 아래부터는 로직(웬만하면 수정하지 마세요) ======
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============================================
// 모션 컴포넌트 (Motion Components)
// ============================================

/**
 * IntersectionObserver 기반 FadeIn 컴포넌트
 * 스크롤 시 요소가 뷰포트에 들어오면 fade + slide up 애니메이션
 */
class FadeIn {
  constructor(selector, options = {}) {
    this.elements = $$(selector);
    this.options = {
      rootMargin: options.rootMargin || '0px 0px -80px 0px',
      threshold: options.threshold || 0.1,
      once: options.once !== false, // 기본값: true
      ...options
    };
    this.init();
  }

  init() {
    if (!this.elements.length || !window.IntersectionObserver) {
      // IntersectionObserver 미지원 시 즉시 표시
      this.elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (this.options.once) {
            observer.unobserve(entry.target);
          }
        } else if (!this.options.once) {
          entry.target.classList.remove('visible');
        }
      });
    }, this.options);

    this.elements.forEach(el => observer.observe(el));
  }
}

/**
 * StaggerIn 컴포넌트
 * 그룹 내 요소들이 순차적으로 등장
 */
class StaggerIn {
  constructor(selector, options = {}) {
    this.container = $(selector);
    if (!this.container) return;
    
    this.items = Array.from(this.container.children);
    this.options = {
      delay: options.delay || 50, // 요소 간 간격 (ms)
      rootMargin: options.rootMargin || '0px 0px -80px 0px',
      threshold: options.threshold || 0.1,
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
            setTimeout(() => {
              item.classList.add('visible');
            }, index * this.options.delay);
          });
          observer.unobserve(entry.target);
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
  setText("#heroKicker", INVITE.hero.kicker);
  setText("#heroTitle", INVITE.hero.title);
  setText("#heroMeta", INVITE.hero.dateText);
  setText("#heroPlace", INVITE.hero.placeText);
}

function initNames(){
  setText("#groomParents", INVITE.couple.groom.parentsLine);
  setText("#groomName", INVITE.couple.groom.name);
  setText("#brideParents", INVITE.couple.bride.parentsLine);
  setText("#brideName", INVITE.couple.bride.name);
  setText("#invitationText", INVITE.invitationText);
}

function parseWeddingDate(){
  const iso = INVITE.schedule.weddingDateTime;
  // 안전하게 파싱 (빈 값 방지)
  const d = new Date(iso);
  return d;
}

function initCalendar(){
  const d = parseWeddingDate();
  if (isNaN(d.getTime())) return;

  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 1-12
  setText("#scheduleYear", String(year));
  setText("#scheduleMonth", String(month).padStart(2, "0"));

  const first = new Date(year, month-1, 1);
  const last = new Date(year, month, 0);
  const weddingDay = d.getDate();

  const dow = ["일","월","화","수","목","금","토"];

  const grid = $("#calendar");
  grid.innerHTML = "";

  // DOW header
  dow.forEach((w, i) => {
    const cell = document.createElement("div");
    cell.className = "cal__cell cal__dow";
    cell.textContent = w;
    if(i===0) cell.style.color = "#c94848";
    if(i===6) cell.style.color = "#3d63b8";
    grid.appendChild(cell);
  });

  // empty cells
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
    const days = Math.floor(s / (3600*24));
    const hours = Math.floor((s % (3600*24)) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;

    setText("#dday", String(days));
    setText("#hh", String(hours).padStart(2,"0"));
    setText("#mm", String(mins).padStart(2,"0"));
    setText("#ss", String(secs).padStart(2,"0"));
  };

  tick();
  setInterval(tick, 1000);
}

function initVenue(){
  setText("#venueName", INVITE.venue.name);
  setText("#venueHall", INVITE.venue.hall);
  setText("#venueAddress", INVITE.venue.address);
  setText("#transportText", INVITE.venue.transportText);

  const mapFrame = $("#mapFrame");
  if(mapFrame){
    const q = encodeURIComponent(INVITE.venue.mapQuery || INVITE.venue.address);
    mapFrame.src = `https://www.google.com/maps?q=${q}&output=embed`;
  }

  const btnKakao = $("#btnKakao");
  const btnNaver = $("#btnNaver");
  const btnGoogle = $("#btnGoogle");
  if(btnKakao) btnKakao.href = INVITE.venue.kakaoMapUrl || "https://map.kakao.com/";
  if(btnNaver) btnNaver.href = INVITE.venue.naverMapUrl || "https://map.naver.com/";
  if(btnGoogle) btnGoogle.href = INVITE.venue.googleMapUrl || "https://maps.google.com/";
}

function initContacts(){
  const groom = INVITE.couple.groom;
  const bride = INVITE.couple.bride;

  $("#callGroom").addEventListener("click", () => location.href = `tel:${groom.phone}`);
  $("#smsGroom").addEventListener("click", () => location.href = `sms:${groom.phone}`);
  $("#callBride").addEventListener("click", () => location.href = `tel:${bride.phone}`);
  $("#smsBride").addEventListener("click", () => location.href = `sms:${bride.phone}`);
}

/**
 * Toast 컴포넌트
 * 복사 성공 등의 피드백 메시지 표시
 */
class Toast {
  constructor(message, duration = 2000) {
    this.message = message;
    this.duration = duration;
    this.show();
  }

  show() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = this.message;
    document.body.appendChild(toast);

    // 애니메이션을 위해 다음 프레임에 추가
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 150);
    }, this.duration);
  }
}

function copyToClipboard(text){
  return navigator.clipboard?.writeText(text)
    .then(() => {
      new Toast('복사되었습니다');
    })
    .catch(() => {
      // clipboard API 실패 시 fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      new Toast('복사되었습니다');
    });
}

function renderAccounts(list, mountSel){
  const mount = $(mountSel);
  if(!mount) return;
  mount.innerHTML = "";

  list.forEach((a) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.gap = "10px";
    row.style.padding = "10px 0";
    row.style.borderBottom = "1px dashed #e9e6e1";

    const left = document.createElement("div");
    left.innerHTML = `<div style="font-weight:650">${escapeHtml(a.label)}</div>
                      <div style="color:#6b6b6b;font-size:13px;margin-top:4px">${escapeHtml(a.bank)} · ${escapeHtml(a.number)}</div>`;

    const btn = document.createElement("button");
    btn.className = "btn";
    btn.style.minWidth = "84px";
    btn.textContent = "복사";
    btn.addEventListener("click", async () => {
      await copyToClipboard(`${a.bank} ${a.number}`);
    });

    row.appendChild(left);
    row.appendChild(btn);
    mount.appendChild(row);
  });

  // 마지막 줄선 제거
  const last = mount.lastElementChild;
  if(last) last.style.borderBottom = "0";
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function initRSVP(){
  const a = $("#btnRsvp");
  if(!a) return;
  const url = INVITE.rsvp.formUrl || "#";
  a.href = url;
}

function initGallery(){
  const mount = $("#gallery");
  const imgs = INVITE.gallery.images || [];
  if(!mount) return;

  if(!imgs.length){
    mount.innerHTML = `<div class="skeleton">갤러리 이미지가 없습니다. ./images/gallery/에 파일을 넣고 script.js의 gallery.images를 채워주세요.</div>`;
    return;
  }

  // skeleton 제거
  mount.innerHTML = "";

  const fullPaths = imgs.map((f) => `./images/gallery/${f}`);

  fullPaths.forEach((src, idx) => {
    const img = document.createElement("img");
    img.className = "gallery__img stagger-item";
    img.loading = "lazy";
    img.decoding = "async";
    img.src = src;
    img.alt = `갤러리 ${idx+1}`;
    img.addEventListener("click", () => openLightbox(idx));
    mount.appendChild(img);
  });

  // lightbox
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  let current = 0;

  function render(){
    lbImg.src = fullPaths[current];
  }

  function openLightbox(index){
    current = index;
    render();
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close(){
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function prev(){
    current = (current - 1 + fullPaths.length) % fullPaths.length;
    render();
  }

  function next(){
    current = (current + 1) % fullPaths.length;
    render();
  }

  $("#lbClose").addEventListener("click", close);
  $("#lbPrev").addEventListener("click", prev);
  $("#lbNext").addEventListener("click", next);
  lb.addEventListener("click", (e) => { if(e.target === lb) close(); });

  document.addEventListener("keydown", (e) => {
    if(lb.getAttribute("aria-hidden") === "true") return;
    if(e.key === "Escape") close();
    if(e.key === "ArrowLeft") prev();
    if(e.key === "ArrowRight") next();
  });
}

function initShare(){
  const copyBtn = $("#btnCopyUrl");
  const shareBtn = $("#btnShare");
  const getUrl = () => location.href;

  copyBtn.addEventListener("click", async () => {
    await copyToClipboard(getUrl());
  });

  shareBtn.addEventListener("click", async () => {
    const url = getUrl();
    if (navigator.share){
      try{
        await navigator.share({ title: document.title, url });
      }catch(_){ /* 사용자가 취소한 경우 포함 */ }
      return;
    }
    await copyToClipboard(url);
  });
}

function initAnimations(){
  // 섹션 FadeIn 적용
  new FadeIn('.section.fade-in', { once: true });
  
  // 카운트다운 그리드 Stagger
  const countdownGrid = $('.countdown__grid');
  if (countdownGrid) {
    Array.from(countdownGrid.children).forEach(item => {
      item.classList.add('stagger-item');
    });
    new StaggerIn('.countdown__grid', { delay: 50 });
  }
  
  // 갤러리 이미지 Stagger
  new StaggerIn('.gallery', { delay: 30 });
  
  // 연락처 버튼 Stagger
  const contactGrid = $('.contactGrid');
  if (contactGrid) {
    Array.from(contactGrid.children).forEach(item => {
      item.classList.add('stagger-item');
    });
    new StaggerIn('.contactGrid', { delay: 40 });
  }
  
  // 카드 ScaleIn
  new FadeIn('.card.scale-in', { once: true });
  
  // 버튼 그룹 Stagger
  const btnRows = $$('.btnRow');
  btnRows.forEach(btnRow => {
    Array.from(btnRow.children).forEach(item => {
      item.classList.add('stagger-item');
    });
    new StaggerIn(btnRow, { delay: 60 });
  });
}

function main(){
  initHero();
  initNames();
  initCalendar();
  initCountdown();
  initVenue();
  initContacts();
  initRSVP();
  renderAccounts(INVITE.accounts.groomSide, "#groomAccounts");
  renderAccounts(INVITE.accounts.brideSide, "#brideAccounts");
  initGallery();
  initShare();
  initAnimations(); // 모션 초기화
}

document.addEventListener("DOMContentLoaded", main);
