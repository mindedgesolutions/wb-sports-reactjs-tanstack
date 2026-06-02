import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { achievementCategories, titles } from '@/constants';
import { usePlayersAchievementsWb } from '@/tanstack/sports/achievements-awards/achievements-awards.query';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IPlayerAchievementRow } from '@/interface/sports.interface';
import dayjs from 'dayjs';

const SpwPlayersAchievements = () => {
  document.title = `Players Achievements | ${titles.SPORTS_APP_NAME}`;
  const [selectedSport, setSelectedSport] = useState<string>(
    achievementCategories[0].value,
  );

  const { data, isLoading } = usePlayersAchievementsWb({
    sport: selectedSport ?? '',
    enabled: !!selectedSport,
  });

  return (
    <>
      <SpwPageBanner title="Players Achievements" />
      <SpwSectionWrapper className="mb-4 md:mb-8 gap-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-2">
          {achievementCategories.map((t) => {
            const isSelected = selectedSport === t.value;
            return (
              <div
                key={t.value}
                className={`
                  col-span-1 p-2 border cursor-pointer text-[10px] font-medium text-center uppercase tracking-wider flex justify-center items-center
                  ${isSelected ? 'border-primary bg-primary text-primary-foreground font-medium' : 'border'}
                `}
                onClick={() => setSelectedSport(t.value)}
              >
                {t.label}
              </div>
            );
          })}
        </div>
        {isLoading && <WbLoader />}
        <div>
          {!isLoading && (
            <div className="mt-8 max-w-7xl mx-auto">
              <Table className="text-xs font-roboto text-muted-foreground tracking-wider">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead className="min-w-40">Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Achievement Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center uppercase tracking-wider"
                      >
                        No record found
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((data: IPlayerAchievementRow, index: number) => (
                      <TableRow className="uppercase" key={data.id}>
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell className="whitespace-normal wrap-break-word leading-loose">
                          {data.description || `N/A`}
                        </TableCell>
                        <TableCell>
                          {data.achievement_date
                            ? dayjs(data.achievement_date).format('DD/MM/YYYY')
                            : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwPlayersAchievements;
