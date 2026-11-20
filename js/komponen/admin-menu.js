(function () {
  'use strict';
  var wadah = document.querySelector('[data-komponen="admin-menu"]');
  if (!wadah) return;
  wadah.setAttribute('aria-label', 'Menu pengurus');

  // Ubah menu di SINI saja, otomatis berlaku di semua halaman pengurus.
  var IKON = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>',
    file: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path d="M9 14h7M9 17h5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'
  };
  var MENU = [
    { id: 'dashboard', teks: 'Dashboard', href: 'dashboard.html', ikon: 'home' },
    { id: 'kelola-berita', teks: 'Kelola Berita & Prestasi', href: 'kelola-berita.html', ikon: 'inbox' },
    { id: 'kelola-modul', teks: 'Kelola Modul Diklat', href: 'kelola-modul.html', ikon: 'file' },
    { id: 'kelola-persuratan', teks: 'Kelola Persuratan', href: 'kelola-persuratan.html', ikon: 'mail' }
  ];

  var aktif = wadah.getAttribute('data-aktif') || '';
  var li = MENU.map(function (m) {
    var on = m.id === aktif;
    return '<li><a href="' + m.href + '"' + (on ? ' aria-current="page"' : '') + '>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true">' + IKON[m.ikon] + '</svg><span>' + m.teks.replace('&', '&amp;') + '</span></a></li>';
  }).join('');

  wadah.innerHTML =
    '<div class="sidebar-langit"><button type="button" class="sidebar-tutup" aria-label="Tutup menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button></div>' +
    '<p class="sidebar-label">OVERVIEW</p>' +
    '<ul>' + li + '</ul>' +
    '<div class="sidebar-bawah"><a href="index.html" data-logout>Logout</a></div>';

  // buka/tutup menu (tombol panah di sidebar; tombol hamburger dibuat di header layar kecil)
  var body = document.body;
  wadah.querySelector('.sidebar-tutup').addEventListener('click', function () { body.classList.toggle('sidebar-sembunyi'); });
  var burger = document.createElement('button');
  burger.type = 'button'; burger.className = 'sidebar-buka'; burger.setAttribute('aria-label', 'Buka menu pengurus');
  burger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var header = document.querySelector('[data-komponen="admin-header"]');
  if (header) header.insertBefore(burger, header.firstChild);
  burger.addEventListener('click', function (e) { e.stopPropagation(); body.classList.toggle('sidebar-muncul'); });
  document.addEventListener('click', function (e) {
    if (body.classList.contains('sidebar-muncul') && !wadah.contains(e.target)) body.classList.remove('sidebar-muncul');
  });
})();
