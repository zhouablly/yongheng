import type { Metadata } from "next";
import { Noto_Serif_SC, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const notoSansSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "永恒 · YǑNG HÉNG | 光的档案馆",
  description:
    "为相爱的人建造一座永恒的光之档案馆。收藏每一刻温柔，让爱在时光中永不褪色。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSansSC.variable} ${cormorantGaramond.variable} ${inter.variable}`}
    >
      <body>
        <div className="film-grain" />
        {children}
      </body>
    </html>
  );
}
