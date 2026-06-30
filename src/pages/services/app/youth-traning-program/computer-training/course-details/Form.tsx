import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { ICompCourseDetails } from '@/interface/services.interface';
import {
  compCourseDetailsSchema,
  type CompCourseDetailsSchema,
} from '@/schema/services/youth-training.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useCompCourseDetailsCreate,
  useCompCourseDetailsUpdate,
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
import { AppRequired, FormInput, FormSelect, SubmitBtn } from '@/components';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { compCourseDuration, compCourseTypes } from '@/constants';
import { IndianRupee, LaptopMinimalCheck, SquarePen } from 'lucide-react';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<CompCourseDetailsSchema>({
    defaultValues: {
      courseType: '',
      courseName: '',
      duration: '',
      courseFee: '',
      eligibility: '',
    },
    mode: 'all',
    resolver: zodResolver(compCourseDetailsSchema),
  });
  const add = useCompCourseDetailsCreate();
  const update = useCompCourseDetailsUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['comp-course-details-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: ICompCourseDetails | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['comp-course-details-selected'] });
    form.reset();
  };

  // ---------------------------------

  const handleSubmit = async (data: CompCourseDetailsSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Course details ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof CompCourseDetailsSchema, {
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
        courseType: selected.course_type,
        courseName: selected.course_name,
        duration: selected.course_duration || '',
        courseFee: String(selected.course_fees) || '',
        eligibility: selected.course_eligibility || '',
      });
    } else {
      form.reset({
        courseType: '',
        courseName: '',
        duration: '',
        courseFee: '',
        eligibility: '',
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
                  Course type <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="courseType"
                  options={compCourseTypes}
                  description={errors.courseType?.message}
                  placeholder="Select a type"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Course name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="courseName"
                  placeholder="Enter course name"
                  description={errors.courseName?.message}
                  iconStart={<LaptopMinimalCheck />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="achievementDate">
                  Course duration <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="duration"
                  options={compCourseDuration}
                  description={errors.duration?.message}
                  placeholder="Select course duration"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="achievementDate">
                  Course fee <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="courseFee"
                  placeholder="Enter course fee"
                  description={errors.courseFee?.message}
                  iconStart={<IndianRupee />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="achievementDate">
                  Course eligibility <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="eligibility"
                  placeholder="Enter course eligibility"
                  description={errors.eligibility?.message}
                  iconStart={<SquarePen />}
                />
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
