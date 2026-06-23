import {
  SpwPageBanner,
  SpwParagraphWrapper,
  SpwSectionTitleWrapper,
  SpwSectionWrapper,
} from '@/components';
import { titles } from '@/constants';

const SpwPrivacyPolicies = () => {
  document.title = `Privacy Policies | ${titles.SPORTS_APP_NAME}`;

  return (
    <>
      <SpwPageBanner title="Privacy Policies" />
      <SpwSectionWrapper className="max-w-7xl mx-auto mb-4 md:mb-8 flex flex-col gap-8 min-h-80">
        <section>
          <SpwSectionTitleWrapper
            title="privacy policy"
            className="text-center md:text-left"
          />
          <div className="flex flex-col gap-8">
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              This website does not automatically capture any specific personal
              information from you, (like name, phone number or e-mail address),
              that allows us to identify you individually.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              If the website requests you to provide personal information, you
              will be informed for the particular purposes for which the
              information is gathered e.g. feedback form and adequate security
              measures will be taken to protect your personal information.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              We do not sell or share any personally identifiable information
              volunteered on the website to any third party (public/private).
              Any information provided to this website will be protected from
              loss, misuse, unauthorized access or disclosure, alteration, or
              destruction.
            </SpwParagraphWrapper>
          </div>
        </section>
        <section>
          <SpwSectionTitleWrapper
            title="Terms of Use"
            className="text-center md:text-left"
          />
          <div className="flex flex-col gap-8">
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              This SERVICE is intended for use as is.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              If you choose to use our Service, then you agree to the collection
              and use of information in relation to this policy. The Personal
              Information that we collect is used for providing and improving
              the Service. We will not use or share your information with anyone
              except as described in this Privacy Policy.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              The terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions, which is accessible at for this
              application unless otherwise defined in this Privacy Policy.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              Though all efforts have been made to ensure the accuracy and
              currency of the content on this website, the same should not be
              construed as a statement of law or used for any legal purposes.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              In no event will Labour Commissionerate, West Bengal be liable for
              any expense, loss or damage including, without limitation,
              indirect or consequential loss or damage, or any expense, loss or
              damage whatsoever arising from use, or loss of use, of data,
              arising out of or in connection with the use of this Portal.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              Links to other websites that have been included on this Portal are
              provided for public convenience only. We cannot guarantee the
              availability of such linked pages at all times.
            </SpwParagraphWrapper>
          </div>
        </section>
        <section>
          <SpwSectionTitleWrapper
            title="Cookies"
            className="text-center md:text-left"
          />
          <div className="flex flex-col gap-8">
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              Cookies are files with a small amount of data that are commonly
              used as anonymous unique identifiers. These are sent to your
              browser from the websites that you visit and are stored on your
              device's internal memory.
            </SpwParagraphWrapper>
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              This Service does not use these "cookies" explicitly. However, the
              app may use third party code and libraries that use ″cookies″ to
              collect information and improve their services. You have the
              option to either accept or refuse these cookies and know when a
              cookie is being sent to your device. If you choose to refuse our
              cookies, you may not be able to use some portions of this Service.
            </SpwParagraphWrapper>
          </div>
        </section>
        <section>
          <SpwSectionTitleWrapper
            title="Changes to This Privacy Policy"
            className="text-center md:text-left"
          />
          <div className="flex flex-col gap-8">
            <SpwParagraphWrapper className="[text-align-last:center] md:[text-align-last:left]">
              We may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. We will
              notify you of any changes by posting the new Privacy Policy on
              this page. These changes are effective immediately after they are
              posted on this page.
            </SpwParagraphWrapper>
          </div>
        </section>
      </SpwSectionWrapper>
    </>
  );
};
export default SpwPrivacyPolicies;
