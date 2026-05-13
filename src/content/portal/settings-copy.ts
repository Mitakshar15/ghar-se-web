import { SettingsContentSchema, type SettingsContent } from '../schema/portal';

/**
 * Settings page copy. The page is mostly editorial text wrapped around a
 * handful of stateful inputs. Moving this to content means swapping a
 * notification label or a payout-cadence description is a content edit,
 * not a component edit.
 *
 * Dynamic values that DON'T live here:
 *   - The maker's email address (filled in by the component from the auth
 *     store; the content provides the surrounding sentence as a template).
 *   - Switch ON/OFF state (component state).
 *   - Selected radio choice (component state).
 */
export const settings: SettingsContent = SettingsContentSchema.parse({
  title: { en: 'Settings' },
  sub: { en: 'Notifications, payouts, language, and operating preferences.' },

  notifications: {
    id: 'notifications',
    title: { en: 'Notifications' },
    sub: { en: 'What pings you and how' },
    switches: [
      {
        id: 'newOrders',
        label: { en: 'New order alerts' },
        sub: { en: "The thing you can't miss" },
      },
      {
        id: 'reviews',
        label: { en: 'Review notifications' },
        sub: { en: 'When a buyer rates you' },
      },
      {
        id: 'payouts',
        label: { en: 'Payout updates' },
        sub: { en: 'When money is sent to your bank' },
      },
      {
        id: 'festivals',
        label: { en: 'Festival reminders' },
        sub: { en: '60 days before each festival' },
      },
    ],
    backupChannelTitle: { en: 'Backup channels' },
    backupSwitches: [
      {
        id: 'sms',
        label: { en: 'SMS notifications' },
        sub: { en: 'Backup channel — works on any phone' },
      },
      {
        id: 'email',
        // Template: {email} is filled in by the component with the maker's
        // actual email address from auth state.
        label: { en: 'Email notifications' },
        sub: { en: 'Sent to {email}' },
      },
    ],
  },

  payouts: {
    id: 'payouts',
    title: { en: 'Payouts' },
    sub: { en: 'How often we transfer your earnings' },
    options: [
      {
        id: '24h',
        label: { en: 'Daily payouts' },
        sub: { en: 'Money in your bank within 24 hours (₹5 fee per payout)' },
      },
      {
        id: '48h',
        label: { en: 'Every 48 hours' },
        sub: { en: 'Standard · no fee · arrives in batches' },
      },
      {
        id: 'weekly',
        label: { en: 'Weekly · Mondays' },
        sub: { en: 'Lump-sum once a week · no fee' },
      },
    ],
  },

  language: {
    id: 'language',
    title: { en: 'Language & accessibility' },
    sub: { en: 'What you see in your portal' },
    options: [
      { id: 'en', label: { en: 'English' }, sub: { en: 'Default' } },
      { id: 'kn', label: { en: 'ಕನ್ನಡ' }, sub: { en: 'Kannada' } },
      { id: 'hi', label: { en: 'हिन्दी' }, sub: { en: 'Hindi' } },
    ],
    voiceAssistTitle: { en: 'Read-aloud assistant' },
    voiceAssistBody: {
      en: 'Tap the speaker icon anywhere in the portal to hear it in your language.',
    },
  },

  operatingHours: {
    id: 'hours',
    title: { en: 'Operating hours & holidays' },
    sub: { en: 'When buyers can place orders' },
    acceptFromLabel: { en: 'Accept from' },
    acceptTillLabel: { en: 'Accept till' },
    sundayOff: {
      id: 'sunday-off',
      label: { en: 'Sunday off' },
      sub: { en: 'Auto-block Sundays from new orders' },
    },
    festivalAutoPrep: {
      id: 'festival-auto-prep',
      label: { en: 'Festival auto-prep' },
      sub: { en: 'Open pre-orders 45 days before listed festivals' },
    },
    saveCtaLabel: { en: 'Save preferences' },
  },

  dangerZone: {
    title: { en: 'Danger zone' },
    items: [
      {
        id: 'pause',
        iconName: 'Lock',
        title: { en: 'Pause my kitchen for a while' },
        sub: {
          en: 'Hide your profile from buyers temporarily. Your menu and reviews are preserved.',
        },
      },
      {
        id: 'close',
        iconName: 'X',
        title: { en: 'Close kitchen permanently' },
        sub: { en: 'Requires final payout settlement. Speak to our team first.' },
      },
    ],
  },
});
