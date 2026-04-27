import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { ISportsEventRow } from '@/interface/sports.interface';
import {
  sportsEventsSchema,
  type SportsEventsSchema,
} from '@/schema/sports/sports.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useSportsEventsCreate,
  useSportsEventsUpdate,
} from '@/tanstack/sports/sports/sports.mutation';
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
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<SportsEventsSchema>({
    defaultValues: { title: '', eventDate: undefined },
    mode: 'all',
    resolver: zodResolver(sportsEventsSchema),
  });
  const add = useSportsEventsCreate();
  const update = useSportsEventsUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['sports-event-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: ISportsEventRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['sports-event-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: SportsEventsSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Sports event ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof SportsEventsSchema, {
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
        title: selected.title,
        eventDate: selected.event_date,
      });
    } else {
      form.reset({
        title: '',
        eventDate: undefined,
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
                  Title <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="title"
                  description={errors.title?.message}
                  placeholder="Enter title"
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <FormDatepicker
                  control={form.control}
                  name="eventDate"
                  allowFutureDates={false}
                  description={errors.eventDate?.message}
                  id="eventDate"
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
