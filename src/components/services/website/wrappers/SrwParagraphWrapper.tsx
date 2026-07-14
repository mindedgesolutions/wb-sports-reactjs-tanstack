import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const SrwParagraphWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'text-sm font-inter text-card-foreground tracking-wider leading-relaxed text-justify',
        className,
      )}
    >
      {children}
    </div>
  );
};
export default SrwParagraphWrapper;
