/* ═══════════════════════════════════════
   KOREDE ADELAJA — PORTFOLIO
   script.js — Interactions & behaviour
═══════════════════════════════════════ */

// ─── CUSTOM CURSOR ───────────────────
var cursor = document.getElementById('cursor');
var ring   = document.getElementById('cursorRing');
var mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.opacity     = '.3';
      ring.style.transform   = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', function() {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity     = '.5';
      ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// ─── NAV SCROLL EFFECT ───────────────
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── SMOOTH SCROLL FOR NAV LINKS ─────
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    // Close mobile nav if open
    var mobileNav = document.getElementById('mobileNav');
    var hamburger = document.getElementById('hamburger');
    if (mobileNav) mobileNav.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    document.body.style.overflow = '';
    // Scroll with offset for fixed nav
    var offset = nav ? nav.offsetHeight : 70;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

// ─── MOBILE HAMBURGER MENU ───────────
var hamburger  = document.getElementById('hamburger');
var mobileNav  = document.getElementById('mobileNav');
var mobileClose = document.getElementById('mobileClose');

function openMenu() {
  mobileNav.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger)  hamburger.addEventListener('click',  openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);

// ─── THEME TOGGLE ────────────────────
var html      = document.documentElement;
var toggleBtn = document.getElementById('themeToggle');
var themeIcon = toggleBtn ? toggleBtn.querySelector('.theme-icon') : null;

function setTheme(theme) {
  if (theme === 'light') {
    html.classList.add('light');
    if (themeIcon) themeIcon.textContent = '\u2600';
  } else {
    html.classList.remove('light');
    if (themeIcon) themeIcon.textContent = '\u263D';
  }
  localStorage.setItem('theme', theme);
}

// Apply saved theme
setTheme(localStorage.getItem('theme') || 'dark');

if (toggleBtn) {
  toggleBtn.addEventListener('click', function() {
    setTheme(html.classList.contains('light') ? 'dark' : 'light');
  });
}

// ─── SCROLL REVEAL ───────────────────
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, i * 80);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(function(el) {
  obs.observe(el);
});
