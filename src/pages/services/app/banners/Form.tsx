import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IBannerRow } from '@/interface/services.interface';
import {
  bannersSchema,
  type BannersSchema,
} from '@/schema/services/banners.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useBannerCreate,
  useBannerUpdate,
} from '@/tanstack/services/banners/banners.mutation';
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
import {
  AppRequired,
  FormSelect,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import serviceWebsiteMenus from '@/constants/menu.services.website';
import { titles, defaultIcons } from '@/constants';
import { fileSizes } from '@/utils/format.validation';
import { Trash2 } from 'lucide-react';

const Form = () => {
  const {
    formState: { isSubmitting, errors },
    ...form
  } = useForm<BannersSchema>({
    defaultValues: { page: '', newImg: undefined, oldImg: '' },
    mode: 'all',
    resolver: zodResolver(bannersSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const add = useBannerCreate();
  const update = useBannerUpdate();
  const menus = serviceWebsiteMenus() as IWebsiteMenuProps[];
  const formattedMenus: { value: string; label: string }[] = [];
  menus
    .filter((m) => !m.subMenus)
    .map((m) => formattedMenus.push({ value: m.link!, label: m.name }));
  menus
    .filter((m) => m.subMenus)
    .map((m) => {
      m.subMenus?.map((s) =>
        formattedMenus.push({ value: s.link!, label: s.name }),
      );
    });
  formattedMenus.sort((a, b) => a.label.localeCompare(b.label));

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['page-banner-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IBannerRow | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    setFiles([]);
    queryClient.removeQueries({ queryKey: ['page-banner-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: BannersSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Page banner ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof BannersSchema, {
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
        page: selected.page_url,
        oldImg: selected.image_path,
        newImg: undefined,
      });
    } else {
      form.reset({
        page: '',
        newImg: undefined,
        oldImg: '',
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
                <FormSelect
                  control={form.control}
                  name="page"
                  options={formattedMenus}
                  description={errors.page?.message}
                  placeholder="Select a page"
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
                    files[0].file.size <= fileSizes().max10mb && (
                      <img
                        src={URL.createObjectURL(files[0].file)}
                        alt=""
                        className="w-full max-h-28 object-cover"
                      />
                    )}
                  {!form.getValues('oldImg') && files.length === 0 && (
                    <defaultIcons.banner className="w-full h-full text-muted" />
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
