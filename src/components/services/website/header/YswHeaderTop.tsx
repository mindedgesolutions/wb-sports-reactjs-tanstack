import { WbTopButtonContainer } from '@/components';
import { cn } from '@/lib/utils';

const YswHeaderTop = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex justify-end items-center py-0', className)}>
      <WbTopButtonContainer />
    </div>
  );
};
export default YswHeaderTop;
