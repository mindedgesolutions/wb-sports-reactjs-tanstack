import { useEffect, useState } from 'react';
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
  FormInput,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, User } from 'lucide-react';
import { fileSizes } from '@/utils/format.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { titles } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/tanstack/query.client';
import { PiTreeStructureLight } from 'react-icons/pi';
import { SlBadge } from 'react-icons/sl';
import { PiUserCircleLight } from 'react-icons/pi';
import {
  keyPersonnelSchema,
  type KeyPersonnelSchema,
} from '@/schema/sports/about-us.schema';
import {
  useKeyPersonnelCreate,
  useKeyPersonnelUpdate,
} from '@/tanstack/sports/about-us/about-us.mutation';
import type { IKeyPersonnelRow } from '@/interface/sports.interface';
import { showSuccess } from '@/alerts/show.success';
import { showError } from '@/alerts/show.error';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<KeyPersonnelSchema>({
    defaultValues: {
      name: '',
      rank: '',
      designation: '',
      oldImg: '',
      newImg: undefined,
    },
    mode: 'all',
    resolver: zodResolver(keyPersonnelSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const add = useKeyPersonnelCreate();
  const update = useKeyPersonnelUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['key-personnel-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IKeyPersonnelRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    setFiles([]);
    queryClient.removeQueries({ queryKey: ['key-personnel-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: KeyPersonnelSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Key personnel ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof KeyPersonnelSchema, {
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
        name: selected.name,
        rank: selected.rank || '',
        designation: selected.designation,
        oldImg: selected.image_path || undefined,
        newImg: undefined,
      });
    } else {
      form.reset({
        name: '',
        rank: '',
        designation: '',
        oldImg: '',
        newImg: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} key personnel</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
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
                <Label htmlFor="rank">Rank</Label>
                <FormInput
                  register={form.register}
                  name="rank"
                  placeholder="Enter rank"
                  description={errors.rank?.message}
                  iconStart={<PiTreeStructureLight />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">
                  Designation <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="designation"
                  placeholder="Enter designation"
                  description={errors.designation?.message}
                  iconStart={<SlBadge />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newImg">Upload an image</Label>
                <div className="p-1 border border-muted-foreground/30 border-dashed w-32 h-32 relative">
                  {form.getValues('oldImg') && files.length === 0 && (
                    <img
                      src={`${titles.BASE_URL}${form.getValues('oldImg')}`}
                      alt="Existing"
                      className="w-full max-h-28 object-cover"
                    />
                  )}
                  {files.length > 0 &&
                    files[0].file.size <= fileSizes().max2mb && (
                      <img
                        src={URL.createObjectURL(files[0].file)}
                        alt=""
                        className="w-full max-h-28 object-cover"
                      />
                    )}
                  {!form.getValues('oldImg') && files.length === 0 && (
                    <PiUserCircleLight className="w-full h-full text-muted" />
                  )}
                  <FormUploadSingle
                    setFiles={setFiles}
                    files={files}
                    setFormImg={(file: File) => form.setValue('newImg', file)}
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
