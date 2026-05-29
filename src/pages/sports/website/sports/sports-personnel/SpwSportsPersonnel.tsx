import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { sportsCategories, titles } from '@/constants';
import { useSportsPersonnelWb } from '@/tanstack/sports/sports/sports.query';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ISportsPersonnelRow } from '@/interface/sports.interface';
import dayjs from 'dayjs';

const SpwSportsPersonnel = () => {
  document.title = `Sports Personnel | ${titles.SPORTS_APP_NAME}`;

  const [selectedSport, setSelectedSport] = useState<string>('football');

  const { data, isLoading } = useSportsPersonnelWb({
    sport: selectedSport ?? '',
    enabled: !!selectedSport,
  });

  return (
    <>
      <SpwPageBanner title="Sports Personnel" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8">
        <div className="grid grid-cols-8 gap-2">
          {sportsCategories.map((t) => {
            const isSelected = selectedSport === t.value;
            return (
              <div
                key={t.value}
                className={`
                  col-span-1 p-2 border cursor-pointer text-[10px] text-center uppercase tracking-wider
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
            <div className="mt-8">
              <Table className="text-[10px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Contact No.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground uppercase tracking-wider"
                      >
                        No record found
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((data: ISportsPersonnelRow, index: number) => (
                      <TableRow
                        className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                        key={data.id}
                      >
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.address || `N/A`}</TableCell>
                        <TableCell>
                          {data.dob
                            ? dayjs(data.dob).format('DD/MM/YYYY')
                            : 'N/A'}
                        </TableCell>
                        <TableCell>{data.contact_1 || `N/A`}</TableCell>
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
export default SpwSportsPersonnel;
