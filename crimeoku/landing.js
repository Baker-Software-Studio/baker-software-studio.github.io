/* Landing de Crimeoku: aparición al hacer scroll y parallax de capas. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Aparición: cada .rv entra cuando llega a la pantalla (una sola vez) */
  var targets = document.querySelectorAll('.rv, .board-wall');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* Hilos: tres lanas rojas desde la chinche del Casino hacia las otras tres (medidas sobre las chinches reales) */
  var wall = document.querySelector('.board-wall');
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
  var until = 0;
  function follow() { threads(); if (performance.now() < until) requestAnimationFrame(follow); }
  if (wall) {
    new MutationObserver(function () { until = performance.now() + 3200; follow(); }).observe(wall, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', threads);
    window.addEventListener('load', threads);
    window.addEventListener('bk:lang', function () { setTimeout(threads, 60); });
    threads();
  }

  /* Parallax: cada .px se desplaza según su distancia al centro de la pantalla × data-depth */
  if (reduce) return;
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight, mobile = window.innerWidth < 700;
    for (var i = 0; i < layers.length; i++) {
      var el = layers[i], host = el.parentElement, r = host.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var depth = parseFloat(el.getAttribute('data-depth')) * (mobile ? 0.6 : 1);
      var off = (r.top + r.height / 2 - vh / 2) * depth;
      el.style.setProperty('--py', off.toFixed(1) + 'px');
    }
    threads();
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
