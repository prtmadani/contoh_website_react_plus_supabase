export interface Destinasi {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  gambar_url: string;
  lokasi: string;
  harga_tiket: number;
  rating?: number;
  status?: string;
  created_at?: string;
}

export type DestinasiInput = Omit<Destinasi, 'id' | 'created_at'> & {
  id?: string;
};
