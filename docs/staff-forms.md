# Pusat Borang

Halaman: `/portal/borang`.

Halaman ini tidak dipautkan dalam navigasi awam, footer atau sitemap. Ia menggunakan
meta `noindex, nofollow`, dan laluan `/portal/` sudah dikecualikan dalam `robots.txt`.
Kongsi URL secara terus kepada admin dan guru.

**Ini ialah pautan tersembunyi, bukan kawalan akses.** Laman ini belum mempunyai
sistem pengesahan pengguna. Sesiapa yang mendapat URL boleh membuka halaman dan
pautan Google Forms. Jangan anggap tetapan carian atau URL sebagai pengganti log masuk.
Untuk sekatan sebenar, perlukan pengesahan admin/guru pada pelayan dan tetapan
akses responden yang bersesuaian pada setiap Google Form.

Empat borang unik ditetapkan dalam `src/data/staffForms.ts`. Pautan pertukaran mod
kelas yang berulang dalam senarai asal hanya dipaparkan sekali. ID borang, tajuk
dan penerangan boleh dikemas kini di fail tersebut.

Tiga borang urusan kelas dimuatkan dalam iframe hanya apabila pengguna menekan “Isi borang”.
Hanya satu borang dimuatkan pada satu masa. Pengguna diminta mengesahkan sebelum
menukar atau menutup borang melalui modal dialog untuk mengurangkan kehilangan
jawapan belum dihantar. Modal menyokong papan kekunci, Escape, klik latar dan
pemulangan fokus. Pilihan awal ialah “Kekalkan borang”.
Penghantaran dan penyimpanan jawapan diuruskan oleh Google Forms asal.

Jika Google menyekat paparan iframe atau memerlukan log masuk, gunakan
“Buka di Google Forms” untuk membuka borang asal dalam tab baharu. Pendaftaran
Tutor 2027 dibuka terus dalam tab baharu kerana URL `embedded=true`
mengembalikan HTTP 401 semasa semakan automatik. Pemilik borang perlu menyemak
tetapan penerbitan/akses di Google jika mahukan paparan terbenam untuk semua pengguna.

Pelayan hos mesti menyokong SPA fallback ke `index.html` untuk pautan terus
`/portal/borang`, seperti laluan portal sedia ada.

## Rekod Prestasi Pelajar

Halaman: `/portal/borang/rekod-guru`. Guru mengisi borang di website, dan rekod
masuk ke Google Sheet melalui `docs/apps-script/laporan-prestasi.gs`.

1. Dalam Google Sheet, buka **Extensions > Apps Script** dan tampal kandungan fail itu.
2. Pilih fungsi `setupLaporanPrestasi`, tekan **Run** dan benarkan akses.
3. Masukkan nama dan No. IC setiap guru dalam tab `Guru`. Hadkan akses Sheet kepada admin.
4. Pilih **Deploy > New deployment > Web app**. Tetapkan **Execute as: Me** dan
   **Who has access: Anyone**, kemudian salin URL `/exec`.
5. Tetapkan `VITE_REKOD_GURU_URL=<URL /exec>` dalam `.env.local` untuk pembangunan
   dan dalam tetapan hosting untuk production, kemudian build semula.

Selepas mengubah skrip, terbitkan versi baharu melalui **Deploy > Manage deployments**.
Padam baris guru dalam tab `Guru` untuk menarik balik akses. No. IC tidak disimpan
dalam `Rekod Guru`, dan nama guru pada rekod diambil daripada tab `Guru`.

Senarai subjek dan darjah berada dalam `src/data/teacherRecord.ts`. Rekod yang sama
(pelajar, tempoh dan subjek) ditolak, jadi pembetulan dibuat oleh admin dalam Sheet.
