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

function initScrollHeader() {
  const header = document.getElementById('site-header');
  const panel = document.getElementById('nav-mobile-panel');
  const toggle = document.getElementById('nav-toggle');
  if (!header) return;

  let lastScrollY = window.scrollY;
  const threshold = 16;

  window.addEventListener(
    'scroll',
    () => {
      const current = window.scrollY;
      const delta = current - lastScrollY;

      if (current <= threshold) {
        header.classList.remove('nav-hidden');
      } else if (delta > 0) {
        header.classList.add('nav-hidden');
        panel?.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      } else if (delta < 0) {
        header.classList.remove('nav-hidden');
      }

      lastScrollY = current;
    },
    { passive: true }
  );
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

function initLegalRedirects() {
  const redirects = {
    privacy: '/privacy-policy.html',
    terms: '/terms-of-use.html',
  };

  function maybeRedirect() {
    const hash = location.hash.slice(1);
    const target = redirects[hash];
    if (target) window.location.replace(target);
  }

  window.addEventListener('hashchange', maybeRedirect);
  maybeRedirect();
}

document.getElementById('year').textContent = String(new Date().getFullYear());

wireStoreLinks();
wireContact();
initDemoVideo();
initScrollHeader();
initNav();
initTabs();
initLegalRedirects();

window.switchTab = switchTab;
