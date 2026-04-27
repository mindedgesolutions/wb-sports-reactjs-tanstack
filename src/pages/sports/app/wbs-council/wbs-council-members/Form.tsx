import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppRequired,
  FormInput,
  FormSelect,
  FormTextarea,
  FormUploadSingle,
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
import { titles, wbsCommitteeTypes } from '@/constants';
import type { IWbsCouncilRow } from '@/interface/sports.interface';
import {
  wbsCouncilSchema,
  type WbsCouncilSchema,
} from '@/schema/sports/wbs-council.schema';
import { queryClient } from '@/tanstack/query.client';
import {
  useWbsCouncilCreate,
  useWbsCouncilUpdate,
} from '@/tanstack/sports/wbs-council/wbs-council.mutation';
import { useWbsDesignations } from '@/tanstack/sports/wbs-council/wbs-council.query';
import { fileSizes } from '@/utils/format.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { MdWorkOutline } from 'react-icons/md';
import { PiUserCircleLight } from 'react-icons/pi';

const Form = ({ member }: { member?: IWbsCouncilRow }) => {
  const [open, setOpen] = useState(false);
  const openModal = (state: boolean) => {
    setOpen(state);
    if (state) {
      if (member) {
        form.reset({
          type: member.type,
          name: member.name,
          designation: member.designation_id.toString(),
          designationLabel: member.designation_label || '',
          address: member.address || '',
          email: member.email || '',
          phone: member.phone || '',
          fax: member.fax || '',
          oldImg: member.image_path || '',
          newImg: undefined,
        });
      } else {
        reset();
      }
    }
  };

  const {
    formState: { errors },
    ...form
  } = useForm<WbsCouncilSchema>({
    defaultValues: {
      type: '',
      name: '',
      designation: '',
      designationLabel: '',
      address: '',
      email: '',
      phone: '',
      fax: '',
      oldImg: '',
      newImg: undefined,
    },
    mode: 'all',
    resolver: zodResolver(wbsCouncilSchema),
  });

  const [files, setFiles] = useState<any[]>([]);
  const add = useWbsCouncilCreate();
  const update = useWbsCouncilUpdate();

  // -------------------------------

  const [filteredDesignations, setFilteredDesignations] = useState<
    { value: string; label: string }[]
  >([]);
  const { data: designations, isPending: isDesignationsPending } =
    useWbsDesignations();
  const ctype = form.watch('type');

  useEffect(() => {
    if (ctype) {
      const filtered = designations?.data?.filter(
        (item: any) => item.type === ctype,
      );
      const arr = filtered?.map((item: any) => ({
        value: item.id,
        label: item.designation,
      }));
      setFilteredDesignations(arr);
    }
  }, [ctype, designations]);

  const isLoading = member ? update.isPending : add.isPending;

  // -------------------------------

  const reset = () => {
    setFiles([]);
    form.reset({
      type: '',
      name: '',
      designation: '',
      designationLabel: '',
      address: '',
      email: '',
      phone: '',
      fax: '',
      oldImg: '',
      newImg: undefined,
    });
    queryClient.removeQueries({ queryKey: ['wbs-council-selected'] });
  };

  // -------------------------------

  const handleSubmit = (data: WbsCouncilSchema) => {
    const mutation = member ? update : add;

    const payload = member ? { id: member.id, data } : data;
    const msg = member ? 'Updated' : 'Added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        openModal(false);
        showSuccess(`${msg} successfully`);
      },
      onError: (error) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof WbsCouncilSchema, {
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
        {member ? (
          <Button
            type="button"
            variant="ghost"
            size={'icon-xs'}
            onClick={() => {
              queryClient.setQueryData(['wbs-council-selected'], member);
            }}
          >
            <HiOutlinePencilAlt className="size-4 text-chart-4" />
          </Button>
        ) : (
          <Button type="button" size={'sm'} className="rounded-sm">
            Add new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{member ? 'Update' : 'Add'} member details</DialogTitle>
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
                      Committee type <AppRequired />
                    </Label>
                    <FormSelect
                      control={form.control}
                      name="type"
                      options={wbsCommitteeTypes}
                      placeholder="Select a commitee type"
                      description={errors.type?.message}
                      className="mb-2"
                    />
                  </div>
                  <div className=""></div>
                  <div className="">
                    <Label className="mb-2" htmlFor="designation">
                      Name <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="name"
                      placeholder="Enter name"
                      description={errors.name?.message}
                      iconStart={<User />}
                      className="mb-2"
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="designation">
                      Designation <AppRequired />
                    </Label>
                    <FormSelect
                      control={form.control}
                      name="designation"
                      options={filteredDesignations}
                      placeholder="Select a designation"
                      description={errors.designation?.message}
                      className="mb-2"
                      disabled={isDesignationsPending}
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="designationLabel">
                      Designation label
                    </Label>
                    <FormInput
                      register={form.register}
                      name="designationLabel"
                      placeholder="Enter designation label"
                      description={errors.designationLabel?.message}
                      iconStart={<MdWorkOutline />}
                      className="mb-2"
                    />
                  </div>
                  <div className=""></div>
                  <div className="col-span-2 ">
                    <Label className="mb-2" htmlFor="address">
                      Address
                    </Label>
                    <FormTextarea
                      register={form.register}
                      name="address"
                      placeholder="Enter address"
                      description={errors.address?.message}
                      className="mb-2"
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="email">
                      Email
                    </Label>
                    <FormInput
                      register={form.register}
                      name="email"
                      placeholder="Enter email"
                      description={errors.email?.message}
                      iconStart={<Mail />}
                      className="mb-2"
                    />
                  </div>
                  <div className=""></div>
                  <div className="">
                    <Label className="mb-2" htmlFor="phone">
                      Phone no.
                    </Label>
                    <FormInput
                      register={form.register}
                      name="phone"
                      placeholder="Enter phone number"
                      description={errors.phone?.message}
                      iconStart={<Phone />}
                      className="mb-2"
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="fax">
                      FAX
                    </Label>
                    <FormInput
                      register={form.register}
                      name="fax"
                      placeholder="Enter fax number"
                      description={errors.fax?.message}
                      iconStart={<Phone />}
                      className="mb-2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="designation">Upload an image</Label>
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
                        setFormImg={(file: File) =>
                          form.setValue('newImg', file)
                        }
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
