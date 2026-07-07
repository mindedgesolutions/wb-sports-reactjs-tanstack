import type { ICompTrainingCentreList } from '@/interface/services.interface';
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
  AppListAddressContainer,
  AppListContactContainer,
  AppListNameContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { servicesApp } from '@/constants/api.services';
import Form from './Form';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<ICompTrainingCentreList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>District</TableHead>
            <TableHead>YCTC Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Centre Incharge</TableHead>
            <TableHead>Centre Owner</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={9}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && data?.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No record found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((data, index) => {
              return (
                <TableRow
                  className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                  key={data.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>{data.district.name}</TableCell>
                  <TableCell>
                    <AppListNameContainer
                      name={data.yctc_name}
                      line_1={data.yctc_code || `N/A`}
                    />
                  </TableCell>
                  <TableCell>{data.center_category || `N/A`}</TableCell>
                  <TableCell>
                    <AppListAddressContainer
                      line_1={data.address_line_1!}
                      line_2={data.address_line_2 || undefined}
                      line_3={data.address_line_2 || undefined}
                      city={data.city || undefined}
                      pincode={data.pincode || undefined}
                    />
                  </TableCell>
                  <TableCell>
                    <AppListContactContainer
                      name={data.center_incharge_name}
                      contactOne={data.center_incharge_mobile}
                      email={data.center_incharge_email}
                    />
                  </TableCell>
                  <TableCell>
                    <AppListContactContainer
                      name={data.center_owner_name}
                      contactOne={data.center_owner_mobile}
                    />
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={data.is_active}
                      api={servicesApp.youthTraining.compTraining.trainingCentres.toggle(
                        Number(data.id),
                      )}
                      queryKey="comp-training-centres"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Form data={data} />
                      <AppDeleteModal
                        api={servicesApp.youthTraining.compTraining.trainingCentres.delete(
                          Number(data.id),
                        )}
                        queryKey="comp-training-centres"
                        deleteQueryKey="comp-training-centre-selected"
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
