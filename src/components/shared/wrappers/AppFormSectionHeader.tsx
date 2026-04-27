import { cn } from '@/lib/utils';

const AppFormSectionHeader = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex justify-between items-center bg-muted my-6',
        className,
      )}
    >
      <div className="text-xs font-medium text-card-foreground tracking-wider uppercase p-2">
        {title}
      </div>
    </div>
  );
};
export default AppFormSectionHeader;
