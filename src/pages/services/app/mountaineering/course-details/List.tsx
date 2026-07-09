import type {
  IMountainCourse,
  IMountainCourseList,
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
import View from './View';
import Form from './Form';
import { defaultIcons } from '@/constants';
import { Button } from '@/components/ui/button';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IMountainCourseList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>No. of Courses</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Age Group</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Course Fee</TableHead>
            <TableHead>Attachment</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={10}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && data?.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No record found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((data: IMountainCourse, index) => {
              const handleView = (path: string, name: string) => {
                handleFileOpen(path, name);
              };

              return (
                <TableRow
                  className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                  key={data.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppTooltip text={data.name} cropLen={30} />
                  </TableCell>
                  <TableCell>{data.courses_count}</TableCell>
                  <TableCell>{data.duration} days</TableCell>
                  <TableCell>
                    {data.age_group_start} - {data.age_group_end} years
                  </TableCell>
                  <TableCell>
                    <AppTooltip text={data.remarks || `N/A`} cropLen={25} />
                  </TableCell>
                  <TableCell>{data.course_fee || `N/A`}</TableCell>
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
                      api={servicesApp.mountaineering.courseDetails.toggle(
                        Number(data.id),
                      )}
                      queryKey="mountain-courses"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <View data={data} />
                      <Form course={data} />
                      <AppDeleteModal
                        api={servicesApp.mountaineering.courseDetails.delete(
                          Number(data.id),
                        )}
                        queryKey="mountain-courses"
                        deleteQueryKey="mountain-course-selected"
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
