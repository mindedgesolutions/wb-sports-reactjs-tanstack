import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IEtender } from '@/interface/services.interface';
import {
  etenderSchema,
  type EtenderSchema,
} from '@/schema/services/e-tender.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useEtenderCreate,
  useEtenderUpdate,
} from '@/tanstack/services/e-tenders/e-tender.mutation';
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
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { defaultIcons } from '@/constants';
import { handleFileOpen } from '@/utils/functions';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<EtenderSchema>({
    defaultValues: {
      name: '',
      tenderDate: undefined,
      newFile: undefined,
      existingFile: '',
    },
    mode: 'all',
    resolver: zodResolver(etenderSchema),
  });
  const add = useEtenderCreate();
  const update = useEtenderUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['services-e-tender-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IEtender | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['services-e-tender-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: EtenderSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`E-tender ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof EtenderSchema, {
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
        name: selected.name,
        tenderDate: selected.tender_date || undefined,
        newFile: undefined,
        existingFile: selected.file_path || '',
      });
    } else {
      form.reset({
        name: '',
        tenderDate: undefined,
        newFile: undefined,
        existingFile: '',
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
        <CardTitle>{selected ? 'Edit' : 'Add new'} E-tender</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Tender name <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="name"
                  description={errors.name?.message}
                  placeholder="Enter e-tender name"
                  maxLen={250}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Tender date</Label>
                <FormDatepicker
                  control={form.control}
                  name="tenderDate"
                  allowFutureDates={true}
                  description={errors.tenderDate?.message}
                />
              </div>
              <div className="grid gap-2">
                <div className="col-span-1">
                  <Label className="mb-2" htmlFor="type">
                    <AppModalTooltip
                      instructions={[
                        'Max. allowed file size 5MB',
                        'Allowed file types: PDF, MSWord',
                      ]}
                      label="Select a file"
                    />
                  </Label>
                  <FormSimpleFileUpload
                    control={form.control}
                    name="newFile"
                    description={errors.newFile?.message}
                    className="mb-2"
                  />
                  {selected && selected.file_path && (
                    <defaultIcons.fileAttachment
                      className="size-12 text-muted-foreground/20 cursor-pointer"
                      onClick={handleView}
                    />
                  )}
                </div>
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
