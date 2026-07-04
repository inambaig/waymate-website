import './articles.css';

const APP_STORE_URL = __APP_STORE_URL__;
const PLAY_STORE_URL = __PLAY_STORE_URL__;

document.documentElement.classList.add('art-enhanced');

function detectStorePlatform() {
  const ua = navigator.userAgent || '';
  if (/Android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'apple';
  return 'both';
}

function initStoreButtons() {
  document.querySelectorAll('[data-store="apple"]').forEach((el) => {
    if (APP_STORE_URL) el.href = APP_STORE_URL;
  });
  document.querySelectorAll('[data-store="google"]').forEach((el) => {
    if (PLAY_STORE_URL) el.href = PLAY_STORE_URL;
  });

  const mode = document.documentElement.dataset.storeMode || detectStorePlatform();
  document.documentElement.dataset.storeMode = mode;
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

function initRevealAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.art-reveal');

  if (prefersReduced || elements.length === 0) {
    elements.forEach((el) => el.classList.add('art-visible'));
    return;
  }

  const reveal = (el, observer) => {
    el.classList.add('art-visible');
    observer?.unobserve(el);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target, observer);
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
  );

  elements.forEach((el) => {
    observer.observe(el);
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal(el, observer);
      }
    });
  });
}

function initCardHoverRipple() {
  document.querySelectorAll('.art-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

initStoreButtons();
initScrollHeader();
initNav();
initRevealAnimations();
initCardHoverRipple();
