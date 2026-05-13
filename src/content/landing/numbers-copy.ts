import { NumbersCopySchema, type NumbersCopy } from '../schema/landing';

/**
 * Numbers section — copy (labels + Kannada subtitles + section header).
 *
 * IMPORTANT: the numeric VALUES (47 makers, 4,800+ households, ₹18L paid,
 * 4.9 rating) are operational data and should come from the API, not from
 * content. For now they're hardcoded in the component; when the backend
 * exposes /api/v1/public/stats they'll move there.
 *
 * What lives in content: the labels under each number, the sub-line, and the
 * ornamental Kannada subtitle that travels with each card.
 */
export const numbersCopy: NumbersCopy = NumbersCopySchema.parse({
  eyebrow: { en: 'By the numbers' },
  headlinePrefix: { en: 'Sirsi, in ' },
  headlineItalic: { en: 'numbers' },
  kannadaSubtitle: 'ಸಿರ್ಸಿ, ಸಂಖ್ಯೆಗಳಲ್ಲಿ',
  cards: [
    {
      id: 'makers',
      label: { en: 'Home cooks' },
      sub: { en: 'Verified · KYC complete' },
      kannada: 'ಮನೆಯ ಬಾಣಸಿಗರು',
    },
    {
      id: 'households',
      label: { en: 'Households' },
      sub: { en: 'Active monthly buyers' },
      kannada: 'ಕುಟುಂಬಗಳು',
    },
    {
      id: 'paid',
      label: { en: 'Paid to makers' },
      sub: { en: 'Direct to bank · last 12 months' },
      kannada: 'ವೇತನ',
    },
    {
      id: 'rating',
      label: { en: 'Average rating' },
      sub: { en: 'Across 2,400+ reviews' },
      kannada: 'ಸರಾಸರಿ',
    },
  ],
});
