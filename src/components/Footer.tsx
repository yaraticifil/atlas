import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--border)', marginTop: 80, padding: '32px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, background: 'var(--text)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L10.5 6H13L11 9L12 13L8 11L4 13L5 9L3 6H5.5L8 2Z" fill="white" opacity=".9"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: 'var(--text)' }}>HiveAtlas</span>
          <span style={{ fontSize: 12, color: 'var(--subtle)' }}>— 0 affiliate link. Gerçek veri.</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'var(--muted)' }}>
          <Link href="/matrix" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Matrix</Link>
          <Link href="/stacks" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Stack Presets</Link>
          <Link href="/escape/openai" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Escape OpenAI</Link>
          <Link href="/category/chatbot" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Kategoriler</Link>
        </div>
      </div>
    </footer>
  );
}
