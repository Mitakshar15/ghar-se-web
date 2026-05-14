import {
  Bell,
  Search,
  Home as HomeIcon,
  ShoppingBag,
  Package,
  User,
  Shield,
  BadgeCheck,
  Star,
  Clock,
} from 'lucide-react';

import { pickActive, localized } from '@/content';
import { festivalCampaigns } from '@/content/landing/festival-campaigns';

/**
 * MiniHomeScreen — a scaled-down preview of the buyer app's home tab, rendered
 * inside the PhoneMockup on the marketing landing page. Pure visual
 * decoration; nothing here is interactive.
 *
 * The festival banner pulls from `festivalCampaigns` so the in-phone preview
 * matches whichever campaign is live on the landing's FestivalCTA. If no
 * campaign is active, a soft generic banner shows instead.
 *
 * Everything else (categories, suraksha pill, maker card, bottom nav) is
 * static demo content — these are illustrative, not real data.
 */
export function MiniHomeScreen() {
  const activeFestival = pickActive(festivalCampaigns);

  return (
    <div className="relative h-full overflow-hidden">
      {/* Status bar */}
      <div className="relative z-40 flex items-center justify-between px-5 pt-2 pb-1 text-[8px] font-bold text-white">
        <span>9:41</span>
        <span>•••</span>
      </div>

      {/* Green header — search + maker greeting */}
      <div className="relative" style={{ background: '#0B5D4D' }}>
        <div className="dot-light-bg absolute inset-0 opacity-40" />
        <div className="relative px-3 pt-2 pb-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-start gap-1.5">
              <div
                className="mt-0.5 flex size-3 items-center justify-center rounded"
                style={{ background: '#F25F0C' }}
              >
                <HomeIcon className="size-1.5 text-white" fill="white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[9px] leading-tight font-extrabold text-white">Home</div>
                <div className="text-[7px] text-white/70">Hosakeri, Sirsi</div>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="flex size-5 items-center justify-center rounded-full bg-white/15">
                <Bell className="size-2.5 text-white" strokeWidth={2.5} />
              </div>
              <div
                className="flex size-5 items-center justify-center rounded-full bg-white text-[8px] font-extrabold"
                style={{ color: '#0B5D4D' }}
              >
                M
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5">
            <Search className="size-2.5" style={{ color: '#525252' }} strokeWidth={2.5} />
            <span className="text-[8px]" style={{ color: '#525252' }}>
              Search "karanji"...
            </span>
          </div>
        </div>
      </div>

      {/* Festival banner — pulls from active campaign when one exists */}
      <div className="px-3 pt-2.5">
        <div
          className="relative overflow-hidden rounded-xl p-2.5"
          style={{ background: 'linear-gradient(135deg, #F25F0C, #D14906)' }}
        >
          <div className="absolute -top-2 -right-2 text-3xl opacity-20">
            {activeFestival?.emoji ?? '🪔'}
          </div>
          <div className="text-white">
            <div className="mb-0.5 text-[7px] font-extrabold tracking-wider opacity-90 uppercase">
              {activeFestival ? localized(activeFestival.eyebrow) : 'Pre-orders open'}
            </div>
            <div className="text-[11px] leading-tight font-extrabold">
              {activeFestival
                ? `${localized(activeFestival.name)} specials`
                : 'Festival specials'}
            </div>
            <div className="mt-1 text-[8px] opacity-90">Modaka · Holige · Karanji</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-3 pt-3">
        <div className="mb-1.5 text-[8px] font-extrabold tracking-wider uppercase" style={{ color: '#525252' }}>
          What's on your mind?
        </div>
        <div className="scrollbar-hide flex gap-1.5 overflow-x-auto">
          {[
            { e: '🪔', bg: '#FFF6E5', n: 'Sweets' },
            { e: '🥨', bg: '#FFE8D6', n: 'Snacks' },
            { e: '🌶️', bg: '#FFE0E0', n: 'Pickles' },
            { e: '🫙', bg: '#FFF8E1', n: 'Ghee' },
            { e: '🎁', bg: '#E8F3F0', n: 'Hampers' },
          ].map((c) => (
            <div key={c.n} className="flex-shrink-0 text-center">
              <div
                className="mb-0.5 flex size-9 items-center justify-center rounded-lg text-base"
                style={{ background: c.bg }}
              >
                {c.e}
              </div>
              <div className="text-[7px] font-bold text-ink">{c.n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sirsi Suraksha pill */}
      <div className="px-3 pt-3">
        <div className="relative overflow-hidden rounded-xl p-2.5" style={{ background: '#0B5D4D' }}>
          <div className="dot-light-bg absolute inset-0 opacity-30" />
          <div className="relative flex items-center gap-2">
            <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-white">
              <Shield className="size-3" style={{ color: '#0B5D4D' }} fill="#0B5D4D" strokeWidth={2.5} />
            </div>
            <div className="text-white">
              <div className="text-[7px] font-extrabold tracking-wider opacity-90 uppercase">
                Sirsi Suraksha
              </div>
              <div className="text-[10px] leading-tight font-extrabold">
                Money-back if late or spoiled
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maker card preview */}
      <div className="px-3 pt-3">
        <div className="mb-1.5 text-[8px] font-extrabold tracking-wider uppercase" style={{ color: '#525252' }}>
          Home cooks · Sirsi
        </div>
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: '#EBEAE5' }}>
          <div
            className="relative flex h-16 items-center justify-center text-4xl"
            style={{ background: '#FFE8D6' }}
          >
            🥥
            <div
              className="absolute bottom-1 left-1 rounded px-1.5 py-0.5 text-[7px] font-extrabold text-white"
              style={{ background: '#1E40AF' }}
            >
              20% OFF
            </div>
          </div>
          <div className="p-2">
            <div className="mb-0.5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-extrabold text-ink">Sushma's Kitchen</span>
                <BadgeCheck className="size-2.5" style={{ color: '#0B5D4D' }} fill="#0B5D4D" strokeWidth={0} />
              </div>
              <div
                className="flex items-center gap-0.5 rounded px-1 py-0.5 text-white"
                style={{ background: '#15803D' }}
              >
                <Star className="size-2 fill-white" strokeWidth={0} />
                <span className="text-[7px] font-bold">4.9</span>
              </div>
            </div>
            <div className="text-[8px]" style={{ color: '#525252' }}>
              Havyaka Sweets · Festival foods
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[7px]" style={{ color: '#525252' }}>
              <Clock className="size-2" strokeWidth={2.5} />
              <span className="font-bold text-ink">3-5 days</span>
              <span>·</span>
              <span>1.2 km · Hosakeri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav — anchored to the screen floor */}
      <div
        className="absolute right-0 bottom-0 left-0 flex items-center justify-around border-t bg-white py-1.5"
        style={{ borderColor: '#EBEAE5' }}
      >
        {[
          { I: HomeIcon, l: 'Home', active: true },
          { I: Search, l: 'Search' },
          { I: ShoppingBag, l: 'Cart' },
          { I: Package, l: 'Orders' },
          { I: User, l: 'Account' },
        ].map((n) => (
          <div key={n.l} className="flex flex-col items-center gap-0.5">
            <n.I
              className="size-3"
              style={{ color: n.active ? '#0B5D4D' : '#525252' }}
              strokeWidth={n.active ? 2.5 : 2}
              fill={n.active ? '#0B5D4D' : 'none'}
            />
            <span
              className="text-[6px] font-extrabold"
              style={{ color: n.active ? '#0B5D4D' : '#525252' }}
            >
              {n.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
