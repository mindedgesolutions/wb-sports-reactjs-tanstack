import {
  advertisementSchema,
  type AdvertisementSchema,
} from '@/schema/sports/announcements.schema';
import {
  useAdvertisementCreate,
  useAdvertisementUpdate,
} from '@/tanstack/sports/announcements/announcements.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
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
  AppRequired,
  FormDatepicker,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import type { IAdvertisementRow } from '@/interface/sports.interface';
import { queryClient } from '@/tanstack/query.client';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';
import { titles } from '@/constants';
import { Button } from '@/components/ui/button';
import { GoFile } from 'react-icons/go';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AdvertisementSchema>({
    defaultValues: {
      title: '',
      description: '',
      adDate: undefined,
      newFile: undefined,
      oldFile: '',
    },
    mode: 'all',
    resolver: zodResolver(advertisementSchema),
  });
  const add = useAdvertisementCreate();
  const update = useAdvertisementUpdate();

  // --------------------------

  const { data: selected } = useQuery({
    queryKey: ['advertisement-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IAdvertisementRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // --------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['advertisement-selected'] });
    form.reset();
  };

  // --------------------------

  const handleSubmit = async (data: AdvertisementSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Advertisement ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;
        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof AdvertisementSchema, {
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

  // -------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        title: selected.title,
        description: selected.description || undefined,
        adDate: selected.ad_date || undefined,
        newFile: undefined,
        oldFile: selected.file_path || undefined,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        adDate: undefined,
        newFile: undefined,
        oldFile: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} advertisement</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Title
                  <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="title"
                  placeholder="Enter title"
                  description={errors.title?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rank">Description</Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder="Enter description"
                  description={errors.description?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">Advertisement date</Label>
                <FormDatepicker
                  control={form.control}
                  name="adDate"
                  allowFutureDates={true}
                  description={errors.adDate?.message}
                  id="adDate"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newFile">
                  Attachment {!selected && <AppRequired />}
                </Label>
                <FormSimpleFileUpload
                  control={form.control}
                  name="newFile"
                  description={errors.newFile?.message}
                />
                {selected && (
                  <a
                    href={`${titles.BASE_URL}${selected.file_path}`}
                    target="_blank"
                  >
                    <GoFile className="size-12 text-muted-foreground/20" />
                  </a>
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
