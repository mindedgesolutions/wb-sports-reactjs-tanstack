import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useFifaGalleries } from '@/tanstack/sports/info-about/info-about.query';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { Link, useSearchParams } from 'react-router-dom';
import List from './List';
import { Button } from '@/components/ui/button';

const SpaFifaGallery = () => {
  document.title = `FIFA U-17 World Cup galleries | ${titles.SPORTS_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || page;

  const { data, isLoading, isFetching, isError, error } = useFifaGalleries({
    page: currentPage || page,
    search: debounced,
  });
  console.log(data);

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="FIFA U-17 World Cup galleries"
        isFetching={isLoading || isFetching}
      />
      <AppBodyWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-3">
            <AppFilterWrapper className="mb-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-2">
                  <span className="text-xs text-muted-foreground tracking-wide">
                    {data?.meta?.total || 0} records found
                  </span>
                </div>
                <div className="col-span-1 flex justify-end items-center">
                  <FormInput
                    name="search"
                    iconStart={<HiOutlineMagnifyingGlass />}
                    iconEnd={`${data?.meta?.total || 0} records`}
                    register={form.register}
                    placeholder="Search by anything ..."
                    className="w-full md:w-72"
                  />
                </div>
              </div>
            </AppFilterWrapper>
            <div className="mb-3">
              <Link to={`${titles.SPORTS_APP_URL}/info-about/fifa`}>
                <Button>Add new</Button>
              </Link>
            </div>
            <List
              data={data}
              isLoading={isLoading}
              page={currentPage}
              onPageChange={setPage}
            />
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default SpaFifaGallery;
