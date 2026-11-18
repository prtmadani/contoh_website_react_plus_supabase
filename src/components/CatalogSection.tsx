import React from 'react';
import type { Destinasi } from '../types/destinasi';

interface CatalogSectionProps {
  destinasiList: Destinasi[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenDetail: (destinasi: Destinasi) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  destinasiList,
  activeCategory,
  onSelectCategory,
  onOpenDetail,
}) => {
  const categories = [
    { label: 'Semua', value: 'all' },
    { label: 'Wisata Alam', value: 'Alam' },
    { label: 'Taman Hiburan', value: 'Rekreasi' },
    { label: 'Agrowisata', value: 'Agrowisata' },
    { label: 'Edukasi Budaya', value: 'Edukasi' },
    { label: 'Kuliner & Cafe', value: 'Kuliner' },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl" id="katalog">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col gap-space-xs">
          <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Eksplorasi Pilihan
          </div>
          <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold tracking-tight">
            Destinasi Favorit Wisatawan di Batu Malang
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Rangkuman tempat liburan terbaik dari taman bermain bertaraf internasional hingga ketenangan bentang alam lereng pegunungan.
          </p>
        </div>

        {/* Dynamic Counter Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high rounded-xl text-on-surface font-label-sm text-label-sm self-start md:self-auto shadow-sm border border-surface-container">
          <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
          <span className="font-semibold">Menampilkan {destinasiList.length} Wisata Unggulan</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-lg scrollbar-none">
        {categories.map((cat) => {
          const isActive =
            activeCategory === cat.value ||
            (activeCategory === '' && cat.value === 'all') ||
            (activeCategory === 'all' && cat.value === 'all');

          return (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`px-space-lg py-space-xs rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-md font-semibold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-surface-container/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Responsive Grid */}
      {destinasiList.length === 0 ? (
        <div className="w-full py-16 px-4 bg-surface-container-lowest rounded-2xl border border-surface-container text-center flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-[32px]">travel_explore</span>
          </div>
          <h3 className="font-headline-md text-lg text-on-surface font-semibold">
            Tidak ada destinasi yang sesuai filter
          </h3>
          <p className="text-sm text-on-surface-variant max-w-md">
            Coba ubah kata kunci pencarian atau pilih kategori lain untuk melihat destinasi menarik di Batu Malang.
          </p>
          <button
            onClick={() => onSelectCategory('all')}
            className="mt-2 px-space-lg py-space-xs bg-primary text-on-primary font-label-md text-sm rounded-lg"
          >
            Tampilkan Semua Destinasi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="destinasiGrid">
          {destinasiList.map((item) => (
            <article
              key={item.id}
              className="destinasi-card flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-200/60"
            >
              {/* Image Container */}
              <div className="relative w-full h-56 overflow-hidden bg-surface-container">
                <img
                  src={item.gambar_url}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-space-sm py-space-xs rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-semibold shadow-sm border border-white/50">
                  {item.kategori}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3 px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm border border-white/50">
                  <span
                    className="material-symbols-outlined text-[16px] text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-semibold">{item.rating || 4.8}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-space-lg flex flex-col flex-1">
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors font-bold">
                  {item.nama}
                </h3>

                <p className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-1 mb-space-sm font-medium">
                  <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                  <span className="truncate">{item.lokasi || 'Kota Batu, Malang'}</span>
                </p>

                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md flex-1">
                  {item.deskripsi}
                </p>

                {/* Card Footer */}
                <div className="pt-space-sm border-t border-surface-container-low flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-label-sm text-label-sm text-outline block">Tiket Masuk</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">
                      {item.harga_tiket === 0
                        ? 'Gratis'
                        : `Rp ${Number(item.harga_tiket).toLocaleString('id-ID')}`}{' '}
                      <span className="font-body-sm text-body-sm text-outline font-normal">/ org</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenDetail(item)}
                    className="px-space-md py-space-xs rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-label-md text-label-md transition-colors inline-flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span>Detail Wisata</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
