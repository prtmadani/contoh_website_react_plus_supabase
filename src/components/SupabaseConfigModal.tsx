import React, { useState } from 'react';
import {
  getSupabaseCredentials,
  saveSupabaseCredentials,
} from '../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  supabaseSource: 'supabase' | 'local';
  onRefreshData: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  supabaseSource,
  onRefreshData,
}) => {
  if (!isOpen) return null;

  const currentCreds = getSupabaseCredentials();
  const [url, setUrl] = useState(currentCreds.url);
  const [anonKey, setAnonKey] = useState(currentCreds.anonKey);
  const [copiedSql, setCopiedSql] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const sqlSchema = `-- Skema Tabel Destinasi Wisata Batu Malang
CREATE TABLE IF NOT EXISTS public.destinasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT,
  gambar_url TEXT,
  lokasi TEXT DEFAULT 'Kota Batu',
  harga_tiket NUMERIC DEFAULT 0,
  rating NUMERIC DEFAULT 4.8,
  status TEXT DEFAULT 'Terverifikasi',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.destinasi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Akses Baca Publik" ON public.destinasi FOR SELECT USING (true);
CREATE POLICY "Akses Tambah Publik" ON public.destinasi FOR INSERT WITH CHECK (true);
CREATE POLICY "Akses Update Publik" ON public.destinasi FOR UPDATE USING (true);
CREATE POLICY "Akses Hapus Publik" ON public.destinasi FOR DELETE USING (true);`;

  const handleSave = () => {
    saveSupabaseCredentials(url, anonKey);
    setStatusMsg('Kredensial disimpan! Menghubungkan ulang...');
    setTimeout(() => {
      onRefreshData();
      onClose();
    }, 800);
  };

  const handleReset = () => {
    saveSupabaseCredentials('', '');
    setUrl('');
    setAnonKey('');
    setStatusMsg('Beralih ke mode offline / local storage.');
    setTimeout(() => {
      onRefreshData();
      onClose();
    }, 800);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">database</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">
                Konfigurasi Database Supabase
              </h3>
              <p className="text-xs text-on-surface-variant">
                Hubungkan dengan PostgreSQL Supabase Cloud atau gunakan Local Backup.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-space-lg overflow-y-auto flex flex-col gap-space-md">
          {/* Status Alert */}
          <div
            className={`p-space-md rounded-xl text-xs flex items-center justify-between border ${
              supabaseSource === 'supabase'
                ? 'bg-primary-fixed/30 border-primary/30 text-on-primary-fixed'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  supabaseSource === 'supabase' ? 'bg-primary' : 'bg-amber-600'
                }`}
              ></span>
              <span className="font-semibold">
                Status:{' '}
                {supabaseSource === 'supabase'
                  ? 'Terhubung ke Supabase Cloud (Live CRUD)'
                  : 'Mode Offline / Local Storage Aktif (Siap Dihubungkan)'}
              </span>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/70">
              {supabaseSource === 'supabase' ? 'Live' : 'Local'}
            </span>
          </div>

          {statusMsg && (
            <div className="p-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold">
              {statusMsg}
            </div>
          )}

          {/* Form Credentials */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface" htmlFor="supabaseUrl">
                Supabase Project URL
              </label>
              <input
                id="supabaseUrl"
                type="text"
                placeholder="https://your-project.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-surface-container-low px-3 py-2 rounded-lg font-mono text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
              />
              <span className="text-[11px] text-outline">
                Dapat diperoleh di menu Project Settings &gt; API pada dashboard Supabase.
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface" htmlFor="supabaseKey">
                Supabase Anon (Public) Key
              </label>
              <input
                id="supabaseKey"
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                className="w-full bg-surface-container-low px-3 py-2 rounded-lg font-mono text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* SQL Setup Instruction */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">terminal</span>
                Skema SQL Supabase (Klik &amp; Jalankan di Supabase SQL Editor)
              </span>
              <button
                type="button"
                onClick={handleCopySql}
                className="px-2.5 py-1 rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedSql ? 'done' : 'content_copy'}
                </span>
                <span>{copiedSql ? 'Tersalin!' : 'Salin SQL'}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto max-h-36">
              {sqlSchema}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-surface-container-low/70 border-t border-surface-container flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-outline hover:text-error transition-colors underline"
          >
            Gunakan Local Mode
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface-variant transition-colors"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-primary hover:bg-tertiary-container text-on-primary text-xs font-semibold transition-colors shadow-xs"
            >
              Simpan &amp; Hubungkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
