import { cn } from '@/lib/utils';

const SpwPageTitle = ({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center font-inter mb-4 md:mb-8">
      <span
        className={cn(
          'uppercase tracking-wider font-semibold font-oswald text-base md:text-2xl text-primary',
          className,
        )}
      >
        {title}
      </span>
      {subtitle && (
        <span className="text-xs md:text-lg text-muted-foreground mt-4 md:mt-8">
          {subtitle}
        </span>
      )}
    </div>
  );
};
export default SpwPageTitle;
