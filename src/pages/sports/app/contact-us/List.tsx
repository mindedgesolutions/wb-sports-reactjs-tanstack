import type { IContactUsList } from '@/interface/sports.interface';
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
import { sportsApp } from '@/constants/api.sports';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IContactUsList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
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
                <TableCell>
                  <AppTooltip text={data.name} cropLen={40} />
                </TableCell>
                <TableCell>
                  {data.email ? (
                    <span className="lowercase text-xs">{data.email}</span>
                  ) : (
                    `N/A`
                  )}
                </TableCell>
                <TableCell>
                  <AppListContactContainer
                    contactOne={data.phone_1}
                    contactTwo={data.phone_2}
                  />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={sportsApp.contactUs.contactUs.toggle(Number(data.id))}
                    queryKey="contact-us"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(['contact-us-selected'], data);
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={sportsApp.contactUs.contactUs.delete(
                        Number(data.id),
                      )}
                      deleteQueryKey="contact-us-selected"
                      queryKey="contact-us"
                      additionalQueryKeys={['contact-us-all']}
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
