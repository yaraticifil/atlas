import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HiveAtlas — AI Araç Keşif Platformu",
  description: "Doğal dilde yazın, size uygun en iyi AI aracını saniyede bulun. 0 affiliate link, gerçek veriler.",
  keywords: "AI araçlar, ChatGPT alternatifi, ücretsiz AI, açık kaynak AI, AI karşılaştırma",
  openGraph: {
    title: "HiveAtlas — AI Araç Keşif Platformu",
    description: "Bütçene, gizliliğine, workflow'una göre en iyi AI stack'i saniyede bul.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
