import { FooterContentSchema, type FooterContent } from '../schema/landing';

/**
 * Footer columns and legal links. Edit when an FSSAI number changes, or when
 * we add/remove a content category.
 */
export const footer: FooterContent = FooterContentSchema.parse({
  tagline: { en: 'घर से, घर तक' },
  description: {
    en: 'Hyperlocal pre-order marketplace for home-made festival foods. Live in Sirsi, Karnataka. Built with care.',
  },
  columns: [
    {
      heading: { en: 'Product' },
      links: [
        { label: { en: 'How it works' }, href: '#how' },
        { label: { en: 'Makers' }, href: '#makers' },
        { label: { en: 'Cities' }, href: '#cities' },
      ],
    },
    {
      heading: { en: 'Makers' },
      links: [
        { label: { en: 'For home cooks' }, href: '#for-makers' },
        { label: { en: 'FSSAI support' }, href: '#for-makers' },
        { label: { en: 'Earnings calculator' }, href: '#for-makers' },
      ],
    },
    {
      heading: { en: 'Company' },
      links: [
        { label: { en: 'Our story' }, href: '#story' },
        { label: { en: 'Press' }, href: '#story' },
        { label: { en: 'Careers' }, href: '#story' },
      ],
    },
  ],
  legalLinks: [
    { label: { en: 'Privacy' }, href: '#' },
    { label: { en: 'Terms' }, href: '#' },
    { label: { en: 'Refund policy' }, href: '#' },
    { label: { en: 'FSSAI: 12345600002345' }, href: '#' },
  ],
  copyright: { en: '© 2026 Ghar Se · Made in Sirsi, Karnataka' },
});
