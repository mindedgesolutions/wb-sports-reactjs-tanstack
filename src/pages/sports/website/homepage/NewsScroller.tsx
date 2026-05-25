import { Marquee } from '@/components/ui/marquee';
import { icons } from '@/constants';
import type { INewsScrollerRow } from '@/interface/sports.interface';
import { useNewsScrollerWb } from '@/tanstack/sports/news-scroller/news-scroller.query';

const ReviewCard = ({
  title,
  file_path,
}: {
  title: string;
  file_path: string;
}) => {
  const previewUrl = `/api/preview?filePath=${file_path}`;

  return (
    <figure className="relative h-full w-full cursor-pointer overflow-hidden rounded-sm p-2">
      <a href={previewUrl} target="_blank">
        <div className="flex flex-row items-center gap-3">
          <icons.GrAttachment
            size={16}
            className="text-primary"
            // onClick={() => handleDownload(file_path!, file_name ?? title!)}
          />
          <div className="flex flex-col">
            <figcaption
              className="text-xs font-roboto text-muted-foreground tracking-wide leading-relaxed text-justify hover:text-card-foreground dark:text-white"
              // onClick={() => handleDownload(file_path!, file_name ?? title!)}
            >
              {title.length > 70 ? title.slice(0, 70) + ` ...` : title}
            </figcaption>
          </div>
        </div>
      </a>
    </figure>
  );
};

const NewsScroller = () => {
  const { data: news } = useNewsScrollerWb() as {
    data: INewsScrollerRow[] | undefined;
  };

  return (
    <div className="col-span-1">
      <div className="relative flex h-80 w-full flex-row items-center justify-center overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:10s]">
          {news?.map((data) => (
            <ReviewCard
              key={data.file_path}
              title={data.title}
              file_path={data.file_path}
            />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
      </div>
    </div>
  );
};
export default NewsScroller;
