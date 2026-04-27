import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import {
  AppRequired,
  FormDatepicker,
  FormInput,
  FormSelect,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Phone, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/tanstack/query.client';
import type { ISportsPersonnelRow } from '@/interface/sports.interface';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';
import {
  sportsPersonnelSchema,
  type SportsPersonnelSchema,
} from '@/schema/sports/sports.schema';
import {
  useSportsPersonnelCreate,
  useSportsPersonnelUpdate,
} from '@/tanstack/sports/sports/sports.mutation';
import { sportsCategories } from '@/constants';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<SportsPersonnelSchema>({
    defaultValues: {
      sport: '',
      name: '',
      dob: undefined,
      address: '',
      contactOne: '',
      contactTwo: '',
    },
    mode: 'all',
    resolver: zodResolver(sportsPersonnelSchema),
  });
  const add = useSportsPersonnelCreate();
  const update = useSportsPersonnelUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['sports-person-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: ISportsPersonnelRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['sports-person-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: SportsPersonnelSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Sports personnel ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof SportsPersonnelSchema, {
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
        sport: selected.sport,
        name: selected.name,
        dob: selected.dob,
        address: selected.address || '',
        contactOne: selected.contact_1 || '',
        contactTwo: selected.contact_2 || '',
      });
    } else {
      form.reset({
        sport: '',
        name: '',
        dob: undefined,
        address: '',
        contactOne: '',
        contactTwo: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} sports personnel</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Sport <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="sport"
                  options={sportsCategories.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  )}
                  description={errors.sport?.message}
                  placeholder="Select a sport"
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
                  iconStart={<User />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <FormDatepicker
                  control={form.control}
                  name="dob"
                  allowFutureDates={false}
                  description={errors.dob?.message}
                  id="dob"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <FormTextarea
                  register={form.register}
                  name="address"
                  maxLen={200}
                  description={errors.address?.message}
                  placeholder="Enter address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactOne">Contact no. 1</Label>
                <FormInput
                  register={form.register}
                  name="contactOne"
                  placeholder="Enter contact no."
                  description={errors.contactOne?.message}
                  iconStart={<Phone />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactTwo">Contact no. 2</Label>
                <FormInput
                  register={form.register}
                  name="contactTwo"
                  placeholder="Enter contact no."
                  description={errors.contactTwo?.message}
                  iconStart={<Phone />}
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
