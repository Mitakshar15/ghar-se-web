import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Lock, Bell, Wallet, Shield } from 'lucide-react';

import { ROUTES } from '@/config/routes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/feedback/Toast';
import { requestOtp } from './api';

const FormSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
});
type FormValues = z.infer<typeof FormSchema>;

const KEY = 'gharse:lastOtpRequest';

export function Login() {
  const navigate = useNavigate();
  const { push } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: { phone: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { requestId } = await requestOtp(values.phone);
      // Pass requestId + phone forward via sessionStorage rather than URL
      // (URL would leak the OTP request ID into browser history).
      sessionStorage.setItem(KEY, JSON.stringify({ requestId, phone: values.phone }));
      navigate(ROUTES.otp);
    } catch (e) {
      push((e as Error).message || 'Could not send OTP', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <div className="dot-light-bg relative hidden flex-1 overflow-hidden bg-green md:flex">
        <div className="relative z-10 flex flex-col p-12">
          <Link to={ROUTES.home} className="press flex items-center gap-2 text-[13px] font-semibold text-white/80 hover:text-white">
            <ArrowLeft className="size-4" strokeWidth={2.4} /> Back to ghar se
          </Link>
          <div className="flex max-w-[460px] flex-1 flex-col justify-center">
            <div className="font-serif-italic mb-3 text-[16px] text-brass">ನಿಮ್ಮ ಅಡಿಗೆಗೆ ಸ್ವಾಗತ</div>
            <h1 className="font-display mb-4 text-[56px] leading-[1.0] font-black tracking-tight text-white">
              Welcome back
              <br />
              to your <span className="font-serif-italic text-brass">kitchen</span>.
            </h1>
            <p className="mb-10 text-[15px] leading-relaxed text-white/70">
              Sign in with your registered phone to manage orders, update your menu, and check today's payouts.
            </p>
            <div className="space-y-3 text-[13px] text-white/80">
              {[
                { Icon: Wallet, text: 'Daily payouts · directly to bank' },
                { Icon: Bell, text: 'Order alerts on phone + email' },
                { Icon: Shield, text: 'Verified buyers · escrowed payments' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg" style={{ background: 'rgba(200,160,77,0.18)' }}>
                    <Icon className="size-4 text-brass" strokeWidth={2.2} />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-white/40">© Ghar Se · Made in Sirsi, Karnataka</div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-center p-8 md:w-[460px] md:p-12"
      >
        <Link to={ROUTES.home} className="press mb-6 flex items-center gap-1 text-[13px] font-semibold text-ink md:hidden">
          <ArrowLeft className="size-4" strokeWidth={2.4} /> Back
        </Link>
        <div className="mb-8">
          <div className="mb-2 text-[11px] font-extrabold tracking-[0.18em] text-saffron uppercase">
            Maker sign-in
          </div>
          <h2 className="font-display mb-1 text-[32px] leading-tight font-black tracking-tight text-ink">
            Sign in to your kitchen
          </h2>
          <p className="text-[13px] text-ink-2">We'll send a 6-digit OTP to your registered phone.</p>
        </div>

        <Input
          label="Phone number"
          leftAddon="+91"
          inputMode="numeric"
          placeholder="98765 43210"
          autoFocus
          maxLength={10}
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={submitting}
          disabled={!isValid}
          rightIcon={<ArrowRight className="size-4" strokeWidth={2.5} />}
          className="mt-5"
        >
          Send OTP
        </Button>

        <div className="mt-5 text-center text-[12px] text-ink-2">
          Not a maker yet?{' '}
          <Link to={ROUTES.home} className="font-extrabold text-saffron underline">
            Apply to join
          </Link>
        </div>
        <div className="mt-10 flex items-center gap-2 border-t border-line pt-5 text-[11px] text-ink-2">
          <Lock className="size-3.5" strokeWidth={2.4} />
          Your number is never shared with buyers without your approval.
        </div>
      </form>
    </div>
  );
}

export const OTP_STORAGE_KEY = KEY;
