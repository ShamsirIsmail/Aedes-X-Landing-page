-- =====================================================================
-- AEDES-X VISITOR FEEDBACK DATABASE SCHEMA & RLS POLICIES (SUPABASE)
-- Projek Inovasi STEM: IoT Rangers · SJKT Ladang Rinching
-- =====================================================================
-- Arahan: Salin keseluruhan kandungan fail ini dan tampal di
-- Supabase Dashboard -> SQL Editor -> Klik "Run".
-- =====================================================================

-- 1. Cipta Jadual 'feedback'
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  opinion TEXT NOT NULL CHECK (opinion IN ('menarik', 'tambah_baik', 'kurang_sesuai')),
  feedback TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  is_public BOOLEAN DEFAULT false NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'hidden')),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indeks untuk kelajuan capaian paparan awam
CREATE INDEX IF NOT EXISTS idx_feedback_approved_public 
ON public.feedback (created_at DESC) 
WHERE status = 'approved' AND is_public = true;

-- 2. Aktifkan Row Level Security (RLS)
-- Ini menghalang akses tanpa kebenaran secara mutlak
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Polisi A: Pelawat umum boleh HANTAR maklum balas baharu (status MESTI 'pending')
DROP POLICY IF EXISTS "Public can insert pending feedback" ON public.feedback;
CREATE POLICY "Public can insert pending feedback" 
ON public.feedback 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (
  status = 'pending' AND 
  char_length(feedback) >= 5 AND 
  char_length(feedback) <= 1000
);

-- Polisi B: Pelawat umum HANYA BOLEH BACA kiriman yang telah diluluskan DAN mendapat kebenaran umum
DROP POLICY IF EXISTS "Public can read approved public feedback" ON public.feedback;
CREATE POLICY "Public can read approved public feedback" 
ON public.feedback 
FOR SELECT 
TO anon, authenticated 
USING (
  status = 'approved' AND 
  is_public = true
);

-- Polisi C: Pemilik projek yang log masuk ke Supabase Dashboard mempunyai akses penuh
DROP POLICY IF EXISTS "Authenticated admins have full access" ON public.feedback;
CREATE POLICY "Authenticated admins have full access" 
ON public.feedback 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 3. Cipta Storage Bucket untuk Avatar Gambar Profil (Pilihan)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'feedback-avatars', 
  'feedback-avatars', 
  true, 
  2097152, -- Had saiz 2MB
  ARRAY['image/png', 'image/jpeg', 'image/webp']
) 
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp'];

-- Polisi Storage: Pelawat umum boleh muat naik gambar profil ke folder avatars
DROP POLICY IF EXISTS "Public can upload feedback avatar" ON storage.objects;
CREATE POLICY "Public can upload feedback avatar" 
ON storage.objects 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (bucket_id = 'feedback-avatars');

-- Polisi Storage: Orang awam boleh melihat gambar profil
DROP POLICY IF EXISTS "Public can view feedback avatar" ON storage.objects;
CREATE POLICY "Public can view feedback avatar" 
ON storage.objects 
FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'feedback-avatars');

-- =====================================================================
-- CONTOH PERINTAH SQL UNTUK MODERASI & SEMAKAN (ADMIN / PEMILIK):
-- =====================================================================
-- A. Lihat semua kiriman yang sedang menunggu semakan:
-- SELECT id, created_at, name, opinion, feedback, is_public, status 
-- FROM public.feedback 
-- WHERE status = 'pending' 
-- ORDER BY created_at DESC;

-- B. Luluskan maklum balas untuk paparan umum di web:
-- UPDATE public.feedback 
-- SET status = 'approved', updated_at = now() 
-- WHERE id = '<MASUKKAN-UUID-DI-SINI>';

-- C. Sembunyikan maklum balas daripada paparan umum:
-- UPDATE public.feedback 
-- SET status = 'hidden', updated_at = now() 
-- WHERE id = '<MASUKKAN-UUID-DI-SINI>';

-- D. Padam maklum balas:
-- DELETE FROM public.feedback WHERE id = '<MASUKKAN-UUID-DI-SINI>';
-- =====================================================================
