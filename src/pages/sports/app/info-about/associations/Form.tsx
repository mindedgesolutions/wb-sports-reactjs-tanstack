import type { IAssociationRow } from '@/interface/sports.interface';
import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppRequired,
  FormInput,
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
import { titles } from '@/constants';
import { queryClient } from '@/tanstack/query.client';
import { fileSizes } from '@/utils/format.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { CiGlobe } from 'react-icons/ci';
import { PiUserCircleLight } from 'react-icons/pi';
import {
  associationSchema,
  type AssociationSchema,
} from '@/schema/sports/info-about.schema';
import {
  useAssociationCreate,
  useAssociationUpdate,
} from '@/tanstack/sports/info-about/info-about.mutation';

const Form = ({ assoc }: { assoc?: IAssociationRow }) => {
  const [open, setOpen] = useState(false);
  const openModal = (state: boolean) => {
    setOpen(state);
    if (state) {
      if (assoc) {
        form.reset({
          name: assoc.name,
          address: assoc.address || '',
          website: assoc.website || '',
          email: assoc.email || '',
          phoneOne: assoc.phone_1 || '',
          phoneTwo: assoc.phone_2 || '',
          fax: assoc.fax || '',
          oldImg: assoc.logo || '',
          newImg: undefined,
        });
      } else {
        reset();
      }
    }
  };

  // -------------------------------

  const {
    formState: { errors },
    ...form
  } = useForm<AssociationSchema>({
    defaultValues: {
      name: '',
      address: '',
      website: '',
      email: '',
      phoneOne: '',
      phoneTwo: '',
      fax: '',
      newImg: undefined,
      oldImg: '',
    },
    mode: 'all',
    resolver: zodResolver(associationSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const add = useAssociationCreate();
  const update = useAssociationUpdate();
  const isLoading = assoc ? update.isPending : add.isPending;

  // -------------------------------

  const reset = () => {
    setFiles([]);
    form.reset({
      name: '',
      address: '',
      website: '',
      email: '',
      phoneOne: '',
      phoneTwo: '',
      fax: '',
      newImg: undefined,
      oldImg: '',
    });
    queryClient.removeQueries({ queryKey: ['association-selected'] });
  };

  // -------------------------------

  const handleSubmit = (data: AssociationSchema) => {
    const mutation = assoc ? update : add;

    const payload = assoc ? { id: assoc.id, data } : data;
    const msg = assoc ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        openModal(false);
        showSuccess(`Association ${msg} successfully`);
      },
      onError: (error) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof AssociationSchema, {
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
        {assoc ? (
          <Button
            type="button"
            variant="ghost"
            size={'icon-xs'}
            onClick={() => {
              queryClient.setQueryData(['association-selected'], assoc);
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
          <DialogTitle>{assoc ? 'Update' : 'Add'} association</DialogTitle>
          <DialogDescription>
            Click the Save button at the bottom
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full mt-6">
            <ScrollArea className="sm:max-w-xl max-h-screen overflow-y-scroll">
              <div className="flex flex-col gap-6 mx-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="">
                      <Label className="mb-2" htmlFor="designation">
                        Association name <AppRequired />
                      </Label>
                      <FormInput
                        register={form.register}
                        name="name"
                        placeholder="Enter association name"
                        description={errors.name?.message}
                        iconStart={<User />}
                        className="mb-2"
                      />
                    </div>
                  </div>
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
                      Website
                    </Label>
                    <FormInput
                      register={form.register}
                      name="website"
                      placeholder="Enter website"
                      description={errors.website?.message}
                      iconStart={<CiGlobe />}
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
                  <div className="">
                    <Label className="mb-2" htmlFor="phone">
                      Phone no. 1
                    </Label>
                    <FormInput
                      register={form.register}
                      name="phoneOne"
                      placeholder="Enter phone number"
                      description={errors.phoneOne?.message}
                      iconStart={<Phone />}
                      className="mb-2"
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2" htmlFor="phone">
                      Phone no. 2
                    </Label>
                    <FormInput
                      register={form.register}
                      name="phoneTwo"
                      placeholder="Enter phone number"
                      description={errors.phoneTwo?.message}
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
                    <Label htmlFor="designation" className="mb-1">
                      Upload assoc. logo
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
