import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IAssocSiteRow } from '@/interface/sports.interface';
import {
  assocSiteSchema,
  type AssocSiteSchema,
} from '@/schema/sports/info-about.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useAssocSiteCreate,
  useAssocSiteUpdate,
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
import { AppRequired, FormInput, SubmitBtn } from '@/components';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CgWebsite } from 'react-icons/cg';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AssocSiteSchema>({
    defaultValues: { title: '', url: '' },
    mode: 'all',
    resolver: zodResolver(assocSiteSchema),
  });
  const add = useAssocSiteCreate();
  const update = useAssocSiteUpdate();

  // ------------------------------

  const { data: selected } = useQuery({
    queryKey: ['assoc-site-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IAssocSiteRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['award-selected'] });
    form.reset();
  };

  // ------------------------------

  const handleSubmit = async (data: AssocSiteSchema) => {
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
              form.setError(key as keyof AssocSiteSchema, {
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
        title: selected.title,
        url: selected.url,
      });
    } else {
      form.reset({
        title: '',
        url: '',
      });
    }
  }, [selected]);

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
                  Site title
                  <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="title"
                  placeholder="Enter website title"
                  description={errors.title?.message}
                  iconStart={<Globe />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Site URL
                  <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="url"
                  placeholder="Enter website URL"
                  description={errors.url?.message}
                  iconStart={<CgWebsite />}
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
