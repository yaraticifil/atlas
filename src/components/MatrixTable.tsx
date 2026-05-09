'use client';
import Link from 'next/link';
import type { Tool } from '@/lib/tools';

export default function MatrixTable({ tools }: { tools: Tool[] }) {
  return (
    <div style={{ overflow: 'auto', borderRadius: 12, border: '0.5px solid var(--border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--bg2)' }}>
            {['Araç', 'Ücretsiz', 'OSS', 'Local', 'API', 'Gizlilik', 'Trust', 'Score'].map(h => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: 'var(--subtle)', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap', borderBottom: '0.5px solid var(--border)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, i) => (
            <tr
              key={tool.slug}
              style={{ background: i % 2 === 0 ? 'white' : 'var(--bg)', borderBottom: '0.5px solid var(--border)', transition: 'background 0.1s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'white' : 'var(--bg)')}
              onClick={() => window.location.href = `/tool/${tool.slug}`}
            >
              <td style={{ padding: '10px 12px' }}>
                <Link href={`/tool/${tool.slug}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{tool.icon}</span>
                  <span style={{ fontWeight: 500, color: 'var(--text)' }}>{tool.name}</span>
                  {tool.trustWarnings && tool.trustWarnings.length > 0 && (
                    <span title={tool.trustWarnings.join(' · ')} style={{ fontSize: 12, cursor: 'help' }}>⚠</span>
                  )}
                </Link>
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                {tool.hasFreeTier && tool.startingPriceUsd === 0
                  ? <span style={{ color: 'var(--success)' }}>✓</span>
                  : <span style={{ color: 'var(--subtle)', fontSize: 11 }}>${tool.startingPriceUsd}</span>}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                {tool.openSource ? <span style={{ color: 'var(--success)' }}>✓</span> : <span style={{ color: 'var(--border2)' }}>—</span>}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                {tool.localRun ? <span style={{ color: 'var(--success)' }}>✓</span> : <span style={{ color: 'var(--border2)' }}>—</span>}
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                {tool.apiAvailable ? <span style={{ color: 'var(--success)' }}>✓</span> : <span style={{ color: 'var(--border2)' }}>—</span>}
              </td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, padding: '2px 7px', borderRadius: 5,
                  background: tool.privacyScore === 'high' ? 'var(--success-bg)' : tool.privacyScore === 'medium' ? 'var(--warning-bg)' : 'var(--danger-bg)',
                  color: tool.privacyScore === 'high' ? 'var(--success)' : tool.privacyScore === 'medium' ? 'var(--warning)' : 'var(--danger)',
                }}>
                  {tool.privacyScore === 'high' ? 'Yüksek' : tool.privacyScore === 'medium' ? 'Orta' : 'Düşük'}
                </span>
              </td>
              <td style={{ padding: '10px 12px', textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>
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
  );
}
