import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Menu, Smartphone, X } from 'lucide-react';

import { Logo } from '@/components/layout/Logo';
import { ROUTES } from '@/config/routes';
import { Button } from '@/components/ui/Button';

interface NavProps {
  onScrollTo: (id: string) => void;
}

const SECTIONS = [
  { id: 'how', label: 'How it works' },
  { id: 'makers', label: 'Makers' },
  { id: 'cities', label: 'Cities' },
  { id: 'for-makers', label: 'For makers' },
  { id: 'story', label: 'Story' },
];

export function Nav({ onScrollTo }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(251,247,240,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #EBEAE5' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 md:px-10">
          <Link to={ROUTES.home} className="press">
            <Logo caption="घर से" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => onScrollTo(s.id)}
                className="link-underline text-[13px] font-semibold text-ink"
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.login)}
              leftIcon={<ChefHat className="size-3.5 text-green" strokeWidth={2.4} />}
              className="hidden md:inline-flex"
            >
              Sign in
            </Button>
            <Button
              variant="saffron"
              size="lg"
              onClick={() => onScrollTo('download')}
              leftIcon={<Smartphone className="size-3.5" strokeWidth={2.5} />}
            >
              Get the app
            </Button>
            <button
              onClick={() => setOpen(true)}
              className="press flex size-10 items-center justify-center rounded-full bg-black/5 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5 text-ink" strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] bg-green md:hidden animate-fade-in">
          <div className="dot-light-bg absolute inset-0 opacity-30" />
          <div className="relative flex h-full flex-col p-6">
            <div className="mb-12 flex items-center justify-between">
              <Logo inverse />
              <button onClick={() => setOpen(false)} className="flex size-10 items-center justify-center rounded-full bg-white/15">
                <X className="size-5 text-white" />
              </button>
            </div>
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  onScrollTo(s.id);
                  setOpen(false);
                }}
                className="border-b border-white/10 py-4 text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="font-display text-[32px] font-bold text-white">{s.label}</div>
              </button>
            ))}
            <Button
              variant="saffron"
              size="lg"
              fullWidth
              onClick={() => {
                navigate(ROUTES.login);
                setOpen(false);
              }}
              className="mt-auto"
              leftIcon={<ChefHat className="size-4" strokeWidth={2.5} />}
            >
              Sign in to your kitchen
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
