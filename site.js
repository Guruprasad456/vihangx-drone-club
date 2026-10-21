(() => {
  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const closeMenu = () => {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  const closeDropdown = () => {
    dropdown?.classList.remove('open');
    dropdownToggle?.setAttribute('aria-expanded', 'false');
  };

  menuButton?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navLinks?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  dropdownToggle?.addEventListener('click', () => {
    const open = dropdown?.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', event => {
    if (dropdown && !dropdown.contains(event.target)) closeDropdown();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      closeDropdown();
      menuButton?.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  document.getElementById('year')?.append(new Date().getFullYear());

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      form.reset();
      const status = form.querySelector('.form-status');
      if (status) {
        status.style.display = 'block';
        status.focus?.();
      }
    });
  });

  // Resume PDFs are preloaded at low priority so a visitor can view one with a
  // single tap instead of waiting for the PDF request to begin after the tap.
  const resumeLinks = [...document.querySelectorAll('.team-resume-link')];
  const prefetchResume = link => {
    if (!link?.href || link.dataset.prefetched) return;
    link.dataset.prefetched = 'true';
    const preload = document.createElement('link');
    preload.rel = 'prefetch';
    preload.as = 'document';
    preload.href = link.href;
    document.head.append(preload);
  };
  const prefetchAllResumes = () => resumeLinks.forEach(prefetchResume);

  resumeLinks.forEach(link => {
    link.addEventListener('pointerenter', () => prefetchResume(link), { once: true });
    link.addEventListener('focus', () => prefetchResume(link), { once: true });
    link.addEventListener('touchstart', () => prefetchResume(link), { once: true, passive: true });
  });

  if (resumeLinks.length) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prefetchAllResumes, { timeout: 2000 });
    } else {
      window.setTimeout(prefetchAllResumes, 800);
    }
  }
})();
