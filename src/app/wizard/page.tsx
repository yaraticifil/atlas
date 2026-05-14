'use client';
import { useState } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools';
import type { Tool } from '@/lib/tools';

type Step = 1 | 2 | 3 | 4 | 'result';

const STEPS = {
  1: {
    title: 'Ne yapmak istiyorsun?',
    subtitle: 'Birini seç — en yakın olanı.',
    key: 'goal',
    options: [
      { value: 'writing',      icon: '✍️', label: 'Yazmak',           desc: 'Makale, e-posta, içerik üretimi' },
      { value: 'coding',       icon: '💻', label: 'Kod yazmak',        desc: 'Geliştirici asistanı, kod üretimi' },
      { value: 'image',        icon: '🎨', label: 'Görsel üretmek',    desc: 'Fotoğraf, illüstrasyon, tasarım' },
      { value: 'video',        icon: '🎬', label: 'Video üretmek',     desc: 'Kısa video, avatar, animasyon' },
      { value: 'music',        icon: '🎵', label: 'Müzik / Ses',       desc: 'Şarkı, seslendirme, transkript' },
      { value: 'research',     icon: '🔍', label: 'Araştırmak',        desc: 'Akademik, pazar araştırması' },
      { value: 'automation',   icon: '⚡', label: 'Otomasyon',         desc: 'İş akışı, entegrasyon, botlar' },
      { value: 'presentation', icon: '📊', label: 'Sunum hazırlamak',  desc: 'Slayt, rapor, deck' },
    ],
  },
  2: {
    title: 'Aylık bütçen ne kadar?',
    subtitle: 'AI araçlarına ne kadar harcamak istiyorsun?',
    key: 'budget',
    options: [
      { value: '0',     icon: '🆓', label: 'Ücretsiz',        desc: 'Hiç para ödemem' },
      { value: '10',    icon: '💰', label: '$0–10 / ay',       desc: 'Kahve parası' },
      { value: '30',    icon: '💳', label: '$10–30 / ay',      desc: 'Hafif yatırım' },
      { value: '999',   icon: '🚀', label: 'Fark etmez',       desc: 'Kalite önce gelir' },
    ],
  },
  3: {
    title: 'Gizlilik ne kadar önemli?',
    subtitle: 'Verilerinin nereye gittiği seni etkiliyor mu?',
    key: 'privacy',
    options: [
      { value: 'high',   icon: '🔒', label: 'Çok kritik',      desc: 'Hiçbir verim buluta gitmesin (yerel çalışsın)' },
      { value: 'medium', icon: '🛡️', label: 'Önemli',          desc: 'GDPR uyumlu olsun, AB sunucuları tercih' },
      { value: 'low',    icon: '🌐', label: 'Önemli değil',    desc: 'Pratiklik ve özellik önce gelir' },
    ],
  },
  4: {
    title: 'Teknik seviyeni seç',
    subtitle: 'Kurulum ve yapılandırma konusunda ne kadar rahatsın?',
    key: 'techLevel',
    options: [
      { value: 'none',   icon: '👆', label: 'Tıkla–çalıştır',  desc: 'Terminal, Docker bilmiyorum; tarayıcıda açılsın' },
      { value: 'mid',    icon: '⌨️', label: 'Orta',            desc: 'CLI kullanabilirim, README okuyabilirim' },
      { value: 'pro',    icon: '🛠️', label: 'İleri',           desc: 'Docker, server, self-hosting sorun değil' },
    ],
  },
};

function scoreTools(answers: Record<string, string>): Tool[] {
  const { goal, budget, privacy, techLevel } = answers;
  const maxBudget = parseInt(budget || '999');

  return tools
    .map(t => {
      let score = 0;

      // Amaç eşleşmesi
      const goalCatMap: Record<string, string[]> = {
        writing: ['writing', 'chatbot'],
        coding: ['coding'],
        image: ['image'],
        video: ['video'],
        music: ['audio', 'music'],
        research: ['research', 'chatbot'],
        automation: ['automation'],
        presentation: ['presentation', 'writing'],
      };
      const targetCats = goalCatMap[goal] || [];
      if (t.categories.some(c => targetCats.includes(c))) score += 40;

      // Bütçe filtresi — hard filter
      if (t.startingPriceUsd > maxBudget) return { ...t, matchScore: -1 };
      if (t.startingPriceUsd === 0) score += 20;
      else if (t.startingPriceUsd <= maxBudget) score += 10;

      // Gizlilik
      if (privacy === 'high') {
        if (t.localRun) score += 25;
        if (t.privacyScore === 'high') score += 15;
        if (t.trainsOnData) score -= 20;
      } else if (privacy === 'medium') {
        if (t.gdprCompliant) score += 15;
        if (t.privacyScore === 'high') score += 10;
      } else {
        score += 5; // neutral
      }

      // Teknik seviye
      if (techLevel === 'none') {
        if (!t.selfHostable && !t.localRun) score += 15;
        if (t.localRun) score -= 10; // kurulum gerektirir
      } else if (techLevel === 'mid') {
        score += 5; // neutral
      } else {
        if (t.selfHostable || t.localRun) score += 15;
        if (t.dockerSupport) score += 5;
      }

      // OSS bonus
      if (t.openSource) score += 5;
      // Trust bonus
      score += Math.round(t.trustScore / 20);

      return { ...t, matchScore: score };
    })
    .filter(t => (t.matchScore ?? 0) >= 0)
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0, 5);
}

