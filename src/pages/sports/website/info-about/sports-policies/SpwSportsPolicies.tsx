import { SpwPageBanner, SpwSectionWrapper, WbLoader } from '@/components';
import { titles, icons } from '@/constants';
import { useSportsPoliciesWb } from '@/tanstack/sports/info-about/info-about.query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ISportsPolicyRow } from '@/interface/sports.interface';
import { handleFileOpen } from '@/utils/functions';

const SpwSportsPolicies = () => {
  document.title = `Sports Policies | ${titles.SPORTS_APP_NAME}`;

  const { data, isLoading } = useSportsPoliciesWb();

  return (
    <>
      <SpwPageBanner title="Sports Policies" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        {isLoading && <WbLoader />}
        {!isLoading && (
          <Table className="text-[10px] md:text-xs font-roboto text-muted-foreground tracking-wider">
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
                data?.map((sp: ISportsPolicyRow, index: number) => (
                  <TableRow className="uppercase" key={sp.id}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>{sp.name}</TableCell>
                    <TableCell>
                      <icons.download
                        size={20}
                        className="text-primary cursor-pointer"
                        onClick={() =>
                          handleFileOpen(
                            sp.file_path!,
                            sp.file_name ?? sp.name!,
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </SpwSectionWrapper>
    </>
  );
};
export default SpwSportsPolicies;
