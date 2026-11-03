import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://juliocarneiro.dev';

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: new Date('2026-11-02'),
    changeFrequency: 'monthly',
    priority: p.featured ? 0.9 : 0.7,
    alternates: {
      languages: {
        pt: `${baseUrl}/projects/${p.id}`,
        en: `${baseUrl}/projects/${p.id}?lang=en`,
      },
    },
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-11-02'),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          pt: baseUrl,
          en: `${baseUrl}?lang=en`,
        },
      },
    },
    ...projectEntries,
  ];
}

