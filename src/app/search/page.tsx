import { Suspense } from 'react';
import SearchResultsClient from './SearchResultsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arama Sonuçları — HiveAtlas',
};

export default function SearchPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <Suspense fallback={<div style={{ color: 'var(--muted)', fontSize: 13 }}>Yükleniyor...</div>}>
        <SearchResultsClient />
      </Suspense>
    </div>
  );
}
