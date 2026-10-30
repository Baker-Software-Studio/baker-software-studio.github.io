/* Landing de Crimeoku: todo avanza (y retrocede) con el scroll, cuadro a cuadro.
   - .rv: cada elemento tiene un progreso --p (0→1) según dónde esté en la pantalla.
   - .px: parallax (--py).
   - Hilos de la pared y veredicto: también guiados por el scroll. */
(function () {
  /* Sin zoom por pellizco ni doble toque: arruinaría las capas y el parallax (iOS ignora user-scalable, por eso los gestos) */
  ['gesturestart', 'gesturechange', 'gestureend'].forEach(function (t) {
    document.addEventListener(t, function (e) { e.preventDefault(); }, { passive: false });
  });
  document.addEventListener('touchmove', function (e) { if (e.touches && e.touches.length > 1) e.preventDefault(); }, { passive: false });
  var lastTap = 0;
  document.addEventListener('touchend', function (e) {
    var n = Date.now(); if (n - lastTap < 300) e.preventDefault(); lastTap = n;
  }, { passive: false });
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wall = document.querySelector('.board-wall');
  var vbox = document.getElementById('verdictBox');

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function docTop(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }

  /* Hilos: tres lanas rojas desde la chinche del Casino hacia las otras tres (medidas sobre las chinches reales) */
  function threads() {
    if (!wall) return;
    var svg = wall.querySelector('.thread'), paths = svg.querySelectorAll('path'), pins = wall.querySelectorAll('.pin');
    if (pins.length < 4) return;
    var w = wall.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + w.width + ' ' + w.height);
    function pt(p) { var r = p.getBoundingClientRect(); return [r.left + r.width / 2 - w.left, r.top + r.height / 2 - w.top]; }
    var a = pt(pins[0]);
    for (var i = 1; i < 4; i++) {
      var b = pt(pins[i]), dx = b[0] - a[0], dy = b[1] - a[1], sag = Math.min(60, Math.sqrt(dx * dx + dy * dy) * 0.12);
      paths[i - 1].setAttribute('d', 'M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' Q' + ((a[0] + b[0]) / 2).toFixed(1) + ' ' + ((a[1] + b[1]) / 2 + sag).toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1));
    }
  }

  if (reduce) {            /* sin movimiento: el CSS ya deja todo en su estado final */
    threads();
    window.addEventListener('resize', threads);
    window.addEventListener('load', threads);
    window.addEventListener('bk:lang', function () { setTimeout(threads, 60); });
    return;
  }

  /* Posiciones en el documento (no se ven afectadas por las transformaciones de la animación) */
  var items = [], layers = [], wallTop = 0, vTop = 0;
  function measure() {
    items = Array.prototype.map.call(document.querySelectorAll('.rv'), function (el) {
      var d = parseFloat((el.style.getPropertyValue('--d') || '0').replace('s', '')) || 0;
      return { el: el, top: docTop(el), d: d, last: -1 };
    });
    layers = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
    if (wall) wallTop = docTop(wall);
    if (vbox) vTop = docTop(vbox);
    update();
  }

  function update() {
    ticking = false;
    var vh = window.innerHeight, y = window.scrollY || window.pageYOffset, mobile = window.innerWidth < 700;
    var maxY = Math.max(1, document.documentElement.scrollHeight - vh);
    var span = vh * 0.36, i, it, start, end, p;

    /* Aparición: empieza al asomar por abajo y termina cuando ya está a ~55% de la pantalla;
       lo que queda al final de la página se comprime para que también llegue a completarse */
    for (i = 0; i < items.length; i++) {
      it = items[i];
      start = it.top - vh * 0.97 + it.d * 55;
      end = start + span;
      if (end > maxY) end = Math.max(start + 1, maxY);
      p = Math.round(easeOut(clamp((y - start) / (end - start))) * 1000) / 1000;
      if (p !== it.last) { it.last = p; it.el.style.setProperty('--p', p); }
    }

    /* Parallax */
    for (i = 0; i < layers.length; i++) {
      var el = layers[i], r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var depth = parseFloat(el.getAttribute('data-depth')) * (mobile ? 0.6 : 1);
      el.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * depth).toFixed(1) + 'px');
    }

    /* Hilos: se van tendiendo uno tras otro a medida que se baja por la pared */
    if (wall) {
      var wp = clamp((y + vh * 0.8 - wallTop) / (vh * 0.5));
      for (i = 1; i <= 3; i++) wall.style.setProperty('--t' + i, clamp((wp - (i - 1) * 0.2) / 0.6).toFixed(3));
    }
    threads();

    /* Veredicto: gris → sello (cae) → sacudón → nombre del asesino. Hacia arriba, el mismo recorrido a la inversa. */
    if (vbox) {
      var center = vTop + vbox.offsetHeight / 2 - y;
      var vp = clamp((vh * 0.78 - center) / (vh * 0.42));
      var g = easeOut(clamp(vp / 0.28));
      var s = clamp((vp - 0.28) / 0.22);                      /* 0→1: el sello baja */
      var hit = clamp((vp - 0.5) / 0.14);                     /* sacudón al impactar */
      var amp = Math.sin(Math.PI * hit) * 5 * (s >= 1 ? 1 : 0);
      var k = easeOut(clamp((vp - 0.66) / 0.26));
      vbox.style.setProperty('--vg', g.toFixed(3));
      vbox.style.setProperty('--vs', (1 + 2.2 * Math.pow(1 - s, 2)).toFixed(3));
      vbox.style.setProperty('--vso', clamp(s * 3).toFixed(3));
      vbox.style.setProperty('--vk', k.toFixed(3));
      vbox.style.setProperty('--shx', (Math.sin(hit * 38) * amp).toFixed(2) + 'px');
      vbox.style.setProperty('--shy', (Math.cos(hit * 31) * amp * 0.6).toFixed(2) + 'px');
    }
  }

  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); });
  window.addEventListener('load', measure);
  window.addEventListener('bk:lang', function () { setTimeout(measure, 80); });
  if ('ResizeObserver' in window) new ResizeObserver(function () { measure(); }).observe(document.body);
  measure();
})();
