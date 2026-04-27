import { cn } from '@/lib/utils';

const AppPageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('p-2 pt-0', className)}>{children}</div>;
};
export default AppPageWrapper;
