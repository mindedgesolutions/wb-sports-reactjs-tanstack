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
    <div className="flex flex-col justify-center items-center font-roboto mb-8">
      <span
        className={cn(
          'uppercase tracking-wider font-semibold text-2xl text-primary',
          className,
        )}
      >
        {title}
      </span>
      {subtitle && (
        <span className="text-lg text-muted-foreground">{subtitle}</span>
      )}
    </div>
  );
};
export default SpwPageTitle;
