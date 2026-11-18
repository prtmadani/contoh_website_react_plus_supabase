import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface mt-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.02)] border-t border-surface-container">
      <div className="w-full px-gutter py-space-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Brand Info */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]">landscape</span>
              </div>
              <span className="font-headline-md text-headline-md text-primary font-bold">
                Jelajah Batu-Malang
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Gerbang terpadu pariwisata terunggul Kota Wisata Batu dan Malang Raya. Ragam destinasi alam, agro, edukasi, dan panorama pegunungan sejuk.
            </p>
          </div>

          {/* Kontak Dinas Pariwisata */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-md text-base text-on-surface font-bold">
              Kontak Dinas Pariwisata
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                location_on
              </span>
              <span>Jl. Panglima Sudirman No. 507, Kota Batu, Jawa Timur</span>
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">call</span>
              <span>+62 341 591992</span>
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">mail</span>
              <span>info@wisatabatumalang.id</span>
            </p>
          </div>

          {/* Media Sosial */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-md text-base text-on-surface font-bold">Media Sosial</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Ikuti kabar teranyar destinasi dan agenda festival seputar Malang Raya.
            </p>
            <div className="flex items-center gap-space-sm">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">smart_display</span>
              </a>
            </div>
          </div>

          {/* Buletin Wisata */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="font-headline-md text-base text-on-surface font-bold">Buletin Wisata</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Dapatkan rekomendasi mingguan potongan tiket dan paket liburan keluarga.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-primary-fixed text-on-primary-fixed text-xs font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Terima kasih! Anda telah terdaftar dalam buletin kami.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-space-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email Anda"
                  className="bg-surface-container-lowest px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface outline-none w-full shadow-xs border border-surface-container focus:border-primary/40"
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-space-md py-space-sm rounded-lg font-label-sm text-label-sm hover:bg-tertiary transition-colors cursor-pointer font-semibold shadow-xs"
                >
                  Kirim
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-space-xl pt-space-lg border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <p>© 2025 Jelajah Batu-Malang. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-space-md">
            <a href="#" className="hover:text-primary transition-colors">
              Kebijakan Privasi
            </a>
            <span className="text-outline">·</span>
            <a href="#" className="hover:text-primary transition-colors">
              Ketentuan Layanan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
