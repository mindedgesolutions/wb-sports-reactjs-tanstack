import type {
  IHomepageScroller,
  IHomepageScrollerList,
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
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { servicesApp } from '@/constants/api.services';
import { defaultIcons } from '@/constants';
import dayjs from 'dayjs';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IHomepageScrollerList>) => {
  const handleView = (file_path: string, file_name: string) => {
    handleFileOpen(file_path!, file_name!);
  };

  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Attachment / Link</TableHead>
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
            data?.data?.map((data: IHomepageScroller, index: number) => {
              return (
                <TableRow
                  className="uppercase text-muted-foreground transition-all group"
                  key={data.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppTooltip text={data.title} cropLen={25} />
                  </TableCell>
                  <TableCell>
                    {data.event_date
                      ? dayjs(data.event_date).format('DD/MM/YYYY')
                      : `N/A`}
                  </TableCell>
                  <TableCell>
                    {data.type === 'link' ? (
                      <a href={data.link!} target="_blank">
                        {data.link}
                      </a>
                    ) : (
                      <defaultIcons.attachment
                        className="size-4 text-success cursor-pointer"
                        onClick={() =>
                          handleView(data.file_path!, data.file_name!)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={data.is_active}
                      api={servicesApp.banners.banners.toggle(Number(data.id))}
                      queryKey="services-homepage-scrollers"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(
                            ['services-homepage-scroller-selected'],
                            data,
                          );
                        }}
                      >
                        <HiOutlinePencilAlt className="size-4 text-warn" />
                      </Button>
                      <AppDeleteModal
                        api={servicesApp.homepageScrollers.homepageScrollers.delete(
                          Number(data.id),
                        )}
                        queryKey="services-homepage-scrollers"
                        deleteQueryKey="services-homepage-scroller-selected"
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
