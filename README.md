# Jelajah Batu-Malang - Landing Page Pariwisata & Manajemen Destinasi

Platform landing page pariwisata interaktif untuk destinasi populer di Kota Batu & Malang Raya, dilengkapi dengan panel **Manajemen Data Terpadu (CRUD)** terhubung ke PostgreSQL cloud database **Supabase** serta backup otomatis di **Local Storage**.

---

## 🌟 Fitur Utama (Sesuai PRD & Desain)

1. **Header & Navbar:**
   - Brand logo & identitas Jelajah Batu-Malang.
   - Navigasi cepat: *Destinasi*, *Kategori*, *Tentang Kami*, *Kelola Wisata (CRUD)*.
   - Indikator status live database Supabase / offline mode.
   - Tombol *Eksplor Sekarang* dan responsive mobile drawer menu.

2. **Hero Section:**
   - Visual backdrop lanskap pegunungan Kota Batu dengan gradient scrim berdaya kontras tinggi.
   - Overline badge: *Pesona Wisata Dataran Tinggi Jawa Timur*.
   - Filter bar interaktif: Pencarian nama/keyword, Filter kategori, dan Estimasi budget.
   - Quick Stat Badges: *50+ Destinasi Populer*, *4.9/5 Kepuasan Wisatawan*, *100% Alam Sejuk Pegunungan*.

3. **Katalog Destinasi Wisata (Read):**
   - Grid kartu responsif (1 kolom di HP, 2 di tablet, 3 di laptop/desktop).
   - Filter kategori dinamis (*Semua*, *Wisata Alam*, *Taman Hiburan / Rekreasi*, *Agrowisata*, *Edukasi Budaya*, *Kuliner & Cafe*).
   - Kartu destinasi lengkap dengan foto beranimasi zoom, badge kategori, rating bintang, harga tiket per orang, dan tombol *Detail Wisata*.
   - **Modal Pop-up Detail Wisata:** Menampilkan foto penuh, rincian fasilitas ramah keluarga, serta tautan langsung ke Google Maps.

4. **Manajemen Wisata Terpadu (Create, Update, Delete):**
   - **Formulir Interaktif (Kiri):** Tambah destinasi baru atau edit destinasi yang ada (*Nama*, *Kategori*, *Estimasi Tiket*, *Lokasi*, *URL Gambar*, *Deskripsi Singkat*).
   - **Tabel Data Terpadu (Kanan):** Pencarian instan, penomoran urut, foto mini, tag kategori, lokasi, harga tiket, status verifikasi, tombol edit, dan tombol hapus dengan dialog konfirmasi.
   - **Notifikasi Toast:** Umpan balik visual langsung saat data berhasil disimpan, diperbarui, atau dihapus.

5. **Ekosistem Wisata Ramah Keluarga & Berkelanjutan (Tentang Kami):**
   - Kartu fitur keunggulan iklim sejuk (15°C - 22°C) dan pemandu lokal berlisensi HPI.
   - Bukti sosial *1.200.000+* wisatawan.
   - Kolase lanskap panorama sentra pariwisata Kota Batu & badge prakiraan cuaca hari ini.

6. **Footer Lengkap:**
   - Profil pariwisata, kontak resmi Dinas Pariwisata Kota Batu (alamat, telepon, email), tombol sosial media, form berlangganan buletin mingguan, serta tautan legalitas.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Bundler & Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (Palet *Highland Pine & Alpine Cyan*, Tipografi *Epilogue* & *Inter*, Material Symbols Outlined)
- **Database & Cloud:** Supabase (`@supabase/supabase-js`) + Fallback LocalStorage

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Masuk ke folder proyek dan jalankan development server:
```bash
cd wisata-batu-malang
npm run dev
```
Buka browser pada alamat: **`http://localhost:5173/`**

### 2. Membangun versi produksi (Build):
```bash
npm run build
```

---

## 🗄️ Menghubungkan ke Supabase Database

Aplikasi sudah memiliki mode **Zero-Config Demo Mode** (berjalan langsung dengan data awal yang tersimpan aman di browser). Untuk menghubungkan ke database PostgreSQL cloud Supabase:

### Langkah A: Siapkan Tabel di Supabase
Buka **SQL Editor** pada project Supabase Anda, lalu salin dan jalankan script dari [supabase_schema.sql](../supabase_schema.sql):

```sql
CREATE TABLE IF NOT EXISTS public.destinasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT,
  gambar_url TEXT,
  lokasi TEXT DEFAULT 'Kota Batu, Jawa Timur',
  harga_tiket NUMERIC DEFAULT 0,
  rating NUMERIC DEFAULT 4.8,
  status TEXT DEFAULT 'Terverifikasi',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.destinasi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Akses Baca Publik" ON public.destinasi FOR SELECT USING (true);
CREATE POLICY "Akses Tambah Publik" ON public.destinasi FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Update Publik" ON public.destinasi FOR UPDATE USING (true);
CREATE POLICY "Akses Hapus Publik" ON public.destinasi FOR DELETE USING (true);
```

### Langkah B: Masukkan Kredensial
Terdapat 2 cara mudah:
1. **Langsung lewat UI Website:** Klik tombol **"Database Setup"** pada Navbar atau tombol **"Database Settings"** di Section CRUD, lalu masukkan Project URL dan Anon Key Anda.
2. **Lewat file `.env`:** Buat file `.env` di dalam folder `wisata-batu-malang/`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
