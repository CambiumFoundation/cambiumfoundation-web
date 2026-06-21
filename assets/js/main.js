/* Cambium Foundation — interactions */
(function () {
  'use strict';

  /* ---- year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- hero load reveal ---- */
  var hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(function () { hero.classList.add('loaded'); });

  /* ---- nav: scrolled state + mobile toggle ---- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) {
      if (el.closest('.hero')) return; // hero handled on load
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- letters carousel ---- */
  var track = document.getElementById('letterTrack');
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = document.getElementById('letterDots');
    var idx = 0, timer;

    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Letter ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function render() {
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      track.style.transition = 'transform .6s cubic-bezier(.2,.7,.2,1)';
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
    }
    function go(n, user) {
      idx = (n + slides.length) % slides.length;
      render();
      if (user) restart();
    }
    function next() { go(idx + 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 6000); }

    document.getElementById('letterNext').addEventListener('click', function () { go(idx + 1, true); });
    document.getElementById('letterPrev').addEventListener('click', function () { go(idx - 1, true); });
    render();
    restart();

    // pause on hover
    var stage = track.closest('.letters__stage');
    stage.addEventListener('mouseenter', function () { clearInterval(timer); });
    stage.addEventListener('mouseleave', restart);
  }

  /* ---- gallery lightbox ---- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = document.getElementById('lightboxImg');
    var lbCap = document.getElementById('lightboxCap');
    var closeBtn = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery__item').forEach(function (fig, i) {
      fig.addEventListener('click', function () {
        var img = fig.querySelector('img');
        var n = i + 1;
        lbImg.src = 'images/gallery/full/' + n + '.jpg';
        lbImg.onerror = function () { lbImg.src = img.src; lbImg.onerror = null; };
        var name = fig.querySelector('.gallery__name');
        var trade = fig.querySelector('.gallery__trade');
        lbCap.textContent = (name ? name.textContent : '') + (trade ? ' — ' + trade.textContent : '');
        lb.classList.add('is-open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  /* ---- loan counter ----
     Shows the static "21,000+" from the markup. Kiva retired its public v1
     lenders API, so there is no live feed to pull; update the number in
     index.html (#loanCounter) when the figure changes. */
})();
