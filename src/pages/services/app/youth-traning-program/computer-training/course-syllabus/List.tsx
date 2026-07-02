import type {
  ICourseSyllabus,
  ICourseSyllabusList,
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
import { servicesApp } from '@/constants/api.services';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { defaultIcons, titles } from '@/constants';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<ICourseSyllabusList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead></TableHead>
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
            data?.data?.map((data: ICourseSyllabus, index) => (
              <TableRow
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppTooltip text={data.name} />
                </TableCell>
                <TableCell>
                  <a
                    href={`${titles.BASE_URL}${data.file_path}`}
                    target="_blank"
                  >
                    <defaultIcons.pdf className="w-6 h-6 text-destructive" />
                  </a>
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={servicesApp.youthTraining.compTraining.courseSyllabus.toggle(
                      Number(data.id),
                    )}
                    queryKey="comp-syllabus"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['comp-syllabus-selected'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={servicesApp.youthTraining.compTraining.courseSyllabus.delete(
                        Number(data.id),
                      )}
                      queryKey="comp-syllabus"
                      deleteQueryKey="comp-syllabus-selected"
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
