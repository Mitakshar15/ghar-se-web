/**
 * Mock data fixtures. Keep these realistic — they're the founder's actual
 * Sirsi references (Hosakeri, Sushma Bhat, Karanji, FSSAI etc.) and are
 * shaped to match `src/types/domain.ts` schemas exactly.
 *
 * When backend is live, this file moves to `src/mocks/` for tests only
 * and the real API replaces it.
 */
import type { Maker, Item, Order, Review, Payout, AppNotification, Festival } from '@/types/domain';

export const maker: Maker = {
  id: 'm1',
  name: "Sushma's Kitchen",
  owner: 'Sushma Bhat',
  initials: 'SB',
  phone: '+91 98765 43210',
  email: 'sushma.bhat@gharse.in',
  address: 'No. 24, Hosakeri 4th cross, Near Marikamba Temple, Sirsi 581401',
  location: 'Hosakeri, Sirsi',
  fssai: '12345600002345',
  fssaiExpiry: '14 Aug 2027',
  bank: {
    name: 'Canara Bank',
    accountMasked: 'XXXX XXXX 4521',
    ifsc: 'CNRB0001234',
    upi: 'sushma.bhat@okhdfc',
  },
  speciality: 'Havyaka sweets · Festival foods',
  yearsActive: 8,
  rating: 4.9,
  reviews: 127,
  hygieneGrade: 'A+',
  verified: true,
  photo: '🥥',
  photoBg: '#FFE8D6',
  joined: 'March 2024',
  dailyCap: 15,
  status: 'active',
};

export const items: Item[] = [
  { id: 'i1', name: 'Karanji', price: 35, unit: 'piece', minOrder: 12, leadDays: 4, popular: true, veg: true, paused: false, desc: 'Sweet half-moon parcels with coconut, jaggery and roasted sesame.', img: '🥟', imgBg: '#FFF6E5', soldThisMonth: 318 },
  { id: 'i2', name: 'Holige', price: 40, unit: 'piece', minOrder: 6, leadDays: 3, popular: true, veg: true, paused: false, desc: 'Soft sweet flatbread filled with chana dal and jaggery, finished with ghee.', img: '🫓', imgBg: '#FFF6E5', soldThisMonth: 142 },
  { id: 'i3', name: 'Chakli', price: 450, unit: 'kg', minOrder: 0.5, leadDays: 3, popular: false, veg: true, paused: false, desc: 'Crispy spirals of rice flour, urad dal, sesame, and ajwain.', img: '🥨', imgBg: '#FFE8D6', soldThisMonth: 64 },
  { id: 'i4', name: 'Kayi Modaka', price: 45, unit: 'piece', minOrder: 11, leadDays: 5, popular: true, veg: true, paused: false, desc: 'Steamed coconut-jaggery dumplings. Made fresh on delivery day.', img: '🥥', imgBg: '#FFF6E5', soldThisMonth: 196, festival: 'Ganesh Chaturthi' },
  { id: 'i5', name: 'Mysore Pak', price: 380, unit: '250g', minOrder: 1, leadDays: 4, popular: false, veg: true, paused: true, desc: 'Ghee-rich gram flour fudge.', img: '🟡', imgBg: '#FAF3E0', soldThisMonth: 0 },
];

export const orders: Order[] = [
  { id: 'GS1024', buyer: 'Pradeep K.', neighborhood: 'Marikamba Nagar', amount: 840, items: [{ name: 'Karanji', qty: 24 }], placed: 'Today · 7:42 AM', due: 'Today · 10 AM', status: 'pending', urgent: true, payMethod: 'UPI', notes: '' },
  { id: 'GS1023', buyer: 'Anjali R.', neighborhood: 'Hosakeri', amount: 720, items: [{ name: 'Holige', qty: 18 }], placed: 'Today · 7:10 AM', due: 'Today · 11 AM', status: 'pending', payMethod: 'UPI', notes: 'Less sweet please. For festival.' },
  { id: 'GS1022', buyer: 'Vinay G.', neighborhood: 'Bisalakoppa', amount: 495, items: [{ name: 'Kayi Modaka', qty: 11 }], placed: 'Yesterday', due: 'Today · 12 PM', status: 'preparing', payMethod: 'UPI', notes: '' },
  { id: 'GS1021', buyer: 'Mitakshar', neighborhood: 'Hosakeri', amount: 420, items: [{ name: 'Karanji', qty: 12 }], placed: 'Yesterday', due: 'Today · 1 PM', status: 'preparing', payMethod: 'COD', notes: 'Cash on delivery — exact change please.' },
  { id: 'GS1020', buyer: 'Geetha S.', neighborhood: 'Banavasi Road', amount: 225, items: [{ name: 'Chakli', qty: 0.5 }], placed: '2 days ago', due: 'Today · 2 PM', status: 'preparing', payMethod: 'UPI', notes: '' },
  { id: 'GS1019', buyer: 'Suresh M.', neighborhood: 'Marikamba Nagar', amount: 1280, items: [{ name: 'Karanji', qty: 24 }, { name: 'Holige', qty: 12 }], placed: '3 days ago', due: 'Delivered 9 May', status: 'delivered', payMethod: 'UPI', notes: '' },
  { id: 'GS1018', buyer: 'Lakshmi B.', neighborhood: 'Hosakeri', amount: 540, items: [{ name: 'Holige', qty: 12 }], placed: '4 days ago', due: 'Delivered 8 May', status: 'delivered', payMethod: 'UPI', notes: '' },
  { id: 'GS1017', buyer: 'Anita N.', neighborhood: 'Bisalakoppa', amount: 380, items: [{ name: 'Chakli', qty: 0.5 }, { name: 'Mysore Pak', qty: 1 }], placed: '5 days ago', due: 'Cancelled 5 May', status: 'cancelled', payMethod: 'UPI', notes: 'Buyer cancelled (changed mind).' },
];

