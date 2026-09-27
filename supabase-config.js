/**
 * AEDES-X Supabase Configuration
 * =====================================================================
 * Fail konfigurasi sambungan Supabase untuk maklum balas pelawat AEDES-X.
 * 
 * LANGKAH TETAPAN:
 * 1. Buka https://supabase.com dan log masuk/cipta projek percuma.
 * 2. Pergi ke Project Settings (ikon gear) -> API.
 * 3. Salin 'Project URL' dan tampal pada parameter 'url' di bawah.
 * 4. Salin 'anon public API key' dan tampal pada parameter 'anonKey' di bawah.
 * 5. Buka SQL Editor di dashboard Supabase dan jalankan skrip dari fail 'supabase-schema.sql'.
 * 
 * NOTA KESELAMATAN:
 * - 'anonKey' ialah kunci awam yang selamat diletakkan di frontend GitHub Pages.
 * - Keselamatan data dikawal ketat oleh polisi Row Level Security (RLS) di pangkalan data Supabase.
 * - JANGAN letak 'service_role' secret key di sini!
 * =====================================================================
 */
window.AEDES_SUPABASE_CONFIG = {
  // Masukkan Supabase Project URL anda di sini:
  url: 'https://kcdhumbrphketzsfqaun.supabase.co',

  // Masukkan Supabase Public Anon Key anda di sini:
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZGh1bWJycGhrZXR6c2ZxYXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0OTMzMTgsImV4cCI6MjEwNjA2OTMxOH0.seyX1J8ZVtawpr8NnvFi3ZLH9LifH5SSPXFLyaRuRfM'
};
