import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wallet, Lock, Shield, TrendingUp, ChefHat } from 'lucide-react';

import { ROUTES } from '@/config/routes';

const BENEFITS = [
  { Icon: Wallet, title: 'Earn ₹15K – ₹50K / month', body: 'Average maker earnings in year one.' },
  { Icon: Lock, title: 'Direct bank payouts', body: 'Money in your account every 24-48 hours after delivery.' },
  { Icon: Shield, title: 'We handle FSSAI', body: 'Free registration. Hygiene grading included.' },
  { Icon: TrendingUp, title: 'Festival demand surges', body: 'Pre-orders 60 days out so you can plan and prep calmly.' },
];

export function ForMakers() {
  const navigate = useNavigate();
  return (
    <section id="for-makers" className="relative overflow-hidden py-20 md:py-32" style={{ background: '#171717' }}>
      <div className="dot-brass-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-page px-5 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ background: 'rgba(200,160,77,0.15)', border: '1px solid rgba(200,160,77,0.25)' }}>
              <ChefHat className="size-3.5 text-brass" strokeWidth={2.5} />
              <span className="text-[11px] font-extrabold tracking-[0.18em] text-brass uppercase">For home cooks</span>
            </div>
            <h2 className="font-display text-[52px] leading-[1] font-black tracking-tight text-white md:text-[72px]">
              Earn from your <br />
              <span className="font-serif-italic text-brass">kitchen</span>.
            </h2>
            <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed text-white/70">
              The marketplace built for home cooks. Verified buyers, escrow payments, festival pre-orders, free
              FSSAI registration. Keep cooking — we handle the rest.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {BENEFITS.map(({ Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(200,160,77,0.15)' }}>
                    <Icon className="size-5 text-brass" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="text-[14px] font-extrabold text-white">{title}</div>
                    <div className="text-[12px] leading-relaxed text-white/60">{body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button className="press inline-flex items-center justify-center gap-2 rounded-full bg-brass px-6 py-4 text-[14px] font-extrabold text-ink">
                Apply to be a maker
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => navigate(ROUTES.login)}
                className="press inline-flex items-center justify-center gap-2 rounded-full border-2 px-6 py-4 text-[14px] font-bold text-white"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                Sign in to your kitchen
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-4 text-[11px] text-white/40">
              Free to join · ₹500 refundable security deposit · 8% commission · No subscription
            </p>
          </div>

          {/* Right column: stylised "dashboard" card */}
          <div className="md:col-span-5">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-[10px] font-extrabold tracking-[0.18em] text-brass uppercase">This month</div>
              <div className="font-display mt-2 text-[42px] leading-none font-black tracking-tight text-white">
                ₹42,380
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[12px] text-white/70">
                <TrendingUp className="size-3.5 text-brass" strokeWidth={2.5} />
                <span className="font-extrabold text-brass">+18%</span> vs last month
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { k: 'Orders', v: 47 },
                  { k: 'Rating', v: '4.9' },
                  { k: 'Repeat', v: 28 },
                ].map((c) => (
                  <div key={c.k} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                    <div className="text-[20px] font-extrabold text-white">{c.v}</div>
                    <div className="text-[9px] font-bold tracking-wider text-white/50 uppercase">{c.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
