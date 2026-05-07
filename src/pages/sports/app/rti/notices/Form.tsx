import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IRtiNoticeRow } from '@/interface/sports.interface';
import {
  rtiNoticeSchema,
  type RtiNoticeSchema,
} from '@/schema/sports/rti.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useRtiNoticeCreate,
  useRtiNoticeUpdate,
} from '@/tanstack/sports/rti/rti.mutation';
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
  AppRequired,
  FormDatepicker,
  FormInput,
  FormRadio,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { IoMdClipboard } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const RadioOptions: { value: string; label: string }[] = [
  { value: 'true', label: 'New' },
  { value: 'false', label: 'Not new' },
];

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<RtiNoticeSchema>({
    defaultValues: {
      noticeNo: '',
      subject: '',
      isNew: 'true',
      startDate: undefined,
      endDate: undefined,
      newFile: undefined,
      existingFile: '',
    },
    mode: 'all',
    resolver: zodResolver(rtiNoticeSchema),
  });
  const add = useRtiNoticeCreate();
  const update = useRtiNoticeUpdate();

  // ------------------------------

  const { data: selected } = useQuery({
    queryKey: ['rti-notice-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IRtiNoticeRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['rti-notice-selected'] });
    form.reset();
  };

  // ------------------------------

  const handleSubmit = async (data: RtiNoticeSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Notice ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;
        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof RtiNoticeSchema, {
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

  // ------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        noticeNo: selected.notice_no,
        subject: selected.subject,
        isNew: String(selected.is_new),
        startDate: selected.start_date || undefined,
        endDate: selected.end_date || undefined,
        newFile: undefined,
        existingFile: selected.file_path,
      });
    } else {
      form.reset({
        noticeNo: '',
        subject: '',
        isNew: 'true',
        startDate: undefined,
        endDate: undefined,
        newFile: undefined,
        existingFile: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add '} notice</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Notice no.
                  <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="noticeNo"
                  placeholder="Enter notice no."
                  description={errors.noticeNo?.message}
                  iconStart={<IoMdClipboard />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Subject
                  <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="subject"
                  placeholder="Enter subject"
                  description={errors.subject?.message}
                />
              </div>
              <div className="grid gap-2">
                <FormRadio
                  control={form.control}
                  name="isNew"
                  options={RadioOptions}
                  className="flex"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Start date</Label>
                <span className="flex items-center gap-2">
                  <FormDatepicker
                    control={form.control}
                    name="startDate"
                    allowFutureDates={false}
                    description={errors.startDate?.message}
                  />
                  <Trash2
                    className="text-destructive h-4 w-4 cursor-pointer"
                    onClick={() => form.setValue('startDate', undefined)}
                  />
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">End date</Label>
                <span className="flex items-center gap-2">
                  <FormDatepicker
                    control={form.control}
                    name="endDate"
                    allowFutureDates={false}
                    description={errors.endDate?.message}
                  />
                  <Trash2
                    className="text-destructive h-4 w-4 cursor-pointer"
                    onClick={() => form.setValue('endDate', undefined)}
                  />
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Select a file <AppRequired />
                </Label>
                <FormSimpleFileUpload
                  control={form.control}
                  name="newFile"
                  description={errors.newFile?.message}
                />
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
