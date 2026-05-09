'use client';
import Link from 'next/link';
import { useState } from 'react';
import { escapeModes } from '@/lib/tools';

export default function Nav() {
  const [escapeOpen, setEscapeOpen] = useState(false);

  return (
    <nav style={{ borderBottom: '0.5px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'var(--text)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L10.5 6H13L11 9L12 13L8 11L4 13L5 9L3 6H5.5L8 2Z" fill="white" opacity=".9"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: 'var(--text)', letterSpacing: '-0.01em' }}>HiveAtlas</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Escape Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setEscapeOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 12px', borderRadius: 8,
                border: escapeOpen ? '0.5px solid var(--border2)' : '0.5px solid transparent',
                background: escapeOpen ? 'var(--bg2)' : 'transparent',
                fontSize: 13, color: 'var(--muted)', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              🏴 Kaçış <span style={{ fontSize: 11, color: 'var(--subtle)', fontWeight: 400 }}>(ücretliden kurtul)</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: escapeOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {escapeOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, marginTop: 4,
                background: 'white', border: '0.5px solid var(--border)',
                borderRadius: 12, padding: 6, minWidth: 220,
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 100,
              }}>
                {escapeModes.map(e => (
                  <Link
                    key={e.id}
                    href={`/escape/${e.id}`}
                    onClick={() => setEscapeOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                      color: 'var(--text)', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e2 => (e2.currentTarget.style.background = 'var(--bg2)')}
                    onMouseLeave={e2 => (e2.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{e.icon}</span>
                      <span style={{ fontWeight: 500 }}>{e.name}</span>
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 500 }}>
                      %{Math.round((1 - e.toCost / e.fromCost) * 100)} tasarruf
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/matrix" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 13, color: 'var(--muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            Karşılaştır <span style={{ fontSize: 11, fontWeight: 400 }}>(Matrix)</span>
          </Link>
          <Link href="/stacks" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 13, color: 'var(--muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            Hazır Setler <span style={{ fontSize: 11, fontWeight: 400 }}>(Stack)</span>
          </Link>

          <Link href="/tool/open-webui" className="btn btn-dark" style={{ marginLeft: 8, fontSize: 12, padding: '7px 14px' }}>
            Keşfet →
          </Link>
        </div>
      </div>

      {/* Close dropdown on outside click */}
      {escapeOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setEscapeOpen(false)} />
      )}
    </nav>
  );
}
