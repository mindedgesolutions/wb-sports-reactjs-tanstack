import { WbTopButtonContainer } from '@/components';
import { cn } from '@/lib/utils';

const SpwHeaderTop = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex justify-end items-center py-0.5', className)}>
      <WbTopButtonContainer />
    </div>
  );
};
export default SpwHeaderTop;
