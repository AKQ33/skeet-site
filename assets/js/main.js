/* ============================================================
   SKEET // promo site — runtime
   ASCII logo · boot sequence · matrix rain · particle field ·
   typewriter · scroll reveal · FAQ · clocks
   ============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ──────────────────────────────────────────────────────────
     0. copy — promotional only, no internals
     ────────────────────────────────────────────────────────── */
  var BOOT = [
    ['ok',   'bios: CRT phosphor layer .............. online'],
    ['ok',   'target 1.20.1 forge ................. ready'],
    ['ok',   'target 1.21.8 neoforge .............. ready'],
    ['ok',   'native dll loader ................... armed'],
    ['ok',   'hwid spoof .......................... intercepting'],
    ['ok',   'module suite .......................... 92 modules / 7 categories'],
    ['ok',   'disabler armed ....................... GrimAC · ACA · Themis'],
    ['ok',   'Qt6 loader ............................ statically linked, zero deps'],
    ['bold', 'ACCESS GRANTED']
  ];

  var TYPED = [
    { cmd: './skeet --info',     out: 'v1.0 · 92 modules · 7 categories' },
    { cmd: './skeet --versions', out: '1.20.1 forge  ·  1.21.8 neoforge' },
    { cmd: './skeet --bypass',   out: 'grimac  ·  aca  ·  themis' },
    { cmd: './skeet --native',   out: 'dll inject  ·  hwid spoof' },
    { cmd: './skeet --deliver',  out: 'single file  ·  zero runtime deps' }
  ];

  /* ──────────────────────────────────────────────────────────
     helpers
     ────────────────────────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ──────────────────────────────────────────────────────────
     1. ASCII logo — ANSI Shadow, per-letter colour
     ────────────────────────────────────────────────────────── */
  /* solid pixel font — 5 rows, shapes read from overall silhouette
     rather than thin strokes, so they stay legible at small sizes */
  var FONT = {
    S: ['████████', '██      ', '████████', '      ██', '████████'],
    K: ['██     ██', '██  ██', '██████', '██  ██', '██     ██'],
    E: ['████████', '██      ', '██████  ', '██      ', '████████'],
    T: ['████████', '   ██   ', '   ██   ', '   ██   ', '   ██   ']
  };
  function padTo(s, n) { s = String(s); while (s.length < n) s += ' '; return s; }

  /* per-letter box width, so the gap stays even across rows of unequal length */
  var FW = (function () {
    var w = {};
    for (var k in FONT) {
      var m = 0, rows = FONT[k];
      for (var i = 0; i < rows.length; i++) if (rows[i].length > m) m = rows[i].length;
      w[k] = m + 2;
    }
    return w;
  })();

  (function renderLogo() {
    var el = $('ascii-logo');
    if (!el || !FONT.S) return;
    var word = 'SKEET';
    var spans = [];
    for (var i = 0; i < word.length; i++) spans.push({ ch: word.charAt(i), lines: FONT[word.charAt(i)] });
    var html = '';
    for (var r = 0; r < FONT.S.length; r++) {
      for (var j = 0; j < spans.length; j++) {
        var ch = spans[j].ch;
        var cls = ch === 'S' ? 's' : ch === 'K' ? 'k' : ch === 'T' ? 't' : 'e';
        html += '<span class="' + cls + ' lt" data-l="' + j + '">' + padTo(spans[j].lines[r], FW[ch]) + '</span>';
      }
      html += '\n';
    }
    el.innerHTML = html;
  })();

  /* per-letter entrance — kicked off once the boot overlay closes */
  function triggerLogoReveal() {
    if (REDUCED) return;
    var spans = document.querySelectorAll('#ascii-logo .lt');
    if (!spans.length) return;
    var groups = {};
    for (var i = 0; i < spans.length; i++) {
      var l = spans[i].getAttribute('data-l');
      (groups[l] = groups[l] || []).push(spans[i]);
    }
    var keys = Object.keys(groups).sort();
    for (var k = 0; k < keys.length; k++) {
      (function (idx) {
        setTimeout(function () {
          var arr = groups[keys[idx]];
          for (var j = 0; j < arr.length; j++) arr[j].classList.add('on');
        }, 130 * idx + 40);
      })(k);
    }
  }

  /* ──────────────────────────────────────────────────────────
     2. matrix rain
     ────────────────────────────────────────────────────────── */
  (function matrixRain() {
    var cv = $('matrix');
    if (!cv || !cv.getContext || REDUCED) return;
    var ctx = cv.getContext('2d');
    var CHARS = 'SKEET0145<>/*+=-#$@%ABCDEF';
    var COLW = 21, FS = 13, drops = [];

    function resize() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      var cols = Math.max(1, Math.floor(cv.width / COLW));
      drops = [];
      for (var i = 0; i < cols; i++) drops.push(Math.random() * -60);
    }
    resize();
    window.addEventListener('resize', resize);

    ctx.font = FS + 'px ' + 'monospace';
    var last = 0;
    function frame(t) {
      if (t - last > 88) {
        last = t;
        ctx.fillStyle = 'rgba(3, 7, 6, 0.22)';
        ctx.fillRect(0, 0, cv.width, cv.height);
        for (var i = 0; i < drops.length; i++) {
          var ch = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
          var x = i * COLW;
          var y = drops[i] * FS;
          ctx.fillStyle = (Math.random() > 0.985) ? '#d8ffe8' : 'rgba(0,255,102,0.72)';
          ctx.fillText(ch, x, y);
          if (y > cv.height && Math.random() > 0.972) drops[i] = 0;
          drops[i] += 1;
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ──────────────────────────────────────────────────────────
     2b. particle field — drifting nodes + distance links
         single hue (green), mouse-aware, DPR aware
     ────────────────────────────────────────────────────────── */
  (function particleField() {
    var cv = $('particles');
    if (!cv || !cv.getContext || REDUCED) return;
    var ctx = cv.getContext('2d');
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, pts = [], LINK = 150, TAUR = 6.2832;
    var mouse = { x: -9999, y: -9999 };

    function make() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.30,
        vy: (Math.random() - 0.5) * 0.30,
        r: 0.8 + Math.random() * 1.5,
        h: 136 + Math.random() * 20,
        a: 0.30 + Math.random() * 0.45
      };
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.floor(W * DPR);
      cv.height = Math.floor(H * DPR);
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var n = Math.max(28, Math.min(92, Math.round(W * H / 17000)));
      pts = [];
      for (var i = 0; i < n; i++) pts.push(make());
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('pointerleave', function () { mouse.x = -9999; mouse.y = -9999; });

    var last = performance.now();
    function frame(t) {
      var dt = Math.min(2.2, (t - last) / 16.67);
      last = t;
      ctx.clearRect(0, 0, W, H);

      var i, p;
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        var dxm = mouse.x - p.x, dym = mouse.y - p.y;
        var d2 = dxm * dxm + dym * dym;
        if (d2 < 90000 && d2 > 0.01) {           /* 300px attraction radius */
          var f = 0.020 * (1 - Math.sqrt(d2) / 300);
          p.vx += dxm * f * 0.03 * dt;
          p.vy += dym * f * 0.03 * dt;
        }
        if (Math.abs(p.vx) < 0.055) p.vx += (Math.random() - 0.5) * 0.022;
        if (Math.abs(p.vy) < 0.055) p.vy += (Math.random() - 0.5) * 0.022;
        p.vx *= 0.986;
        p.vy *= 0.986;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -30) p.x = W + 30; else if (p.x > W + 30) p.x = -30;
        if (p.y < -30) p.y = H + 30; else if (p.y > H + 30) p.y = -30;
      }

      ctx.lineWidth = 1;
      var L2 = LINK * LINK;
      for (i = 0; i < pts.length; i++) {
        for (var j = i + 1; j < pts.length; j++) {
          var dx = pts[i].x - pts[j].x;
          var dy = pts[i].y - pts[j].y;
          var dd = dx * dx + dy * dy;
          if (dd < L2) {
            var op = (1 - Math.sqrt(dd) / LINK) * 0.20;
            ctx.strokeStyle = 'rgba(0,255,102,' + op.toFixed(3) + ')';
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (i = 0; i < pts.length; i++) {
        var q = pts[i], hh = q.h.toFixed(0);
        ctx.fillStyle = 'hsla(' + hh + ',100%,52%,' + (q.a * 0.22).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r * 3.2, 0, TAUR);
        ctx.fill();
        ctx.fillStyle = 'hsla(' + hh + ',100%,76%,' + q.a.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, TAUR);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* ──────────────────────────────────────────────────────────
     3. boot sequence
     ────────────────────────────────────────────────────────── */
  (function boot() {
    var box = $('boot'), linesEl = $('bootLines'), fill = $('bootFill'), skip = $('bootSkip');
    if (!box) return;
    if (sessionStorage.getItem('skeet_booted') && !REDUCED) {
      box.classList.add('gone');
      document.body.classList.add('booted');
      return;
    }

    var done = false;
    function finish() {
      if (done) return; done = true;
      box.classList.add('gone');
      document.body.classList.add('booted');
      sessionStorage.setItem('skeet_booted', '1');
      triggerLogoReveal();
      document.removeEventListener('click', finish);
      document.removeEventListener('keydown', finish);
    }
    document.addEventListener('click', finish);
    document.addEventListener('keydown', finish);
    if (skip) skip.addEventListener('click', finish);

    (async function run() {
      for (var i = 0; i < BOOT.length; i++) {
        var row = BOOT[i];
        var line = document.createElement('div');
        line.className = row[0];
        if (row[0] === 'ok' || row[0] === 'warn') {
          line.innerHTML = '[' + row[0] + ']  ' + esc(row[1]);
        } else {
          line.innerHTML = '>>> ' + esc(row[1]);
        }
        linesEl.appendChild(line);
        linesEl.scrollTop = linesEl.scrollHeight;
        if (fill) fill.style.width = Math.round((i + 1) / BOOT.length * 100) + '%';
        await sleep(row[0] === 'bold' ? 420 : (130 + Math.random() * 190));
        if (done) return;
      }
      await sleep(700);
      finish();
    })();
  })();

  /* ──────────────────────────────────────────────────────────
     4. hero typewriter
     ────────────────────────────────────────────────────────── */
  (function typewriter() {
    var cmdEl = $('typedCmd'), outEl = $('typedOut');
    if (!cmdEl) return;
    var idx = 0;
    (async function loop() {
      while (true) {
        var item = TYPED[idx % TYPED.length];
        outEl.textContent = '';
        cmdEl.textContent = '';
        for (var i = 0; i < item.cmd.length; i++) {
          var ch = item.cmd.charAt(i);
          cmdEl.textContent += ch;
          var d = 28 + Math.random() * 36;
          if (ch === ' ' || ch === '-' || ch === '/' || ch === '.') d += 70;
          await sleep(d);
        }
        await sleep(340);
        outEl.textContent = item.out;
        await sleep(2500);
        await sleep(420);
        idx++;
      }
    })();
  })();

  /* ──────────────────────────────────────────────────────────
     5. scroll reveal
     ────────────────────────────────────────────────────────── */
  (function reveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (REDUCED || !('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('on');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });
    for (var k = 0; k < els.length; k++) io.observe(els[k]);
  })();

  /* ──────────────────────────────────────────────────────────
     6. FAQ accordion
     ────────────────────────────────────────────────────────── */
  (function faq() {
    var items = document.querySelectorAll('.faq-item');
    for (var i = 0; i < items.length; i++) {
      (function (it) {
        var q = it.querySelector('.faq-q');
        if (q) q.addEventListener('click', function () { it.classList.toggle('open'); });
      })(items[i]);
    }
  })();

  /* ──────────────────────────────────────────────────────────
     7. nav scroll state
     ────────────────────────────────────────────────────────── */
  (function navScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 50); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ──────────────────────────────────────────────────────────
     8. clocks
     ────────────────────────────────────────────────────────── */
  (function clocks() {
    var up = $('uptime'), ft = $('footTime');
    var t0 = Date.now();
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var s = Math.floor((Date.now() - t0) / 1000);
      if (up) up.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);
      if (ft) {
        var d = new Date();
        ft.textContent = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
                       + ' · ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
      }
    }
    tick();
    setInterval(tick, 1000);
  })();

})();
