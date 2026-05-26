import { images, titles } from '@/constants';

const SpwPageBanner = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex-1 relative">
      <img
        src={images.defaultBanner}
        alt={titles.SPORTS_APP_NAME}
        className="h-full md:h-auto md:max-h-72 w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-85"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
        <p className="font-roboto text-primary-muted text-2xl md:text-4xl tracking-widest font-medium mb-4 text-center uppercase">
          {title}
        </p>
        <p className="text-base md:text-lg text-white font-light tracking-widest mt-1 text-center">
          {subtitle || `The official portal of the Government of West Bengal`}
        </p>
      </div>
    </div>
  );
};
export default SpwPageBanner;
