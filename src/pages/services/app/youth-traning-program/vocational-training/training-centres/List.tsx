import type {
  IVocTrainingCentre,
  IVocTrainingCentreList,
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
import { servicesApp } from '@/constants/api.services';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IVocTrainingCentreList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Centre Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone No.</TableHead>
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
            data?.data?.map((data: IVocTrainingCentre, index) => (
              <TableRow
                className="uppercase text-muted-foreground transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>{data.district_name}</TableCell>
                <TableCell>
                  <AppTooltip text={data.name_of_centre} cropLen={25} />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.address} cropLen={25} />
                </TableCell>
                <TableCell>{data.phone || `N/A`}</TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={servicesApp.youthTraining.vocTraining.trainingCentres.toggle(
                      Number(data.id),
                    )}
                    queryKey="voc-training-centres"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['voc-training-centre-selected'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={servicesApp.youthTraining.vocTraining.trainingCentres.delete(
                        Number(data.id),
                      )}
                      queryKey="voc-training-centres"
                      deleteQueryKey="voc-training-centre-selected"
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
