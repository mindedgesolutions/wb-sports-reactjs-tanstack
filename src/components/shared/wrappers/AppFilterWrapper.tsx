import { cn } from '@/lib/utils';

const AppFilterWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn('mb-3 px-2', className)}>{children}</div>;
};
export default AppFilterWrapper;
