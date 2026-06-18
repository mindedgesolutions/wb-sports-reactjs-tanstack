import {
  SpwPageBanner,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
  WbLoader,
} from '@/components';
import { titles } from '@/constants';
import type {
  IWbsCouncilRow,
  IWbsDesignationRow,
} from '@/interface/sports.interface';
import {
  useAdvisoryBoardWb,
  useWbsDesignationsWb,
} from '@/tanstack/sports/wbs-council/wbs-council.query';

const SpwAdvisoryBoard = () => {
  document.title = `Advisory Board | ${titles.SPORTS_APP_NAME}`;

  const { data: designations, isLoading: dLoading } = useWbsDesignationsWb({
    type: 'advisory-board',
  }) as { data: IWbsDesignationRow[]; isLoading: boolean };

  const { data, isLoading } = useAdvisoryBoardWb() as {
    data: IWbsCouncilRow[];
    isLoading: boolean;
  };

  return (
    <>
      <SpwPageBanner title="Advisory Board" />
      {dLoading && <WbLoader />}
      <SpwSectionWrapper className="max-w-7xl mx-auto w-full">
        {designations?.map((d: IWbsDesignationRow) => {
          const count = data?.filter((f) => f.designation_id === d.id)?.length;
          return (
            count > 0 && (
              <SpwSectionWrapper key={d.designation}>
                <SpwSectionTitleWrapper
                  title={d.designation}
                  className="-mb-4"
                />
                {isLoading && <WbLoader />}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-start">
                  {data
                    .filter((f) => f.designation_id === d.id)
                    .map((d) => (
                      <ol
                        className="list-disc md:text-base marker:text-primary marker:text-2xl list-inside"
                        key={d.id}
                      >
                        <li className="font-inter text-xs md:text-sm tracking-wider">
                          {d.name}
                        </li>
                      </ol>
                    ))}
                </div>
              </SpwSectionWrapper>
            )
          );
        })}
      </SpwSectionWrapper>
    </>
  );
};
export default SpwAdvisoryBoard;
