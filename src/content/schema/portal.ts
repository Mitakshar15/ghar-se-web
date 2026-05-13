import { z } from 'zod';
import { LocalizedStringSchema } from '../primitives/locale';

/**
 * Schemas for maker-portal copy: FAQs, Help page chrome, Settings labels.
 *
 * Operational data (the maker's actual orders, payouts, ratings) lives in
 * the API — schemas in src/types/domain.ts. This file is editorial copy:
 * questions, answers, button labels, switch descriptions.
 */

/* -----------------------------------------------------------------------
 * FAQs (used on the Help page)
 * -------------------------------------------------------------------- */

export const FaqEntrySchema = z.object({
  id: z.string(),
  q: LocalizedStringSchema,
  a: LocalizedStringSchema,
});
export type FaqEntry = z.infer<typeof FaqEntrySchema>;

/* -----------------------------------------------------------------------
 * Help page
 * -------------------------------------------------------------------- */

export const HelpContactSchema = z.object({
  id: z.string(),
  iconName: z.string(),
  label: LocalizedStringSchema,
  value: LocalizedStringSchema,
  detail: LocalizedStringSchema,
  tone: z.enum(['green', 'saffron', 'brass']),
});

export const HelpContentSchema = z.object({
  title: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  primaryCtaLabel: LocalizedStringSchema,
  contacts: z.array(HelpContactSchema).min(1),
  faq: z.object({
    title: LocalizedStringSchema,
    subTemplate: LocalizedStringSchema, // "{count} answers · most makers find what they need here"
    entries: z.array(FaqEntrySchema).min(1),
  }),
  stillNeedHelp: z.object({
    emoji: z.string(),
    title: LocalizedStringSchema,
    sub: LocalizedStringSchema,
    primaryCtaLabel: LocalizedStringSchema,
    secondaryCtaLabel: LocalizedStringSchema,
  }),
});
export type HelpContent = z.infer<typeof HelpContentSchema>;

/* -----------------------------------------------------------------------
 * Settings page
 * -------------------------------------------------------------------- */

export const SettingsSwitchSchema = z.object({
  id: z.string(),
  label: LocalizedStringSchema,
  sub: LocalizedStringSchema,
});

export const SettingsOptionSchema = z.object({
  id: z.string(),
  label: LocalizedStringSchema,
  sub: LocalizedStringSchema,
});

export const SettingsCardSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  sub: LocalizedStringSchema.optional(),
});

export const SettingsContentSchema = z.object({
  title: LocalizedStringSchema,
  sub: LocalizedStringSchema,
  notifications: SettingsCardSchema.extend({
    switches: z.array(SettingsSwitchSchema).min(1),
    backupChannelTitle: LocalizedStringSchema, // Divider label above SMS/email switches
    backupSwitches: z.array(SettingsSwitchSchema).min(1),
  }),
  payouts: SettingsCardSchema.extend({
    options: z.array(SettingsOptionSchema).min(2),
  }),
  language: SettingsCardSchema.extend({
    options: z.array(SettingsOptionSchema).min(1),
    voiceAssistTitle: LocalizedStringSchema,
    voiceAssistBody: LocalizedStringSchema,
  }),
  operatingHours: SettingsCardSchema.extend({
    acceptFromLabel: LocalizedStringSchema,
    acceptTillLabel: LocalizedStringSchema,
    sundayOff: SettingsSwitchSchema,
    festivalAutoPrep: SettingsSwitchSchema,
    saveCtaLabel: LocalizedStringSchema,
  }),
  dangerZone: z.object({
    title: LocalizedStringSchema,
    items: z
      .array(
        z.object({
          id: z.string(),
          iconName: z.string(),
          title: LocalizedStringSchema,
          sub: LocalizedStringSchema,
        }),
      )
      .min(1),
  }),
});
export type SettingsContent = z.infer<typeof SettingsContentSchema>;

/* -----------------------------------------------------------------------
 * Reusable trust pillars (could be referenced by onboarding or other surfaces)
 * -------------------------------------------------------------------- */

export const TrustPillarSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  body: LocalizedStringSchema,
  iconName: z.string(),
});

export const TrustContentSchema = z.object({
  pillars: z.array(TrustPillarSchema).min(1),
});
export type TrustContent = z.infer<typeof TrustContentSchema>;
