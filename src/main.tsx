import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { App } from './app/App';
import { queryClient } from '@/lib/api/queryClient';
import { env } from '@/config/env';
import '@/lib/auth/store'; // side-effect: wires token getter
import './styles/global.css';

async function bootstrap() {
  // Start MSW BEFORE rendering so the first fetch is intercepted.
  // Failures here should NOT block the app — fall back to bypass so the UI still mounts.
  if (env.VITE_USE_MOCKS) {
    try {
      const { worker } = await import('@/mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
        quiet: true,
        serviceWorker: { url: '/mockServiceWorker.js' },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('[MSW] failed to start — continuing without mocks:', e);
    }
  }

  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('#root not found');

  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.DEV && (
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        )}
      </QueryClientProvider>
    </StrictMode>,
  );
}

// Global error logger so silent prod failures surface in monitoring.
window.addEventListener('error', (e) => console.error('[unhandled error]', e.error || e.message));
window.addEventListener('unhandledrejection', (e) => console.error('[unhandled rejection]', e.reason));

bootstrap().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('[bootstrap]', e);
  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.innerHTML = `<pre style="padding:24px;color:#C53030;font-family:monospace;font-size:13px">${String(e?.stack || e)}</pre>`;
  }
});
