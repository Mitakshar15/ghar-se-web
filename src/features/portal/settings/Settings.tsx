import { useState } from 'react';
import { Globe, Volume2 } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/feedback/Toast';
import { useAuth } from '@/lib/auth/store';

export function Settings() {
  const { maker } = useAuth();
  const { push } = useToast();
  const [notif, setNotif] = useState({
    newOrders: true,
    reviews: true,
    payouts: true,
    festivals: true,
    sms: true,
    email: false,
  });
  const [lang, setLang] = useState<'en' | 'kn' | 'hi'>('en');
  const [payoutFreq, setPayoutFreq] = useState('48h');

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader title="Settings" sub="Notifications, payouts, language, and operating preferences." />
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader title="Notifications" sub="What pings you and how" />
            {(
              [
                ['newOrders', 'New order alerts', "The thing you can't miss"],
                ['reviews', 'Review notifications', 'When a buyer rates you'],
                ['payouts', 'Payout updates', 'When money is sent to your bank'],
                ['festivals', 'Festival reminders', '60 days before each festival'],
              ] as const
            ).map(([k, label, sub]) => (
              <Switch
                key={k}
                label={label}
                sub={sub}
                value={notif[k]}
                onToggle={() => setNotif((n) => ({ ...n, [k]: !n[k] }))}
              />
            ))}
            <div className="mt-4 border-t border-line pt-4">
              <Switch
                label="SMS notifications"
                sub="Backup channel — works on any phone"
                value={notif.sms}
                onToggle={() => setNotif((n) => ({ ...n, sms: !n.sms }))}
              />
              <Switch
                label="Email notifications"
                sub={`Sent to ${maker?.email ?? '—'}`}
                value={notif.email}
                onToggle={() => setNotif((n) => ({ ...n, email: !n.email }))}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Payouts" sub="How often we transfer your earnings" />
            <div className="space-y-2">
              {[
                { id: '24h', label: 'Daily payouts', sub: 'Money in your bank within 24 hours (₹5 fee per payout)' },
                { id: '48h', label: 'Every 48 hours', sub: 'Standard · no fee · arrives in batches' },
                { id: 'weekly', label: 'Weekly · Mondays', sub: 'Lump-sum once a week · no fee' },
              ].map((o) => (
                <button
                  key={o.id}
                  onClick={() => setPayoutFreq(o.id)}
                  className="press flex w-full items-start gap-3 rounded-xl p-3 text-left"
                  style={{
                    background: payoutFreq === o.id ? '#F4F9F7' : '#FAFAF9',
                    border: payoutFreq === o.id ? '2px solid #0B5D4D' : '2px solid transparent',
                  }}
                >
                  <div
                    className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full border-2"
                    style={{ borderColor: payoutFreq === o.id ? '#0B5D4D' : '#D4D4D4' }}
                  >
                    {payoutFreq === o.id && <div className="size-2.5 rounded-full bg-green" />}
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold text-ink">{o.label}</div>
                    <div className="text-[11px] text-ink-2">{o.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Language & accessibility" sub="What you see in your portal" />
            <div className="mb-4 space-y-2">
              {[
                { id: 'en' as const, label: 'English', sub: 'Default' },
                { id: 'kn' as const, label: 'ಕನ್ನಡ', sub: 'Kannada' },
                { id: 'hi' as const, label: 'हिन्दी', sub: 'Hindi' },
              ].map((o) => (
                <button
                  key={o.id}
                  onClick={() => setLang(o.id)}
                  className="press flex w-full items-center gap-3 rounded-xl p-3 text-left"
                  style={{
                    background: lang === o.id ? '#F4F9F7' : '#FAFAF9',
                    border: lang === o.id ? '2px solid #0B5D4D' : '2px solid transparent',
                  }}
                >
                  <Globe
                    className="size-4 flex-shrink-0"
                    style={{ color: lang === o.id ? '#0B5D4D' : '#525252' }}
                    strokeWidth={2.4}
                  />
                  <div className="flex-1">
                    <div className="text-[14px] font-extrabold text-ink">{o.label}</div>
                    <div className="text-[11px] text-ink-2">{o.sub}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-brass-light p-3">
              <Volume2 className="mt-0.5 size-4 flex-shrink-0 text-brass-dark" strokeWidth={2.4} />
              <div className="text-[11px] text-ink">
                <div className="mb-0.5 font-extrabold">Read-aloud assistant</div>
                <div className="text-ink-2">Tap the speaker icon anywhere in the portal to hear it in your language.</div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Operating hours & holidays" sub="When buyers can place orders" />
            <div className="mb-4 grid grid-cols-2 gap-2">
              <Field label="Accept from">
                <input
                  type="time"
                  defaultValue="07:00"
                  className="w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-semibold text-ink outline-none"
                />
              </Field>
              <Field label="Accept till">
                <input
                  type="time"
                  defaultValue="20:00"
                  className="w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[14px] font-semibold text-ink outline-none"
                />
              </Field>
            </div>
            <Switch label="Sunday off" sub="Auto-block Sundays from new orders" value onToggle={() => {}} />
            <Switch
              label="Festival auto-prep"
              sub="Open pre-orders 45 days before listed festivals"
              value
              onToggle={() => {}}
            />
            <Button variant="primary" size="md" fullWidth className="mt-4" onClick={() => push('Settings saved')}>
              Save preferences
            </Button>
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
