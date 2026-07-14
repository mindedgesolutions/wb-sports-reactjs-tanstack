import type {
  IFairProgramme,
  IFairProgrammeList,
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
  AppAvatarMultiple,
  AppDeleteModal,
  AppListImageContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { servicesApp } from '@/constants/api.services';
import { defaultIcons, titles } from '@/constants';
import dayjs from 'dayjs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import View from './View';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IFairProgrammeList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Images</TableHead>
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
            data?.data?.map((data: IFairProgramme, index) => (
              <TableRow
                className="uppercase text-muted-foreground transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppListImageContainer
                    img={data.cover_image}
                    first={data.title}
                    defaultImg={defaultIcons.photoGallery}
                    cropLen={100}
                  />
                </TableCell>
                <TableCell>
                  {data.event_date
                    ? dayjs(data.event_date).format('DD/MM/YYYY')
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <AppAvatarMultiple
                    images={data.images}
                    imgCount={data.images_count}
                  />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={servicesApp.fairProgrammes.fairProgrammes.toggle(
                      Number(data.id),
                    )}
                    queryKey="fair-programs"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <View id={data.id} />
                    <Link
                      to={`${titles.SERVICES_APP_URL}/fair-programmes/fair-programme/${data.id}`}
                    >
                      <Button variant="ghost" size={'icon-xs'}>
                        <HiOutlinePencilAlt className="size-4 text-warn" />
                      </Button>
                    </Link>
                    <AppDeleteModal
                      api={servicesApp.fairProgrammes.fairProgrammes.delete(
                        Number(data.id),
                      )}
                      queryKey="fair-programs"
                      deleteQueryKey="fair-programme-selected"
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
