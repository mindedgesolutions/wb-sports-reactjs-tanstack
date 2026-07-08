import {
  mountainGeneralBodySchema,
  type MountainGeneralBodySchema,
} from '@/schema/services/mountaineering.schema';
import {
  useMountainGeneralBodyCreate,
  useMountainGeneralBodyUpdate,
} from '@/tanstack/services/mountaineering/mountaineering.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AppRequired, FormInput, SubmitBtn } from '@/components';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import type { IMountainGeneralBody } from '@/interface/services.interface';
import { queryClient } from '@/tanstack/query.client';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';
import { useEffect } from 'react';
import { defaultIcons } from '@/constants';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<MountainGeneralBodySchema>({
    defaultValues: { description: '', name: '', designation: '' },
    mode: 'all',
    resolver: zodResolver(mountainGeneralBodySchema),
  });
  const add = useMountainGeneralBodyCreate();
  const update = useMountainGeneralBodyUpdate();

  // -------------------------

  const { data: selected } = useQuery({
    queryKey: ['mountain-general-body-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IMountainGeneralBody | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // -------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['voc-scheme-selected'] });
    form.reset();
  };

  // -------------------------

  const handleSubmit = async (data: MountainGeneralBodySchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Member ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof MountainGeneralBodySchema, {
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
        description: selected.description,
        name: selected.name,
        designation: selected.designation || '',
      });
    } else {
      form.reset({
        description: '',
        name: '',
        designation: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} member</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Designation</Label>
                <FormInput
                  register={form.register}
                  name="designation"
                  placeholder="Enter designation"
                  description={errors.designation?.message}
                  iconStart={<defaultIcons.briefcase />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder="Enter name"
                  description={errors.name?.message}
                  iconStart={<defaultIcons.userOutline />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Description <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="description"
                  placeholder="Enter description"
                  description={errors.description?.message}
                  iconStart={<defaultIcons.chat />}
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
