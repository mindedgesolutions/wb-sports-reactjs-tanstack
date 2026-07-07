import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import { fetchDistricts } from '@/features/common.slice';
import type { IVocTrainingCentre } from '@/interface/services.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  vocTrainingCentreSchema,
  type VocTrainingCentreSchema,
} from '@/schema/services/youth-training.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useVocTrainingCentreCreate,
  useVocTrainingCentreUpdate,
} from '@/tanstack/services/youth-training/voc-training.mutation';
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
  AppModalTooltip,
  AppRequired,
  FormInput,
  FormSelect,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { defaultIcons } from '@/constants';

const Form = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);

  const { districts } = useAppSelector((state) => state.common) as {
    districts: IDistrict[] | null;
  };
  const districtOptions = districts?.map((d) => ({
    value: d.id,
    label: d.name,
  })) as [];

  const {
    formState: { errors },
    ...form
  } = useForm<VocTrainingCentreSchema>({
    defaultValues: { district: '', name: '', address: '', phone: '' },
    mode: 'all',
    resolver: zodResolver(vocTrainingCentreSchema),
  });
  const add = useVocTrainingCentreCreate();
  const update = useVocTrainingCentreUpdate();

  // -------------------------

  const { data: selected } = useQuery({
    queryKey: ['voc-training-centre-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: IVocTrainingCentre | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // -------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['voc-training-centre-selected'] });
    form.reset();
  };

  // -------------------------

  const handleSubmit = async (data: VocTrainingCentreSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Training centre ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof VocTrainingCentreSchema, {
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

  // -------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        district: String(selected.district_id),
        name: selected.name_of_centre,
        address: selected.address,
        phone: selected.phone || '',
      });
    } else {
      form.reset({
        district: '',
        name: '',
        address: '',
        phone: '',
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} scheme content</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  District <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="district"
                  options={districtOptions}
                  description={errors.district?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Centre name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder="Enter centre name"
                  description={errors.name?.message}
                  iconStart={<defaultIcons.building />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Address <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="address"
                  placeholder="Enter centre address"
                  description={errors.address?.message}
                  maxLen={250}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  <AppModalTooltip
                    label="Phone no."
                    instructions={['Landline no. format: 33XXXXXXXX']}
                  />
                </Label>
                <FormInput
                  register={form.register}
                  name="phone"
                  placeholder="Enter phone no."
                  description={errors.phone?.message}
                  iconStart={<defaultIcons.phone />}
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
