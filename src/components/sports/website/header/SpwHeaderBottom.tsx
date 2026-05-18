import { images, titles } from '@/constants';
import { cn } from '@/lib/utils';

const SpwHeaderBottom = ({ className }: { className?: string }) => {
  return (
    <div className={cn('py-4', className)}>
      <div className="flex items-center gap-2 md:gap-4">
        <img
          src={images.nationalEmblem}
          alt="National Emblem"
          className="max-h-8 md:max-h-16"
        />
        <div className="flex flex-col gap-1 md:gap-2">
          <span className="uppercase text-primary text-xs md:text-3xl font-medium font-oswald">
            {titles.SPORTS_APP_NAME}
          </span>
          <span className="uppercase text-muted-foreground text-[10px] md:text-sm font-oswald font-medium tracking-wider">
            government of west bengal
          </span>
        </div>
      </div>
    </div>
  );
};
export default SpwHeaderBottom;
