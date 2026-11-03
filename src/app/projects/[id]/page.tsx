import { notFound } from 'next/navigation';
import { getProjectById, projects } from '@/data/projects';
import ProjectCaseStudy from '@/components/project/ProjectCaseStudy';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    };
  }

  const title = `${project.title.pt} — Estudo de Caso`;
  const description = project.description.pt;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.id}`,
      languages: {
        'pt-BR': `/projects/${project.id}`,
        'en-US': `/projects/${project.id}?lang=en`,
      },
    },
    openGraph: {
      title: `${title} | Julio Carneiro`,
      description,
      type: 'article',
      url: `https://juliocarneiro.dev/projects/${project.id}`,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title.pt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Julio Carneiro`,
      description,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const jsonLdProject = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title.pt,
    description: project.description.pt,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    author: {
      '@type': 'Person',
      name: 'Julio Carneiro',
    },
    keywords: project.technologies.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />
      <Header />
      <main>
        <ProjectCaseStudy project={project} />
      </main>
      <Footer />
    </>
  );
}
