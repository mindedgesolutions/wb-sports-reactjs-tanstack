import type { IAssociationRow } from '@/interface/sports.interface';
import { useState } from 'react';
import { icons } from '@/constants';

const AssociationCard = (assoc: IAssociationRow) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <div className="p-1 md:p-2 grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="col-span-1 flex justify-center items-center">
        {!imageError && assoc.logo ? (
          <img
            src={assoc.logo}
            alt={assoc.name}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="rounded-full overflow-hidden bg-muted p-4">
            <icons.building className="w-full min-h-12 h-full text-muted-foreground/20" />
          </div>
        )}
      </div>
      <div className="col-span-4 flex flex-col gap-4">
        <h1 className="text-sm font-roboto tracking-wider font-medium uppercase text-primary">
          {assoc.name}
        </h1>
        <div className="flex flex-col gap-4">
          <span className="flex flex-row items-center gap-2">
            <icons.location />
            <p className="text-xs font-roboto tracking-wider font-normal uppercase">
              {assoc.address || `N/A`}
            </p>
          </span>
          {(assoc.phone_1 || assoc.phone_2) && (
            <div className="flex flex-col gap-2 text-xs font-roboto tracking-wider font-normal uppercase">
              {assoc.phone_1 && (
                <span className="flex flex-row justify-start items-center gap-2">
                  <icons.phone />
                  <span>{assoc.phone_1}</span>
                </span>
              )}
              {assoc.phone_2 && (
                <span className="flex flex-row justify-start items-center gap-2">
                  <icons.phone />
                  <span>{assoc.phone_2}</span>
                </span>
              )}
            </div>
          )}
          {assoc.email && (
            <span className="flex flex-row justify-start items-center gap-2">
              <icons.email />
              <span className="text-xs font-roboto tracking-wider font-normal">
                {assoc.email}
              </span>
            </span>
          )}
          {assoc.website && (
            <span className="flex flex-row justify-start items-center gap-2 hover:text-primary-muted">
              <icons.internet />
              <a
                href={assoc.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-roboto tracking-wider font-normal"
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
