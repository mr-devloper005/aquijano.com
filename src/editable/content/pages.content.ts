import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Find local businesses and browse standout photo galleries',
      description: 'A friendly directory of local businesses and freelancers, plus a growing gallery of images worth a second look.',
      openGraphTitle: 'Find local businesses and browse standout photo galleries',
      openGraphDescription: 'Browse business listings and image galleries in one welcoming, easy-to-search place.',
      keywords: ['business directory', 'local listings', 'photo gallery', 'freelancer directory'],
    },
    hero: {
      badge: 'Fresh listings and photos',
      title: ['Discover the best of', 'your local businesses and freelancers.'],
      description: 'Browse trusted listings, compare details, and explore a gallery of standout images — all in one warm, easy-to-use directory.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'Explore the gallery', href: '/image' },
      searchPlaceholder: 'Search businesses, categories, and more',
      focusLabel: 'Focus',
      featureCardBadge: 'fresh this week',
      featureCardTitle: 'New listings and photos shape what you see first.',
      featureCardDescription: 'The homepage stays current automatically as new businesses and images are added.',
    },
    intro: {
      badge: 'About this directory',
      title: 'Built to help people find and be found.',
      paragraphs: [
        'This site brings together local business listings and a visual gallery so visitors can browse, compare, and discover in one welcoming place.',
        'Instead of scattering businesses and images across disconnected pages, everything stays connected with consistent navigation and easy searching.',
        'Whether someone starts with a listing or a photo, they can keep exploring related finds without losing their place.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'A directory-first homepage built around real listings and photos.',
        'Connected sections for business listings and a visual gallery.',
        'A friendly browsing rhythm designed to make discovery easier.',
        'Quick search and filtering that keeps things fast and clear.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listing' },
      secondaryLink: { label: 'See the gallery', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Browse listings and photos through one friendly, connected directory.',
      description: 'Move between business listings and gallery images through one clear, welcoming experience.',
      primaryCta: { label: 'Browse Listings', href: '/listing' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A friendly directory built for local discovery.',
    description: `${slot4BrandConfig.siteName} is built to make finding great local businesses and browsing standout photos feel like one simple, welcoming experience.`,
    paragraphs: [
      'We keep things simple: real listings, clear categories, and a gallery worth scrolling through, all in one place.',
      'Whether someone is looking for a business to hire or just browsing photos for inspiration, they can explore without friction.',
    ],
    values: [
      {
        title: 'Easy to browse',
        description: 'We prioritize clarity and pacing so people can search, compare, and discover without noise or clutter.',
      },
      {
        title: 'Built for local connection',
        description: 'Listings and galleries stay connected so discovery feels natural, whichever way someone starts exploring.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and clear listing details to help visitors find what they need faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: "Have a question, or want to get listed? We'd love to hear from you.",
    description: 'Tell us what you are trying to do — get your business listed, share photos, or ask a question — and we will point you to the right next step.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search listings, categories, and photos across the site.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find businesses, categories, and photos faster.',
      description: 'Use keywords and categories to discover listings and gallery images from every active section of the site.',
      placeholder: 'Search by keyword, category, or business name',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
