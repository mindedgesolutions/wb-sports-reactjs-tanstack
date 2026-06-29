import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppSortList,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import {
  useAdminStructure,
  useAdminStructureAll,
} from '@/tanstack/sports/about-us/about-us.query';
import List from './List';
import Form from './Form';
import { useForm } from 'react-hook-form';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { sportsApp } from '@/constants/api.sports';
import type { IAdminStructureRow } from '@/interface/sports.interface';
import { useEnsureValidPage, usePageParam } from '@/hooks/use-pagination';

const SpaAdminStructure = () => {
  document.title = `Administrative Structure | ${titles.SPORTS_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { currentPage, onPageChange } = usePageParam();

  const { data, isLoading, isFetching, isError, error } = useAdminStructure({
    page: currentPage,
    search: debounced,
  });

  useEnsureValidPage(currentPage, data?.meta?.last_page);

  const {
    data: all,
    isError: isAllError,
    error: allError,
  } = useAdminStructureAll();

  if (isError) console.log(error);
  if (isAllError) console.log(allError);

  const sortData = all?.data?.map((item: IAdminStructureRow) => ({
    id: item.id,
    primary: item.designation,
  }));

  return (
    <>
      <AppTitleWrapper
        title="Administrative Structure"
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
                queryKey="admin-structure"
                additionalQueryKeys={['admin-structure-all']}
                api={sportsApp.aboutUs.adminStructure.sort}
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
export default SpaAdminStructure;
