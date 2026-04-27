import { cn } from '@/lib/utils';

const AppTotalRecord = ({
  className,
  count = 1,
}: {
  className?: string;
  count: number;
}) => {
  return (
    <div className={cn('text-xs tracking-wider p-1.5', className)}>
      {count} records found
    </div>
  );
};
export default AppTotalRecord;
