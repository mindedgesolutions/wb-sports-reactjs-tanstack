import { showError } from '@/alerts/show.error';
import { showSuccess } from '@/alerts/show.success';
import { customFetch } from '@/axios/custom.fetch';
import {
  AppRequired,
  FormInput,
  FormRadio,
  FormTextarea,
  SpwPageBanner,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { titles } from '@/constants';
import {
  feedbackSchema,
  type FeedbackSchema,
} from '@/schema/sports/feedback.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';

const radioOptions = [
  { value: 'feedback', label: 'Feedback' },
  { value: 'grievance', label: 'Grievance' },
  { value: 'suggestion', label: 'Suggestion' },
];

const relativePath = '../../../../../';

const SpwFeedback = () => {
  document.title = `Feedback | ${titles.SPORTS_APP_NAME}`;
  const {
    formState: { isSubmitting, errors },
    ...form
  } = useForm<FeedbackSchema>({
    defaultValues: {
      feedbackType: '',
      name: '',
      mobileNo: '',
      email: '',
      address: '',
      subject: '',
      message: '',
    },
    mode: 'all',
    resolver: zodResolver(feedbackSchema),
  });

  // -------------------

  const resetForm = () => {
    form.reset({
      feedbackType: '',
      name: '',
      mobileNo: '',
      email: '',
      address: '',
      subject: '',
      message: '',
    });
  };

  // -------------------

  const handleSubmit = async (data: FeedbackSchema) => {
    try {
      const response = await customFetch.post(`/sports/send-feedback`, data);
      if (response.status === 200) {
        resetForm();
        showSuccess(`Thank you for your feedback!`);
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        Object.entries((error as any)?.response?.data?.errors).forEach(
          ([field, message]) => {
            form.setError(field as keyof FeedbackSchema, {
              message: message as string,
            });
          },
        );
      } else {
        showError(
          (error as any)?.response?.data?.message || 'Something went wrong',
        );
      }
    }
  };

  return (
    <>
      <SpwPageBanner title="Your Feedback is Important" />
      <SpwSectionWrapper className="max-w-7xl mx-auto my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
              <fieldset disabled={isSubmitting}>
                <section className="mb-8">
                  <SpwSectionTitleWrapper
                    title="Feedback type"
                    className="text-center md:text-left text-xs md:text-base"
                  />
                  <FormRadio
                    control={form.control}
                    name="feedbackType"
                    options={radioOptions}
                    description={errors.feedbackType?.message}
                    className="flex flex-col md:flex-row gap-4 max-w-lg mb-2"
                    classNameLabel="font-inter text-muted-foreground uppercase"
                  />
                </section>
                <section className="mb-8">
                  <SpwSectionTitleWrapper
                    title="Contact information"
                    className="text-center md:text-left text-xs md:text-base"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                      <Label className="font-inter font-semibold uppercase">
                        Name <AppRequired />
                      </Label>
                      <FormInput
                        register={form.register}
                        name="name"
                        placeholder="Enter your full name"
                        description={errors.name?.message}
                        iconStart={<FiUser />}
                      />
                    </div>
                    <div className="hidden md:block col-span-1"></div>
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                      <Label className="font-inter font-semibold uppercase">
                        Mobile no. <AppRequired />
                      </Label>
                      <FormInput
                        register={form.register}
                        name="mobileNo"
                        placeholder="Enter your mobile no."
                        description={errors.mobileNo?.message}
                        iconStart={<Phone />}
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                      <Label className="font-inter font-semibold uppercase">
                        Email <AppRequired />
                      </Label>
                      <FormInput
                        register={form.register}
                        name="email"
                        placeholder="Enter your email address"
                        description={errors.email?.message}
                        iconStart={<Mail />}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                      <Label className="font-inter font-semibold uppercase">
                        Address
                      </Label>
                      <FormTextarea
                        register={form.register}
                        name="address"
                        description={errors.address?.message}
                        placeholder="Enter your address"
                        maxLen={255}
                      />
                    </div>
                  </div>
                </section>
                <section className="mb-8">
                  <SpwSectionTitleWrapper
                    title="your message for us"
                    className="text-center md:text-left text-xs md:text-base"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-2 flex flex-col gap-2">
                      <Label className="font-inter font-semibold uppercase">
                        Subject <AppRequired />
                      </Label>
                      <FormTextarea
                        register={form.register}
                        name="subject"
                        description={errors.subject?.message}
                        placeholder="Enter subject"
                        maxLen={100}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                      <Label className="font-inter font-semibold uppercase">
                        Message <AppRequired />
                      </Label>
                      <FormTextarea
                        register={form.register}
                        name="message"
                        description={errors.message?.message}
                        placeholder="Enter message"
                        maxLen={500}
                      />
                    </div>
                  </div>
                </section>
                <div className="my-4 flex flex-row justify-start items-center gap-8">
                  <SubmitBtn
                    isSubmitting={isSubmitting}
                    label={`Send Feedback`}
                    className="cs-btn-success"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    tabIndex={-1}
                    className="text-xs"
                  >
                    Reset Form
                  </Button>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="hidden md:block col-span-1">
            <img
              src={`${relativePath}/sports/west-bangal.png`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwFeedback;
