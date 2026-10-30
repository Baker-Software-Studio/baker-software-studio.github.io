/* Idioma: español si el dispositivo está en español (o si se eligió a mano), inglés para el resto. */
(function () {
  var d = document.documentElement, l = null;
  try { l = localStorage.getItem('bk:lang'); } catch (e) {}
  if (l !== 'es' && l !== 'en') {
    var n = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    l = /^es/i.test(n) ? 'es' : 'en';
  }
  d.lang = l;
  function sync() {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === d.lang));
    });
    var t = d.getAttribute('data-title-' + d.lang);
    if (t) document.title = t;
  }
  document.addEventListener('DOMContentLoaded', function () {
    sync();
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        d.lang = b.getAttribute('data-set');
        try { localStorage.setItem('bk:lang', d.lang); } catch (e) {}
        sync();
      });
    });
  });
})();
