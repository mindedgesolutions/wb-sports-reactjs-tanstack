import type { IContactUsRow } from '@/interface/sports.interface';
import { defaultIcons } from '@/constants';
import { Mail, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const PersonCard = (data: IContactUsRow) => {
  return (
    <div className="relative flex flex-col items-center gap-4">
      <div className="absolute -top-4 w-16 md:w-28 h-16 md:h-28 rounded-full bg-background p-0.5 md:p-1 z-10">
        <div className="w-full h-full rounded-full overflow-hidden">
          <defaultIcons.user className="w-full h-full text-muted-foreground/20" />
        </div>
      </div>
      <div className="relative w-full bg-primary/50 p-5 md:p-10 rounded-t-lg md:rounded-t-2xl"></div>
      <div className="mt-0 md:mt-2.5 flex flex-col items-center">
        <span className="text-primary text-center leading-tight md:leading-normal font-inter font-semibold tracking-wider text-sm md:text-lg">
          {data.name}
        </span>
        <span className="mt-4 text-center text-card-foreground text-xs md:text-sm font-inter font-bold tracking-wider leading-4 [text-align-last:center]">
          {data.designation}
        </span>
        {data.address && (
          <span className="mt-4 text-center text-muted-foreground italic text-xs font-inter tracking-wider leading-4 [text-align-last:center]">
            {data.address}
          </span>
        )}
        <div className="flex flex-row justify-center items-center gap-2 md:gap-4 mt-3">
          {data.phone_1 && (
            <div className="text-xs font-inter text-muted-foreground flex flex-row justify-start items-center gap-2">
              <Phone size={12} />
              {data.phone_1}
            </div>
          )}
          {data.phone_2 && (
            <div className="h-4 text-xs text-muted-foreground font-inter flex flex-row justify-start items-center gap-2">
              <Separator
                orientation="vertical"
                className="hidden md:block bg-success mr-2"
              />
              <Phone size={12} />
              {data.phone_2}
            </div>
          )}
          {data.fax && (
            <div className="h-4 text-xs font-inter text-muted-foreground flex flex-row justify-start items-center gap-1">
              <Separator
                orientation="vertical"
                className="hidden md:block bg-success mr-2"
              />
              <Label className="text-xs font-inter">Fax:</Label>
              {data.fax}
            </div>
          )}
        </div>
        {data.email && (
          <div
            className={`text-xs font-inter text-muted-foreground flex flex-row justify-start items-center gap-2 ${data.phone_1 || data.phone_2 || data.fax ? 'mt-3' : 'mt-0'}`}
          >
            <Mail size={12} />
            {data.email}
          </div>
        )}
      </div>
    </div>
  );
};
export default PersonCard;
