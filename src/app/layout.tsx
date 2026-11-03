import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientProviders from '@/components/providers/ClientProviders';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl = 'https://juliocarneiro.dev';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Julio Carneiro — Full Stack Developer | Python, Web & Automações',
    template: '%s | Julio Carneiro',
  },
  description:
    'Portfólio profissional de Julio Carneiro. Desenvolvedor Full Stack especializado em Python Backend, APIs RESTful, Sistemas Personalizados, Banco de Dados SQL e Automações Empresariais com demonstrações interativas.',
  keywords: [
    'Julio Carneiro',
    'Full Stack Developer',
    'Desenvolvedor Full Stack',
    'Python Backend',
    'FastAPI',
    'Bancos de Dados SQL',
    'MySQL',
    'Automações Empresariais',
    'WhatsApp API',
    'Next.js',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'Julio Carneiro', url: baseUrl }],
  creator: 'Julio Carneiro',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/?lang=en',
    },
  },
  openGraph: {
    title: 'Julio Carneiro — Full Stack Developer',
    description:
      'Construindo soluções digitais que conectam ideias e tecnologia. Aplicações web, sistemas personalizados e automações.',
    url: baseUrl,
    siteName: 'Julio Carneiro Portfolio',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/projects/barberhost-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Julio Carneiro — Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julio Carneiro — Full Stack Developer',
    description:
      'Desenvolvedor Full Stack especializado em Python Backend, APIs RESTful, Sistemas Web e Automações.',
    images: ['/images/projects/barberhost-cover.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Julio Carneiro',
  jobTitle: 'Full Stack Developer',
  url: baseUrl,
  sameAs: [
    'https://github.com/julioccr160908-jpg',
    'https://www.linkedin.com/in/julio-carneiro-dev/',
  ],
  knowsAbout: [
    'Web Development',
    'Python',
    'FastAPI',
    'SQL',
    'MySQL',
    'REST APIs',
    'Process Automation',
    'Next.js',
    'React',
    'TypeScript',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090B] text-[#FAFAFA]">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
