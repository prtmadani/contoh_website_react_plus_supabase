-- ====================================================================
-- SKEMA DATABASE SUPABASE: PORTAL PARIWISATA BATU & MALANG
-- Project URL: https://tzgstfbmezlbnqysumqc.supabase.co
-- ====================================================================

-- 1. TABEL UTAMA: destinasi (Katalog & Manajemen CRUD Destinasi Wisata)
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL PENDUKUNG: kategori_wisata (Master Data Kategori)
CREATE TABLE IF NOT EXISTS public.kategori_wisata (
  id SERIAL PRIMARY KEY,
  nama_kategori TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  deskripsi TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL PENDUKUNG: buletin_wisata (Langganan Newsletter Footer)
CREATE TABLE IF NOT EXISTS public.buletin_wisata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'Aktif',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL PENDUKUNG: ulasan_destinasi (Rating & Review Wisatawan)
CREATE TABLE IF NOT EXISTS public.ulasan_destinasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destinasi_id UUID REFERENCES public.destinasi(id) ON DELETE CASCADE,
  nama_pengulas TEXT NOT NULL,
  rating NUMERIC CHECK (rating >= 1 AND rating <= 5),
  komentar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) & KEBIJAKAN AKSES (POLICIES)
-- ====================================================================

-- Aktifkan RLS pada seluruh tabel
ALTER TABLE public.destinasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kategori_wisata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buletin_wisata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ulasan_destinasi ENABLE ROW LEVEL SECURITY;

-- Policy untuk tabel `destinasi` (Publik diperbolehkan Read, Insert, Update, Delete)
DROP POLICY IF EXISTS "Akses Baca Publik Destinasi" ON public.destinasi;
DROP POLICY IF EXISTS "Akses Tambah Publik Destinasi" ON public.destinasi;
DROP POLICY IF EXISTS "Akses Update Publik Destinasi" ON public.destinasi;
DROP POLICY IF EXISTS "Akses Hapus Publik Destinasi" ON public.destinasi;

CREATE POLICY "Akses Baca Publik Destinasi" 
ON public.destinasi FOR SELECT 
USING (true);

CREATE POLICY "Akses Tambah Publik Destinasi" 
ON public.destinasi FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Akses Update Publik Destinasi" 
ON public.destinasi FOR UPDATE 
USING (true);

CREATE POLICY "Akses Hapus Publik Destinasi" 
ON public.destinasi FOR DELETE 
USING (true);

-- Policy untuk tabel `kategori_wisata`
DROP POLICY IF EXISTS "Akses Baca Kategori" ON public.kategori_wisata;
CREATE POLICY "Akses Baca Kategori" 
ON public.kategori_wisata FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Akses Kelola Kategori" ON public.kategori_wisata;
CREATE POLICY "Akses Kelola Kategori" 
ON public.kategori_wisata FOR ALL 
USING (true);

-- Policy untuk tabel `buletin_wisata`
DROP POLICY IF EXISTS "Akses Tambah Buletin" ON public.buletin_wisata;
CREATE POLICY "Akses Tambah Buletin" 
ON public.buletin_wisata FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Akses Baca Buletin" ON public.buletin_wisata;
CREATE POLICY "Akses Baca Buletin" 
ON public.buletin_wisata FOR SELECT 
USING (true);

-- Policy untuk tabel `ulasan_destinasi`
DROP POLICY IF EXISTS "Akses Baca Ulasan" ON public.ulasan_destinasi;
CREATE POLICY "Akses Baca Ulasan" 
ON public.ulasan_destinasi FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Akses Tambah Ulasan" ON public.ulasan_destinasi;
CREATE POLICY "Akses Tambah Ulasan" 
ON public.ulasan_destinasi FOR INSERT 
WITH CHECK (true);

-- ====================================================================
-- SEED DATA AWAL (Wisata Populer Batu & Malang Sesuai Desain UI)
-- ====================================================================

-- Isi Master Kategori
INSERT INTO public.kategori_wisata (nama_kategori, slug, deskripsi, icon)
VALUES
  ('Wisata Alam', 'alam', 'Pemandangan alam pegunungan, air terjun, dan perbukitan sejuk', 'nature_people'),
  ('Rekreasi & Hiburan', 'rekreasi', 'Theme park modern dan wahana permainan keluarga berstandar internasional', 'attractions'),
  ('Agrowisata', 'agrowisata', 'Wisata petik buah segar, perkebunan apel legendaris, dan edukasi pertanian', 'agriculture'),
  ('Edukasi Budaya', 'edukasi', 'Museum transportasi, museum sejarah, seni, dan warisan budaya nusantara', 'museum'),
  ('Kuliner & Cafe', 'kuliner', 'Pusat jajanan tradisional khas Batu-Malang dan cafe panorama alam', 'restaurant')
ON CONFLICT (slug) DO NOTHING;

