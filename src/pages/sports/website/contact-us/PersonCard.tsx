import type { IContactUsRow } from '@/interface/sports.interface';
import { icons } from '@/constants';

const PersonCard = (data: IContactUsRow) => {
  return (
    <div className="relative flex flex-col items-center min-h-48 md:min-h-64 gap-4">
      <div className="absolute -top-4 w-16 md:w-28 h-16 md:h-28 rounded-full bg-background p-0.5 md:p-1 z-10">
        <div className="w-full h-full rounded-full overflow-hidden">
          <icons.user className="w-full h-full text-muted-foreground/20" />
        </div>
      </div>
      <div className="relative w-full bg-primary/50 p-5 md:p-10 rounded-t-lg md:rounded-t-2xl"></div>
      <div className="mt-0 md:mt-2.5 flex flex-col items-center">
        <span className="text-primary min-h-10 md:min-h-auto text-center leading-tight md:leading-normal font-roboto font-semibold tracking-wider text-sm md:text-lg">
          {data.name}
        </span>
        <span className="mt-2 md:mt-4 min-h-10 md:min-h-10 text-center text-card-foreground text-xs md:text-sm font-roboto tracking-wider leading-4 [text-align-last:center]">
          {data.designation}
        </span>
        <span className="text-muted-foreground text-xs font-roboto tracking-wider">
          Govt. of West Bengal
        </span>
      </div>
    </div>
  );
};
export default PersonCard;
