/* komponen/footer.js : FOOTER satu sumber untuk semua halaman publik
   Pakai di halaman:  <footer data-komponen="footer"></footer>
   Gaya: css/footer.css
  */
(function () {
  'use strict';
  var wadah = document.querySelector('[data-komponen="footer"]');
  if (!wadah) return;

  // ISI kontak di SINI saja, otomatis berlaku di semua halaman.
  var KONTAK = {
    whatsappLink: 'https://wa.me/628xxxxxxxxxx',   // format 62..., tanpa 0 / +
    whatsappTeks: '[Nomor WhatsApp UKM]',
    emailLink: 'mailto:email-ukm@contoh.ac.id',
    emailTeks: '[Email UKM]',
    instagram: '#',
    tiktok: '#',
    youtube: '#'
  };

  wadah.innerHTML =
    '<h2>Apakah ada pertanyaan?</h2>' +
    '<p>Jika anda bingung segera hubungi kontak kami</p>' +
    '<p><a href="pendaftaran.html#kontak">Hubungi kami</a></p>' +
    '<nav aria-label="Navigasi footer"><ul>' +
      '<li><a href="modul.html">Modul</a></li>' +
      '<li><a href="prestasi.html">Prestasi</a></li>' +
      '<li><a href="tentang-kami.html">Tentang kami</a></li>' +
      '<li><a href="pendaftaran.html#kontak">Kontak kami</a></li>' +
    '</ul></nav>' +
    '<address>' +
      '<p><strong>WhatsApp</strong><br><a href="' + KONTAK.whatsappLink + '">' + KONTAK.whatsappTeks + '</a></p>' +
      '<p><strong>Email</strong><br><a href="' + KONTAK.emailLink + '">' + KONTAK.emailTeks + '</a></p>' +
    '</address>' +
    '<p><strong>SIROBOT</strong> – Akun media sosial kami:<br>' +
      '<a href="' + KONTAK.instagram + '">Instagram</a> | ' +
      '<a href="' + KONTAK.tiktok + '">TikTok</a> | ' +
      '<a href="' + KONTAK.youtube + '">YouTube</a></p>' +
    '<p><small>&copy; 2026 UKM Robotika IR64 POLIJE</small></p>';
})();
