import React from 'react';
import type { Destinasi } from '../types/destinasi';

interface DetailModalProps {
  destinasi: Destinasi | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ destinasi, onClose }) => {
  if (!destinasi) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[90vh]">
        {/* Modal Image Header */}
        <div className="relative w-full h-64 sm:h-72 bg-surface-container overflow-hidden">
          <img
            src={destinasi.gambar_url}
            alt={destinasi.nama}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-semibold text-xs shadow-sm">
              {destinasi.kategori}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-semibold text-xs flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              {destinasi.rating || 4.8}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          <div>
            <h2 className="font-headline-xl text-2xl font-bold text-on-surface">
              {destinasi.nama}
            </h2>
            <p className="font-body-sm text-secondary flex items-center gap-1.5 mt-1 font-medium">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span>{destinasi.lokasi || 'Kota Batu, Malang'}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
            <div>
              <span className="text-xs text-outline block">Harga Tiket Masuk</span>
              <span className="text-xl font-bold text-primary">
                {destinasi.harga_tiket === 0
                  ? 'Gratis'
                  : `Rp ${Number(destinasi.harga_tiket).toLocaleString('id-ID')}`}
                <span className="text-xs font-normal text-outline"> / orang</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-outline block">Status Verifikasi</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                {destinasi.status || 'Terverifikasi'}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-headline-md text-base font-semibold text-on-surface mb-1">
              Deskripsi Wisata
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">
              {destinasi.deskripsi}
            </p>
          </div>

          <div className="pt-2 border-t border-surface-container flex flex-wrap gap-2 text-xs text-on-surface-variant">
            <span className="px-3 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">check</span>
              Ramah Keluarga &amp; Anak
            </span>
            <span className="px-3 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">check</span>
              Spot Foto Instagramable
            </span>
            <span className="px-3 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">check</span>
              Area Parkir Luas
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container-low/60 border-t border-surface-container flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-sm font-semibold transition-colors"
          >
            Tutup
          </button>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              destinasi.nama + ' ' + (destinasi.lokasi || 'Kota Batu')
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-primary hover:bg-tertiary-container text-on-primary text-sm font-semibold transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>Buka Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
