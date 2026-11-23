(function () {
  'use strict';
  
  function hitung(el) {
    var m = el.textContent.match(/^([\d.]+)(.*)$/); if (!m) return;
    var akhir = parseInt(m[1].replace(/\./g, ''), 10), sufiks = m[2], mulai = null;
    if (isNaN(akhir)) return;
    function langkah(t) {
      if (mulai === null) mulai = t;
      var p = Math.min((t - mulai) / 1200, 1), n = Math.round(akhir * (1 - Math.pow(1 - p, 3)));
      el.textContent = n.toLocaleString('id-ID') + sufiks;
      if (p < 1) requestAnimationFrame(langkah);
    }
    requestAnimationFrame(langkah);
  }
  var stats = document.querySelector('.stats');
  if (stats && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (it) { if (it.isIntersecting) { io.disconnect(); stats.querySelectorAll('li > strong').forEach(hitung); } });
    }, { threshold: 0.4 });
    io.observe(stats);
  }

  /* ---- filter kabar ---- */
  var kabar = document.querySelector('.kabar');
  if (!kabar) return;
  var arts = Array.prototype.slice.call(kabar.querySelectorAll('article'));
  var pills = Array.prototype.slice.call(kabar.querySelectorAll('.pill-list a'));
  pills.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var k = a.textContent.trim().toLowerCase(), semua = k === 'semua', ada = 0;
      pills.forEach(function (x) { x.classList.toggle('aktif', x === a); });
      arts.forEach(function (art) {
        var p = art.querySelector('p'), cat = p ? p.textContent.split('·')[0].trim().toLowerCase() : '';
        var ok = semua || cat === k; art.hidden = !ok; if (ok) ada++;
      });
      var kosong = kabar.querySelector('.kosong');
      if (!ada && !kosong) { kosong = document.createElement('p'); kosong.className = 'kosong'; kosong.textContent = 'Belum ada kabar untuk kategori ini.'; kabar.appendChild(kosong); }
      else if (ada && kosong) kosong.remove();
    });
  });
})();
