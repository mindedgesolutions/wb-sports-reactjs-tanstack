import type {
  INewsEvents,
  INewsEventsList,
} from '@/interface/services.interface';
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
import { handleFileOpen, serialNo } from '@/utils/functions';
import { servicesApp } from '@/constants/api.services';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { defaultIcons } from '@/constants';
import dayjs from 'dayjs';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<INewsEventsList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead></TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={6}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && data?.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No record found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((data: INewsEvents, index) => {
              const handleView = () => {
                handleFileOpen(data.file_path!, data.file_name!);
              };

              return (
                <TableRow
                  className="uppercase text-muted-foreground transition-all"
                  key={data.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppTooltip text={data.title} />
                  </TableCell>
                  <TableCell>
                    {dayjs(data.event_date).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      size={'xs'}
                      variant={'ghost'}
                      onClick={handleView}
                    >
                      <defaultIcons.attachment className="size-4 text-success cursor-pointer" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={data.is_active}
                      api={servicesApp.newsEvents.newsEvents.toggle(
                        Number(data.id),
                      )}
                      queryKey="news-events"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(
                            ['news-event-selected'],
                            data,
                          );
                        }}
                      >
                        <HiOutlinePencilAlt className="size-4 text-warn" />
                      </Button>
                      <AppDeleteModal
                        api={servicesApp.newsEvents.newsEvents.delete(
                          Number(data.id),
                        )}
                        queryKey="news-events"
                        deleteQueryKey="news-event-selected"
                        id={data.id}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              );
            })
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
