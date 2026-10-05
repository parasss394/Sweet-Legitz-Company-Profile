// ================================================
// BAGIAN 0: TAHUN OTOMATIS DI FOOTER
// ================================================

// new Date().getFullYear() artinya "ambil tahun sekarang dari komputer/HP pengunjung"
// misal sekarang 2026, maka nilainya = 2026
// textContent = ... artinya "tulis angka itu ke dalam elemen HTML ber-id 'year'"
// Jadi teks "© 2026 Sweet Legitz" di footer akan otomatis update sendiri tiap tahun,
// tanpa perlu kamu edit manual setiap kali tahun berganti
document.getElementById('year').textContent = new Date().getFullYear();


// ================================================
// BAGIAN 1: MENU HAMBURGER (tombol ☰ khusus tampilan HP)
// ================================================

// Langkah 1: ambil elemen HTML yang kita butuhkan, simpan ke variabel
// document.getElementById("xxx") artinya "cari elemen HTML yang id-nya xxx"
const menuBtn = document.getElementById("menu-btn"); // tombol ☰
const navMenu = document.getElementById("nav-menu"); // daftar menu (Beranda, Tentang Kami, dst)

// Langkah 2: pasang "pendengar klik" pada tombol menu
// Artinya: "kalau tombol ini diklik, jalankan kode di dalam kurung kurawal { }"
menuBtn.addEventListener("click", function () {

  // classList.toggle("active") artinya:
  // - kalau menu belum kelihatan (belum punya class "active") -> tampilkan
  // - kalau menu sudah kelihatan (sudah punya class "active")  -> sembunyikan
  navMenu.classList.toggle("active");

});


// Langkah 3: tutup menu otomatis saat salah satu link menu diklik
// (supaya nyaman dipakai di HP, menu tidak perlu ditutup manual)

// querySelectorAll(".nav-menu a") artinya:
// "ambil SEMUA tag <a> yang ada di dalam elemen class nav-menu"
// hasilnya berupa daftar/list berisi 5 link (Beranda, Tentang Kami, dst)
const navLinks = document.querySelectorAll(".nav-menu a");

// Karena hasilnya berupa DAFTAR (bukan satu elemen saja),
// kita perlu ulangi kode di bawah untuk SETIAP link satu per satu.
// forEach artinya "lakukan hal berikut untuk setiap item dalam daftar"
navLinks.forEach(function (satuLink) {

  // pasang juga "pendengar klik" di setiap link menu
  satuLink.addEventListener("click", function () {

    // classList.remove("active") artinya: hapus class "active"
    // jadi menu langsung tertutup lagi setelah link diklik
    navMenu.classList.remove("active");

  });

});


// ================================================
// BAGIAN 2: FORM KONTAK (validasi + kirim pesanan ke WhatsApp)
// ================================================

// Ambil elemen form dan elemen tempat menampilkan pesan status
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Nomor WhatsApp TOKO (tempat pesanan akan masuk)
// Ganti dengan nomor WA asli kamu, pakai kode negara 62, tanpa angka 0 di depan
// Contoh: nomor 0812-3456-7890 ditulis jadi 6281234567890
const nomorWhatsAppToko = "6282230744667";

// Pasang "pendengar submit" pada form
// "submit" adalah event yang terjadi saat tombol "Kirim Pesanan" ditekan
contactForm.addEventListener("submit", function (event) {

  // Mencegah halaman reload/refresh saat form dikirim
  // (perilaku default browser: form selalu me-reload halaman, ini kita matikan)
  event.preventDefault();

  // Ambil nilai yang sudah diketik user di setiap kolom input
  // .value artinya "ambil teks yang ada di dalam kolom itu sekarang"
  const name = document.getElementById("name").value;
  const whatsapp = document.getElementById("whatsapp").value; // nomor WA pemesan
  const message = document.getElementById("message").value;

  // Cek: apakah ada kolom yang masih kosong?
  // tanda === artinya "sama dengan", tanda || artinya "atau"
  const adaYangKosong = name === "" || whatsapp === "" || message === "";

  if (adaYangKosong) {
    // Jika ada yang kosong: tampilkan pesan merah, lalu hentikan kode di sini
    formStatus.style.color = "red";
    formStatus.textContent = "Mohon lengkapi semua field terlebih dahulu.";
    return; // "return" artinya berhenti, baris di bawahnya tidak dijalankan
  }

  // Susun teks pesan yang akan dikirim ke WhatsApp toko
  // \n artinya "ganti baris baru" di dalam teks
  const teksPesan =
    "Halo Sweet Legitz, saya mau pesan:\n" +
    "Nama: " + name + "\n" +
    "No. WhatsApp: " + whatsapp + "\n" +
    "Pesanan: " + message;

  // encodeURIComponent() mengubah teks biasa jadi format yang aman dipakai di URL
  // (spasi, baris baru, dll diubah jadi kode khusus supaya link tidak rusak)
  const teksUntukLink = encodeURIComponent(teksPesan);

  // Susun link WhatsApp lengkap: nomor TOKO + pesan otomatis dari form
  const linkWhatsApp = "https://wa.me/" + nomorWhatsAppToko + "?text=" + teksUntukLink;

  // Buka link itu di tab baru (otomatis membuka aplikasi/situs WhatsApp)
  window.open(linkWhatsApp, "_blank");

  // Tampilkan pesan status warna hijau
  formStatus.style.color = "green";
  formStatus.textContent = "Mengarahkan ke WhatsApp...";

  // Kosongkan kembali semua kolom form setelah berhasil dikirim
  contactForm.reset();

});