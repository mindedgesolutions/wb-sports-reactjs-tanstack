import AppTooltip from './AppTooltip';

type AppListAddressContainerProps = {
  line_1: string;
  line_2?: string | undefined;
  line_3?: string | undefined;
  city?: string | undefined;
  pincode?: string | undefined;
};

const AppListAddressContainer = ({
  line_1,
  line_2,
  line_3,
  city,
  pincode,
}: AppListAddressContainerProps) => {
  const address = `${line_1}${line_2 ? ', ' + line_2 : ''}${line_3 ? ', ' + line_3 : ''}${city ? ', ' + city : ''}${pincode ? ', PIN-' + pincode : ''}`;

  return <AppTooltip text={address} cropLen={30} />;
};
export default AppListAddressContainer;
