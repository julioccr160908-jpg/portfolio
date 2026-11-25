import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://juliocarneiro.dev"),
  title: {
    default: "Júlio Carneiro — Desenvolvedor Web & Engenheiro Frontend",
    template: "%s | Júlio Carneiro",
  },
  description:
    "Desenvolvedor Web e Engenheiro Frontend focado em landing pages de alta conversão, interfaces rápidas e aplicações modernas com código limpo.",
  keywords: [
    "Júlio Carneiro",
    "Desenvolvedor Web",
    "Engenheiro Frontend",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Landing Pages",
    "Alta Conversão",
    "Framer Motion",
    "UI/UX Editorial",
  ],
  authors: [{ name: "Júlio Carneiro", url: "https://github.com/julioccr160908-jpg" }],
  creator: "Júlio Carneiro",
  publisher: "Júlio Carneiro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://juliocarneiro.dev",
    siteName: "Júlio Carneiro — Portfólio",
    title: "Júlio Carneiro — Desenvolvedor Web & Engenheiro Frontend",
    description:
      "Landing pages de alta conversão, interfaces ultra-rápidas e aplicações sob medida com estética editorial e engenharia sólida.",
    images: [
      {
        url: "/projects/jucarneiro-desktop.png",
        width: 1440,
        height: 900,
        alt: "Júlio Carneiro — Engenheiro Frontend e Desenvolvedor Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Júlio Carneiro — Desenvolvedor Web & Engenheiro Frontend",
    description:
      "Landing pages de alta conversão, interfaces rápidas e aplicações web sob medida.",
    images: ["/projects/jucarneiro-desktop.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-300 overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
