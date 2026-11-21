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
    '.simba__card, .simba__demo-box, ' +
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

  // ---- SIMBA DEMO INTERACTIVE SIMULATOR ----
  const modulePills = document.querySelectorAll('#simbaModuleSelector .simba__pill');
  const scenarioSelect = document.getElementById('simbaScenario');
  const customRateGroup = document.getElementById('customRateGroup');
  const customRateInput = document.getElementById('simbaCustomRate');

  let currentModule = 'p2p';

  const scenarios = {
    uk_increase: { oldRate: 20, newRate: 21, currency: '£' },
    de_stimulus: { oldRate: 19, newRate: 16, currency: '€' },
    fr_reclass:  { oldRate: 20, newRate: 10, currency: '€' },
    custom:      { oldRate: 20, newRate: 22, currency: '£' }
  };

  function updateSimbaSimulation() {
    const scenarioKey = scenarioSelect ? scenarioSelect.value : 'uk_increase';
    if (customRateGroup) {
      customRateGroup.style.display = scenarioKey === 'custom' ? 'flex' : 'none';
    }

    const config = scenarios[scenarioKey] || scenarios.uk_increase;
    let oldRate = config.oldRate;
    let newRate = scenarioKey === 'custom' && customRateInput ? parseFloat(customRateInput.value) || 20 : config.newRate;
    const cur = config.currency;

    const baseAmount = 10000;
    const oldVat = baseAmount * (oldRate / 100);
    const newVat = baseAmount * (newRate / 100);
    const total = baseAmount + newVat;

    const calcBase = document.getElementById('calcBase');
    const calcOldRateLabel = document.getElementById('calcOldRateLabel');
    const calcOldVat = document.getElementById('calcOldVat');
    const calcNewRateLabel = document.getElementById('calcNewRateLabel');
    const calcNewVat = document.getElementById('calcNewVat');
    const calcTotal = document.getElementById('calcTotal');

    const monoRiskNote = document.getElementById('monoRiskNote');
    const simbaSuccessNote = document.getElementById('simbaSuccessNote');
    const monoStatusBadge = document.getElementById('monoStatusBadge');
    const simbaStatusBadge = document.getElementById('simbaStatusBadge');

    if (calcBase) calcBase.textContent = `${cur}${baseAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;
    if (calcOldRateLabel) calcOldRateLabel.textContent = `${oldRate}%`;
    if (calcOldVat) calcOldVat.textContent = `${cur}${oldVat.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;
    if (calcNewRateLabel) calcNewRateLabel.textContent = `${newRate}%`;
    if (calcNewVat) calcNewVat.textContent = `${cur}${newVat.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;
    if (calcTotal) calcTotal.textContent = `${cur}${total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;

    if (currentModule === 'p2p') {
      if (monoRiskNote) monoRiskNote.textContent = 'Suppliers submit AP invoices with the new rate; hardcoded 3-way match fails, throwing invoices into manual dispute queues.';
      if (simbaSuccessNote) simbaSuccessNote.textContent = 'Supplier AP invoices ingested via Peppol/EDI match the dynamic policy matrix instantly with zero hold-ups.';
      if (monoStatusBadge) monoStatusBadge.textContent = 'Status: AP Matching Pipeline Frozen · Engineering Release Required';
      if (simbaStatusBadge) simbaStatusBadge.textContent = 'Status: Payables Policy Enforced · 100% 3-Way Match Pass · Peppol Ready';
    } else {
      if (monoRiskNote) monoRiskNote.textContent = 'Receivables billing engine generates invoices with outdated tax tables; customers dispute charges and require credit note reissues.';
      if (simbaSuccessNote) simbaSuccessNote.textContent = 'Billing runs query the live Simba policy engine; all customer invoices and Peppol e-invoices issued at compliant rates.';
      if (monoStatusBadge) monoStatusBadge.textContent = 'Status: Billing Engine Desynchronized · Credit Note Exposure High';
      if (simbaStatusBadge) simbaStatusBadge.textContent = 'Status: Receivables Compliant · Real-Time Tax Validation · Zero Invoicing Delays';
    }
  }

  if (modulePills && modulePills.length > 0) {
    modulePills.forEach(pill => {
      pill.addEventListener('click', () => {
        modulePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentModule = pill.getAttribute('data-module') || 'p2p';
        updateSimbaSimulation();
      });
    });
  }

  if (scenarioSelect) scenarioSelect.addEventListener('change', updateSimbaSimulation);
  if (customRateInput) customRateInput.addEventListener('input', updateSimbaSimulation);
  updateSimbaSimulation();

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

  // ---- SMOOTH PARALLAX SCROLLING ENGINE ----
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let isTicking = false;

    const onScrollParallax = () => {
      const windowH = window.innerHeight;

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.15');
        const parent = el.closest('section') || el.parentElement;
        const rect = parent.getBoundingClientRect();

        // Only calculate when section is visible or nearby
        if (rect.top < windowH && rect.bottom > 0) {
          const centerDelta = (rect.top + rect.height / 2) - (windowH / 2);
          const yPos = centerDelta * speed;
          el.style.transform = `translate3d(0, ${yPos.toFixed(1)}px, 0)`;
        }
      });
      isTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(onScrollParallax);
        isTicking = true;
      }
    }, { passive: true });

    // Initial call
    onScrollParallax();
  }

})();
