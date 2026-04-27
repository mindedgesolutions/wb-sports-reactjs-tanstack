import { Mail, Phone } from 'lucide-react';
import AppTooltip from './AppTooltip';

type AppListContactContainerProps = {
  contactOne?: string | null;
  contactTwo?: string | null;
  email?: string | null;
  fax?: string | null;
};

const AppListContactContainer = ({
  contactOne,
  contactTwo,
  email,
  fax,
}: AppListContactContainerProps) => {
  if (!contactOne && !contactTwo && !email) {
    return <span>N/A</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      {contactOne && (
        <span className="flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {contactOne}
        </span>
      )}

      {contactTwo && (
        <span className="flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {contactTwo}
        </span>
      )}

      {fax && (
        <span className="flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {fax}
        </span>
      )}

      {email && (
        <span className="flex items-center gap-1">
          <Mail className="w-3 h-3" />
          <AppTooltip text={email} cropLen={20} />
        </span>
      )}
    </div>
  );
};
export default AppListContactContainer;
