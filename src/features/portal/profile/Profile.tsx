import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, Phone, Mail, MapPin, Shield, BadgeCheck, Award, Plus } from 'lucide-react';

import { PortalShell } from '@/components/layout/PortalShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { Skeleton } from '@/components/ui/Skeleton';
import { fetchMe } from '@/features/auth/api';
import { qk } from '@/lib/api/queryClient';

const TAGS = [
  'Havyaka sweets',
  'Festival foods',
  'Pickles',
  'Karanji specialist',
  'Pure veg',
  'Hygiene A+',
  'Bilona ghee user',
  'Stone-ground masalas',
];

export function Profile() {
  const { data: m, isLoading } = useQuery({ queryKey: qk.profile, queryFn: fetchMe });

  if (isLoading || !m) return <PortalShell><Skeleton className="h-64" /></PortalShell>;

  return (
    <PortalShell>
      <div className="space-y-5">
        <CardHeader
          title="Kitchen profile"
          sub="What buyers see when they tap your kitchen card"
          action={
            <Button variant="outline" size="md" leftIcon={<ArrowUpRight className="size-3.5" strokeWidth={2.5} />}>
              View public page
            </Button>
          }
        />

        <Card padding="none" className="overflow-hidden">
          <div className="relative flex aspect-[16/5] items-center justify-center" style={{ background: m.photoBg }}>
            <span className="text-[160px] opacity-90">{m.photo}</span>
          </div>
          <div className="flex flex-wrap items-start gap-4 p-6">
            <div
              className="flex size-20 flex-shrink-0 -translate-y-12 items-center justify-center rounded-2xl border-4 border-canvas bg-green text-[28px] font-extrabold text-white shadow-md"
            >
              {m.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h2 className="font-display text-[26px] leading-none font-black tracking-tight text-ink">
                  {m.name}
                </h2>
                {m.verified && <BadgeCheck className="size-5 text-green" fill="#0B5D4D" strokeWidth={0} />}
                <Pill tone="brass">Hygiene grade {m.hygieneGrade}</Pill>
              </div>
              <p className="text-[13px] text-ink-2">{m.speciality}</p>
              <p className="mt-1 text-[11px] text-ink-2">
                {m.location} · {m.yearsActive} years cooking · joined {m.joined}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader title="Contact" />
            <div className="space-y-3">
              {[
                { Icon: Phone, label: 'Phone', value: m.phone },
                { Icon: Mail, label: 'Email', value: m.email },
                { Icon: MapPin, label: 'Kitchen address', value: m.address },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 border-b border-line py-2 text-[13px] last:border-b-0"
                >
                  <Icon className="mt-0.5 size-4 flex-shrink-0 text-green" strokeWidth={2.4} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">{label}</div>
                    <div className="text-[13px] font-bold text-ink">{value}</div>
                  </div>
                  <button className="press text-[11px] font-extrabold text-saffron">Edit</button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Verification" />
            <div className="space-y-3">
              <Row
                icon={<Shield className="size-4 text-green" strokeWidth={2.4} />}
                title="FSSAI registered"
                sub={`${m.fssai} · valid till ${m.fssaiExpiry}`}
                pillTone="green"
                pillText="Verified"
              />
              <Row
                icon={<BadgeCheck className="size-4 text-green" strokeWidth={2.4} />}
                title="KYC complete"
                sub="Aadhaar + PAN linked"
                pillTone="green"
                pillText="Verified"
              />
              <Row
                icon={<Award className="size-4 text-brass-dark" strokeWidth={2.4} />}
                title="Hygiene inspection"
                sub={`Last visit · 12 Apr 2026 · grade ${m.hygieneGrade}`}
                action="Schedule"
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Bank account" />
            <div className="rounded-xl bg-canvas-2 p-4">
              <div className="text-[10px] font-extrabold tracking-wider text-ink-2 uppercase">{m.bank.name}</div>
              <div className="font-display mt-1 text-[20px] font-black tracking-widest text-ink">
                {m.bank.accountMasked}
              </div>
              <div className="mt-1 text-[11px] text-ink-2">
                IFSC {m.bank.ifsc} · UPI {m.bank.upi}
              </div>
            </div>
            <Button variant="outline" size="md" fullWidth className="mt-3">
              Update bank details
            </Button>
          </Card>

          <Card>
            <CardHeader title="Specialty tags" sub="Help buyers find you" />
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-green-light bg-green-lighter px-3 py-1.5 text-[11px] font-semibold text-green"
                >
                  {t}
                </span>
              ))}
              <button className="press flex items-center gap-1 rounded-full border border-dashed border-line bg-canvas px-3 py-1.5 text-[11px] font-semibold text-ink">
                <Plus className="size-3" strokeWidth={2.5} /> Add tag
              </button>
            </div>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

function Row({
  icon,
  title,
  sub,
  pillTone,
  pillText,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  pillTone?: 'green' | 'brass' | 'saffron' | 'neutral';
  pillText?: string;
  action?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-green-lighter">{icon}</div>
      <div className="flex-1">
        <div className="text-[13px] font-extrabold text-ink">{title}</div>
        <div className="text-[11px] text-ink-2">{sub}</div>
      </div>
      {pillText && <Pill tone={pillTone}>{pillText}</Pill>}
      {action && <button className="press text-[11px] font-extrabold text-saffron">{action}</button>}
    </div>
  );
}
