import {
  announcementSchema,
  type AnnouncementSchema,
} from '@/schema/sports/announcements.schema';
import {
  useAnnouncementCreate,
  useAnnouncementUpdate,
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
  FormInput,
  FormSelect,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import type { IAnnouncementRow } from '@/interface/sports.interface';
import { queryClient } from '@/tanstack/query.client';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';
import { spAnnouncementTypes, titles } from '@/constants';
import { FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoFile } from 'react-icons/go';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AnnouncementSchema>({
    defaultValues: {
      type: '',
      annNo: '',
      subject: '',
      startDate: undefined,
      endDate: undefined,
      newFile: undefined,
      oldFile: '',
    },
    mode: 'all',
    resolver: zodResolver(announcementSchema),
  });
  const add = useAnnouncementCreate();
  const update = useAnnouncementUpdate();
  const type = form.watch('type');
  const label = type ? type.toLowerCase() : 'Announcement';

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['announcement-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IAnnouncementRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['announcement-selected'] });
    form.reset();
  };

  // ----------------------------------

  const handleSubmit = async (data: AnnouncementSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Announcement ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;
        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof AnnouncementSchema, {
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
        annNo: selected.ann_no,
        subject: selected.subject,
        startDate: selected.start_date || undefined,
        endDate: selected.end_date || undefined,
        oldFile: selected.file_path || undefined,
        newFile: undefined,
      });
    } else {
      form.reset({
        type: '',
        annNo: '',
        subject: '',
        startDate: undefined,
        endDate: undefined,
        oldFile: undefined,
        newFile: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {selected ? 'Edit' : 'Add new'} {label.toLowerCase()}
        </CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Announcement type <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="type"
                  options={spAnnouncementTypes}
                  placeholder="Select announcement type"
                  description={errors.type?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  {label.charAt(0).toUpperCase() + label.slice(1)} no.
                  <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="annNo"
                  placeholder={`Enter ${label} no.`}
                  description={errors.annNo?.message}
                  iconStart={<FileCheck />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rank">
                  Subject <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="subject"
                  placeholder="Enter subject"
                  description={errors.subject?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">Start date</Label>
                <FormDatepicker
                  control={form.control}
                  name="startDate"
                  allowFutureDates={true}
                  description={errors.startDate?.message}
                  id="startDate"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">End date</Label>
                <FormDatepicker
                  control={form.control}
                  name="endDate"
                  allowFutureDates={true}
                  description={errors.endDate?.message}
                  id="endDate"
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
