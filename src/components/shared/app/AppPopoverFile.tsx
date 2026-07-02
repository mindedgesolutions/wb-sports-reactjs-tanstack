import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { defaultIcons } from '@/constants';

const AppPopoverFile = ({ instructions }: { instructions: string[] }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <defaultIcons.info className="w-3.5 h-3.5 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-60 rounded-sm" align="end">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="leading-none font-semibold text-xs mb-2">
              Instructions
            </h4>
            <ol className="list-disc list-outside pl-4 space-y-1">
              {instructions.map((i) => (
                <li
                  key={i}
                  className="text-[10px] font-medium text-muted-foreground"
                >
                  {i}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default AppPopoverFile;
