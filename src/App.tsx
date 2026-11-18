import { useState, useEffect, useMemo } from 'react';
import type { Destinasi, DestinasiInput } from './types/destinasi';
import {
  fetchDestinasi,
  addDestinasi,
  editDestinasi,
  deleteDestinasi,
} from './lib/supabase';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { CrudSection } from './components/CrudSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';

export function App() {
  const [destinasiList, setDestinasiList] = useState<Destinasi[]>([]);
  const [supabaseSource, setSupabaseSource] = useState<'supabase' | 'local'>('local');
  const [, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('');

  // Modals
  const [selectedDetail, setSelectedDetail] = useState<Destinasi | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDestinasi();
      setDestinasiList(res.data);
      setSupabaseSource(res.source);
    } catch (err) {
      console.error('Failed to load destinations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // CRUD Handlers
  const handleAdd = async (input: DestinasiInput) => {
    const res = await addDestinasi(input);
    if (res.success && res.data) {
      setDestinasiList((prev) => [res.data!, ...prev]);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const handleEdit = async (id: string, input: DestinasiInput) => {
    const res = await editDestinasi(id, input);
    if (res.success && res.data) {
      setDestinasiList((prev) =>
        prev.map((item) => (item.id === id ? res.data! : item))
      );
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const handleDelete = async (id: string) => {
    const res = await deleteDestinasi(id);
    if (res.success) {
      setDestinasiList((prev) => prev.filter((item) => item.id !== id));
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  // Hero Search trigger
  const handleHeroSearch = (query: string, category: string, budget: string) => {
    setSearchQuery(query);
    if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory('all');
    }
    setSelectedBudget(budget);
  };

  // Filtered Catalog Items
  const filteredCatalog = useMemo(() => {
    return destinasiList.filter((item) => {
      // 1. Text Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.nama.toLowerCase().includes(q) ||
          (item.lokasi && item.lokasi.toLowerCase().includes(q)) ||
          item.deskripsi.toLowerCase().includes(q) ||
          item.kategori.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Category
      if (activeCategory && activeCategory !== 'all') {
        if (!item.kategori.toLowerCase().includes(activeCategory.toLowerCase())) {
          return false;
        }
      }

      // 3. Budget
      if (selectedBudget) {
        const price = item.harga_tiket || 0;
        if (selectedBudget === '50' && price >= 50000) return false;
        if (selectedBudget === '100' && (price < 50000 || price > 100000)) return false;
        if (selectedBudget === '101' && price <= 100000) return false;
      }

      return true;
    });
  }, [destinasiList, searchQuery, activeCategory, selectedBudget]);

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased flex flex-col">
      {/* 1. Header & Navbar */}
      <Navbar
        supabaseSource={supabaseSource}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full flex-1">
        {/* 2. Hero Section */}
        <HeroSection onSearch={handleHeroSearch} />

        {/* 3. Catalog Section */}
        <CatalogSection
          destinasiList={filteredCatalog}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onOpenDetail={(item) => setSelectedDetail(item)}
        />

        {/* 4. CRUD Admin Management Section */}
        <CrudSection
          destinasiList={destinasiList}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          supabaseSource={supabaseSource}
          onOpenConfig={() => setIsConfigOpen(true)}
        />

        {/* 5. About & Ecosystem Guide Section */}
        <AboutSection />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* Detail Modal */}
      <DetailModal
        destinasi={selectedDetail}
        onClose={() => setSelectedDetail(null)}
      />

      {/* Supabase Configuration Modal */}
      <SupabaseConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        supabaseSource={supabaseSource}
        onRefreshData={loadData}
      />
    </div>
  );
}

export default App;