-- Isi Destinasi Awal
INSERT INTO public.destinasi (nama, kategori, deskripsi, gambar_url, lokasi, harga_tiket, rating, status)
VALUES
  (
    'Jatim Park 3 & Dino Park',
    'Rekreasi & Hiburan',
    'Taman hiburan futuristik bertema dinosaurus dengan teknologi augmented reality dan wahana spektakuler ramah keluarga.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCTW5FcFnE0TyYVTiARDK_TG4lO82U5TVPoO5lDrOjcIwtfdtT8c6yyhlbhCcMyZVhaMYwylPXwEBTQfooj2Hqljx7xEWTvpNm9SXFXDo4xDTN9KBgKOymiqVfOPeFqRKymAMh84EOCGGVo7dHUlXGq3ULVz5Hp5KuadyIfNHLCWFuVcg7Fuz_SG6j-2q7_1piuy0Z-BBxbzdgNHJ_kYb28MPF09y9T5PEcOtV_EUQ',
    'Jl. Ir. Soekarno, Kota Batu',
    100000,
    4.8,
    'Terverifikasi'
  ),
  (
    'Coban Rondo & Labirin Hijau',
    'Wisata Alam',
    'Air terjun megah di lereng pegunungan dengan labirin taman hijau asri dan udara sejuk khas hutan pinus alami.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC1ZzQH0SFQvbYDJt_yog9bI3P4Ie0eX06XYCHiQGVI0wBJg4t6OXGwm0oK3XDTSx_d2PKvl4s-Za_0OfsIULfBayzcun-CcoxogHzvk6lAu8SokLFnxMgUddEhmeTVPVg--tSneQMbDW-Dr7OKw0cw1mpeRcBvO433peEOjQq6LcGe3FoDllPBJe44HgONP7uEh7zoPshuZDVNAc0RuAn0XsAQ8dW4WoP_5AIcV8A',
    'Pujon, Malang Raya',
    35000,
    4.7,
    'Terverifikasi'
  ),
  (
    'Kusuma Agrowisata Petik Apel',
    'Agrowisata',
    'Sensasi memetik apel Malang segar langsung dari pohon dengan panorama Gunung Panderman nan memikat.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBPtMn_sqZ4oTFpDa2s9Sp_NFzROtobO11A4GxuvdTMXn89wG7NDDrMXTpuNm4zTGocn3YBdvwRyXFbP98D2GaL4FW1TcekIZJGIgX8oVTIaF-e8PXPkxMutUlGcRMCNtBDiCLq7ZJH93se5m8Ka_Jv-eLQkzbSLLSwwfQKWuzO-d5mJPWjUMW0SDha2fNSCLa8seDtpokEbHXhZkzRFk7VLg1kwvMJYtrbtzAb29M',
    'Bumiaji, Kota Batu',
    45000,
    4.9,
    'Terverifikasi'
  ),
  (
    'Museum Angkut Batu',
    'Edukasi Budaya',
    'Koleksi kendaraan klasik internasional dengan zona bertema Hollywood, Eropa, dan Batavia tempo dulu.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC8d-U1EbPpp7bflyKSKoNon0qfDsEnnHG6eOCFrvvGbwJCNlqB2HPyiwlX_LzpwTnkvVGqsW3Uc48_aVNvUkGQxVlYLh8XCC-fMwmHYwWoEA4fvnzUij9IE9z7t7dIvweFq7nJ7uJlAYufPS06zAyqiD8nCBA4MvdZa6R9uXl3XNvMhBje0q6DpDLDC8XFu-eQ_Q3GgUsAmUNYK3MMYNY4CpvN3qPhKuBuYqUZtQw',
    'Jl. Terusan Sultan Agung, Batu',
    110000,
    4.9,
    'Terverifikasi'
  ),
  (
    'Gunung Banyak & Paralayang',
    'Wisata Alam',
    'Spot terbaik menikmati panorama perbukitan dan gemerlap lampu kota Batu dari ketinggian 1.315 mdpl.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC18fzcxEapU0lA6uWk_wSyvITO0kAVEEih50enff8XdV-RZBoAbEa7WoBKFSe1VAyojOLbxrswooWZz-MiFvUQyY4tD0FWnOoHJdZznFnNDLAkGboQx5Q4C7a0178GCE3Q738ZEeYjFTwRKmEb9qFRmyYNMtL4CGjinJO9RTs9Xyfc2joM3A8UIWC_3yFITit4cWoHxRXmAEZkAHoaAqNyOaTSjCW-FHqP88lXrrI',
    'Songgokerto, Kota Batu',
    20000,
    4.8,
    'Terverifikasi'
  ),
  (
    'Omah Kayu Paralayang',
    'Wisata Alam',
    'Rumah pohon eksotis berlatar lembah pinus hijau nan fotogenik, sejuk, dan menyegarkan pikiran.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYOMcxUbC5Ph6M09AKXcSxUCx6cZr25Wi6GEnp7Aew92o_NTPzYP3wgAq-FlbqjGcwdR58nPnfJ1apGsdsh3VM7hPLBrRg0HSeM5CKdAQof3l2Rh6S96uT0i62VT2R-pj7HM2YAeU3rVEMuqtoN0TNqx3jq_WDnqxCwxw8UOQQ-Y7Nf-AwpJepbSI4NAWGa_kwH_x6IOwzMmKyJsvszTZngcWJOFMpltvdy41xsJ0',
    'Lereng Gunung Banyak, Batu',
    25000,
    4.6,
    'Terverifikasi'
  );
