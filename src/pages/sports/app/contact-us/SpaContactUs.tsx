import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppSortList,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import {
  useContactUs,
  useContactUsAll,
} from '@/tanstack/sports/contact-us/contact-us.query';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import List from './List';
import Form from './Form';
import { sportsApp } from '@/constants/api.sports';
import type { IContactUsRow } from '@/interface/sports.interface';
import { useEnsureValidPage, usePageParam } from '@/hooks/use-pagination';

const SpaContactUs = () => {
  document.title = `Contact Us | ${titles.SPORTS_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { currentPage, onPageChange } = usePageParam();

  const { data, isLoading, isFetching, isError, error } = useContactUs({
    page: currentPage,
    search: debounced,
  });

  useEnsureValidPage(currentPage, data?.meta?.last_page);

  const { data: all } = useContactUsAll();

  const sortData = all?.data?.map((item: IContactUsRow) => ({
    id: item.id,
    primary: item.name,
    secondary: item.designation,
  }));

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="Contact Us"
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
            <div className="mb-3">
              <AppSortList
                data={sortData ?? []}
                queryKey="contact-us"
                additionalQueryKeys={['contact-us-all']}
                api={sportsApp.contactUs.contactUs.sort}
              />
            </div>
            <List
              data={data}
              isLoading={isLoading}
              page={currentPage}
              onPageChange={onPageChange}
            />
          </div>
          <Form />
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default SpaContactUs;
