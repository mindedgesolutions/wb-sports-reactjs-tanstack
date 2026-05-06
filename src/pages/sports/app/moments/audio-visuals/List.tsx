import { AppDeleteModal, AppPaginationContainer } from '@/components';
import { Button } from '@/components/ui/button';
import { sportsApp } from '@/constants/api.sports';
import type { IAudioVisualList } from '@/interface/sports.interface';
import { queryClient } from '@/tanstack/query.client';
import { getYoutubeVideoId } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const List = ({
  data,
  isLoading,
  onPageChange,
}: IListProps<IAudioVisualList>) => {
  return (
    <div>
      {!isLoading && data?.data?.length === 0 ? (
        <div>No record found</div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {data?.data?.map((data) => {
              const videoId = getYoutubeVideoId(data.video_link);

              if (!videoId) return null;

              const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

              return (
                <div className="col-span-1 w-full max-h-52 border border-dashed ">
                  <a href={data.video_link} target="_blank">
                    <img
                      src={thumbnail}
                      alt="YouTube Thumbnail"
                      className="w-full h-44 object-cover"
                    />
                  </a>
                  <span className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['audio-visual-selected'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-warn" />
                    </Button>
                    <AppDeleteModal
                      api={sportsApp.moments.audioVisuals.delete(
                        Number(data.id),
                      )}
                      queryKey="audio-visuals"
                      deleteQueryKey="audio-visual-selected"
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
