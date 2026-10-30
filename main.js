const config = {
  instagram: "https://www.instagram.com/zetamagoon/",
  tiktok: "https://www.tiktok.com/@itsdannysatria",
  email: "mailto:itsdannysatria@gmail.com",
  lihatLainnya: "https://drive.google.com/drive/folders/1_FECwuLW6OCeNoNwPwGfnzcZaRMQJcer?usp=drive_link",
  aboutText: `Halo, saya Zidane Satria — Video Editor yang berfokus pada storytelling visual, social edits, dan konten promosi. Saya mengutamakan pacing, estetika, dan pesan yang jelas untuk setiap proyek. Selalu siap bekerja cepat dan rapi untuk kebutuhan branding atau campaign.`,
  videoPlaceholders: ["videos/Honda Fit.mp4", "videos/tutor saber done.mp4", "videos/beat dika shake done.mp4"]
};

// DOM Refs
const body = document.body;
const themeSwitch = document.getElementById('themeSwitch');
const aboutBtn = document.getElementById('aboutBtn');
const portfolioBtn = document.getElementById('portfolioBtn');
const aboutOverlay = document.getElementById('aboutOverlay');
const portfolioOverlay = document.getElementById('portfolioOverlay');
const aboutModal = document.getElementById('aboutModal');
const portfolioModal = document.getElementById('portfolioModal');
const aboutClose = document.getElementById('aboutClose');
const portfolioClose = document.getElementById('portfolioClose');
const bioEl = document.getElementById('bio');
const igBtn = document.getElementById('igBtn');
const ttBtn = document.getElementById('ttBtn');
const emailBtn = document.getElementById('emailBtn');
const seeMore = document.getElementById('seeMore');

// Apply links
igBtn.href = config.instagram;
ttBtn.href = config.tiktok;
emailBtn.href = config.email;
seeMore.href = config.lihatLainnya;

// THEME SWITCH
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
  body.classList.add('switching');
  setTimeout(() => body.classList.remove('switching'), 450);
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// MODAL UTILITIES
function openModal(overlay, modal, startCallback) {
  overlay.classList.add('show');
  setTimeout(() => modal.classList.add('show'), 20);
  if (typeof startCallback === 'function') startCallback();
}

function closeModal(overlay, modal, onClosed) {
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('show', 'closing');
    overlay.classList.remove('show');
    if (typeof onClosed === 'function') onClosed();
  }, 320);
}

// ABOUT MODAL (Typewriter)
let typeInterval = null;
function startTypewriter(text, targetEl, speed = 18) {
  clearInterval(typeInterval);
  targetEl.textContent = '';
  let i = 0;
  typeInterval = setInterval(() => {
    if (i < text.length) {
      targetEl.textContent += text.charAt(i);
      i++;
    } else clearInterval(typeInterval);
  }, speed);
}

aboutBtn.addEventListener('click', () => openModal(aboutOverlay, aboutModal, () => startTypewriter(config.aboutText, bioEl)));
aboutClose.addEventListener('click', () => closeModal(aboutOverlay, aboutModal, () => bioEl.textContent = ''));
aboutOverlay.addEventListener('click', e => { if (e.target === aboutOverlay) closeModal(aboutOverlay, aboutModal, () => bioEl.textContent = '') });

// PORTFOLIO MODAL
function replaceVideos() {
  const videos = document.querySelectorAll('#videosContainer video');
  videos.forEach((v, i) => v.src = config.videoPlaceholders[i] || '');
}
portfolioBtn.addEventListener('click', () => openModal(portfolioOverlay, portfolioModal, replaceVideos));
portfolioClose.addEventListener('click', () => closeModal(portfolioOverlay, portfolioModal));
portfolioOverlay.addEventListener('click', e => { if (e.target === portfolioOverlay) closeModal(portfolioOverlay, portfolioModal) });
