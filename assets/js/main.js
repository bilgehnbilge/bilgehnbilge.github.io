(function () {
  'use strict';

  var S = window.SITE;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- Küçük yardımcılar ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function loc(v) { return (v && typeof v === 'object') ? (v[lang] || v.tr) : v; }

  /* ---------- Dil ---------- */
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') || store.get('lang') ||
    ((navigator.language || 'tr').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en');
  if (!S.i18n[lang]) lang = 'tr';
  function t(key) { return S.i18n[lang][key] || S.i18n.tr[key] || ''; }

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (n) {
      var s = t(n.dataset.i18n);
      if (s.indexOf('{dp}') === -1) { n.textContent = s; return; }
      n.textContent = '';
      s.split('{dp}').forEach(function (part, i) {
        if (i) n.appendChild(el('a', { class: 'dp', href: S.dpUrl, text: 'Doğruluk Payı' }));
        if (part) n.appendChild(document.createTextNode(part));
      });
    });
    $$('[data-i18n-aria]').forEach(function (n) { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', t('meta.description'));
    $('#loupeHint').textContent = t(coarse ? 'hero.hintTouch' : 'hero.hint');
    renderAll();
  }
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang; store.set('lang', lang); applyLang();
    });
  });

  /* ---------- Tema ---------- */
  $('#themeBtn').addEventListener('click', function () {
    var root = document.documentElement;
    var current = root.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next; store.set('theme', next);
  });

  /* ---------- Menü ve üst bar ---------- */
  var header = $('.site-header');
  var menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', function () {
    var open = !header.classList.contains('nav-open');
    header.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $$('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      header.classList.remove('nav-open'); menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if ('IntersectionObserver' in window) {
    var navLinks = $$('.nav a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Görsel yüklenemezse ---------- */
  function guard(img, box) {
    img.addEventListener('error', function () {
      box.classList.add('is-missing'); box.setAttribute('data-missing', t('img.missing'));
    }, { once: true });
  }
  function caption(p) { return loc(p.place) + ', ' + p.year; }

  /* ---------- Açılış büyüteci ---------- */
  var heroIndex = Math.floor(Math.random() * S.hero.length);
  var loupe = $('#loupe'), base = $('#loupeBase'), reveal = $('#loupeReveal');

  function setHero(i) {
    var p = S.photos[S.hero[i]];
    if (!p) return;
    loupe.classList.add('is-swapping');
    loupe.classList.remove('is-missing');
    var done = function () { loupe.classList.remove('is-swapping'); };
    base.onload = done;
    base.onerror = function () { done(); loupe.classList.add('is-missing'); loupe.setAttribute('data-missing', t('img.missing')); };
    base.src = p.src; reveal.src = p.src;
    base.alt = caption(p);
    $('#loupePlace').textContent = caption(p);
  }
  $('#nextFrame').addEventListener('click', function () {
    heroIndex = (heroIndex + 1) % S.hero.length; setHero(heroIndex);
  });

  (function lens() {
    var w = 0, h = 0, cx = 0, cy = 0, tx = 0, ty = 0;
    var hovering = false, pausedUntil = 0, running = false, visible = true, t0 = performance.now();
    function size() {
      var r = loupe.getBoundingClientRect(); w = r.width; h = r.height;
      var rad = Math.max(64, Math.min(150, Math.min(w, h) * 0.2));
      loupe.style.setProperty('--r', rad + 'px');
      if (!cx) { cx = tx = w * 0.62; cy = ty = h * 0.4; }
    }
    function paint() {
      loupe.style.setProperty('--x', cx.toFixed(1) + 'px');
      loupe.style.setProperty('--y', cy.toFixed(1) + 'px');
    }
    function frame(now) {
      if (!visible) { running = false; return; }
      if (!hovering && now > pausedUntil && !reduceMotion) {
        var s = (now - t0) / 1000;
        tx = w * (0.5 + 0.27 * Math.sin(s * 0.33));
        ty = h * (0.46 + 0.24 * Math.sin(s * 0.47 + 1.1));
      }
      cx += (tx - cx) * 0.16; cy += (ty - cy) * 0.16;
      paint();
      requestAnimationFrame(frame);
    }
    function start() { if (!running) { running = true; requestAnimationFrame(frame); } }

    loupe.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = loupe.getBoundingClientRect();
      hovering = true; tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (reduceMotion) { cx = tx; cy = ty; paint(); }
    });
    loupe.addEventListener('pointerleave', function () { hovering = false; pausedUntil = performance.now() + 1200; });
    loupe.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'touch') return;
      var r = loupe.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top; pausedUntil = performance.now() + 5000;
      if (reduceMotion) { cx = tx; cy = ty; paint(); }
    });

    window.addEventListener('resize', size);
    size(); paint();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(loupe);
    }
    start();
  })();

  /* ---------- Bağlantılar ---------- */
  /* Tek renkli simgeler: Bootstrap Icons (MIT lisansı) */
  var ICONS = {
    Instagram: 'M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334',
    X: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z',
    LinkedIn: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z',
    GitHub: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8'
  };
  function iconLink(l) {
    var a = el('a', { href: l.url, rel: 'me' });
    if (ICONS[l.label]) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 16 16'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('class', 'brand');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', ICONS[l.label]); path.setAttribute('fill', 'currentColor');
      svg.appendChild(path); a.appendChild(svg);
    }
    a.appendChild(el('span', { text: l.label }));
    return a;
  }
  function renderLinks() {
    var hero = $('#heroLinks'); hero.textContent = '';
    ['Instagram', 'X', 'LinkedIn', 'GitHub'].forEach(function (name) {
      var l = S.links.filter(function (x) { return x.label === name; })[0];
      if (l) hero.appendChild(el('li', null, [iconLink(l)]));
    });
    var soc = $('#socials'); soc.textContent = '';
    S.links.forEach(function (l) { soc.appendChild(el('li', null, [el('a', { href: l.url, text: l.label, rel: 'me' })])); });

    var gc = $('#glanceContact'); gc.textContent = '';
    ['Instagram', 'X', 'LinkedIn'].forEach(function (name) {
      var l = S.links.filter(function (x) { return x.label === name; })[0];
      if (l) gc.appendChild(el('li', null, [iconLink(l)]));
    });
  }

  /* ---------- Fotoğraf galerisi ---------- */
  var filter = 'all';
  var lbList = [], lbIndex = 0;

  function visiblePhotos() {
    return S.photos.filter(function (p) { return filter === 'all' || p.cat === filter; });
  }
  function renderGallery() {
    var g = $('#gallery'); g.textContent = '';
    var list = visiblePhotos();
    list.forEach(function (p, i) {
      var img = el('img', { src: p.src, alt: caption(p), width: p.w, height: p.h, loading: i < 6 ? 'eager' : 'lazy', decoding: 'async' });
      var btn = el('button', { type: 'button', 'aria-label': caption(p) }, [img]);
      guard(img, btn);
      btn.addEventListener('click', function () {
        openLightbox(list.map(function (q) { return { src: q.src, cap: caption(q) }; }), i);
      });
      g.appendChild(el('figure', { class: 'shot' }, [btn, el('figcaption', { text: caption(p) })]));
    });
  }
  $$('#filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.dataset.filter;
      $$('#filters button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderGallery();
    });
  });

  /* ---------- Büyük görüntüleyici ---------- */
  var lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCaption');
  function showLb() {
    var it = lbList[lbIndex];
    lbImg.src = it.src; lbImg.alt = it.cap; lbCap.textContent = it.cap;
    var multi = lbList.length > 1;
    $('#lbPrev').hidden = !multi; $('#lbNext').hidden = !multi;
  }
  function openLightbox(list, i) {
    lbList = list; lbIndex = i; showLb();
    if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }
  function step(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); }
  $('#lbPrev').addEventListener('click', function () { step(-1); });
  $('#lbNext').addEventListener('click', function () { step(1); });
  $('#lbClose').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('close', function () { document.body.style.overflow = ''; });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-figure')) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  var sx = null;
  lb.addEventListener('pointerdown', function (e) { sx = e.clientX; });
  lb.addEventListener('pointerup', function (e) {
    if (sx === null) return; var dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 50 && lbList.length > 1) step(dx < 0 ? 1 : -1);
  });

  /* ---------- Tasarım ---------- */
  function renderDesign() {
    var box = $('#designList'); box.textContent = '';
    S.design.forEach(function (d) {
      var imgs = el('div', { class: 'design-imgs' });
      d.images.forEach(function (im, i) {
        var img = el('img', { src: im.src, alt: d.name + ' ' + (i + 1), width: im.w, height: im.h, loading: 'lazy' });
        var b = el('button', { type: 'button', 'aria-label': d.name + ' ' + (i + 1) }, [img]);
        guard(img, b);
        b.addEventListener('click', function () {
          openLightbox(d.images.map(function (x, k) { return { src: x.src, cap: d.name + ', ' + d.year + ' (' + (k + 1) + '/' + d.images.length + ')' }; }), i);
        });
        imgs.appendChild(b);
      });
      box.appendChild(el('article', { class: 'design-item' }, [
        el('div', null, [
          el('h3', { text: d.name }),
          el('p', { class: 'year', text: String(d.year) }),
          el('p', { class: 'desc', text: loc(d.text) }),
          el('a', { class: 'text-btn', href: d.url, text: t('design.see') })
        ]),
        imgs
      ]));
    });

    var g = $('#glanceDesign'); g.textContent = '';
    [S.design[0] && S.design[0].images[0], S.design[0] && S.design[0].images[1], S.design[1] && S.design[1].images[0]]
      .filter(Boolean).forEach(function (im) {
        var img = el('img', { src: im.src, alt: '', loading: 'lazy', width: im.w, height: im.h });
        img.addEventListener('error', function () { img.style.visibility = 'hidden'; }, { once: true });
        g.appendChild(img);
      });
  }

  /* ---------- Yazılar ---------- */
  function fmtDate(iso, opts) {
    try { return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', opts || { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso + 'T12:00:00')); }
    catch (e) { return iso; }
  }
  function postUrl(p) { return p.url || ('https://medium.com/p/' + p.id); }
  function renderPosts() {
    var ol = $('#posts'); ol.textContent = '';
    S.posts.forEach(function (p) {
      ol.appendChild(el('li', { class: 'post' }, [
        el('a', { href: postUrl(p), lang: 'tr' }, [
          el('time', { datetime: p.date, text: fmtDate(p.date) }),
          el('div', null, [el('h3', { text: p.title }), p.dek ? el('p', { text: p.dek }) : null]),
          el('span', { class: 'cat', text: t('writing.' + (p.cat || 'other')) })
        ])
      ]));
    });
    var latest = S.posts[0];
    if (latest) {
      $('#glanceWriting').href = postUrl(latest);
      $('#glanceWritingTitle').textContent = latest.title;
      $('#glanceWritingTitle').setAttribute('lang', 'tr');
      $('#glanceWritingDate').textContent = fmtDate(latest.date, { year: 'numeric', month: 'long' });
    }
  }
  /* Medium'a yeni yazı eklenirse listeye kendiliğinden düşsün */
  function refreshPosts() {
    if (!window.fetch) return;
    var ctrl = window.AbortController ? new AbortController() : null;
    if (ctrl) setTimeout(function () { ctrl.abort(); }, 5000);
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://medium.com/feed/@bilgehnbilge'), ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.items) return;
        var known = {}; S.posts.forEach(function (p) { known[p.id] = true; });
        var fresh = data.items.map(function (it) {
          var id = (it.guid || '').split('/p/')[1];
          var dek = (it.description || '').match(/<h4>(.*?)<\/h4>/);
          return { id: id, url: (it.link || '').split('?')[0], date: (it.pubDate || '').slice(0, 10), title: it.title, dek: dek ? dek[1].replace(/<[^>]+>/g, '') : '', cat: 'other' };
        }).filter(function (p) { return p.id && !known[p.id]; });
        if (fresh.length) { S.posts = fresh.concat(S.posts); renderPosts(); }
      })
      .catch(function () {});
  }

  /* ---------- Projeler ---------- */
  function appIcon(p) {
    if (p.icon) return el('img', { class: 'app-icon', src: p.icon, alt: '', width: 48, height: 48, loading: 'lazy' });
    return el('span', { class: 'app-icon is-mono', 'aria-hidden': 'true', text: p.mono || p.name.charAt(0) });
  }
  function renderProjects() {
    var ul = $('#projects'); ul.textContent = '';
    S.projects.forEach(function (p) {
      ul.appendChild(el('li', { class: 'project' }, [
        el('div', { class: 'project-head' }, [appIcon(p), el('p', { class: 'platform', text: loc(p.platform) })]),
        el('h3', { text: p.name }),
        el('p', { text: loc(p.text) })
      ]));
    });
    var g = $('#glanceProjects'); g.textContent = '';
    S.projects.slice(0, 5).forEach(function (p) { g.appendChild(el('li', null, [appIcon(p), el('span', { text: p.name })])); });
  }

  /* ---------- Kısaca: fotoğraf kartı ---------- */
  function renderGlancePhoto() {
    var img = $('#glancePhoto');
    if (img.dataset.done) return;
    var pick = S.photos[S.hero[(heroIndex + 1) % S.hero.length]] || S.photos[0];
    img.src = pick.src; img.alt = caption(pick); img.dataset.done = '1';
    guard(img, img.parentNode);
  }

  function renderAll() {
    renderLinks(); renderGallery(); renderDesign(); renderPosts(); renderProjects(); renderGlancePhoto();
    var p = S.photos[S.hero[heroIndex]];
    if (p) { $('#loupePlace').textContent = caption(p); base.alt = caption(p); }
  }

  /* ---------- Başlat ---------- */
  $('#year').textContent = new Date().getFullYear();
  setHero(heroIndex);
  applyLang();
  refreshPosts();
})();
