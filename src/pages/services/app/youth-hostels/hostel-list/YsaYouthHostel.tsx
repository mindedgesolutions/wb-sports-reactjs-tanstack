import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppBodyWrapper,
  AppModalTooltip,
  AppRequired,
  AppTitleLoading,
  AppTitleWrapper,
  FormInput,
  FormSelect,
  FormTextarea,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { defaultIcons, titles } from '@/constants';
import { fetchDistricts } from '@/features/common.slice';
import type { IYouthHostel } from '@/interface/services.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  youthHostelSchema,
  type YouthHostelSchema,
} from '@/schema/services/youth-hostel.schema';
import {
  useYouthHostelCreate,
  useYouthHostelUpdate,
} from '@/tanstack/services/youth-hostels/youth-hostel.mutation';
import { useYouthHostel } from '@/tanstack/services/youth-hostels/youth-hostel.query';
import { fileSizes } from '@/utils/format.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bus, Plane, Train, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

const YsaYouthHostel = () => {
  const { id } = useParams();

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

  // ------------------------------

  const { data, isLoading: fetching } = useYouthHostel(Number(id), {
    enabled: !!id,
  }) as { data: IYouthHostel | undefined; isLoading: boolean };
  const title = data ? `${data?.name.toUpperCase()}` : `Add New Youth Hostel`;
  document.title = title + ' | ' + titles.SPORTS_APP_NAME;

  // ------------------------------

  const {
    formState: { errors },
    ...form
  } = useForm<YouthHostelSchema>({
    defaultValues: {
      districtId: data ? String(data.district_id) : '',
      name: '',
      address: '',
      phone_1: '',
      phone_2: '',
      email: '',
      accommodation: '',
      reach: '',
      trainStation: '',
      busStop: '',
      airport: '',
      network: '',
      remarks: '',
      newImg: undefined,
      existingImg: '',
    },
    mode: 'all',
    resolver: zodResolver(youthHostelSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState<any>('Add New Hostel');

  // ------------------------------

  const reset = () => {
    setFiles([]);
    form.reset();
  };

  const add = useYouthHostelCreate();
  const update = useYouthHostelUpdate();
  const isLoading = id ? update.isPending : add.isPending;

  // ------------------------------

  const handleSubmit = async (data: YouthHostelSchema) => {
    const mutation = id ? update : add;
    const payload = id ? { id, data } : data;
    const msg = id ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: (data) => {
        !id && form.reset(data!);
        showSuccess(`Youth hostel ${msg} successfully`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof YouthHostelSchema, {
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

  // ------------------------------

  useEffect(() => {
    if (data) {
      form.reset({
        districtId: String(data.district_id),
        name: data.name,
        address: data.address,
        phone_1: data.phone_1 || '',
        phone_2: data.phone_2 || '',
        email: data.email || '',
        accommodation: data.accommodation || '',
        reach: data.how_to_reach || '',
        trainStation: data.railway_station,
        busStop: data.bus_stop || '',
        airport: data.airport || '',
        network: data.road_network || '',
        remarks: data.remarks || '',
        newImg: undefined,
        existingImg: data.hostel_img,
      });
      setPageTitle(fetching ? <AppTitleLoading /> : data.name);
    } else {
      form.reset({
        districtId: '',
        name: '',
        address: '',
        phone_1: '',
        phone_2: '',
        email: '',
        accommodation: '',
        reach: '',
        trainStation: '',
        busStop: '',
        airport: '',
        network: '',
        remarks: '',
        newImg: undefined,
        existingImg: '',
      });
      setPageTitle(id ? <AppTitleLoading /> : 'Add new youth hostel');
    }
  }, [data]);

  return (
    <>
      <AppTitleWrapper title={pageTitle} />
      <AppBodyWrapper className="px-2">
        <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
          <fieldset disabled={isLoading}>
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      Title <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="name"
                      placeholder="Enter hostel name"
                      description={errors.name?.message}
                      iconStart={<defaultIcons.building />}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      Select district <AppRequired />
                    </Label>
                    <FormSelect
                      control={form.control}
                      name="districtId"
                      options={districtOptions}
                      description={errors.districtId?.message}
                      placeholder="Select a district"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      Address <AppRequired />
                    </Label>
                    <FormTextarea
                      register={form.register}
                      name="address"
                      placeholder="Enter hostel address"
                      description={errors.address?.message}
                      maxLen={250}
                    />
                  </div>
                </div>
                <div className=""></div>
                <div className="">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      <AppModalTooltip
                        label="Phone 1"
                        instructions={['Landline no. format: 33XXXXXXXX']}
                      />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="phone_1"
                      placeholder="Enter hostel phone 1"
                      description={errors.phone_1?.message}
                      iconStart={<defaultIcons.phone />}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      <AppModalTooltip
                        label="Phone 2"
                        instructions={['Landline no. format: 33XXXXXXXX']}
                      />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="phone_2"
                      placeholder="Enter hostel phone 1"
                      description={errors.phone_2?.message}
                      iconStart={<defaultIcons.phone />}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Email</Label>
                    <FormInput
                      register={form.register}
                      name="email"
                      placeholder="Enter hostel email"
                      description={errors.email?.message}
                      iconStart={<defaultIcons.email />}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      <AppModalTooltip
                        label="Type of Accommodation"
                        instructions={[
                          `Accommodation should be 'comma' separated`,
                          `Example: A, B, C etc.`,
                        ]}
                      />
                    </Label>
                    <FormTextarea
                      register={form.register}
                      name="accommodation"
                      placeholder="Enter accommodation types"
                      description={errors.accommodation?.message}
                      maxLen={500}
                    />
                  </div>
                </div>
                <div className=""></div>
                <div className="col-span-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">How to reach</Label>
                    <FormTextarea
                      register={form.register}
                      name="reach"
                      placeholder="Enter how to reach"
                      description={errors.reach?.message}
                      maxLen={500}
                    />
                  </div>
                </div>
                <div className=""></div>
                <div className="">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      Nearest train station <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="trainStation"
                      placeholder="Enter nearest train station"
                      description={errors.trainStation?.message}
                      iconStart={<Train />}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nearest bus stop</Label>
                    <FormInput
                      register={form.register}
                      name="busStop"
                      placeholder="Enter nearest bus stop"
                      description={errors.busStop?.message}
                      iconStart={<Bus />}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nearest airport</Label>
                    <FormInput
                      register={form.register}
                      name="airport"
                      placeholder="Enter nearest airport"
                      description={errors.airport?.message}
                      iconStart={<Plane />}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Road transportation network</Label>
                    <FormTextarea
                      register={form.register}
                      name="network"
                      placeholder="Enter transportation network"
                      description={errors.network?.message}
                      maxLen={500}
                    />
                  </div>
                </div>
                <div className=""></div>
                <div className="col-span-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Remarks</Label>
                    <FormTextarea
                      register={form.register}
                      name="remarks"
                      placeholder="Enter remarks"
                      description={errors.remarks?.message}
                      maxLen={500}
                    />
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className="">
                <div className="grid gap-2">
                  <Label htmlFor="newImg">
                    <AppModalTooltip
                      instructions={[
                        'Allowed file types: jpeg, png, gif',
                        'Attachment size must be less than 5MB',
                      ]}
                      label="Upload image"
                    />
                  </Label>
                  <div className="p-1 border border-muted-foreground/30 border-dashed w-32 h-32 relative">
                    {form.getValues('existingImg') && files.length === 0 && (
                      <img
                        src={`${titles.BASE_URL}${form.getValues('existingImg')}`}
                        alt="Existing"
                        className="w-full max-h-28 object-cover"
                      />
                    )}
                    {files.length > 0 &&
                      files[0].file.size <= fileSizes().max5mb && (
                        <img
                          src={URL.createObjectURL(files[0].file)}
                          alt=""
                          className="w-full max-h-28 object-cover"
                        />
                      )}
                    {!form.getValues('existingImg') && files.length === 0 && (
                      <defaultIcons.building className="w-full h-full text-muted" />
                    )}
                    <FormUploadSingle
                      setFiles={setFiles}
                      files={files}
                      setFormImg={(file: File) => form.setValue('newImg', file)}
                      maxAllowed={fileSizes().max5mb}
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
              <div className="col-span-4">
                <Separator className="mb-4" />
                <div className="flex gap-4">
                  <SubmitBtn
                    isSubmitting={isLoading || fetching}
                    label={id ? 'Update Details' : 'Add Hostel'}
                  />
                  <Button
                    type="button"
                    className="text-xs tracking-wider"
                    variant="outline"
                    onClick={reset}
                  >
                    Reset
                  </Button>
                  <Link to={`${titles.SERVICES_APP_URL}/youth-hostels`}>
                    <Button
                      type="button"
                      className="text-xs tracking-wider"
                      variant="outline"
                    >
                      Back to list
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </AppBodyWrapper>
    </>
  );
};
export default YsaYouthHostel;
