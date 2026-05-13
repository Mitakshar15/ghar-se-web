import { z } from 'zod';

/**
 * Domain schemas. These are the source of truth for both:
 *   1. Compile-time TypeScript types (`type Maker = z.infer<typeof MakerSchema>`)
 *   2. Runtime validation when parsing API/MSW responses
 *
 * When the Spring Boot backend is wired up, mirror these on the server side
 * (e.g. with Jackson DTOs) and use these schemas in the api client to
 * fail loudly on contract drift.
 */

// ---- Primitives ----
export const MakerStatusSchema = z.enum(['active', 'paused', 'closed']);
export type MakerStatus = z.infer<typeof MakerStatusSchema>;

export const OrderStatusSchema = z.enum(['pending', 'preparing', 'delivered', 'cancelled']);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const PayMethodSchema = z.enum(['UPI', 'COD', 'card', 'wallet']);
export type PayMethod = z.infer<typeof PayMethodSchema>;

export const HygieneGradeSchema = z.enum(['A+', 'A', 'B', 'C']);

// ---- Maker ----
export const BankSchema = z.object({
  name: z.string(),
  accountMasked: z.string(),
  ifsc: z.string(),
  upi: z.string(),
});

export const MakerSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  initials: z.string().min(1).max(3),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  location: z.string(),
  fssai: z.string(),
  fssaiExpiry: z.string(),
  bank: BankSchema,
  speciality: z.string(),
  yearsActive: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  hygieneGrade: HygieneGradeSchema,
  verified: z.boolean(),
  photo: z.string(),
  photoBg: z.string(),
  joined: z.string(),
  dailyCap: z.number().int().positive(),
  status: MakerStatusSchema.default('active'),
});
export type Maker = z.infer<typeof MakerSchema>;

// ---- Menu item ----
export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  unit: z.string(),
  minOrder: z.number().positive(),
  leadDays: z.number().int().nonnegative(),
  popular: z.boolean(),
  veg: z.boolean(),
  paused: z.boolean(),
  desc: z.string().max(280),
  img: z.string(),
  imgBg: z.string(),
  soldThisMonth: z.number().int().nonnegative(),
  festival: z.string().nullable().optional(),
});
export type Item = z.infer<typeof ItemSchema>;

// ---- Order ----
export const OrderItemSchema = z.object({
  name: z.string(),
  qty: z.number().positive(),
});

export const OrderSchema = z.object({
  id: z.string(),
  buyer: z.string(),
  neighborhood: z.string(),
  amount: z.number().nonnegative(),
  items: z.array(OrderItemSchema).nonempty(),
  placed: z.string(),
  due: z.string(),
  status: OrderStatusSchema,
  urgent: z.boolean().optional(),
  payMethod: PayMethodSchema,
  notes: z.string(),
});
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;

// ---- Review ----
export const ReviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number().int().min(1).max(5),
  date: z.string(),
  item: z.string(),
  text: z.string(),
  helpful: z.number().int().nonnegative(),
  replied: z.boolean(),
  reply: z.string().optional(),
});
export type Review = z.infer<typeof ReviewSchema>;

// ---- Payout ----
export const PayoutSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.number().nonnegative(),
  orders: z.number().int().nonnegative(),
  status: z.enum(['paid', 'scheduled', 'failed']),
  note: z.string().optional(),
});
export type Payout = z.infer<typeof PayoutSchema>;

// ---- Notification ----
export const NotificationSchema = z.object({
  id: z.string(),
  icon: z.enum(['alert', 'review', 'payout', 'festival']),
  title: z.string(),
  sub: z.string(),
  time: z.string(),
});
export type AppNotification = z.infer<typeof NotificationSchema>;

// ---- Festival ----
export const FestivalSchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string(),
  date: z.string(),
  days: z.number().int(),
  preorders: z.number().int().nonnegative(),
});
export type Festival = z.infer<typeof FestivalSchema>;

// ---- Aggregate "dashboard" payload ----
export const DashboardSummarySchema = z.object({
  thisMonthEarning: z.number().nonnegative(),
  earningTrendPct: z.number(),
  orderCount: z.number().int().nonnegative(),
  pendingOrderCount: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  nextPayoutAmount: z.number().nonnegative(),
  nextPayoutDate: z.string(),
});
export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;
