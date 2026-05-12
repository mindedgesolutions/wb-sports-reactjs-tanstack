import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IBulletinRow } from '@/interface/sports.interface';
import {
  bulletinsSchema,
  type BulletinsSchema,
} from '@/schema/sports/moments.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useBulletinCreate,
  useBulletinUpdate,
} from '@/tanstack/sports/moments/moments.mutation';
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
import {
  AppRequired,
  FormDatepicker,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import { GoFile } from 'react-icons/go';
import { Trash2 } from 'lucide-react';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<BulletinsSchema>({
    defaultValues: {
      name: '',
      eventDate: undefined,
      newFile: undefined,
      oldFile: '',
    },
    mode: 'all',
    resolver: zodResolver(bulletinsSchema),
  });
  const add = useBulletinCreate();
  const update = useBulletinUpdate();

  // ------------------------------

  const { data: selected } = useQuery({
    queryKey: ['bulletin-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IBulletinRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['bulletin-selected'] });
    form.reset();
  };

  // ------------------------------

  const handleSubmit = async (data: BulletinsSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Bulletin ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;
        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof BulletinsSchema, {
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
        eventDate: selected.event_date || undefined,
        newFile: undefined,
        oldFile: selected.file_path,
      });
    } else {
      form.reset({
        name: '',
        eventDate: undefined,
        newFile: undefined,
        oldFile: '',
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
                <Label htmlFor="name">Bulletin title</Label>
                <FormTextarea
                  register={form.register}
                  name="name"
                  placeholder="Enter bulletin title"
                  description={errors.name?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Event date</Label>
                <span className="flex items-center gap-2">
                  <FormDatepicker
                    control={form.control}
                    name="eventDate"
                    allowFutureDates={false}
                    description={errors.eventDate?.message}
                  />
                  <Trash2
                    className="text-destructive h-4 w-4 cursor-pointer"
                    onClick={() => form.setValue('eventDate', undefined)}
                  />
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Select a file <AppRequired />
                </Label>
                <FormSimpleFileUpload
                  control={form.control}
                  name="newFile"
                  description={errors.newFile?.message}
                />
              </div>
              {selected && (
                <a
                  href={`${titles.BASE_URL}${selected.file_path}`}
                  target="_blank"
                >
                  <GoFile className="size-12 text-muted-foreground/20" />
                </a>
              )}
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
