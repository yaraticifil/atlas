'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools';
import type { Tool } from '@/lib/tools';

const MAX_COMPARE = 3;

const METRICS: { key: keyof Tool; label: string; icon: string; render: (v: unknown) => string; good?: (v: unknown) => boolean }[] = [
  { key: 'pricingModel',      label: 'Fiyat Modeli',      icon: '💳',
    render: v => ({ free: 'Ücretsiz', freemium: 'Freemium', paid: 'Ücretli', open_source: 'Açık Kaynak' }[v as string] ?? String(v)),
    good: v => v === 'free' || v === 'open_source' },
  { key: 'startingPriceUsd', label: 'Başlangıç Fiyatı',  icon: '💰',
    render: v => v === 0 ? 'Ücretsiz' : `$${v}/ay`,
    good: v => v === 0 },
  { key: 'trustScore',       label: 'Güven Puanı',        icon: '🛡️',
    render: v => `${v}/100`,
    good: v => (v as number) >= 85 },
  { key: 'privacyScore',     label: 'Gizlilik',           icon: '🔒',
    render: v => ({ high: '🟢 Yüksek', medium: '🟡 Orta', low: '🔴 Düşük' }[v as string] ?? String(v)),
    good: v => v === 'high' },
  { key: 'gdprCompliant',    label: 'GDPR Uyumlu',        icon: '🇪🇺',
    render: v => v ? '✅ Evet' : '❌ Hayır',
    good: v => !!v },
  { key: 'trainsOnData',     label: 'Verinizle Eğitiyor', icon: '⚠️',
    render: v => v ? '❌ Evet' : '✅ Hayır',
    good: v => !v },
  { key: 'dataStored',       label: 'Veri Depolama',      icon: '💾',
    render: v => v ? '❌ Sunucuda' : '✅ Hayır',
    good: v => !v },
  { key: 'openSource',       label: 'Açık Kaynak',        icon: '📖',
    render: v => v ? '✅ Evet' : '❌ Hayır',
    good: v => !!v },
  { key: 'localRun',         label: 'Yerel Çalışır',      icon: '🖥️',
    render: v => v ? '✅ Evet' : '❌ Hayır',
    good: v => !!v },
  { key: 'selfHostable',     label: 'Self-Host',          icon: '🏠',
    render: v => v ? '✅ Evet' : '❌ Hayır',
    good: v => !!v },
  { key: 'apiAvailable',     label: 'API Mevcut',         icon: '🔌',
    render: v => v ? '✅ Evet' : '❌ Hayır',
    good: v => !!v },
  { key: 'dockerSupport',    label: 'Docker Desteği',     icon: '🐳',
    render: v => v ? '✅ Evet' : '❌ Hayır',
    good: v => !!v },
  { key: 'ossHealthScore',   label: 'OSS Sağlık Puanı',  icon: '💚',
    render: v => (v as number) > 0 ? `${v}/100` : 'Kapalı kaynak',
    good: v => (v as number) >= 80 },
  { key: 'wrapperDepthScore',label: 'Wrapper Derinliği',  icon: '📦',
    render: v => `${v}/100 ${(v as number) >= 85 ? '(Orijinal)' : '(Wrapper)'}`,
    good: v => (v as number) >= 80 },
  { key: 'affiliateRisk',    label: 'Affiliate Riski',    icon: '🚩',
    render: v => v ? '❌ Var' : '✅ Yok',
    good: v => !v },
];

const ALL_CATEGORIES = Array.from(new Set(tools.flatMap(t => t.categories))).sort();

