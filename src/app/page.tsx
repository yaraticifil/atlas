import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import ToolCard from '@/components/ToolCard';
import { tools, stackPresets, escapeModes } from '@/lib/tools';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HiveAtlas — AI Araç Keşif Platformu',
  description: 'Bütçene, gizliliğine, workflow\'una göre en iyi AI stack\'i saniyede bul. 0 affiliate link.',
};

const FEATURED_TOOLS = ['open-webui', 'continue-dev', 'n8n', 'flux', 'jan'].map(
  slug => tools.find(t => t.slug === slug)!
).filter(Boolean);

const CHIPS = [
  { label: 'ChatGPT\'den kaç 🏴', query: 'chatgpt alternatifi' },
  { label: 'Ücretsiz Midjourney alternatifi', query: 'midjourney ücretsiz' },
  { label: 'İnternetsiz çalışan AI', query: 'local çalışan ai' },
  { label: 'Ücretsiz Cursor alternatifi', query: 'cursor alternatifi' },
  { label: 'Gizlilik odaklı araçlar', query: 'gdpr gizlilik ai' },
];

const CATEGORIES = [
  { slug: 'chatbot',      label: 'Chatbot',      icon: '💬', count: tools.filter(t => t.categories.includes('chatbot')).length },
  { slug: 'coding',       label: 'Kodlama',       icon: '⌨️', count: tools.filter(t => t.categories.includes('coding')).length },
  { slug: 'image',        label: 'Görsel',        icon: '🎨', count: tools.filter(t => t.categories.includes('image')).length },
  { slug: 'automation',   label: 'Otomasyon',     icon: '⚡', count: tools.filter(t => t.categories.includes('automation')).length },
  { slug: 'audio',        label: 'Ses',           icon: '🎙️', count: tools.filter(t => t.categories.includes('audio')).length },
  { slug: 'writing',      label: 'Yazı',          icon: '📝', count: tools.filter(t => t.categories.includes('writing')).length },
];

export default function HomePage() {
  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px 52px', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '5px 12px', borderRadius: 20, marginBottom: 28, border: '0.5px solid var(--accent-border)' }}>
          <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="4"/></svg>
          Yapay zeka karmaşıklığını sıfırlıyoruz
        </div>

        <h1 style={{ fontSize: 'clamp(38px, 6vw, 54px)', fontFamily: "'DM Serif Display', serif", letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--text)', marginBottom: 16 }}>
          Sen söyle,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>biz karar verelim</em>
        </h1>

        <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300, maxWidth: 420, margin: '0 auto 40px' }}>
          400 araç araştırmak yok. Reddit kazmak yok.<br />
          Bütçene, gizliliğine, iş akışına göre en iyi yapay zeka araç setini saniyede bul.
        </p>

        <SearchBox autoFocus />

        {/* Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          {CHIPS.map(c => (
            <Link key={c.label} href={`/search?q=${encodeURIComponent(c.query)}`} className="chip">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border)', display: 'inline-block' }} />
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────── */}
      <div style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {[
            { n: `${tools.length}+`, label: 'araç veritabanında' },
            { n: '7', label: 'farklı analiz kriteri' },
            { n: '0', label: 'reklam / yönlendirme linki' },
            { n: 'Gerçek', label: 'veri, gerçek puan' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)' }}>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>{s.n}</span>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* ─── ESCAPE MODES ─────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p className="section-label">Escape modları</p>
            <h2 style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif", color: 'var(--text)', marginTop: 4 }}>
              Ücretli araçtan kaç, özgür ol
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {escapeModes.map(e => (
            <Link
              key={e.id}
              href={`/escape/${e.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card card-interactive" style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 20 }}>{e.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--text)' }}>{e.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--subtle)', marginBottom: 2 }}>Şu an</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--danger)' }}>${e.fromCost}/ay</div>
                  </div>
                  <div style={{ fontSize: 18, color: 'var(--border2)' }}>→</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--subtle)', marginBottom: 2 }}>Sonra</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--success)' }}>
                      {e.toCost === 0 ? 'Ücretsiz' : `$${e.toCost}/ay`}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 10, fontSize: 11, fontWeight: 500, color: 'var(--success)', background: 'var(--success-bg)', padding: '3px 8px', borderRadius: 6, display: 'inline-block' }}>
                  %{Math.round((1 - e.toCost / e.fromCost) * 100)} tasarruf
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── STACK PRESETS ────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p className="section-label">Stack presets</p>
            <h2 style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif", color: 'var(--text)', marginTop: 4 }}>
              Kullanıma hazır AI stack'ler
            </h2>
          </div>
          <Link href="/stacks" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            Tümü →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {stackPresets.map(s => (
            <Link key={s.id} href={`/stacks#${s.id}`} style={{ textDecoration: 'none' }}>
              <div className="card card-interactive" style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--text)' }}>{s.name}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10 }}>{s.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: s.totalMonthlyCost === 0 ? 'var(--success)' : 'var(--muted)', fontWeight: 500 }}>
                    {s.totalMonthlyCost === 0 ? '🆓 Tamamen ücretsiz' : `$${s.totalMonthlyCost}/ay`}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--subtle)' }}>{s.tools.length} araç</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 24px' }}>
        <p className="section-label" style={{ marginBottom: 16 }}>Kategoriler</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
          {CATEGORIES.map(c => (
            <Link key={c.slug} href={`/category/${c.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card card-interactive" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--subtle)' }}>{c.count} araç</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED TOOLS ───────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p className="section-label">Öne çıkanlar</p>
            <h2 style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif", color: 'var(--text)', marginTop: 4 }}>
              En çok tercih edilen ücretsiz araçlar
            </h2>
          </div>
          <Link href="/matrix" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            Tümünü karşılaştır →
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FEATURED_TOOLS.map((tool, i) => <ToolCard key={tool.slug} tool={tool} rank={i + 1} />)}
        </div>
      </section>

      {/* ─── CTA STRIP ────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 24px' }}>
        <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--text)', marginBottom: 10 }}>
            AI dünyasında kaybolmak zorunda değilsin
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 420, margin: '0 auto 24px', lineHeight: 1.6 }}>
            Doğal dilde yaz. Ne istediğini söyle. Gerisini biz halledelim.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/matrix" className="btn btn-dark">Alternative Matrix'i Gör</Link>
            <Link href="/escape/openai" className="btn btn-ghost">Escape OpenAI</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
