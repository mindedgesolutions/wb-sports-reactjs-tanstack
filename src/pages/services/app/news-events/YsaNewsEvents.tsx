import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useEnsureValidPage, usePageParam } from '@/hooks/use-pagination';
import { useNewsEvents } from '@/tanstack/services/news-events/news-events.query';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import List from './List';
import Form from './Form';

const YsaNewsEvents = () => {
  document.title = `News & Events | ${titles.SERVICES_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { currentPage, onPageChange } = usePageParam();

  const { data, isLoading, isFetching, isError, error } = useNewsEvents({
    page: currentPage,
    search: debounced,
  });

  useEnsureValidPage(currentPage, data?.meta?.last_page);

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="News & Events"
        isFetching={isLoading || isFetching}
      />
      <AppBodyWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <AppFilterWrapper className="mb-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-2">
                  <span className="text-xs text-muted-foreground tracking-wide">
                    {data?.meta?.total || 0} records found
                  </span>
                </div>
                <div className="col-span-1">
                  <FormInput
                    name="search"
                    iconStart={<HiOutlineMagnifyingGlass />}
                    iconEnd={`${data?.meta?.total || 0} records`}
                    register={form.register}
                    placeholder="Search by anything ..."
                  />
                </div>
              </div>
            </AppFilterWrapper>
            <List
              data={data}
              page={currentPage}
              onPageChange={onPageChange}
              isLoading={isLoading}
            />
          </div>
          <Form />
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default YsaNewsEvents;
