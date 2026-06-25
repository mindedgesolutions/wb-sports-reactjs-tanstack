import type { IAssociationRow } from '@/interface/sports.interface';
import { defaultIcons } from '@/constants';
import { AppHandleBrokenImg } from '@/components';

const AssociationCard = (assoc: IAssociationRow) => {
  return (
    <div className="p-1 md:p-2 grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="col-span-1 flex justify-center items-center">
        {assoc.logo ? (
          <AppHandleBrokenImg
            icon={defaultIcons.building}
            imagePath={assoc.logo}
            alt={assoc.name}
            iconContainerClass="rounded-full overflow-hidden bg-muted p-4"
            iconClass="w-full min-h-12 h-full text-muted-foreground/20"
          />
        ) : (
          <div className="rounded-full overflow-hidden bg-muted p-4">
            <defaultIcons.building className="w-full min-h-12 h-full text-muted-foreground/20" />
          </div>
        )}
      </div>
      <div className="col-span-4 flex flex-col gap-4">
        <h1 className="text-sm font-inter tracking-wider font-medium uppercase text-primary">
          {assoc.name}
        </h1>
        <div className="flex flex-col gap-4">
          <span className="flex flex-row items-center gap-2">
            <defaultIcons.location />
            <p className="text-xs font-inter tracking-wider font-normal uppercase">
              {assoc.address || `N/A`}
            </p>
          </span>
          {(assoc.phone_1 || assoc.phone_2) && (
            <div className="flex flex-col gap-2 text-xs font-inter tracking-wider font-normal uppercase">
              {assoc.phone_1 && (
                <span className="flex flex-row justify-start items-center gap-2">
                  <defaultIcons.phone />
                  <span>{assoc.phone_1}</span>
                </span>
              )}
              {assoc.phone_2 && (
                <span className="flex flex-row justify-start items-center gap-2">
                  <defaultIcons.phone />
                  <span>{assoc.phone_2}</span>
                </span>
              )}
            </div>
          )}
          {assoc.email && (
            <span className="flex flex-row justify-start items-center gap-2">
              <defaultIcons.email />
              <span className="text-xs font-inter tracking-wider font-normal">
                {assoc.email}
              </span>
            </span>
          )}
          {assoc.website && (
            <span className="flex flex-row justify-start items-center gap-2 hover:text-primary-muted">
              <defaultIcons.internet />
              <a
                href={assoc.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-inter tracking-wider font-normal"
              >
                <span>{assoc.website}</span>
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default AssociationCard;
