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
  function renderLinks() {
    var hero = $('#heroLinks'); hero.textContent = '';
    ['Instagram', 'X', 'LinkedIn', 'GitHub'].forEach(function (name) {
      var l = S.links.filter(function (x) { return x.label === name; })[0];
      if (l) hero.appendChild(el('li', null, [el('a', { href: l.url, text: l.label, rel: 'me' })]));
    });
    var soc = $('#socials'); soc.textContent = '';
    S.links.forEach(function (l) { soc.appendChild(el('li', null, [el('a', { href: l.url, text: l.label, rel: 'me' })])); });

    var gc = $('#glanceContact'); gc.textContent = '';
    ['Instagram', 'X', 'LinkedIn'].forEach(function (name) {
      var l = S.links.filter(function (x) { return x.label === name; })[0];
      if (l) gc.appendChild(el('li', null, [el('a', { href: l.url, text: l.label, rel: 'me' })]));
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
  function renderProjects() {
    var ul = $('#projects'); ul.textContent = '';
    S.projects.forEach(function (p) {
      ul.appendChild(el('li', { class: 'project' }, [
        el('p', { class: 'platform', text: loc(p.platform) }),
        el('h3', { text: p.name }),
        el('p', { text: loc(p.text) })
      ]));
    });
    var g = $('#glanceProjects'); g.textContent = '';
    S.projects.slice(0, 5).forEach(function (p) { g.appendChild(el('li', { text: p.name })); });
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
