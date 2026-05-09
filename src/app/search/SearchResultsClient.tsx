'use client';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { tools, searchTools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import SearchBox from '@/components/SearchBox';

const FILTERS = [
  { id: 'free',   label: 'Ücretsiz',      fn: (t: typeof tools[0]) => t.hasFreeTier && t.startingPriceUsd === 0 },
  { id: 'oss',    label: 'Açık Kaynak',   fn: (t: typeof tools[0]) => t.openSource },
  { id: 'local',  label: 'Yerel Çalışır', fn: (t: typeof tools[0]) => t.localRun },
  { id: 'api',    label: 'API var',        fn: (t: typeof tools[0]) => t.apiAvailable },
  { id: 'privacy',label: 'Yüksek Gizlilik', fn: (t: typeof tools[0]) => t.privacyScore === 'high' },
];

export default function SearchResultsClient() {
  const params = useSearchParams();
  const q = params.get('q') ?? '';
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const results = useMemo(() => {
    let res = q ? searchTools(q) : tools;
    for (const fid of activeFilters) {
      const f = FILTERS.find(x => x.id === fid);
      if (f) res = res.filter(f.fn);
    }
    return res;
  }, [q, activeFilters]);

  function toggleFilter(id: string) {
    setActiveFilters(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  return (
    <>
      {/* Search box */}
      <div style={{ marginBottom: 28 }}>
        <SearchBox />
      </div>

      {/* Query heading */}
      {q && (
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif", color: 'var(--text)', marginBottom: 4 }}>
            "{q}"
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            {results.length} sonuç bulundu — MatchScore sıralamasıyla
          </p>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => toggleFilter(f.id)}
            style={{
              padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              border: '0.5px solid',
              borderColor: activeFilters.includes(f.id) ? 'var(--accent)' : 'var(--border)',
              background: activeFilters.includes(f.id) ? 'var(--accent-bg)' : 'white',
              color: activeFilters.includes(f.id) ? 'var(--accent)' : 'var(--muted)',
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button
            onClick={() => setActiveFilters([])}
            style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--subtle)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >
            Temizle ✕
          </button>
        )}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 15, fontFamily: "'DM Serif Display', serif" }}>Sonuç bulunamadı</div>
          <p style={{ fontSize: 13, marginTop: 6 }}>Farklı kelimeler deneyin</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {results.map((tool, i) => <ToolCard key={tool.slug} tool={tool} rank={i + 1} />)}
        </div>
      )}
    </>
  );
}
