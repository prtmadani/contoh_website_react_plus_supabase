import React, { useState } from 'react';

interface NavbarProps {
  supabaseSource: 'supabase' | 'local';
  onOpenConfig: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ supabaseSource, onOpenConfig }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/50">
      <div className="h-20 w-full px-gutter flex items-center justify-between gap-gutter">
        {/* Logo */}
        <a href="#" className="flex items-center gap-space-md group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">landscape</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
              Jelajah Batu-Malang
            </span>
            <span className="text-[10px] uppercase tracking-wider text-outline -mt-1 hidden sm:block">
              Tourism &amp; Travel Portal
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-space-xs">
          <a
            href="#katalog"
            className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
          >
            Destinasi
          </a>
          <a
            href="#katalog"
            className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
          >
            Kategori
          </a>
          <a
            href="#tentang-kami"
            className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
          >
            Tentang Kami
          </a>
          <a
            href="#kelola-wisata"
            className="px-space-md py-space-sm font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Kelola Wisata (CRUD)</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          </a>
        </nav>

        {/* Actions & Status */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          {/* Supabase Status Pill */}
          <button
            onClick={onOpenConfig}
            title="Klik untuk konfigurasi database Supabase"
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              supabaseSource === 'supabase'
                ? 'bg-primary/10 text-primary border-primary/25 hover:bg-primary/20'
                : 'bg-surface-container text-on-surface-variant border-outline-variant hover:bg-surface-container-high'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                supabaseSource === 'supabase' ? 'bg-primary' : 'bg-amber-500'
              }`}
            ></span>
            <span>{supabaseSource === 'supabase' ? 'Supabase Online' : 'Database Setup'}</span>
            <span className="material-symbols-outlined text-[14px]">tune</span>
          </button>

          <a
            href="#katalog"
            className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-tertiary transition-colors"
          >
            Eksplor Sekarang
          </a>

          {/* Profile icon */}
          <button
            onClick={onOpenConfig}
            title="Pengaturan Supabase & Akun"
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary hover:opacity-90 transition-opacity shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container px-gutter py-space-md flex flex-col gap-space-sm shadow-xl animate-in slide-in-from-top-2 duration-200">
          <a
            href="#katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="px-space-md py-space-sm font-label-md text-label-md text-on-surface hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-between"
          >
            <span>Destinasi Wisata</span>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </a>
          <a
            href="#tentang-kami"
            onClick={() => setMobileMenuOpen(false)}
            className="px-space-md py-space-sm font-label-md text-label-md text-on-surface hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-between"
          >
            <span>Tentang Kami</span>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </a>
          <a
            href="#kelola-wisata"
            onClick={() => setMobileMenuOpen(false)}
            className="px-space-md py-space-sm font-label-md text-label-md text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-between"
          >
            <span>Kelola Wisata (CRUD)</span>
            <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
          </a>
          <div className="pt-2 border-t border-surface-container flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfig();
              }}
              className="w-full py-2 px-3 rounded-lg bg-surface-container flex items-center justify-center gap-2 text-xs font-medium text-on-surface"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  supabaseSource === 'supabase' ? 'bg-primary' : 'bg-amber-500'
                }`}
              ></span>
              <span>{supabaseSource === 'supabase' ? 'Supabase Terhubung' : 'Setup Database Supabase'}</span>
            </button>
            <a
              href="#katalog"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-space-sm bg-primary text-on-primary font-label-md rounded-lg shadow-sm"
            >
              Eksplor Sekarang
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
