import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AppDeleteModal,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import type { IRtiNoticeList } from '@/interface/sports.interface';
import { sportsApp } from '@/constants/api.sports';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IRtiNoticeList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Notice No.</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>From-To</TableHead>
            <TableHead></TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={7}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && data?.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No record found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((data, index) => (
              <TableRow
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>{data.notice_no}</TableCell>
                <TableCell>
                  <AppTooltip text={data.subject} cropLen={40} />
                </TableCell>
                <TableCell>
                  {data.start_date &&
                    dayjs(data.start_date).format('DD/MM/YYYY')}
                  {data.end_date &&
                    `-${dayjs(data.end_date).format('DD/MM/YYYY')}`}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={sportsApp.rti.notices.toggle(Number(data.id))}
                    queryKey="rti-notices"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(['rti-notice-selected'], data);
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={sportsApp.rti.notices.delete(Number(data.id))}
                      queryKey="rti-notices"
                      deleteQueryKey="rti-notice-selected"
                      id={data.id}
                    />
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <AppPaginationContainer
        currentPage={data?.meta?.current_page!}
        totalPages={data?.meta?.last_page!}
        onPageChange={onPageChange}
      />
    </div>
  );
};
export default List;
