import React, { useState, useEffect } from 'react';
import type { Destinasi, DestinasiInput } from '../types/destinasi';

interface CrudSectionProps {
  destinasiList: Destinasi[];
  onAdd: (data: DestinasiInput) => Promise<{ success: boolean; error?: string }>;
  onEdit: (id: string, data: DestinasiInput) => Promise<{ success: boolean; error?: string }>;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  supabaseSource: 'supabase' | 'local';
  onOpenConfig: () => void;
}

export const CrudSection: React.FC<CrudSectionProps> = ({
  destinasiList,
  onAdd,
  onEdit,
  onDelete,
  supabaseSource,
  onOpenConfig,
}) => {
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('Wisata Alam');
  const [hargaTiket, setHargaTiket] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [gambarUrl, setGambarUrl] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Table Filter & Pagination State
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Toast State
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({
    show: false,
    msg: '',
    type: 'success',
  });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  const resetForm = () => {
    setEditingId(null);
    setNama('');
    setKategori('Wisata Alam');
    setHargaTiket('');
    setLokasi('');
    setGambarUrl('');
    setDeskripsi('');
  };

  const handleEditClick = (item: Destinasi) => {
    setEditingId(item.id);
    setNama(item.nama);
    setKategori(item.kategori);
    setHargaTiket(item.harga_tiket ? String(item.harga_tiket) : '0');
    setLokasi(item.lokasi || '');
    setGambarUrl(item.gambar_url || '');
    setDeskripsi(item.deskripsi || '');

    // Scroll to form
    const formElement = document.getElementById('destinationFormContainer');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      showToast('Nama destinasi wajib diisi!', 'error');
      return;
    }

    setIsSubmitting(true);
    const payload: DestinasiInput = {
      nama: nama.trim(),
      kategori,
      harga_tiket: Number(hargaTiket) || 0,
      lokasi: lokasi.trim() || 'Kota Batu, Malang',
      gambar_url:
        gambarUrl.trim() ||
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      deskripsi: deskripsi.trim() || 'Destinasi wisata unggulan di kawasan dataran tinggi Batu-Malang.',
      rating: 4.8,
      status: 'Terverifikasi',
    };

    try {
      if (editingId) {
        const res = await onEdit(editingId, payload);
        if (res.success) {
          showToast(`Destinasi "${payload.nama}" berhasil diperbarui!`);
          resetForm();
        } else {
          showToast(res.error || 'Gagal memperbarui destinasi', 'error');
        }
      } else {
        const res = await onAdd(payload);
        if (res.success) {
          showToast(`Destinasi "${payload.nama}" berhasil ditambahkan!`);
          resetForm();
        } else {
          showToast(res.error || 'Gagal menambahkan destinasi', 'error');
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Terjadi kesalahan sistem', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${name}" dari data destinasi?`)) {
      const res = await onDelete(id);
      if (res.success) {
        showToast(`Destinasi "${name}" berhasil dihapus.`);
        if (editingId === id) resetForm();
      } else {
        showToast(res.error || 'Gagal menghapus destinasi', 'error');
      }
    }
  };

  // Filtered Table Items
  const filteredTableList = destinasiList.filter((item) => {
    const q = tableSearch.toLowerCase();
    return (
      item.nama.toLowerCase().includes(q) ||
      (item.lokasi && item.lokasi.toLowerCase().includes(q)) ||
      item.kategori.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredTableList.length / itemsPerPage));
  const paginatedList = filteredTableList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <section className="w-full bg-surface-container-low py-space-xl border-y border-surface-container/60" id="kelola-wisata">
      <div className="w-full max-w-7xl mx-auto px-gutter flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold mb-space-xs">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Admin &amp; Tourism Office Portal</span>
            </div>
            <h2 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-on-surface font-bold tracking-tight">
              Manajemen Wisata Terpadu (CRUD)
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Pusat pengelolaan data destinasi, tiket masuk, status verifikasi, serta pemutakhiran katalog publik secara real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="px-space-md py-space-sm rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm text-on-surface font-label-md text-label-md border border-surface-container">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span>Sistem Sinkron Aktif</span>
            </div>

            <button
              onClick={onOpenConfig}
              className={`px-space-md py-space-sm rounded-xl shadow-sm flex items-center gap-1.5 font-label-md text-xs font-semibold cursor-pointer border transition-colors ${
                supabaseSource === 'supabase'
                  ? 'bg-primary-container text-on-primary-container border-primary'
                  : 'bg-surface-container-lowest text-on-surface border-slate-300 hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">database</span>
              <span>{supabaseSource === 'supabase' ? 'Supabase Database' : 'Database Settings'}</span>
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toast.show && (
          <div
            className={`w-full p-space-md rounded-xl font-label-md text-label-md flex items-center justify-between shadow-md animate-in slide-in-from-top-2 duration-300 ${
              toast.type === 'error'
                ? 'bg-error-container text-on-error-container border border-error/30'
                : 'bg-primary-fixed text-on-primary-fixed border border-primary/20'
            }`}
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px]">
                {toast.type === 'error' ? 'error' : 'check_circle'}
              </span>
              <span>{toast.msg}</span>
            </div>
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="hover:opacity-70 p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Two-Column Grid: Form (Left) & Data Table (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Side: Form Panel */}
          <div
            id="destinationFormContainer"
            className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-slate-200/80"
          >
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    {editingId ? 'edit_location' : 'add_location_alt'}
                  </span>
                </span>
                <h3 className="font-headline-md text-lg text-on-surface font-bold">
                  {editingId ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Baru'}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-medium">
                Batu-Malang
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
              {/* Field: Nama Wisata */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="destName">
                  Nama Destinasi Wisata <span className="text-error">*</span>
                </label>
                <input
                  id="destName"
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Taman Rekreasi Selecta"
                  className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/30"
                />
              </div>

              {/* Field: Kategori Wisata */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="destCategory">
                  Kategori Wisata <span className="text-error">*</span>
                </label>
                <select
                  id="destCategory"
                  required
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer border border-transparent focus:border-primary/30"
                >
                  <option value="Wisata Alam">Wisata Alam</option>
                  <option value="Rekreasi &amp; Hiburan">Rekreasi &amp; Hiburan</option>
                  <option value="Agrowisata">Agrowisata</option>
                  <option value="Edukasi Budaya">Edukasi Budaya</option>
                  <option value="Kuliner &amp; Cafe">Kuliner &amp; Cafe</option>
                </select>
              </div>

              {/* Grid 2 Col: Tiket & Lokasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="destPrice">
                    Estimasi Tiket (Rp) <span className="text-error">*</span>
                  </label>
                  <input
                    id="destPrice"
                    type="number"
                    min="0"
                    required
                    value={hargaTiket}
                    onChange={(e) => setHargaTiket(e.target.value)}
                    placeholder="Contoh: 50000"
                    className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="destLocation">
                    Lokasi / Kecamatan <span className="text-error">*</span>
                  </label>
                  <input
                    id="destLocation"
                    type="text"
                    required
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    placeholder="Contoh: Bumiaji, Batu"
                    className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/30"
                  />
                </div>
              </div>

              {/* Field: Image URL */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="destImageUrl">
                  URL Gambar / Foto Wisata
                </label>
                <input
                  id="destImageUrl"
                  type="text"
                  value={gambarUrl}
                  onChange={(e) => setGambarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/30"
                />
              </div>

              {/* Field: Deskripsi */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="destDesc">
                  Deskripsi Singkat Tempat
                </label>
                <textarea
                  id="destDesc"
                  rows={3}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Tuliskan daya tarik utama dan fasilitas unggulan..."
                  className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/30"
                ></textarea>
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-space-sm pt-space-xs">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm bg-primary hover:bg-tertiary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer font-semibold disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isSubmitting ? 'sync' : 'save'}
                  </span>
                  <span>
                    {isSubmitting
                      ? 'Menyimpan...'
                      : editingId
                      ? 'Perbarui Destinasi'
                      : 'Simpan Destinasi'}
                  </span>
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-space-lg py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-lg transition-colors cursor-pointer font-medium"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Side: Data Table Panel */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-slate-200/80">
            {/* Table Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm">
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => {
                    setTableSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Cari data destinasi..."
                  className="w-full bg-surface-container-low pl-9 pr-space-md py-1.5 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none border border-transparent focus:border-primary/20"
                />
              </div>

              <div className="flex items-center gap-space-xs self-end sm:self-auto">
                <span className="text-xs text-outline">
                  Total: <strong className="text-on-surface">{filteredTableList.length}</strong> data
                </span>
              </div>
            </div>

            {/* Table Container */}
            <div className="w-full overflow-x-auto rounded-xl border border-surface-container">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-3">No</th>
                    <th className="py-3 px-3">Info Wisata</th>
                    <th className="py-3 px-3">Kategori</th>
                    <th className="py-3 px-3">Lokasi</th>
                    <th className="py-3 px-3">Tiket</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-on-surface divide-y divide-surface-container-low">
                  {paginatedList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-outline">
                        Tidak ada destinasi ditemukan.
                      </td>
                    </tr>
                  ) : (
                    paginatedList.map((item, index) => {
                      const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      const isEditing = editingId === item.id;

                      return (
                        <tr
                          key={item.id}
                          className={`transition-colors ${
                            isEditing
                              ? 'bg-primary/5 font-medium'
                              : 'hover:bg-surface-container-low/60'
                          }`}
                        >
                          <td className="py-3 px-3 text-outline font-medium">{rowNumber}</td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-space-sm">
                              <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 overflow-hidden">
                                {item.gambar_url ? (
                                  <img
                                    src={item.gambar_url}
                                    alt={item.nama}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <span className="material-symbols-outlined text-[18px]">
                                    photo_camera
                                  </span>
                                )}
                              </div>
                              <span className="font-semibold text-on-surface truncate max-w-[130px] sm:max-w-[180px]">
                                {item.nama}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-xs bg-surface-container text-on-surface-variant font-medium whitespace-nowrap">
                              {item.kategori}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-on-surface-variant truncate max-w-[110px]">
                            {item.lokasi || '-'}
                          </td>
                          <td className="py-3 px-3 font-semibold text-on-surface whitespace-nowrap">
                            {item.harga_tiket === 0
                              ? 'Gratis'
                              : `Rp ${Number(item.harga_tiket).toLocaleString('id-ID')}`}
                          </td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium whitespace-nowrap">
                              <span className="material-symbols-outlined text-[14px]">
                                check_circle
                              </span>
                              {item.status || 'Terverifikasi'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="inline-flex items-center gap-1 justify-end">
                              <button
                                onClick={() => handleEditClick(item)}
                                title="Edit"
                                className="w-7 h-7 rounded-lg bg-surface-container hover:bg-secondary-container text-secondary flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(item.id, item.nama)}
                                title="Hapus"
                                className="w-7 h-7 rounded-lg bg-error-container/40 hover:bg-error-container text-error flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span>
                Halaman {currentPage} dari {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="w-8 h-8 rounded-lg bg-surface-container-low text-outline flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-label-sm text-label-sm cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="w-8 h-8 rounded-lg bg-surface-container-low text-outline flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
