import { tools, stackPresets } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stack Presets — HiveAtlas',
  description: 'Kullanıma hazır AI stack\'ler. Öğrenci, solo kurucu, YouTube creator, privacy-first ve daha fazlası.',
};

export default function StacksPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 36 }}>
        <p className="section-label" style={{ marginBottom: 8 }}>Hazır Araç Setleri</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: 'var(--text)', marginBottom: 10 }}>
          Kullanıma hazır yapay zeka setleri
        </h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 500 }}>
          Durumuna göre bir set seç. Hangi araçları kullanacağını, kurulum sırasını ve toplam maliyeti gör.
        </p>
      </div>

      {stackPresets.map(preset => {
        const presetTools = preset.tools
          .map(slug => tools.find(t => t.slug === slug)!)
          .filter(Boolean);

        return (
          <section key={preset.id} id={preset.id} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{preset.icon}</span>
              <div>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: 'var(--text)', marginBottom: 4 }}>
                  {preset.name}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 8 }}>{preset.description}</p>
                <span style={{
                  fontSize: 13, fontWeight: 600, padding: '4px 12px', borderRadius: 20,
                  background: preset.totalMonthlyCost === 0 ? 'var(--success-bg)' : 'var(--accent-bg)',
                  color: preset.totalMonthlyCost === 0 ? 'var(--success)' : 'var(--accent)',
                }}>
                  {preset.totalMonthlyCost === 0 ? '🆓 Tamamen ücretsiz' : `$${preset.totalMonthlyCost}/ay`}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {presetTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} rank={i + 1} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
