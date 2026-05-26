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
        'text-base font-roboto text-card-foreground tracking-wider leading-relaxed text-justify',
        className,
      )}
    >
      {children}
    </div>
  );
};
export default SpwParagraphWrapper;
