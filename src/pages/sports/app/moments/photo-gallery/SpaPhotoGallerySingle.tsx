import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppBodyWrapper,
  AppTitleLoading,
  AppTitleWrapper,
  SubmitBtn,
} from '@/components';
import { titles } from '@/constants';
import type { IPhotoGallerySingle } from '@/interface/sports.interface';
import {
  photoGallerySchema,
  type PhotoGallerySchema,
} from '@/schema/sports/moments.schema';
import {
  usePhotoGalleryCreate,
  usePhotoGalleryUpdate,
} from '@/tanstack/sports/moments/moments.mutation';
import { usePhotoGallery } from '@/tanstack/sports/moments/moments.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import GeneralSection from './form/GeneralSection';
import GalleryImages from './form/GalleryImages';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const SpaPhotoGallerySingle = () => {
  const { id } = useParams();

  const methods = useForm<PhotoGallerySchema>({
    defaultValues: {
      title: '',
      description: '',
      eventDate: undefined,
      coverImg: undefined,
      existingCoverImg: '',
      galleryImg: [],
      existingGalleryImg: [],
    },
    mode: 'all',
    resolver: zodResolver(photoGallerySchema),
  });
  const [resetKey, setResetKey] = useState(0);
  const [files, setFiles] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState<any>('Add Photo Gallery');

  // ----------------------------------

  const { data, isLoading: fetching } = usePhotoGallery(Number(id), {
    enabled: !!id,
  }) as { data: IPhotoGallerySingle | undefined; isLoading: boolean };

  const title = data ? `${data?.title.toUpperCase()}` : `Add Photo Gallery`;
  document.title = title + ' | ' + titles.SPORTS_APP_NAME;

  // ----------------------------------

  const reset = () => {
    setResetKey((k) => k + 1);
    setFiles([]);
    methods.reset();
  };

  const add = usePhotoGalleryCreate();
  const update = usePhotoGalleryUpdate();
  const isLoading = id ? update.isPending : add.isPending;

  // ----------------------------------

  const handleSubmit = async (data: PhotoGallerySchema) => {
    const mutation = id ? update : add;
    const payload = id ? { id, data } : data;
    const msg = id ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: (data) => {
        !id && methods.reset(data!);
        showSuccess(`Photo gallery ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              methods.setError(key as keyof PhotoGallerySchema, {
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
        title: data.title,
        description: data.description || '',
        eventDate: data.event_date || undefined,
        coverImg: undefined,
        existingCoverImg: data.cover_img || '',
        galleryImg: [],
        existingGalleryImg:
          data?.photos?.map((item: any) => String(item.image_path)) || [],
      });
      setResetKey((k) => k + 1);
      setPageTitle(fetching ? <AppTitleLoading /> : data.title);
    } else {
      methods.reset({
        title: '',
        description: '',
        eventDate: undefined,
        coverImg: undefined,
        existingCoverImg: '',
        galleryImg: [],
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
              <GalleryImages resetKey={resetKey} />
              <Separator className="my-4" />
              <div className="flex gap-4">
                <SubmitBtn
                  isSubmitting={isLoading || fetching}
                  label={id ? 'Update details' : 'Add gallery'}
                />
                <Button
                  type="button"
                  className="text-xs tracking-wider"
                  variant="outline"
                  onClick={reset}
                >
                  Reset
                </Button>
                <Link to={`${titles.SPORTS_APP_URL}/moments/photo-galleries`}>
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
export default SpaPhotoGallerySingle;
