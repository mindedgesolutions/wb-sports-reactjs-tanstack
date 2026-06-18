import { cn } from '@/lib/utils';

const SpwSectionTitleWrapper = ({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col font-inter mb-8">
      <span
        className={cn(
          'uppercase tracking-wider font-semibold font-oswald text-base md:text-2xl text-primary',
          className,
        )}
      >
        {title}
      </span>
      {subtitle && (
        <span className="text-lg text-muted-foreground mt-4 md:mt-8">
          {subtitle}
        </span>
      )}
    </div>
  );
};
export default SpwSectionTitleWrapper;
