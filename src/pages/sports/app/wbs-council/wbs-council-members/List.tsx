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
import type { IWbsCouncilList } from '@/interface/sports.interface';
import { sportsApp } from '@/constants/api.sports';
import { wbsCommitteeTypes } from '@/constants';
import Form from './Form';
import { User } from 'lucide-react';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IWbsCouncilList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Committee</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Contact Info</TableHead>
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
                  {wbsCommitteeTypes.find((type) => type.value === data.type)
                    ?.label || 'N/A'}
                </TableCell>
                <TableCell>
                  <AppListImageContainer
                    img={data.image_path || undefined}
                    defaultImg={User}
                    first={data.name}
                    second={data.designation_label || undefined}
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.designation_name} cropLen={40} />
                </TableCell>
                <TableCell>
                  <AppListContactContainer
                    contactOne={data.phone || null}
                    contactTwo={data.fax || null}
                    email={data.email || null}
                  />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={sportsApp.wbsCouncil.toggle(Number(data.id))}
                    queryKey="wbs-council"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Form member={data} />
                    <AppDeleteModal
                      api={sportsApp.wbsCouncil.delete(Number(data.id))}
                      queryKey="wbs-council"
                      deleteQueryKey="wbs-council-selected"
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
