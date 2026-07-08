import type {
  IMountainGeneralBody,
  IMountainGeneralBodyList,
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
  AppListNameContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { servicesApp } from '@/constants/api.services';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IMountainGeneralBodyList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
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
            data?.data?.map((data: IMountainGeneralBody, index) => (
              <TableRow
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppListNameContainer
                    name={data.name}
                    line_1={data.designation || `N/A`}
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.description} cropLen={30} />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['mountain-general-body-selected'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={servicesApp.mountaineering.gbMembers.delete(
                        Number(data.id),
                      )}
                      queryKey="mountain-general-bodies"
                      deleteQueryKey="mountain-general-body-selected"
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
