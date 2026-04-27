import { titles } from '@/constants';
import AppTooltip from './AppTooltip';
import { useState } from 'react';

type AppListImageContainerProps = {
  img?: string | undefined;
  defaultImg: React.ElementType;
  first: string;
  showSecond?: boolean;
  second?: string;
  showThird?: boolean;
  third?: string;
};

const AppListImageContainer = ({
  img,
  defaultImg: NoImg,
  first,
  showSecond = true,
  second,
  third,
}: AppListImageContainerProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex justify-start items-center gap-2">
      <div className="w-12 h-12">
        {img && !hasError ? (
          <img
            src={`${titles.BASE_URL}${img}`}
            alt={first}
            className="w-full h-full border border-dashed object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <NoImg className="size-6 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium tracking-wide">
          <AppTooltip text={first} cropLen={30} />
        </span>
        <div className="flex flex-col gap-0.5">
          {showSecond && (
            <>
              {second ? (
                <span className="font-light italic">
                  <AppTooltip text={second} cropLen={30} />
                </span>
              ) : (
                'N/A'
              )}
            </>
          )}
          {third && (
            <span className="font-light italic">
              <AppTooltip text={third} cropLen={30} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default AppListImageContainer;
