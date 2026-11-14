/* =========================================
   ECLECTUS FINOPS — JavaScript
   ========================================= */

(function () {
  'use strict';

  // ---- NAV SCROLL EFFECT ----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 48);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- MOBILE NAV TOGGLE ----
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav__menu--open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav__menu--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---- HERO PARTICLES ----
  const particleContainer = document.getElementById('heroParticles');
  const PARTICLE_COUNT = 10;

  function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 2 + 1;
    const x     = Math.random() * 100;
    const delay = Math.random() * 15;
    const dur   = Math.random() * 20 + 18;
    const tx    = (Math.random() - 0.5) * 60;
    const isGold = Math.random() > 0.5;
    p.style.cssText = `
      left: ${x}%;
      bottom: -10px;
      width: ${size}px;
      height: ${size}px;
      background: ${isGold ? 'hsla(38,60%,42%,0.25)' : 'hsla(160,45%,36%,0.2)'};
      --tx: ${tx}px;
      animation-delay: ${delay}s;
      animation-duration: ${dur}s;
    `;
    particleContainer.appendChild(p);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll(
    '.section__eyebrow, .section__heading, .section__lead, .section__body, ' +
    '.methodology__card, .practitioner__pillar, .trust-bar__item, ' +
    '.cliff__content, .cliff__visual, .audit__card, .contact__form, .contact__info-card, ' +
    '.practitioner__visual, .practitioner__content, .footer__brand, .footer__nav-col'
  );

  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings
    const siblings = el.parentElement.querySelectorAll('.reveal');
    const sibIdx = Array.from(siblings).indexOf(el);
    if (sibIdx > 0 && sibIdx <= 3) {
      el.classList.add(`reveal--delay-${sibIdx}`);
    }
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ---- TIMELINE PROGRESS ----
  // Calculate real progress from Nov 2026 → Apr 2029
  const start  = new Date('2026-11-01').getTime();
  const end    = new Date('2029-04-01').getTime();
  const now    = Date.now();
  const pct    = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  const fill   = document.getElementById('timelineFill');
  if (fill) {
    // Set via CSS animation in stylesheet, but override width to actual value
    fill.style.setProperty('--timeline-pct', pct.toFixed(1) + '%');
    // Replace the animation with actual value after a slight delay
    setTimeout(() => {
      fill.style.width = pct.toFixed(1) + '%';
    }, 600);
  }

  // ---- STAT COUNTER ANIMATION ----
  const statValues = document.querySelectorAll('.hero__stat-value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent;
      // Extract numeric portion and suffix
      const match = raw.match(/^([\$]?)([\d.]+)(\+?)([A-Z]*)$/);
      if (!match) return;
      const [, prefix, numStr, plus, suffix] = match;
      const target = parseFloat(numStr);
      const isFloat = numStr.includes('.');
      let start = 0;
      const dur = 1800;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * ease;
        el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + plus + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => counterObserver.observe(el));

  // ---- CONTACT FORM ----
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Simulate submission
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending…';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Send Message';
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { formSuccess.hidden = true; }, 7000);
      }, 1400);
    });
  }

  // ---- SMOOTH ACTIVE NAV LINKS ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.style.color = href === '#' + entry.target.id
            ? 'hsl(43, 85%, 60%)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));

})();
