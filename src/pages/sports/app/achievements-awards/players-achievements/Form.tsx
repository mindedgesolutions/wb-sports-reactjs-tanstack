import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IPlayerAchievementRow } from '@/interface/sports.interface';
import {
  playersAchievementsSchema,
  type PlayersAchievementsSchema,
} from '@/schema/sports/achievements-awards.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  usePlayersAchievementCreate,
  usePlayersAchievementUpdate,
} from '@/tanstack/sports/achievements-awards/achievements-awards.mutation';
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
  FormInput,
  FormSelect,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { sportsCategories } from '@/constants';
import { Button } from '@/components/ui/button';
import { Trash2, User } from 'lucide-react';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<PlayersAchievementsSchema>({
    defaultValues: {
      sport: '',
      name: '',
      description: '',
      achievementDate: undefined,
    },
    mode: 'all',
    resolver: zodResolver(playersAchievementsSchema),
  });
  const add = usePlayersAchievementCreate();
  const update = usePlayersAchievementUpdate();

  // ------------------------------

  const { data: selected } = useQuery({
    queryKey: ['players-achievement-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IPlayerAchievementRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['players-achievement-selected'] });
    form.reset();
  };

  // ------------------------------

  const handleSubmit = async (data: PlayersAchievementsSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Players achievement ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;
        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof PlayersAchievementsSchema, {
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
        sport: selected.sport,
        name: selected.name,
        description: selected.description,
        achievementDate: selected.achievement_date || undefined,
      });
    } else {
      form.reset({
        sport: '',
        name: '',
        description: '',
        achievementDate: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add '} players achievement</CardTitle>
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
                  placeholder="Select a sport"
                  description={errors.sport?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Player's name
                  <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder="Enter player's name"
                  description={errors.name?.message}
                  iconStart={<User />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rank">
                  Achievement <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder="Enter achievement description"
                  description={errors.description?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">Achievement date</Label>
                <span className="flex items-center gap-2">
                  <FormDatepicker
                    control={form.control}
                    name="achievementDate"
                    allowFutureDates={false}
                    description={errors.achievementDate?.message}
                    id="achievementDate"
                  />
                  <Trash2
                    className="text-destructive h-4 w-4 cursor-pointer"
                    onClick={() => form.setValue('achievementDate', undefined)}
                  />
                </span>
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
