import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { IMountainCourse } from '@/interface/services.interface';
import {
  mountainCourseSchema,
  type MountainCourseSchema,
} from '@/schema/services/mountaineering.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useMountainCourseCreate,
  useMountainCourseUpdate,
} from '@/tanstack/services/mountaineering/mountaineering.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AppModalTooltip,
  AppRequired,
  FormInput,
  FormSimpleFileUpload,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { defaultIcons } from '@/constants';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { handleFileOpen } from '@/utils/functions';

const Form = ({ course }: { course?: IMountainCourse }) => {
  const [open, setOpen] = useState(false);
  const openModal = (state: boolean) => {
    setOpen(state);
    if (state) {
      if (course) {
        form.reset({
          name: course.name,
          duration: String(course.duration),
          count: String(course.courses_count),
          start: String(course.age_group_start),
          end: String(course.age_group_end),
          remarks: course.remarks || '',
          fee: String(course.course_fee) || '',
          newFile: undefined,
          oldFile: course.file_path || '',
        });
      } else {
        reset();
      }
    }
  };

  const {
    formState: { errors },
    ...form
  } = useForm<MountainCourseSchema>({
    defaultValues: {
      name: '',
      duration: '',
      count: '',
      start: '',
      end: '',
      remarks: '',
      fee: '',
      newFile: undefined,
      oldFile: '',
    },
    mode: 'all',
    resolver: zodResolver(mountainCourseSchema),
  });
  const add = useMountainCourseCreate();
  const update = useMountainCourseUpdate();

  // ----------------------------

  const { data: selected } = useQuery({
    queryKey: ['mountain-course-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IMountainCourse | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------

  const reset = () => {
    form.reset({
      name: '',
      duration: '',
      count: '',
      start: '',
      end: '',
      remarks: '',
      fee: '',
      newFile: undefined,
      oldFile: '',
    });
    queryClient.removeQueries({ queryKey: ['mountain-course-selected'] });
  };

  // ----------------------------

  const handleSubmit = async (data: MountainCourseSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Course ${msg} successfully`);
        setOpen(false);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof MountainCourseSchema, {
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

  // ----------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        name: selected.name,
        duration: String(selected.duration),
        count: String(selected.courses_count),
        start: String(selected.age_group_start),
        end: String(selected.age_group_end),
        remarks: selected.remarks || '',
        fee: String(selected.course_fee) || '',
        newFile: undefined,
        oldFile: selected.file_path || '',
      });
    } else {
      form.reset({
        name: '',
        duration: '',
        count: '',
        start: '',
        end: '',
        remarks: '',
        fee: '',
        newFile: undefined,
        oldFile: '',
      });
    }
  }, [selected]);

  // ----------------------------

  const handleView = () => {
    selected && handleFileOpen(selected.file_path!, selected.file_name!);
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        {course ? (
          <Button
            type="button"
            variant="ghost"
            size={'icon-xs'}
            onClick={() => {
              queryClient.setQueryData(['mountain-course-selected'], course);
            }}
          >
            <HiOutlinePencilAlt className="size-4 text-warn" />
          </Button>
        ) : (
          <Button type="button" size={'sm'} className="rounded-sm">
            Add new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{course ? 'Edit' : 'Add new'} course</DialogTitle>
          <DialogDescription>
            Click the Save button at the bottom
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
          <div className="w-full mt-6">
            <ScrollArea className="sm:max-w-xl max-h-96 overflow-y-scroll">
              <div className="flex flex-col gap-6 mx-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="type">
                      Course name <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="name"
                      placeholder="Enter course name"
                      description={errors.name?.message}
                      iconStart={<defaultIcons.briefcase />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="type">
                      <AppModalTooltip
                        instructions={['Max. allowed figure 100']}
                        label="No. of courses"
                      />{' '}
                      <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="count"
                      placeholder="Enter no. of courses"
                      description={errors.count?.message}
                      iconStart={<defaultIcons.numbers />}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="type">
                      <AppModalTooltip
                        instructions={['Max. allowed figure 100']}
                        label="Course duration"
                      />
                      <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="duration"
                      placeholder="Enter course duration"
                      description={errors.duration?.message}
                      iconStart={<defaultIcons.calendar />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="type">
                      <AppModalTooltip
                        instructions={['Min. allowed figure 5']}
                        label="Starting age group"
                      />
                      <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="start"
                      placeholder="Enter starting age group"
                      description={errors.start?.message}
                      iconStart={<defaultIcons.userOutline />}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="type">
                      <AppModalTooltip
                        instructions={['Max. allowed figure 70']}
                        label="Ending age group"
                      />
                      <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="end"
                      placeholder="Enter ending age group"
                      description={errors.end?.message}
                      iconStart={<defaultIcons.userOutline />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="type">
                      Remarks
                    </Label>
                    <FormTextarea
                      register={form.register}
                      name="remarks"
                      placeholder="Enter remarks"
                      description={errors.remarks?.message}
                      maxLen={500}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <Label className="mb-2" htmlFor="type">
                      Course fee
                    </Label>
                    <FormInput
                      register={form.register}
                      name="fee"
                      placeholder="Enter course fee"
                      description={errors.fee?.message}
                      iconStart={<defaultIcons.inr />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <Label className="mb-2" htmlFor="type">
                      <AppModalTooltip
                        instructions={[
                          'Max. allowed file size 5MB',
                          'Allowed file types: PDF, MSWord',
                        ]}
                        label="Course attachment"
                      />
                    </Label>
                    <FormSimpleFileUpload
                      control={form.control}
                      name="newFile"
                      description={errors.newFile?.message}
                      className="mb-2"
                    />
                    {selected && selected.file_path && (
                      <defaultIcons.fileAttachment
                        className="size-12 text-muted-foreground/20 cursor-pointer"
                        onClick={handleView}
                      />
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="mt-8 flex justify-between">
            <Button
              type="reset"
              size={'default'}
              variant="outline"
              onClick={reset}
            >
              Reset
            </Button>
            <SubmitBtn isSubmitting={isLoading} label="Save" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default Form;
