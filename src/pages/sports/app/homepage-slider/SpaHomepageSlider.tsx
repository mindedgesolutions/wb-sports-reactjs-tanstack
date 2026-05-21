import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';
import { useHomepageSlider } from '@/tanstack/sports/homepage-sliders/homepage-sliders.query';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import List from './List';
import Form from './Form';

const SpaHomepageSlider = () => {
  document.title = `Homepage Slider Images | ${titles.SPORTS_APP_NAME}`;

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || page;

  const { data, isLoading, isFetching, isError, error } = useHomepageSlider({
    page: currentPage || page,
  });

  if (isError) console.log(error);

  return (
    <>
      <AppTitleWrapper
        title="Homepage Slider Images"
        isFetching={isLoading || isFetching}
      />
      <AppBodyWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
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
export default SpaHomepageSlider;
