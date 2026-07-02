import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { defaultIcons } from '@/constants';
import { cn } from '@/lib/utils';

const AppModalTooltip = ({
  label,
  instructions,
  className,
}: {
  label: string;
  instructions: string[];
  className?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild className={cn(className)}>
        <span className="flex gap-2 items-center">
          <span className={cn(className)}>{label}</span>{' '}
          <defaultIcons.info className="w-3.5 h-3.5" />
        </span>
      </TooltipTrigger>
      <TooltipContent align="start" className="max-w-80">
        <ol className="list-disc list-outside pl-4 space-y-1">
          {instructions.map((i) => (
            <li key={i} className="font-medium text-card">
              {i}
            </li>
          ))}
        </ol>
      </TooltipContent>
    </Tooltip>
  );
};
export default AppModalTooltip;
