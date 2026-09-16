import { images, titles } from '@/constants';
import type { IBannerRow } from '@/interface/services.interface';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

type PageBannerProps = {
  data: IBannerRow | undefined;
  title?: string;
  subtitle?: string;
};

const YswPageBanner = ({ data, title, subtitle }: PageBannerProps) => {
  const bannerImg = data
    ? `${titles.BASE_URL}${data?.image_path}`
    : images.defaultBanner;

  const { pathname } = useLocation();

  return (
    <div className="flex-1 relative">
      <img
        src={bannerImg}
        alt={titles.SERVICES_APP_NAME}
        className={cn(
          'h-full md:h-auto w-full object-cover',
          pathname === '/wbyouthservices' ? 'md:max-h-100' : 'md:max-h-70',
        )}
      />

      <div className="absolute inset-0 bg-card-foreground dark:bg-card opacity-85"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
        <p className="font-oswald text-primary-muted text-2xl md:text-4xl tracking-widest font-medium mb-4 text-center uppercase">
          {title}
        </p>
        <p className="text-[10px] md:text-base text-primary-foreground font-light font-oswald tracking-widest mt-1 text-center">
          {subtitle || `The official portal of the Government of West Bengal`}
        </p>
      </div>
    </div>
  );
};
export default YswPageBanner;
