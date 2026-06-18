import { ModeToggle } from '@/components/dark-mode/mode-toggle';
import { useFontSize } from '@/contexts/FontSizeProvider';
import { Minus, Plus } from 'lucide-react';

const WbTopButtonContainer = () => {
  const { increase, decrease, reset } = useFontSize();

  return (
    <div className="mr-2 md:mr-8">
      <div className="flex flex-row justify-center items-center gap-2 rounded-md">
        <div
          className="py-0.5 w-8 border cursor-pointer flex flex-row justify-center items-center gap-0.5 hover:bg-card"
          onClick={increase}
        >
          <span className="text-xs">A</span>
          <Plus size={8} />
        </div>
        <div
          className="py-0.5 w-8 border cursor-pointer flex flex-row justify-center items-center gap-0.5 hover:bg-card"
          onClick={decrease}
        >
          <span className="text-xs">A</span>
          <Minus size={8} />
        </div>
        <div
          className="py-0.5 w-8 border cursor-pointer flex flex-row justify-center items-center gap-0.5 hover:bg-card"
          onClick={reset}
        >
          <span className="text-xs">A</span>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
export default WbTopButtonContainer;
