# Panduan Integrasi Supabase & Moderasi Maklum Balas AEDES-X
*(AEDES-X Supabase Integration & Feedback Moderation Guide)*

Dokumen ini menyediakan panduan langkah-demi-langkah yang lengkap untuk menyambungkan borang maklum balas pelawat ke pangkalan data awan **Supabase** (tier percuma), mengurus kelulusan ulasan, serta memastikan keselamatan data di GitHub Pages tanpa sebarang kunci rahsia dalam kod frontend.

---

## 1. Status Terkini Sistem Maklum Balas

- **Pembersihan Ulasan Olokan**: Semua ulasan dan testimoni rekaan telah **dibuang sepenuhnya** dari paparan umum.
- **Keadaan Kosong (Empty State)**: Seksyen kini memaparkan mesej rasmi:
  > *“Belum ada maklum balas dipaparkan. Jadilah orang pertama berkongsi pendapat.”*
  sehingga anda meluluskan kiriman sebenar melalui Supabase.
- **Penyimpanan Selamat**:
  - Pelawat menghantar borang → Disimpan dengan status `pending`.
  - Jika pilihan *“Benarkan maklum balas saya dipaparkan kepada umum”* tidak ditanda, kiriman disimpan sebagai peribadi (`is_public = false`) dan **tidak akan pernah** muncul pada kad awam.
  - Hanya kiriman berstatus `approved` **DAN** `is_public = true` yang akan ditarik dan dipaparkan di landing page.
- **Keselamatan RLS (Row Level Security)**: Pelawat umum hanya mempunyai hak `INSERT` (status mesti `pending`) dan hak `SELECT` (hanya baris `approved` + `is_public = true`). Mereka **tidak boleh** membaca kiriman peribadi, mengubah status, atau memadam data orang lain.

---

## 2. Langkah Pantas Menyiapkan Supabase (3 Minit)

### Langkah 1: Cipta Projek Percuma di Supabase
1. Layari [https://supabase.com](https://supabase.com) dan log masuk (boleh menggunakan akaun GitHub).
2. Klik **“New project”**, pilih organisasi anda, beri nama projek (contoh: `aedes-x-feedback`), dan tetapkan kata laluan pangkalan data yang kukuh.
3. Pilih wilayah terdekat (contoh: *Singapore* untuk sambungan paling pantas di Malaysia).

### Langkah 2: Jalankan Skrip Skema SQL
1. Di menu sebelah kiri dashboard Supabase, klik ikon **SQL Editor** (ikon `>_`).
2. Buka fail [`supabase-schema.sql`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/supabase-schema.sql) dalam projek ini, salin kesemua kandungannya.
3. Tampal ke dalam SQL Editor Supabase dan klik butang **“Run”** (di sudut bawah kanan).
4. Mesej `Success. No rows returned` akan dipaparkan. Ini menandakan:
   - Jadual `public.feedback` telah siap dibina.
   - Polisi keselamatan RLS telah diaktifkan secara automatik.
   - Bucket simpanan gambar `feedback-avatars` telah didaftarkan.

### Langkah 3: Dapatkan API Keys & Isi ke `supabase-config.js`
1. Di menu sebelah kiri dashboard Supabase, klik ikon **Project Settings** (ikon gear di bahagian bawah).
2. Klik menu **API**.
3. Cari dua maklumat berikut:
   - **Project URL** (contoh: `https://xyzprojectname.supabase.co`)
   - **Project API Keys** -> `anon` `public` key (bermula dengan `eyJhbGciOi...`)
4. Buka fail [`supabase-config.js`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/supabase-config.js) dalam projek ini dan gantikan string kosong:
   ```javascript
   window.AEDES_SUPABASE_CONFIG = {
     url: 'https://xyzprojectname.supabase.co',
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz...'
   };
   ```
5. Simpan fail. Sekarang landing page anda telah disambungkan secara langsung ke Supabase!

---

## 3. Cara Menyemak, Meluluskan & Mengurus Maklum Balas (Table Editor)

Anda boleh menguruskan segala maklum balas dengan mudah terus melalui antaramuka visual Supabase:

1. Di menu sebelah kiri Supabase, klik **Table Editor** (ikon jadual).
2. Pilih jadual **`feedback`**. Anda akan melihat semua kiriman pelawat.

### A. Untuk Meluluskan Maklum Balas ke Laman Web:
- Cari baris kiriman yang ingin diluluskan.
- Klik pada kolum **`status`** (nilainya kini `pending`).
- Tukar nilai teks menjadi:
  ```text
  approved
  ```
- Pastikan kolum **`is_public`** bernilai `true` (jika pelawat membenarkan paparan awam).
- Selesai! Muat semula landing page AEDES-X, kad maklum balas tersebut akan serta-merta muncul di seksyen *Suara Pelawat*.

### B. Untuk Menyembunyikan Semula Maklum Balas:
- Tukar kolum `status` menjadi `hidden` atau tukar `is_public` menjadi `false`.
- Kad tersebut akan hilang serta-merta dari paparan awam laman web.

### C. Untuk Memadam Maklum Balas:
- Klik kanan pada baris tersebut (atau tanda kotak di sebelah kiri baris) dan pilih **“Delete 1 row”**.

---

## 4. Struktur Data Jadual `public.feedback`

| Medan | Jenis | Penerangan |
| :--- | :--- | :--- |
| `id` | UUID | Kunci unik kiriman (dijana secara automatik). |
| `created_at` | Timestamptz | Tarikh dan masa kiriman dihantar. |
| `opinion` | Text | Pilihan pelawat: `'menarik'`, `'tambah_baik'`, atau `'kurang_sesuai'`. |
| `feedback` | Text | Kandungan pendapat atau cadangan bertulis pelawat. |
| `name` | Text | Nama atau nama panggilan pelawat (pilihan). |
| `avatar_url` | Text | URL gambar profil pelawat yang dimuat naik (pilihan). |
| `is_public` | Boolean | `true` jika pelawat membenarkan paparan umum; `false` jika peribadi. |
| `status` | Text | Status kelulusan: `'pending'`, `'approved'`, `'rejected'`, atau `'hidden'`. |

---

## 5. Ringkasan Fail Terlibat

1. [`supabase-config.js`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/supabase-config.js) — Tempat meletakkan Project URL dan public anon key.
2. [`supabase-schema.sql`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/supabase-schema.sql) — Skrip SQL pangkalan data, polisi RLS, dan bucket avatar.
3. [`feedback-data.json`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/feedback-data.json) — Bersih daripada sebarang data palsu (`[]`).
4. [`index.html`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/index.html) — Memuatkan pustaka Supabase JS CDN, seksyen *Suara Pelawat*, butang maskot dengan pill label, dan seksyen penutup *Finale*.
5. [`app.js`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/app.js) — Logik sambungan Supabase, muat naik gambar profil, borang semakan, dan peralihan dwi-bahasa BM/EN.
6. [`styles.css`](file:///c:/Dev/AEDES-X-IoT-Rangers-Landing-Page/styles.css) — Reka bentuk responsif butang maskot berlabel, seksyen maklum balas, dan seksyen penutup *Finale*.
