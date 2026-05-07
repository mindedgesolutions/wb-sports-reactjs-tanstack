import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IAmphanPhotoRow } from '@/interface/sports.interface';
import {
  amphanPhotosSchema,
  type AmphanPhotosSchema,
} from '@/schema/sports/moments.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useAmphanPhotoCreate,
  useAmphanPhotoUpdate,
} from '@/tanstack/sports/moments/moments.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormInput, FormUploadSingle, SubmitBtn } from '@/components';
import { Label } from '@/components/ui/label';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { titles } from '@/constants';
import { fileSizes } from '@/utils/format.validation';
import { PiUserCircleLight } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AmphanPhotosSchema>({
    defaultValues: { newImage: undefined, existingImage: '', title: '' },
    mode: 'all',
    resolver: zodResolver(amphanPhotosSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const add = useAmphanPhotoCreate();
  const update = useAmphanPhotoUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['amphan-photo-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IAmphanPhotoRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    setFiles([]);
    queryClient.removeQueries({ queryKey: ['amphan-photo-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: AmphanPhotosSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Photo ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof AmphanPhotosSchema, {
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
        newImage: undefined,
        existingImage: selected.image_path,
        title: selected.title || '',
      });
    } else {
      form.reset({
        newImage: undefined,
        existingImage: '',
        title: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} photo</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Image title</Label>
                <FormInput
                  register={form.register}
                  name="title"
                  placeholder="Enter image title"
                  description={errors.title?.message}
                  iconStart={<MdOutlineAddAPhoto />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newImg">Upload an image</Label>
                <div className="p-1 border border-muted-foreground/30 border-dashed w-32 h-32 relative">
                  {form.getValues('existingImage') && files?.length === 0 && (
                    <img
                      src={`${titles.BASE_URL}${form.getValues('existingImage')}`}
                      alt="Existing"
                      className="w-full max-h-28 object-cover"
                    />
                  )}
                  {files?.length > 0 &&
                    files[0].file.size <= fileSizes().max10mb && (
                      <img
                        src={URL.createObjectURL(files[0].file)}
                        alt=""
                        className="w-full max-h-28 object-cover"
                      />
                    )}
                  {!form.getValues('existingImage') && files?.length === 0 && (
                    <PiUserCircleLight className="w-full h-full text-muted" />
                  )}
                  <FormUploadSingle
                    setFiles={setFiles}
                    files={files}
                    setFormImg={(file: File) => form.setValue('newImage', file)}
                    maxAllowed={fileSizes().max1mb}
                  />
                  <Button
                    size={'icon-xs'}
                    type="button"
                    variant={'ghost'}
                    className="absolute -right-7 bottom-0"
                    onClick={() => setFiles([])}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
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
