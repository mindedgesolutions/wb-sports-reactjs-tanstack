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
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import type { IPhotoGalleryList } from '@/interface/sports.interface';
import { sportsApp } from '@/constants/api.sports';
import { Link } from 'react-router-dom';
import { titles } from '@/constants';
import { MdOutlineStadium } from 'react-icons/md';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IPhotoGalleryList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Gallery Title</TableHead>
            <TableHead>No. of Img.</TableHead>
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
                className="uppercase text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppListImageContainer
                    img={data.cover_img || undefined}
                    defaultImg={MdOutlineStadium}
                    first={data.title}
                    showSecond={false}
                  />
                </TableCell>
                <TableCell>{data.photos_count}</TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={sportsApp.moments.photoGalleries.toggle(
                      Number(data.id),
                    )}
                    queryKey="photo-galleries"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Link
                      to={`${titles.SPORTS_APP_URL}/moments/gallery/${data.id}`}
                    >
                      <Button variant="ghost" size={'icon-xs'}>
                        <HiOutlinePencilAlt className="size-4 text-warn" />
                      </Button>
                    </Link>
                    <AppDeleteModal
                      api={sportsApp.moments.photoGalleries.delete(
                        Number(data.id),
                      )}
                      queryKey="photo-galleries"
                      deleteQueryKey="photo-gallery-selected"
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
