import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { useResetPaginationOnSearch } from '@/hooks/reset-page-on-search';
import { useAudioVisuals } from '@/tanstack/sports/moments/moments.query';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import List from './List';
import Form from './Form';
import { useEnsureValidPage, usePageParam } from '@/hooks/use-pagination';

const SpaAudioVisuals = () => {
  document.title = `Audio-Visuals | ${titles.SPORTS_APP_NAME}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const { currentPage, onPageChange } = usePageParam();

  const { data, isLoading, isFetching, isError, error } = useAudioVisuals({
    page: currentPage,
    search: debounced,
  });

  useEnsureValidPage(currentPage, data?.meta?.last_page);

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="Audio-Visuals"
        isFetching={isLoading || isFetching}
      />
      <AppBodyWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <AppFilterWrapper className="mb-3">
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
              onPageChange={onPageChange}
            />
          </div>
          <Form />
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default SpaAudioVisuals;
