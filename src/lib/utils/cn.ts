import clsx, { type ClassValue } from 'clsx';

/**
 * `cn` — conditional className helper. Thin wrapper around clsx so we have
 * one import path across the app and can later swap for tailwind-merge
 * if we hit specificity issues.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
