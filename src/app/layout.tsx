import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Creative Elephant 🐘 — AI Dünyasının Kılavuzu",
  description: "Fil hortumu gibi her köşeyi koklayan AI keşif platformu. Bütçene, gizliliğine ve iş akışına göre en iyi AI aracını saniyede bul. 0 affiliate link, gerçek veriler.",
  keywords: "AI araçlar, ChatGPT alternatifi, ücretsiz AI, açık kaynak AI, AI karşılaştırma, creative elephant",
  openGraph: {
    title: "Creative Elephant 🐘 — AI Dünyasının Kılavuzu",
    description: "Fil hortumu gibi her yeri araştırıyor, sana en iyi AI aracını buluyor. 43+ araç, 0 reklam.",
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
