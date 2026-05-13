/**
 * Canonical route paths. Always reference these constants from components
 * instead of hard-coding strings — keeps refactors safe.
 */
export const ROUTES = {
  home: '/',
  // Auth flow
  login: '/sign-in',
  otp: '/sign-in/otp',

  // Maker portal
  portal: '/portal',
  dashboard: '/portal/dashboard',
  orders: '/portal/orders',
  orderDetail: (id = ':orderId') => `/portal/orders/${id}`,
  menu: '/portal/menu',
  calendar: '/portal/calendar',
  earnings: '/portal/earnings',
  reviews: '/portal/reviews',
  profile: '/portal/profile',
  settings: '/portal/settings',
  help: '/portal/help',
} as const;
