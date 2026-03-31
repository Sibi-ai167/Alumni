/* ═══════ INIT ═══════ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initNavActive();
  initHeroEntrance();
  initMorphText();
  initScrollReveal();
  initHeroParallax();
  initHeroCarousel();
  init3DTilt();
  initTimelineAnim();
  initCounters();
  initForm();
  initSmoothScroll();
  initRipple();
  initAboutParallax();
  initAboutFadeIn();
  initMentorCarousel();
  initAboutCounters();
  initAboutTestimonials();
  initHorizontalScroll();
});

/* ═══════ SCROLL PROGRESS BAR ═══════ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });
}

/* ═══════ GLASS NAVBAR ═══════ */
function initNavbar() {
  const nav = document.getElementById('glassNav');
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link, .nav-cta').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}

/* ═══════ SECTION ACTIVE HIGHLIGHT ═══════ */
function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link[data-section]');
  if (!sections.length || !links.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ═══════ HERO ENTRANCE (blur + slide) ═══════ */
function initHeroEntrance() {
  document.querySelectorAll('.anim-ent').forEach(el => {
    const d = parseInt(el.dataset.d || 0, 10);
    setTimeout(() => el.classList.add('anim-go'), 350 + d);
  });
}

/* ═══════ SCROLL REVEAL (re-triggers on scroll) ═══════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.r-el');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const parent = e.target.parentElement;
        const siblings = parent ? [...parent.querySelectorAll(':scope > .r-el')] : [e.target];
        const idx = siblings.indexOf(e.target);
        setTimeout(() => e.target.classList.add('revealed'), idx * 100);
      } else {
        e.target.classList.remove('revealed');
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

  els.forEach(el => obs.observe(el));
}

/* ═══════ HERO PARALLAX ═══════ */
function initHeroParallax() {
  const bgWrap = document.getElementById('heroBgWrap');
  const hero = document.getElementById('hero');
  if (!bgWrap || !hero) return;

  let tx = 0, ty = 0, cx = 0, cy = 0;
  const max = 12, lerp = 0.05;

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * max;
    ty = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * max;
  });

  hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });

  (function loop() {
    cx += (tx - cx) * lerp;
    cy += (ty - cy) * lerp;
    bgWrap.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();
}

/* ═══════ 3D TILT SYSTEM ═══════ */
function init3DTilt() {
  /* Skip on touch / small screens */
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    /* Find the inner element that should transform */
    const target = card.querySelector('.hero-card-inner') || card;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    const maxTilt = 8; /* degrees */
    const lerp = 0.08;
    let raf = null;
    let active = false;

    function animate() {
      cx += (tx - cx) * lerp;
      cy += (ty - cy) * lerp;

      target.style.transform = `rotateX(${-cy}deg) rotateY(${cx}deg) scale3d(1.03, 1.03, 1.03)`;

      if (active || Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
        raf = requestAnimationFrame(animate);
      } else {
        target.style.transform = '';
      }
    }

    card.addEventListener('mouseenter', () => {
      active = true;
      if (!raf) raf = requestAnimationFrame(animate);
    });

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      tx = nx * maxTilt;
      ty = ny * maxTilt;
    });

    card.addEventListener('mouseleave', () => {
      active = false;
      tx = 0;
      ty = 0;
      /* Continue animation to smoothly return to 0 */
      if (!raf) raf = requestAnimationFrame(animate);
    });
  });
}

/* ═══════ TIMELINE ANIMATION ═══════ */
function initTimelineAnim() {
  const line = document.getElementById('tlLine');
  const sec = document.getElementById('process');
  if (!line || !sec) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        line.style.height = '100%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  obs.observe(sec);
}

