import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Destinasi, DestinasiInput } from '../types/destinasi';
import { INITIAL_DESTINASI } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'wisata_batu_destinasi_v1';
const SUPABASE_CONFIG_KEY = 'wisata_batu_supabase_config_v1';

let cachedClient: SupabaseClient | null = null;
let currentUrl: string = '';
let currentKey: string = '';

export function getSupabaseCredentials(): { url: string; anonKey: string; isConfigured: boolean } {
  // 1. Try env variables
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    '';

  if (envUrl && envKey && envUrl.startsWith('https://')) {
    return { url: envUrl, anonKey: envKey, isConfigured: true };
  }

  // 2. Try localStorage custom config
  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey && parsed.url.startsWith('https://')) {
        return { url: parsed.url, anonKey: parsed.anonKey, isConfigured: true };
      }
    }
  } catch (e) {
    console.error('Failed to read supabase config from localStorage', e);
  }

  return { url: '', anonKey: '', isConfigured: false };
}

export function saveSupabaseCredentials(url: string, anonKey: string): void {
  try {
    if (!url.trim() && !anonKey.trim()) {
      localStorage.removeItem(SUPABASE_CONFIG_KEY);
    } else {
      localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() }));
    }
    cachedClient = null;
    currentUrl = '';
    currentKey = '';
  } catch (e) {
    console.error('Failed to save supabase config to localStorage', e);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) return null;

  if (cachedClient && currentUrl === url && currentKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
    currentUrl = url;
    currentKey = anonKey;
    return cachedClient;
  } catch (e) {
    console.error('Error creating Supabase client:', e);
    return null;
  }
}

// Local Storage Fallback helpers
function getLocalDestinasi(): Destinasi[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error parsing local storage destinasi', e);
  }
  // Initialize with default
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DESTINASI));
  return INITIAL_DESTINASI;
}

function saveLocalDestinasi(items: Destinasi[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving to local storage', e);
  }
}

// ============ API CRUD METHODS ============

export async function fetchDestinasi(): Promise<{ data: Destinasi[]; source: 'supabase' | 'local'; error?: string }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('destinasi')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Normalize fields if schema differences exist
        const formatted: Destinasi[] = data.map((item: any) => ({
          id: String(item.id),
          nama: item.nama || item.name || '',
          kategori: item.kategori || item.category || 'Wisata Alam',
          deskripsi: item.deskripsi || item.desc || '',
          gambar_url: item.gambar_url || item.image || '',
          lokasi: item.lokasi || item.location || 'Kota Batu',
          harga_tiket: Number(item.harga_tiket ?? item.price ?? 0),
          rating: Number(item.rating ?? 4.8),
          status: item.status || 'Terverifikasi',
          created_at: item.created_at,
        }));
        return { data: formatted, source: 'supabase' };
      } else if (error) {
        console.warn('Supabase query error, falling back to local storage:', error.message);
        return { data: getLocalDestinasi(), source: 'local', error: error.message };
      }
    } catch (err: any) {
      console.warn('Supabase network error, falling back to local storage:', err.message);
      return { data: getLocalDestinasi(), source: 'local', error: err.message };
    }
  }

  return { data: getLocalDestinasi(), source: 'local' };
}

export async function addDestinasi(input: DestinasiInput): Promise<{ success: boolean; data?: Destinasi; error?: string }> {
  const client = getSupabaseClient();
  const newItem: Destinasi = {
    id: input.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `dest-${Date.now()}`),
    nama: input.nama,
    kategori: input.kategori,
    deskripsi: input.deskripsi,
    gambar_url: input.gambar_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    lokasi: input.lokasi || 'Kota Batu, Malang',
    harga_tiket: Number(input.harga_tiket) || 0,
    rating: Number(input.rating) || 4.8,
    status: input.status || 'Terverifikasi',
    created_at: new Date().toISOString(),
  };

  if (client) {
    try {
      const payload: Record<string, any> = {
        nama: newItem.nama,
        kategori: newItem.kategori,
        deskripsi: newItem.deskripsi,
        gambar_url: newItem.gambar_url,
        lokasi: newItem.lokasi,
        harga_tiket: newItem.harga_tiket,
        rating: newItem.rating,
        status: newItem.status,
      };

      const { data, error } = await client
        .from('destinasi')
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        return {
          success: true,
          data: {
            ...newItem,
            id: String(data.id),
          },
        };
      } else if (error) {
        console.error('Supabase insert failed:', error);
        // Also sync local
        const local = getLocalDestinasi();
        local.unshift(newItem);
        saveLocalDestinasi(local);
        return { success: true, data: newItem, error: `Supabase: ${error.message} (Disimpan ke Local Backup)` };
      }
    } catch (err: any) {
      console.error('Supabase insert network error:', err);
      const local = getLocalDestinasi();
      local.unshift(newItem);
      saveLocalDestinasi(local);
      return { success: true, data: newItem, error: `Koneksi Supabase gagal (Disimpan ke Local Backup)` };
    }
  }

  // Local storage mode
  const local = getLocalDestinasi();
  local.unshift(newItem);
  saveLocalDestinasi(local);
  return { success: true, data: newItem };
}

export async function editDestinasi(id: string, input: DestinasiInput): Promise<{ success: boolean; data?: Destinasi; error?: string }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const payload: Record<string, any> = {
        nama: input.nama,
        kategori: input.kategori,
        deskripsi: input.deskripsi,
        gambar_url: input.gambar_url,
        lokasi: input.lokasi,
        harga_tiket: Number(input.harga_tiket) || 0,
        rating: Number(input.rating) || 4.8,
        status: input.status || 'Terverifikasi',
      };

      const { data, error } = await client
        .from('destinasi')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return {
          success: true,
          data: {
            id: String(data.id),
            nama: data.nama,
            kategori: data.kategori,
            deskripsi: data.deskripsi,
            gambar_url: data.gambar_url,
            lokasi: data.lokasi,
            harga_tiket: Number(data.harga_tiket),
            rating: Number(data.rating),
            status: data.status,
            created_at: data.created_at,
          },
        };
      } else if (error) {
        console.error('Supabase update failed:', error);
      }
    } catch (err: any) {
      console.error('Supabase update network error:', err);
    }
  }

  // Local storage fallback
  const local = getLocalDestinasi();
  const idx = local.findIndex((item) => item.id === id);
  if (idx !== -1) {
    local[idx] = {
      ...local[idx],
      ...input,
    };
    saveLocalDestinasi(local);
    return { success: true, data: local[idx] };
  }

  return { success: false, error: 'Destinasi tidak ditemukan' };
}

export async function deleteDestinasi(id: string): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { error } = await client
        .from('destinasi')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase delete error:', error.message);
      }
    } catch (err: any) {
      console.warn('Supabase delete network error:', err.message);
    }
  }

  // Always update local storage
  const local = getLocalDestinasi();
  const filtered = local.filter((item) => item.id !== id);
  saveLocalDestinasi(filtered);

  return { success: true };
}
