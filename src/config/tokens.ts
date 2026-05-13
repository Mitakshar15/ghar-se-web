/**
 * Design tokens — JS-accessible mirror of tailwind.config.js colors.
 * Use these for inline styles when Tailwind classes aren't sufficient
 * (gradients, SVG fills, dynamic colors). Keep both files in sync.
 */
export const tokens = {
  green: '#0B5D4D',
  greenDark: '#063C32',
  greenMid: '#147A66',
  greenLight: '#E8F3F0',
  greenLighter: '#F4F9F7',
  saffron: '#F25F0C',
  saffronDark: '#D14906',
  saffronLight: '#FFF0E5',
  brass: '#C8A04D',
  brassDark: '#9C7A2F',
  brassLight: '#FAF3E0',
  ink: '#171717',
  ink2: '#525252',
  ink3: '#9CA3AF',
  ink4: '#D4D4D4',
  cream: '#FBF7F0',
  creamDark: '#F5EFE0',
  canvas: '#FFFFFF',
  canvas2: '#FAFAF9',
  canvas3: '#F4F4F2',
  line: '#EBEAE5',
  lineSoft: '#F1F0EC',
  lineDark: '#D6D2C8',
  veg: '#16A34A',
  danger: '#C53030',
  dangerLight: '#FEE2E2',
} as const;

export type ColorToken = keyof typeof tokens;
