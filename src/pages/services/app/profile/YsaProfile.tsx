import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import {
  AppBodyWrapper,
  AppModalTooltip,
  AppRequired,
  AppTitleWrapper,
  FormInput,
  FormPassword,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { titles, defaultIcons } from '@/constants';
import { profileSchema, type ProfileSchema } from '@/schema/auth.schema';
import { useProfileUpdateServices } from '@/tanstack/shared/auth/auth.mutation';
import { useCurrentUser } from '@/tanstack/shared/auth/auth.query';
import { fileSizes } from '@/utils/format.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const instructions: string[] = [
  'Allowed file types: jpeg, png, gif',
  `Attachment size must be less than 5MB`,
];

const YsaProfile = () => {
  document.title = `Update Profile | ${titles.SERVICES_APP_NAME}`;

  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<ProfileSchema>({
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      password: '',
      password_confirmation: '',
      newImg: undefined,
      existingImg: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(profileSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const update = useProfileUpdateServices();

  // -----------------------------------

  const { data: user, isLoading } = useCurrentUser('services') as {
    data: IUser;
    isLoading: boolean;
  };

  // -----------------------------------

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        mobile: user.user_details.mobile || '',
        newImg: undefined,
        existingImg: user.user_details.profile_img || '',
      });
    } else {
      form.reset({
        name: '',
        mobile: '',
        password: '',
        password_confirmation: '',
        newImg: undefined,
        existingImg: '',
      });
    }
  }, [user]);

  // -----------------------------------

  const handleSubmit = async (data: ProfileSchema) => {
    const payload = data;
    update.mutate(payload as any, {
      onSuccess: () => {
        showSuccess(`Profile details updated`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof ProfileSchema, {
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
    <>
      <AppTitleWrapper title="Update Profile" isFetching={isLoading} />
      <AppBodyWrapper className="p-4">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset disabled={isLoading || isSubmitting}>
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="flex justify-center">
                <div className="gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      <AppModalTooltip
                        instructions={instructions}
                        label="Upload an image"
                      />
                    </Label>
                    <div className="p-1 border border-muted-foreground/30 border-dashed w-28 h-28 relative">
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
                        <defaultIcons.userOutline className="w-full h-full text-muted" />
                      )}
                      <FormUploadSingle
                        setFiles={setFiles}
                        files={files}
                        setFormImg={(file: File) =>
                          form.setValue('newImg', file)
                        }
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
              </div>
              <div className="col-span-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="name">
                        Name <AppRequired />
                      </Label>
                      <FormInput
                        register={form.register}
                        name="name"
                        placeholder="Enter name"
                        description={errors.name?.message}
                        iconStart={<defaultIcons.userOutline />}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">
                        <AppModalTooltip
                          instructions={['Cannot be edited']}
                          label="Email"
                        />
                      </Label>
                      <FormInput
                        register={form.register}
                        name="email"
                        iconStart={<defaultIcons.email />}
                        disabled={true}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Mobile no.</Label>
                      <FormInput
                        register={form.register}
                        name="mobile"
                        placeholder="Enter mobile no."
                        description={errors.mobile?.message}
                        iconStart={<defaultIcons.mobile />}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Change password</Label>
                      <FormPassword
                        register={form.register}
                        name="password"
                        placeholder={'*'.repeat(8)}
                        description={errors.password?.message}
                        iconStart={<defaultIcons.password />}
                        type="password"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Confirm password</Label>
                      <FormPassword
                        register={form.register}
                        name="password_confirmation"
                        placeholder={'*'.repeat(8)}
                        description={errors.password_confirmation?.message}
                        iconStart={<defaultIcons.password />}
                        type="password"
                      />
                    </div>
                    <div className="">
                      <SubmitBtn
                        isSubmitting={isLoading}
                        label={'Update Details'}
                        submitLabel="Submitting ..."
                      />
                    </div>
                  </div>
                  <div className="col-span-2"></div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </AppBodyWrapper>
    </>
  );
};
export default YsaProfile;
