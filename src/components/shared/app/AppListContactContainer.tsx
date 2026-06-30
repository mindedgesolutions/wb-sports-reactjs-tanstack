import { BriefcaseBusiness, Mail, Phone, User } from 'lucide-react';
import AppTooltip from './AppTooltip';

type AppListContactContainerProps = {
  name?: string | null;
  other?: string | null;
  contactOne?: string | null;
  contactTwo?: string | null;
  email?: string | null;
  fax?: string | null;
};

const AppListContactContainer = ({
  name,
  other,
  contactOne,
  contactTwo,
  email,
  fax,
}: AppListContactContainerProps) => {
  if (!name && !other && !contactOne && !contactTwo && !email) {
    return <span>N/A</span>;
  }

  return (
    <div className="flex flex-col gap-3">
      {name && (
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <AppTooltip text={name} cropLen={20} />
        </span>
      )}

      {other && (
        <span className="flex items-center gap-1">
          <BriefcaseBusiness className="w-3 h-3" />
          <AppTooltip text={other} cropLen={20} />
        </span>
      )}

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
          <span className="lowercase text-xs">
            <AppTooltip text={email} cropLen={20} />
          </span>
        </span>
      )}
    </div>
  );
};
export default AppListContactContainer;
