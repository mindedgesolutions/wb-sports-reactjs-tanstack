import { images, titles } from '@/constants';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput, FormPassword, SubmitBtn } from '@/components';
import { useForm } from 'react-hook-form';
import { signinSchema, type SigninSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, RefreshCcw, User } from 'lucide-react';
import { useGetCaptcha } from '@/tanstack/shared/auth/auth.query';
import { Spinner } from '@/components/ui/spinner';
import { useLogin } from '@/tanstack/shared/auth/auth.mutation';
import { showError } from '@/alerts/show.error';
import { useEffect, useState } from 'react';

const SpaSignin = () => {
  document.title = `Admin Sign In | ${titles.SPORTS_APP_NAME}`;
  const {
    data: captcha,
    isLoading: captchaLoading,
    refetch: captchaRefetch,
  } = useGetCaptcha();
  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<SigninSchema>({
    defaultValues: {
      username: 'souvik_sports@test.com',
      password: 'password',
      enteredCaptcha: '',
    },
    mode: 'all',
    resolver: zodResolver(signinSchema),
  });
  const login = useLogin();
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const LOCK_KEY = 'lock';
  const isLocked =
    showTimer || Number(localStorage.getItem(LOCK_KEY)) > Date.now();

  // ------------------------

  const reset = () => {
    form.reset({
      username: '',
      password: '',
      enteredCaptcha: '',
    });
    captchaRefetch();
  };

  // ------------------------

  useEffect(() => {
    const saved = localStorage.getItem(LOCK_KEY);

    if (!saved) return;

    const lockUntil = Number(saved);
    const now = Date.now();

    if (lockUntil > now) {
      setShowTimer(true);
      setTimeLeft(Math.ceil((lockUntil - now) / 1000));
    } else {
      localStorage.removeItem(LOCK_KEY);
    }
  }, []);

  // ------------------------

  useEffect(() => {
    if (!showTimer) return;

    const interval = setInterval(() => {
      const saved = localStorage.getItem(LOCK_KEY);
      if (!saved) return;

      const lockUntil = Number(saved);
      const now = Date.now();
      const remaining = Math.ceil((lockUntil - now) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem(LOCK_KEY);
        setShowTimer(false);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer]);

  // ------------------------

  const handleSubmit = async (data: SigninSchema) => {
    const final = {
      ...data,
      username: btoa(data.username),
      password: btoa(data.password),
      captchaKey: captcha?.key || '',
      organisation: 'sports',
    };

    login.mutate(final, {
      onSuccess: () => {
        navigate(`/${titles.SPORTS_APP_URL}/dashboard`);
      },
      onError: (error) => {
        if ((error as any).status === 422) {
          Object.entries((error as any)?.response?.data?.errors).forEach(
            ([field, message]) => {
              form.setError(field as keyof SigninSchema, {
                message: message as string,
              });
            },
          );
          return;
        }
        const msg =
          (error as any)?.response?.data?.errors?.[0] ||
          (error as any)?.response?.data?.message ||
          'Something went wrong';
        if ((error as any)?.response?.data?.message) {
          reset();
          const lockUntil = Date.now() + 60 * 1000;
          localStorage.setItem(LOCK_KEY, lockUntil.toString());
          setShowTimer(true);
        }
        return showError(msg);
      },
    });
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            to={titles.SPORTS_WEB_URL}
            className="flex items-center gap-2 font-medium"
          >
            <img
              src={images.logo}
              alt={titles.SPORTS_APP_NAME}
              className="h-12"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <fieldset disabled={login.isPending || isLocked}>
                <FieldGroup>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                      Login to your account
                    </h1>
                    <p className="text-xs text-balance text-muted-foreground">
                      Enter your email below to login to your account
                    </p>
                    {showTimer && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Please try in{' '}
                        <span className="text-destructive font-semibold ml-0.5">
                          {timeLeft}
                        </span>
                      </p>
                    )}
                  </div>
                  <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <FormInput
                      id="username"
                      register={form.register}
                      name="username"
                      description={errors.username?.message}
                      placeholder="Enter username"
                      iconStart={<User />}
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        to="#"
                        className="ml-auto text-xs underline-offset-4 hover:underline"
                        tabIndex={-1}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormPassword
                      id="password"
                      type="password"
                      register={form.register}
                      name="password"
                      placeholder="Enter password"
                      description={errors.password?.message}
                      iconStart={<LockKeyhole />}
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center gap-2">
                      <div className="w-full border border-dashed flex justify-center items-center">
                        {captchaLoading ? (
                          <div className="px-4 py-3">
                            <Spinner />
                          </div>
                        ) : (
                          <img src={captcha?.image} alt="captcha" />
                        )}
                      </div>
                      <div className="">
                        <RefreshCcw
                          className="text-muted-foreground w-3 h-3 cursor-pointer"
                          onClick={() => captchaRefetch()}
                        />
                      </div>
                      <div className="flex flex-col">
                        <FormInput
                          id="enteredCaptcha"
                          register={form.register}
                          name="enteredCaptcha"
                          placeholder="Enter captcha"
                          className="min-w-40"
                        />
                      </div>
                    </div>
                    <FieldDescription className="text-destructive text-xs">
                      {errors.enteredCaptcha?.message}
                    </FieldDescription>
                  </Field>
                  <Field>
                    <SubmitBtn
                      isSubmitting={isSubmitting}
                      label="Login"
                      submitLabel="Logging in ..."
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
          src={images.spSignin}
          alt={titles.SPORTS_APP_NAME}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default SpaSignin;
