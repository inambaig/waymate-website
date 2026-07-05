export function initActiveNav() {
  const path = window.location.pathname;
  let activeKey = null;

  if (path.startsWith('/articles')) {
    activeKey = 'articles';
  } else {
    const page = path.split('/').pop() || '';
    if (path === '/' || page === '' || page === 'index.html') {
      activeKey = 'home';
    } else {
      const map = {
        'how-it-works.html': 'how-it-works',
        'pricing.html': 'pricing',
        'about.html': 'about',
        'contact.html': 'contact',
      };
      activeKey = map[page] ?? null;
    }
  }

  if (!activeKey) return;

  document.querySelectorAll(`[data-nav="${activeKey}"]`).forEach((link) => {
    link.classList.remove('text-on-surface-variant');
    link.classList.add('text-primary');
    link.setAttribute('aria-current', 'page');
  });
}

export function initSiteFooter({ contactEmail, supportPhone } = {}) {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const phoneEl = document.getElementById('footer-phone');
  const emailEl = document.getElementById('footer-email');

  if (phoneEl && supportPhone) {
    phoneEl.textContent = supportPhone;
    phoneEl.href = `tel:${supportPhone.replace(/\s/g, '')}`;
  }
  if (emailEl && contactEmail) {
    emailEl.textContent = contactEmail;
    emailEl.href = `mailto:${contactEmail}`;
  }
}
