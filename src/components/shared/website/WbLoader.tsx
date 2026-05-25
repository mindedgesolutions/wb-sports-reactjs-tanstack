import { cn } from '@/lib/utils';

const WbLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'max-w-7xl mx-auto h-60 flex justify-center items-center',
        className,
      )}
    >
      <span className="animate-pulse">Loading data ...</span>
    </div>
  );
};
export default WbLoader;
