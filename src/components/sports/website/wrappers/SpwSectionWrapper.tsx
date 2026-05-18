import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const SpwSectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn('p-4', className)}>{children}</div>;
};
export default SpwSectionWrapper;
