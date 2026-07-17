import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import { AppRequired, FormInput, SubmitBtn } from '@/components';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { titles, defaultIcons } from '@/constants';
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from '@/schema/auth.schema';
import { useForgotPassword } from '@/tanstack/shared/auth/auth.mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const relativePath = '../../../../';

const YsaForgotPassword = () => {
  document.title = `Forgot Password | ${titles.SERVICES_APP_NAME}`;

  const {
    formState: { errors },
    ...form
  } = useForm<ForgotPasswordSchema>({
    defaultValues: { email: '' },
    mode: 'all',
    resolver: zodResolver(forgotPasswordSchema),
  });
  const add = useForgotPassword();

  const handleSubmit = async (data: ForgotPasswordSchema) => {
    add.mutate(data as any, {
      onSuccess: () => {
        form.reset();
        showSuccess(`Password reset link is sent to ${data.email}`);
      },
      onError: (error: any) => {
        const errors = (error as any)?.response?.data?.errors;

        if (errors) {
          if (!Array.isArray(errors)) {
            Object.entries(errors).forEach(([key, message]) => {
              form.setError(key as keyof ForgotPasswordSchema, {
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
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            to={titles.SERVICES_WEB_URL}
            className="flex items-center gap-2 font-medium"
          >
            {/* for desktop */}
            <img
              src={`${relativePath}/logo/youth-services.png`}
              alt={titles.SPORTS_APP_NAME}
              className="h-12 hidden md:block"
            />
            {/* for mobile */}
            <img
              src={`${relativePath}/logo/ys-mobile.png`}
              alt={titles.SPORTS_APP_NAME}
              className="h-20 block md:hidden"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <fieldset disabled={add.isPending}>
                <FieldGroup>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Forgot password?</h1>
                    <p className="text-xs text-balance text-muted-foreground">
                      Enter registered email to get password reset link
                    </p>
                  </div>
                  <Field>
                    <FieldLabel
                      htmlFor="username"
                      className="text-muted-foreground"
                    >
                      Email <AppRequired />
                    </FieldLabel>
                    <FormInput
                      id="username"
                      register={form.register}
                      name="email"
                      description={errors.email?.message}
                      placeholder="Enter registered email"
                      iconStart={<defaultIcons.email />}
                    />
                  </Field>
                  <Field>
                    <SubmitBtn
                      isSubmitting={add.isPending}
                      label="Send reset link"
                      submitLabel="Processing ..."
                    />
                  </Field>
                </FieldGroup>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={`${relativePath}/youth-services/ys-signin.jpg`}
          alt={titles.SERVICES_APP_NAME}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default YsaForgotPassword;
