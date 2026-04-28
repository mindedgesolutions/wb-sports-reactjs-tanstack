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
  AppListImageContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import type { IFifaGalleryList } from '@/interface/sports.interface';
import { sportsApp } from '@/constants/api.sports';
import { Link } from 'react-router-dom';
import { titles } from '@/constants';
import { MdOutlineStadium } from 'react-icons/md';
import dayjs from 'dayjs';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IFifaGalleryList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Gallery Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Event Date</TableHead>
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
                    img={data?.first_photo?.image_path}
                    defaultImg={MdOutlineStadium}
                    first={data.name}
                    showSecond={false}
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.description || `N/A`} cropLen={30} />
                </TableCell>
                <TableCell>
                  {data.event_date
                    ? dayjs(data.event_date).format(`DD/MM/YYYY`)
                    : `N/A`}
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={sportsApp.infoAbout.fifa.toggle(Number(data.id))}
                    queryKey="fifa-galleries"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Link
                      to={`${titles.SPORTS_APP_URL}/info-about/fifa/${data.id}`}
                    >
                      <Button variant="ghost" size={'icon-xs'}>
                        <HiOutlinePencilAlt className="size-4 text-warn" />
                      </Button>
                    </Link>
                    <AppDeleteModal
                      api={sportsApp.infoAbout.fifa.delete(Number(data.id))}
                      queryKey="fifa-galleries"
                      deleteQueryKey="fifa-gallery-selected"
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
