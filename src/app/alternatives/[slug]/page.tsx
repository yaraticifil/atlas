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
    title: `${tool.name} Alternatifleri — HiveAtlas`,
    description: `${tool.name} yerine kullanabileceğin en iyi AI araçları. MatchScore ile sıralandı.`,
  };
}

export default async function AlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = tools.find(t => t.slug === slug);
  if (!source) notFound();

  const alts = getAlternatives(slug, 10);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <Link href={`/tool/${slug}`} style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 24 }}>
        ← {source.name}'a dön
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <span style={{ fontSize: 36 }}>{source.icon}</span>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--text)' }}>
            {source.name} Alternatifleri
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
            {alts.length} alternatif bulundu — MatchScore sıralamasıyla
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {alts.map((tool, i) => <ToolCard key={tool.slug} tool={tool} rank={i + 1} />)}
      </div>
    </div>
  );
}
