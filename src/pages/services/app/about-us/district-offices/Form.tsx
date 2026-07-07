import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppModalTooltip,
  AppRequired,
  FormInput,
  FormSelect,
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
import { fetchDistricts } from '@/features/common.slice';
import type { IDistrictBlockOffice } from '@/interface/services.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  districtBlockOfficeSchema,
  type DistrictBlockOfficeSchema,
} from '@/schema/services/about-us.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useDistrictBlockOfficeCreate,
  useDistrictBlockOfficeUpdate,
} from '@/tanstack/services/about-us/about-us.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building, Mail, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiMobile1 } from 'react-icons/ci';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { SlBadge } from 'react-icons/sl';

const Form = ({ office }: { office?: IDistrictBlockOffice }) => {
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
      if (office) {
        form.reset({
          districtId: String(office.district_id),
          name: office.name,
          address: office.address || '',
          landline: office.landline_no || '',
          email: office.email || '',
          mobile_1: office.mobile_1 || '',
          mobile_2: office.mobile_2 || '',
          officerName: office.officer_name || '',
          officerDesignation: office.officer_designation || '',
          officerMobile: office.officer_mobile || '',
        });
      } else {
        reset();
      }
    }
  };

  const {
    formState: { errors },
    ...form
  } = useForm<DistrictBlockOfficeSchema>({
    defaultValues: {
      districtId: '',
      name: '',
      address: '',
      landline: '',
      email: '',
      mobile_1: '',
      mobile_2: '',
      officerName: '',
      officerDesignation: '',
      officerMobile: '',
    },
    mode: 'all',
    resolver: zodResolver(districtBlockOfficeSchema),
  });
  const add = useDistrictBlockOfficeCreate();
  const update = useDistrictBlockOfficeUpdate();

  // -------------------------------

  const reset = () => {
    form.reset({
      districtId: '',
      name: '',
      address: '',
      landline: '',
      email: '',
      mobile_1: '',
      mobile_2: '',
      officerName: '',
      officerDesignation: '',
      officerMobile: '',
    });
    queryClient.removeQueries({ queryKey: ['wbs-council-selected'] });
  };

  const isLoading = office ? update.isPending : add.isPending;

  // -------------------------------

  const handleSubmit = (data: DistrictBlockOfficeSchema) => {
    const mutation = office ? update : add;

    const payload = office ? { id: office.id, data } : data;
    const msg = office ? 'Updated' : 'Added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        openModal(false);
        showSuccess(`${msg} successfully`);
      },
      onError: (error) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof DistrictBlockOfficeSchema, {
                message: message as string,
              });
            },
          );
          return;
        }
        return showError((error as any)?.response?.data?.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        {office ? (
          <Button
            type="button"
            variant="ghost"
            size={'icon-xs'}
            onClick={() => {
              queryClient.setQueryData(
                ['district-block-office-selected'],
                office,
              );
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
          <DialogTitle>{office ? 'Update' : 'Add'} office details</DialogTitle>
          <DialogDescription>
            Click the Save button at the bottom
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full mt-6">
            <ScrollArea className="sm:max-w-xl max-h-96 overflow-y-scroll">
              <div className="flex flex-col gap-6 mx-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <Label className="mb-2" htmlFor="type">
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
                  <div className=""></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Office name <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="name"
                      placeholder="Enter office name"
                      description={errors.name?.message}
                      iconStart={<Building />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Office address <AppRequired />
                    </Label>
                    <FormTextarea
                      register={form.register}
                      name="address"
                      placeholder="Enter office address"
                      description={errors.address?.message}
                      className="mb-2"
                      maxLen={255}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <Label className="mb-2" htmlFor="designationLabel">
                      <AppModalTooltip
                        label="Landline no."
                        instructions={['Landline no. format: 33XXXXXXXX']}
                      />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="landline"
                      placeholder="Format 33XXXXXXXX"
                      description={errors.landline?.message}
                      iconStart={<Phone />}
                      className="mb-2"
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="designationLabel">
                      Email
                    </Label>
                    <FormInput
                      register={form.register}
                      name="email"
                      placeholder="Enter email address"
                      description={errors.email?.message}
                      iconStart={<Mail />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <Label className="mb-2" htmlFor="designationLabel">
                      Mobile no. 1
                    </Label>
                    <FormInput
                      register={form.register}
                      name="mobile_1"
                      placeholder="Enter mobile no."
                      description={errors.mobile_1?.message}
                      iconStart={<CiMobile1 />}
                      className="mb-2"
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="designationLabel">
                      Mobile no. 2
                    </Label>
                    <FormInput
                      register={form.register}
                      name="mobile_2"
                      placeholder="Enter mobile no."
                      description={errors.mobile_2?.message}
                      iconStart={<CiMobile1 />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Officer's name
                    </Label>
                    <FormInput
                      register={form.register}
                      name="officerName"
                      placeholder="Enter office's name"
                      description={errors.officerName?.message}
                      iconStart={<User />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="mb-2" htmlFor="designation">
                      Officer's designation <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="officerDesignation"
                      placeholder="Enter office's designation"
                      description={errors.officerDesignation?.message}
                      iconStart={<SlBadge />}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <Label className="mb-2" htmlFor="designationLabel">
                      Officer's mobile no.
                    </Label>
                    <FormInput
                      register={form.register}
                      name="officerMobile"
                      placeholder="Enter officer's mobile no."
                      description={errors.officerMobile?.message}
                      iconStart={<CiMobile1 />}
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
