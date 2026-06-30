import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppSortList,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useEnsureValidPage, usePageParam } from '@/hooks/use-pagination';
import {
  useOrganisationChart,
  useOrganisationChartAll,
} from '@/tanstack/services/about-us/about-us.query';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import List from './List';
import Form from './Form';
import type { IOrgChart } from '@/interface/services.interface';
import { servicesApp } from '@/constants/api.services';

const YsaOrgChart = () => {
  document.title = `Organisation Chart | ${titles.SERVICES_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { currentPage, onPageChange } = usePageParam();

  const { data, isLoading, isFetching, isError, error } = useOrganisationChart({
    page: currentPage,
    search: debounced,
  });

  useEnsureValidPage(currentPage, data?.meta?.last_page);

  const {
    data: all,
    isError: isAllError,
    error: allError,
  } = useOrganisationChartAll();

  if (isError) console.log(error);
  if (isAllError) console.log(allError);

  const sortData = all?.data?.map((item: IOrgChart) => ({
    id: item.id,
    primary: item.name,
    secondary: item.designation,
  }));

  return (
    <>
      <AppTitleWrapper
        title="Organisation Chart"
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
                queryKey="org-chart"
                additionalQueryKeys={['org-chart-all']}
                api={servicesApp.aboutUs.orgChart.sort}
              />
            </div>
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
export default YsaOrgChart;
