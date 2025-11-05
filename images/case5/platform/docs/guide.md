# Panduan Pengguna  
Berikut langkah‑langkah penggunaan portal ini:

## Prasyarat  
- Sudah menjalankan container via `docker run -d --name docsportal -p 8080:80 docsportal:1.0`  
- Akses browser ke `http://<HOST‑IP>:8080`  

## Navigasi Portal  
1. Halaman **Home** (`index.md`) menyediakan ringkasan dan akses cepat ke bagian penting.  
2. Klik menu **Panduan Pengguna** untuk melihat detail lebih lanjut.  
3. Klik bagian **Masukkan Umpan Balik** jika ingin memberikan saran atau laporan bug.  

## Fitur‑Fitur  
- Dokumentasi dibangun dari file Markdown (`docs/`) → dikompilasi menjadi situs statis.  
- Formulir feedback mengirim data ke backend API dan menyimpannya dalam file JSON.  
- Nginx digunakan sebagai web server utama, dan API backend berjalan berdampingan dalam satu container.  
- Supervisord memastikan kedua layanan (web + API) berjalan terus‑menerus.  

## Cara Memberikan Feedback  
- Buka `Menu → Masukkan Umpan Balik`  
- Isi formulir dengan nama, email, dan pesan Anda  
- Tekan **Submit**  
- Data akan tersimpan dan dapat diakses admin melalui endpoint `GET /api/feedback`  

## Pembaruan Dokumen  
- Untuk menambah atau memperbarui konten dokumentasi, edit file markdown dalam folder `docs/`  
- Jalankan ulang:  
  ```bash
  ./build.sh
  ./run‑docs.sh
