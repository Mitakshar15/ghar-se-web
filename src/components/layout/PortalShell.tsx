import { useState, type ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  ChefHat,
  Calendar,
  Wallet,
  Star,
  User,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
  Menu as MenuIcon,
  X,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react';

import { ROUTES } from '@/config/routes';
import { useAuth } from '@/lib/auth/store';
import { useToast } from '@/components/feedback/Toast';
import { apiPost } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { Logo } from './Logo';
import { cn } from '@/lib/utils/cn';

interface NavItem {
  to: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  badge?: number;
}

const NAV: NavItem[] = [
  { to: ROUTES.dashboard, label: 'Dashboard', sub: 'At-a-glance', icon: Home },
  { to: ROUTES.orders, label: 'Orders', sub: 'Confirm & prepare', icon: ShoppingBag, badge: 3 },
  { to: ROUTES.menu, label: 'Menu', sub: 'Items & prices', icon: ChefHat },
  { to: ROUTES.calendar, label: 'Calendar', sub: 'Daily capacity', icon: Calendar },
  { to: ROUTES.earnings, label: 'Earnings', sub: 'Payouts & breakdown', icon: Wallet },
  { to: ROUTES.reviews, label: 'Reviews', sub: 'Customer feedback', icon: Star },
  { to: ROUTES.profile, label: 'Profile', sub: 'Kitchen & KYC', icon: User },
  { to: ROUTES.settings, label: 'Settings', sub: 'Notifications & holidays', icon: Settings },
  { to: ROUTES.help, label: 'Help', sub: 'FAQ & contact', icon: HelpCircle },
];

interface PortalShellProps {
  children: ReactNode;
  /** Header sub-label shown above the page title in the top bar */
  topbarKicker?: string;
  /** Page title — defaults to the matched route's label */
  pageTitle?: string;
}

export function PortalShell({ children, topbarKicker, pageTitle }: PortalShellProps) {
  const { maker, clear } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = NAV.find((n) => location.pathname.startsWith(n.to));

  const handleSignOut = async () => {
    try {
      await apiPost(API.authSignOut);
    } catch {
      /* don't block sign-out on network error */
    }
    clear();
    push('Signed out', 'info');
    navigate(ROUTES.home, { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-canvas-2">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex-col bg-green-dark text-white md:flex md:relative md:w-72',
          mobileOpen ? 'fixed inset-y-0 left-0 z-50 flex w-72' : 'hidden',
        )}
      >
        <div className="dot-light-bg pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative flex items-center justify-between border-b border-white/10 p-5">
          <Logo inverse caption="maker portal" />
          <button
            onClick={() => setMobileOpen(false)}
            className="flex size-9 items-center justify-center rounded-full bg-white/10 md:hidden"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>

        {maker && (
          <div className="relative border-b border-white/10 p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-green font-extrabold text-[15px]">
                {maker.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[13px] font-extrabold">{maker.name}</span>
                  {maker.verified && (
                    <BadgeCheck className="size-4 flex-shrink-0 text-brass" fill="#C8A04D" strokeWidth={0} />
                  )}
                </div>
                <div className="truncate text-[11px] text-white/60">{maker.location}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { k: 'Orders', v: 7 },
                { k: 'Rating', v: maker.rating },
                { k: 'Years', v: maker.yearsActive + 'y' },
              ].map((c) => (
                <div key={c.k} className="rounded-lg bg-white/5 py-1.5">
                  <div className="text-[13px] font-extrabold">{c.v}</div>
                  <div className="text-[9px] font-bold tracking-wider text-white/50 uppercase">{c.k}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <nav className="relative flex-1 overflow-y-auto py-4">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-5 py-2.5 press text-left',
                    isActive
                      ? 'border-l-[3px] border-brass bg-[rgba(200,160,77,0.12)]'
                      : 'border-l-[3px] border-transparent',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn('size-4 flex-shrink-0', isActive ? 'text-brass' : 'text-white/70')}
                      strokeWidth={2.2}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className={cn(
                          'text-[13px] font-extrabold',
                          isActive ? 'text-white' : 'text-white/80',
                        )}
                      >
                        {n.label}
                      </div>
                      <div className="text-[10px] text-white/40">{n.sub}</div>
                    </div>
                    {n.badge !== undefined && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-saffron text-[9px] font-extrabold text-white">
                        {n.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="relative border-t border-white/10 p-5">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 press text-[13px] font-semibold text-white/70 hover:text-white"
          >
            <LogOut className="size-4" strokeWidth={2.2} />
            Sign out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 md:hidden" />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-line bg-canvas px-5 py-3.5 md:px-10">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex size-9 items-center justify-center rounded-full bg-canvas-2 md:hidden"
            aria-label="Open menu"
          >
            <MenuIcon className="size-5 text-ink" strokeWidth={2.2} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-extrabold tracking-[0.16em] text-ink-2 uppercase">
              {topbarKicker ?? current?.sub}
            </div>
            <h1 className="font-display truncate text-[22px] leading-tight font-black tracking-tight text-ink">
              {pageTitle ?? current?.label ?? 'Portal'}
            </h1>
          </div>
          <button className="relative flex size-10 items-center justify-center rounded-full bg-canvas-2 press">
            <Bell className="size-5 text-ink" strokeWidth={2.2} />
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-saffron text-[9px] font-bold text-white">
              4
            </span>
          </button>
          {maker && (
            <div className="ml-2 hidden items-center gap-2 border-l border-line pl-4 md:flex">
              <div className="text-right">
                <div className="text-[12px] font-extrabold text-ink">{maker.owner}</div>
                <div className="text-[10px] text-ink-2">Signed in</div>
              </div>
              <div className="flex size-9 items-center justify-center rounded-full bg-green text-[12px] font-extrabold text-white">
                {maker.initials}
              </div>
            </div>
          )}
        </header>

        <main className="w-full max-w-page flex-1 px-5 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
