import { cn } from '@/lib/utils';

const AppBodyWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('p-1', className)}>{children}</div>;
};
export default AppBodyWrapper;
