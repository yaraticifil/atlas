import { tools, escapeModes } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return escapeModes.map(e => ({ id: e.id }));
}

const ESCAPE_DETAILS: Record<string, {
  title: string; subtitle: string; emoji: string;
  currentStack: Array<{ name: string; cost: number; reason: string }>;
  freeStack: string[];
}> = {
  openai: {
    title: 'Escape OpenAI',
    subtitle: '$72/ay OpenAI stack\'ini $3\'a indir — ya da tamamen ücretsiz yap',
    emoji: '🏴',
    currentStack: [
      { name: 'ChatGPT Plus', cost: 20, reason: 'Sohbet & yazı' },
      { name: 'GitHub Copilot', cost: 10, reason: 'Kod asistanı' },
      { name: 'DALL-E 3 (API)', cost: 15, reason: 'Görsel üretim' },
      { name: 'Whisper (API)', cost: 12, reason: 'Ses transkripti' },
      { name: 'Embeddings', cost: 15, reason: 'Semantic search' },
    ],
    freeStack: ['open-webui', 'continue-dev', 'stable-diffusion', 'jan'],
  },
  adobe: {
    title: 'Escape Adobe',
    subtitle: '$55/ay Creative Cloud\'dan tamamen ücretsiz alternatiflere geç',
    emoji: '🎨',
    currentStack: [
      { name: 'Adobe Firefly', cost: 5, reason: 'AI görsel' },
      { name: 'Photoshop', cost: 20, reason: 'Fotoğraf düzenleme' },
      { name: 'Premiere Pro', cost: 15, reason: 'Video düzenleme' },
      { name: 'Adobe Stock', cost: 15, reason: 'Stock görsel' },
    ],
    freeStack: ['stable-diffusion', 'comfyui', 'flux'],
  },
  zapier: {
    title: 'Escape Zapier',
    subtitle: '$50/ay Zapier faturasını $0\'a indir — self-host, açık kaynak',
    emoji: '⚡',
    currentStack: [
      { name: 'Zapier Professional', cost: 30, reason: '750 görev/ay' },
      { name: 'Make (Integromat)', cost: 10, reason: 'Ek otomasyon' },
      { name: 'Webhooks', cost: 10, reason: 'API tetikleyici' },
    ],
    freeStack: ['n8n'],
  },
  notion: {
    title: 'Escape Notion',
    subtitle: '$20/ay Notion AI\'dan ücretsiz alternatiflere geç',
    emoji: '📓',
    currentStack: [
      { name: 'Notion Plus', cost: 10, reason: 'Not alma & wiki' },
      { name: 'Notion AI', cost: 10, reason: 'AI yazı asistanı' },
    ],
    freeStack: ['obsidian', 'open-webui'],
  },
  github: {
    title: 'Escape GitHub Copilot',
    subtitle: '$10/ay Copilot yerine ücretsiz ve yerel çalışan AI coding araçları',
    emoji: '🐙',
    currentStack: [
      { name: 'GitHub Copilot', cost: 10, reason: 'AI kod tamamlama' },
    ],
    freeStack: ['continue-dev', 'cline', 'aider'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const detail = ESCAPE_DETAILS[id];
  if (!detail) return {};
  return { title: `${detail.title} — HiveAtlas`, description: detail.subtitle };
}

export default async function EscapePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = ESCAPE_DETAILS[id];
  const escapeMode = escapeModes.find(e => e.id === id);
  if (!detail || !escapeMode) notFound();

  const freeTools = detail.freeStack.map(slug => tools.find(t => t.slug === slug)!).filter(Boolean);
  const totalFrom = detail.currentStack.reduce((s, c) => s + c.cost, 0);
  const savings = Math.round((1 - escapeMode.toCost / totalFrom) * 100);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      {/* Back */}
      <Link href="/" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 28 }}>
        ← Geri
      </Link>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{detail.emoji}</div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, color: 'var(--text)', marginBottom: 10 }}>
          {detail.title}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 480, margin: '0 auto' }}>
          {detail.subtitle}
        </p>
      </div>

      {/* Cost comparison */}
      <div style={{ background: 'var(--bg2)', borderRadius: 16, padding: '24px', marginBottom: 32, border: '0.5px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
          {/* Current */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--subtle)', marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Şu anki stack</div>
            {detail.currentStack.map(c => (
              <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--muted)' }}>{c.name}</span>
                <span style={{ fontWeight: 500, color: 'var(--danger)' }}>${c.cost}/ay</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontSize: 16, fontWeight: 600, color: 'var(--danger)' }}>
              <span>Toplam</span>
              <span>${totalFrom}/ay</span>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, color: 'var(--border2)', marginBottom: 6 }}>→</div>
            <div style={{ background: 'var(--success-bg)', color: 'var(--success)', fontSize: 13, fontWeight: 600, padding: '6px 12px', borderRadius: 20 }}>
              %{savings} tasarruf
            </div>
          </div>

          {/* Alternative */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--subtle)', marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Alternatif stack</div>
            {freeTools.map(t => (
              <div key={t.slug} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t.icon} {t.name}
                </span>
                <span style={{ fontWeight: 500, color: 'var(--success)' }}>Ücretsiz</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, fontSize: 16, fontWeight: 600, color: 'var(--success)' }}>
              <span>Toplam</span>
              <span>{escapeMode.toCost === 0 ? 'Ücretsiz' : `$${escapeMode.toCost}/ay`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Free tools detail */}
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: 'var(--text)', marginBottom: 16 }}>
        Ücretsiz alternatiflerin detayı
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        {freeTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} rank={i + 1} />)}
      </div>

      {/* Other escape modes */}
      <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: '20px', border: '0.5px solid var(--border)' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>Diğer escape modları</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {escapeModes.filter(e => e.id !== id).map(e => (
            <Link key={e.id} href={`/escape/${e.id}`} className="chip">
              {e.icon} {e.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
