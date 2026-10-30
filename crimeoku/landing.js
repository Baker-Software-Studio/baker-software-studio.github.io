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
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
