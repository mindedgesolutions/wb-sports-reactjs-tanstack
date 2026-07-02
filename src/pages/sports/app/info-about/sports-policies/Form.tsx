import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { ISportsPolicyRow } from '@/interface/sports.interface';
import {
  sportsPolicySchema,
  type SportsPolicySchema,
} from '@/schema/sports/info-about.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useSportsPolicyCreate,
  useSportsPolicyUpdate,
} from '@/tanstack/sports/info-about/info-about.mutation';
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
  FormInput,
  FormSimpleFileUpload,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { SlBadge } from 'react-icons/sl';
import { defaultIcons } from '@/constants';
import { Button } from '@/components/ui/button';
import { handleFileOpen } from '@/utils/functions';

const instructions: string[] = [
  'Allowed file types: PDF, MSWord',
  'Attachment size must be less than 5MB',
];

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<SportsPolicySchema>({
    defaultValues: { name: '', newFile: undefined, existingFile: '' },
    mode: 'all',
    resolver: zodResolver(sportsPolicySchema),
  });
  const add = useSportsPolicyCreate();
  const update = useSportsPolicyUpdate();

  // ------------------------------

  const { data: selected } = useQuery({
    queryKey: ['sports-policy-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: ISportsPolicyRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['sports-policy-selected'] });
    form.reset();
  };

  // ------------------------------

  const handleSubmit = async (data: SportsPolicySchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Sports policy ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;
        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof SportsPolicySchema, {
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
        name: selected.name,
        newFile: undefined,
        existingFile: selected.file_path,
      });
    } else {
      form.reset({
        name: '',
        newFile: undefined,
        existingFile: undefined,
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
        <CardTitle>{selected ? 'Edit' : 'Add '} award</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Policy name
                  <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder="Enter award title"
                  description={errors.name?.message}
                  iconStart={<SlBadge />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newFile">
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
