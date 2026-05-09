import { tools, getAlternatives } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.name} İncelemesi & Alternatifleri — HiveAtlas`,
    description: tool.tagline,
  };
}

function StatLine({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '0.5px solid var(--border)' }}>
      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: highlight ? 'var(--success)' : 'var(--text)' }}>{value}</span>
    </div>
  );
}

function PrivacyBadge({ score }: { score: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    high:   { bg: 'var(--success-bg)', color: 'var(--success)', label: '🔒 Yüksek Gizlilik' },
    medium: { bg: 'var(--warning-bg)', color: 'var(--warning)', label: '🟡 Orta Gizlilik' },
    low:    { bg: 'var(--danger-bg)',  color: 'var(--danger)',  label: '🔓 Düşük Gizlilik' },
  };
  const { bg, color, label } = map[score];
  return <span style={{ background: bg, color, fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 8 }}>{label}</span>;
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  if (!tool) notFound();

  const alternatives = getAlternatives(slug, 5);

  const badges: { label: string; cls: string }[] = [];
  if (tool.hasFreeTier && tool.startingPriceUsd === 0) badges.push({ label: 'Ücretsiz', cls: 'badge-free' });
  if (tool.openSource) badges.push({ label: 'Açık Kaynak (OSS)', cls: 'badge-oss' });
  if (tool.localRun) badges.push({ label: 'İnternetsiz Çalışır', cls: 'badge-local' });
  if (tool.apiAvailable) badges.push({ label: 'API (Yazılıma Bağlanır)', cls: 'badge-api' });
  if (tool.dockerSupport) badges.push({ label: 'Docker (Konteyner)', cls: 'badge-docker' });

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--subtle)', marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--subtle)', textDecoration: 'none' }}>HiveAtlas</Link>
        <span>›</span>
        <Link href={`/category/${tool.categories[0]}`} style={{ color: 'var(--subtle)', textDecoration: 'none' }}>{tool.categories[0]}</Link>
        <span>›</span>
        <span>{tool.name}</span>
      </div>

      {/* Trust warnings */}
      {tool.trustWarnings && tool.trustWarnings.length > 0 && (
        <div style={{ background: 'var(--warning-bg)', border: '0.5px solid #FDE68A', borderRadius: 10, padding: '12px 16px', marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--warning)', marginBottom: 6 }}>⚠ Dikkat Edilmesi Gerekenler</div>
          {tool.trustWarnings.map(w => (
            <div key={w} style={{ fontSize: 13, color: 'var(--warning)', marginTop: 4 }}>• {w}</div>
          ))}
        </div>
      )}

      {/* Hero */}
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 28 }}>
        <div style={{ width: 64, height: 64, background: 'var(--bg2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '0.5px solid var(--border)', flexShrink: 0 }}>
          {tool.icon}
        </div>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: 'var(--text)', marginBottom: 6 }}>{tool.name}</h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 10 }}>{tool.tagline}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {badges.map(b => <span key={b.label} className={`badge ${b.cls}`}>{b.label}</span>)}
            <PrivacyBadge score={tool.privacyScore} />
            {tool.matchScore != null && <span className="score-pill">MatchScore: {tool.matchScore}</span>}
          </div>
        </div>
      </div>

      {/* Quick metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8, marginBottom: 32 }}>
        {[
          { label: 'Başlangıç Fiyatı', value: tool.startingPriceUsd === 0 ? 'Ücretsiz' : `$${tool.startingPriceUsd}/ay` },
          { label: 'Güven Puanı (Trust Score)', value: `${tool.trustScore}/100` },
          { label: 'Açık Kaynak Sağlığı (OSS Health)', value: tool.openSource ? `${tool.ossHealthScore}/100` : 'Geçerli değil' },
          { label: 'Bağımsızlık Puanı (Wrapper Depth)', value: `${tool.wrapperDepthScore}/100` },
        ].map(m => (
          <div key={m.label} style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)' }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 3 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Grid: info + privacy */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {/* Technical */}
        <div className="card" style={{ padding: '16px 18px' }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Teknik Özellikler</p>
          <StatLine label="Kendi sunucunda çalıştır (Self-host)" value={tool.selfHostable ? '✅ Evet, kendi sunucunda kurulabilir' : '❌ Hayır, sadece bulutta çalışır'} highlight={tool.selfHostable} />
          <StatLine label="İnternetsiz çalışır (Local Run)" value={tool.localRun ? '✅ Evet, internete gerek yok' : '❌ Hayır, internet gerekli'} highlight={tool.localRun} />
          <StatLine label="Docker (Konteyner kurulumu)" value={tool.dockerSupport ? '✅ Destekleniyor' : '❌ Desteklenmiyor'} highlight={tool.dockerSupport} />
          <StatLine label="Ollama (Yerel AI motoru)" value={tool.ollamaSupport ? '✅ Destekleniyor' : '❌ Desteklenmiyor'} highlight={tool.ollamaSupport} />
          <StatLine label="API erişimi (Yazılıma bağlanır)" value={tool.apiAvailable ? '✅ Var' : '❌ Yok'} highlight={tool.apiAvailable} />
          {tool.openSource && tool.licenseType && (
            <StatLine label="Lisans türü" value={tool.licenseType} />
          )}
          {tool.githubStars && (
            <StatLine label="GitHub yıldızı (popülerlik)" value={`★ ${(tool.githubStars / 1000).toFixed(0)}k kişi beğendi`} />
          )}
          <div style={{ borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 9 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Güncelleme sıklığı</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{
              tool.commitFrequency === 'daily' ? '🟢 Her gün' :
              tool.commitFrequency === 'weekly' ? '🟡 Haftada bir' :
              tool.commitFrequency === 'monthly' ? '🟠 Ayda bir' :
              '🔴 Durdu'
            }</span>
          </div>
        </div>

        {/* Privacy */}
        <div className="card" style={{ padding: '16px 18px' }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Gizlilik & Güven</p>
          <StatLine label="GDPR Uyumlu (AB veri yasası)" value={tool.gdprCompliant ? '✅ Evet, uyumlu' : '❌ Hayır, uyumlu değil'} highlight={tool.gdprCompliant} />
          <StatLine label="Veri saklanıyor mu?" value={tool.dataStored ? '⚠ Evet, verileriniz saklanır' : '✅ Hayır, verileriniz saklanmaz'} highlight={!tool.dataStored} />
          <StatLine label="Verilerinizle AI eğitiliyor mu?" value={tool.trainsOnData ? '⚠ Evet, verileriniz kullanılır' : '✅ Hayır, kullanılmaz'} highlight={!tool.trainsOnData} />
          <StatLine label="Bağlı link riski (Affiliate)" value={tool.affiliateRisk ? '⚠ Var, taımsız öneriler olabilir' : '✅ Yok, bağımsız değerlendirme'} highlight={!tool.affiliateRisk} />
          <div style={{ paddingTop: 12 }}>
            <PrivacyBadge score={tool.privacyScore} />
          </div>
        </div>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p className="section-label">{tool.name} alternatifleri</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: 'var(--text)', marginTop: 4 }}>
                MatchScore\'a göre sıralı öneriler
              </h2>
            </div>
            <Link href={`/alternatives/${slug}`} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              Tümü →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alternatives.map((alt, i) => <ToolCard key={alt.slug} tool={alt} rank={i + 1} />)}
          </div>
        </section>
      )}

      {/* Visit */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
          {tool.name}'ı Ziyaret Et ↗
        </a>
        {tool.githubUrl && (
          <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            GitHub ↗
          </a>
        )}
        <Link href={`/alternatives/${slug}`} className="btn btn-ghost">
          Tüm Alternatifleri Gör
        </Link>
      </div>
    </div>
  );
}
