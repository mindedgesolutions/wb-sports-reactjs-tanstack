import type { IAmphanPhotoList } from '@/interface/sports.interface';
import { AppDeleteModal, AppPaginationContainer } from '@/components';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { sportsApp } from '@/constants/api.sports';
import { titles } from '@/constants';

const List = ({
  data,
  isLoading,
  onPageChange,
}: IListProps<IAmphanPhotoList>) => {
  return (
    <div>
      {!isLoading && data?.data?.length === 0 ? (
        <div className="text-xs text-muted-foreground">No record found</div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {data?.data?.map((data) => {
              return (
                <div className="col-span-1 w-full max-h-52 border border-dashed ">
                  <img
                    src={`${titles.BASE_URL}${data.image_path}`}
                    alt={data.title}
                    className="w-full h-44 object-cover"
                  />
                  <span className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['amphan-photo-selected'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={sportsApp.moments.amphanPhotos.delete(
                        Number(data.id),
                      )}
                      queryKey="amphan-photos"
                      deleteQueryKey="amphan-photo-selected"
                      id={data.id}
                    />
                  </span>
                </div>
              );
            })}
          </div>
          <AppPaginationContainer
            currentPage={data?.meta?.current_page!}
            totalPages={data?.meta?.last_page!}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
export default List;
