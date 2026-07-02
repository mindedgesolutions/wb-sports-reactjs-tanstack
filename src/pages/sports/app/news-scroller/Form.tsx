import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { INewsScrollerRow } from '@/interface/sports.interface';
import {
  newsScrollerSchema,
  type NewsScrollerSchema,
} from '@/schema/sports/news-scroller.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useNewsScrollerCreate,
  useNewsScrollerUpdate,
} from '@/tanstack/sports/news-scroller/news-scroller.mutation';
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
  AppModalTooltip,
  AppRequired,
  FormDatepicker,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import { GoFile } from 'react-icons/go';

const instructions: string[] = [
  'Allowed file types: PDF, MSWord, jpeg, png, gif',
  'Attachment size must be less than 10MB',
];

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<NewsScrollerSchema>({
    defaultValues: {
      title: '',
      description: '',
      newsDate: undefined,
      newFile: undefined,
      existingFile: '',
    },
    mode: 'all',
    resolver: zodResolver(newsScrollerSchema),
  });
  const add = useNewsScrollerCreate();
  const update = useNewsScrollerUpdate();

  // ---------------------------------

  const { data: selected } = useQuery({
    queryKey: ['news-scroller-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: INewsScrollerRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ---------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['news-scroller-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: NewsScrollerSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`News ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof NewsScrollerSchema, {
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
        newsDate: selected.news_date ? new Date(selected.news_date) : undefined,
        newFile: undefined,
        existingFile: selected.file_path,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        newsDate: undefined,
        newFile: undefined,
        existingFile: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add'} news</CardTitle>
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
                  placeholder="Enter title"
                  description={errors.title?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Description</Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder="Enter description"
                  description={errors.description?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newsDate">News Date</Label>
                <div className="flex items-center gap-2">
                  <FormDatepicker
                    control={form.control}
                    id="newsDate"
                    name="newsDate"
                    description={errors.newsDate?.message}
                    allowFutureDates={false}
                  />
                  <X
                    className="text-destructive h-4 cursor-pointer"
                    onClick={() => form.setValue('newsDate', undefined)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newFile">
                  <AppModalTooltip
                    label="Attachment"
                    instructions={instructions}
                  />{' '}
                  {!selected && <AppRequired />}
                </Label>
                <FormSimpleFileUpload
                  control={form.control}
                  name="newFile"
                  description={errors.newFile?.message}
                />
                {selected && (
                  <a
                    href={`${titles.BASE_URL}${selected.file_path}`}
                    target="_blank"
                  >
                    <GoFile className="size-12 text-muted-foreground/20" />
                  </a>
                )}
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
