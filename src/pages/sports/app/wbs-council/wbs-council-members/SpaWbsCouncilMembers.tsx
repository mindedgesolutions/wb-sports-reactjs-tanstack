import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import List from './List';
import Form from './Form';
import { useForm } from 'react-hook-form';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWbsCouncil } from '@/tanstack/sports/wbs-council/wbs-council.query';

const SpaWbsCouncilMembers = () => {
  document.title = `WBS Council Members | ${titles.SPORTS_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || page;

  const { data, isLoading, isFetching, isError, error } = useWbsCouncil({
    page: currentPage || page,
    search: debounced,
  });

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="WBS Council Members"
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
              <Form />
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
export default SpaWbsCouncilMembers;
