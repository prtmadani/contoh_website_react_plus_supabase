import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl" id="tentang-kami">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Text Description */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Panduan Resmi Kota Wisata Batu &amp; Malang</span>
          </div>

          <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-on-surface leading-tight font-bold">
            Ekosistem Wisata Ramah Keluarga &amp; Berkelanjutan
          </h2>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Kawasan metropolitan Malang Raya dan Kota Wisata Batu menawarkan keharmonisan antara modernitas hiburan tematik dan pelestarian agrikultur dataran tinggi. Didukung fasilitas ramah keluarga, kuliner legendaris khas apel, serta akses transportasi yang tertata.
          </p>

          {/* Feature Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-xs border border-surface-container/60">
              <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[20px]">thermostat</span>
              </div>
              <h4 className="font-headline-md text-base text-on-surface font-bold">
                Iklim Sejuk Pegunungan
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Suhu harian berkisar antara 15°C – 22°C, sempurna untuk relaksasi tubuh dan pikiran.
              </p>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-1 shadow-xs border border-surface-container/60">
              <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-[20px]">badge</span>
              </div>
              <h4 className="font-headline-md text-base text-on-surface font-bold">
                Pemandu Lokal Berlisensi
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Ratusan guide terakreditasi HPI siap memandu rute petik apel dan offroad pegunungan.
              </p>
            </div>
          </div>

          {/* Social Proof Avatars */}
          <div className="flex items-center gap-space-md pt-space-xs">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-background">
                JP
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xs ring-2 ring-background">
                CR
              </div>
              <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold text-xs ring-2 ring-background">
                KA
              </div>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Dipercaya lebih dari <strong className="text-on-surface">1.200.000+</strong> pelancong domestik &amp; mancanegara setiap tahunnya.
            </span>
          </div>
        </div>

        {/* Rich Visual Collage / Map Reference */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHKPu7ihtuGUVai3oaG9HKH5ivJQ2JXbI28KU4yc7WB4nRnYZFJ-dmTNYKUzjlwrtJuRvDgIcjam73anoI-F8dvcigE3Pg1T-Qs_yuxtTix-hVL-UJH0ge7OFTdwRD7syPBPNHPWNl3ms3DwdenifcXn4_jcUl4NUeGqNdjFRj9Zh7xBMKU0qxGqzbCaIjmk1FRZ0_MveKHZUdElDSwChURjt0x6wr6J-mchmFG1Q')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111c2d]/85 via-transparent to-transparent"></div>

            {/* Overlay Info Card */}
            <div className="absolute bottom-4 left-4 right-4 p-space-md bg-surface-container-lowest/90 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between border border-white/60">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px]">explore</span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Sentra Pariwisata Kota Batu
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Ketinggian 800 - 1.200 mdpl
                  </p>
                </div>
              </div>
              <a
                href="#katalog"
                className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-tertiary-container transition-colors font-medium shadow-sm"
              >
                Rute Wisata
              </a>
            </div>
          </div>

          {/* Floating Quick Fact Badge */}
          <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-space-xs bg-surface-container-lowest p-space-sm rounded-xl shadow-xl border border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[24px]">cloud</span>
            <div>
              <p className="font-label-sm text-label-sm font-semibold text-on-surface">Cuaca Hari Ini</p>
              <p className="font-body-sm text-body-sm text-primary font-medium">Cerah Berawan 19°C</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
