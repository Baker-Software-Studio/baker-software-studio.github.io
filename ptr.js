/* Tirar para actualizar: como el scroll ocurre dentro del body, Safari ya no lo ofrece. Se hace a mano. */
(function () {
  var sc = document.body, startY = 0, dist = 0, on = false, MAX = 140, GO = 84;
  var el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'position:fixed;left:50%;top:0;width:40px;height:40px;margin-left:-20px;border-radius:50%;background:rgba(28,24,20,.92);box-shadow:0 4px 14px rgba(0,0,0,.4);z-index:90;display:grid;place-items:center;opacity:0;transform:translateY(-50px);pointer-events:none;color:#fff';
  el.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';
  document.body.appendChild(el);
  function draw(d) {
    var p = Math.min(1, d / GO);
    el.style.opacity = p;
    el.style.transform = 'translateY(' + (Math.min(d, MAX) * 0.55 + 6) + 'px) rotate(' + (p >= 1 ? 180 : 0) + 'deg)';
  }
  function reset() { el.style.transition = 'opacity .2s,transform .2s'; el.style.opacity = 0; el.style.transform = 'translateY(-50px)'; setTimeout(function () { el.style.transition = ''; }, 220); }
  sc.addEventListener('touchstart', function (e) {
    on = e.touches.length === 1 && sc.scrollTop <= 0 && !(e.target.closest && e.target.closest('select,input,textarea'));
    startY = e.touches[0].clientY; dist = 0;
  }, { passive: true });
  sc.addEventListener('touchmove', function (e) {
    if (!on) return;
    if (e.touches.length !== 1 || sc.scrollTop > 0) { on = false; reset(); return; }
    dist = e.touches[0].clientY - startY;
    if (dist > 0) draw(dist); else { dist = 0; draw(0); }
  }, { passive: true });
  sc.addEventListener('touchend', function () {
    if (on && dist >= GO) { el.style.opacity = 1; setTimeout(function () { location.reload(); }, 120); return; }
    on = false; if (dist) reset(); dist = 0;
  }, { passive: true });
  sc.addEventListener('touchcancel', function () { on = false; dist = 0; reset(); }, { passive: true });
})();
