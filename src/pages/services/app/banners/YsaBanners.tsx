import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import List from './List';
import Form from './Form';
import { useForm } from 'react-hook-form';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBanners } from '@/tanstack/services/banners/banners.query';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const YsaBanners = () => {
  document.title = `Page Banners | ${titles.SERVICES_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || page;

  const { data, isLoading, isFetching, isError, error } = useBanners({
    page: currentPage || page,
    search: debounced,
  });

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="Page Banners"
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
              isLoading={isLoading}
              page={currentPage}
              onPageChange={setPage}
            />
          </div>
          <Form />
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default YsaBanners;
