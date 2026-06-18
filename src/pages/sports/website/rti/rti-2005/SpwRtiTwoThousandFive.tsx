import { SpwPageBanner, SpwSectionWrapper } from '@/components';
import { titles, icons } from '@/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const relativePath = `../../../../../../sports`;

const SpwRtiTwoThousandFive = () => {
  document.title = `RTI Act 2005 | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="RTI Act 2005" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 gap-8 min-h-80">
        <div>
          <Table className="text-[10px] md:text-xs font-inter text-muted-foreground tracking-wider">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead></TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="uppercase">
                <TableCell>1.</TableCell>
                <TableCell>RTI Act, 2005 (Amended) - English Version</TableCell>
                <TableCell>
                  <a
                    href={`${relativePath}/rti act, 2005 (amended)-english version.pdf`}
                    target="_blank"
                  >
                    <icons.download
                      size={20}
                      className="text-primary cursor-pointer"
                    />
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwRtiTwoThousandFive;
