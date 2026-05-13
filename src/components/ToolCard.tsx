import Link from 'next/link';
import type { Tool } from '@/lib/tools';

function getBadges(tool: Tool) {
  const badges: { label: string; cls: string }[] = [];
  if (tool.hasFreeTier && tool.startingPriceUsd === 0) badges.push({ label: 'Ücretsiz', cls: 'badge-free' });
  if (tool.openSource) badges.push({ label: 'Açık Kaynak (OSS)', cls: 'badge-oss' });
  if (tool.localRun) badges.push({ label: 'İnternetsiz Çalışır', cls: 'badge-local' });
  if (tool.apiAvailable) badges.push({ label: 'API (Yazılıma Bağlanır)', cls: 'badge-api' });
  if (!tool.hasFreeTier && tool.startingPriceUsd > 0) badges.push({ label: `$${tool.startingPriceUsd}/ay`, cls: 'badge-paid' });
  return badges;
}

function PrivacyDot({ score }: { score: string }) {
  const map: Record<string, { color: string; label: string }> = {
    high: { color: '#16a34a', label: 'Gizlilik: Yüksek' },
    medium: { color: '#d97706', label: 'Gizlilik: Orta' },
    low: { color: '#dc2626', label: 'Gizlilik: Düşük' },
  };
  const { color, label } = map[score] ?? map.medium;
  return (
    <span title={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--subtle)' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block' }} />
      {score === 'high' ? 'Gizli' : score === 'medium' ? 'Orta' : 'Açık'}
    </span>
  );
}

export default function ToolCard({ tool, rank }: { tool: Tool; rank?: number }) {
  const badges = getBadges(tool);
  const hasTrustWarnings = tool.trustWarnings && tool.trustWarnings.length > 0;

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={`card card-interactive animate-fade-up ${rank ? `stagger-${Math.min(rank, 5)}` : ''}`}
      style={{
        display: 'block', padding: '16px 18px',
        textDecoration: 'none', color: 'inherit',
      }}
    >
      {/* Trust warnings — top */}
      {hasTrustWarnings && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {tool.trustWarnings!.map(w => (
            <span key={w} className="trust-warning">⚠ {w}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {/* Icon */}
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: 'var(--bg2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0, border: '0.5px solid var(--border)',
        }}>
          {tool.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{tool.name}</span>
              {badges.map(b => (
                <span key={b.label} className={`badge ${b.cls}`}>{b.label}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <PrivacyDot score={tool.privacyScore} />
              {tool.matchScore != null && (
                <span className="score-pill">{tool.matchScore}</span>
              )}
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5 }}>
            {tool.tagline}
          </p>

          {/* OSS health / commit frequency */}
          {tool.openSource && (
            <div style={{ marginTop: 8, display: 'flex', gap: 12, fontSize: 11, color: 'var(--subtle)' }}>
              {tool.githubStars && (
                <span>★ {(tool.githubStars / 1000).toFixed(0)}k GitHub yıldızı</span>
              )}
              <span>{
                tool.commitFrequency === 'daily' ? '🟢 Her gün güncelleniyor' :
                  tool.commitFrequency === 'weekly' ? '🟡 Haftada güncelleniyor' :
                    tool.commitFrequency === 'monthly' ? '🟠 Ayda güncelleniyor' :
                      '🔴 Güncelleme durdu'
              }</span>
              {tool.ossHealthScore > 0 && (
                <span>Sağlık puanı: {tool.ossHealthScore}/100</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
