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
      parentsLine: "신유열 · 장옥순 의 장남" 
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
          entry.target.classList.remove('visible');
        }
      });
    }, this.options);
    this.elements.forEach(el => observer.observe(el));
  }
}

class StaggerIn {
  constructor(selector, options = {}) {
    // ⭐ 핵심 수정: selector가 문자열이 아니면 바로 사용하도록 함
    this.container = (typeof selector === 'string') ? document.querySelector(selector) : selector;
    if (!this.container) return;
    
    this.items = Array.from(this.container.children);
    this.options = {
      delay: options.delay || 50,
      rootMargin: options.rootMargin || '0px 0px -80px 0px',
      threshold: options.threshold || 0.1,
      once: options.once !== false,
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
          if (this.options.once) observer.unobserve(entry.target);
        } else if (!this.options.once) {
          this.items.forEach(item => item.classList.remove('visible'));
        }
      });
    }, this.options);

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
  new FadeIn('.section.fade-in', { once: false });
  new StaggerIn('.countdown__grid', { delay: 100, once: false });
  new StaggerIn('.gallery', { delay: 80, once: false });
  new StaggerIn('.contactGrid', { delay: 80, once: false });
  new FadeIn('.card.scale-in', { once: false });
  
  // ⭐ 문제의 버튼 행 부분 수정
  $$('.btnRow').forEach(btnRow => {
    new StaggerIn(btnRow, { delay: 100, once: false });
  });
}

function main(){
  initHero(); initNames(); initCalendar(); initCountdown(); initVenue();
  initContacts(); initRSVP(); initGallery(); initShare();
  renderAccounts(INVITE.accounts.groomSide, "#groomAccounts");
  renderAccounts(INVITE.accounts.brideSide, "#brideAccounts");
  setTimeout(initAnimations, 100);
}

document.addEventListener("DOMContentLoaded", main);
