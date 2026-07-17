import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IHomepageScroller } from '@/interface/services.interface';
import {
  homepageScrollerSchema,
  type HomepageScrollerSchema,
} from '@/schema/services/homepage-scroller.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useHomepageScrollerCreate,
  useHomepageScrollerUpdate,
} from '@/tanstack/services/homepage-scrollers/homepage-scroller.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AppModalTooltip,
  AppRequired,
  FormDatepicker,
  FormInput,
  FormRadio,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { defaultIcons, homepageScrollerOptions } from '@/constants';
import { X } from 'lucide-react';
import { handleFileOpen } from '@/utils/functions';

const instructions: string[] = [
  'Allowed file type: PDF',
  'Attachment size must be less than 5MB',
];

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<HomepageScrollerSchema>({
    defaultValues: {
      title: '',
      eventDate: undefined,
      type: 'attachment',
      newFile: undefined,
      existingFile: '',
      link: '',
    },
    mode: 'all',
    resolver: zodResolver(homepageScrollerSchema),
  });
  const add = useHomepageScrollerCreate();
  const update = useHomepageScrollerUpdate();
  const show = form.watch('type');

  // --------------------------

  const { data: selected } = useQuery({
    queryKey: ['services-homepage-scroller-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IHomepageScroller | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // --------------------------

  const reset = () => {
    queryClient.removeQueries({
      queryKey: ['services-homepage-scroller-selected'],
    });
    form.reset();
  };

  // --------------------------

  const handleSubmit = async (data: HomepageScrollerSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`News ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof HomepageScrollerSchema, {
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

  // ---------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        title: selected.title,
        eventDate: selected.event_date || undefined,
        type: selected.type,
        newFile: undefined,
        existingFile: selected.file_path || '',
        link: selected.link || '',
      });
    } else {
      form.reset({
        title: '',
        eventDate: undefined,
        type: 'attachment',
        newFile: undefined,
        existingFile: '',
        link: '',
      });
    }
  }, [selected]);

  // ---------------------------------

  const handleView = () => {
    selected && handleFileOpen(selected.file_path!, selected.file_name!);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add'} news</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  News title <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="title"
                  placeholder="Enter news title"
                  description={errors.title?.message}
                  maxLen={250}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Event date</Label>
                <div className="flex items-center gap-2">
                  <FormDatepicker
                    control={form.control}
                    name="eventDate"
                    allowFutureDates={true}
                    description={errors.eventDate?.message}
                  />
                  <X
                    className="text-destructive h-4 cursor-pointer"
                    onClick={() => form.setValue('eventDate', undefined)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Type</Label>
                <FormRadio
                  control={form.control}
                  name="type"
                  options={homepageScrollerOptions}
                  description={errors.type?.message}
                  className="flex gap-4"
                />
              </div>
              {show === 'link' && (
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Link <AppRequired />
                  </Label>
                  <FormInput
                    register={form.register}
                    name="link"
                    description={errors.link?.message}
                    iconStart={<defaultIcons.internet />}
                  />
                </div>
              )}
              {show === 'attachment' && (
                <div className="grid gap-2">
                  <Label htmlFor="achievementDate">
                    <AppModalTooltip
                      label="Attachment"
                      instructions={instructions}
                    />{' '}
                    {!selected && <AppRequired />}
                  </Label>
                  <FormSimpleFileUpload
                    control={form.control}
                    name="newFile"
                    description={errors.newFile?.message}
                  />
                  {selected && selected.type === 'attachment' && (
                    <defaultIcons.fileAttachment
                      className="size-12 text-muted-foreground/20 cursor-pointer"
                      onClick={handleView}
                    />
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="reset" variant="outline" onClick={reset}>
              Reset
            </Button>
            <SubmitBtn
              isSubmitting={isLoading}
              label={selected ? 'Update' : 'Add'}
              submitLabel="Submitting ..."
            />
          </CardFooter>
        </fieldset>
      </form>
    </Card>
  );
};
export default Form;
