import type { IHomepageSliderList } from '@/interface/sports.interface';
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
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { sportsApp } from '@/constants/api.sports';
import { titles } from '@/constants';
import dayjs from 'dayjs';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IHomepageSliderList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead></TableHead>
            <TableHead>Last Updated</TableHead>
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
            data?.data?.map((data, index) => (
              <TableRow
                className="uppercase text-muted-foreground"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <div className="w-28">
                    <img
                      src={`${titles.BASE_URL}${data.image_path}`}
                      alt={data.image_path}
                      className="w-full bg-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  {dayjs(data.updated_at).format(`DD/MM/YYYY`)}
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={sportsApp.homepageSliders.homepageSliders.toggle(
                      Number(data.id),
                    )}
                    queryKey="homepage-sliders"
                  />
                </TableCell>
                <TableCell>
                  <AppDeleteModal
                    api={sportsApp.homepageSliders.homepageSliders.delete(
                      Number(data.id),
                    )}
                    deleteQueryKey="homepage-slider-selected"
                    queryKey="homepage-sliders"
                    id={data.id}
                  />
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
