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
  AppHandleBrokenImg,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import type { IBannerList } from '@/interface/services.interface';
import { servicesApp } from '@/constants/api.services';
import { defaultIcons } from '@/constants';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IBannerList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead></TableHead>
            <TableHead>Page Title</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && data?.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No record found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((data, index) => {
              return (
                <TableRow
                  className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                  key={data.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppHandleBrokenImg
                      imagePath={data.image_path}
                      icon={defaultIcons.banner}
                      alt={data.page_title}
                      className="w-32 h-auto"
                      size={24}
                    />
                  </TableCell>
                  <TableCell>
                    <AppTooltip text={data.page_title} cropLen={40} />
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={data.is_active}
                      api={servicesApp.banners.banners.toggle(Number(data.id))}
                      queryKey="page-banners"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(
                            ['page-banner-selected'],
                            data,
                          );
                        }}
                      >
                        <HiOutlinePencilAlt className="size-4 text-warn" />
                      </Button>
                      <AppDeleteModal
                        api={servicesApp.banners.banners.delete(
                          Number(data.id),
                        )}
                        queryKey="page-banners"
                        deleteQueryKey="page-banner-selected"
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