/* ═══════ COUNTER ANIMATION ═══════ */
function initCounters() {
  const nums = document.querySelectorAll('.sc-num[data-target]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  nums.forEach(n => obs.observe(n));
}

function countUp(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const dur = 2200;
  const t0 = performance.now();

  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

/* ═══════ FORM ═══════ */
function initForm() {
  const form = document.getElementById('mentorForm');
  const ok = document.getElementById('formOk');
  const btn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(inp => {
      if (!inp.value.trim()) {
        valid = false;
        inp.style.borderColor = 'var(--red)';
        inp.style.boxShadow = '0 0 0 3px rgba(229,57,53,.2)';
        inp.addEventListener('input', function h() {
          inp.style.borderColor = '';
          inp.style.boxShadow = '';
          inp.removeEventListener('input', h);
        });
      }
    });

    if (!valid) return;

    btn.disabled = true;
    const lab = btn.querySelector('.btn-lab');
    if (lab) lab.textContent = 'Submitting...';

    setTimeout(() => {
      const fields = form.querySelectorAll('.f-row, .f-group, .btn-full');
      fields.forEach(f => {
        f.style.opacity = '0';
        f.style.transform = 'translateY(-8px)';
        f.style.transition = 'opacity .3s, transform .3s';
      });
      setTimeout(() => {
        fields.forEach(f => f.style.display = 'none');
        ok.classList.add('visible');
      }, 350);
    }, 1200);
  });
}

/* ═══════ SMOOTH SCROLL ═══════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const t = document.querySelector(href);
      if (!t) return;
      const off = document.getElementById('glassNav').offsetHeight;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off - 12, behavior: 'smooth' });
    });
  });
}

/* ═══════ RIPPLE EFFECT ═══════ */
function initRipple() {
  /* Inject positional CSS for ripple */
  const s = document.createElement('style');
  s.textContent = `.btn-ripple::after{left:var(--rx,50%);top:var(--ry,50%)}`;
  document.head.appendChild(s);

  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = this.getBoundingClientRect();
      this.style.setProperty('--rx', (e.clientX - r.left) + 'px');
      this.style.setProperty('--ry', (e.clientY - r.top) + 'px');
      this.classList.remove('rippling');
      void this.offsetWidth;
      this.classList.add('rippling');
      setTimeout(() => this.classList.remove('rippling'), 600);
    });
  });
}

/* ═══════ HERO IMAGE CAROUSEL ═══════ */
function initHeroCarousel() {
  const images = document.querySelectorAll('.carousel-img');
  const captionLabel = document.getElementById('captionLabel');

  if (!images.length || !captionLabel) return;

  const captions = ['Fullstack Bootcamp', 'Alumni Talk Session', 'Mock Interview Prep'];
  let current = 0;
  const interval = 3000;

  setInterval(() => {
    /* Fade out current */
    images[current].classList.remove('active');

    /* Fade caption */
    captionLabel.style.opacity = '0';

    /* Move to next */
    current = (current + 1) % images.length;

    /* Small delay for crossfade feel */
    setTimeout(() => {
      images[current].classList.add('active');
      captionLabel.textContent = captions[current];
      captionLabel.style.opacity = '1';
    }, 200);
  }, interval);
}

/* ═══════ MULTILINGUAL MORPH TEXT ═══════ */
function initMorphText() {
  const wordEl = document.getElementById('heroMorphWord');
  if (!wordEl) return;

  const words = [
    'Mentor.',          // English
    'मार्गदर्शक.',       // Hindi
    'வழிகாட்டி.',        // Tamil
    'మార్గదర్శి.',       // Telugu
    'മാർഗദർശി.',        // Malayalam
    'ಮಾರ್ಗದರ್ಶಕ.',       // Kannada
    'পথপ্রদর্শক.',       // Bengali
    'ମାର୍ଗଦର୍ଶକ.',      // Odia
    'मार्गदर्शक.',       // Marathi
    'માર્ગદર્શક.',       // Gujarati
    'ਮਾਰਗਦਰਸ਼ਕ.',       // Punjabi
  ];

  let current = 0;
  const INTERVAL = 1500;

  setInterval(() => {
    /* Exit animation */
    wordEl.classList.remove('active');
    wordEl.classList.add('exit');

    setTimeout(() => {
      /* Update text */
      current = (current + 1) % words.length;
      wordEl.textContent = words[current];

      /* Reset position for enter */
      wordEl.classList.remove('exit');

      /* Force reflow for smooth re-trigger */
      void wordEl.offsetWidth;

      /* Enter animation */
      wordEl.classList.add('active');
    }, 400);
  }, INTERVAL);
}

