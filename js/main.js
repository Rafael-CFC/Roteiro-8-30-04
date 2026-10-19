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
  /* a capa só baixa quando o vídeo chega perto da tela */
  function setPoster(v) { var src = v.getAttribute('data-poster'); if (src) { v.poster = src; v.removeAttribute('data-poster'); } }
  if ('IntersectionObserver' in window) {
    var po = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { setPoster(e.target); po.unobserve(e.target); } });
    }, { rootMargin: '800px 0px' });
    all.forEach(function (v) { po.observe(v); });
  } else all.forEach(setPoster);
  /* cada vídeo é uma parada só no teclado: o botão de play; os controles aparecem quando ele toca */
  all.forEach(function (v) {
    var box = v.parentNode, btn = $('.vplay', box);
    if (btn) btn.addEventListener('click', function () { tryPlay(v); v.focus && v.focus({ preventScroll: true }); });
    v.addEventListener('play', function () { v.controls = true; box.classList.add('is-playing'); all.forEach(function (o) { if (o !== v) o.pause(); }); });
    v.addEventListener('pause', function () { if (v.ended || v.currentTime === 0) box.classList.remove('is-playing'); });
    v.addEventListener('ended', function () { box.classList.remove('is-playing'); v.controls = false; });
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
    function done(ok) { cb.textContent = ok ? 'Copiado' : 'Selecione o número'; cb.classList.toggle('is-done', ok); setTimeout(function () { cb.textContent = 'Copiar número'; cb.classList.remove('is-done'); }, 2000); }
    function sel() { var r = document.createRange(); r.selectNodeContents(num); var s = getSelection(); s.removeAllRanges(); s.addRange(r); done(false); }
    try { navigator.clipboard.writeText(txt).then(function () { done(true); }, sel); } catch (e) { sel(); }
  });
  /* o corte da parede: camadas do lado de fora para o lado de dentro */
  var NS = 'http://www.w3.org/2000/svg', svg = $('#wallSvg'), cap = $('#wallCap'), wallType = 'simples';
  var WALLS = {
    simples: { cap: 'Parede simples: uma camada de pinus autoclavado.', layers: [['wood', 150, 'Pinus autoclavado', 'ext']] },
    pet: { cap: 'Parede dupla com lã de PET: pinus por fora e por dentro, com isolamento no meio.', layers: [['wood', 100, 'Pinus externo', 'ext'], ['pet', 170, 'Lã de PET', 'pet'], ['wood', 100, 'Pinus interno', 'int']] },
    drywall: { cap: 'Parede dupla com drywall: pinus por fora, a estrutura no meio e a placa de drywall do lado de dentro.', layers: [['wood', 100, 'Pinus externo', 'ext'], ['frame', 130, 'Estrutura', 'frame'], ['dry', 60, 'Drywall', 'dry']] }
  };
  var FONT = 'Archivo, Arial, sans-serif', root = getComputedStyle(document.documentElement);
  var INK = root.getPropertyValue('--ink').trim(), MUTED = root.getPropertyValue('--muted').trim();
  function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
  /* a parede é montada de fora para dentro: a camada que já existia desliza até o novo lugar,
     as novas entram pelo lado de fora, uma depois da outra */
  var lastGeo = {};
  function drawWall(type, play) {
    var w = WALLS[type]; if (!svg || !w) return;
    var geo = {}, fresh = 0, ease = 'cubic-bezier(.16, 1, .3, 1)';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    /* desenha na largura real, para o texto ficar sempre em 15 a 16px */
    var W = Math.round(svg.getBoundingClientRect().width) || 600, k = Math.min(1.5, W / 520);
    svg.setAttribute('viewBox', '0 0 ' + W + ' 230');
    var fs = W < 420 ? 14 : 16;
    var widths = w.layers.map(function (l) { return Math.max(l[1] * k, l[2].length * fs * .54 + 12); });
    var total = widths.reduce(function (a, b) { return a + b; }, 0);
    /* em telas estreitas, a parede inteira encolhe para caber */
    if (total > W - 8) { widths = widths.map(function (v) { return v * (W - 8) / total; }); total = W - 8; }
    var x = (W - total) / 2, top = 40, h = 140;
    svg.appendChild(el('text', { x: 16, y: 26, fill: MUTED, 'font-size': 15, 'font-family': FONT })).textContent = 'Lado de fora';
    svg.appendChild(el('text', { x: W - 16, y: 26, fill: MUTED, 'font-size': 15, 'text-anchor': 'end', 'font-family': FONT })).textContent = 'Lado de dentro';
    w.layers.forEach(function (l, i) {
      var g = el('g', {}), lw = widths[i];
      if (l[0] === 'wood') {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#C79E5B' }));
        for (var gx = x + 10; gx < x + lw - 4; gx += 14) g.appendChild(el('path', { d: 'M' + gx + ' ' + top + ' q 5 ' + h / 2 + ' 0 ' + h, stroke: '#A47A38', 'stroke-width': 2, fill: 'none' }));
      } else if (l[0] === 'pet') {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#F2F0E3' }));
        var d = 'M' + (x + 8) + ' ' + (top + 8);
        for (var yy = top + 8, sgn = 1; yy < top + h - 8; yy += 12, sgn = -sgn) d += ' L' + (sgn > 0 ? x + lw - 8 : x + 8) + ' ' + (yy + 12);
        g.appendChild(el('path', { d: d, stroke: '#C9C4A6', 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round' }));
      } else if (l[0] === 'frame') {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#B98F4E' }));
        for (var fy = top + 18; fy < top + h; fy += 36) g.appendChild(el('path', { d: 'M' + x + ' ' + fy + ' h ' + lw, stroke: '#9C7539', 'stroke-width': 2 }));
      } else {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#ECECE4' }));
        g.appendChild(el('rect', { x: x + 5, y: top, width: lw - 10, height: h, fill: '#DCDCD2' }));
      }
      var lab = el('text', { x: x + lw / 2, y: top + h + 30, fill: INK, 'font-size': fs, 'font-weight': 600, 'text-anchor': 'middle', 'font-family': FONT });
      lab.textContent = l[2]; g.appendChild(lab);
      geo[l[3]] = x;
      if (play && !rm && g.animate) {
        var was = lastGeo[l[3]];
        if (was !== undefined) g.animate([{ transform: 'translateX(' + (was - x) + 'px)' }, { transform: 'none' }], { duration: 320, easing: ease });
        else g.animate([{ opacity: 0, transform: 'translateX(-28px)' }, { opacity: 1, transform: 'none' }], { duration: 380, delay: 80 + fresh++ * 110, easing: ease, fill: 'backwards' });
      }
      svg.appendChild(g); x += lw;
    });
    lastGeo = geo;
    cap.textContent = w.cap + ' Esquema ilustrativo, fora de escala.';
    if (play && !rm && cap.animate) cap.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
  }
  $$('.wall input').forEach(function (r) { r.addEventListener('change', function () { if (r.checked) drawWall(wallType = r.value, true); }); });
  /* a aba Madeira pode começar escondida em telas estreitas; redesenha quando ela aparece */
  tabs.forEach(function (t) { t.addEventListener('click', function () { requestAnimationFrame(function () { drawWall(wallType); }); }); });
  addEventListener('resize', function () { drawWall(wallType); });
  drawWall(wallType);

  /* orçamento: a mensagem se monta enquanto a pessoa escolhe */
  var orc = $('#orc');
  if (orc) {
    var prev = $('#orcPrev'), go = $('#orcGo'), area = $('#orcArea'), local = $('#orcLocal'), nome = $('#orcNome');
    var pick = function (n) { var c = $('input[name="' + n + '"]:checked', orc); return c ? c.value : ''; };
    var box = prev.parentNode, css = getComputedStyle(document.documentElement);
    var flash = [css.getPropertyValue('--tone').trim(), css.getPropertyValue('--bg-alt').trim()];
    var msg = function (e) {
      var a = parseInt(area.value, 10), ok = a >= 10 && a <= 3000;
      var bad = area.value !== '' && !ok;
      area.setAttribute('aria-invalid', String(bad));
      $('#orcAreaErr').hidden = !bad;
      var t = 'Olá, Casas Eco! ' + (nome.value.trim() ? 'Meu nome é ' + nome.value.trim() + '. ' : '') +
        'Quero um orçamento para ' + pick('tipo') + ' ' + pick('sis') + (ok ? ', com cerca de ' + a + ' m²' : '') + '.' +
        (local.value.trim() ? ' Local do terreno: ' + local.value.trim() + '.' : '') + ' Vi o portfólio de vocês no site.';
      prev.textContent = t;
      go.href = 'https://wa.me/5548996754334?text=' + encodeURIComponent(t);
      /* um toque de verde na caixa a cada escolha confirmada, não a cada letra */
      if (e && e.type === 'change' && box.animate) box.animate([{ backgroundColor: flash[0] }, { backgroundColor: flash[1] }], { duration: 450, easing: 'ease-out' });
    };
    orc.addEventListener('input', msg);
    orc.addEventListener('change', msg);
    orc.addEventListener('submit', function (e) { e.preventDefault(); go.focus(); });
    msg();
  }
})();
