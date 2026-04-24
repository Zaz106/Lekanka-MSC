import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/Legal/', '/_next/'],
      },
    ],
    sitemap: 'https://www.lmsc.co.za/sitemap.xml',
  };
}
