/* Casas Eco: interações do site */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var rm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* o nome carimbado corre a 60px por segundo; as duas cópias andam juntas */
  var tracks = $$('.hero .mark-track');
  function setMark() {
    var t = tracks[0]; if (!t) return;
    var copy = t.children[0].getBoundingClientRect().width;
    if (rm) {
      var w = t.parentNode.clientWidth, x = copy * 1.5 - w / 2;
      tracks.forEach(function (k) { k.style.transform = 'translateX(' + (-x) + 'px)'; });
    } else {
      var dur = (copy * 2) / 60;
      tracks.forEach(function (k) { k.style.setProperty('--dur', dur + 's'); });
    }
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setMark); else setMark();

  /* o nome do rodapé ocupa a largura entre as margens */
  var fm = $('.foot-mark'), fms = $('.foot-mark span');
  function fitFoot() {
    if (!fm || !fms) return;
    fm.style.fontSize = '100px';
    var avail = fm.clientWidth, w = fms.getBoundingClientRect().width;
    if (w > 0) fm.style.fontSize = Math.floor(100 * avail / w * 0.98) + 'px';
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitFoot); else fitFoot();

  /* barra fixa depois da abertura e seção ativa */
  var bar = $('#bar'), hero = $('.hero');
  var links = $$('.bar-nav a');
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      bar.classList.toggle('is-on', !es[0].isIntersecting);
    }, { rootMargin: '-60px 0px 0px 0px' }).observe(hero);
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = secs.indexOf(e.target);
        links.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { if (s) so.observe(s); });
  }

  /* entrada das partes de cada seção, em sequência */
  var rise = $$('[data-rise]');
  $$('main > section').forEach(function (s) {
    $$('[data-rise]', s).forEach(function (el, i) { el.style.setProperty('--d', (i * 80) + 'ms'); });
  });
  /* o que já está na tela ao abrir fica parado; o resto sobe quando chega perto do pé da tela */
  rise = rise.filter(function (el) { return el.getBoundingClientRect().top > innerHeight; });
  function reveal() {
    var lim = innerHeight * 1.12;
    rise = rise.filter(function (el) {
      var t = el.getBoundingClientRect().top;
      if (t < lim) { if (t > 0) el.classList.add('in'); return false; }
      return true;
    });
  }

  /* projetos: o título rasga na emenda ao entrar e ao sair, e fica inteiro no meio da passagem */
  var lots = $$('.lot'), lotsSec = $('.lots');
  function tear() {
    var vh = innerHeight, travel = innerWidth < 640 ? 0.08 : 0.12;
    lots.forEach(function (lot) {
      var r = lot.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      var q = Math.min(Math.max(-r.top / (r.height - vh), 0), 1);
      var k = q < 0.3 ? (q - 0.3) / 0.3 : q > 0.7 ? (q - 0.7) / 0.3 : 0;
      if (rm) k = 0;
      var st = lot.firstElementChild.style;
      st.setProperty('--pl', (-k * 0.1 * vh) + 'px');
      st.setProperty('--pr', (k * 0.1 * vh) + 'px');
      st.setProperty('--tl', (-k * travel * vh) + 'px');
      st.setProperty('--tr', (k * travel * vh) + 'px');
    });
    /* a barra se recolhe enquanto os lotes ocupam a tela */
    var lr = lotsSec.getBoundingClientRect();
    bar.classList.toggle('is-tucked', lr.top <= 0 && lr.bottom >= vh);
  }
  var ticking = false;
  addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; tear(); reveal(); });
  }, { passive: true });
  addEventListener('resize', function () { setMark(); fitFoot(); tear(); });
  tear();

  /* vídeos: um por vez, com som, controles depois do primeiro toque */
  var all = $$('video');
  function play(v) {
    v.controls = true;
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }
  all.forEach(function (v) {
    var box = v.closest('.vid'), stage = v.closest('.lot-stage'), btn = box && $('.vplay', box);
    if (btn) btn.addEventListener('click', function () { play(v); });
    v.addEventListener('play', function () {
      if (box) box.classList.add('is-playing');
      if (stage) stage.classList.add('is-playing');
      all.forEach(function (o) { if (o !== v) o.pause(); });
    });
    function stop() {
      if (box) box.classList.remove('is-playing');
      if (stage) stage.classList.remove('is-playing');
    }
    v.addEventListener('pause', stop);
    v.addEventListener('ended', function () { stop(); v.controls = false; });
  });
  $$('.lot-play').forEach(function (b) {
    b.addEventListener('click', function () {
      var vids = $$('video', b.closest('.lot-stage'));
      var v = vids[+b.getAttribute('data-play')] || vids[0];
      if (v) play(v);
    });
  });

  /* como construímos: abre uma etapa por vez */
  var steps = $$('.step');
  steps.forEach(function (s) {
    $('.step-btn', s).addEventListener('click', function () {
      if (s.classList.contains('is-open')) return;
      steps.forEach(function (o) {
        var on = o === s;
        o.classList.toggle('is-open', on);
        $('.step-btn', o).setAttribute('aria-expanded', String(on));
        $('.step-body', o).hidden = !on;
        if (!on) $$('video', o).forEach(function (v) { v.pause(); });
      });
    });
  });

  /* sistemas construtivos */
  var tabs = $$('.sys-tabs [role=tab]'), panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  var sysImg = $('#sysImg');
  function select(i, focus) {
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; panels[k].hidden = !on;
    });
    var p = panels[i];
    sysImg.classList.add('is-swapping');
    setTimeout(function () {
      sysImg.src = p.getAttribute('data-img'); sysImg.alt = p.getAttribute('data-alt');
      sysImg.width = +p.getAttribute('data-w'); sysImg.height = +p.getAttribute('data-h');
      sysImg.classList.remove('is-swapping');
    }, rm ? 0 : 200);
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((i + 1) % tabs.length, true); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
  });

  /* o corte da parede: camadas do lado de fora para o lado de dentro */
  var NS = 'http://www.w3.org/2000/svg', svg = $('#wallSvg'), cap = $('#wallCap');
  var WALLS = {
    simples: { cap: 'Parede simples: uma camada de pinus autoclavado.', layers: [['wood', 150, 'Pinus autoclavado']] },
    pet: { cap: 'Parede dupla com lã de PET: pinus por fora e por dentro, com isolamento no meio.', layers: [['wood', 100, 'Pinus externo'], ['pet', 170, 'Lã de PET'], ['wood', 100, 'Pinus interno']] },
    drywall: { cap: 'Parede dupla com drywall: pinus por fora e placa de drywall no lado de dentro.', layers: [['wood', 100, 'Pinus externo'], ['gap', 170, 'Estrutura'], ['dry', 56, 'Drywall']] }
  };
  function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function drawWall(type) {
    var w = WALLS[type]; if (!svg || !w) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    /* desenha na largura real, para o texto ficar sempre em 15px */
    var W = Math.round(svg.getBoundingClientRect().width) || 600, k = Math.min(1, W / 600);
    svg.setAttribute('viewBox', '0 0 ' + W + ' 200');
    var total = w.layers.reduce(function (s, l) { return s + l[1] * k; }, 0), x = (W - total) / 2, top = 38, h = 110;
    svg.appendChild(el('text', { x: 16, y: 26, fill: '#3B5040', 'font-size': 15, 'font-family': 'Schibsted Grotesk, Arial, sans-serif' })).textContent = 'Lado de fora';
    svg.appendChild(el('text', { x: W - 16, y: 26, fill: '#3B5040', 'font-size': 15, 'text-anchor': 'end', 'font-family': 'Schibsted Grotesk, Arial, sans-serif' })).textContent = 'Lado de dentro';
    w.layers.forEach(function (l, i) {
      var g = el('g', { class: 'lyr' }), lw = l[1] * k;
      if (l[0] === 'wood') {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#C79E5B' }));
        for (var gx = x + 10; gx < x + lw - 4; gx += 14) g.appendChild(el('path', { d: 'M' + gx + ' ' + top + ' q 5 ' + h / 2 + ' 0 ' + h, stroke: '#A47A38', 'stroke-width': 2, fill: 'none' }));
      } else if (l[0] === 'pet') {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#F2F0E3' }));
        var d = 'M' + (x + 8) + ' ' + (top + 8);
        for (var yy = top + 8, s = 1; yy < top + h - 8; yy += 12, s = -s) d += ' L' + (s > 0 ? x + lw - 8 : x + 8) + ' ' + (yy + 12);
        g.appendChild(el('path', { d: d, stroke: '#C9C4A6', 'stroke-width': 3, fill: 'none', 'stroke-linejoin': 'round' }));
      } else if (l[0] === 'gap') {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#D3D6B5' }));
        g.appendChild(el('rect', { x: x + lw / 2 - 18 * k, y: top, width: 36 * k, height: h, fill: '#B98F4E' }));
      } else {
        g.appendChild(el('rect', { x: x, y: top, width: lw, height: h, fill: '#F4F4EF' }));
        g.appendChild(el('rect', { x: x + 4, y: top, width: lw - 8, height: h, fill: '#E2E2DA' }));
      }
      var lab = el('text', { x: x + lw / 2, y: top + h + (i % 2 ? 46 : 26), fill: '#12301F', 'font-size': 15, 'font-weight': 600, 'text-anchor': 'middle', 'font-family': 'Schibsted Grotesk, Arial, sans-serif' });
      lab.textContent = l[2]; g.appendChild(lab);
      if (!rm && g.animate) g.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: i * 90, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      svg.appendChild(g); x += lw;
    });
    cap.textContent = w.cap + ' Esquema ilustrativo, fora de escala.';
  }
  var wallType = 'simples';
  $$('.wall input').forEach(function (r) { r.addEventListener('change', function () { if (r.checked) drawWall(wallType = r.value); }); });
  drawWall(wallType);
  addEventListener('resize', function () { drawWall(wallType); });

  /* onde construímos: um lugar aceso por vez */
  var pls = $$('.pl'), pi = 0;
  if (pls.length) {
    pls[0].classList.add('is-lit');
    setInterval(function () { pls[pi].classList.remove('is-lit'); pi = (pi + 1) % pls.length; pls[pi].classList.add('is-lit'); }, 2000);
  }

  /* fotos: arrastar a fila com o mouse */
  var row = $('#gal'), drag = null, moved = false;
  row.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    drag = { x: e.clientX, s: row.scrollLeft }; moved = false;
  });
  addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) { moved = true; row.classList.add('is-drag'); }
    row.scrollLeft = drag.s - dx;
  });
  addEventListener('pointerup', function () { drag = null; row.classList.remove('is-drag'); });
  row.addEventListener('keydown', function (e) {
    if (e.target !== row) return;
    if (e.key === 'ArrowRight') row.scrollBy({ left: 240, behavior: rm ? 'auto' : 'smooth' });
    if (e.key === 'ArrowLeft') row.scrollBy({ left: -240, behavior: rm ? 'auto' : 'smooth' });
  });

  /* foto ampliada, com setas, teclado e deslizar */
  var lb = $('#lb'), lbi = $('#lbi'), lbn = $('#lbn'), stage = $('#lbStage'), items = $$('#gal button'), cur = 0, opener = null;
  function show(i, dir) {
    cur = (i + items.length) % items.length;
    var im = $('img', items[cur]);
    lbi.src = im.currentSrc || im.src; lbi.alt = im.alt;
    lbn.textContent = (cur + 1) + ' de ' + items.length;
    if (dir && !rm && lbi.animate) lbi.animate([{ opacity: 0, transform: 'translateX(' + (dir * 24) + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
  }
  items.forEach(function (b, i) {
    b.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); moved = false; return; }
      opener = b; show(i); if (lb.showModal) lb.showModal(); document.documentElement.classList.add('lb-open');
    });
  });
  lb.addEventListener('close', function () { document.documentElement.classList.remove('lb-open'); if (opener) opener.focus({ preventScroll: true }); });
  $('#lbPrev').addEventListener('click', function () { show(cur - 1, -1); });
  $('#lbNext').addEventListener('click', function () { show(cur + 1, 1); });
  $('#lbClose').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(cur - 1, -1); else if (e.key === 'ArrowRight') show(cur + 1, 1);
  });
  stage.addEventListener('click', function (e) { if (e.target === stage) lb.close(); });
  var sx = null, sy = null;
  stage.addEventListener('touchstart', function (e) { var t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (sx === null) return; var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });
})();
