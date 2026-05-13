import { DownloadCTAContentSchema, type DownloadCTAContent } from '../schema/landing';

export const downloadCTA: DownloadCTAContent = DownloadCTAContentSchema.parse({
  headlinePrefix: { en: 'The kitchen is open.\n' },
  headlineItalic: { en: 'Come hungry.' },
  sub: { en: 'Free to download. No subscription. Fresh from a real maker, every order.' },
  appStoreLabel: { en: 'App Store' },
  playStoreLabel: { en: 'Google Play' },
});
