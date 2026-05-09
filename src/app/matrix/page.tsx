import { tools } from '@/lib/tools';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alternative Matrix — HiveAtlas',
  description: 'Tüm AI araçları tek tabloda karşılaştır.',
};

const CATS = ['chatbot','coding','image','audio','automation','writing'];
const CAT_LABELS: Record<string, string> = {
  chatbot: '💬 Chatbot & Asistan', coding: '⌨️ Kodlama',
  image: '🎨 Görsel Üretim', audio: '🎙️ Ses',
  automation: '⚡ Otomasyon', writing: '📝 Yazı & Verimlilik',
};

export default function MatrixPage() {
  const sorted = [...tools].sort((a, b) => (b.matchScore ?? b.trustScore) - (a.matchScore ?? a.trustScore));
  const freeCount  = tools.filter(t => t.hasFreeTier && t.startingPriceUsd === 0).length;
  const ossCount   = tools.filter(t => t.openSource).length;
  const localCount = tools.filter(t => t.localRun).length;

  function privacyStyle(score: string) {
    return {
      fontSize: 11, fontWeight: 500 as const, padding: '2px 7px', borderRadius: 5,
      background: score === 'high' ? 'var(--success-bg)' : score === 'medium' ? 'var(--warning-bg)' : 'var(--danger-bg)',
      color: score === 'high' ? 'var(--success)' : score === 'medium' ? 'var(--warning)' : 'var(--danger)',
    };
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <p className="section-label" style={{ marginBottom: 8 }}>Alternative Matrix</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: 'var(--text)', marginBottom: 10 }}>
          Tüm AI araçları, şeffaf verilerle
        </h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 520 }}>
          {tools.length} araç · {freeCount} ücretsiz · {ossCount} açık kaynak · {localCount} yerel çalışır
        </p>
      </div>

      {CATS.map(cat => {
        const catTools = sorted.filter(t => t.categories.includes(cat));
        if (catTools.length === 0) return null;
        return (
          <section key={cat} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: 'var(--text)' }}>
                {CAT_LABELS[cat]}
              </h2>
              <Link href={`/category/${cat}`} style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>
                Kategoriye git →
              </Link>
            </div>
            <div style={{ overflow: 'auto', borderRadius: 12, border: '0.5px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--bg2)' }}>
                    {['Araç', 'Ücretsiz', 'OSS', 'Local', 'API', 'Gizlilik', 'Trust', 'Score'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: 'var(--subtle)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const, borderBottom: '0.5px solid var(--border)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {catTools.map((tool, i) => (
                    <tr key={tool.slug} style={{ background: i % 2 === 0 ? 'white' : 'var(--bg)', borderBottom: '0.5px solid var(--border)' }}>
                      <td style={{ padding: '10px 12px' }}>
                        <Link href={`/tool/${tool.slug}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 16 }}>{tool.icon}</span>
                          <span style={{ fontWeight: 500, color: 'var(--text)' }}>{tool.name}</span>
                          {tool.trustWarnings && tool.trustWarnings.length > 0 && (
                            <span title={tool.trustWarnings.join(' · ')} style={{ fontSize: 12 }}>⚠</span>
                          )}
                        </Link>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' as const }}>
                        {tool.hasFreeTier && tool.startingPriceUsd === 0
                          ? <span style={{ color: 'var(--success)' }}>✓</span>
                          : <span style={{ color: 'var(--subtle)', fontSize: 11 }}>${tool.startingPriceUsd}</span>}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' as const }}>
                        {tool.openSource ? <span style={{ color: 'var(--success)' }}>✓</span> : <span style={{ color: 'var(--border2)' }}>—</span>}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' as const }}>
                        {tool.localRun ? <span style={{ color: 'var(--success)' }}>✓</span> : <span style={{ color: 'var(--border2)' }}>—</span>}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' as const }}>
                        {tool.apiAvailable ? <span style={{ color: 'var(--success)' }}>✓</span> : <span style={{ color: 'var(--border2)' }}>—</span>}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={privacyStyle(tool.privacyScore)}>
                          {tool.privacyScore === 'high' ? 'Yüksek' : tool.privacyScore === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' as const, color: 'var(--muted)', fontSize: 12 }}>
                        {tool.trustScore}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {tool.matchScore != null
                          ? <span className="score-pill" style={{ fontSize: 12 }}>{tool.matchScore}</span>
                          : <span style={{ color: 'var(--border2)', fontSize: 12 }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
