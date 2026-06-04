import { ModeToggle } from '@/components/dark-mode/mode-toggle';
import { useFontSize } from '@/contexts/FontSizeProvider';
import { Minus, Plus } from 'lucide-react';

const WbTopButtonContainer = () => {
  const { increase, decrease, reset } = useFontSize();

  return (
    <div className="mr-2 md:mr-8">
      <div className="flex flex-row justify-center items-center gap-2 rounded-md">
        <div
          className="h-5 md:h-7 w-7 md:w-9 cursor-pointer flex flex-row justify-center items-center gap-0.5 text-muted-foreground border"
          onClick={increase}
        >
          <span className="text-xs md:text-sm">A</span>
          <Plus className="size-2" />
        </div>
        <div
          className="h-5 md:h-7 w-7 md:w-9 cursor-pointer flex flex-row justify-center items-center gap-0.5 text-muted-foreground border"
          onClick={decrease}
        >
          <span className="text-xs md:text-sm">A</span>
          <Minus className="size-2" />
        </div>
        <div
          className="h-5 md:h-7 w-7 md:w-9 cursor-pointer flex flex-row justify-center items-center gap-0.5 text-muted-foreground border"
          onClick={reset}
        >
          <span className="text-xs md:text-sm">A</span>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
export default WbTopButtonContainer;
