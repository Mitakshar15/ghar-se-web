import { cn } from '@/lib/utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('bg-gradient-to-r from-canvas-2 via-canvas-3 to-canvas-2 bg-[length:400%_100%] rounded-md', className)}
      style={{ animation: 'skeleton-shimmer 1.4s ease-in-out infinite' }}
    >
      <style>{`@keyframes skeleton-shimmer { 0% { background-position: 100% 0 } 100% { background-position: -100% 0 } }`}</style>
    </div>
  );
}
