import { cn } from '@/lib/utils';

const WbLoadMore = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'max-w-7xl mx-auto h-12 flex flex-col gap-2 justify-center items-center animate-pulse',
        className,
      )}
    >
      <span className="text-sm text-primary-muted">Loading data ...</span>
    </div>
  );
};
export default WbLoadMore;
