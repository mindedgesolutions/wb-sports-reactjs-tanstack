import { images } from '@/constants';
import { cn } from '@/lib/utils';

const WbLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'max-w-7xl mx-auto h-60 flex flex-col gap-2 justify-center items-center animate-pulse',
        className,
      )}
    >
      <img
        src={images.nationalEmblem}
        alt={`Department of Youth Services and Sports`}
        className="h-16"
      />
      <span className="text-primary-muted">Loading data ...</span>
    </div>
  );
};
export default WbLoader;
