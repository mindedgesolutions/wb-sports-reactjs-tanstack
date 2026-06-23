import { images, titles } from '@/constants';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const SpwHeaderBottom = ({ className }: { className?: string }) => {
  return (
    <div className={cn('py-2', className)}>
      <Link to={`/`}>
        <div className="flex items-center gap-2 md:gap-4">
          <img
            src={images.nationalEmblem}
            alt="National Emblem"
            className="max-h-8 md:max-h-16 block dark:hidden"
          />
          <img
            src={images.nationalEmblemInverted}
            alt="National Emblem"
            className="max-h-8 md:max-h-16 hidden dark:block"
          />
          <div className="flex flex-col gap-1">
            {/* Desktop starts */}
            <span className="hidden md:block uppercase text-primary text-xs md:text-lg font-medium font-oswald">
              {titles.SPORTS_APP_NAME}
            </span>
            {/* Desktop ends */}

            {/* Mobile starts */}
            <div className="flex flex-col gap-0">
              <span className="block md:hidden uppercase text-primary text-xs md:text-lg font-medium font-oswald">
                department of youth services and sports
              </span>
              <span className="block md:hidden uppercase text-primary text-xs md:text-lg font-medium font-oswald">
                (sports wing)
              </span>
            </div>
            {/* Mobile ends */}
            <span className="uppercase text-muted-foreground text-[10px] md:text-sm font-oswald font-medium tracking-wider">
              government of west bengal
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default SpwHeaderBottom;
