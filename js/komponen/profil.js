(function () {
  'use strict';

  /* ===== Data konten ===== */
  var contents = [
    { title: 'Workshop Robotika untuk Anggota Baru', type: 'Berita', meta: 'Berita', status: 'Terbit', cls: 'terbit', date: '18 Nov 2026' },
    { title: 'Juara 1 Lomba Line Follower Nasional', type: 'Prestasi', meta: 'Prestasi', status: 'Menunggu review', cls: 'review', date: '17 Nov 2026' },
    { title: 'Dasar Pemrograman Arduino', type: 'Modul', meta: 'Modul · PDF, 2,4 MB', status: 'Terbit', cls: 'terbit', date: '16 Nov 2026' },
    { title: 'Persiapan Kompetisi Robot Indonesia', type: 'Berita', meta: 'Berita', status: 'Draf', cls: 'draf', date: '15 Nov 2026' }
  ];

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ===== Toast ===== */
  var toast = $('#toast'), toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ===== Render tabel ===== */
  var tbody = $('#contentBody'), foot = $('#tableFoot');
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function render(filter) {
    var rows = contents.filter(function (c) { return filter === 'all' || c.type === filter; });
    if (!rows.length) {
      tbody.innerHTML = '<tr class="no-data"><td colspan="4">Belum ada konten di kategori ini.</td></tr>';
    } else {
      tbody.innerHTML = rows.map(function (c) {
        return '<tr>' +
          '<td><span class="t">' + escapeHtml(c.title) + '</span><span class="s">' + escapeHtml(c.meta) + '</span></td>' +
          '<td><span class="status ' + c.cls + '">' + c.status + '</span></td>' +
          '<td>' + c.date + '</td>' +
          '<td><button class="edit" data-title="' + escapeHtml(c.title) + '">Edit</button></td>' +
          '</tr>';
      }).join('');
    }
    foot.textContent = 'Menampilkan ' + rows.length + ' konten dari seluruh kontribusi Anda';
  }
  render('all');

  /* ===== Filter ===== */
  $('#filters').addEventListener('click', function (e) {
    var btn = e.target.closest('.pill');
    if (!btn) return;
    $$('.pill').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    render(btn.dataset.filter);
  });

  /* ===== Aksi edit (delegasi) ===== */
  tbody.addEventListener('click', function (e) {
    var b = e.target.closest('.edit');
    if (b) showToast('Mengedit: ' + b.dataset.title);
  });

  /* ===== Tab utama ===== */
  function activateTab(name) {
    $$('.tab').forEach(function (t) { t.classList.toggle('active', t.dataset.tab === name); });
    $$('.panel').forEach(function (p) { p.classList.toggle('active', p.id === 'panel-' + name); });
  }
  $('#mainTabs').addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (t) activateTab(t.dataset.tab);
  });
  $('#seeAll').addEventListener('click', function (e) {
    e.preventDefault();
    activateTab('konten');
  });

  /* ===== Dropdown pengguna ===== */
  var btn = $('#userBtn'), dd = $('#userDropdown');
  function closeMenu() { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ===== Tombol aksi ===== */
  $$('[data-toast]').forEach(function (b) {
    b.addEventListener('click', function () { showToast(b.dataset.toast); });
  });
  $('#editProfile').addEventListener('click', function () { showToast('Membuka form edit profil...'); });
  $('#avatarEdit').addEventListener('click', function () { showToast('Pilih foto profil baru...'); });

  /* ===== Pencarian ===== */
  $('#searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && this.value.trim()) showToast('Mencari: ' + this.value.trim());
  });
})();

const profileTrigger = document.getElementById("profileTrigger");
const profileDropdown = document.getElementById("profileDropdown");

function openDropdown() {
    profileDropdown.hidden = false;
    profileTrigger.classList.add("active");
    profileTrigger.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
    profileDropdown.hidden = true;
    profileTrigger.classList.remove("active");
    profileTrigger.setAttribute("aria-expanded", "false");
}

profileTrigger.addEventListener("click", (event) => {
    event.stopPropagation();

    if (profileDropdown.hidden) {
        openDropdown();
    } else {
        closeDropdown();
    }
});

// Klik di luar dropdown
document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile-container")) {
        closeDropdown();
    }
});

// Tombol Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeDropdown();
        profileTrigger.focus();
    }
});
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const uploadBtn = document.getElementById('uploadBtn');
const statusText = document.getElementById('statusText');

let selectedFile = null;

// 1. Handle file selection & instant preview
avatarInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type and size (max 2MB)
  if (!file.type.startsWith('image/')) {
    statusText.textContent = 'Please select a valid image file.';
    avatarInput.value = '';
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    statusText.textContent = 'Image must be smaller than 2MB.';
    avatarInput.value = '';
    return;
  }

  selectedFile = file;
  statusText.textContent = '';

  // Display instant preview
  avatarPreview.src = URL.createObjectURL(file);
});

// 2. Upload the file to your server
avatarEdit.addEventListener('click', async () => {
  if (!selectedFile) {
    statusText.textContent = 'Please choose an image first.';
    return;
  }

  const formData = new FormData();
  formData.append('profile_picture', selectedFile);

  statusText.textContent = 'Uploading...';

  try {
    // Replace '/api/upload-profile' with your actual backend endpoint
    const response = await fetch('/api/upload-profile', {
      method: 'POST',
      body: formData // Do NOT manually set Content-Type header; the browser sets it automatically
    });

    if (!response.ok) throw new Error('Server error during upload');

    const result = await response.json();
    statusText.textContent = 'Profile picture updated!';
    console.log('Server response:', result);
  } catch (error) {
    statusText.textContent = 'Upload failed. Please try again.';
    console.error(error);
  }
});