export default function ComparePage() {
  const [selected, setSelected] = useState<Tool[]>([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');

  const toggle = useCallback((tool: Tool) => {
    setSelected(prev => {
      if (prev.find(t => t.slug === tool.slug)) return prev.filter(t => t.slug !== tool.slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, tool];
    });
  }, []);

  const filtered = tools.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q);
    const matchCat = !catFilter || t.categories.includes(catFilter);
    return matchSearch && matchCat;
  });

  const catLabels: Record<string, string> = {
    chatbot: 'Chatbot', coding: 'Kodlama', image: 'Görsel', video: 'Video',
    audio: 'Ses', music: 'Müzik', writing: 'Yazı', automation: 'Otomasyon',
    research: 'Araştırma', presentation: 'Sunum', data: 'Veri', education: 'Eğitim',
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="section-label" style={{ marginBottom: 8 }}>⚖️ Karşılaştırma Modu</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(26px,4vw,36px)', color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>
          Araçları yan yana karşılaştır
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>
          En fazla 3 araç seç — fiyat, gizlilik, güven puanı 15+ metrik ile karşılaştırılsın.
        </p>
      </div>

      {/* Selection bar */}
      {selected.length > 0 && (
        <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', borderRadius: 12, padding: '12px 16px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
            Seçilenler ({selected.length}/{MAX_COMPARE}):
          </span>
          {selected.map(t => (
            <span key={t.slug} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'white', border: '0.5px solid var(--accent-border)', borderRadius: 8, padding: '4px 10px', fontSize: 13 }}>
              {t.icon} {t.name}
              <button onClick={() => toggle(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 14, lineHeight: 1 }}>×</button>
            </span>
          ))}
          {selected.length < 2 && (
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>En az 2 araç seç</span>
          )}
        </div>
      )}

      {/* Comparison table */}
      {selected.length >= 2 && (
        <div className="card animate-fade-up" style={{ marginBottom: 40, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'DM Sans'", fontSize: 12, color: 'var(--subtle)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', width: 200 }}>
                  Metrik
                </th>
                {selected.map(t => (
                  <th key={t.slug} style={{ padding: '16px 20px', textAlign: 'center', minWidth: 180 }}>
                    <div style={{ fontSize: 28 }}>{t.icon}</div>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: 'var(--text)', marginTop: 4 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      {t.startingPriceUsd === 0 ? 'Ücretsiz' : `$${t.startingPriceUsd}/ay`}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRICS.map((m, idx) => {
                const values = selected.map(t => t[m.key]);
                // İyi olan değer sayısını bul
                const goodValues = values.filter(v => m.good?.(v));
                return (
                  <tr key={String(m.key)} style={{ borderBottom: '0.5px solid var(--border)', background: idx % 2 === 0 ? 'transparent' : 'var(--bg)' }}>
                    <td style={{ padding: '12px 20px', fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 15 }}>{m.icon}</span> {m.label}
                    </td>
                    {selected.map(t => {
                      const val = t[m.key];
                      const isGood = m.good?.(val);
                      const allGood = goodValues.length === selected.length;
                      const highlight = isGood && !allGood; // en iyi olan
                      return (
                        <td key={t.slug} style={{
                          padding: '12px 20px', textAlign: 'center', fontSize: 13,
                          fontWeight: highlight ? 600 : 400,
                          color: highlight ? 'var(--success)' : isGood === false ? 'var(--danger)' : 'var(--text)',
                          background: highlight ? 'var(--success-bg)' : 'transparent',
                        }}>
                          {m.render(val)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* CTA */}
          <div style={{ padding: '16px 20px', borderTop: '0.5px solid var(--border)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {selected.map(t => (
              <Link key={t.slug} href={`/tool/${t.slug}`} className="btn btn-ghost" style={{ fontSize: 12 }}>
                {t.icon} {t.name} → Detaylı Bak
              </Link>
            ))}
            <button onClick={() => setSelected([])} className="btn btn-ghost" style={{ fontSize: 12, marginLeft: 'auto' }}>
              Sıfırla ✕
            </button>
          </div>
        </div>
      )}

      {/* Tool selector */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <input
            className="input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Araç ara..."
            style={{ maxWidth: 280, padding: '9px 14px' }}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => setCatFilter('')} className={`chip ${!catFilter ? 'chip-active' : ''}`}
              style={!catFilter ? { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-bg)' } : {}}>
              Tümü
            </button>
            {ALL_CATEGORIES.map(c => (
              <button key={c} onClick={() => setCatFilter(c === catFilter ? '' : c)} className="chip"
                style={catFilter === c ? { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-bg)' } : {}}>
                {catLabels[c] || c}
              </button>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--subtle)' }}>
          {filtered.length} araç • {selected.length < MAX_COMPARE ? `${MAX_COMPARE - selected.length} daha seçebilirsin` : 'Maksimuma ulaştın'}
        </p>
      </div>

      {/* Tool grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
        {filtered.map(tool => {
          const isSelected = !!selected.find(t => t.slug === tool.slug);
          const isFull = selected.length >= MAX_COMPARE && !isSelected;
          return (
            <button
              key={tool.slug}
              onClick={() => !isFull && toggle(tool)}
              disabled={isFull}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
                padding: '14px 16px', borderRadius: 12,
                border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: isSelected ? 'var(--accent-bg)' : 'white',
                cursor: isFull ? 'not-allowed' : 'pointer',
                opacity: isFull ? 0.5 : 1,
                transition: 'all 0.15s',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 24, flexShrink: 0 }}>{tool.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{tool.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tool.tagline}
                </div>
                <div style={{ fontSize: 11, marginTop: 4, color: tool.startingPriceUsd === 0 ? 'var(--success)' : 'var(--muted)', fontWeight: 500 }}>
                  {tool.startingPriceUsd === 0 ? '🆓 Ücretsiz' : `$${tool.startingPriceUsd}/ay`}
                </div>
              </div>
              {isSelected && (
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
