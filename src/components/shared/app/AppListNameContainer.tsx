import AppTooltip from './AppTooltip';

type AppListNameContainerProps = {
  name?: string;
  line_1?: string;
  line_2?: string;
};

const AppListNameContainer = ({
  name,
  line_1,
  line_2,
}: AppListNameContainerProps) => {
  if (!name && !line_1 && !line_2) {
    return <span>N/A</span>;
  }

  return (
    <div className="flex flex-col gap-3">
      {name && (
        <span className="text-card-foreground font-semibold">
          <AppTooltip text={name} cropLen={20} />
        </span>
      )}

      {line_1 && (
        <span className="italic">
          <AppTooltip text={line_1} cropLen={20} />
        </span>
      )}

      {line_2 && <span className="italic">{line_2}</span>}
    </div>
  );
};
export default AppListNameContainer;
