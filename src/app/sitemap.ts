import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/register`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}