export const reviews: Review[] = [
  { id: 'r1', name: 'Pradeep K.', rating: 5, date: '2 weeks ago', item: 'Karanji', text: "Sushma aunty's karanji is unmatched. Crispy outside, fresh coconut filling. Tradition in every bite.", helpful: 12, replied: true, reply: 'Thank you Pradeep, see you at Ganesh Chaturthi!' },
  { id: 'r2', name: 'Anjali R.', rating: 5, date: 'Last month', item: 'Holige', text: 'Ordered for Krishna Janmashtami. Family loved them. Will order for every festival now.', helpful: 8, replied: false },
  { id: 'r3', name: 'Suresh M.', rating: 4, date: '6 weeks ago', item: 'Karanji', text: 'Good quality, slightly less sweet for my taste but everyone else enjoyed.', helpful: 3, replied: true, reply: 'Will note your preference for next time, Suresh!' },
  { id: 'r4', name: 'Lakshmi B.', rating: 5, date: '2 months ago', item: 'Holige', text: 'Best holige in Sirsi. Thin, soft, perfect ghee finish. Worth every rupee.', helpful: 15, replied: false },
  { id: 'r5', name: 'Vidya J.', rating: 5, date: '2 months ago', item: 'Kayi Modaka', text: "Felt like my mother's cooking. The fresh coconut is what makes it.", helpful: 6, replied: true, reply: 'You made my day, Vidya!' },
  { id: 'r6', name: 'Ramesh H.', rating: 3, date: '3 months ago', item: 'Chakli', text: 'A bit too salty. Otherwise crispy.', helpful: 1, replied: false },
];

export const payouts: Payout[] = [
  { id: 'p1', date: '12 May 2026', amount: 3840, orders: 5, status: 'scheduled', note: 'Direct to Canara Bank ••• 4521' },
  { id: 'p2', date: '8 May 2026', amount: 5260, orders: 7, status: 'paid' },
  { id: 'p3', date: '5 May 2026', amount: 2920, orders: 4, status: 'paid' },
  { id: 'p4', date: '2 May 2026', amount: 4180, orders: 6, status: 'paid' },
  { id: 'p5', date: '29 Apr 2026', amount: 6740, orders: 9, status: 'paid' },
  { id: 'p6', date: '26 Apr 2026', amount: 3160, orders: 4, status: 'paid' },
];

export const notifications: AppNotification[] = [
  { id: 'n1', icon: 'alert', title: '3 new orders need confirmation', sub: 'Confirm within 30 minutes to maintain rating', time: '7 min ago' },
  { id: 'n2', icon: 'review', title: 'New 5-star review from Pradeep K.', sub: '“Tradition in every bite.”', time: '2h ago' },
  { id: 'n3', icon: 'payout', title: 'Payout of ₹3,840 scheduled', sub: 'Will arrive tomorrow by 2 PM', time: 'Yesterday' },
  { id: 'n4', icon: 'festival', title: 'Ganesh Chaturthi in 119 days', sub: 'Time to open pre-orders for modaka', time: '2 days ago' },
];

export const festivals: Festival[] = [
  { id: 'gc', name: 'Ganesh Chaturthi', emoji: '🪔', date: 'Sept 6', days: 119, preorders: 14 },
  { id: 'np', name: 'Naga Panchami', emoji: '🐍', date: 'July 28', days: 79, preorders: 4 },
  { id: 'dv', name: 'Deepavali', emoji: '🎆', date: 'Nov 8', days: 182, preorders: 0 },
];

/** Buyer-side maker directory used on the landing page. */
export const featuredMakers = [
  { id: 'm1', name: "Sushma's Kitchen", owner: 'Sushma Bhat', location: 'Hosakeri', rating: 4.9, reviews: 127, years: 8, speciality: 'Havyaka sweets · Festival foods', image: '🥥', imageBg: '#FFE8D6' },
  { id: 'm2', name: "Lakshmi's Pickle House", owner: 'Lakshmi Hegde', location: 'Marikamba Nagar', rating: 4.8, reviews: 94, years: 12, speciality: 'Pickles · Masala powders', image: '🌶️', imageBg: '#FFE0E0' },
  { id: 'm3', name: "Vidya's Kitchen", owner: 'Vidya Joshi', location: 'Banavasi Road', rating: 4.9, reviews: 142, years: 15, speciality: 'Pure ghee · Stone-ground masalas', image: '🫙', imageBg: '#FFF8E1' },
];
