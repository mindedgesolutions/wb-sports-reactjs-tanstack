import type {
  IYouthHostel,
  IYouthHostelList,
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
  AppListContactContainer,
  AppListImageContainer,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { defaultIcons, titles } from '@/constants';
import { servicesApp } from '@/constants/api.services';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Bus, Plane, Train } from 'lucide-react';
import View from './View';

const List = ({
  data,
  isLoading,
  page,
  onPageChange,
}: IListProps<IYouthHostelList>) => {
  return (
    <div>
      <Table className="text-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Accommodation</TableHead>
            <TableHead>Transportation</TableHead>
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
            data?.data?.map((data: IYouthHostel, index) => (
              <TableRow
                className="uppercase text-muted-foreground transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppListImageContainer
                    img={data.hostel_img}
                    first={data.name}
                    defaultImg={defaultIcons.building}
                    cropLen={100}
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip text={data.address || 'N/A'} cropLen={25} />
                </TableCell>
                <TableCell>
                  <AppListContactContainer
                    contactOne={data.phone_1}
                    contactTwo={data.phone_2}
                    email={data.email}
                  />
                </TableCell>
                <TableCell>
                  {!data.accommodation ? (
                    <p className="na">NA</p>
                  ) : (
                    <ol className="list-disc list-inside">
                      {data.accommodation?.split(',').map((item) => (
                        <li key={item}>
                          <AppTooltip text={item} cropLen={25} />
                        </li>
                      ))}
                    </ol>
                  )}
                </TableCell>
                <TableCell>
                  {data.railway_station && (
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Train className="size-3.5" />
                      <AppTooltip text={data.railway_station} cropLen={20} />
                    </div>
                  )}
                  {data.bus_stop && (
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Bus className="size-3.5" />
                      <p>
                        <AppTooltip text={data.bus_stop} cropLen={20} />
                      </p>
                    </div>
                  )}
                  {data.airport && (
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Plane className="size-3.5" />
                      <AppTooltip text={data.airport ?? 'NA'} cropLen={20} />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.is_active}
                    api={servicesApp.youthHostels.youthHostels.toggle(
                      Number(data.id),
                    )}
                    queryKey="youth-hostels"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <View data={data} />
                    <Link
                      to={`${titles.SERVICES_APP_URL}/youth-hostels/youth-hostel/${data.id}`}
                    >
                      <Button variant="ghost" size={'icon-xs'}>
                        <HiOutlinePencilAlt className="size-4 text-warn" />
                      </Button>
                    </Link>
                    <AppDeleteModal
                      api={servicesApp.youthHostels.youthHostels.delete(
                        Number(data.id),
                      )}
                      queryKey="youth-hostels"
                      deleteQueryKey="youth-hostel"
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