const MATCH_COLOR = (s: number) =>
  s >= 80 ? 'var(--success)' : s >= 60 ? 'var(--accent)' : 'var(--muted)';

export default function WizardPage() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Tool[]>([]);

  const currentStep = typeof step === 'number' ? STEPS[step as 1 | 2 | 3 | 4] : null;

  function pick(value: string) {
    const key = currentStep!.key;
    const next = { ...answers, [key]: value };
    setAnswers(next);

    if (step === 4) {
      setResults(scoreTools(next));
      setStep('result');
    } else {
      setStep((step as number + 1) as Step);
    }
  }

  function reset() {
    setStep(1);
    setAnswers({});
    setResults([]);
  }

  const progress = step === 'result' ? 100 : ((step as number - 1) / 4) * 100;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40, maxWidth: 560 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '4px 12px', borderRadius: 20, marginBottom: 20, border: '0.5px solid var(--accent-border)' }}>
          🐘 Creative Elephant — AI Sihirbazı
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px,4vw,38px)', color: 'var(--text)', marginBottom: 10, letterSpacing: '-0.02em' }}>
          Sana özel AI aracını bulalım
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>
          4 soruyu yanıtla — hortumla koklayalım, 5 araç önerelim. Reklam yok, yönlendirme linki yok.
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 520, background: 'var(--bg2)', borderRadius: 99, height: 4, marginBottom: 40, overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'var(--accent)', borderRadius: 99, width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Step card */}
      {currentStep && (
        <div className="card animate-fade-up" style={{ width: '100%', maxWidth: 620, padding: '36px 32px' }}>
          <p className="section-label" style={{ marginBottom: 8 }}>
            Adım {step} / 4
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: 'var(--text)', marginBottom: 6 }}>
            {currentStep.title}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>{currentStep.subtitle}</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: currentStep.options.length > 4 ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr',
            gap: 10,
          }}>
            {currentStep.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => pick(opt.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                  padding: '14px 18px', borderRadius: 12,
                  border: '1px solid var(--border)', background: 'white',
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent-bg)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.background = 'white';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {step > 1 && (
            <button
              onClick={() => setStep((step as number - 1) as Step)}
              style={{ marginTop: 20, background: 'none', border: 'none', fontSize: 13, color: 'var(--subtle)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
            >
              ← Geri
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {step === 'result' && (
        <div className="animate-fade-up" style={{ width: '100%', maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--text)', marginBottom: 8 }}>
              İşte sana özel {results.length} araç
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              Cevaplarına göre puanlandı. Ücretsiz, gerçek veriler.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {results.map((tool, i) => (
              <div key={tool.slug} className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
                {/* Rank */}
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--bg2)', color: i === 0 ? 'white' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {i + 1}
                </div>
                {/* Icon */}
                <span style={{ fontSize: 28, flexShrink: 0 }}>{tool.icon}</span>
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>{tool.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2, lineHeight: 1.4 }}>{tool.tagline}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {tool.hasFreeTier && <span className="badge badge-free">Ücretsiz</span>}
                    {tool.openSource && <span className="badge badge-oss">Açık Kaynak</span>}
                    {tool.localRun && <span className="badge badge-local">Yerel Çalışır</span>}
                    {tool.gdprCompliant && <span className="badge" style={{ background: '#E0F2FE', color: '#075985' }}>GDPR ✓</span>}
                  </div>
                </div>
                {/* Score & Action */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: MATCH_COLOR(tool.matchScore ?? 0), lineHeight: 1 }}>
                    {tool.matchScore}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--subtle)', marginBottom: 10 }}>uyum puanı</div>
                  <Link href={`/tool/${tool.slug}`} className="btn btn-dark" style={{ fontSize: 12, padding: '6px 14px' }}>
                    İncele →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 28 }}>
            <button onClick={reset} className="btn btn-ghost">
              ↺ Yeniden başla
            </button>
            <Link href="/matrix" className="btn btn-dark">
              Tüm araçları karşılaştır →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
