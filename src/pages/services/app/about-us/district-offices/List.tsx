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
  AppListContactContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import Form from './Form';
import type { IDistrictBlockOfficeList } from '@/interface/services.interface';
import { servicesApp } from '@/constants/api.services';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IDistrictBlockOfficeList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Landline No. & Email</TableHead>
            <TableHead>Officer Info</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={8}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && data?.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No record found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((data, index) => (
              <TableRow
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>{data.district_name}</TableCell>
                <TableCell>
                  <AppTooltip text={data.name} cropLen={25} />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.address || 'N/A'} cropLen={25} />
                </TableCell>
                <TableCell>
                  <AppListContactContainer
                    contactOne={data.landline_no || null}
                    email={data.email?.toLowerCase() || null}
                  />
                </TableCell>
                <TableCell>
                  <AppListContactContainer
                    name={data.officer_name}
                    other={data.officer_designation}
                    contactOne={data.officer_mobile || null}
                  />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={servicesApp.aboutUs.districtBlockOffices.toggle(
                      Number(data.id),
                    )}
                    queryKey="district-block-offices"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Form office={data} />
                    <AppDeleteModal
                      api={servicesApp.aboutUs.districtBlockOffices.delete(
                        Number(data.id),
                      )}
                      queryKey="district-block-offices"
                      deleteQueryKey="district-block-office-selected"
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
