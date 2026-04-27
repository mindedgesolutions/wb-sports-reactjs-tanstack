import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { showLess } from '@/utils/functions';

const AppTooltip = ({
  text,
  cropped,
  cropLen = 20,
}: {
  text: string;
  cropped?: string;
  cropLen?: number;
}) => {
  const defaultCropped = cropped ? cropped : showLess(text, cropLen);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{defaultCropped}</span>
      </TooltipTrigger>
      <TooltipContent align="start" className="max-w-80">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default AppTooltip;