/* ═══════ ABOUT SECTION PARALLAX + BG FADE ═══════ */
function initAboutParallax() {
  const bgWrap = document.getElementById('aboutBgWrap');
  const aboutSec = document.getElementById('about');
  if (!bgWrap || !aboutSec) return;

  const speed = 0.4;
  let currentOpacity = 0;
  let targetOpacity = 0;
  const lerpFactor = 0.06;

  function update() {
    const rect = aboutSec.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.bottom > 0 && rect.top < windowH) {
      const scrolled = (windowH - rect.top) / (windowH + rect.height);
      const offset = (scrolled - 0.5) * rect.height * speed;
      bgWrap.style.transform = `translate3d(0, ${offset}px, 0)`;

      if (scrolled < 0.2) {
        targetOpacity = scrolled / 0.2;
      } else if (scrolled > 0.8) {
        targetOpacity = (1 - scrolled) / 0.2;
      } else {
        targetOpacity = 1;
      }
      targetOpacity = Math.max(0, Math.min(1, targetOpacity));
    } else {
      targetOpacity = 0;
    }

    currentOpacity += (targetOpacity - currentOpacity) * lerpFactor;
    if (Math.abs(currentOpacity - targetOpacity) < 0.005) currentOpacity = targetOpacity;
    bgWrap.style.opacity = currentOpacity;

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ═══════ ABOUT SCROLL REVEAL SYSTEM ═══════ */
function initAboutFadeIn() {
  /* Staggered reveal for .abt-reveal elements */
  const revealEls = document.querySelectorAll('.abt-reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0, 10);
        const parent = entry.target.parentElement;
        const siblings = parent ? [...parent.querySelectorAll(':scope > .abt-reveal')] : [entry.target];
        const idx = siblings.indexOf(entry.target);
        const stagger = idx * 120 + delay;

        setTimeout(() => {
          entry.target.classList.add('abt-visible');
        }, stagger);

        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  revealEls.forEach(el => observer.observe(el));

  /* Word-by-word title reveal */
  const words = document.querySelectorAll('.abt-word-reveal');
  if (words.length) {
    const wordObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const allWords = entry.target.closest('.about-main-title').querySelectorAll('.abt-word-reveal');
          allWords.forEach((w, i) => {
            setTimeout(() => w.classList.add('abt-word-visible'), i * 150);
          });
          wordObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    wordObs.observe(words[0]);
  }
}

/* ═══════ MENTOR IMAGE CAROUSEL ═══════ */
function initMentorCarousel() {
  const slides = document.querySelectorAll('.mentor-slide');
  const dots = document.querySelectorAll('.mentor-dot');
  if (!slides.length) return;

  let current = 0;
  const total = slides.length;
  const interval = 1250;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx % total;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function autoAdvance() {
    timer = setInterval(() => goTo(current + 1), interval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.idx, 10));
      autoAdvance();
    });
  });

  autoAdvance();
}

/* ═══════ ABOUT MINI COUNTERS ═══════ */
function initAboutCounters() {
  const nums = document.querySelectorAll('.asc-number[data-abt-target]');
  const bars = document.querySelectorAll('.asc-bar-fill[data-width]');
  if (!nums.length) return;

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counted = true;

        nums.forEach(el => {
          const target = +el.dataset.abtTarget;
          const suffix = el.dataset.abtSuffix || '';
          const dur = 2000;
          const t0 = performance.now();

          (function tick(now) {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.round(eased * target).toLocaleString() + suffix;
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        });

        bars.forEach(bar => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, 300);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsRow = document.querySelector('.about-stats-row');
  if (statsRow) observer.observe(statsRow);
}

/* ═══════ TESTIMONIAL SLIDER ═══════ */
function initAboutTestimonials() {
  const cards = document.querySelectorAll('.abt-test-card');
  const dots = document.querySelectorAll('.abt-test-dot');
  if (!cards.length) return;

  let current = 0;
  const total = cards.length;
  const interval = 4000;
  let timer;

  function goTo(idx) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx % total;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function autoAdvance() {
    timer = setInterval(() => goTo(current + 1), interval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.tidx, 10));
      autoAdvance();
    });
  });

  autoAdvance();
}

