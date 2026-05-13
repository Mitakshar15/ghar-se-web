/**
 * MSW request handlers. These intercept fetch calls at the network layer
 * and respond with the fixtures, simulating real API latency + occasional
 * errors so the UI exercises loading/error states.
 *
 * Endpoints are versioned + namespaced (/api/v1/...) so the Spring Boot
 * backend can reuse the same shapes.
 */
import { http, HttpResponse, delay } from 'msw';
import { z } from 'zod';

import * as data from './fixtures';

const BASE = '/api/v1';

// Mutable in-memory stores — reset on page reload, like a dev sandbox.
const state = {
  items: structuredClone(data.items),
  orders: structuredClone(data.orders),
  reviews: structuredClone(data.reviews),
};

// Realistic latency (50–250ms). Tweak in dev tools if needed.
const lag = () => delay(50 + Math.floor(Math.random() * 200));

export const handlers = [
  // ---- Auth ----
  http.post(`${BASE}/auth/otp/request`, async ({ request }) => {
    await lag();
    const body = await request.json().catch(() => ({}));
    const phone = (body as { phone?: string })?.phone;
    if (!phone || !/^\d{10}$/.test(phone)) {
      return HttpResponse.json({ error: 'Invalid phone' }, { status: 400 });
    }
    return HttpResponse.json({ requestId: 'req-' + Date.now(), expiresInSec: 60 });
  }),

  http.post(`${BASE}/auth/otp/verify`, async ({ request }) => {
    await lag();
    const Body = z.object({ requestId: z.string(), code: z.string().length(6) });
    const parsed = Body.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) return HttpResponse.json({ error: 'Bad request' }, { status: 400 });
    if (parsed.data.code !== '123456') {
      return HttpResponse.json({ error: 'Invalid code' }, { status: 401 });
    }
    // Toy "JWT" — real backend issues a signed token; client never inspects it.
    return HttpResponse.json({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresInSec: 60 * 60 * 24,
      maker: data.maker,
    });
  }),

  http.post(`${BASE}/auth/sign-out`, async () => {
    await lag();
    return HttpResponse.json({ ok: true });
  }),

  http.get(`${BASE}/auth/me`, async () => {
    await lag();
    return HttpResponse.json(data.maker);
  }),

  // ---- Dashboard ----
  http.get(`${BASE}/portal/dashboard`, async () => {
    await lag();
    const todayOrders = state.orders.filter((o) => o.due.startsWith('Today'));
    return HttpResponse.json({
      summary: {
        thisMonthEarning: 42380,
        earningTrendPct: 18,
        orderCount: 47,
        pendingOrderCount: state.orders.filter((o) => o.status === 'pending').length,
        rating: data.maker.rating,
        reviewCount: data.maker.reviews,
        nextPayoutAmount: 3840,
        nextPayoutDate: '12 May 2026',
      },
      todayOrders,
      notifications: data.notifications,
      festivals: data.festivals,
      weeklyCapacity: [
        { d: 'Mon', pct: 45 },
        { d: 'Tue', pct: 70 },
        { d: 'Wed', pct: 90 },
        { d: 'Thu', pct: 100 },
        { d: 'Fri', pct: 65 },
        { d: 'Sat', pct: 80 },
        { d: 'Sun', pct: 35 },
      ],
    });
  }),

  // ---- Orders ----
  http.get(`${BASE}/orders`, async ({ request }) => {
    await lag();
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const filtered = status ? state.orders.filter((o) => o.status === status) : state.orders;
    return HttpResponse.json({ orders: filtered });
  }),

  http.patch(`${BASE}/orders/:id`, async ({ params, request }) => {
    await lag();
    const body = (await request.json().catch(() => ({}))) as { status?: string };
    const i = state.orders.findIndex((o) => o.id === params.id);
    if (i < 0) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    if (body.status) state.orders[i] = { ...state.orders[i]!, status: body.status as never };
    return HttpResponse.json(state.orders[i]);
  }),

  // ---- Menu ----
  http.get(`${BASE}/menu/items`, async () => {
    await lag();
    return HttpResponse.json({ items: state.items });
  }),

  http.post(`${BASE}/menu/items`, async ({ request }) => {
    await lag();
    const body = (await request.json()) as Partial<(typeof state.items)[number]>;
    const newItem = {
      id: 'i' + Math.floor(1000 + Math.random() * 9000),
      soldThisMonth: 0,
      ...body,
    } as (typeof state.items)[number];
    state.items.push(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.patch(`${BASE}/menu/items/:id`, async ({ params, request }) => {
    await lag();
    const i = state.items.findIndex((x) => x.id === params.id);
    if (i < 0) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    const patch = (await request.json()) as Partial<(typeof state.items)[number]>;
    state.items[i] = { ...state.items[i]!, ...patch };
    return HttpResponse.json(state.items[i]);
  }),

  http.delete(`${BASE}/menu/items/:id`, async ({ params }) => {
    await lag();
    const before = state.items.length;
    state.items = state.items.filter((x) => x.id !== params.id);
    return HttpResponse.json({ ok: state.items.length < before });
  }),

  // ---- Calendar ----
  http.get(`${BASE}/calendar`, async ({ request }) => {
    await lag();
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year') ?? '2026', 10);
    const month = parseInt(url.searchParams.get('month') ?? '5', 10);
    const bookings: Record<number, number> = {
      11: 5, 12: 8, 13: 12, 14: 14, 15: 10, 16: 15, 17: 9, 18: 6, 19: 11, 20: 4, 22: 14, 25: 8, 28: 7,
    };
    const festivals: Record<number, string> = { 6: 'gc', 28: 'np' };
    const blocked = [17, 24];
    return HttpResponse.json({ year, month, bookings, festivals, blocked, dailyCap: data.maker.dailyCap });
  }),

  http.patch(`${BASE}/calendar/capacity`, async ({ request }) => {
    await lag();
    const body = (await request.json()) as { dailyCap?: number };
    if (body.dailyCap) data.maker.dailyCap = body.dailyCap;
    return HttpResponse.json({ ok: true, dailyCap: data.maker.dailyCap });
  }),

  // ---- Earnings ----
  http.get(`${BASE}/earnings`, async () => {
    await lag();
    return HttpResponse.json({
      summary: { thisMonth: 42380, lastMonthDelta: 18, paidOut: 22260, scheduled: 3840 },
      breakdown: [
        { label: 'Festival sweets', value: 23300, pct: 55 },
        { label: 'Tea-time snacks', value: 10600, pct: 25 },
        { label: 'Pickles & podis', value: 8480, pct: 20 },
      ],
      payouts: data.payouts,
      bank: data.maker.bank,
    });
  }),

  // ---- Reviews ----
  http.get(`${BASE}/reviews`, async () => {
    await lag();
    return HttpResponse.json({ reviews: state.reviews });
  }),

  http.post(`${BASE}/reviews/:id/reply`, async ({ params, request }) => {
    await lag();
    const body = (await request.json()) as { reply?: string };
    const i = state.reviews.findIndex((r) => r.id === params.id);
    if (i < 0) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    if (!body.reply?.trim()) return HttpResponse.json({ error: 'Reply required' }, { status: 400 });
    state.reviews[i] = { ...state.reviews[i]!, replied: true, reply: body.reply };
    return HttpResponse.json(state.reviews[i]);
  }),

  // ---- Profile ----
  http.get(`${BASE}/profile`, async () => {
    await lag();
    return HttpResponse.json(data.maker);
  }),

  http.patch(`${BASE}/profile`, async ({ request }) => {
    await lag();
    const body = (await request.json()) as Partial<typeof data.maker>;
    Object.assign(data.maker, body);
    return HttpResponse.json(data.maker);
  }),

  // ---- Public landing data ----
  http.get(`${BASE}/public/featured-makers`, async () => {
    await lag();
    return HttpResponse.json({ makers: data.featuredMakers });
  }),
];
