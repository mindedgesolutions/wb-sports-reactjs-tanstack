import { AppHandleBrokenImg } from '@/components';
import { User } from 'lucide-react';

const RootLandingCard = (mention: IHomepageMention) => {
  return (
    <div className="p-2 w-72 flex flex-col justify-start items-center rounded-xl">
      {mention.image ? (
        <span className="w-24 h-24">
          <AppHandleBrokenImg
            icon={User}
            imagePath={mention.image}
            alt={mention.name}
            className="w-full h-full object-cover rounded-full"
            size={24}
          />
        </span>
      ) : (
        <User />
      )}
      <div className="mt-6 flex flex-col justify-center items-center gap-1.5">
        <h1 className="font-roboto text-base text-primary font-bold tracking-wider">
          {mention.name}
        </h1>
        <h2 className="font-roboto text-xs text-primary font-medium tracking-wider">
          {mention.designation}
        </h2>
        <h2 className="font-roboto text-[11px] text-primary font-medium tracking-wider">
          {mention.gov}
        </h2>
      </div>
    </div>
  );
};
export default RootLandingCard;
