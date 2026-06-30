import type {
  ICompCourseDetails,
  ICompCourseDetailsList,
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
import { serialNo } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { IndianRupee } from 'lucide-react';
import { servicesApp } from '@/constants/api.services';
import View from './View';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<ICompCourseDetailsList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Fees</TableHead>
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
            data?.data?.map((data: ICompCourseDetails, index) => (
              <TableRow
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppTooltip text={data.course_type} />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.course_name} cropLen={30} />
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-0.5">
                    <IndianRupee className="h-2.5 w-2.5" />
                    {data.course_fees}
                  </span>
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={servicesApp.youthTraining.compTraining.courseDetails.toggle(
                      Number(data.id),
                    )}
                    queryKey="comp-course-details"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <View data={data} />
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['comp-course-details-selected'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={servicesApp.youthTraining.compTraining.courseDetails.delete(
                        Number(data.id),
                      )}
                      queryKey="comp-course-details"
                      deleteQueryKey="comp-course-details-selected"
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
