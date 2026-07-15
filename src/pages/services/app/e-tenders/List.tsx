import type { IEtender, IEtenderList } from '@/interface/services.interface';
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
import { defaultIcons } from '@/constants';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { queryClient } from '@/tanstack/query.client';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IEtenderList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Tender Date</TableHead>
            <TableHead>Attachment</TableHead>
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
            data?.data?.map((data: IEtender, index) => {
              const handleView = (path: string, name: string) => {
                handleFileOpen(path, name);
              };

              return (
                <TableRow
                  className="uppercase text-muted-foreground transition-all"
                  key={data.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppTooltip text={data.name} cropLen={30} />
                  </TableCell>
                  <TableCell>
                    {data.tender_date
                      ? dayjs(data.tender_date).format('DD/MM/YYYY')
                      : `N/A`}
                  </TableCell>
                  <TableCell>
                    {data && data.file_path ? (
                      <Button
                        type="button"
                        size={'xs'}
                        variant={'ghost'}
                        onClick={() =>
                          handleView(data.file_path!, data.file_name!)
                        }
                      >
                        <defaultIcons.attachment className="size-4 text-success cursor-pointer" />
                      </Button>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={data.is_active}
                      api={servicesApp.eTenders.eTenders.toggle(
                        Number(data.id),
                      )}
                      queryKey="services-e-tenders"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(
                            ['services-e-tender-selected'],
                            data,
                          );
                        }}
                      >
                        <defaultIcons.edit className="size-4 text-warn" />
                      </Button>
                      <AppDeleteModal
                        api={servicesApp.eTenders.eTenders.delete(
                          Number(data.id),
                        )}
                        queryKey="services-e-tenders"
                        deleteQueryKey="services-e-tender-selected"
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
