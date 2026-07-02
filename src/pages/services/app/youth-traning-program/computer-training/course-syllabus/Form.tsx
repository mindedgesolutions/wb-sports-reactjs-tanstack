import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { ICourseSyllabus } from '@/interface/services.interface';
import {
  courseSyllabusSchema,
  type CourseSyllabusSchema,
} from '@/schema/services/youth-training.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useCompSyllabusCreate,
  useCompSyllabusUpdate,
} from '@/tanstack/services/youth-training/comp-training.mutation';
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
  FormInput,
  FormSimpleFileUpload,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LaptopMinimalCheck } from 'lucide-react';
import { titles, defaultIcons } from '@/constants';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<CourseSyllabusSchema>({
    defaultValues: { syllabusName: '', newFile: undefined, oldFile: '' },
    mode: 'all',
    resolver: zodResolver(courseSyllabusSchema),
  });
  const add = useCompSyllabusCreate();
  const update = useCompSyllabusUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['comp-syllabus-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: ICourseSyllabus | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['comp-syllabus-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: CourseSyllabusSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Course syllabus ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof CourseSyllabusSchema, {
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
        syllabusName: selected.name,
        newFile: undefined,
        oldFile: selected.file_path,
      });
    } else {
      form.reset({
        syllabusName: '',
        newFile: undefined,
        oldFile: '',
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
                  Syllabus name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="syllabusName"
                  placeholder="Enter syllabus name"
                  description={errors.syllabusName?.message}
                  iconStart={<LaptopMinimalCheck />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="achievementDate">
                  Upload attachment {!selected && <AppRequired />}
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
                    <defaultIcons.pdf className="size-12 text-destructive/80" />
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
