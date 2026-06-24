import {
  FormInput,
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
  WbLoadMore,
} from '@/components';
import { defaultIcons, titles } from '@/constants';
import { useAnnouncementsWb } from '@/tanstack/sports/announcements/announcements.query';
import {
  handleFileOpen,
  ucwords,
  useDebounce,
  type QuickFilterSchema,
} from '@/utils/functions';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IAnnouncementRow } from '@/interface/sports.interface';
import dayjs from 'dayjs';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';

const SpwAnnouncements = () => {
  const { category } = useParams();

  document.title = `${ucwords(category!)} | ${titles.SPORTS_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAnnouncementsWb({ type: category!, search: debounced });

  const rows = data?.pages.flatMap((page) => page.data) ?? [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <SpwPageBanner title={`${category!}s`} />
      <SpwSectionWrapper className="max-w-full md:max-w-7xl mx-auto">
        <FormInput
          name="search"
          iconStart={<HiOutlineMagnifyingGlass />}
          iconEnd={`${data?.pages[0]?.total || 0} records`}
          register={form.register}
          placeholder="Search by reference no. or subject ..."
          className="w-full md:w-96"
        />
        {isLoading && <WbLoader />}
        <div>
          {!isLoading && (
            <div className="mt-8">
              <Table className="text-[10px] md:text-[11px] font-inter text-muted-foreground tracking-wider">
                <TableHeader>
                  <TableRow className="text-xs font-oswald">
                    <TableHead>#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>{ucwords(category!)} No.</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center uppercase tracking-wider"
                      >
                        No record found
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows?.map((data: IAnnouncementRow, index: number) => (
                      <TableRow className="uppercase" key={data.id}>
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>
                          {data.start_date
                            ? dayjs(data.start_date).format('DD/MM/YYYY')
                            : `N/A`}
                        </TableCell>
                        <TableCell>{data.ann_no}</TableCell>
                        <TableCell className="whitespace-normal wrap-break-word leading-loose">
                          {data.subject}
                        </TableCell>
                        <TableCell>
                          <defaultIcons.download
                            size={20}
                            className="text-primary cursor-pointer"
                            onClick={() =>
                              handleFileOpen(
                                data.file_path!,
                                data.file_name ?? data.subject!,
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          <div ref={loadMoreRef} />
          {isFetchingNextPage && <WbLoadMore />}
          {!hasNextPage && rows.length > 0 && (
            <SpwParagraphWrapper className="text-center text-muted-foreground mt-8">
              No further record found
            </SpwParagraphWrapper>
          )}
          {!isLoading && rows.length === 0 && (
            <SpwParagraphWrapper className="text-center text-muted-foreground mt-8">
              No records found
            </SpwParagraphWrapper>
          )}
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwAnnouncements;
