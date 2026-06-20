import './input.css';

const APP_STORE_URL = __APP_STORE_URL__;
const PLAY_STORE_URL = __PLAY_STORE_URL__;
const CONTACT_EMAIL = __CONTACT_EMAIL__;
const SUPPORT_PHONE = __SUPPORT_PHONE__;
const DEMO_VIDEO_ID = __DEMO_VIDEO_ID__;

function wireStoreLinks() {
  document.querySelectorAll('[data-store="apple"]').forEach((el) => {
    if (APP_STORE_URL) el.href = APP_STORE_URL;
  });
  document.querySelectorAll('[data-store="google"]').forEach((el) => {
    if (PLAY_STORE_URL) el.href = PLAY_STORE_URL;
  });
}

function wireContact() {
  const emailEl = document.getElementById('footer-email');
  const phoneEl = document.getElementById('footer-phone');
  if (emailEl && CONTACT_EMAIL) {
    emailEl.href = `mailto:${CONTACT_EMAIL}`;
    emailEl.textContent = CONTACT_EMAIL;
  }
  if (phoneEl && SUPPORT_PHONE) {
    phoneEl.href = `tel:${SUPPORT_PHONE.replace(/\s/g, '')}`;
    phoneEl.textContent = SUPPORT_PHONE;
  }
}

function initDemoVideo() {
  const iframe = document.getElementById('demo-video-iframe');
  if (!iframe || !DEMO_VIDEO_ID) return;

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: DEMO_VIDEO_ID,
    controls: '0',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
  });

  iframe.src = `https://www.youtube.com/embed/${DEMO_VIDEO_ID}?${params.toString()}`;
  iframe.title = 'Waymate demo video';
}

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('nav-mobile-panel');

  toggle?.addEventListener('click', () => {
    const open = panel?.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  panel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      panel?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });
}

function switchTab(tab) {
  const passengersBtn = document.getElementById('tab-passengers');
  const hostsBtn = document.getElementById('tab-hosts');
  const passengersContent = document.getElementById('content-passengers');
  const hostsContent = document.getElementById('content-hosts');

  if (!passengersBtn || !hostsBtn || !passengersContent || !hostsContent) return;

  if (tab === 'passengers') {
    passengersBtn.classList.add('active-tab');
    passengersBtn.classList.remove('text-on-surface-variant');
    hostsBtn.classList.remove('active-tab');
    hostsBtn.classList.add('text-on-surface-variant');
    passengersContent.classList.remove('hidden');
    hostsContent.classList.add('hidden');
  } else {
    hostsBtn.classList.add('active-tab');
    hostsBtn.classList.remove('text-on-surface-variant');
    passengersBtn.classList.remove('active-tab');
    passengersBtn.classList.add('text-on-surface-variant');
    hostsContent.classList.remove('hidden');
    passengersContent.classList.add('hidden');
  }
}

function initTabs() {
  document.getElementById('tab-passengers')?.addEventListener('click', () => switchTab('passengers'));
  document.getElementById('tab-hosts')?.addEventListener('click', () => switchTab('hosts'));
}

function initLegal() {
  const main = document.getElementById('main-content');
  const footer = document.getElementById('site-footer');
  const nav = document.getElementById('site-nav');

  function showLegal(id) {
    document.querySelectorAll('.legal-panel').forEach((p) => p.classList.remove('visible'));
    const panel = document.getElementById(`legal-${id}`);
    if (panel) {
      main?.setAttribute('hidden', '');
      footer?.setAttribute('hidden', '');
      nav?.setAttribute('hidden', '');
      panel.classList.add('visible');
      window.scrollTo({ top: 0 });
      history.pushState(null, '', `#${id}`);
    }
  }

  function hideLegal() {
    document.querySelectorAll('.legal-panel').forEach((p) => p.classList.remove('visible'));
    main?.removeAttribute('hidden');
    footer?.removeAttribute('hidden');
    nav?.removeAttribute('hidden');
  }

  document.querySelectorAll('[data-legal]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showLegal(link.getAttribute('data-legal'));
    });
  });

  document.querySelectorAll('[data-legal-back]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      hideLegal();
      history.pushState(null, '', '#top');
    });
  });

  window.addEventListener('hashchange', () => {
    const hash = location.hash.slice(1);
    if (hash === 'terms' || hash === 'privacy') showLegal(hash);
    else hideLegal();
  });

  const hash = location.hash.slice(1);
  if (hash === 'terms' || hash === 'privacy') showLegal(hash);
}

document.getElementById('year').textContent = String(new Date().getFullYear());

wireStoreLinks();
wireContact();
initDemoVideo();
initNav();
initTabs();
initLegal();

window.switchTab = switchTab;
