# ZheChaos

Game party multiplayer berbasis web. Proyek ini dibuat dengan HTML, CSS, dan JavaScript modules sehingga bisa langsung dibuka dan diedit di Visual Studio Code.

## Menjalankan di VS Code

1. Buka folder `zhechaos` di VS Code.
2. Pasang ekstensi **Live Server** atau jalankan server lokal lain. Kamera browser memerlukan `localhost` atau HTTPS.
3. Sebelum membuat room multiplayer, sambungkan Firebase dengan langkah di bawah.
4. Klik kanan `index.html` → **Open with Live Server**.

## Sambungkan Firebase Realtime Database

Firebase menyimpan room, pemain, selfie avatar, status cup, tebakan, timer, poin, dan nyawa agar semua perangkat melihat permainan yang sama.

1. Buat project di [Firebase Console](https://console.firebase.google.com/).
2. Aplikasi Web ZheChaos sudah memakai konfigurasi project Firebase yang diberikan. Kalau memakai project lain, ganti nilai config di `firebase.js`.
3. Aktifkan **Authentication → Sign-in method → Anonymous**.
4. Buat **Realtime Database**. Pilih lokasi yang dekat dengan pemain.
5. Buka tab **Rules** di Realtime Database dan salin isi `database.rules.json`, lalu klik **Publish**.
6. Muat ulang website. Coba buat room, salin link atau scan QR, lalu buka di perangkat lain. Untuk uji coba beberapa pemain dalam browser yang sama, buka link di tab baru; setiap tab mendapat ID pemainnya sendiri.

Selfie dikompres di browser menjadi foto persegi JPEG berukuran 360 × 360 sebelum dikirim. Browser meminta izin kamera. Jika izin kamera tidak tersedia, pilih foto dari perangkat.

### Catatan keamanan

Rules contoh membatasi akses ke pengguna yang sudah login anonim. Semua pemain yang dapat masuk masih dapat mengirim perubahan room melalui browser, jadi gunakan untuk permainan teman atau demo kelas. Untuk game publik/berhadiah, pindahkan tindakan host dan perhitungan skor ke backend tepercaya, lalu buat rules yang memvalidasi setiap perubahan.

## File gambar yang bisa diganti

Semua file HTML, CSS, JavaScript, dan gambar berada langsung dalam folder `zhechaos` supaya gampang diunggah ke hosting statis. Ganti file gambar dengan file PNG bernama sama. Untuk musik, taruh lagu sebagai `music.mp3` di folder yang sama. Lihat `STYLE_GUIDE.md` untuk panduan visual.

| File | Dipakai untuk |
| --- | --- |
| `bg1.png` | Layar awal, pilihan room, profil, dan lobby |
| `bg2.png` | Layar penghubung ketika koneksi room sedang disiapkan |
| `bg3.png` | Arena permainan Find the Ball |
| `bg4.png` | Layar podium dan hasil akhir |
| `cup.png` | Tampilan cup di arena; gambar sebaiknya PNG transparan |
| `ball.png` | Tampilan bola saat cup diangkat; PNG transparan |

File background di atas bisa diganti kapan saja. Arena menata maksimal 12 cup dalam beberapa baris agar masih terbaca di HP.

Jika muncul pesan **“Realtime Database belum membalas”**, room belum berhasil dibuat atau dibuka. Periksa lagi `databaseURL` dengan menyalin URL persis dari tab **Realtime Database → Data**, termasuk domain/regionnya.

Cup dan bola memakai PNG transparan tanpa duplikasi bentuk CSS. Satu bola akan terlihat saat hitungan 3–2–1 dan ketika cup jawaban dibuka.

## Menambahkan mode game

1. Buat file baru di folder utama project, misalnya `memory-match.js`.
2. Ekspor objek mode berisi `id`, `title`, `subtitle`, `icon`, `minPlayers`, `initialCupCount`, dan `guessSeconds`.
3. Impor file itu dan tambahkan ke array `modes` di `modes.js`.
4. Buat renderer dan aturan ronde mode baru di modulnya. Service room dan UI lobby sudah membaca daftar mode dari `modes.js`.

Mode yang disertakan sekarang adalah **Find the Ball**: host menukar cup, pemain bisa mengubah pilihan sampai waktu habis, dan pemain yang belum memilih mendapat pilihan acak. Host dapat melihat vote langsung, membuka cup untuk memindahkan bola, menambah cup, dan mengakhiri game untuk menampilkan podium.

## Struktur folder

Semua file ada langsung di satu folder, tanpa subfolder. Buka folder ini sebagai root project di VS Code atau jadikan folder ini sebagai direktori publik Firebase Hosting.

```text
zhechaos/
├── index.html
├── styles.css
├── app.js
├── firebase.js
├── room-service.js
├── modes.js
├── find-the-ball.js
├── database.rules.json
├── bg1.png … bg4.png
├── cup.png
├── ball.png
├── logo.png
├── candy.png       (opsional; ada fallback candy.svg)
├── robux.png       (opsional; ada fallback robux.svg)
├── music.mp3       (opsional; bisa juga music.m4a / music.ogg / music.wav)
├── candy.svg
├── robux.svg
└── README.md / STYLE_GUIDE.md
```

JavaScript tetap berupa beberapa file kecil di folder yang sama agar daftar mode mudah dikembangkan. Karena `index.html` memakai ES modules, jalankan lewat Live Server atau HTTPS, bukan dibuka langsung sebagai `file://`.

## Ganti gambar dan backsound

- `logo.png`: logo website.
- `bg1.png`: halaman awal, pilihan buat/join, profil, dan lobby.
- `bg2.png`: animasi layar koneksi/loading.
- `bg3.png`: arena Find the Ball.
- `bg4.png`: podium dan hasil akhir.
- `cup.png` dan `ball.png`: gambar transparan untuk cup dan bola.
- `candy.png` dan `robux.png`: gambar hadiah transparan. Kalau file PNG belum ditambahkan, UI memakai `candy.svg` dan `robux.svg` sebagai cadangan.
- `music.mp3`: backsound. Pemutar dibuat satu kali di luar layar game dan di-loop, jadi tidak dimulai ulang saat pindah screen. Tombol not musik di kanan bawah untuk mute/unmute. Browser mulai memutarnya setelah pemain menekan Play.

Salin gambar baru ke folder utama project dan gunakan nama di atas; tidak perlu membuat folder aset.


## Instruksi ronde dan klaim juara

- Saat host memulai, setiap pemain menekan **Aku Siap** setelah membaca instruksi. Host dapat memulai hitung mundur setelah semua pemain siap.
- Selama permainan, tanda lokasi bola hanya tampil di layar host. Tombol **Pindahkan Bola** muncul saat host mengatur cup.
- Juara 1 dapat memilih permen atau Robux. Klaim dan username Roblox tampil langsung di panel host pada layar podium; host tetap berada di panel klaim dan tidak diminta keluar. Admin menyerahkan hadiah secara langsung; website hanya mencatat permintaan klaim.
- Template cadangan klaim ada di `candy.svg` dan `robux.svg`. Kamu bisa menaruh `candy.png` dan `robux.png` di folder utama untuk mengganti gambar yang tampil.
