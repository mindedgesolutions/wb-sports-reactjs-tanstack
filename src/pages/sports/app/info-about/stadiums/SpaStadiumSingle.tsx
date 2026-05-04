import {
  AppBodyWrapper,
  AppTitleLoading,
  AppTitleWrapper,
  SubmitBtn,
} from '@/components';
import { Link, useParams } from 'react-router-dom';
import GeneralSection from './form/GeneralSection';
import StadiumDetails from './form/StadiumDetails';
import Highlights from './form/Highlights';
import StadiumImages from './form/StadiumImages';
import { FormProvider, useForm } from 'react-hook-form';
import {
  stadiumSchema,
  type StadiumSchema,
} from '@/schema/sports/info-about.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  useStadiumCreate,
  useStadiumUpdate,
} from '@/tanstack/sports/info-about/info-about.mutation';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';
import { titles } from '@/constants';
import { useFetchStadium } from '@/tanstack/sports/info-about/info-about.query';
import type { IStadiumSingle } from '@/interface/sports.interface';

const SpaStadiumSingle = () => {
  const { id } = useParams();

  const methods = useForm<StadiumSchema>({
    defaultValues: {
      name: '',
      location: '',
      address: '',
      coverImg: undefined,
      oldCoverImg: '',
      description: '',
      highlights: [{ value: '' }],
      newGalleryImg: [],
      existingGalleryImg: [],
    },
    mode: 'all',
    resolver: zodResolver(stadiumSchema),
  });
  const [resetKey, setResetKey] = useState(0);
  const [files, setFiles] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState<any>('Add new stadium');

  // ----------------------------------

  const { data, isLoading: fetching } = useFetchStadium(Number(id), {
    enabled: !!id,
  }) as { data: IStadiumSingle | undefined; isLoading: boolean };

  const title = id ? `${data?.name.toUpperCase()}` : `Add New Stadium`;
  document.title = title + ' | ' + titles.SPORTS_APP_NAME;

  // ----------------------------------

  const reset = () => {
    setResetKey((k) => k + 1);
    setFiles([]);
    methods.reset();
  };

  const add = useStadiumCreate();
  const update = useStadiumUpdate();
  const isLoading = id ? update.isPending : add.isPending;

  // ----------------------------------

  const handleSubmit = async (data: StadiumSchema) => {
    const mutation = id ? update : add;
    const payload = id ? { id, data } : data;
    const msg = id ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: (data) => {
        !id && methods.reset(data);
        showSuccess(`Stadium details ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              methods.setError(key as keyof StadiumSchema, {
                message: (message as string[])[0],
              });
            });
            return;
          }

          if (Array.isArray(errors)) {
            showError(errors[0]);
            return;
          }
        }
        showError((error as any)?.response?.data?.message);
      },
    });
  };

  // ----------------------------------

  useEffect(() => {
    if (data) {
      methods.reset({
        name: data.name,
        location: data.location,
        address: data.address || '',
        coverImg: undefined,
        description: data.stadium_details?.description || '',
        oldCoverImg: data.cover_img || '',
        highlights: data.stadium_highlights?.map((h: any) => ({
          value: h.title || '',
        })) || [{ value: '' }],
        newGalleryImg: [],
        existingGalleryImg:
          data?.stadium_images?.map((item: any) => String(item.image_path)) ||
          [],
      });
      setResetKey((k) => k + 1);
      setPageTitle(fetching ? <AppTitleLoading /> : data.name);
    } else {
      methods.reset({
        name: '',
        location: '',
        address: '',
        coverImg: undefined,
        oldCoverImg: '',
        highlights: [{ value: '' }],
        newGalleryImg: [],
        existingGalleryImg: [],
      });
      setPageTitle(id ? <AppTitleLoading /> : 'Add new stadium');
    }
  }, [data]);

  return (
    <>
      <AppTitleWrapper title={pageTitle} />
      <AppBodyWrapper className="px-2">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <fieldset disabled={isLoading || fetching}>
              <GeneralSection files={files} setFiles={setFiles} />
              <StadiumDetails />
              <Highlights />
              <StadiumImages resetKey={resetKey} />
              <Separator className="my-4" />
              <div className="flex gap-4">
                <SubmitBtn
                  isSubmitting={isLoading || fetching}
                  label={id ? 'Update details' : 'Add stadium'}
                />
                <Button
                  type="button"
                  className="text-xs tracking-wider"
                  variant="outline"
                  onClick={reset}
                >
                  Reset
                </Button>
                <Link to={`${titles.SPORTS_APP_URL}/info-about/stadiums`}>
                  <Button
                    type="button"
                    className="text-xs tracking-wider"
                    variant="outline"
                  >
                    Back to list
                  </Button>
                </Link>
              </div>
            </fieldset>
          </form>
        </FormProvider>
      </AppBodyWrapper>
    </>
  );
};
export default SpaStadiumSingle;
