import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { showLess } from '@/utils/functions';

const AppTooltip = ({
  text,
  cropped,
  cropLen = 20,
  className,
}: {
  text: string;
  cropped?: string;
  cropLen?: number;
  className?: string;
}) => {
  const defaultCropped = cropped ? cropped : showLess(text, cropLen);

  return (
    <Tooltip>
      <TooltipTrigger asChild className={cn(className)}>
        <span>{defaultCropped}</span>
      </TooltipTrigger>
      <TooltipContent align="start" className="max-w-80">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default AppTooltip;
