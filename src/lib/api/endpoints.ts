/**
 * Canonical API endpoint paths. Keep in lockstep with src/mocks/handlers.ts
 * and the Spring Boot routes. NEVER inline /api/v1/... strings in components.
 */
export const API = {
  authOtpRequest: '/api/v1/auth/otp/request',
  authOtpVerify: '/api/v1/auth/otp/verify',
  authSignOut: '/api/v1/auth/sign-out',
  authMe: '/api/v1/auth/me',

  dashboard: '/api/v1/portal/dashboard',

  orders: '/api/v1/orders',
  order: (id: string) => `/api/v1/orders/${id}`,

  menuItems: '/api/v1/menu/items',
  menuItem: (id: string) => `/api/v1/menu/items/${id}`,

  calendar: '/api/v1/calendar',
  calendarCapacity: '/api/v1/calendar/capacity',

  earnings: '/api/v1/earnings',

  reviews: '/api/v1/reviews',
  reviewReply: (id: string) => `/api/v1/reviews/${id}/reply`,

  profile: '/api/v1/profile',

  publicFeaturedMakers: '/api/v1/public/featured-makers',
} as const;
