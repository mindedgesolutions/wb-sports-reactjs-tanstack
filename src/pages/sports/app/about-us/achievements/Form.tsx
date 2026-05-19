import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IAchievementRow } from '@/interface/sports.interface';
import {
  achievementSchema,
  type AchievementSchema,
} from '@/schema/sports/about-us.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useAchievementsCreate,
  useAchievementsUpdate,
} from '@/tanstack/sports/about-us/about-us.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
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
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AchievementSchema>({
    defaultValues: { title: '', description: '', achievementDate: undefined },
    mode: 'all',
    resolver: zodResolver(achievementSchema),
  });
  const add = useAchievementsCreate();
  const update = useAchievementsUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['achievement-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IAchievementRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['achievement-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: AchievementSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Achievement ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof AchievementSchema, {
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
        title: selected.title,
        description: selected.description || '',
        achievementDate: selected.achievement_date,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        achievementDate: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} achievement</CardTitle>
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
                  placeholder="Enter name"
                  description={errors.title?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Description</Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder="Enter name"
                  description={errors.description?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="achievementDate">Achievement Date</Label>
                <FormDatepicker
                  control={form.control}
                  name="achievementDate"
                  description={errors.achievementDate?.message}
                  allowFutureDates={false}
                  id="achievementDate"
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
