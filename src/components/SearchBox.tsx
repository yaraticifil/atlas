'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchTools } from '@/lib/tools';
import type { Tool } from '@/lib/tools';

const PLACEHOLDERS = [
  "ChatGPT'nin ücretsiz alternatifi ne?",
  "Yerel çalışan AI nasıl kullanırım?",
  "Adobe Firefly'dan kaçmak istiyorum",
  "Cursor'a para ödemeden kod yazabilir miyim?",
  "Gizliliğe önem veren AI stack",
  "Zapier'in açık kaynak alternatifi var mı?",
];

export default function SearchBox({ autoFocus }: { autoFocus?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const [phIdx, setPhIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholder
  useEffect(() => {
    const t = setInterval(() => {
      setPhIdx(i => {
        const next = (i + 1) % PLACEHOLDERS.length;
        setPlaceholder(PLACEHOLDERS[next]);
        return next;
      });
    }, 3500);
    return () => clearInterval(t);
  }, []);

  function handleChange(v: string) {
    setQuery(v);
    if (v.length >= 2) {
      setResults(searchTools(v).slice(0, 5));
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  function handleSubmit() {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        {/* Search icon */}
        <svg style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          className="input"
          autoFocus={autoFocus}
          value={query}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder={placeholder}
          style={{ padding: '17px 120px 17px 50px', fontSize: 15 }}
        />
        <button
          onClick={handleSubmit}
          className="btn btn-dark"
          style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 12, padding: '8px 16px' }}
        >
          Bul →
        </button>
      </div>

      {/* Dropdown suggestions */}
      {open && results.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6,
          background: 'white', border: '0.5px solid var(--border)',
          borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 50,
        }}>
          {results.map(t => (
            <button
              key={t.slug}
              onClick={() => { router.push(`/tool/${t.slug}`); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '11px 16px', border: 'none',
                background: 'transparent', cursor: 'pointer', textAlign: 'left',
                borderBottom: '0.5px solid var(--border)', fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--subtle)' }}>{t.categories.join(', ')}</div>
              </div>
              {t.hasFreeTier && t.startingPriceUsd === 0 && (
                <span className="badge badge-free" style={{ marginLeft: 'auto' }}>Ücretsiz</span>
              )}
            </button>
          ))}
          <button
            onClick={handleSubmit}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', padding: '10px 16px', border: 'none',
              background: 'var(--bg2)', cursor: 'pointer', textAlign: 'left',
              fontSize: 12, color: 'var(--muted)', fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            "{query}" için tüm sonuçları gör
          </button>
        </div>
      )}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
