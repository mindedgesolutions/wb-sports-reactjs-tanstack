import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import type { ICompTrainingCentre } from '@/interface/services.interface';
import {
  compTrainingCentreSchema,
  type CompTrainingCentreSchema,
} from '@/schema/services/youth-training.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useCompTrainingCentreCreate,
  useCompTrainingCentreUpdate,
} from '@/tanstack/services/youth-training/comp-training.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppRequired, FormInput, FormSelect, SubmitBtn } from '@/components';
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
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDistricts } from '@/features/common.slice';
import { FaLaptopCode } from 'react-icons/fa6';
import { defaultIcons } from '@/constants';

export const compCentreCategory = [
  { label: 'Municipal Corporation Area', value: 'municipal corporation area' },
  { label: 'Municipality Area', value: 'municipality area' },
  { label: 'Panchayat Area', value: 'panchayat area' },
];

const Form = ({ data }: { data?: ICompTrainingCentre }) => {
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

  const [open, setOpen] = useState(false);
  const openModal = (state: boolean) => {
    setOpen(state);
    if (state) {
      if (data) {
        form.reset({
          name: data.yctc_name,
          code: data.yctc_code,
          addressLine1: data.address_line_1 || '',
          addressLine2: data.address_line_2 || '',
          addressLine3: data.address_line_3 || '',
          city: data.city || '',
          pincode: data.pincode || '',
          districtId: String(data.district_id),
          category: data.center_category || '',
          inchargeName: data.center_incharge_name || '',
          inchargeMobile: data.center_incharge_mobile || '',
          inchargeEmail: data.center_incharge_email || '',
          ownerName: data.center_owner_name || '',
          ownerMobile: data.center_owner_mobile || '',
        });
      } else {
        reset();
      }
    }
  };

  const {
    formState: { errors },
    ...form
  } = useForm<CompTrainingCentreSchema>({
    defaultValues: {
      name: '',
      code: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      pincode: '',
      districtId: '',
      category: '',
      inchargeName: '',
      inchargeMobile: '',
      inchargeEmail: '',
      ownerName: '',
      ownerMobile: '',
    },
    mode: 'all',
    resolver: zodResolver(compTrainingCentreSchema),
  });
  const add = useCompTrainingCentreCreate();
  const update = useCompTrainingCentreUpdate();

  // ----------------------------------

  const { data: selected } = useQuery({
    queryKey: ['comp-training-centre-selected'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: ICompTrainingCentre | undefined };

  const isLoading = selected ? update.isPending : add.isPending;

  // ----------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['comp-training-centre-selected'] });
    form.reset({
      name: '',
      code: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      pincode: '',
      districtId: '',
      category: '',
      inchargeName: '',
      inchargeMobile: '',
      inchargeEmail: '',
      ownerName: '',
      ownerMobile: '',
    });
  };

  // ---------------------------------

  const handleSubmit = async (data: CompTrainingCentreSchema) => {
    const mutation = selected ? update : add;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Computer training centre ${msg} successfully`);
        setOpen(false);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof CompTrainingCentreSchema, {
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
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        {data ? (
          <Button
            type="button"
            variant="ghost"
            size={'icon-xs'}
            onClick={() => {
              queryClient.setQueryData(['comp-training-centre-selected'], data);
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
          <DialogTitle>{data ? 'Edit' : 'Add'} training centre</DialogTitle>
          <DialogDescription>
            Click the Save button at the bottom
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full mt-6">
            <ScrollArea className="sm:max-w-xl max-h-120 overflow-y-scroll">
              <div className="flex flex-col gap-6 mx-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <Label className="mb-2" htmlFor="districtId">
                      District <AppRequired />
                    </Label>
                    <FormSelect
                      control={form.control}
                      name="districtId"
                      options={districtOptions}
                      description={errors.districtId?.message}
                      placeholder="Select district"
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Centre name <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="name"
                      placeholder="Enter office name"
                      description={errors.name?.message}
                      iconStart={<defaultIcons.userOutline />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      Centre code
                    </Label>
                    <FormInput
                      register={form.register}
                      name="code"
                      placeholder="Enter centre code"
                      description={errors.code?.message}
                      iconStart={<FaLaptopCode />}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      Centre category
                    </Label>
                    <FormSelect
                      control={form.control}
                      name="category"
                      options={compCentreCategory}
                      description={errors.category?.message}
                      placeholder="Select category"
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Address line 1 <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="addressLine1"
                      placeholder="Enter address line 1"
                      description={errors.addressLine1?.message}
                      iconStart={<defaultIcons.location />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Address line 2
                    </Label>
                    <FormInput
                      register={form.register}
                      name="addressLine2"
                      placeholder="Enter address line 2"
                      description={errors.addressLine2?.message}
                      iconStart={<defaultIcons.location />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Address line 3
                    </Label>
                    <FormInput
                      register={form.register}
                      name="addressLine3"
                      placeholder="Enter address line 3"
                      description={errors.addressLine3?.message}
                      iconStart={<defaultIcons.location />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      City
                    </Label>
                    <FormInput
                      register={form.register}
                      name="city"
                      placeholder="Enter city"
                      description={errors.city?.message}
                      iconStart={<defaultIcons.building />}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      PIN code
                    </Label>
                    <FormInput
                      register={form.register}
                      name="pincode"
                      placeholder="Enter PIN code"
                      description={errors.pincode?.message}
                      iconStart={<defaultIcons.email />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Centre incharge name
                    </Label>
                    <FormInput
                      register={form.register}
                      name="inchargeName"
                      placeholder="Enter centre incharge name"
                      description={errors.inchargeName?.message}
                      iconStart={<defaultIcons.userOutline />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      Centre incharge mobile no.
                    </Label>
                    <FormInput
                      register={form.register}
                      name="inchargeMobile"
                      placeholder="Enter centre incharge mobile no."
                      description={errors.inchargeMobile?.message}
                      iconStart={<defaultIcons.mobile />}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      Centre incharge email
                    </Label>
                    <FormInput
                      register={form.register}
                      name="inchargeEmail"
                      placeholder="Enter centre incharge email"
                      description={errors.inchargeEmail?.message}
                      iconStart={<defaultIcons.email />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      Centre owner name
                    </Label>
                    <FormInput
                      register={form.register}
                      name="ownerName"
                      placeholder="Enter centre owner name"
                      description={errors.ownerName?.message}
                      iconStart={<defaultIcons.userOutline />}
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="designation">
                      Centre owner mobile no.
                    </Label>
                    <FormInput
                      register={form.register}
                      name="ownerMobile"
                      placeholder="Enter centre owner mobile no."
                      description={errors.ownerMobile?.message}
                      iconStart={<defaultIcons.mobile />}
                      className="mb-2"
                    />
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
