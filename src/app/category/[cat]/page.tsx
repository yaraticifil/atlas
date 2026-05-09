import { tools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const CATEGORY_META: Record<string, { label: string; icon: string; desc: string }> = {
  chatbot:    { label: 'Chatbot & Asistan', icon: '💬', desc: 'AI sohbet asistanları ve dil modeli arayüzleri' },
  coding:     { label: 'Kodlama Araçları',  icon: '⌨️', desc: 'AI destekli kod yazma, tamamlama ve review araçları' },
  image:      { label: 'Görsel Üretim',     icon: '🎨', desc: 'Metin-görsel, düzenleme ve tasarım AI araçları' },
  audio:      { label: 'Ses Araçları',      icon: '🎙️', desc: 'Metin-konuşma, klonlama ve ses üretim araçları' },
  automation: { label: 'Otomasyon',         icon: '⚡', desc: 'Workflow otomasyon ve entegrasyon platformları' },
  writing:    { label: 'Yazı & Verimlilik', icon: '📝', desc: 'Not alma, yazı asistanı ve verimlilik araçları' },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map(cat => ({ cat }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params;
  const meta = CATEGORY_META[cat];
  if (!meta) return {};
  return { title: `${meta.label} — HiveAtlas`, description: meta.desc };
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const meta = CATEGORY_META[cat];
  if (!meta) notFound();

  const catTools = tools
    .filter(t => t.categories.includes(cat))
    .sort((a, b) => (b.matchScore ?? b.trustScore) - (a.matchScore ?? a.trustScore));

  const freeTools = catTools.filter(t => t.hasFreeTier && t.startingPriceUsd === 0);
  const ossTools  = catTools.filter(t => t.openSource);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--subtle)', marginBottom: 20, display: 'flex', gap: 6 }}>
        <Link href="/" style={{ color: 'var(--subtle)', textDecoration: 'none' }}>HiveAtlas</Link>
        <span>›</span>
        <span>{meta.label}</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 28 }}>
        <span style={{ fontSize: 40 }}>{meta.icon}</span>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>
            {meta.label}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 12 }}>{meta.desc}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 13, color: 'var(--muted)' }}>
            <span>{catTools.length} araç</span>
            <span>·</span>
            <span style={{ color: 'var(--success)', fontWeight: 500 }}>{freeTools.length} ücretsiz</span>
            <span>·</span>
            <span style={{ color: '#5B21B6', fontWeight: 500 }}>{ossTools.length} açık kaynak</span>
          </div>
        </div>
      </div>

      {/* Other categories */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
        {Object.entries(CATEGORY_META).filter(([k]) => k !== cat).map(([k, v]) => (
          <Link key={k} href={`/category/${k}`} className="chip">
            {v.icon} {v.label}
          </Link>
        ))}
      </div>

      {/* Tools */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {catTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} rank={i + 1} />)}
      </div>
    </div>
  );
}
