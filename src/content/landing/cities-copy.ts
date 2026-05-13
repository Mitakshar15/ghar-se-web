import { CitiesCopySchema, type CitiesCopy } from '../schema/landing';

/**
 * Cities section — narrative copy ONLY.
 *
 * The actual list of live cities (Sirsi) and coming-soon cities (Kumta,
 * Honnavar, etc.) is operational data and should come from the API. For now
 * the lists stay in the component; they'll move to an /api/v1/public/cities
 * endpoint when the backend ships.
 */
export const citiesCopy: CitiesCopy = CitiesCopySchema.parse({
  eyebrow: { en: 'Cities' },
  headline: { en: 'Starting hyperlocal.\nScaling along Uttara Kannada.' },
  liveSectionLabel: { en: 'Live' },
  comingSoonLabel: { en: 'Coming soon' },
});
