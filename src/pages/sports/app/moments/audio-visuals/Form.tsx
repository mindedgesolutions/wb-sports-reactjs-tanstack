import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IAudioVisualRow } from '@/interface/sports.interface';
import {
  audioVisualSchema,
  type AudioVisualSchema,
} from '@/schema/sports/moments.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useAudioVisualCreate,
  useAudioVisualUpdate,
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
  FormInput,
  SubmitBtn,
  YouTubeThumbnailPreview,
} from '@/components';
import { Globe } from 'lucide-react';
import { CgWebsite } from 'react-icons/cg';
import { Button } from '@/components/ui/button';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AudioVisualSchema>({
    defaultValues: { url: '', title: '' },
    mode: 'all',
    resolver: zodResolver(audioVisualSchema),
  });
  const add = useAudioVisualCreate();
  const update = useAudioVisualUpdate();

  // ------------------------------

  const { data: selected } = useQuery({
    queryKey: ['audio-visual-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IAudioVisualRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['audio-visual-selected'] });
    form.reset();
  };

  // ------------------------------

  const handleSubmit = async (data: AudioVisualSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Video ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;
        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof AudioVisualSchema, {
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

  const url = form.watch('url');

  useEffect(() => {
    if (selected) {
      form.reset({
        url: selected.video_link,
        title: selected.title || '',
      });
    } else {
      form.reset({
        url: '',
        title: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add '} video</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Video title</Label>
                <FormInput
                  register={form.register}
                  name="title"
                  placeholder="Enter video title"
                  description={errors.title?.message}
                  iconStart={<Globe />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Video URL
                  <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="url"
                  placeholder="Enter YouTube video URL"
                  description={errors.url?.message}
                  iconStart={<CgWebsite />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Preview</Label>
                <div className="w-full max-h-52 h-44 border border-dashed overflow-hidden">
                  {url && (
                    <YouTubeThumbnailPreview
                      url={url}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
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
