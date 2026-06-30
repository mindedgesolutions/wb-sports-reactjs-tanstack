import type { IOrgChart, IOrgChartList } from '@/interface/services.interface';
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
  AppListImageContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { User } from 'lucide-react';
import { servicesApp } from '@/constants/api.services';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IOrgChartList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
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
            data?.data?.map((data: IOrgChart, index) => (
              <TableRow
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppListImageContainer
                    img={data.image_path || undefined}
                    defaultImg={User}
                    first={data.name}
                    showSecond={true}
                    second={data.rank || undefined}
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.designation ?? 'N/A'} cropLen={40} />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={servicesApp.aboutUs.orgChart.toggle(Number(data.id))}
                    queryKey="org-chart"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(['org-chart-selected'], data);
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={servicesApp.aboutUs.orgChart.delete(Number(data.id))}
                      queryKey="org-chart"
                      additionalQueryKeys={['org-chart-all']}
                      deleteQueryKey="org-chart-selected"
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