/* ═══════ HORIZONTAL SCROLL FEATURES ═══════ */
function initHorizontalScroll() {
  const section = document.getElementById('hscrollSection');
  const track = document.getElementById('hscrollTrack');
  const progressFill = document.getElementById('hscrollProgressFill');
  if (!section || !track) return;

  const panels = track.querySelectorAll('.hscroll-panel');
  const panelCount = panels.length;
  if (!panelCount) return;

  /* Cache child elements for each panel */
  const panelData = [...panels].map(p => ({
    el: p,
    bg: p.querySelector('.hpanel-bg-img'),
    content: p.querySelector('.hpanel-content'),
    title: p.querySelector('.hpanel-title'),
    desc: p.querySelector('.hpanel-desc'),
    stat: p.querySelector('.hpanel-stat'),
    number: p.querySelector('.hpanel-number'),
    vline: p.querySelector('.hpanel-vline')
  }));

  let currentX = 0;
  let targetX = 0;
  const lerpSpeed = 0.08;

  function ease(t) {
    /* Smooth cubic ease for opacity */
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function update() {
    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const viewH = window.innerHeight;
    const scrollDist = sectionH - viewH;

    if (scrollDist <= 0) { requestAnimationFrame(update); return; }

    const scrolled = Math.max(0, Math.min(1, -rect.top / scrollDist));
    const maxTx = (panelCount - 1) * window.innerWidth;
    targetX = scrolled * maxTx;

    /* Smooth lerp */
    currentX += (targetX - currentX) * lerpSpeed;
    if (Math.abs(currentX - targetX) < 0.5) currentX = targetX;

    track.style.transform = `translate3d(-${currentX}px, 0, 0)`;

    /* Progress bar */
    if (progressFill) progressFill.style.width = (scrolled * 100) + '%';

    /* Per-panel animations */
    panelData.forEach((pd, i) => {
      const pp = scrolled * (panelCount - 1) - i;
      /* pp: -1 = not yet, 0 = active, 1 = past */
      const absPP = Math.abs(pp);
      const isVisible = absPP < 1.2;

      /* ── Background parallax + Ken Burns zoom ── */
      if (pd.bg) {
        const bgShift = pp * 100;
        const zoom = 1.1 + (1 - Math.min(absPP, 1)) * 0.05;
        pd.bg.style.transform = `scale(${zoom}) translate3d(${bgShift}px, 0, 0)`;
      }

      /* ── Content container ── */
      if (pd.content) {
        const cShift = pp * -50;
        const cOpacity = isVisible ? Math.max(0, 1 - absPP * absPP * 1.2) : 0;
        pd.content.style.transform = `translate3d(${cShift}px, 0, 0)`;
        pd.content.style.opacity = cOpacity;
      }

      /* ── Staggered element reveals ── */
      if (isVisible) {
        const revealBase = absPP;

        if (pd.title) {
          const titleY = revealBase * 40;
          const titleOpacity = Math.max(0, 1 - revealBase * 1.3);
          pd.title.style.transform = `translate3d(0, ${titleY}px, 0)`;
          pd.title.style.opacity = titleOpacity;
        }

        if (pd.desc) {
          const descY = revealBase * 55;
          const descOpacity = Math.max(0, 1 - revealBase * 1.4);
          pd.desc.style.transform = `translate3d(0, ${descY}px, 0)`;
          pd.desc.style.opacity = descOpacity;
        }

        if (pd.stat) {
          const statY = revealBase * 65;
          const statOpacity = Math.max(0, 1 - revealBase * 1.5);
          pd.stat.style.transform = `translate3d(0, ${statY}px, 0)`;
          pd.stat.style.opacity = statOpacity;
        }
      } else {
        /* Off-screen — hide elements */
        [pd.title, pd.desc, pd.stat].forEach(el => {
          if (el) { el.style.opacity = 0; el.style.transform = 'translate3d(0, 40px, 0)'; }
        });
      }

      /* ── Watermark number parallax (opposite direction) ── */
      if (pd.number) {
        const numShift = pp * 60;
        const numOpacity = isVisible ? 0.04 + (1 - absPP) * 0.04 : 0;
        pd.number.style.transform = `translateY(-50%) translate3d(${numShift}px, 0, 0)`;
        pd.number.style.opacity = numOpacity;
      }

      /* ── Vertical line fade ── */
      if (pd.vline) {
        pd.vline.style.opacity = isVisible ? Math.max(0, 0.6 - absPP * 0.8) : 0;
      }
    });

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
