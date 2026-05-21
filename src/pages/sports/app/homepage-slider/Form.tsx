import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  homepageSliderSchema,
  type HomepageSliderSchema,
} from '@/schema/sports/homepage-slider.schema';
import { queryClient } from '@/tanstack/query.client';
import { useHomepageSliderCreate } from '@/tanstack/sports/homepage-sliders/homepage-sliders.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FormUploadSingle, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import { fileSizes } from '@/utils/format.validation';
import { PiUserCircleLight } from 'react-icons/pi';
import { Trash2 } from 'lucide-react';

const Form = () => {
  const { ...form } = useForm<HomepageSliderSchema>({
    defaultValues: { newImage: undefined, existingImage: '' },
    mode: 'all',
    resolver: zodResolver(homepageSliderSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const add = useHomepageSliderCreate();
  const isLoading = add.isPending;

  // ----------------------------------

  const reset = () => {
    setFiles([]);
    queryClient.removeQueries({ queryKey: ['homepage-slider-selected'] });
    form.reset();
  };

  // ----------------------------------

  const handleSubmit = async (data: HomepageSliderSchema) => {
    add.mutate(data as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Image added successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof HomepageSliderSchema, {
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

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add new image</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="newImg">Upload an image</Label>
                <div className="flex p-1 border border-muted-foreground/30 border-dashed w-64 md:w-80 h-32 relative">
                  {form.getValues('existingImage') && files.length === 0 && (
                    <img
                      src={`${titles.BASE_URL}${form.getValues('existingImage')}`}
                      alt="Existing"
                      className="w-full max-h-28 object-cover"
                    />
                  )}
                  {files.length > 0 &&
                    files[0].file.size <= fileSizes().max10mb && (
                      <img
                        src={URL.createObjectURL(files[0].file)}
                        alt=""
                        className="w-full max-h-28 object-cover"
                      />
                    )}
                  {!form.getValues('existingImage') && files.length === 0 && (
                    <PiUserCircleLight className="w-full h-full text-muted" />
                  )}
                  <FormUploadSingle
                    setFiles={setFiles}
                    files={files}
                    setFormImg={(file: File) => form.setValue('newImage', file)}
                    maxAllowed={fileSizes().max1mb}
                    aspectRatio={16 / 9}
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
              label={'Add'}
              submitLabel="Submitting ..."
            />
          </CardFooter>
        </fieldset>
      </form>
    </Card>
  );
};
export default Form;
