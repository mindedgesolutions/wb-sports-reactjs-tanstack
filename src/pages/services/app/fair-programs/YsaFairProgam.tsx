import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppBodyWrapper,
  AppTitleLoading,
  AppTitleWrapper,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { titles } from '@/constants';
import type { IFairProgrammeDetails } from '@/interface/services.interface';
import {
  fairProgramSchema,
  type FairProgramSchema,
} from '@/schema/services/fair-program.schema';
import {
  useFairProgramCreate,
  useFairProgramUpdate,
} from '@/tanstack/services/fair-programs/fair-program.mutation';
import { useFairProgram } from '@/tanstack/services/fair-programs/fair-program.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import GeneralSection from './form/GeneralSection';
import GalleryImages from './form/GalleryImages';

const YsaFairProgam = () => {
  const { id } = useParams();

  const methods = useForm<FairProgramSchema>({
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
    resolver: zodResolver(fairProgramSchema),
  });
  const [resetKey, setResetKey] = useState(0);
  const [files, setFiles] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState<any>('Add Fair & Programme');

  // ----------------------------------

  const { data, isLoading: fetching } = useFairProgram(Number(id), {
    enabled: !!id,
  }) as { data: IFairProgrammeDetails | undefined; isLoading: boolean };

  const title = data ? `${data?.title.toUpperCase()}` : `Add Fair & Programme`;
  document.title = title + ' | ' + titles.SPORTS_APP_NAME;

  // ----------------------------------

  const reset = () => {
    setResetKey((k) => k + 1);
    setFiles([]);
    methods.reset();
  };

  const add = useFairProgramCreate();
  const update = useFairProgramUpdate();
  const isLoading = id ? update.isPending : add.isPending;

  // ----------------------------------

  const handleSubmit = async (data: FairProgramSchema) => {
    const mutation = id ? update : add;
    const payload = id ? { id, data } : data;
    const msg = id ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: (data) => {
        !id && methods.reset(data!);
        showSuccess(`Programme ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              methods.setError(key as keyof FairProgramSchema, {
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
        eventDate: data.event_date ? new Date(data.event_date) : undefined,
        coverImg: undefined,
        existingCoverImg: data.cover_image || '',
        galleryImg: [],
        existingGalleryImg:
          data?.images?.map((item: any) => String(item.image_path)) || [],
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
      setPageTitle(id ? <AppTitleLoading /> : 'Add Fair & Programme');
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
                <Link to={`${titles.SERVICES_APP_URL}/fair-programmes`}>
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
export default YsaFairProgam;
