import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import { ROUTES } from '@/config/routes';
import { useAuth } from '@/lib/auth/store';
import { useToast } from '@/components/feedback/Toast';
import { verifyOtp } from './api';
import { OTP_STORAGE_KEY } from './Login';

export function Otp() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const { push } = useToast();
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  const session = useRef<{ requestId: string; phone: string } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(OTP_STORAGE_KEY);
    if (!raw) {
      navigate(ROUTES.login, { replace: true });
      return;
    }
    try {
      session.current = JSON.parse(raw);
    } catch {
      navigate(ROUTES.login, { replace: true });
    }
  }, [navigate]);

  // Simulate Android SMS auto-fill: arrives 1.5s after page load.
  useEffect(() => {
    const t = setTimeout(() => {
      setAutoFilled(true);
      setCode(['1', '2', '3', '4', '5', '6']);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  // Auto-verify when all 6 digits are filled.
  useEffect(() => {
    if (verifying || !session.current) return;
    if (code.every((d) => d.length === 1)) {
      void doVerify(code.join(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  async function doVerify(fullCode: string) {
    if (!session.current) return;
    setVerifying(true);
    try {
      const res = await verifyOtp(session.current.requestId, fullCode);
      setSession(res.accessToken, res.maker);
      sessionStorage.removeItem(OTP_STORAGE_KEY);
      push('Signed in — welcome back', 'success');
      navigate(ROUTES.dashboard, { replace: true });
    } catch (e) {
      push((e as Error).message || 'Invalid code', 'error');
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  }

  function update(idx: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1);
    setCode((prev) => {
      const next = prev.slice();
      next[idx] = digit;
      return next;
    });
    if (digit && idx < 5) inputs.current[idx + 1]?.focus();
  }

  function onKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  }

  const filled = code.filter(Boolean).length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-6">
      <div className="w-full max-w-[420px]">
        <Link to={ROUTES.login} className="press mb-6 flex items-center gap-1 text-[13px] font-semibold text-ink">
          <ArrowLeft className="size-4" strokeWidth={2.4} /> Change phone
        </Link>
        <div className="mb-2 text-[11px] font-extrabold tracking-[0.18em] text-saffron uppercase">Verify</div>
        <h2 className="font-display mb-2 text-[32px] leading-tight font-black tracking-tight text-ink">
          Enter the 6-digit OTP
        </h2>
        <p className="mb-8 text-[13px] text-ink-2">
          Sent to{' '}
          <span className="font-bold text-ink">+91 {session.current?.phone ?? '••••• •••••'}</span>. We'll
          auto-fill it when your SMS arrives.
        </p>

        <div className="mb-6 grid grid-cols-6 gap-2">
          {code.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={d}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="aspect-square rounded-xl border-2 text-center text-[24px] font-extrabold text-ink outline-none transition-colors"
              style={{
                borderColor: d ? '#0B5D4D' : '#EBEAE5',
                background: d ? '#F4F9F7' : '#FFFFFF',
              }}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {filled === 6 && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-lighter p-3 text-[12px] text-green">
            <CheckCircle2 className="size-4" strokeWidth={2.4} />
            {verifying ? 'Verifying…' : 'Code complete — verifying…'}
          </div>
        )}

        {autoFilled && (
          <div className="mb-4 text-[11px] text-ink-3">Hint for prototype: code <code className="font-semibold">123456</code> is accepted.</div>
        )}

        <div className="text-center text-[12px] text-ink-2">
          Didn't get it?{' '}
          <button className="font-extrabold text-saffron underline">Resend in 0:24</button>
        </div>
      </div>
    </div>
  );
}
