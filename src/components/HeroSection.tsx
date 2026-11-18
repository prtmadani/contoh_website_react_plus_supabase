import React, { useState } from 'react';

interface HeroSectionProps {
  onSearch: (query: string, category: string, budget: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category, budget);
    const katalogEl = document.getElementById('katalog');
    if (katalogEl) {
      katalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Visual Backdrop with Scenic Mountains */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDA6f9eOoWWjxsxR313VQU8HIOg-InCzRj3Z-_bF8i-R2F3a-VD3_jczeUsBg5F5zxBjR8mm84k2Jipr-SudR9w64uMdZPZpMgGCDlhoe9gT3I2Mv4NtjM5CAAampHjxTjggEv-jdaufvCaTbKLe77WUz_0wCzZ3-Q_HRo3D5MK_yBUKF7hCWdeqkI1LnM_NlRAEMl3p-Q88QIgUr04c9dxiorFQoZDKpfsQ4md43U')`,
        }}
      ></div>

      {/* Gradient Scrim for Flawless Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#263143]/90 via-[#263143]/65 to-background"></div>

      <div className="relative w-full max-w-7xl mx-auto px-gutter pt-32 sm:pt-36 pb-20 flex flex-col items-center text-center">
        {/* Overline Pill Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-white/20 backdrop-blur-md text-primary-fixed shadow-sm mb-space-md border border-white/10">
          <span className="material-symbols-outlined text-[18px]">nature_people</span>
          <span className="font-label-md text-label-md tracking-wider uppercase text-xs sm:text-sm font-semibold">
            Pesona Wisata Dataran Tinggi Jawa Timur
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl max-w-4xl text-white font-bold tracking-tight drop-shadow-sm mb-space-md leading-tight">
          Nikmati Keindahan Wisata Batu &amp; Malang
        </h1>

        {/* Subtitle Description */}
        <p className="font-body-lg text-body-lg max-w-2xl text-slate-100/90 mb-space-xl leading-relaxed">
          Rasakan sejuknya hembusan angin pegunungan, hamparan kebun apel legendaris, kesegaran air terjun alami, serta kegembiraan taman hiburan berkelas dunia.
        </p>

        {/* Floating Interactive Search & Filter Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-5xl bg-surface-container-lowest/95 backdrop-blur-xl p-space-md sm:p-space-lg rounded-2xl shadow-2xl flex flex-col lg:flex-row items-center gap-space-md border border-white/40"
        >
          {/* Search Input */}
          <div className="w-full lg:flex-1 flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl border border-surface-container/60 focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined text-primary text-[22px]">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama tempat / destinasi wisata..."
              className="bg-transparent w-full text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-outline hover:text-on-surface text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="w-full lg:w-56 flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl border border-surface-container/60 focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined text-secondary text-[22px]">category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent w-full text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer"
            >
              <option value="">Semua Kategori</option>
              <option value="Alam">Wisata Alam</option>
              <option value="Rekreasi">Rekreasi &amp; Hiburan</option>
              <option value="Agrowisata">Agrowisata</option>
              <option value="Edukasi">Edukasi Budaya</option>
              <option value="Kuliner">Kuliner &amp; Cafe</option>
            </select>
          </div>

          {/* Budget Dropdown */}
          <div className="w-full lg:w-52 flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl border border-surface-container/60 focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined text-tertiary text-[22px]">payments</span>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent w-full text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer"
            >
              <option value="">Budget Estimasi</option>
              <option value="50">&lt; Rp 50.000</option>
              <option value="100">Rp 50k - 100k</option>
              <option value="101">&gt; Rp 100.000</option>
            </select>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-primary hover:bg-tertiary-container text-on-primary font-label-md text-label-md rounded-xl shadow-md transition-all shrink-0 active:scale-95 cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">travel_explore</span>
            <span>Cari Wisata</span>
          </button>
        </form>

        {/* Quick Stat Badges */}
        <div className="mt-space-xl flex flex-wrap items-center justify-center gap-space-md text-white">
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-white/15 backdrop-blur-md border border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-primary-fixed text-[20px]">explore</span>
            <span className="font-label-md text-label-md text-sm font-medium">50+ Destinasi Populer</span>
          </div>
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-white/15 backdrop-blur-md border border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-amber-300 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="font-label-md text-label-md text-sm font-medium">4.9/5 Kepuasan Wisatawan</span>
          </div>
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-white/15 backdrop-blur-md border border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">ac_unit</span>
            <span className="font-label-md text-label-md text-sm font-medium">100% Alam Sejuk Pegunungan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
