import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.lmsc.co.za/',
      lastModified: new Date('2026-04-24'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.lmsc.co.za/Contact-Us/',
      lastModified: new Date('2026-04-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
