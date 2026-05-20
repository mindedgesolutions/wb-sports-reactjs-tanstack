import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IContactUsRow } from '@/interface/sports.interface';
import {
  contactUsSchema,
  type ContactUsSchema,
} from '@/schema/sports/contact-us.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useContactUsCreate,
  useContactUsUpdate,
} from '@/tanstack/sports/contact-us/contact-us.mutation';
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
import { Label } from '@/components/ui/label';
import { AppRequired, FormInput, FormTextarea, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<ContactUsSchema>({
    defaultValues: {
      designation: '',
      name: '',
      address: '',
      email: '',
      phone_1: '',
      phone_2: '',
      fax: '',
    },
    mode: 'all',
    resolver: zodResolver(contactUsSchema),
  });
  const add = useContactUsCreate();
  const update = useContactUsUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['contact-us-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IContactUsRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['contact-us-selected'] });
    form.reset();
  };

  // ----------------------------------

  const handleSubmit = async (data: ContactUsSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Contact information ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof ContactUsSchema, {
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

  // ----------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        designation: selected.designation,
        name: selected.name,
        address: selected.address || '',
        email: selected.email || '',
        phone_1: selected.phone_1 || '',
        phone_2: selected.phone_2 || '',
        fax: selected.fax || '',
      });
    } else {
      form.reset({
        designation: '',
        name: '',
        address: '',
        email: '',
        phone_1: '',
        phone_2: '',
        fax: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} contact</CardTitle>
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
                  id="designation"
                  placeholder="Enter designation"
                  description={errors.designation?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  description={errors.name?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Address</Label>
                <FormTextarea
                  register={form.register}
                  name="address"
                  id="address"
                  placeholder="Enter addrress"
                  description={errors.address?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <FormInput
                  register={form.register}
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  description={errors.email?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone_1">Phone 1</Label>
                <FormInput
                  register={form.register}
                  name="phone_1"
                  id="phone_1"
                  placeholder="Enter phone no."
                  description={errors.phone_1?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone_2">Phone 2</Label>
                <FormInput
                  register={form.register}
                  name="phone_2"
                  id="phone_2"
                  placeholder="Enter phone no."
                  description={errors.phone_2?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fax">FAX</Label>
                <FormInput
                  register={form.register}
                  name="fax"
                  id="fax"
                  placeholder="Enter FAX no."
                  description={errors.fax?.message}
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
