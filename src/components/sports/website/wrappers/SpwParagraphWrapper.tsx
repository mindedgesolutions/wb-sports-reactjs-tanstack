import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const SpwParagraphWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'text-xs md:text-sm font-roboto text-card-foreground tracking-normal md:tracking-wider leading-normal md:leading-relaxed text-justify',
        className,
      )}
    >
      {children}
    </div>
  );
};
export default SpwParagraphWrapper;
