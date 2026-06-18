import {
  FormInput,
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionWrapper,
  WbLoader,
  WbLoadMore,
} from '@/components';
import { titles, icons } from '@/constants';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useRtiNoticesWb } from '@/tanstack/sports/rti/rti.query';
import {
  handleFileOpen,
  useDebounce,
  type QuickFilterSchema,
} from '@/utils/functions';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IRtiNoticeRow } from '@/interface/sports.interface';
import dayjs from 'dayjs';

const SpwRtiNotices = () => {
  document.title = `RTI Notices | ${titles.SPORTS_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRtiNoticesWb({ search: debounced });

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
      <SpwPageBanner title="RTI Notices" />
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
              <Table className="text-[10px] md:text-xs font-inter text-muted-foreground tracking-wider">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Notice No.</TableHead>
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
                    rows?.map((data: IRtiNoticeRow, index: number) => (
                      <TableRow className="uppercase" key={data.id}>
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>
                          {data.start_date
                            ? dayjs(new Date(data.start_date)).format(
                                'DD/MM/YYYY',
                              )
                            : `NA`}
                        </TableCell>
                        <TableCell>{data.notice_no || `N/A`}</TableCell>
                        <TableCell>
                          <div className="text-wrap">{data?.subject}</div>
                        </TableCell>
                        <TableCell>
                          <icons.download
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
export default SpwRtiNotices;
