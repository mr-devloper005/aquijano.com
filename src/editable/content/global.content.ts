import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'A friendly local directory',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'A friendly local directory',
    primaryLinks: [
      { label: 'Listings', href: '/listings' },
      { label: 'Gallery', href: '/image-sharing' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Get Listed', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Local listings and a gallery worth browsing',
    description: 'A warm, connected directory for business listings and standout photo galleries — built to help people find and be found.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Listings', href: '/listings' },
          { label: 'Gallery', href: '/image-sharing' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for easy discovery and friendly local connection.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
