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
  AppListImageContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import type { IAssociationList } from '@/interface/sports.interface';
import { sportsApp } from '@/constants/api.sports';
import Form from './Form';
import { HiOutlineBuildingLibrary } from 'react-icons/hi2';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IAssociationList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Assoc. Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact Info</TableHead>
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
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((data, index) => (
              <TableRow
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppListImageContainer
                    img={data.logo || undefined}
                    defaultImg={HiOutlineBuildingLibrary}
                    first={data.name}
                    showSecond={false}
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.address || 'N/A'} cropLen={40} />
                </TableCell>
                <TableCell>
                  <AppListContactContainer
                    contactOne={data.phone_1 || null}
                    contactTwo={data.phone_2 || null}
                    fax={data.fax || null}
                    email={data.email || null}
                  />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={sportsApp.infoAbout.associations.toggle(
                      Number(data.id),
                    )}
                    queryKey="associations"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Form assoc={data} />
                    <AppDeleteModal
                      api={sportsApp.infoAbout.associations.delete(
                        Number(data.id),
                      )}
                      queryKey="associations"
                      deleteQueryKey="association-selected"
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
