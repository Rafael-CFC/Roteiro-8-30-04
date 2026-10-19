/* Casas Eco: interações do site */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* barra, progresso e menu */
  var bar = $('#bar'), pg = $('#pg'), mb = $('#menuBtn'), nv = $('#nav'), mt = $('.menu-txt');
  function onScroll() {
    var y = window.scrollY || 0, m = document.documentElement.scrollHeight - innerHeight;
    bar.classList.toggle('is-small', y > 40);
    pg.style.transform = 'scaleX(' + (m > 0 ? Math.min(y / m, 1) : 0) + ')';
  }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
  function setMenu(o) {
    nv.classList.toggle('open', o); mb.setAttribute('aria-expanded', String(o));
    mb.classList.toggle('is-open', o); mt.textContent = o ? 'Fechar' : 'Menu';
  }
  mb.addEventListener('click', function () { setMenu(!nv.classList.contains('open')); });
  $$('a', nv).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && nv.classList.contains('open')) { setMenu(false); mb.focus(); } });
  document.addEventListener('click', function (e) { if (nv.classList.contains('open') && !bar.contains(e.target)) setMenu(false); });

  /* seção ativa no menu */
  var links = $$('a[href^="#"]', nv).filter(function (a) { return a.getAttribute('href') !== '#contato' || !a.classList.contains('nav-cta'); });
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = secs.indexOf(e.target);
        links.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { if (s) so.observe(s); });
  }

  /* contadores */
  function count(el) {
    var to = +el.getAttribute('data-to'), t0 = null;
    (function f(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / 1600, 1);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(f); else el.textContent = String(to);
    })(performance.now());
  }
  if (!rm && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { co.unobserve(e.target); count(e.target); } });
    }, { threshold: .6 });
    $$('[data-to]').forEach(function (n) { co.observe(n); });
  }

  /* sistemas construtivos */
  var tabs = $$('[role=tab]'), panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  function select(i, focus) {
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; panels[k].hidden = !on;
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i); });
    t.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowDown' || k === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
      else if (k === 'ArrowUp' || k === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
  });

  /* vídeos: botão de play grande, um por vez, sequência da cobertura */
  var all = $$('video'), seq = $$('#reel video');
  function tryPlay(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  all.forEach(function (v) {
    var box = v.parentNode, btn = $('.vplay', box);
    if (btn) btn.addEventListener('click', function () { tryPlay(v); v.focus && v.focus({ preventScroll: true }); });
    v.addEventListener('play', function () { box.classList.add('is-playing'); all.forEach(function (o) { if (o !== v) o.pause(); }); });
    v.addEventListener('pause', function () { if (v.ended || v.currentTime === 0) box.classList.remove('is-playing'); });
    v.addEventListener('ended', function () { box.classList.remove('is-playing'); });
  });
  var reel = $('#reel'), dots = $$('#reelDots button');
  function goReel(i, smooth) {
    var f = reel.children[i]; if (!f) return;
    if (reel.scrollWidth > reel.clientWidth + 2) reel.scrollTo({ left: f.offsetLeft - reel.offsetLeft - parseFloat(getComputedStyle(reel).paddingLeft || 0), behavior: smooth && !rm ? 'smooth' : 'auto' });
  }
  dots.forEach(function (d, i) { d.addEventListener('click', function () { goReel(i, true); }); });
  function syncDots() {
    var best = 0, bd = 1e9, c = reel.scrollLeft;
    [].forEach.call(reel.children, function (f, i) { var d = Math.abs(f.offsetLeft - reel.offsetLeft - parseFloat(getComputedStyle(reel).paddingLeft || 0) - c); if (d < bd) { bd = d; best = i; } });
    dots.forEach(function (d, i) { if (i === best) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
  }
  reel.addEventListener('scroll', function () { requestAnimationFrame(syncDots); }, { passive: true });
  seq.forEach(function (v, i) {
    v.addEventListener('ended', function () {
      var n = seq[i + 1]; if (!n) return;
      try { goReel(i + 1, true); tryPlay(n); } catch (err) {}
    });
  });

  /* ampliação das fotos, com setas, teclado e deslizar */
  var lb = $('#lb'), lbi = $('#lbi'), lbn = $('#lbn'), stage = $('#lbStage'), items = $$('#gal button'), cur = 0, opener = null;
  function show(i, dir) {
    cur = (i + items.length) % items.length;
    var im = $('img', items[cur]);
    lbi.src = im.currentSrc || im.src; lbi.alt = im.alt;
    lbn.textContent = (cur + 1) + ' de ' + items.length;
    if (dir && !rm && lbi.animate) lbi.animate([{ opacity: 0, transform: 'translateX(' + (dir * 24) + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
    [cur - 1, cur + 1].forEach(function (k) { var n = items[(k + items.length) % items.length]; var p = new Image(); p.src = $('img', n).currentSrc || $('img', n).src; });
  }
  items.forEach(function (b, i) {
    b.addEventListener('click', function () { opener = b; show(i); if (lb.showModal) lb.showModal(); document.documentElement.classList.add('lb-open'); });
  });
  function closeLb() { if (lb.open) lb.close(); }
  lb.addEventListener('close', function () { document.documentElement.classList.remove('lb-open'); if (opener) opener.focus({ preventScroll: true }); });
  $('#lbPrev').addEventListener('click', function () { show(cur - 1, -1); });
  $('#lbNext').addEventListener('click', function () { show(cur + 1, 1); });
  $('#lbClose').addEventListener('click', closeLb);
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(cur - 1, -1); else if (e.key === 'ArrowRight') show(cur + 1, 1);
  });
  stage.addEventListener('click', function (e) { if (e.target === stage) closeLb(); });
  var sx = null, sy = null;
  stage.addEventListener('touchstart', function (e) { var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return; var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });

  /* copiar número */
  var cb = $('#copyWa');
  if (cb) cb.addEventListener('click', function () {
    var num = $('#waNum'), txt = num.textContent;
    function done(ok) { cb.textContent = ok ? 'Copiado' : 'Selecione o número'; setTimeout(function () { cb.textContent = 'Copiar número'; }, 2000); }
    function sel() { var r = document.createRange(); r.selectNodeContents(num); var s = getSelection(); s.removeAllRanges(); s.addRange(r); done(false); }
    try { navigator.clipboard.writeText(txt).then(function () { done(true); }, sel); } catch (e) { sel(); }
  });
})();
