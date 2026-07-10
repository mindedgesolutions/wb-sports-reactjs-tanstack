import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { INewsEvents } from '@/interface/services.interface';
import {
  newsEventsSchema,
  type NewsEventsSchema,
} from '@/schema/services/news-events.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useNewsEventsCreate,
  useNewsEventsUpdate,
} from '@/tanstack/services/news-events/news-events.mutation';
import { handleFileOpen } from '@/utils/functions';
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
  FormSelect,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { defaultIcons, newsTypes } from '@/constants';

const instructions: string[] = [
  'Allowed file types: pdf, msword',
  `Attachment size must be less than 5MB`,
];

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<NewsEventsSchema>({
    defaultValues: {
      type: '',
      title: '',
      description: '',
      eventDate: undefined,
      newFile: undefined,
      oldFile: '',
    },
    mode: 'all',
    resolver: zodResolver(newsEventsSchema),
  });
  const add = useNewsEventsCreate();
  const update = useNewsEventsUpdate();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['news-event-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: INewsEvents | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['news-event-selected'] });
    form.reset();
  };

  // -------------------------------

  const handleSubmit = async (data: NewsEventsSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Event / News ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof NewsEventsSchema, {
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
        type: selected.type,
        title: selected.title,
        description: selected.description || '',
        eventDate: selected.event_date,
        newFile: undefined,
        oldFile: selected.file_path,
      });
    } else {
      form.reset({
        type: '',
        title: '',
        description: '',
        eventDate: undefined,
        newFile: undefined,
        oldFile: '',
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
        <CardTitle>{selected ? 'Edit' : 'Add new'} event</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Select a type <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="type"
                  options={newsTypes}
                  description={errors.type?.message}
                  placeholder="Select a type"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Title <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="title"
                  placeholder="Enter title"
                  description={errors.title?.message}
                  maxLen={250}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Description</Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder="Enter description"
                  description={errors.description?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Event date <AppRequired />
                </Label>
                <FormDatepicker
                  control={form.control}
                  name="eventDate"
                  allowFutureDates={false}
                  description={errors.eventDate?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="achievementDate">
                  <AppModalTooltip
                    label="Upload attachment"
                    instructions={instructions}
                  />{' '}
                  {!selected && <AppRequired />}
                </Label>
                <FormSimpleFileUpload
                  control={form.control}
                  name="newFile"
                  description={errors.newFile?.message}
                />
                {selected && (
                  <defaultIcons.fileAttachment
                    className="size-12 text-muted-foreground/20 cursor-pointer"
                    onClick={handleView}
                  />
                )}
              </div>
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
