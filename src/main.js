import './input.css';
import { initActiveNav, initSiteFooter } from './site-chrome.js';

const APP_STORE_URL = __APP_STORE_URL__;
const PLAY_STORE_URL = __PLAY_STORE_URL__;
const CONTACT_EMAIL = __CONTACT_EMAIL__;
const SUPPORT_PHONE = __SUPPORT_PHONE__;
const DEMO_VIDEO_ID = __DEMO_VIDEO_ID__;
const API_BASE_URL = __API_BASE_URL__;

function wireStoreLinks() {
  document.querySelectorAll('[data-store="apple"]').forEach((el) => {
    if (APP_STORE_URL) el.href = APP_STORE_URL;
  });
  document.querySelectorAll('[data-store="google"]').forEach((el) => {
    if (PLAY_STORE_URL) el.href = PLAY_STORE_URL;
  });
}

function wireSupportDetails(phoneEl, emailEl, { onlyIfEmpty = false } = {}) {
  if (phoneEl && SUPPORT_PHONE && (!onlyIfEmpty || !phoneEl.textContent?.trim())) {
    phoneEl.textContent = SUPPORT_PHONE;
    phoneEl.href = `tel:${SUPPORT_PHONE.replace(/\s/g, '')}`;
  }
  if (emailEl && CONTACT_EMAIL && (!onlyIfEmpty || !emailEl.textContent?.trim())) {
    emailEl.textContent = CONTACT_EMAIL;
    emailEl.href = `mailto:${CONTACT_EMAIL}`;
  }
}

function wireContact() {
  wireSupportDetails(document.getElementById('footer-phone'), document.getElementById('footer-email'));
  wireSupportDetails(
    document.getElementById('support-phone-display'),
    document.getElementById('support-email-display'),
    { onlyIfEmpty: true }
  );
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

async function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successEl = document.getElementById('contact-success');
  const errorEl = document.getElementById('contact-error');
  const errorMsgEl = document.getElementById('contact-error-message');
  const ticketRefEl = document.getElementById('contact-ticket-ref');
  const phoneDisplay = document.getElementById('support-phone-display');
  const emailDisplay = document.getElementById('support-email-display');
  const submitBtn = form.querySelector('button[type="submit"]');

  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/support/web/config`);
      if (res.ok) {
        const config = await res.json();
        if (phoneDisplay && config.supportPhone) {
          phoneDisplay.textContent = config.supportPhone;
          phoneDisplay.href = `tel:${String(config.supportPhone).replace(/\s/g, '')}`;
        }
        if (emailDisplay && config.supportEmail) {
          emailDisplay.textContent = config.supportEmail;
          emailDisplay.href = `mailto:${config.supportEmail}`;
        }
      }
    } catch {
      /* fall back to env defaults below */
    }
  }

  if (phoneDisplay && SUPPORT_PHONE && !phoneDisplay.textContent?.trim()) {
    phoneDisplay.textContent = SUPPORT_PHONE;
    phoneDisplay.href = `tel:${SUPPORT_PHONE.replace(/\s/g, '')}`;
  }
  if (emailDisplay && CONTACT_EMAIL && !emailDisplay.textContent?.trim()) {
    emailDisplay.textContent = CONTACT_EMAIL;
    emailDisplay.href = `mailto:${CONTACT_EMAIL}`;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl?.classList.add('hidden');
    successEl?.classList.add('hidden');

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim() || undefined,
      subject: String(formData.get('subject') ?? '').trim() || undefined,
      category: String(formData.get('category') ?? 'general'),
      message: String(formData.get('message') ?? '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      if (errorMsgEl) errorMsgEl.textContent = 'Please fill in your name, email, and message.';
      errorEl?.classList.remove('hidden');
      return;
    }

    if (!API_BASE_URL) {
      if (errorMsgEl) {
        errorMsgEl.textContent = 'Support is temporarily unavailable. Please email us directly.';
      }
      errorEl?.classList.remove('hidden');
      return;
    }

    submitBtn?.setAttribute('disabled', 'true');
    const originalLabel = submitBtn?.textContent;
    if (submitBtn) submitBtn.textContent = 'Submitting…';

    try {
      const res = await fetch(`${API_BASE_URL}/support/web-tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Could not submit your ticket. Please try again.');
      }

      if (ticketRefEl) ticketRefEl.textContent = data.ticket?.ticketRef ?? '';
      successEl?.classList.remove('hidden');
      form.reset();
      successEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      if (errorMsgEl) {
        errorMsgEl.textContent = err instanceof Error ? err.message : 'Could not submit your ticket.';
      }
      errorEl?.classList.remove('hidden');
    } finally {
      submitBtn?.removeAttribute('disabled');
      if (submitBtn && originalLabel) submitBtn.textContent = originalLabel;
    }
  });
}

initSiteFooter({ contactEmail: CONTACT_EMAIL, supportPhone: SUPPORT_PHONE });

wireStoreLinks();
wireContact();
initActiveNav();
initDemoVideo();
initScrollHeader();
initNav();
initTabs();
initLegalRedirects();
initContactForm();

window.switchTab = switchTab;
