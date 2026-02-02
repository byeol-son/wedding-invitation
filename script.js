// ====== 여기만 수정하면 됩니다 (설정) ======
const INVITE = {
  hero: {
    title: "손별 ❤️ OOO",
    dateText: "2026년 00월 00일 토요일 오후 0시",
    placeText: "예식장명, 홀",
    kicker: "Wedding Invitation",
    // 대표 사진: ./images/main.jpg 파일을 교체하면 됨
  },
  couple: {
    groom: { name: "신랑", phone: "010-0000-0000", parentsLine: "아버지 · 어머니 의 아들" },
    bride: { name: "신부", phone: "010-0000-0000", parentsLine: "아버지 · 어머니 의 딸" },
  },
  invitationText:
    "한 줄기 별빛이 되어 만난 인연, 평생을 함께 걸어가려 합니다. 소중한 분들의 축복 속에 저희 두 사람이 첫 걸음을 내딛습니다. 귀한 시간 내어 함께해 주신다면 그 어떤 축복보다 값진 선물이 될 것입니다.",
  schedule: {
    // ISO 형태로 정확히 입력 (한국시간 기준으로 표시)
    weddingDateTime: "2026-00-00T00:00:00+09:00",
  },
  venue: {
    name: "예식장명",
    hall: "홀 정보(층/홀)",
    address: "서울시 OO구 OO로 00, OO빌딩",
    // 지도/길찾기 링크(원하는 것만 채우기)
    kakaoMapUrl: "https://map.kakao.com/", 
    naverMapUrl: "https://map.naver.com/",
    googleMapUrl: "https://maps.google.com/",
    // 구글 지도 iframe(키 없이도 되는 방식): 주소를 넣으면 됨
    mapQuery: "서울시 OO구 OO로 00 예식장명",
    transportText: "예: 2호선 OO역 3번 출구 도보 5분\n주차: 지하 2-4층 무료 2시간\n셔틀: OO역 1번 출구 앞 20분 간격",
  },
  rsvp: {
    // 구글폼 링크 추천 (없으면 '#'로 두면 됨)
    formUrl: "https://forms.gle/",
  },
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
  gallery: {
    // ./images/gallery/ 폴더에 파일을 넣고 파일명만 적으세요.
    // 예: ["01.jpg","02.jpg",...]
    images: ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg"],
  },
};

// ====== 아래부터는 로직(웬만하면 수정하지 마세요) ======
const $ = (sel) => document.querySelector(sel);

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

function copyToClipboard(text){
  return navigator.clipboard?.writeText(text)
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
      btn.textContent = "복사됨";
      setTimeout(()=> btn.textContent = "복사", 900);
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
    img.className = "gallery__img";
    img.loading = "lazy";
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
    copyBtn.textContent = "복사됨";
    setTimeout(()=> copyBtn.textContent = "URL 복사하기", 900);
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
    shareBtn.textContent = "URL 복사됨";
    setTimeout(()=> shareBtn.textContent = "공유하기", 900);
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
}

document.addEventListener("DOMContentLoaded", main);
