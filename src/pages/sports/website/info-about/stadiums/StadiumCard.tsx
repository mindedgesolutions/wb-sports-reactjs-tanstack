import { titles } from '@/constants';
import type { IStadiumRow } from '@/interface/sports.interface';
import { useState } from 'react';
import { MdOutlineStadium } from 'react-icons/md';

const StadiumCard = (st: IStadiumRow) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col items-center min-h-48 md:min-h-64 gap-4">
      <div className="absolute -top-4 w-16 md:w-28 h-16 md:h-28 rounded-full bg-background p-0.5 md:p-1 z-10">
        <div className="w-full h-full rounded-full overflow-hidden">
          {st.cover_img && !imageError ? (
            <img
              src={`${titles.BASE_URL}${st.cover_img}`}
              alt={st.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <MdOutlineStadium className="p-2 md:p-4 w-full h-full text-muted-foreground/20" />
          )}
        </div>
      </div>
      <div className="relative w-full bg-primary/50 p-5 md:p-10 rounded-t-lg md:rounded-t-2xl"></div>
      <div className="mt-2 md:mt-2.5 flex flex-col items-center">
        <span className="text-primary min-h-10 md:h-10 text-center leading-tight md:leading-normal font-roboto font-medium md:font-semibold tracking-wider text-xs md:text-sm uppercase">
          {st.name}
        </span>
        <span className="mt-2 md:mt-4 min-h-10 md:min-h-10 text-center text-card-foreground text-xs font-roboto tracking-wider leading-4 [text-align-last:center] uppercase">
          {st.location}
        </span>
      </div>
    </div>
  );
};
export default StadiumCard;
