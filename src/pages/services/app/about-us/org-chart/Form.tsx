import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IOrgChart } from '@/interface/services.interface';
import {
  orgChartSchema,
  type OrgChartSchema,
} from '@/schema/services/about-us.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useOrgChartCreate,
  useOrgChartUpdate,
} from '@/tanstack/services/about-us/about-us.mutation';
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
  AppModalTooltip,
  AppRequired,
  FormInput,
  FormSelect,
  FormTextarea,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, User } from 'lucide-react';
import { PiTreeStructureLight, PiUserCircleLight } from 'react-icons/pi';
import { SlBadge } from 'react-icons/sl';
import { titles } from '@/constants';
import { fileSizes } from '@/utils/format.validation';

const instructions: string[] = [
  'Allowed file types: jpeg, png, gif',
  'Attachment size must be less than 10MB',
];

const DepartmentOptions = [
  { value: 'secretariat', label: 'Secretariat' },
  { value: 'directorate', label: 'Directorate' },
];

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<OrgChartSchema>({
    defaultValues: {
      name: '',
      designation: '',
      department: '',
      rank: '',
      message: '',
      newImg: undefined,
      oldImg: '',
    },
    mode: 'all',
    resolver: zodResolver(orgChartSchema),
  });
  const add = useOrgChartCreate();
  const update = useOrgChartUpdate();
  const [files, setFiles] = useState<any[]>([]);

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['org-chart-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IOrgChart | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    setFiles([]);
    queryClient.removeQueries({ queryKey: ['org-chart-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: OrgChartSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Organisation chart updated successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof OrgChartSchema, {
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
        designation: selected.designation || '',
        department: selected.department || '',
        rank: selected.rank || '',
        message: selected.message || '',
        newImg: undefined,
        oldImg: selected.image_path || undefined,
      });
    } else {
      form.reset({
        name: '',
        designation: '',
        department: '',
        rank: '',
        message: '',
        newImg: undefined,
        oldImg: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} personnel</CardTitle>
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
                <Label htmlFor="rank">
                  Department <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="department"
                  options={DepartmentOptions.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  )}
                  description={errors.department?.message}
                  placeholder="Select department"
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
                <Label htmlFor="rank">Message</Label>
                <FormTextarea
                  register={form.register}
                  name="message"
                  description={errors.message?.message}
                  placeholder="Enter message"
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newImg">
                  <AppModalTooltip
                    label="Upload an image"
                    instructions={instructions}
                  />
                </Label>
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
                    <PiUserCircleLight className="w-full h-full text-muted" />
                  )}
                  <FormUploadSingle
                    setFiles={setFiles}
                    files={files}
                    setFormImg={(file: File) => form.setValue('newImg', file)}
                    maxAllowed={fileSizes().max10mb}
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
