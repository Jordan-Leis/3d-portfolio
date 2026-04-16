export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'mastodon' | 'bluesky' | 'other'
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'generic'
}

/**
 * Social profiles shown in the Contact panel "ELSEWHERE" section and on the mobile
 * layout contact section. Minimum 2 entries per CONT-03 (GitHub + LinkedIn baseline).
 * All URLs must be real, public, absolute https:// URLs.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/jordaniscool',
    icon: 'github',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jordan-leis/',
    icon: 'linkedin',
  },
]
