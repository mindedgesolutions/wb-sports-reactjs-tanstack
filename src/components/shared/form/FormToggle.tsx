import { Switch } from '@/components/ui/switch';
import { useToggleStatus } from '@/tanstack/shared/toggle/toggle.mutation';

type FormToggleProps = {
  checked: boolean;
  api: string;
  queryKey: string;
};

const FormToggle = ({ checked, api, queryKey }: FormToggleProps) => {
  const mutation = useToggleStatus(queryKey);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={(value) =>
          mutation.mutate({ url: api, checked: value })
        }
        disabled={mutation.isPending}
      />
    </div>
  );
};
export default FormToggle;
