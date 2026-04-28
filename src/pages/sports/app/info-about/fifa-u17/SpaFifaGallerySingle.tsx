import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppBodyWrapper,
  AppTitleLoading,
  AppTitleWrapper,
  SubmitBtn,
} from '@/components';
import type { IFifaGalleryRow } from '@/interface/sports.interface';
import {
  fifaGallerySchema,
  type FifaGallerySchema,
} from '@/schema/sports/info-about.schema';
import {
  useFifaGalleryCreate,
  useFifaGalleryUpdate,
} from '@/tanstack/sports/info-about/info-about.mutation';
import { useFetchFifaGallery } from '@/tanstack/sports/info-about/info-about.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import GeneralSection from './form/GeneralSection';
import GalleryImages from './form/GalleryImages';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import { FieldDescription } from '@/components/ui/field';

const SpaFifaGallerySingle = () => {
  const { id } = useParams();

  const methods = useForm<FifaGallerySchema>({
    defaultValues: {
      title: '',
      description: '',
      eventDate: undefined,
      newGalleryImg: [],
      existingGalleryImg: [],
    },
    mode: 'all',
    resolver: zodResolver(fifaGallerySchema),
  });
  const [resetKey, setResetKey] = useState(0);
  const [pageTitle, setPageTitle] = useState<any>('Add new gallery');

  // ----------------------------------

  const { data, isLoading: fetching } = useFetchFifaGallery(Number(id), {
    enabled: !!id,
  }) as { data: IFifaGalleryRow | undefined; isLoading: boolean };

  // ----------------------------------

  const reset = () => {
    setResetKey((k) => k + 1);
    methods.reset();
  };

  const [uploadProgress, setUploadProgress] = useState(0);
  const mutation = id
    ? useFifaGalleryUpdate(setUploadProgress)
    : useFifaGalleryCreate(setUploadProgress);

  const isLoading = mutation.isPending;

  // ----------------------------------

  const handleSubmit = async (data: FifaGallerySchema) => {
    const payload = id ? { id, data } : data;
    const msg = id ? 'updated' : 'added';
    setUploadProgress(0);

    mutation.mutate(payload as any, {
      onSuccess: (data) => {
        !id && data && methods.reset(data);
        showSuccess(`Stadium details ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              methods.setError(key as keyof FifaGallerySchema, {
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
        title: data.name,
        description: data.description || '',
        eventDate: data.event_date,
        newGalleryImg: [],
        existingGalleryImg:
          data?.photos?.map((item: any) => String(item.image_path)) || [],
      });
      setResetKey((k) => k + 1);
      setPageTitle(fetching ? <AppTitleLoading /> : data.name);
    } else {
      methods.reset({
        title: '',
        description: '',
        eventDate: undefined,
        newGalleryImg: [],
        existingGalleryImg: [],
      });
      setPageTitle(id ? <AppTitleLoading /> : 'Add new FIFA gallery');
    }
  }, [data]);

  return (
    <>
      <AppTitleWrapper title={pageTitle} />
      <AppBodyWrapper className="px-2">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <fieldset disabled={isLoading || fetching}>
              <GeneralSection />
              <GalleryImages resetKey={resetKey} />
              <FieldDescription className="mb-4">
                {mutation.isPending && (
                  <div className="text-destructive text-xs font-semibold tracking-wider">
                    Uploading... {uploadProgress}%
                  </div>
                )}
              </FieldDescription>
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
                <Link to={`${titles.SPORTS_APP_URL}/info-about/fifa-u17`}>
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
export default SpaFifaGallerySingle;
