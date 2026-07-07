import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IVocScheme } from '@/interface/services.interface';
import {
  vocSchemeSchema,
  type VocSchemeSchema,
} from '@/schema/services/youth-training.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useVocSchemeCreate,
  useVocSchemeUpdate,
} from '@/tanstack/services/youth-training/voc-training.mutation';
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
import { AppRequired, FormTextarea, SubmitBtn } from '@/components';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<VocSchemeSchema>({
    defaultValues: { scheme: '' },
    mode: 'all',
    resolver: zodResolver(vocSchemeSchema),
  });
  const add = useVocSchemeCreate();
  const update = useVocSchemeUpdate();

  // -------------------------

  const { data: selected } = useQuery({
    queryKey: ['voc-scheme-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IVocScheme | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // -------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['voc-scheme-selected'] });
    form.reset();
  };

  // -------------------------

  const handleSubmit = async (data: VocSchemeSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Scheme content ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof VocSchemeSchema, {
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
        scheme: selected.content,
      });
    } else {
      form.reset({
        scheme: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} scheme content</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Scheme content <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="scheme"
                  placeholder="Enter scheme content"
                  description={errors.scheme?.message}
                  maxLen={250}
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
