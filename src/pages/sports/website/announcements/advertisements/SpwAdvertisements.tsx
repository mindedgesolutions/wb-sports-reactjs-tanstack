import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles } from '@/constants';
import { useAdvertisementsWb } from '@/tanstack/sports/announcements/announcements.query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IAdvertisementRow } from '@/interface/sports.interface';
import { icons } from '@/constants';
import { handleFileOpen } from '@/utils/functions';

const SpwAdvertisements = () => {
  document.title = `Advertisements | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useAdvertisementsWb();

  return (
    <>
      <SpwPageBanner title="Advertisements" />
      <SpwSectionWrapper className="max-w-7xl mx-auto min-h-80">
        {isLoading && <WbLoader />}
        <div>
          {!isLoading && (
            <div className="mt-8">
              <Table className="text-[10px] md:text-xs font-inter text-muted-foreground tracking-wider">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center uppercase tracking-wider"
                      >
                        No record found
                      </TableCell>
                    </TableRow>
                  ) : (
                    data?.map((a: IAdvertisementRow, index: number) => (
                      <TableRow className="uppercase" key={a.id}>
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell className="whitespace-normal wrap-break-word">
                          {a.title}
                        </TableCell>
                        <TableCell>
                          <icons.download
                            size={20}
                            className="text-primary cursor-pointer"
                            onClick={() =>
                              handleFileOpen(
                                data.file_path!,
                                data.file_name ?? data.subject!,
                              )
                            }
                          />
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
export default SpwAdvertisements;
