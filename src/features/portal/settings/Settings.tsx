import { useMemo, useState } from 'react';
import { Globe, Volume2, Lock, X, type LucideIcon } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/feedback/Toast';
import { useAuth } from '@/lib/auth/store';
import { settings } from '@/content/portal/settings-copy';
import { localized } from '@/content';

// Local icon registry for the danger-zone actions. Add new icons here only
// when settings.dangerZone references them.
const DANGER_ICONS: Record<string, LucideIcon> = { Lock, X };

export function Settings() {
  const { maker } = useAuth();
  const { push } = useToast();

  // Component state is keyed off the content entry ids — that way reordering
  // or adding new switches in content doesn't require touching state shape.
  const [switches, setSwitches] = useState<Record<string, boolean>>(() => ({
    newOrders: true,
    reviews: true,
    payouts: true,
    festivals: true,
    sms: true,
    email: false,
    'sunday-off': true,
    'festival-auto-prep': true,
  }));
  const [lang, setLang] = useState<'en' | 'kn' | 'hi'>('en');
  const [payoutFreq, setPayoutFreq] = useState('48h');

  const toggle = (id: string) => setSwitches((s) => ({ ...s, [id]: !s[id] }));

  // Template substitution for the email-channel sub-label.
  const backupSwitches = useMemo(
    () =>
      settings.notifications.backupSwitches.map((s) => ({
        ...s,
        // The {email} placeholder lives in content; fill in from the auth store.
        sub: { en: localized(s.sub).replace('{email}', maker?.email ?? '—') },
      })),
    [maker?.email],
  );

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader title={localized(settings.title)} sub={localized(settings.sub)} />
        <div className="grid gap-5 md:grid-cols-2">
          {/* Notifications */}
          <Card>
            <CardHeader
              title={localized(settings.notifications.title)}
              sub={settings.notifications.sub ? localized(settings.notifications.sub) : undefined}
            />
            {settings.notifications.switches.map((s) => (
              <Switch
                key={s.id}
                label={localized(s.label)}
                sub={localized(s.sub)}
                value={!!switches[s.id]}
                onToggle={() => toggle(s.id)}
              />
            ))}
            <div className="mt-4 border-t border-line pt-4">
              {backupSwitches.map((s) => (
                <Switch
                  key={s.id}
                  label={localized(s.label)}
                  sub={localized(s.sub)}
                  value={!!switches[s.id]}
                  onToggle={() => toggle(s.id)}
                />
              ))}
            </div>
          </Card>

          {/* Payouts */}
          <Card>
            <CardHeader
              title={localized(settings.payouts.title)}
              sub={settings.payouts.sub ? localized(settings.payouts.sub) : undefined}
            />
            <div className="space-y-2">
              {settings.payouts.options.map((o) => {
                const active = payoutFreq === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setPayoutFreq(o.id)}
                    className="press flex w-full items-start gap-3 rounded-xl p-3 text-left"
                    style={{
                      background: active ? '#F4F9F7' : '#FAFAF9',
                      border: active ? '2px solid #0B5D4D' : '2px solid transparent',
                    }}
                  >
                    <div
                      className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full border-2"
                      style={{ borderColor: active ? '#0B5D4D' : '#D4D4D4' }}
                    >
                      {active && <div className="size-2.5 rounded-full bg-green" />}
                    </div>
                    <div>
                      <div className="text-[13px] font-extrabold text-ink">{localized(o.label)}</div>
                      <div className="text-[11px] text-ink-2">{localized(o.sub)}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Language */}
          <Card>
            <CardHeader
              title={localized(settings.language.title)}
              sub={settings.language.sub ? localized(settings.language.sub) : undefined}
            />
            <div className="mb-4 space-y-2">
              {settings.language.options.map((o) => {
                const active = lang === (o.id as 'en' | 'kn' | 'hi');
                return (
                  <button
                    key={o.id}
                    onClick={() => setLang(o.id as 'en' | 'kn' | 'hi')}
                    className="press flex w-full items-center gap-3 rounded-xl p-3 text-left"
                    style={{
                      background: active ? '#F4F9F7' : '#FAFAF9',
                      border: active ? '2px solid #0B5D4D' : '2px solid transparent',
                    }}
                  >
                    <Globe
                      className="size-4 flex-shrink-0"
                      style={{ color: active ? '#0B5D4D' : '#525252' }}
                      strokeWidth={2.4}
                    />
                    <div className="flex-1">
                      <div className="text-[14px] font-extrabold text-ink">{localized(o.label)}</div>
                      <div className="text-[11px] text-ink-2">{localized(o.sub)}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-brass-light p-3">
              <Volume2 className="mt-0.5 size-4 flex-shrink-0 text-brass-dark" strokeWidth={2.4} />
              <div className="text-[11px] text-ink">
                <div className="mb-0.5 font-extrabold">{localized(settings.language.voiceAssistTitle)}</div>
                <div className="text-ink-2">{localized(settings.language.voiceAssistBody)}</div>
              </div>
            </div>
          </Card>

          {/* Operating hours */}
          <Card>
            <CardHeader
              title={localized(settings.operatingHours.title)}
              sub={settings.operatingHours.sub ? localized(settings.operatingHours.sub) : undefined}
            />
            <div className="mb-4 grid grid-cols-2 gap-2">
              <Field label={localized(settings.operatingHours.acceptFromLabel)}>
                <input
                  type="time"
                  defaultValue="07:00"
                  className="w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-semibold text-ink outline-none"
                />
              </Field>
              <Field label={localized(settings.operatingHours.acceptTillLabel)}>
                <input
                  type="time"
                  defaultValue="20:00"
                  className="w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-semibold text-ink outline-none"
                />
              </Field>
            </div>
            <Switch
              label={localized(settings.operatingHours.sundayOff.label)}
              sub={localized(settings.operatingHours.sundayOff.sub)}
              value={!!switches[settings.operatingHours.sundayOff.id]}
              onToggle={() => toggle(settings.operatingHours.sundayOff.id)}
            />
            <Switch
              label={localized(settings.operatingHours.festivalAutoPrep.label)}
              sub={localized(settings.operatingHours.festivalAutoPrep.sub)}
              value={!!switches[settings.operatingHours.festivalAutoPrep.id]}
              onToggle={() => toggle(settings.operatingHours.festivalAutoPrep.id)}
            />
            <Button
              variant="primary"
              size="md"
              fullWidth
              className="mt-4"
              onClick={() => push('Settings saved')}
            >
              {localized(settings.operatingHours.saveCtaLabel)}
            </Button>
          </Card>

          {/* Danger zone */}
          <Card className="md:col-span-2">
            <CardHeader title={localized(settings.dangerZone.title)} />
            <div className="space-y-3">
              {settings.dangerZone.items.map((item) => {
                const Icon = DANGER_ICONS[item.iconName] ?? Lock;
                return (
                  <button
                    key={item.id}
                    className="press flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left"
                    style={{ borderColor: '#FEE2E2', background: '#FEF2F2' }}
                  >
                    <Icon className="size-5" style={{ color: '#C53030' }} strokeWidth={2.4} />
                    <div className="flex-1">
                      <div className="text-[13px] font-extrabold" style={{ color: '#C53030' }}>
                        {localized(item.title)}
                      </div>
                      <div className="text-[11px] text-ink-2">{localized(item.sub)}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

function Switch({
  label,
  sub,
  value,
  onToggle,
}: {
  label: string;
  sub?: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="press flex w-full items-center gap-3 border-b border-line py-3 text-left last:border-b-0"
    >
      <div className="flex-1">
        <div className="text-[13px] font-extrabold text-ink">{label}</div>
        {sub && <div className="text-[11px] text-ink-2">{sub}</div>}
      </div>
      <div
        className="relative h-6 w-11 rounded-full transition-colors"
        style={{ background: value ? '#0B5D4D' : '#D4D4D4' }}
      >
        <div
          className="absolute top-0.5 size-5 rounded-full bg-white shadow transition-all"
          style={{ left: value ? '22px' : '2px' }}
        />
      </div>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">{label}</label>
      {children}
    </div>
  );
}
