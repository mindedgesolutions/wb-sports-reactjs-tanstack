import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useEnsureValidPage, usePageParam } from '@/hooks/use-pagination';
import { useFairPrograms } from '@/tanstack/services/fair-programs/fair-program.query';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import List from './List';

const YsaFairPrograms = () => {
  document.title = `Fairs & Programmes | ${titles.SERVICES_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { currentPage, onPageChange } = usePageParam();

  const { data, isLoading, isFetching, isError, error } = useFairPrograms({
    page: currentPage,
    search: debounced,
  });

  useEnsureValidPage(currentPage, data?.meta?.last_page);

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="Fairs & Programmes"
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
              <Link
                to={`${titles.SERVICES_APP_URL}/fair-programmes/fair-programme`}
              >
                <Button type="button" size={'sm'} className="rounded-sm">
                  Add Details
                </Button>
              </Link>
            </div>
            <List
              data={data}
              isLoading={isLoading}
              page={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default YsaFairPrograms;
