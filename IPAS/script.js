/* ============================================================
   LUNA — Ensiklopedia Bulan
   script.js
   ============================================================ */

// ── CUSTOM CURSOR ──────────────────────────────────────────
// ── SIMPLE CLICK EFFECT ──────────────────────────
document.addEventListener('click', (e) => {
  const ripple = document.createElement('span');

  ripple.className = 'click-effect';
  ripple.style.left = e.clientX + 'px';
  ripple.style.top = e.clientY + 'px';

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 500);
});

// Enlarge cursor on hover over interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .data-cell, .p-card, .fb, .et-card, .fl-item, .tl-item, .phase-box'
);

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});


// ── SCROLL REVEAL ──────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
    }
  });
}, { threshold: 0.08 });

reveals.forEach((el) => revealObserver.observe(el));


// ── STAGGERED GRID CHILDREN ────────────────────────────────
// Add transition delay to grid items so they animate in one by one
const staggerSelectors = [
  '.data-grid .data-cell',
  '.p-grid .p-card',
  '.facts-bento .fb',
  '.eclipse-types .et-card',
  '.future-list .fl-item',
  '.phase-row .phase-box',
];

staggerSelectors.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
  });
});


// ── ACTIVE NAV LINK HIGHLIGHT ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
  if (link.getAttribute('href') === `#${id}`) {
    link.style.opacity = '1';
    link.style.color = '#f2efe8';
  } else {
    link.style.opacity = '0.6';
    link.style.color = '';
  }
});
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => sectionObserver.observe(section));


// ── SMOOTH PARALLAX ON HERO MOON ───────────────────────────
const bigMoon = document.querySelector('.big-moon');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (bigMoon && scrollY < window.innerHeight) {
    const offset = scrollY * 0.25;
    bigMoon.style.transform = `translateY(${offset}px)`;
  }
});


// ── HERO MOUSE PARALLAX ────────────────────────────────────
const hero = document.getElementById('hero');

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const cx = rect.width  / 2;
  const cy = rect.height / 2;
  const dx = (e.clientX - rect.left - cx) / cx;
  const dy = (e.clientY - rect.top  - cy) / cy;

  if (bigMoon) {
    bigMoon.style.transform = `translate(${dx * 12}px, ${dy * 12}px)`;
  }
});

hero.addEventListener('mouseleave', () => {
  if (bigMoon) {
    bigMoon.style.transform = 'translate(0, 0)';
    bigMoon.style.transition = 'transform 1s ease';
  }
});

hero.addEventListener('mouseenter', () => {
  if (bigMoon) {
    bigMoon.style.transition = 'transform 0.1s ease';
  }
});


// ── DATA CELL COUNTER ANIMATION ───────────────────────────
// Animate numeric values when they scroll into view
function animateNumber(el, target, suffix, duration = 1200) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('id-ID') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Observe data cells with numeric values
const dataVals = document.querySelectorAll('.data-val');
const numericPattern = /^[\d.,]+/;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const text = entry.target.textContent.trim();
      const match = text.match(/^([\d.]+)/);

      // Only animate simple integer numbers under 10000 for readability
      if (match) {
        const num = parseFloat(match[1].replace(/\./g, ''));
        if (!isNaN(num) && num < 10000 && Number.isInteger(num)) {
          const suffix = text.slice(match[0].length);
          entry.target.textContent = '0' + suffix;
          animateNumber(entry.target, num, suffix, 1000);
        }
      }
    }
  });
}, { threshold: 0.5 });

dataVals.forEach((el) => counterObserver.observe(el));


// ── NAV BACKGROUND ON SCROLL ──────────────────────────────
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.mixBlendMode = 'normal';
    nav.style.background = 'rgba(5, 8, 15, 0.92)';
    nav.style.backdropFilter = 'blur(8px)';
    nav.style.borderBottom = '1px solid rgba(242, 239, 232, 0.05)';
  } else {
    nav.style.mixBlendMode = 'difference';
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom = 'none';
  }
});


// ── PHASE ICON HOVER GLOW ─────────────────────────────────
document.querySelectorAll('.phase-box').forEach((box) => {
  const icon = box.querySelector('.phase-icon');
  box.addEventListener('mouseenter', () => {
    if (icon) icon.style.boxShadow = '0 0 20px rgba(212, 200, 138, 0.5)';
  });
  box.addEventListener('mouseleave', () => {
    if (icon) icon.style.boxShadow = 'none';
  });
});


// ── TIMELINE ITEM HOVER ───────────────────────────────────
document.querySelectorAll('.tl-item').forEach((item) => {
  const dot = item.querySelector('.tl-dot');
  item.addEventListener('mouseenter', () => {
    if (dot) dot.style.transform = 'scale(1.5)';
    if (dot) dot.style.transition = 'transform 0.3s ease';
  });
  item.addEventListener('mouseleave', () => {
    if (dot) dot.style.transform = 'scale(1)';
  });
});


// ── ECLIPSE DIAGRAM ANIMATION ─────────────────────────────
const eclipseVis = document.querySelector('.eclipse-vis');

if (eclipseVis) {
  const eclipseObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bodies = eclipseVis.querySelectorAll('.e-body');
        const arrows = eclipseVis.querySelectorAll('.e-arrow');

        bodies.forEach((body, i) => {
          body.style.opacity = '0';
          body.style.transform = 'scale(0.5)';
          body.style.transition = `opacity 0.5s ease ${i * 0.2}s, transform 0.5s ease ${i * 0.2}s`;

          setTimeout(() => {
            body.style.opacity = '1';
            body.style.transform = 'scale(1)';
          }, 100 + i * 200);
        });

        arrows.forEach((arrow, i) => {
          arrow.style.opacity = '0';
          setTimeout(() => {
            arrow.style.transition = 'opacity 0.4s ease';
            arrow.style.opacity = '0.3';
          }, 400 + i * 200);
        });

        eclipseObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  eclipseObserver.observe(eclipseVis);
}


// ── FOOTER YEAR ───────────────────────────────────────────
// Auto-update year in footer if element exists
const yearEl = document.querySelector('.footer-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
