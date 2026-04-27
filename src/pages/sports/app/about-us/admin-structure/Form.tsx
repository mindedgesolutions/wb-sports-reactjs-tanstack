import { queryClient } from '@/tanstack/query.client';
import { AppRequired, FormInput, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PiTreeStructureLight } from 'react-icons/pi';
import {
  adminStructureSchema,
  type AdminStructureSchema,
} from '@/schema/sports/about-us.schema';
import {
  useAdminStructureCreate,
  useAdminStructureUpdate,
} from '@/tanstack/sports/about-us/about-us.mutation';
import type { IAdminStructureRow } from '@/interface/sports.interface';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AdminStructureSchema>({
    defaultValues: { designation: '' },
    mode: 'all',
    resolver: zodResolver(adminStructureSchema),
  });
  const create = useAdminStructureCreate();
  const update = useAdminStructureUpdate();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['admin-structure-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IAdminStructureRow | undefined };

  const isLoading = selected ? update.isPending : create.isPending;

  // -------------------------------

  const handleSubmit = (data: AdminStructureSchema) => {
    const mutation = selected ? update : create;

    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'Updated' : 'Added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`${msg} successfully`);
      },
      onError: (error) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof AdminStructureSchema, {
                message: message as string,
              });
            },
          );
          return;
        }
        return showError((error as any)?.response?.data?.message);
      },
    });
  };

  // -------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({ designation: selected.designation });
    } else {
      form.reset({ designation: '' });
    }
  }, [selected]);

  // -------------------------------

  const reset = () => {
    form.reset({ designation: '' });
    queryClient.removeQueries({ queryKey: ['admin-structure-selected'] });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} designation</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="designation">
                  Designation <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="designation"
                  placeholder="Enter designation"
                  description={errors.designation?.message}
                  iconStart={<PiTreeStructureLight />}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="reset"
              size={'default'}
              variant="outline"
              onClick={reset}
            >
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
